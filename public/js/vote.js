$(document).ready(function() {


    $(document).on("click", ".option1", function(event){


        console.log($(this).data('option-id'));
        console.log($(this).data('poll-id'));

        var optionId = $(this).data('option-id');
        var pollId = $(this).data('poll-id');

        var voteData = {
            OptionId: optionId,
            votePollId: pollId,
            foreignKey: pollId
        }

        upsertVote(voteData);
    });

    function upsertVote(userData) {
        $.post("/api/votes", userData)
          .then(function(response){
              console.log(response);
          });
    }


});