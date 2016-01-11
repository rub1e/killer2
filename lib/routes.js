FlowRouter.route("/", {
  name: "home",
  action: function(params, queryParams) {
    BlazeLayout.render("HomeLayout", {
      footer: "KillerFooter",
      main: "KillerContent",
      nav: "Navbar"
    });
  }
});

FlowRouter.route("/matches", {
  name : "matches",
  action : function (params, queryParams) {
    BlazeLayout.render("HomeLayout", {
      footer : "KillerFooter",
      main : "MatchesForm",
      nav : "Navbar"
    });
  }
});
