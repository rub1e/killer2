Leagues = new Mongo.Collection("Leagues");

Leagues.helpers({
  chairmanName : function () {
    var firstId = this.members[0].playerId;
    return Meteor.users.findOne(firstId).fullName();
  },
});

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
    type : String,
    label : "Starting week",
    allowedValues : pLGameweeksRemainingFormatted
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
  leagueStatus : {
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
    label : "League members",
    autoValue : function() {
      if(this.isInsert) {
        return [{playerId : Meteor.userId(), picks : [], diedInRound : 0}];
      }
    }
  },
  "members.$.playerId" : {
      type : String,
      label : "Users collection _id",
      autoValue : function() {
        if(this.isUpdate) {
          return Meteor.userId();
        }
      }
  },
  "members.$.picks" : {
    type : [String],
    label : "Ordered array of teams picked",
    autoValue : function() {
      if(this.isUpdate) {
        return [];
      }
    }
  },
  "members.$.diedInRound" : {
    type : Number,
    label : "Round user died in",
    autoValue : function() {
      if(this.isUpdate) {
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
  "events.$.autoPicks" : {
    type : [String],
    label : "Array of _id of players with autopicks",
    optional : true
  }
});

Leagues.attachSchema(LeaguesSchema);
