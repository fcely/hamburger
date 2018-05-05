
$(function() {
  $(".eat").on("click", function(event) {
    var id = $(this).data("id");



  
    $.ajax("/api/eat/" + id, {
      type: "POST"
    }).then(
      function() {
        location.reload();
      }
    );
  });



$("#new_order") .on("click", function(event) {
  location.reload();})


})