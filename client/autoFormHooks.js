AutoForm.hooks({
  startLeagueForm : {
    onSuccess: function(formType, result) {
      Modal.hide();
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
