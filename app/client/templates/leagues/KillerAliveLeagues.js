Template.KillerAliveLeagues.helpers({

});

Template.KillerAliveLeagues.events({

  "click .leagueDetailsButton" : function (event, template) {
    var modal = event.currentTarget.getAttribute("data-modal").replace("modal", "");
    // render modal with this as data context
    Modal.show(modal, this);
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
