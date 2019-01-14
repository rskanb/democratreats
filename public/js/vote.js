$(document).ready(function() {
    var globalThis = ""
    var userId = 0
    var pollId = 0
    $(document).on("click", ".option1", function(event){

        globalThis = $(this);
        userId = $(this).data('userid');
        pollId = $(this).data('valuepoll');
    
        var optionId = $(this).data('valueoption');

        var voteData = {
            OptionId: optionId,
            PollId: pollId,
            UserId: userId
        }

        checkVoteStatus(voteData);
        console.log(voteData);
    });

// -----------function that checks if a user has already voted on the poll they are voting on. Then sends a post if the user has not voted on the poll------ 
    function checkVoteStatus(voteData) {
        $.get("/api/vote").then(function(response){

            userIdArray = [];

            for (var i=0; i<response.length; i++){
                if(response[i].PollId === pollId){
                    userIdArray.push(response[i].UserId);
                }
            }

            if(userIdArray.indexOf(userId) >= 0){
                globalThis.text("You have already voted in this poll.");
                console.log("vote rejected")
            }else{
                console.log("vote accepted!")
                globalThis.text("Vote Cast!")
                $.post("/api/votes", voteData)
                .then(function(response){
                    console.log(response);
                });
            }
        });

    }


});