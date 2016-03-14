Template.KillerChoiceWidget.helpers({

  chosenTeamName : function () {
    var choicesArray = this.members.filter(function (a) {
      return a.playerId === Meteor.userId();
    })[0].picks;

    // if league is open to members, it's either in round 0 or 1, so any choice made should be displayed or undefined
    if (this.acceptingNewMembers) {
      return choicesArray[0];
    } else {
      //if choices are up to date, length of array is round - 1; if choices not up to date, length is round - 2, so undefined
      return choicesArray[this.round -1];
    }

  },
// TODO: sort this nonsense out - teamsleft shouldn't be so complicated
  teamsLeft : function () {
    var choicesArray = this.members.filter(function (a) {
      return a.playerId === Meteor.userId();
    })[0].picks;
    var remaining = [];
    for(var i = 0; i < pLTeamsArray.length; i += 1) {
      if(choicesArray.indexOf(pLTeamsArray[i].longName) === -1) {
        remaining.push(pLTeamsArray[i].longName);
      }
    }
    if (this.round === 0) {
      return remaining;
    } else {
      var remainingPlaying = [];
      for (var j = 0; j < remaining.length; j += 1) {
        var index = pLTeamsLong().indexOf(remaining[j]);
        var shortName = pLTeamsShort()[index];
        if (arrayOfPlayingTeams().indexOf(shortName) > -1) {
          remainingPlaying.push(remaining[j]);
        }
      }
      return remainingPlaying;
    }
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
