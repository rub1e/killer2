SecureFuncs = {};

SecureFuncs.statusTo = function (status) {
  GameStatus.update({}, {$set : {gameStatus : status}});
};

// TODO: this is so crucial - introduce a check to ensure correct number of picks or throw error
SecureFuncs.randomPickSweep = function (callback) {
  var activeLeaguesCursor = Leagues.find({leagueStatus : "active"});
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
    Leagues.update({_id : _id}, {$push : {events : {round : round, autoPicks : autoPickersArray}}});
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
  var activeLeaguesCursor = Leagues.find({leagueStatus : "active"});
  var winnersIRL = ["CHE", "BOU", "TOT", "CPL"]; // TODO: Winners collection

  activeLeaguesCursor.forEach(function (doc) {

    var losers = [];
    var aliveMembers = doc.members.filter(function (a) {
      return a.diedInRound === 0;
    });
    var round = doc.round;

    aliveMembers.forEach(function (element, index, array) {
      if (winnersIRL.indexOf(element.picks[element.picks.length - 1]) === -1) {
        losers.push(element.playerId);
      }
    });

    if (losers.length < aliveMembers.length) {
      SecureFuncs.loseLeagueLives(doc._id, losers, round);
    } else if (losers.length === aliveMembers.length) {
      SecureFuncs.forgiveDeath(doc._id);
    }

  });

  SecureFuncs.killLeagues(SecureFuncs.activateLeagues);

  callback();
};

SecureFuncs.loseLeagueLives = function (id, losers, round) {
  Leagues.update({_id : id, "members.playerId" : {$in : losers}}, {$set : {"members.diedInRound" : round}});
};

SecureFuncs.forgiveDeath = function (id) {
  // TODO: place for forgiven leagues
  console.log("forgiven", id);
};

SecureFuncs.killLeagues = function (callback) {
  Leagues.update({leagueStatus : "active", },{});
  callback();
};

// because you can't access the winner from an update operation, you'll have to revert to the previous iteration where you collect winners and losers and ids and only then update.
