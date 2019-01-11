$(document).ready(function() {
  // Getting references to the name input and other user information
  var nameInput = $("#name-input");
  var emailInput = $("#signupemail-input");
  var passwordInput = $("#signuppassword-input");
  // var loginEmail= $("#email-input");
  // var loginPassword = $("#password-input");
  $(document).on("submit", ".signup", function(event){
// ------------------------------------------>>>
  // A function to handle what happens when the form is submitted to create a new user
  // function handleUserFormSubmit(event) {
    event.preventDefault();

    // console.log($("#admin-checkbox").is(':checked'));
    // Don't do anything if the name fields hasn't been filled out
    if (!nameInput.val().trim()) {
      return;
    }

    var adminStatus = $(".inline-checkbox").is(":checked");
    var userData = {
      name: nameInput.val().trim(),
      email: emailInput.val().trim(),
      password: passwordInput.val().trim(),
      admin: adminStatus
    }
    // Calling the upsertUser function and passing in the value of the name input
    upsertUser(userData);
    console.log(userData);
  });

  // A function for creating a user.
  function upsertUser(userData) {
    $.post("/api/users", userData)
      .then(function(response){
        console.log(response)
        nameInput.val("");
        emailInput.val(""),
        passwordInput.val(""),
        $(".inline-checkbox").prop('checked', false)
        // $("#email-input").val("");
        // $("#password-input").val("");
      });
  }

});