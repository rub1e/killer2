Matches = new Mongo.Collection("matches");

MatchesSchema = new SimpleSchema({
  gameWeek : {
    type : String,
    label : "GameWeek date YYYY-MM-DD"
  },
  killerRound : {
    type : Number,
    label : "GameWeek round number"
  },
  deadline : {
    type : Date,
    label : "GW deadline",
    autoform: {
      afFieldInput: {
        type: "bootstrap-datetimepicker"
      }
    }
  },
  matches : {
    type : [Object],
    label : "Array of match objects",
    optional : true
  },
  "matches.$.home" : {
    type : String,
    label : "Home team",
    allowedValues : ["ARS", "AVL", "BOU", "CHE", "CPL", "EVE", "LEI", "LIV", "MCI", "MUN", "NEW", "NOR", "SOU", "STK", "SUN", "SWA", "TOT", "WAT", "WBA", "WHU"],
    optional : true
  },
  "matches.$.away" : {
    type : String,
    label : "Away team",
    allowedValues : ["ARS", "AVL", "BOU", "CHE", "CPL", "EVE", "LEI", "LIV", "MCI", "MUN", "NEW", "NOR", "SOU", "STK", "SUN", "SWA", "TOT", "WAT", "WBA", "WHU"],
    optional : true
  }
});

Matches.attachSchema(MatchesSchema);
