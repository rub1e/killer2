AccountsTemplates.configure({
  // behaviour
  confirmPassword : true,
  defaultState : "signIn",
  enablePasswordChange : true, //TODO configure route for this
  enforceEmailVerification : false,
  focusFirstInput : true,
  forbidClientAccountCreation : false,
  overrideLoginErrors : false, //TODO think this is easiest
  sendVerificationEmail : false,
  redirectTimeout : 2000,
  socialLoginStyle : "popup",
  // appearance
  showAddRemoveServices : true,
  showForgotPasswordLink : true,
  showLabels : true,
  showPlaceholders : true,
  showResendVerificationEmailLink : false,
  // texts
  texts : {
    // TODO texts for each state here
  },
  // client-side validation
  continuousValidation : false,
  negativeValidation : true, //TODO check what this looks like!
  positiveValidation : false,
  negativeFeedback : true, //TODO again
  positiveFeedback : false,
  showValidating : true,
  // links
  homeRoutePath : "/",
  //privacyUrl : undefined, //TODO modal??
  //termsUrl : undefined, //TODO modal??
  // hooks
  onLogoutHook : function() {}, //redirect to / ???
  onSubmitHook : function(error, state) {}, //close modal/dropdown??
  preSignUpHook : function(password, info) {} //probs won't use
});
