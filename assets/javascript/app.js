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

// event listener for "add train" button here:

  $("#add-train-btn").on("click", function() {
    var name = $("#train-name-input").val().trim();
    var destination = $("#destination-input").val().trim();
    var firstTime = $("#first-time-input").val().trim();
    var frequency = $("#frequency-input").val().trim();

    connectionsRef.push({
        name: name,
        destination: destination,
        firstTime: firstTime,
        frequency: frequency,
        
    });
    return false;

  })

  connectionsRef.on("child_added", function(childSnapshot) {
    console.log(childSnapshot)
    var trainName = childSnapshot.val().name;
    var trainDestination = childSnapshot.val().destination;
    var firstTrainTime = childSnapshot.val().firstTime;
    var trainFrequency = childSnapshot.val().frequency;


    // logic for "next arrival":

      var firstTime = moment(firstTrainTime, "hh:mm").subtract(1, "years");
      console.log(firstTime);
  // calculate the difference between current time and first time 
      var diffTime = moment().diff(moment(firstTime), "minutes");
  // calculate number of minutes since the last train left:
      var timeApart = diffTime % trainFrequency;
      console.log(timeApart);
  // calculate number of minutes until next arrival:
      var minAway = trainFrequency - timeApart;
      console.log(minAway);
  // calculate time of next arrival:
      var nextArrival = moment().add(minAway, "minutes");
      nextArrival=moment(nextArrival).format("hh:mm");

  // append response to html:
  $("tbody").append("<tr>" +
  "<td>" + trainName + "</td><td>" + trainDestination + "</td><td>" + trainFrequency +
  "</td><td>" + nextArrival + "</td><td>" + minAway + "</td></tr>");


  })

