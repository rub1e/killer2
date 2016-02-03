Meteor.methods({
  manualVerifyEmail : function () {
    Accounts.sendVerificationEmail(Meteor.userId());
    // TODO: change verification email text and sender
  }
});
