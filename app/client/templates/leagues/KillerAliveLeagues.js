Template.KillerAliveLeagues.helpers({

  userAliveLeaguesList : function () {
    return Leagues.find({"members.playerId" : Meteor.userId()});
  },

});

Template.KillerAliveLeagues.events({

  "click .leagueDetailsButton" : function (event, template) {
    var modal = event.currentTarget.getAttribute("data-modal").replace("modal", "");
    Modal.show(modal, this);
  }
});