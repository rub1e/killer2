Template.KillerContent.onCreated(function () {
  var self = this;
  self.autorun(function(){
    self.subscribe("allMatches");
  });
});
