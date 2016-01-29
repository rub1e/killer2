Template.StartKillerLeague.helpers({

  showFieldsPreview : function (){
    return Template.instance().showFieldsPreview.get() ? true : false;
  },

  startLeagueFormFields : function () {
    return AutoForm.getFormValues("startLeagueForm");
  }
});

Template.StartKillerLeague.events({

  "click #showPreviewButton": function(event, template){
    event.preventDefault();
    if(AutoForm.validateForm("startLeagueForm")) {
      template.showFieldsPreview.set(true);
      console.log("validated");
    }
  },

  "click #makeChangesButton" : function (event, template) {
    event.preventDefault();
    template.showFieldsPreview.set(false);
  }
});

Template.StartKillerLeague.onCreated(function () {
  this.showFieldsPreview = new ReactiveVar(false);
});
