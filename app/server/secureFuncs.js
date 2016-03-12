SecureFuncs = {};

SecureFuncs.statusTo = function (status) {
  GameStatus.update({}, {$set : {gameStatus : status}});
};

// TODO: this is so crucial - introduce a check to ensure correct number of picks or throw error
SecureFuncs.randomPickSweep = function (callback) {
  var liveLeaguesCursor = Leagues.find({round : {$gt : 0}, leagueStatus : "active", "members.1" : {$exists : true}});

  // iterate over all active leagues with Mongo foreach
  liveLeaguesCursor.forEach(function (doc) {
    var liveMembers = doc.members.filter(function (a) {
      return a.diedInRound === 0;
    });
    var autoPickersArray = [];
    //iterate over the members array in each active league
    liveMembers.forEach(function (element, index, array) {
      // check if number of picks is one lower than the round
      if(element.picks.length === doc.round - 1) {
        SecureFuncs.makeRandomPick(element.picks, doc._id, element.playerId);
        autoPickersArray.push(element.playerId);
      } else if (element.picks.length === doc.round) {
        // check in case inelegible team
        if (arrayOfPlayingTeams().indexOf(element.picks[doc.round - 1]) === -1) {
          Leagues.update({_id : doc._id, "members.playerId" : element.playerId}, {$pop : {"members.$.picks" : 1}}, function (error, response) {
            SecureFuncs.makeRandomPick(element.picks, doc._id, element.playerId);
          });
        }
      }
    });
    // add randoms to autopicks array in round event
    // TODO: check adding object to array
    Leagues.update({_id : doc._id}, {$push : {events : {round : round, autoPicks : autoPickersArray}}});
    if(doc.acceptingNewMembers) {
      Leagues.update({_id : doc._id}, {$set : {acceptingNewMembers : false}});
    }
  });
  callback();
};

SecureFuncs.makeRandomPick = function (picksArray, leagueId, playerId) {
  // get remaining teams for the player
  var remaining = [];

  for(var i = 0; i < pLTeamsArray.length; i += 1) {
    if(picksArray.indexOf(pLTeamsArray[i].longName) === -1) {
      remaining.push(pLTeamsArray[i].longName);
    }
  }
  //filter remaining teams to only those playing this week
  remaining = remaining.filter(function (b) {
    return arrayOfPlayingTeams().indexOf(b) > -1;
  });

  var randomIndex = Math.round(Math.random() * (remaining.length - 1));
  var randomTeam = remaining[randomIndex];
  //make random choice
  makeChoice(randomTeam, leagueId, playerId);
};

SecureFuncs.finishRound = function (callback) {
  // TODO check next gameweek has been inputted
  var nextRound = currentKillerRound() + 1;
  if (Matches.findOne({killerRound : nextRound})) {
    // cycle through active leagues with mongo foreach; kill the losers or forgive them
    var liveLeaguesCursor = Leagues.find({round : {$gt : 0}, leagueStatus : "active", "members.1" : {$exists : true}});
    var winnersIRL = ["CHE", "BOU", "TOT", "CPL"]; // TODO: Winners collection

    liveLeaguesCursor.forEach(function (doc) {

      var losers = [];
      var winners = [];
      var aliveMembers = doc.members.filter(function (a) {
        return a.diedInRound === 0;
      });
      var round = doc.round;

      aliveMembers.forEach(function (element, index, array) {
        if (winnersIRL.indexOf(element.picks[doc.round - 1]) === -1) {
          losers.push(element.playerId);
        } else {
          winners.push(element.playerId);
        }
      });

      if (winners.length === 1) {
        SecureFuncs.announceWinner(doc._id, winners[0]);
      } else if (losers.length < aliveMembers.length) {
        SecureFuncs.loseLeagueLives(doc._id, losers, round);
      } else if (losers.length === aliveMembers.length) {
        SecureFuncs.forgiveDeath(doc._id);
      }

    });

    SecureFuncs.activateGameWeek();
    callback();
  } else {
    console.log("next matches not inputted");
  }
};

SecureFuncs.loseLeagueLives = function (id, losers, round) {
  // TODO: check the query operator works
  Leagues.update({_id : id, "members.playerId" : {$in : losers}}, {$set : {"members.diedInRound" : round}}, {multi : true});
  Leagues.update({_id : id}, {$inc : {round : 1}});
};

SecureFuncs.forgiveDeath = function (id) {
  // TODO: place for forgiven leagues
  console.log("forgiven", id);
  Leagues.update({_id : id}, {$inc : {round : 1}});
};

SecureFuncs.announceWinner = function (id, winner) {
  Leagues.update({_id : id}, {$set : {winner : winner, leagueStatus : "ended"}});
  //TODO email winners and template for won leagues and trophies
};

SecureFuncs.activateGameWeek = function () {
  Leagues.update({round : 0, dateStarting : nextGameWeek()},{$set : {round : 1}}, function (error, response) {
    if(error) {
      console.log(error);
    } else {
      GameStatus.update({}, {$inc : {killerRound : 1}});
    }
  });
};

SecureFuncs.denyJoiningLeague = function (code, player) {
  var entry = Leagues.findOne({_id : code});
  if(!entry) {
    return "Incorrect code: please check and try again";
  } else if (entry.members.filter(function (e) {
      return e.playerId === player;
    }).length) {
      return "You are already part of this league";
  } else if (!entry.acceptingNewMembers) {
    return "This league has already started so you cannot join it";
  } else {
    return undefined;
  }
};

SecureFuncs.deferSingletonLeagues = function() {
  // TODO: place for deferred leagues
  // array of singlton league IDs
  var singletonLeaguesArray = Leagues.distinct("_id",
    {round : 1, leagueStatus : "active", "members.1" : {$exists : false}}
  );
  Leagues.update(
    {round : 1, leagueStatus : "active", "members.1" : {$exists : false}},
    {$set : {"members.0.picks" : [], dateStarting : nextGameWeek(), acceptingNewMembers : true}},
    {multi : true}
  );
};
