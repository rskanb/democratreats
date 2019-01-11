$(document).ready(function() {


    $(document).on("click", ".option1", function(event){


        console.log($(this).data('valueoption'));
        console.log($(this).data('valuepoll'));

        var optionId = $(this).data('valueoption');
        var pollId = $(this).data('valuepoll');
        var userId = $(this).data('userid');

        var voteData = {
            OptionId: optionId,
            PollId: pollId,
            UserId: userId
        }
        console.log(voteData);
        upsertVote(voteData);
    });

    function upsertVote(userData) {
        $.post("/api/votes", userData)
          .then(function(response){
              console.log(response);
          });
    }


});