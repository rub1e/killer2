Template.DeadlineMethods.helpers({

});

Template.DeadlineMethods.events({
  "click #toggleUpdatingButton" : function (event, template){
    Meteor.call("statusToUpdating", function (error, result) {
      if(GameStatus.findOne().gameStatus === "updating") {
        console.log("Leagues are updating");
      }
    });
  },

  "click #startMatchesButton" : function () {
    Meteor.call("startMatches", function (error, result) {
      if(error) {
        console.log(error);
      } else {
        console.log("matches started");
      }
    });
  }
});
