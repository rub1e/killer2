Meteor.methods({
  manualVerifyEmail : function () {
    Accounts.sendVerificationEmail(Meteor.userId());
    // TODO: change verification email text and sender
  },

  statusToUpdating : function () {
    SecureFuncs.statusTo("updating");
  },

  startMatches : function () {
    SecureFuncs.statusTo("updating");
    SecureFuncs.randomPickSweep();
    SecureFuncs.statusTo("active");
  }

});
