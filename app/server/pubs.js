Meteor.publish("allMatches", function(argument){
  // TODO: add this.ready()
  return Matches.find();
});
