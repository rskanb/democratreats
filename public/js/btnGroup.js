$(document).ready(function() {

$("#option3").on("click", function () {
    event.preventDefault();
    //event.stopPropagation();
    $("#content-div").empty();
    // $(".poll-container").removeClass("hidden");
    // $(".issue-container").addClass("hidden");
    $.get("/api/poll").then(function(response){
        console.log(response);
        var pollToAdd = [];
        if(response.length===0){
          alert("Currently, Dont have any Poll");
        }
        //window.location.href = "/employee";
        for(let i=0; i<response.length; i++){
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
    editBtn.attr("data-value", poll.id);
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
  

  $("#option1").on("click", function () {
    event.preventDefault();
    // $(".request-container").removeClass("hidden");
    $("#content-div").empty();
    // $(".poll-container").addClass("hidden");
    // $(".issue-container").addClass("hidden");
});

$(document).on("click", "button.delete", handlePollDelete);

function handlePollDelete() {
    var currentPoll = $(this).data('value');
    console.log("delete "+currentPoll);
    deletePoll(currentPoll);
  }
function deletePoll(id) {
    $.ajax({
        method: "DELETE",
        url: "/api/poll/" + id
      })
        .then(function(response) {
          console.log(response);
          $("#content-div").empty();
          $.get("/api/poll").then(function(response){
            console.log(response);
            var pollToAdd = [];
            //window.location.href = "/employee";
            for(let i=0; i<response.length; i++){
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
function handlePollEdit(){
  var editPollId = $(this).data('value');
    console.log("Edit "+ editPollId);
    editPoll(editPollId);
}

function editPoll(id) {
  $.ajax({
      method: "POST",
      url: "/api/edit/" + id
    })
      .then(function(response) {
        console.log(response);
        var pollToEdit = []
        $("#content-div").empty();
      //window.location.href= "/admin"
      //window.location.href = "/home"
      var htmlPoll = $("<div>");
      htmlPoll.attr(contenteditable="true");
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
  newPostEditHeading.attr('contentEditable','true');
  var editPostBtn = $("<button>");
  editPostBtn.text("EDIT");
  editPostBtn.addClass("editpoll btn btn-info");
  editPostBtn.attr("data-value", poll.id);
  var editPostTitle = $("<h3 id='title'>");
  // var newPostAuthor = $("<h5>");
  // newPostAuthor.text("Written by: " + post.Author.name);
  // newPostAuthor.css({
  //   float: "right",
  //   color: "blue",
  //   "margin-top":
  //   "-10px"
  // });
  var newPostEditBody = $("<div>");
  newPostEditBody.addClass("card-body cardEdit");
  var newPostEditBody = $("<p id='story'>");
  newPostEditBody.attr('contentEditable','true');
  editPostBtn.attr('contentEditable','false');
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

$(document).on("click", "button.editpoll", function(event){
  event.preventDefault();
  var editPollId = $(this).data('value');
  var title = $('#title').text();
  var story = $('#story').text();
  var updateData = {
    id : editPollId,
    name: title,
    description: story
    }
  console.log(updateData)
    updatePoll(updateData)
  //console.log(""+ editPollId + title + story);
});

function updatePoll(updatedPollData){
  // $.post("/api/update", updatedPollData).then(function(response){
  //   console.log(response)
  // });
  $.ajax({
    method: "PUT",
    url: "/api/update",
    data: updatedPollData
  })
    .then(function() {
        //console.log(response);
      window.location.href = "/home";
    });
}