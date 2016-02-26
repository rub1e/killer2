Template.JoinKillerLeague.helpers({

  displayControlJoin : function () {
    return Template.instance().displayControlJoin.get();
  },

  codeErrorMessage: function () {
    return Template.instance().errorMessage.get();
  },

  showLeaguePreview : function () {
    return Template.instance().displayControlJoin.get() === "form" ? false : true;
  },

  leaguePreviewDetails : function () {
    var entry = Template.instance().leagueCode.get();
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
          template.displayControlJoin.set("preview");
          template.leagueCode.set(code);
        }
      }
    });
  },

  "click #confirmJoinLeagueButton" : function (event, template) {
    var code = template.leagueCode.get();
    Meteor.call("joinLeague", code, function (error, result) {
      if(!error) {
        template.displayControlJoin.set("success");
      }
    });
  }
});

Template.JoinKillerLeague.onCreated(function () {
  this.errorMessage = new ReactiveVar(false);
  this.displayControlJoin = new ReactiveVar("form");
  this.leagueCode = new ReactiveVar(undefined);
});
