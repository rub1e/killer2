Template.KillerAliveLeagues.helpers({

});

//LeaguePanels

Template.LeaguePanel.helpers({

  playersStarted: function () {
    return this.members.length;
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

});

//MiniActiveLeagueDetails template

Template.MiniActiveLeagueDetails.helpers({

  playersLeft: function () {
    return this.members.filter(function(a) {
      return a.diedInRound === 0;
    }).length;
  },

  playersStarted: function () {
    return this.members.length;
  },

  currentPlayerDiedInRound : function () {
    var currentPlayer = this.members.filter(function (a) {
      return a.playerId === Meteor.userId();
    });
    return currentPlayer.diedInRound;
  }

});

// fullActiveLeagueDetails Template

Template.FullActiveLeagueDetails.onCreated(function () {
  this.showHide = new ReactiveVar("Show full details");
});

Template.FullActiveLeagueDetails.events({

  "click .show-hide-info" : function (event, template) {
    var showHide = template.showHide.get() === "Show full details" ? "Hide full details" : "Show full details";
    template.showHide.set(showHide);
  },

});

Template.FullActiveLeagueDetails.helpers({

  memberName : function () {
    var member;
    var chairman = Template.parentData(1).members[0].playerId;
    if (this.playerId === Meteor.userId()) {
      member = "You";
    } else {
      member = Meteor.users.findOne(this.playerId).fullName();
    }
    if (this.playerId === chairman) {
      return member + " (chairman)";
    } else {
      return member;
    }
  },

  showHidePlayersChoices : function () {
    return Template.instance().showHide.get();
  },

  isAutoPick : function () {
    // because this is in an each block, go up one level to get league object
    var league = Template.parentData(1);
    var event = league.events[league.events.length - 1];
    if(event && event.round === league.round && event.autoPicks) {
      return event.autoPicks.indexOf(this.playerId) > -1;
    }
  }
});
