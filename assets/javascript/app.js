// Initialize Firebase
var config = {
    apiKey: "AIzaSyDVzV2Kd-flf1POtBnm48M-c98X6GEBkSY",
    authDomain: "train-scheduler-week-7-c0417.firebaseapp.com",
    databaseURL: "https://train-scheduler-week-7-c0417.firebaseio.com",
    projectId: "train-scheduler-week-7-c0417",
    storageBucket: "train-scheduler-week-7-c0417.appspot.com",
    messagingSenderId: "682076941787"
  };
  firebase.initializeApp(config);

  var database = firebase.database();

  var connectionsRef = database.ref("/trains");

// add train button here:

  $("#add-train-btn").on("click", function() {
    var name = $("#train-name-input").val().trim();
    var destination = $("#destination-input").val().trim();
    var firstTime = $("#first-time-input").val().trim();
    var frequency = $("#frequency-input").val().trim();

  })

  connectionsRef.on("child_added", function(childSnapshot) {
    console.log(childSnapshot)
    var trainName = childSnapshot.val().name;
    var trainDestination = childSnapshot.val().destination;
    var firstTrainTime = childSnapshot.val().firstTime;
    var trainFrequency = childSnapshot.val().frequency;


  })