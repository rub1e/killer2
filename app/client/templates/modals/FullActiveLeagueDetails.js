Template.FullActiveLeagueDetails.helpers({

  memberName : function () {
    return Meteor.users.findOne(this.playerId).fullName();
  },

  memberChoice : function () {
    return this.picks[this.picks.length - 1];
  }

});
