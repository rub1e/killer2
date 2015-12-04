Template.Navbar.events({
  "click button": function(event, template){
    var modal = event.currentTarget.getAttribute("data-modal").replace("modal", "");
    Modal.show(modal);
  }
});
