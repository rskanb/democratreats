$(document).ready(function() {
    $(document).on("click", ".option1", function(event){

    var userIdGlobal = 0
    var pollIdGlobal = 0
    $(document).on("click", ".option1", function(event){

        console.log($(this).data('valueoption'));
        console.log($(this).data('valuepoll'));

        userIdGlobal = $(this).data('userid');
        pollIdGlobal = $(this).data('valuepoll');
    

        var optionId = $(this).data('valueoption');
        var pollId = $(this).data('valuepoll');
        var userId = $(this).data('userid');
        var voteData = {
            OptionId: optionId,
            PollId: pollId,
            UserId: userId
        }
        upsertVote(voteData);
    });

    function upsertVote(userData) {
        $.post("/api/votes", userData)
          .then(function(response){
          });
=======

        checkVoteStatus(voteData);
        console.log(voteData);
    });

// -----------function that checks if a user has already voted on the poll they are voting on. then sends a post if the user has not voted on the poll------ 
    function checkVoteStatus(voteData) {
        // console.log(userIdGlobal +" is supposed to be the user ID")
        $.get("/api/vote").then(function(response){

            userIdArray = [];

            for (var i=0; i<response.length; i++){
                if(response[i].PollId === pollIdGlobal){
                    userIdArray.push(response[i].UserId);
                }
            }

            if(userIdArray.indexOf(userIdGlobal) >= 0){
                console.log("Vote rejected. You have aready voted on this poll.");
            }else{
                console.log("vote accepted")
                $.post("/api/votes", voteData)
                .then(function(response){
                    console.log(response);
                });
            }
        });

    }

});