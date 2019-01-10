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