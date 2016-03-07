Matches = new Mongo.Collection("matches");

//TODO add a new field killlerRound and link to gameStatus

MatchesSchema = new SimpleSchema({
  gameWeek : {
    type : String,
    label : "GameWeek date string",
    allowedValues : pLGameweeks
  },
  killerRound : {
    type : Number,
    label : "GameWeek round number"
  },
  deadline : {
    type : String,
    label : "GW deadline"
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
  }
});

Matches.attachSchema(MatchesSchema);
