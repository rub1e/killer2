AutoForm.hooks({
  startLeagueForm : {
    onSuccess: function(formType, result) {
      Session.set("newLeagueJustCreatedCode", result);
    }
  },

  changEmailQuickForm: {
    onSuccess: function(formType, result) {
      console.log(result);
      this.resetForm();
      Modal.hide();
      alert("Email updated!");
    }
  }

});

SimpleSchema.debug = true;
