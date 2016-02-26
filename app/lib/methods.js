Meteor.methods({
  changeEmailMethod : function (address1, address2) {
    alert(address1 === address2);
    // TODO: once validation in place, add in update email function
  },

  joinLeaguePreviewCheck : function (code) {
    var entry = Leagues.findOne({_id : code});
    if(!entry) {
      return "Incorrect code: please check and try again";
    } else if (entry.members.filter(function(e) {return e.playerId === Meteor.userId();}).length) {
      return "You are already part of this league";
    } else {
      return undefined;
    }
  },

  joinLeague : function (code) {
    var entry = Leagues.findOne({_id : code});
    // check if member already in league
    // TODO: does this exist because you could just call joinleague without the preview check?
    if(!entry.members.filter(function(e) {return e.playerId === Meteor.userId();}).length) {
      Leagues.update({_id : code}, {$push : {members : {}}}, function (error, result) {
        if(!error) {
          return result;
        }
      });
    }
  },

  makeChoice : function (team, league) {
    // TODO: function to return list of user choices
    var leagueObject = Leagues.findOne({_id : league});
    var choicesArray = leagueObject.members.filter(function (a) {
      return a.playerId === Meteor.userId();
    })[0].picks;
    if(choicesArray.indexOf(team) === -1 && choicesArray.length === leagueObject.round - 1 && leagueObject.round > 0) {
      Leagues.update({_id : league, "members.playerId" : Meteor.userId()}, {$push : {"members.$.picks" : team}});
    }
  },

  allowRepick : function (league) {
    var leagueObject = Leagues.findOne({_id : league});
    var choicesArray = leagueObject.members.filter(function (a) {
      return a.playerId === Meteor.userId();
    })[0].picks;
    if(choicesArray.length === leagueObject.round && leagueObject.round > 0) {
      Leagues.update({_id : league, "members.playerId" : Meteor.userId()}, {$pop : {"members.$.picks" : 1}});
    }
  }

});
