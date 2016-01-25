AutoForm.hooks({
  startLeagueForm : {
    onSuccess: function(formType, result) {
      Modal.hide();
    }
  }
});

SimpleSchema.debug = true;
