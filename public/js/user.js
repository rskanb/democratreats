$(document).ready(function() {
  // Getting references to the name input and other user information
  var nameInput = $("#name-input");
  var emailInput = $("#email-input");
  var passwordInput = $("#password-input");
  var adminStatus = $("#admin-checkbox");
  

  $(document).on("submit", ".signup", handleUserFormSubmit);

// ------------------------------------------>>>


  // A function to handle what happens when the form is submitted to create a new user
  function handleUserFormSubmit(event) {
    event.preventDefault();

    console.log($("#admin-checkbox").is(':checked'));
    // Don't do anything if the name fields hasn't been filled out
    if (!nameInput.val().trim().trim()) {
      return;
    }
    // Calling the upsertUser function and passing in the value of the name input
    upsertUser({
      name: nameInput
        .val()
        .trim(),
      email: emailInput.val(),
      password: passwordInput.val(),
      admin: adminStatus.is(':checked')
    });
  }

  // A function for creating a user.
  function upsertUser(userData) {
    $.post("/api/users", userData)
      .then(console.log("this just happened"));
  }



});
