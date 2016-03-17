Template.KillerAliveLeagues.helpers({

});

Template.KillerAliveLeagues.events({

  "click .leagueDetailsButton" : function (event, template) {
    var modal = event.currentTarget.getAttribute("data-modal").replace("modal", "");
    // render modal with this as data context
    Modal.show(modal, this);
  }
});
