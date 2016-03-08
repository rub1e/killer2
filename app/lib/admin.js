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
    Matches : {} // TODO: fix date-time and use admin dash for matches input
  }
};

// TODO: stop autoform from validating on keypress
