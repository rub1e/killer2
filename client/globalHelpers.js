Template.registerHelper("currentGameweekDateFormatted", function(){
  //get current GW and format to human string
});

Template.registerHelper("userAliveLeaguesList", function(){
  // return list of active league objects for current user
});

Template.registerHelper("loggedInUserFullName", function(){
  // return full name of logged in user
  return "Bob";
});

Template.registerHelper("loggedInUserEmail", function(){
  // return email of logged in user
  return Meteor.user().emails[0];
});
