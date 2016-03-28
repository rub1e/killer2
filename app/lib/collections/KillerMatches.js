Matches = new Mongo.Collection("matches");

MatchesSchema = new SimpleSchema({
  gameWeek : {
    type : String,
    label : "GameWeek date YYYY MM DD"
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
    allowedValues : ["Arsenal", "Aston Villa", "Bournemouth", "Chelsea", "Crystal Palace", "Everton", "Leicester City", "Liverpool", "Manchester City", "Manchester United", "Newcastle United", "Norwich City", "Southampton", "Stoke City", "Sunderland", "Swansea City", "Tottenham Hotspur", "Watford", "West Bromwich Albion", "West Ham United"],
    optional : true
  },
  "matches.$.away" : {
    type : String,
    label : "Away team",
    allowedValues : ["Arsenal", "Aston Villa", "Bournemouth", "Chelsea", "Crystal Palace", "Everton", "Leicester City", "Liverpool", "Manchester City", "Manchester United", "Newcastle United", "Norwich City", "Southampton", "Stoke City", "Sunderland", "Swansea City", "Tottenham Hotspur", "Watford", "West Bromwich Albion", "West Ham United"],
    optional : true
  },
  winners : {
    type : [String],
    label : "List of winners",
    allowedValues : ["Arsenal", "Aston Villa", "Bournemouth", "Chelsea", "Crystal Palace", "Everton", "Leicester City", "Liverpool", "Manchester City", "Manchester United", "Newcastle United", "Norwich City", "Southampton", "Stoke City", "Sunderland", "Swansea City", "Tottenham Hotspur", "Watford", "West Bromwich Albion", "West Ham United"],
    optional : true,
  }
});

Matches.attachSchema(MatchesSchema);
