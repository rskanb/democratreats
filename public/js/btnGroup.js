$(document).ready(function () {
  //     // This file just does a GET request to figure out which user is logged in
  //     // and updates the HTML on the page
  //     $.get("/home").then(function(data) {
  //     //   $(".member-name").text(data.email);
  //     });
  //   });


  // $("#option1").on("click", function () {
  //     event.preventDefault();
  //     $(".resource-container").removeClass("hidden");

  //     $(".member-container").addClass("hidden");
  //     $(".poll-container").addClass("hidden");
  //     $(".issue-container").addClass("hidden");
  //     $(".request-container").addClass("hidden");
  // });

  // $("#option2").on("click", function () {
  //     event.preventDefault();
  //     $(".member-container").removeClass("hidden");

  //     $(".resource-container").addClass("hidden");
  //     $(".poll-container").addClass("hidden");
  //     $(".issue-container").addClass("hidden");
  //     $(".request-container").addClass("hidden");
  // });

  // $("#option3").on("click", function () {
  //     event.preventDefault();
  //     $(".poll-container").removeClass("hidden");

  //     $(".resource-container").addClass("hidden");
  //     $(".member-container").addClass("hidden");
  //     $(".issue-container").addClass("hidden");
  //     $(".request-container").addClass("hidden");
  // });

  // $("#option4").on("click", function () {
  //     event.preventDefault();
  //     $(".issue-container").removeClass("hidden");

  //     $(".resource-container").addClass("hidden");
  //     $(".member-container").addClass("hidden");
  //     $(".poll-container").addClass("hidden");
  //     $(".request-container").addClass("hidden");
  // });

  // $("#option5").on("click", function () {
  //     event.preventDefault();
  //     $(".request-container").removeClass("hidden");

  //     $(".resource-container").addClass("hidden");
  //     $(".member-container").addClass("hidden");
  //     $(".poll-container").addClass("hidden");
  //     $(".issue-container").addClass("hidden");

  // poll button
  $("#option3").on("click", function () {
    event.preventDefault();

    // show "Create New" button
    $("#poll-toolbar").removeClass("hidden");

    //event.stopPropagation();
    $("#content-div").empty();
    // $(".poll-container").removeClass("hidden");
    // $(".issue-container").addClass("hidden");
    // $(".request-container").addClass("hidden");
    $.get("/api/poll").then(function (response) {
      console.log(response);
      var pollToAdd = [];
      //window.location.href = "/employee";
      for (let i = 0; i < response.length; i++) {
        var htmlPoll = $("<div>");
        htmlPoll.addClass("example");
        // Adding a data-attribute
        //htmlPoll.attr("data-name", response[i].id);
        // Providing the initial button text
        htmlPoll.text(response[i].name);

        pollToAdd.push(createNewRow(response[i]));
      }
      $("#content-div").append(pollToAdd);
    });
  });

  // on click "Create New", show form
  $("#poll-form-btn").on("click", function () {
    if ($("#poll-form").hasClass("hidden")) {
      $("#poll-form").removeClass("hidden");
    } else {
      $("#poll-form").addClass("hidden");
    }
  });

  function createNewRow(poll) {
    var formattedDate = new Date(poll.createdAt);
    formattedDate = moment(formattedDate).format("MMMM Do YYYY, h:mm:ss a");
    var newPostCard = $("<div>");
    newPostCard.addClass("card");
    var newPostCardHeading = $("<div>");
    newPostCardHeading.addClass("card-header");
    var deleteBtn = $("<button>");
    deleteBtn.text("x");
    deleteBtn.addClass("delete btn btn-danger");
    deleteBtn.attr("data-value", poll.id);
    var editBtn = $("<button>");
    editBtn.text("EDIT");
    editBtn.addClass("edit btn btn-info");
    var newPostTitle = $("<h2>");
    var newPostDate = $("<small>");
    // var newPostAuthor = $("<h5>");
    // newPostAuthor.text("Written by: " + post.Author.name);
    // newPostAuthor.css({
    //   float: "right",
    //   color: "blue",
    //   "margin-top":
    //   "-10px"
    // });
    var newPostCardBody = $("<div>");
    newPostCardBody.addClass("card-body");
    var newPostBody = $("<p>");
    newPostTitle.text(poll.name + " ");
    newPostBody.text(poll.description);
    newPostDate.text(formattedDate);
    newPostTitle.append(newPostDate);
    newPostCardHeading.append(deleteBtn);
    newPostCardHeading.append(editBtn);
    newPostCardHeading.append(newPostTitle);
    // newPostCardHeading.append(newPostAuthor);
    newPostCardBody.append(newPostBody);
    newPostCard.append(newPostCardHeading);
    newPostCard.append(newPostCardBody);
    newPostCard.data("post", poll);
    return newPostCard;
  }

  // results button
  $("#option1").on("click", function () {
    event.preventDefault();

    // Hides Poll Form Creation
    hidePollForm();

    // $(".request-container").removeClass("hidden");
    $("#content-div").empty();
    // $(".poll-container").addClass("hidden");
    // $(".issue-container").addClass("hidden");
  });

  // members button
  $("#option2").on("click", function () {

    // Hides Poll Form Creation
    hidePollForm();

    $("#content-div").empty();

    $.get("/api/user").then(function (response) {
      console.log(response);
      var userToAdd = [];
      //window.location.href = "/employee";
      for (let i = 0; i < response.length; i++) {
        var htmlPoll = $("<div>");
        htmlPoll.addClass("example");
        // Adding a data-attribute
        //htmlPoll.attr("data-name", response[i].id);
        // Providing the initial button text
        htmlPoll.text(response[i].name);

        userToAdd.push(createNewRowMember(response[i]));
      }
      $("#content-div").append(userToAdd);
    });
  });

  function createNewRowMember(user) {
    var formattedDate = new Date(user.createdAt);
    formattedDate = moment(formattedDate).format("MMMM Do YYYY, h:mm:ss a");
    var newPostCard = $("<div>");
    newPostCard.addClass("card");
    var newPostCardHeading = $("<div>");
    newPostCardHeading.addClass("card-header");
    var deleteBtn = $("<button>");
    deleteBtn.text("x");
    deleteBtn.addClass("delete btn btn-danger");
    deleteBtn.attr("data-value", user.id);
    var editBtn = $("<button>");
    editBtn.text("EDIT");
    editBtn.addClass("edit btn btn-info");
    var newPostTitle = $("<h2>");
    var newPostDate = $("<small>");
    // var newPostAuthor = $("<h5>");
    // newPostAuthor.text("Written by: " + post.Author.name);
    // newPostAuthor.css({
    //   float: "right",
    //   color: "blue",
    //   "margin-top":
    //   "-10px"
    // });
    var newPostCardBody = $("<div>");
    newPostCardBody.addClass("card-body");
    var newPostBody = $("<p>");
    newPostTitle.text(user.name + " ");
    newPostBody.text(user.email);
    newPostDate.text(formattedDate);
    newPostTitle.append(newPostDate);
    newPostCardHeading.append(deleteBtn);
    newPostCardHeading.append(editBtn);
    newPostCardHeading.append(newPostTitle);
    // newPostCardHeading.append(newPostAuthor);
    newPostCardBody.append(newPostBody);
    newPostCard.append(newPostCardHeading);
    newPostCard.append(newPostCardBody);
    newPostCard.data("post", user);
    return newPostCard;
  }

  // requests button
  $("#option5").on("click", function () {
    // Hides Poll Form Creation
    hidePollForm();

    $("#content-div").empty();

  });

  $(document).on("click", "button.delete", handlePollDelete);

  function hidePollForm() {
    if (!$("#poll-toolbar").hasClass("hidden")) {
      $("#poll-toolbar").addClass("hidden");

      if (!$("#poll-form").hasClass("hidden")) {
        $("#poll-form").addClass("hidden");
      };
    };
  };

  function handlePollDelete() {
    var currentPoll = $(this).data('value');
    console.log("delete " + currentPoll);
    deletePoll(currentPoll);
  }
  function deletePoll(id) {
    $.ajax({
      method: "DELETE",
      url: "/api/poll/" + id
    })
      .then(function (response) {
        console.log(response);
      });
  }


});

