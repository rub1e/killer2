Template.KillerGameWeekMatches.onCreated(function () {
  this.showHideFixtures = new ReactiveVar("show");
});

Template.KillerGameWeekMatches.helpers({

  showHideFixtures : function () {
    return Template.instance().showHideFixtures.get();
  }

});

Template.KillerGameWeekMatches.events({
  "click #showHideFixtures" : function(event, template){
    var showHide = template.showHideFixtures.get() === "hide" ? "show" : "hide";
    template.showHideFixtures.set(showHide);
  }
});
