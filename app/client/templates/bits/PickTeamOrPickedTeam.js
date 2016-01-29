
Template.PickTeamOrPickedTeam.helpers({

  chosenTeamName : function () {
    var choicesArray = this.members.filter(function(a){
      return a.playerId === Meteor.userId();
    })[0].picks;
    // if number of picks equals round then user is up to date with picks
    if(choicesArray.length && choicesArray.length === this.round) {
      return choicesArray[choicesArray.length - 1];
    } else {
      return undefined;
    }
  }

});
