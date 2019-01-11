// Get references to page elements

var signUpForm = $("form.signup");
//$("#add-dreamcity").addClass('hidden');
//$("#add-dreamcity").removeClass('hidden');
$("#signup-form").on("click", function(event){
  event.preventDefault();
  $(".login-container").addClass("hidden");
  $(".signup-container").removeClass("hidden");
});

signUpForm.on("submit", function(event) {
  event.preventDefault();
  $(".login-container").removeClass("hidden");
  $(".signup-container").addClass("hidden");
});


$(document).ready(function() {
  // Getting references to our form and inputs
  var loginForm = $("form.login");
  var emailInput = $("input#email-input");
  var passwordInput = $("input#password-input");

  // When the form is submitted, we validate there's an email and password entered
  loginForm.on("submit", function(event) {
    event.preventDefault();
    var userData = {
      email: emailInput.val().trim(),
      password: passwordInput.val().trim()
    };

    if (!userData.email || !userData.password) {
      return;
    }

    // If we have an email and password we run the loginUser function and clear the form
    loginUser(userData.email, userData.password);
    emailInput.val("");
    passwordInput.val("");
  });

  // loginUser does a post to our "api/login" route and if successful, redirects us the the members page
  function loginUser(email, password) {
    $.post("/api/login", {
      email: email,
      password: password
    }).then(function(response) {
      window.location.href = "/home";
      // $.get("/home").then(function(response){
      //   console.log("done");
      // })
      // window.location.replace(data);
      // If there's an error, log the error
    }).catch(function(err) {
      // console.log(err);
      alert(err);
    });
  }

});