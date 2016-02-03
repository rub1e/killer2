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

pLGameweeks = ["2015-Aug-08",
"2015-Aug-14",
"2015-Aug-22",
"2015-Aug-29",
"2015-Sep-05",
"2015-Sep-12",
"2015-Sep-19",
"2015-Sep-26",
"2015-Oct-03",
"2015-Oct-10",
"2015-Oct-17",
"2015-Oct-24",
"2015-Oct-31",
"2015-Nov-07",
"2015-Nov-14",
"2015-Nov-21",
"2015-Nov-28",
"2015-Dec-05",
"2015-Dec-12",
"2015-Dec-19",
"2015-Dec-26",
"2016-Jan-02",
"2016-Jan-09",
"2016-Jan-16",
"2016-Jan-23",
"2016-Jan-30",
"2016-Feb-06",
"2016-Feb-13",
"2016-Feb-20",
"2016-Feb-27",
"2016-Mar-05",
"2016-Mar-12",
"2016-Mar-19",
"2016-Mar-26",
"2016-Apr-02",
"2016-Apr-09",
"2016-Apr-16",
"2016-Apr-23",
"2016-Apr-30",
"2016-May-07",
"2016-May-14",
"2016-May-21",
"2016-May-28",
"2016-Jun-04"];

pLGameweeksRemainingFormatted = pLGameweeks.filter(function(a) {
  return new Date(a) > Date.now();
}).map(function(b) {
  return new Date(b).toDateString();
});

currentGameWeek = function () {
  return GameStatus.findOne().currentGameWeek;
};

currentDeadline = function () {
  // TODO: deadline function
  return "deadline";
};
