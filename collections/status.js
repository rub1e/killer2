GameStatus = new Mongo.Collection("gameStatus");

GameStatusSchema = new SimpleSchema({
  status : {
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

GameStatus.allow({
  insert: function () { return true; },
  update: function () { return true; },
  remove: function () { return true; }
});
