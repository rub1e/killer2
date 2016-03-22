Template.KillerAliveLeagues.helpers({

});

//LeaguePanels

Template.LeaguePanel.events({

  "click .show-hide-info" : function (event, template) {
    var showHide = template.showHide.get() === "Show " ? "Hide " : "Show ";
    template.showHide.set(showHide);
  }

});


Template.LeaguePanel.onCreated(function () {
  this.showHide = new ReactiveVar("Show ");
});

Template.LeaguePanel.helpers({

  showHidePlayersChoices : function () {
    var status = currentGameStatus();
    var showHide = Template.instance().showHide.get();
    if (status === "pending" && this.acceptingNewMembers) {
      return showHide + "league members so far";
    } else if (status === "pending") {
      return showHide + "league members";
    } else if (status === "active") {
      return showHide + "league members & teams picked";
    }
  },

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

//MiniActiveLeagueDetails template

Template.MiniActiveLeagueDetails.helpers({
  playersLeft: function () {
    return this.members.filter(function(a) {
      return a.diedInRound === 0;
    }).length;
  },

  playersStarted: function () {
    return this.members.length;
  }

});
