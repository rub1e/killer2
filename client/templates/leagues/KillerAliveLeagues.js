Template.KillerAliveLeagues.helpers({

  userAliveLeaguesList : function () {
    return Leagues.find({"members.playerId" : Meteor.userId()});
  }
});
