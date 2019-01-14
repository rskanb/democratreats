$(document).ready(function () {
    $("#optionResult").on("click", function () {
        event.preventDefault();
        // hide Issue form and toolbar
        hideIssueForm();
        // hide Request form and toolbar
        hideRequestForm();
        $("#content-div").empty();
        $("#poll-toolbar").addClass("hidden");
        $("#member-toolbar").addClass("hidden");
        $.get("/api/votes").then(function(results){
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
              $("#content-div").append(newPostCard);
          }else {
          //This is good at least
            for(var i=0; i<results.length; i=i+4){
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
              for (var j = i; j <=i+3; j++) {
                var li = $(`<button class ='col-md-8'>${results[j].OptionName}</button><button class ='col-md-4' ><strong>Vote: ${results[j].Count}</strong></button><br />`);
                ul.append(li)
              }
              newPostCard.append(ul);
            $("#content-div").append(newPostCard);
            }  // For Loop End
        }  // else loop end
        });
    });//Vote Results Function End
        
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
            var userId = response[response.length-1].userLoginId;
            var pollToAdd = [];
            //window.location.href = "/employee";
            for (let i = 0; i < response.length-1; i++) {
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
                    var newPostCard = $("<div>");
                    newPostCard.addClass("card mb-3");
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
                    for(var i =0; i<=3; i++){
                        var optionBtn = $("<button>");
                        optionBtn.text(poll.Options[i].name);
                        optionBtn.addClass("option1 btn btn-light btn-lg btn-block");
                        optionBtn.attr("data-valueoption", poll.Options[i].id);
                        optionBtn.attr("data-valuepoll", poll.id);
                        optionBtn.attr("data-userId", userId);
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
        for(var i =0; i<=3; i++){
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
