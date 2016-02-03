GameStatus = new Mongo.Collection("gameStatus");

GameStatusSchema = new SimpleSchema({
  gameStatus : {
    type : String,
    label : "Game status",
    allowedValues : ["active", "updating", "pending"]
  },
  currentGameWeek : {
    type : String,
    label : "Current gw",
    allowedValues : pLGameweeks
  },
});

GameStatus.attachSchema(GameStatusSchema);
