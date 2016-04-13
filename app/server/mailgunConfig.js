Meteor.startup(function(){

  //global emails settings
  Accounts.emailTemplates.from = "The Chairman <chairman@killer.football>";
  Accounts.emailTemplates.siteName = "killerDOTfootball";

  //verify email settings
  Accounts.emailTemplates.verifyEmail.subject = function (user) {
    return "Welcome to killerDOTfootball!";
  };
  Accounts.emailTemplates.verifyEmail.text = function (user, url) {
    return "Welcome to killerDOTfootball! Please verify your email by clicking the link below: \n\n" + url + "\n\n And if you ever need any assistance, just email chairman@killer.football or reply to this message\n\n\ Good luck!";
  };
});
