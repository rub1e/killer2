Template.registerHelper("gameWeekDateFormatted", function(gameweek){
  // TODO: make UK dates
  var d = new Date(gameweek);
  return d.toDateString();
});

Template.registerHelper("currentGameWeek", function(){
  return currentGameWeek();
});

Template.registerHelper("currentGameStatus", function(){
  return GameStatus.findOne().gameStatus;
});

Template.registerHelper("userAliveLeaguesList", function(){
  // return list of active league objects for current user
});

Template.registerHelper("loggedInUserFullName", function(){
  // return full name of logged in user
  return Meteor.user().fullName();
});

Template.registerHelper("loggedInUserEmail", function(){
  // return email of logged in user
  return Meteor.user().emails[0];
});

Template.registerHelper("listOfCurrentMatches", function(){
  // return list of current matches
  return Matches.findOne({round : currentKillerRound()}).matches;
});

Template.registerHelper('equals',function(v1, v2) {
  return (v1 === v2);
});

Template.registerHelper("disablePickButtons", function(){
  return GameStatus.findOne().gameStatus !== "pending";
});

Template.registerHelper("pLGameweeksRemainingOptions", function () {
  var stringArray = pLGameweeksRemainingFormatted();
  var objArray = [];
  stringArray.forEach(function (element, index, array) {
    objArray.push({label : element, value : element});
  });
  return objArray;
});
