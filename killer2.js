if (Meteor.isClient) {

  // Template.hello.helpers({
  //   counter: function () {
  //     return Session.get('counter');
  //   }
  // });
  //
  Template.registerHelper('signedup', function () {
      return Session.get("signedup");
  });

  Template.Signupform.events({
    'submit form': function (e) {
      e.preventDefault();
      Meteor.call("sendAddressEmail", $("#emailInputBox").val(), function(error, response){
        $("#emailInputBox").val("");
        Session.set("signedup", true);
      });
    }
  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });

  Meteor.methods({
    sendAddressEmail : function(address){
      Mandrill.messages.send({
        "message" : {
          "to" : [
            {
                "email": "chairman@killer.football",
            }
          ],
          "subject" : "New killer signup",
          "text" : address,
          "from_email" : "chairman@killer.football"
        }
      });
    }
  });

  Mandrill.config({
    username : process.env.MANDRILL_API_USER,
    key : process.env.MANDRILL_API_KEY
  });
}
