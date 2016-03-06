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

pLGameweeks = ["2015-08-08",
"2015-08-14",
"2015-08-22",
"2015-08-29",
"2015-09-05",
"2015-09-12",
"2015-09-19",
"2015-09-26",
"2015-10-03",
"2015-10-10",
"2015-10-17",
"2015-10-24",
"2015-10-31",
"2015-11-07",
"2015-11-14",
"2015-11-21",
"2015-11-28",
"2015-12-05",
"2015-12-12",
"2015-12-19",
"2015-12-26",
"2016-01-02",
"2016-01-09",
"2016-01-16",
"2016-01-23",
"2016-01-30",
"2016-02-06",
"2016-02-13",
"2016-02-20",
"2016-02-27",
"2016-03-05",
"2016-03-12",
"2016-03-19",
"2016-03-26",
"2016-04-02",
"2016-04-09",
"2016-04-16",
"2016-04-23",
"2016-04-30",
"2016-05-07",
"2016-05-14",
"2016-05-21",
"2016-05-28",
"2016-06-04"];

pLGameweeksRemainingFormatted = pLGameweeks.filter(function(a) {
  return new Date(a) > Date.now();
}).map(function(b) {
  return new Date(b).toDateString();
});

// TODO: remake all current gw functions on current round
currentGameWeek = function () {
  var currentRound = currentKillerRound();
  return Matches.findOne({killerRound : currentRound}).gameWeek;
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
  return ["CHE", "BOU", "AVL", "TOT"];
};
