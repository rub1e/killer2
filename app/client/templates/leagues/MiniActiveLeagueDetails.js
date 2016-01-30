Template.MiniActiveLeagueDetails.helpers({
  playersLeft: function () {
    return this.members.filter(function(a) {
      return a.livesLeft !== 0;
    }).length;
  },

  playersStarted: function () {
    return this.members.length;
  },

  livesLeft : function () {
    return this.members.filter(function(a) {
      return a.playerId === Meteor.userId();
    })[0].livesLeft;
  },

  prizePool : function () {
    return this.entryFee * this.members.length;
  }

});
