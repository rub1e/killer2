Leagues = new Mongo.Collection("Leagues");

Leagues.helpers({
  chairmanName : function () {
    var firstId = this.members[0].playerId;
    return Meteor.users.findOne(firstId).fullName();
  },

  leagueDeadline : function () {
    // TODO: check your maths on acceptingNewMembers
    if(!this.acceptingNewMembers) {
      return currentDeadline();
    } else {
      var dateProper = new Date(this.dateStarting);
      var year = dateProper.getFullYear();
      var month = dateProper.getMonth() + 1;
      var day = dateProper.getDate();
      var dateString;
      month = month < 10 ? "0" + month : month;
      day = day < 10 ? "0" + day : day;
      dateString = year + " " + month + " " + day;
      return Matches.findOne({gameWeek : dateString}).deadline;
    }
  }
});

LeaguesSchema = new SimpleSchema({
  leagueName : {
    type : String,
    label : "League name",
    min : 5,
    max : 35
  },
  dateStarting : {
    type : String,
    label : "Starting week",
  },
  acceptingNewMembers : {
    type : Boolean,
    label : "Accepting new members?",
    autoValue : function () {
      if(this.isInsert) {
        return true;
      }
    }
  },
  round : {
    type : Number,
    label : "Current round",
    autoValue : function() {
      if(this.isInsert) {
        var starting = this.field("dateStarting");
        if (Date.parse(starting.value) === Date.parse(currentGameWeek())) {
          return 1;
        } else {
          return 0;
        }
      }
    }
  },
  leagueStatus : {
    type : String,
    label : "League status",
    allowedValues : ["active", "ended"],
    autoValue : function () {
      if(this.isInsert) {
        return "active";
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
  }, // TODO: remove autovalues from updates and just do it manually you lazy boy
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
  winner : {
    type : String,
    label : "The winner",
    autoValue : function () {
      if(this.isInsert) {
        return "";
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
