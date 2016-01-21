// AutoForm.validateForm("startLeagueForm")

Template.StartKillerLeague.helpers({

  showFieldsPreview : function (){
    return Template.instance().showFieldsPreview.get();
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
  }
});

Template.StartKillerLeague.onCreated(function () {
  this.showFieldsPreview = new ReactiveVar(false);
});

SimpleSchema.debug = true
