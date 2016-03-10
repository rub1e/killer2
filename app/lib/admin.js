AdminConfig = {
  name: 'Killer',
  adminEmails: ['chairman@killer.football'],
  collections: {
    Leagues : {
      tableColumns : [
        {label : "Name", name : "leagueName"},
        {label : "ID", name : "_id"},
        {label : "Status", name : "leagueStatus"},
        {label : "Round", name : "round"},
        {label : "Starting", name : "dateStarting"}
      ]
    },
    GameStatus : {},
    Matches : {
      tableColumns : [
        {label : "round", name : "killerRound"},
        {label : "GameWeek", name : "gameWeek"},
        {label : "deadline", name : "deadline"},
        {label : "matches", name : "matches"}
      ]
    }
  }
};

// TODO: stop autoform from validating on keypress
// TODO: customise GameStatus
