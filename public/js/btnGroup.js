$(document).ready(function() {
    // This file just does a GET request to figure out which user is logged in
    // and updates the HTML on the page
    $.get("/home").then(function(data) {
    //   $(".member-name").text(data.email);
    });
  });


$("#option1").on("click", function () {
    event.preventDefault();
    $(".resource-container").removeClass("hidden");

    $(".member-container").addClass("hidden");
    $(".poll-container").addClass("hidden");
    $(".issue-container").addClass("hidden");
    $(".request-container").addClass("hidden");
});

$("#option2").on("click", function () {
    event.preventDefault();
    $(".member-container").removeClass("hidden");

    $(".resource-container").addClass("hidden");
    $(".poll-container").addClass("hidden");
    $(".issue-container").addClass("hidden");
    $(".request-container").addClass("hidden");
});

$("#option3").on("click", function () {
    event.preventDefault();
    $(".poll-container").removeClass("hidden");

    $(".resource-container").addClass("hidden");
    $(".member-container").addClass("hidden");
    $(".issue-container").addClass("hidden");
    $(".request-container").addClass("hidden");
});

$("#option4").on("click", function () {
    event.preventDefault();
    $(".issue-container").removeClass("hidden");

    $(".resource-container").addClass("hidden");
    $(".member-container").addClass("hidden");
    $(".poll-container").addClass("hidden");
    $(".request-container").addClass("hidden");
});

$("#option5").on("click", function () {
    event.preventDefault();
    $(".request-container").removeClass("hidden");

    $(".resource-container").addClass("hidden");
    $(".member-container").addClass("hidden");
    $(".poll-container").addClass("hidden");
    $(".issue-container").addClass("hidden");
});
