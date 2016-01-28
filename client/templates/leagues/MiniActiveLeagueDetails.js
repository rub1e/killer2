Template.MiniActiveLeagueDetails.helpers({
  playersLeft: function () {
    //return number of active players
  },

  playersStarted: function () {
    //return length of players array
  },

  livesLeft : function () {
    return this.members.filter(function(a) {
      return a.playerId === Meteor.userId();
    })[0].livesLeft;
  }
  
});
