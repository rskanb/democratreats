$(document).ready(function () {
    // This file just does a GET request to figure out which user is logged in
    // and updates the HTML on the page
    // $.get("/home").then(function(data) {
    // //   $(".member-name").text(data.email);
    // });

    $("#optionResult").on("click", function () {
        event.preventDefault();

        // hide Issue form and toolbar
        hideIssueForm();

        // hide Request form and toolbar
        hideRequestForm();

        $("#content-div").empty();

    });

    $("#optionPoll").on("click", function () {
        event.preventDefault();

        // hide Issue form and toolbar
        hideIssueForm();

        // hide Request form and toolbar
        hideRequestForm();

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
        })
    });

    $("#optionIssue").on("click", function () {
        event.preventDefault();

        // show "Create New" button
        $("#issue-toolbar").removeClass("hidden");

        // hide Request form and toolbar
        hideRequestForm();

        $("#content-div").empty();

    });

    // on click "Create New", show form
    $("#issue-form-btn").on("click", function () {
        if ($("#issue-form").hasClass("hidden")) {
            $("#issue-form").removeClass("hidden");
        } else {
            $("#issue-form").addClass("hidden");
        }
    });

    $("#optionRequest").on("click", function () {
        event.preventDefault();

        // hide Issue form and toolbar
        hideIssueForm();

        // show "Create New" button
        $("#request-toolbar").removeClass("hidden");

        $("#content-div").empty();
    });

    // on click "Create New", show form
    $("#request-form-btn").on("click", function () {
        if ($("#request-form").hasClass("hidden")) {
            $("#request-form").removeClass("hidden");
        } else {
            $("#request-form").addClass("hidden");
        }
    });


    //   function initializeRows() {
    //     blogContainer.empty();
    //     var postsToAdd = [];
    //     for (var i = 0; i < posts.length; i++) {
    //       postsToAdd.push(createNewRow(posts[i]));
    //     }
    //     blogContainer.append(postsToAdd);
    //   }

    // This function constructs a post's HTML
    function createNewRow(poll) {
        var formattedDate = new Date(poll.createdAt);
        formattedDate = moment(formattedDate).format("MMMM Do YYYY, h:mm:ss a");
        var newPostCard = $("<div>");
        newPostCard.addClass("card");
        var newPostCardHeading = $("<div>");
        newPostCardHeading.addClass("card-header");
        //var deleteBtn = $("<button>");
        //deleteBtn.text("x");
        //deleteBtn.addClass("delete btn btn-danger");
        //deleteBtn.attr("data-value", poll.id);
        //var editBtn = $("<button>");
        //editBtn.text("EDIT");
        //editBtn.addClass("edit btn btn-info");
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
        //newPostCardHeading.append(deleteBtn);
        //newPostCardHeading.append(editBtn);
        newPostCardHeading.append(newPostTitle);
        // newPostCardHeading.append(newPostAuthor);
        newPostCardBody.append(newPostBody);
        newPostCard.append(newPostCardHeading);
        newPostCard.append(newPostCardBody);
        newPostCard.data("post", poll);
        return newPostCard;
    }

    function hideIssueForm() {
        if (!$("#issue-toolbar").hasClass("hidden")) {
            $("#issue-toolbar").addClass("hidden");

            if (!$("#issue-form").hasClass("hidden")) {
                $("#issue-form").addClass("hidden");
            };
        };
    };

    function hideRequestForm() {
        if (!$("#request-toolbar").hasClass("hidden")) {
            $("#request-toolbar").addClass("hidden");

            if (!$("#request-form").hasClass("hidden")) {
                $("#request-form").addClass("hidden");
            };
        };
    };

});