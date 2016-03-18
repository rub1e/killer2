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
    var league = Template.parentData(1);
    var event = league.events[league.events.length - 1];
    if(event && event.round === league.round && event.autoPicks) {
      return event.autoPicks.indexOf(this.playerId) > -1;
    }
  }

});
