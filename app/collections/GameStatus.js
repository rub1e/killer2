GameStatus = new Mongo.Collection("gameStatus");

GameStatusSchema = new SimpleSchema({
  gameStatus : {
    type : String,
    label : "Game status",
    allowedValues : ["active", "updating", "pending"]
  },
  killerRound : {
    type : Number,
    label : "Current gameWeek round number"
  },
  currentGameWeek : {
    type : String,
    label : "Current gameWeek date string",
    allowedValues : pLGameweeks
  },
});

GameStatus.attachSchema(GameStatusSchema);
