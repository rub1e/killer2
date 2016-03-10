GameStatus = new Mongo.Collection("gameStatus");

GameStatus.helpers({

  currentGameWeek : function () {
    return Matches.findOne({killerRound : this.killerRound}).gameWeek;
  }

});

GameStatusSchema = new SimpleSchema({
  gameStatus : {
    type : String,
    label : "Game status",
    allowedValues : ["active", "updating", "pending"]
  },
  killerRound : {
    type : Number,
    label : "Current gameWeek round number"
  }
});

GameStatus.attachSchema(GameStatusSchema);
