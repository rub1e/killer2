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
    if(Roles.userIsInRole(Meteor.userId(), "admin")) {
      SecureFuncs.randomPickSweep(function () {
        SecureFuncs.statusTo("active");
      });
    }
  },

  nextGameWeek : function () {
    if(Roles.userIsInRole(Meteor.userId(), "admin")) {
      SecureFuncs.finishRound(function () {
        SecureFuncs.statusTo("pending");
      });
    }
  }

});
