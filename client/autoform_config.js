AutoForm.hooks({
  changEmailQuickForm: {
    onSuccess: function(formType, result) {
      console.log(result);
      this.resetForm();
      Modal.hide();
      alert("Email updated!");
    }
  }
});
