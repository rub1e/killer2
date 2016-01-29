Template.registerHelper("gameWeekDateFormatted", function(gameweek){
  // TODO: make UK dates
  var d = new Date(gameweek);
  return d.toDateString();
});

Template.registerHelper("currentGameWeek", function(){
  return GameStatus.findOne().currentGameWeek;
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

Template.registerHelper("listOfCurrentMatches", function(){
  // return list of current matches
  return Matches.findOne({gameWeek : currentGameWeek()}).matches;
});
