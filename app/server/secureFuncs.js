SecureFuncs = {};

SecureFuncs.statusTo = function (status) {
  GameStatus.update({}, {$set : {gameStatus : status}});
};

SecureFuncs.randomPickSweep = function () {
  var activeLeaguesCursor = Leagues.find({leagueStatus : "active"});
  // iterate over all active leagues
  activeLeaguesCursor.forEach(function (el, ind, arr) {
    var autoPickersArray = [];
    //iterate over the members array in each active league
    el.members.forEach(function (element, index, array) {
      // check if number of picks is one lower than the round
      if(element.picks.length === round - 1 && element.diedInRound === 0) {
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

SecureFuncs.kill = function () {
  // check next gameweek has been inputted

  // cycle through active leagues; kill the losers or forgive them
  var activeLeaguesCursor = Leagues.find({leagueStatus : "active"});
  var winnersArray = []; // TODO: Winners collection

  activeLeaguesCursor.forEach(function (el, ind, arr) {
    var losers = [];
    el.members.forEach(function (element, index, array) {
      if(element.picks.length === round - 1 && element.diedInRound === 0) {
        if (winnersArray.indexOf(element.picks[element.picks.length - 1]) === -1) {
          losers.push(element.playerId);
        }
      }
    });

    // check if losers is the same length as formerly alive players. So actually filter it earlier in the foreach. 

  });
  // kill the finished leagues, announce winners

  // activate leagues starting in the next GW

  // set gameStatus to pending
};
