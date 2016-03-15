Template.KillerFinishedLeagues.helpers({

  leagueWinner : function () {
    var winner = this.winner;
    if(winner === Meteor.userId()) {
      return "You!!";
    } else {
      return Meteor.users.findOne({_id : winner}).fullName();
    }
  }

});

Template.KillerFinishedLeagues.events({

});
