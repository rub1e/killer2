AccountsTemplates.configure({
  // layout
  defaultLayout: 'HomeLayout',
  defaultLayoutRegions: {
      nav: 'Navbar',
      footer: 'KillerFooter'
  },
  defaultContentRegion: 'main',
  // behaviour
  confirmPassword : true,
  defaultState : "signIn",
  enablePasswordChange : true, //TODO configure route for this
  enforceEmailVerification : false,
  focusFirstInput : true,
  forbidClientAccountCreation : false,
  overrideLoginErrors : false, //TODO think this is easiest
  sendVerificationEmail : true,
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
  negativeValidation : true,
  positiveValidation : false,
  negativeFeedback : true,
  positiveFeedback : false,
  showValidating : true,
  // links
  homeRoutePath : "/",
  //privacyUrl : undefined,
  //termsUrl : undefined,
  // hooks
  onLogoutHook : function() {},
  onSubmitHook : function(error, state) {
    if(!error){
      Modal.hide();
    }
  }, //close modal/dropdown??
  preSignUpHook : function(password, info) {} //probs won't use
});

// Add FIRST name to signup form
AccountsTemplates.addField({
  _id : "firstName",
  type : "text",
  required : true,
  displayName : "First name",
  placeholder : "Your first name",
  maxLength : 50,
  re : /^[a-zA-Z]+$/,
  errStr : "Please enter your first name without special characters"
});

// Add LAST name to signup form
AccountsTemplates.addField({
  _id : "lastName",
  type : "text",
  required : true,
  displayName : "Last name",
  placeholder : "Your last name",
  maxLength : 50,
  re : /^[a-zA-Z]+$/,
  errStr : "Please enter your last name without special characters"
});

AccountsTemplates.configureRoute('changePwd');
AccountsTemplates.configureRoute('forgotPwd');
AccountsTemplates.configureRoute('resetPwd');
// AccountsTemplates.configureRoute('signIn');
// AccountsTemplates.configureRoute('signUp');
AccountsTemplates.configureRoute('verifyEmail');
