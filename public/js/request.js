$(document).ready(function () {

    var nameInput = $("#request-name-input");
    var descriptionInput = $("#request-description-input");
  
    $(document).on("click", ".request-submit", function(event){
        event.preventDefault();
        console.log("great success");
          // Don't do anything if the name fields hasn't been filled out
        if (!nameInput.val().trim()) {
        return;
        }
        var requestData = {
            name: nameInput.val().trim(),
            description: descriptionInput.val()
        }

        upsertRequest(requestData);
        console.log(requestData);
    });

    function upsertRequest(userData) {
        $.post("/api/requests", userData)
          .then(function(response){
              console.log(response);
              $("#request-name-input").val("");
              $("#request-description-input").val("");
          });
        };      
});