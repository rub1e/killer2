UserProfiles = new Mongo.Collection("UserProfiles");

UserProfilesSchema = new SimpleSchema({
  playerId : {
    type : String,
    label : "_id of player in Users",
    defaultValue : this.userId
  },
  firstName : {
    type : String,
    label : "First name"
  },
  lastName : {
    type : String,
    label : "Last name"
  },
  faveTeam : {
    type : String,
    label : "Player's fave team",
    optional : true
  },
  location : {
    type : String,
    label : "Player's location",
    optional : true
  }
});
