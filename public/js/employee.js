// var moment = require('moment');

$(document).ready(function () {

    // moment().format();
    $("#optionResult").on("click", function () {
        event.preventDefault();
        // hide Issue form and toolbar
        hideIssueForm();
        // hide Request form and toolbar
        hideRequestForm();
        $("#content-div").empty();
        $("#poll-toolbar").addClass("hidden");
        $("#member-toolbar").addClass("hidden");
        $.get("/api/votes").then(function (results) {
            //var pollResults = [];
            if (results.length <= 1) {
                var newPostCard = $("<div>");
                newPostCard.addClass("card");
                var newPostCardHeading = $("<div>");
                // card-header
                newPostCardHeading.addClass("card-header mb3");
                var newPostTitle = $("<h3>");
                newPostTitle.text("Currently No Polls Available");
                // append card-header 
                newPostCardHeading.append(newPostTitle);
                newPostCard.append(newPostCardHeading);
                newPostCard.addClass("mt-3")
                $("#content-div").append(newPostCard);
            } else {
                //This is good at least
                for (var i = 0; i < results.length; i = i + 4) {
                    var newPostCard = $("<div>");
                    newPostCard.addClass("card");
                    newPostCard.addClass("iteration")
                    var newPostCardHeading = $("<h3>");
                    // card-header
                    newPostCardHeading.addClass("card-header");
                    newPostCard.addClass("mb-3")
                    // var newPostTitle = $("<h3>");
                    newPostCardHeading.text(results[i].PollName);
                    newPostCard.append(newPostCardHeading);
                    var ul = $("<div class = 'row'>");
                    ul.addClass("card-body");
                    // ul.addClass("span4");
                    for (var j = i; j <= i + 3; j++) {
                        var li = $(`<button class ='col-md-8'>${results[j].OptionName}</button><button class ='col-md-4' ><strong>Vote: ${results[j].Count}</strong></button><br />`);
                        ul.append(li)
                    }
                    newPostCard.append(ul);
                    newPostCard.addClass("mt-3")
                    $("#content-div").append(newPostCard);
                }  // For Loop End
            }  // else loop end
        });
    });//Vote Results Function End

    $("#optionPoll").on("click", function () {
        event.preventDefault();
        console.log(moment().format() + " is the current moment");

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
            var userId = response[response.length - 1].userLoginId;
            var pollToAdd = [];
            //window.location.href = "/employee";
            for (let i = 0; i < response.length - 1; i++) {

                console.log()

                var htmlPoll = $("<div>");
                htmlPoll.addClass("poll");
                // Adding a data-attribute
                //htmlPoll.attr("data-name", response[i].id);
                // Providing the initial button text
                htmlPoll.text(response[i].name);
                function createNewPollRow(poll) {
                    //var buttonArray = poll.Options;
                    var formattedDate = new Date(poll.createdAt);
                    formattedDate = moment(formattedDate).format("MMMM Do YYYY, h:mm:ss a");

                    var formattedCloseDate = new Date(poll.closingTime);
                    formattedCloseDate = moment(formattedCloseDate).format("MMMM Do YYYY, h:mm:ss a");

                    var currentMoment = moment().format("MMMM Do YYYY, h:mm:ss a");
                    // console.log(moment(currentMoment).isBefore(formattedCloseDate));
                    // console.log(moment(currentMoment).diff(moment(formattedCloseDate))+ " is the dif");

                    var a = moment([2007, 0, 29]);
                    var b = moment([2007, 0, 28]);
                    console.log(a.diff(b, 'days') + "is the days thingy");

                    var newPostCard = $("<div>");
                    newPostCard.addClass("card mb-3");
                    var newPostCardHeading = $("<div>");
                    newPostCardHeading.addClass("card-header");
                    var newPostTitle = $("<h3>");
                    var newPostDate = $("<small>");

                    var pollCloseDate = $("<small>");
                    var spacer = $("<br>");

                    var newPostCardBody = $("<div>");
                    newPostCardBody.addClass("card-body");
                    var newPostBody = $("<p>");
                    var newPostOption = $("<p>");
                    newPostTitle.text(poll.name + " ");
                    newPostBody.text(poll.description);
                    newPostDate.text("Poll Created: " + formattedDate);

                    pollCloseDate.text("Poll Closes: " + formattedCloseDate);

                    for (var i = 0; i <= 3; i++) {
                        var optionBtn = $("<button>");
                        optionBtn.text(poll.Options[i].name);
                        optionBtn.addClass("option1 btn btn-light btn-lg btn-block");
                        optionBtn.attr("data-valueoption", poll.Options[i].id);
                        optionBtn.attr("data-valuepoll", poll.id);
                        optionBtn.attr("data-userId", userId);
                        newPostOption.append(optionBtn);
                    }
                    newPostBody.append(newPostOption);

                    newPostTitle.append(spacer);
                    newPostTitle.append(newPostDate);

                    newPostTitle.append(spacer);
                    newPostTitle.append(pollCloseDate);

                    newPostCardHeading.append(newPostTitle);
                    newPostCardBody.append(newPostBody);
                    newPostCard.append(newPostCardHeading);
                    newPostCard.append(newPostCardBody);
                    newPostCard.data("post", poll);
                    newPostCard.addClass("mt-3")
                    return newPostCard;
                }   //Create new poll function end
                pollToAdd.push(createNewPollRow(response[i]));
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
        $.get("/api/request").then(function (response) {
            console.log(response);
            var pollToAdd = [];
            if (response.length === 0) {
                var newPostCard = $("<div>");
                newPostCard.addClass("card");
                var newPostCardHeading = $("<div>");
                // card-header
                newPostCardHeading.addClass("card-body");
                var newPostTitle = $("<h3>");
                newPostTitle.text("There are currently no pending requests.");
                // append card-header 
                newPostCardHeading.append(newPostTitle);
                newPostCard.append(newPostCardHeading);
                newPostCard.addClass("mt-3")
                $("#content-div").append(newPostCard);
            }
            //window.location.href = "/employee";
            for (let i = 0; i < response.length; i++) {
                var htmlPoll = $("<div>");
                htmlPoll.addClass("example");
                htmlPoll.text(response[i].name);
                pollToAdd.push(createNewRequest(response[i]));
            }
            $("#content-div").append(pollToAdd);
        })
    });

    function createNewRequest(poll) {
        var formattedDate = new Date(poll.createdAt);
        formattedDate = moment(formattedDate).format("MMMM Do YYYY, h:mm:ss a");
        var newPostCard = $("<div>");
        newPostCard.addClass("card");
        var newPostCardHeading = $("<div>");
        // card-header
        newPostCardHeading.addClass("card-header");

        // DO NOT DELETE THIS COMMENT BLOCK
        // IF UNCOMMENT, ALSO UNCOMMENT LINE 255
        // delete button
        // var deleteBtn = $("<button>");
        // deleteBtn.text("X");
        // deleteBtn.addClass("deleteRequest float-right btn btn-danger");
        // deleteBtn.attr("data-value", poll.id);

        // header-button container
        var headerBtn = $("<div>");
        headerBtn.addClass("float-right")
        // headerBtn.append(deleteBtn);
        var newPostTitle = $("<h4>");
        var newPostDate = $("<small>");
        var newPostCardBody = $("<div>");
        newPostCardBody.addClass("card-body");
        var newPostBody = $("<p>");
        newPostTitle.text(poll.name + " ");
        newPostBody.text(poll.description);
        newPostDate.text(formattedDate);
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
        newPostCard.addClass("mt-3")
        return newPostCard;
    }

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
    function createNewPollRow(poll) {
        //var buttonArray = poll.Options;
        var formattedDate = new Date(poll.createdAt);
        formattedDate = moment(formattedDate).format("MMMM Do YYYY, h:mm:ss a");
        var newPostCard = $("<div>");
        newPostCard.addClass("card");
        var newPostCardHeading = $("<div>");
        newPostCardHeading.addClass("card-header");
        var newPostTitle = $("<h3>");
        var newPostDate = $("<small>");
        var newPostCardBody = $("<div>");
        newPostCardBody.addClass("card-body");
        var newPostBody = $("<p>");
        var newPostOption = $("<p>");
        newPostTitle.text(poll.name + " ");
        newPostBody.text(poll.description);
        newPostDate.text(formattedDate);
        for (var i = 0; i <= 3; i++) {
            var optionBtn = $("<button>");
            optionBtn.text(poll.Options[i].name);
            optionBtn.addClass("option1 btn btn-light btn-lg btn-block");
            optionBtn.attr("data-option-id", poll.Options[i].id);
            optionBtn.attr("data-poll-id", poll.id);

            newPostOption.append(optionBtn);
        }
        newPostBody.append(newPostOption);
        newPostTitle.append(newPostDate);
        newPostCardHeading.append(newPostTitle);
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
