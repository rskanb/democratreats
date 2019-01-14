$(document).ready(function() {
    $(document).on("click", ".option1", function(event){
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
    }

});