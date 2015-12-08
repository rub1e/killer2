Template.body.events({
  "click .modalButton": function(event, template){
    var modal = event.currentTarget.getAttribute("data-modal").replace("modal", "");
    Modal.show(modal);
  },
  "click": function(event, template){
    var modal = event.currentTarget.getAttribute("data-modal");
    console.log("click", modal);
  }
});
