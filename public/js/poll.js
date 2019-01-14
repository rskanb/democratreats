$(document).ready(function () {

  // Getting references to the name input and other poll information
  var currentPollId = 0

  var nameInput = $("#poll-name-input");
  var descriptionInput = $("#poll-description-input");

  var options = [];
  // var passwordInput = $("#signuppassword-input");
  // var loginEmail= $("#email-input");
  // var loginPassword = $("#password-input");

  $(document).on("click", ".poll-submit", function (event) {

    // A function to handle what happens when the form is submitted to create a new poll
    // function handleUserFormSubmit(event) {
    event.preventDefault();
    $("#poll-form").addClass("hidden");

    // Don't do anything if the name fields hasn't been filled out
    if (!nameInput.val().trim()) {
      return;
    }
    var pollData = {
      name: nameInput.val().trim(),
      description: descriptionInput.val(),
    }
    upsertPoll(pollData);
    // Calling the upsertPoll and upserOption function and passing in the values from the inputs
    // upsertOption(options);
    console.log(pollData);
  });

  // A function for creating a POLL that also adds the options.
  function upsertPoll(userData) {
    $.post("/api/polls", userData)
      .then(function (response) {
        currentPollId = response.id;
        for (var i = 0; i < options.length; i++) {
          var optionData = {
            name: options[i],
            PollId: currentPollId
          }
          upsertOption(optionData);
        };
        // nameInput.val("");
        // emailInput.val(""),
        // passwordInput.val(""),
        // $(".inline-checkbox").prop('checked', false)
        // $("#email-input").val("");
        // $("#password-input").val("");
      });
  }
  // A function for creating OPTIONs
  function upsertOption(optionData1) {
    $.post("/api/options", optionData1)
      .then(function (response) {
        $("#poll-name-input").val("");
        $("#poll-description-input").val("");
        $("#options-area").empty();
        window.location.reload();
        //nameInput.val("");
        //emailInput.val("");
        // passwordInput.val(""),
        // $(".inline-checkbox").prop('checked', false)
        // $("#email-input").val("");
        // $("#password-input").val("");
      });
  }
  // function upsertOption(optionData) {
  //   $.post("/api/options", )
  //     .then(function(response){
  //       console.log(response);
  //     });
  // }
  //------ ADDING OPTIONS---------------------
  $(".submit-option").on("click", function (event) {
    event.preventDefault();
    // This line grabs the input from the textbox
    var option = $("#option-input").val().trim();
    // Adding movie from the textbox to our array
    options.push(option);
    // Calling renderButtons which handles the processing of our movie array
    renderOptions();
    $("#option-input").val("");
  });


  function renderOptions() {
    $("#options-area").empty();
    for (var i = 0; i < options.length; i++) {
      var a = $("<button>");
      // Adding a class
      a.addClass("btn option-button");
      // Adding a data-attribute with a value of the animal at index i
      a.attr("data-name", options[i]);
      // Providing the button's text with a value of the animal at index i
      a.text((i + 1) + ". " + options[i]);
      // Adding the button to the HTML
      $("#options-area").append(a);
    };
  };

  $("#options-area").empty();
  
});