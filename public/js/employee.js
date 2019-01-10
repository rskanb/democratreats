$(document).ready(function() {
    // This file just does a GET request to figure out which user is logged in
    // and updates the HTML on the page
    $.get("/home").then(function(data) {
    //   $(".member-name").text(data.email);
    });
  });


$("#optionPoll").on("click", function () {
    event.preventDefault();
    //event.stopPropagation();
    $("#content-div").empty();
    // $(".poll-container").removeClass("hidden");
    // $(".issue-container").addClass("hidden");
    // $(".request-container").addClass("hidden");
    $.get("/api/poll").then(function(response){
        console.log(response.length);
        //window.location.href = "/employee";
        for(let i=0; i<response.length; i++){
            var htmlPoll = $("<div>");
            htmlPoll.addClass("example");
            // Adding a data-attribute
            //htmlPoll.attr("data-name", response[i].id);
            // Providing the initial button text
            htmlPoll.text(response[i].name);
            $("#content-div").append(htmlPoll);
        }
        
    })
});

// $("#optionIssue").on("click", function () {
//     event.preventDefault();
//     $(".issue-container").removeClass("hidden");

//     $(".poll-container").addClass("hidden");
//     $(".request-container").addClass("hidden");
// });

// $("#optionrequest").on("click", function () {
//     event.preventDefault();
//     $(".request-container").removeClass("hidden");

//     $(".poll-container").addClass("hidden");
//     $(".issue-container").addClass("hidden");
// });