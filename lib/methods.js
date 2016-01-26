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
    if(!entry.members.filter(function(e) {return e.playerId === Meteor.userId();}).length) {
      Leagues.update({_id : code}, {$push : {members : {}}});
    }
  }

});
