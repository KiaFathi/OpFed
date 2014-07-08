alert('linked');
var dbref = new Firebase('https://opfed.firebaseio.com');
var auth = new FirebaseSimpleLogin(dbref, function(error, user) {
  if (error) {
    // an error occurred while attempting login
    console.log(error);
  } else if (user) {
    // user authenticated with Firebase
    console.log('User ID: ' + user.uid + ', Provider: ' + user.provider);
  } else {
    // user is logged out
    auth.login('github');
  }
});