Matches = new Mongo.Collection("Matches");

MatchesSchema = new SimpleSchema({
  gameWeek : {
    type : String,
    label : "gameWeek"
  },
  matches : {
    type : [Object],
    label : "Array of match objects"
  },
  "matches.$.home" : {
    type : String,
    label : "Home team",
    allowedValues : ["ARS", "AVL", "BOU", "CHE", "CPL", "EVE", "LEI", "LIV", "MCI", "MUN", "NEW", "NOR", "SOU", "STK", "SUN", "SWA", "TOT", "WAT", "WBA", "WHU"]
  },
  "matches.$.away" : {
    type : String,
    label : "Away team",
    allowedValues : ["ARS", "AVL", "BOU", "CHE", "CPL", "EVE", "LEI", "LIV", "MCI", "MUN", "NEW", "NOR", "SOU", "STK", "SUN", "SWA", "TOT", "WAT", "WBA", "WHU"]
  },
  "matches.$.time" : {
    type : Date,
    label : "Time of match"
  }
});

Matches.attachSchema(MatchesSchema);
