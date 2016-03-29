// always have access to matches and your own picks
Meteor.publish("allMatches", function(argument){
  // TODO: add this.ready()
  var admin = Roles.userIsInRole(this.userId, "admin");
  var users = admin ? Meteor.users.find() : Meteor.users.find({}, {fields : {_id : 1, "profile.firstName" : 1, "profile.lastName" : 1}});
  var data = [Matches.find(), GameStatus.find(), Leagues.find({}), users];
  return data;
});
