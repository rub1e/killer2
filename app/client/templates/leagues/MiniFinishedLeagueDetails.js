Template.KillerFinishedLeagues.helpers({

  numberOfPlayers : function () {
    return this.members.length;
  },

  userDiedInRound : function () {
    return this.members.filter(function (a) {
      return a.playerId === Meteor.userId();
    }).diedInRound;
  }
  
});
