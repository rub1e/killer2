SecureFuncs = {};

SecureFuncs.statusTo = function (status) {
  GameStatus.update({}, {$set : {gameStatus : status}});
};

// TODO: this is so crucial - introduce a check to ensure correct number of picks or throw error
SecureFuncs.randomPickSweep = function (callback) {
  var activeLeaguesCursor = Leagues.find({round : {$gt : 0}, leagueStatus : "active"});
  // iterate over all active leagues with Mongo foreach
  activeLeaguesCursor.forEach(function (doc) {
    var autoPickersArray = [];
    //iterate over the members array in each active league
    doc.members.forEach(function (element, index, array) {
      // check if number of picks is one lower than the round
      if(element.picks.length === doc.round - 1 && element.diedInRound === 0) {
        // get remaining teams for the player
        var remaining = [];

        for(var i = 0; i < pLTeamsArray.length; i += 1) {
          if(picks.indexOf(pLTeamsArray[i].longName) === -1) {
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
        SecureFuncs.makeChoice(randomTeam, _id, element.playerId);
        autoPickersArray.push(element.playerId);
      }
    });
    // add randoms to autopicks array in round event
    Leagues.update({_id : doc._id}, {$push : {events : {round : round, autoPicks : autoPickersArray}}});
    if(doc.acceptingNewMembers) {
      Leagues.update({_id : doc._id}, {$set : {acceptingNewMembers : false}});
    }
  });
  callback();
};

SecureFuncs.makeChoice = function (team, league, player) {
  var leagueObject = Leagues.findOne({_id : league});
  var choicesArray = leagueObject.members.filter(function (a) {
    return a.playerId === player;
  })[0].picks;
  if(choicesArray.indexOf(team) === -1 && choicesArray.length === leagueObject.round - 1 && leagueObject.round > 0) {
    Leagues.update({_id : league, "members.playerId" : player}, {$push : {"members.$.picks" : team}});
  }
};

SecureFuncs.finishRound = function (callback) {
  // check next gameweek has been inputted

  // cycle through active leagues with mongo foreach; kill the losers or forgive them
  var liveLeaguesCursor = Leagues.find({round : {$gt : 0}, leagueStatus : "active"});
  var winnersIRL = ["CHE", "BOU", "TOT", "CPL"]; // TODO: Winners collection

  liveLeaguesCursor.forEach(function (doc) {

    var losers = [];
    var winners = [];
    var aliveMembers = doc.members.filter(function (a) {
      return a.diedInRound === 0;
    });
    var round = doc.round;

    aliveMembers.forEach(function (element, index, array) {
      if (winnersIRL.indexOf(element.picks[element.picks.length - 1]) === -1) {
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

  SecureFuncs.incrementRounds();
  callback();
};

SecureFuncs.loseLeagueLives = function (id, losers, round) {
  Leagues.update({_id : id, "members.playerId" : {$in : losers}}, {$set : {"members.diedInRound" : round}}, {multi : true});
};

SecureFuncs.forgiveDeath = function (id) {
  // TODO: place for forgiven leagues
  console.log("forgiven", id);
};

SecureFuncs.announceWinner = function (id, winner) {
  Leagues.update({_id : id}, {$set : {winner : winner, leagueStatus : "ended"}});
  //TODO email winners and template for won leagues and trophies
};

SecureFuncs.incrementRounds = function () {
  var activeLeaguesCursor = Leagues.find({leagueStatus : "active"});
  activeLeaguesCursor.forEach(function (doc) {
    if(new Date(doc.dateStarting) <= new Date(nextGameWeek())) {
      Leagues.update({_id : doc._id}, {$inc : {round : 1}});
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
  } else if (entry.leagueStatus === "ended" || entry.round > 1) {
    return "This league has already started so you cannot join it";
  } else {
    return undefined;
  }
};
