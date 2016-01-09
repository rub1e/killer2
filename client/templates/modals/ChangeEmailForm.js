Template.ChangeEmailForm.onCreated = function(){

};

Template.ChangeEmailForm.events({
  "click #updateEmailButton" : function(event, template){
    event.preventDefault();
    var email1 = $("input[name=newEmail1]").val();
    var email2 = $("input[name=newEmail2]").val();
    // TODO: add validation to client AND server (send both to server) and figure out why standard HTML5 validation isn't working
    if(email1 === email2){
      Meteor.call("changeEmailMethod", email1, email2);
    } else {
      alert("no match");
    }
  }
});

Template.ChangeEmailForm.helpers({
   emailsArray : function(){
    return Meteor.user().emails;
  },
  multiEmails : function () {
    if(Meteor.user().emails.length === 1) {
      return {
        disabled : "",
        class : "disabled"
      };
    }
  }
});
