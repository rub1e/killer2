Template.FullActiveLeagueDetails.helpers({

  memberName : function () {
    return Meteor.users.findOne(this.playerId).fullName();
  },

  memberChoice : function () {
    return this.picks[this.picks.length - 1];
  },

  aliveMembers : function () {
    return Template.currentData().members.filter(function (a) {
      return a.diedInRound === 0;
    });
  },

  deadMembers : function () {
    return Template.currentData().members.filter(function (a) {
      return a.diedInRound !== 0;
    }).sort(function (a, b) {
      return a - b;
    });
  },

  isAutoPick : function () {
    var event = Template.currentData().events[Template.currentData().events.length - 1];
    if(event.round === round && event.autoPicks) {
      return event.autoPicks.indexOf(this.playerId) > -1;
    }
  }

});
