Template.JoinKillerLeague.helpers({

  codeErrorMessage: function () {
    return Template.instance().errorMessage.get();
  },

  showLeaguePreview : function () {
    return Template.instance().showLeaguePreview.get() ? true : false;
  },

  leaguePreviewDetails : function () {
    var entry = Template.instance().showLeaguePreview.get();
    return Leagues.findOne({_id : entry});
  }

});

Template.JoinKillerLeague.events({

  "click #submitLeagueCodeButton" : function(event, template) {
    event.preventDefault();
    var code = $("#userLeagueCode").val(); // TODO: Trim whitespace
    Meteor.call("joinLeaguePreviewCheck", code, function (error, result) {
      if(!error) {
       template.errorMessage.set(result);
       if(result === undefined) {
          template.showLeaguePreview.set(code);
        }
      }
    });
  },

  "click #confirmJoinLeagueButton" : function (event, template) {
    var code = Template.instance().showLeaguePreview.get();
    Meteor.call("joinLeague", code);
  }
});

Template.JoinKillerLeague.onCreated(function () {
  this.errorMessage = new ReactiveVar(false);
  this.showLeaguePreview = new ReactiveVar(false);
});
