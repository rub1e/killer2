pLTeamsArray = [{longName : "Arsenal", shortName : "ARS"},
                  {longName : "Aston Villa", shortName : "AVL"},
                  {longName : "Bournemouth", shortName : "BOU"},
                  {longName : "Chelsea", shortName : "CHE"},
                  {longName : "Crystal Palace", shortName : "CPL"},
                  {longName : "Everton", shortName : "EVE"},
                  {longName : "Leicester City", shortName : "LEI"},
                  {longName : "Liverpool", shortName : "LIV"},
                  {longName : "Manchester City", shortName : "MCI"},
                  {longName : "Manchester United", shortName : "MUN"},
                  {longName : "Newcastle United", shortName : "NEW"},
                  {longName : "Norwich City", shortName : "NOR"},
                  {longName : "Southampton", shortName : "SOU"},
                  {longName : "Stoke City", shortName : "STK"},
                  {longName : "Sunderland", shortName : "SUN"},
                  {longName : "Swansea City", shortName : "SWA"},
                  {longName : "Tottenham Hotspur", shortName : "TOT"},
                  {longName : "Watford", shortName : "WAT"},
                  {longName : "West Bromwich Albion", shortName : "WBA"},
                  {longName : "West Ham United", shortName : "WHU"}];

pLGameweeks = function () {
  if(!Matches) {
    return [];
  } else {
    var objectArray = Matches.find({}, {_id : 0, gameWeek : 1});
    var gWArray = [];
    objectArray.forEach(function (doc) {
      gWArray.push(doc.gameWeek);
    });
    // TODO: sort by date?
    console.log(gWArray);
    return gWArray;
  }
};

pLGameweeksRemainingFormatted = function () {
  var array = pLGameweeks().filter(function(a) {
    return new Date(a) > Date.now();
  }).map(function(b) {
    return new Date(b).toDateString();
  });
  console.log(array);
  return array;
};

// TODO: remake all current gw functions on current round
currentGameWeek = function () {
  return GameStatus.findOne().currentGameWeek;
};

nextGameWeek = function () {
  var nextRound = currentKillerRound() + 1;
  return Matches.findOne({killerRound : nextRound}).gameWeek;
};

currentKillerRound = function () {
  return GameStatus.findOne().killerRound;
};

currentDeadline = function () {
  // TODO: deadline function
  return "deadline";
};

arrayOfPlayingTeams = function () {
  // TODO: array of playing teams
  // var matchesObjects = Matches.findOne({killerRound : currentKillerRound()})
  // var playingTeams = [];
  // matchesObjects.forEach(function (element, index, array) {
  //   playingTeams.push(element.home, element.away);
  // });
  // return playingTeams;
  return ["CHE", "BOU", "AVL", "TOT"];
};
