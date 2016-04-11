Template.HomeLayout.onCreated(function () {
  DocHead.setTitle("killerDOTfootball - free premier league predictions game");
  //facebook meta tags
  DocHead.addMeta({property : "og:url", content : "http://killer.football"});
  DocHead.addMeta({property : "og:title", content : "Free premier league predictions game"});
  DocHead.addMeta({property : "og:description", content : "Pit your wits against your friends in a simple game of footie predictions. Sign up now for free."});
  DocHead.addMeta({property : "og:site_name", content : "killer DOT football"});
  DocHead.addMeta({property : "og:image", content : "https://s3-eu-west-1.amazonaws.com/killerpicks/killerZip.png"});
  DocHead.addMeta({property : "fb:app_id", content : "436461956559485"});

  //twitter meta tags
  DocHead.addMeta({name : "twitter:card", content : "summary"});
  DocHead.addMeta({name : "twitter:site", content : "@killerpicks"});
  DocHead.addMeta({name : "twitter:title", content : "killerDOTfootball - free premier league predictions game"});
  DocHead.addMeta({name : "twitter:description", content : "Pit your wits against your friends in a simple game of footie predictions. Sign up now for free."});
  DocHead.addMeta({name : "twitter:image", content : "https://s3-eu-west-1.amazonaws.com/killerpicks/killerZip.png"});
  DocHead.addMeta({name : "twitter:image:alt", content : "Logo of killerDOTfootball"});


  DocHead.addLink({rel : "icon",  sizes : "16x16 32x32", href : "/favicon.ico"});
});
