Leagues = new Mongo.Collection("Leagues");

LeaguesSchema = new SimpleSchema({
  leagueName : {
    type : String,
    label : "League name",
    min : 5,
    max : 35
  },
  dateCreated : {
    type : Date,
    label : "League creation date",
    defaultValue : new Date()
  },
  dateStarting : {
    type : Date, //should this just be a string????,
    label : "League start date",
    min : Date.now(),
    max : new Date("2016-04-30")
  },
  entryFee : {
    type : Number,
    label : "League entry fee",
    defaultValue : 0
  },
  round : {
    type : Number,
    label : "Current round",
    autoValue : function() {
      if(this.isInsert) {
        return 0;
      }
    }
  },
  status : {
    type : String,
    label : "League status",
    allowedValues : ["active", "ended", "pending"],
    autoValue : function() {
      if(this.isInsert) {
        return "pending"; //what if it should be active??? TODO add prev/current/next gw logic for setting status
      }
    }
  },
  members : {
    type : [Object],
    label : "League members"
  },
  "members.$.playerId" : {
      type : String,
      label : "Users collection _id"
  },
  "members.$.picks" : {
    type : [String],
    label : "Ordered array of teams picked"
  },
  "members.$.livesLeft" : {
    type : Number,
    label : "Lives left in this league",
    max : 3,
    min : 0,
    autoValue : function() {
      if(this.isInsert) {
        return 3;
      }
    }
  },
  "members.$.diedInRound" : {
    type : Number,
    label : "Round user died in",
    autoValue : function() {
      if(this.isInsert) {
        return 0;
      }
    }
  },
  winners : {
    type : [String],
    label : "Array of one or more winners",
    autoValue : function() {
      if(this.isInsert) {
        return [];
      }
    }
  },
  events : {
    type : [Object],
    label : "League events by round",
    autoValue : function() {
      if(this.isInsert) {
        return [];
      }
    }
  },
  "events.$.round" : {
    type : Number,
    label : "Round events occurred in",
    optional : true
  },
  "events.$.playersLostLives" : {
    type : [String],
    label : "Array of _id of players losing lives this round",
    optional : true
  },
  "events.$.autoPicks" : {
    type : [String],
    label : "Array of _id of players with autopicks",
    optional : true
  }
});

Leagues.attachSchema(LeaguesSchema);
