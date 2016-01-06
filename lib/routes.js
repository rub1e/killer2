FlowRouter.route('/', {
  name: "home",
  action: function(params, queryParams) {
    BlazeLayout.render('HomeLayout', {
      footer: "KillerFooter",
      main: "KillerContent",
      nav: "Navbar",
    });
  }
});
