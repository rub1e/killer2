SecureFuncs = {};

SecureFuncs.statusTo = function (status) {
  GameStatus.update({}, {$set : {gameStatus : "status"}});
};

SecureFuncs.randomPickSweep = function () {
  var activeLeaguesCursor = Leagues.find({leagueStatus : "active"});
  // iterate over all active leagues
  activeLeaguesCursor.forEach(function () {
    var autoPickersArray = [];
    //iterate over the members array in each active league
    members.forEach(function (element, index, array) {
      // check if number of picks is one lower than the round
      if(element.picks.length === round - 1 && element.diedInRound === 0) {
        // get remaining teams for the player
        var remaining = [];

        for(var i = 0; i < pLTeamsArray.length; i += 1) {
          if(picks.indexOf(pLTeamsArray[i].longName) === -1) {
            remaining.push(pLTeamsArray[i].longName);
          }
        }

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
