Template.KillerLeagues.helpers({

  leaguesShowing : function () {
    return Template.instance().liveOrDead.get();
  },

  leaguesHidden : function () {
    return Template.instance().liveOrDead.get() === "active" ? "finished" : "active";
  },

  userLeaguesList : function () {
    var display = Template.instance().liveOrDead.get();
    if(display === "active") {
      return Leagues.find({"members.playerId" : Meteor.userId(), leagueStatus : {$ne : "ended"}});
    } else {
      return Leagues.find({"members.playerId" : Meteor.userId(), leagueStatus : "ended"});
    }
    // TODO: add sorting
    // TODO: only publish other players' choices during active times
    // TODO: table-layout auto
  },

  endedLeaguesExist : function () {
    return !!Leagues.findOne({"members.playerId" : Meteor.userId(), leagueStatus : "ended"});
  }

});

Template.KillerLeagues.events({
  "click #leagueToggle": function(event, template){
    var display = template.liveOrDead.get();
    if (display === "active") {
      template.liveOrDead.set("finished");
    } else {
      template.liveOrDead.set("active");
    }
  }
});

Template.KillerLeagues.onCreated(function(){
  this.liveOrDead = new ReactiveVar("active");
});
