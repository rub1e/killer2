Template.body.events({
  "click .modalButton" : function (event, template) {
    var modal = event.currentTarget.getAttribute("data-modal").replace("modal", "");
    Modal.show(modal);
  },

  "click .sendVerificationEmailButton" : function (event, template) {
    Meteor.call("manualVerifyEmail", function (error, result) {
      if (!error) {
        alert("Email sent - check your inbox now");
      }
    });
  },

  "click .facebookShare" : function (event, template) {
    FB.ui({
      method: 'share',
      href: 'http://killer.football',
    }, function(response){});
  }
  
});
