Template.StartKillerLeague.helpers({

  displayControlStart : function (){
    return Template.instance().displayControlStart.get();
  },

  showForm : function () {
    return Template.instance().displayControlStart.get() === "form" ? false : true;
  },

  startLeagueFormFields : function () {
    return AutoForm.getFormValues("startLeagueForm");
  }

});

Template.StartKillerLeague.events({

  "click #showPreviewButton": function(event, template){
    event.preventDefault();
    if(AutoForm.validateForm("startLeagueForm")) {
      template.displayControlStart.set("preview");
      console.log("validated");
    }
  },

  "click #makeChangesButton" : function (event, template) {
    event.preventDefault();
    template.displayControlStart.set("form");
  },

  "submit" : function (event, template) {
    template.displayControlStart.set("success");
  },

  "click #facebookNewLeagueShare" : function (event, template) {
    FB.ui({
      method: 'share',
      href: 'http://killer.football',
    }, function(response){});
  }

});

Template.StartKillerLeague.onCreated(function () {
  this.displayControlStart = new ReactiveVar("form");
});

Template.StartKillerLeague.onDestroyed(function(){
   Session.set("newLeagueJustCreatedCode", undefined);
});

Template.StartLeagueSuccess.helpers({
  newLeagueCode : function () {
    return Session.get("newLeagueJustCreatedCode");
  }
});

Template.StartLeagueSuccess.onRendered(function(){
  var code = Session.get("newLeagueJustCreatedCode");
  twttr.widgets.createShareButton(
    "http:\/\/killer.football",
    document.getElementById("tw"),
    {
      size: "large",
      text: "Join my league on killerDOTfootball! Code: " + code,
    }
  );
});
