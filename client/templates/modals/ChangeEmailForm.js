Template.ChangeEmailForm.onCreated = function(){

};

Template.ChangeEmailForm.events({
  "click #updateEmailButton" : function(event, template){
    event.preventDefault();
    var email1 = $("input[name=newEmail1]").val();
    var email2 = $("input[name=newEmail2]").val();
    if(email1 === email2){
      Meteor.call("changeEmailMethod", email1);
    } else {
      alert("no match");
    }
  }
});
