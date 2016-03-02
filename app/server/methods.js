Meteor.methods({
  manualVerifyEmail : function () {
    Accounts.sendVerificationEmail(Meteor.userId());
    // TODO: change verification email text and sender
  },

  statusToUpdating : function () {
    if(Roles.userIsInRole(Meteor.userId(), "admin")) {
      SecureFuncs.statusTo("updating");
    }
  },

  startMatches : function () {
    if(Roles.userIsInRole(Meteor.userId(), "admin") && GameStatus.findOne().gameStatus === "updating") {
      SecureFuncs.randomPickSweep();
      SecureFuncs.statusTo("active");
    }
  }

});
