Template.KillerChoiceWidget.helpers({

  teamsLeft : function () {
    // TODO: check if this can be skipped by setting data context using #with
    var choicesArray = this.members.filter(function (a) {
      return a.playerId === Meteor.userId();
    })[0].picks;
    var remaining = [];
    for(var i = 0; i < pLTeamsArray.length; i += 1) {
      if(choicesArray.indexOf(pLTeamsArray[i].longName) === -1) {
        remaining.push(pLTeamsArray[i].longName);
      }
    }
    return remaining;
  }

});

Template.KillerChoiceWidget.events({
  "submit .killerChoiceForm" : function (event, template) {
    event.preventDefault();
    var id = "#DD" + this._id;
    var choice = $(id).find(":selected").text();
    Meteor.call("makeChoice", choice, this._id);
  }
});
