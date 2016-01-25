Template.JoinKillerLeague.helpers({

  codeErrorMessage: function () {
    return Template.instance().errorMessage.get();
  }

});

Template.JoinKillerLeague.events({
  "click #submitLeagueCodeButton": function(event, template){
     event.preventDefault();
     var code = $("#userLeagueCode").val(); // TODO: Trim whitespace
     var entry = Leagues.findOne({_id : code});
     if(!entry) {
       template.errorMessage.set("Incorrect code: please check and try again");
       console.log("incorrect");
     } else if (entry.members.filter(function(a){
       return a.playerId === Meteor.userId();
     }).length > 0) {
       template.errorMessage.set("You are already part of this league");
     } else {
       Meteor.call("joinLeague", code, function (error, result) {
         if(!error) {
           template.errorMessage.set(result);
         }
      });
    }
  }
});

Template.JoinKillerLeague.onCreated(function () {
    this.errorMessage = new ReactiveVar(undefined);
});
