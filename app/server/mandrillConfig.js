Meteor.startup(function(){
  Mandrill.config({
    username : "alex.rubner@gmail.com",
    //username: process.env.MANDRILL_API_USER,  // the email address you log into Mandrill with. Only used to set MAIL_URL.
    //key: process.env.MANDRILL_API_KEY  // get your Mandrill key from https://mandrillapp.com/settings/index
    key : "CfuR2Gz4BJU7yg1pxghOqA"
    // port: 587,  // defaults to 465 for SMTP over TLS
    // host: 'smtp.mandrillapp.com',  // the SMTP host
    // baseUrl: 'https://mandrillapp.com/api/1.0/'  // update this in case Mandrill changes its API endpoint URL or version
  });
});
