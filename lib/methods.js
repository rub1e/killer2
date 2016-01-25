Meteor.methods({
  changeEmailMethod : function (address1, address2) {
    alert(address1 === address2);
    // TODO: once validation in place, add in update email function
  },

  joinLeague : function (code) {
    var entry = Leagues.findOne({_id : code});
    if(!entry) {
      return "Incorrect code: please check and try again";
    } else if (entry.members.indexOf(Meteor.userId()) > -1) {
      return "You are already part of this league";
    } else {
      return undefined;
    }
  }

});
