Template.KillerAliveLeagues.helpers({

});

//LeaguePanels

Template.LeaguePanel.events({

  "click .show-hide-info-live" : function (event, template) {
    var showHide = template.showHideLive.get() === "Show " ? "Hide " : "Show ";
    template.showHideLive.set(showHide);
  },

  "click .show-hide-info-dead" : function (event, template) {
    var showHide = template.showHideDead.get() === "Show" ? "Hide" : "Show";
    template.showHideDead.set(showHide);
  }

});


Template.LeaguePanel.onCreated(function () {
  this.showHideLive = new ReactiveVar("Show ");
  this.showHideDead = new ReactiveVar("Show");
});

Template.LeaguePanel.helpers({

  playersStarted: function () {
    return this.members.length;
  },

  showHidePlayersChoices : function () {
    var status = currentGameStatus();
    var showHide = Template.instance().showHideLive.get();
    if (status === "pending" && this.acceptingNewMembers) {
      return showHide + "players so far";
    } else if (status === "pending") {
      return showHide + "active players";
    } else if (status === "active") {
      return showHide + "active players & teams picked";
    }
  },

  showHideDead : function () {
    return Template.instance().showHideDead.get();
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
