Meteor.methods({
  changeEmailMethod : function (address1, address2) {
    alert(address1 === address2);
    // TODO: once validation in place, add in update email function
  },

  joinLeaguePreviewCheck : function (code) {
    // TODO: check return
    return SecureFuncs.denyJoiningLeague(code, Meteor.userId());
  },

  joinLeague : function (code) {
    if(!SecureFuncs.denyJoiningLeague(code, Meteor.userId())) {
      Leagues.update({_id : code}, {$push : {members : {}}}, function (error, result) {
        if(!error) {
          return result;
        }
      });
    }
  },

  makeChoice : function (team, league) {
    // TODO: function to return list of user choices
    SecureFuncs.makeChoice(team, league, Meteor.userId());
  },

  allowRepick : function (league) {
    var leagueObject = Leagues.findOne({_id : league});
    var choicesArray = leagueObject.members.filter(function (a) {
      return a.playerId === Meteor.userId();
    })[0].picks;
    if(choicesArray.length === leagueObject.round && leagueObject.round > 0) {
      Leagues.update({_id : league, "members.playerId" : Meteor.userId()}, {$pop : {"members.$.picks" : 1}});
    }
  }

});
