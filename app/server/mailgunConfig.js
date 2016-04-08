Meteor.startup(function(){

  process.env.MAIL_URL = "smtp://postmaster@sandboxe308f129bdb647b4948e7d35c8687980.mailgun.org:e016c6fe2316f8ee2c82e8a8eae473d5@smtp.mailgun.org:587";

  Accounts.emailTemplates.from = "killerDOTfootbal <chairman@killer.football>";
});
// FIXME: env variables
