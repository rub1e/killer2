Template.KillerChoiceWidget.helpers({

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
  },

  teamsLeft : function () {
    // TODO: check if this can be skipped by setting data context using #with
    // TODO: make filtering function for unpicked
    var choicesArray = this.members.filter(function (a) {
      return a.playerId === Meteor.userId();
    })[0].picks;
    var remaining = [];
    for(var i = 0; i < pLTeamsArray.length; i += 1) {
      if(choicesArray.indexOf(pLTeamsArray[i].longName) === -1) {
        remaining.push(pLTeamsArray[i].longName);
      }
    }
    return remaining.filter(function (b) {
      return arrayOfPlayingTeams().indexOf(b) > -1;
    });
  }

});

Template.KillerChoiceWidget.events({
  // TODO: this ID stuff can't be right
  "submit .killerChoiceForm" : function (event, template) {
    event.preventDefault();
    var id = "#DD_" + this._id;
    var choice = $(id).find(":selected").text();
    if(choice !== "Pick this week's team"){
      Meteor.call("makeChoice", choice, this._id);
    }
  },

  "submit .repickChoiceForm" : function (event, template) {
    event.preventDefault();
    Meteor.call("allowRepick", this._id);
  }

});
