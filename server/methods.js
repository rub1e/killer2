Meteor.startup(function(){
  Meteor.methods({
    changeEmailMethod : function(address) {
      alert(address);
    }
  });
});
