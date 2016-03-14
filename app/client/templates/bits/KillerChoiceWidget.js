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

Template.KillerChoiceForm.helpers({
  // TODO: sort this nonsense out - teamsleft shouldn't be so complicated
    teamsLeft : function () {
      if (this.round === 0 || (this.round === 1 && !this.members[1])) {
        return pLTeamsLong();
      }

      var choicesArray = this.members.filter(function (a) {
        return a.playerId === Meteor.userId();
      })[0].picks;
      var remaining = [];
      for(var i = 0; i < pLTeamsArray.length; i += 1) {
        if(choicesArray.indexOf(pLTeamsArray[i].longName) === -1) {
          remaining.push(pLTeamsArray[i].longName);
        }
      }
      return remaining.filter(function (a) {
        return arrayOfPlayingTeams("long").indexOf(a) > -1;
      });
    }
});
