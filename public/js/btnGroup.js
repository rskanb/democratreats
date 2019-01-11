$(document).ready(function () {

  // Members Button
  $("#option3").on("click", function () {

    event.preventDefault();

    // show "Create New" button
    $("#poll-toolbar").removeClass("hidden");

    // hide member toolbar
    $("#member-toolbar").addClass("hidden");
    hideMemberForm();


    //event.stopPropagation();
    $("#content-div").empty();
    // $(".poll-container").removeClass("hidden");
    // $(".issue-container").addClass("hidden");
    $.get("/api/poll").then(function (response) {
      console.log(response);
      var pollToAdd = [];
      if (response.length === 0) {
        alert("Currently, Dont have any Poll");
      }
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
    })

  });

  // on click "Create New", show form
  $("#poll-form-btn").on("click", function () {
    if ($("#poll-form").hasClass("hidden")) {
      $("#poll-form").removeClass("hidden");
    } else {
      $("#poll-form").addClass("hidden");
    }
  });

  // on click "Create New", show form
  $("#member-form-btn").on("click", function () {
    if ($("#member-form").hasClass("hidden")) {
      $("#member-form").removeClass("hidden");
    } else {
      $("#member-form").addClass("hidden");
    }
  });

  function createNewRow(poll) {
    var formattedDate = new Date(poll.createdAt);
    formattedDate = moment(formattedDate).format("MMMM Do YYYY, h:mm:ss a");
    var newPostCard = $("<div>");
    newPostCard.addClass("card");
    var newPostCardHeading = $("<div>");

    // card-header
    newPostCardHeading.addClass("card-header");

    // delete button
    var deleteBtn = $("<button>");
    deleteBtn.text("X");
    deleteBtn.addClass("delete btn btn-danger");
    deleteBtn.attr("data-value", poll.id);

    // edit button
    var editBtn = $("<button>");
    editBtn.text("EDIT");
    editBtn.addClass("edit btn btn-success");
    editBtn.attr("data-value", poll.id);

    // header-button container
    var headerBtn = $("<div>");
    headerBtn.addClass("float-right")
    headerBtn.append(editBtn, deleteBtn);

    var newPostTitle = $("<h3>");
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

    var newPostOption = $("<p>");
    newPostTitle.text(poll.name + " ");
    newPostBody.text(poll.description);
    newPostDate.text(formattedDate);
    for(var i =0; i<=3; i++){
      var optionBtn = $("<button>");
      optionBtn.text(poll.Options[i].name);
      optionBtn.addClass("option1 btn btn-light btn-lg btn-block");
      optionBtn.attr("data-value", poll.Options[0].id);
      newPostOption.append(optionBtn);
  }
  newPostBody.append(newPostOption);
    newPostTitle.append(newPostDate);

    // append card-header buttons
    newPostCardHeading.append(headerBtn);

    newPostCardHeading.append(newPostTitle);
    // newPostCardHeading.append(newPostAuthor);
    newPostCardBody.append(newPostBody);
    newPostCard.append(newPostCardHeading);
    newPostCard.append(newPostCardBody);
    newPostCard.data("post", poll);

    // adds styles margin to card
    newPostCard.addClass("mb-3")

    return newPostCard;
  }

  // results button =============================================================================
  $("#option1").on("click", function () {
    event.preventDefault();

    // Hides Form Creation
    hidePollForm();
    hideMemberForm();

    // $(".request-container").removeClass("hidden");
    $("#content-div").empty();
    // $(".poll-container").addClass("hidden");
    // $(".issue-container").addClass("hidden");
  });

  // members button =============================================================================
  $("#option2").on("click", function () {

    // Hides Poll Form Creation
    hidePollForm();
    hideMemberForm();

    // show "Create New" button
    $("#member-toolbar").removeClass("hidden");

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

  // requests button =============================================================================
  $("#option5").on("click", function () {
    // Hides Poll Form Creation
    hidePollForm();
    hideMemberForm();

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


  function hideMemberForm() {
    if (!$("#member-toolbar").hasClass("hidden")) {
      $("#member-toolbar").addClass("hidden");

      if (!$("#member-form").hasClass("hidden")) {
        $("#member-form").addClass("hidden");
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
        $("#content-div").empty();
        $.get("/api/poll").then(function (response) {
          console.log(response);
          var pollToAdd = [];
          //window.location.href = "/employee";
          for (let i = 0; i < response.length; i++) {
            var editPoll = $("<div>");
            editPoll.addClass("example");
            // Adding a data-attribute
            //htmlPoll.attr("data-name", response[i].id);
            // Providing the initial button text
            editPoll.text(response[i].name);
            pollToAdd.push(createNewRow(response[i]));
          }
          $("#content-div").append(pollToAdd);
        });
      });
  }


  $(document).on("click", "button.edit", handlePollEdit);
  function handlePollEdit() {
    var editPollId = $(this).data('value');
    console.log("Edit " + editPollId);
    editPoll(editPollId);
  }

  function editPoll(id) {
    $.ajax({
      method: "POST",
      url: "/api/edit/" + id
    })
      .then(function (response) {
        console.log(response);
        var pollToEdit = []
        $("#content-div").empty();
        //window.location.href= "/admin"
        //window.location.href = "/home"
        var htmlPoll = $("<div>");
        htmlPoll.attr(contenteditable = "true");
        htmlPoll.text(response.name);
        pollToEdit.push(editNewRow(response));
        $("#content-div").append(pollToEdit);
      });
  }
});

function editNewRow(poll) {
  var newPostEdit = $("<div>");
  newPostEdit.addClass("card");
  var newPostEditHeading = $("<div>");
  newPostEditHeading.addClass("card-header");
  newPostEditHeading.attr('contentEditable', 'true');
  var editPostBtn = $("<button>");
  editPostBtn.text("EDIT");
  editPostBtn.addClass("editpoll btn btn-info");
  editPostBtn.attr("data-value", poll.id);
  var editPostTitle = $("<h3 id='title'>");
  var newPostEditBody = $("<div>");
  newPostEditBody.addClass("card-body cardEdit");
  var newPostEditBody = $("<p id='story'>");
  newPostEditBody.attr('contentEditable', 'true');
  editPostBtn.attr('contentEditable', 'false');
  editPostTitle.text(poll.name + " ");
  newPostEditBody.text(poll.description);
  newPostEditBody.append(editPostBtn);
  newPostEditHeading.append(editPostTitle);
  // newPostCardHeading.append(newPostAuthor);
  newPostEditBody.append(newPostEditBody);
  newPostEdit.append(newPostEditHeading);
  newPostEdit.append(newPostEditBody);
  newPostEdit.data("post", poll);
  return newPostEdit;
}

$(document).on("click", "button.editpoll", function (event) {
  event.preventDefault();
  var editPollId = $(this).data('value');
  var title = $('#title').text();
  var story = $('#story').text();
  var updateData = {
    id: editPollId,
    name: title,
    description: story
  }
  console.log(updateData)
  updatePoll(updateData)
  //console.log(""+ editPollId + title + story);
});


function updatePoll(updatedPollData){
  $.ajax({
    method: "PUT",
    url: "/api/update",
    data: updatedPollData
  })
    .then(function () {
      //console.log(response);
      window.location.href = "/home";
    });
}

