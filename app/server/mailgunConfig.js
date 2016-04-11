Meteor.startup(function(){
<<<<<<< HEAD
  // process.env.MAIL_URL="smtp://postmaster@sandboxe308f129bdb647b4948e7d35c8687980.mailgun.org:e016c6fe2316f8ee2c82e8a8eae473d5@smtp.mailgun.org:587";
  process.env.MAIL_URL="smtp://postmaster@killer.football:9a88bd540bb57456bdfa9d7410899229@smtp.mailgun.org:587";
// Accounts.emailTemplates.from = "killerDOTfootball <chairman@killer.football>";
// Accounts.emailTemplates.siteName = "killer.football";
// Accounts.emailTemplates.headers = {replyTo : "andy@killer.football"};
=======

  process.env.MAIL_URL = "smtp://postmaster@sandboxe308f129bdb647b4948e7d35c8687980.mailgun.org:e016c6fe2316f8ee2c82e8a8eae473d5@smtp.mailgun.org:587";

  //global emails settings
  Accounts.emailTemplates.from = "The Chairman <chairman@killer.football>";
  Accounts.emailTemplates.siteName = "killerDOTfootball";

  //verify email settings
  Accounts.emailTemplates.verifyEmail.subject = function (user) {
    return "Welcome to killerDOTfootball!";
  };
  Accounts.emailTemplates.verifyEmail.text = function (user, url) {
    console.log(url);
    return "Welcome to killerDOTfootball! Please verify your email by clicking the link below: \n\n" + url + "\n\n And if you ever need any assistance, just email chairman@killer.football or reply to this message\n\n\ Good luck!";
  };

>>>>>>> a252a59738c3be049cafffdb954f6eb27f1c039d
});
// FIXME: env variables
