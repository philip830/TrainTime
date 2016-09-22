// Steps to complete:
/*
1. Initialize Firebase
2. Create button for adding new employees - then update the html + update the database
3. Create a way to retrieve employees from the employee database.
4. Create a way to calculate the months worked. Using difference between start and current time. Then use moment.js formatting to set difference in months.
5. Calculate Total billed

*/
// 1. Initialize Firebase
//var config = {
//	apiKey: "AIzaSyA_QypGPkcjPtylRDscf7-HQl8ribnFeIs",
//	authDomain: "time-sheet-55009.firebaseapp.com",
//	databaseURL: "https://time-sheet-55009.firebaseio.com",
//	storageBucket: "time-sheet-55009.appspot.com",

var config = {
    apiKey: "AIzaSyBnbja8Lfj2DdXt4PkhzJ25dZodCcsbQns",
    authDomain: "train-time-76d7a.firebaseapp.com",
    databaseURL: "https://train-time-76d7a.firebaseio.com",
    storageBucket: "train-time-76d7a.appspot.com",
    messagingSenderId: "21451276918"
    };

firebase.initializeApp(config);

var database = firebase.database();


// 2. Button for adding Trains
function addTrn(){
$("#addTrnBtn").on("click", function(){

	// Grabs user input
	var trnName = $("#trainNameInput").val().trim();
	var trnDest = $("#destInput").val().trim();
	var trnTime = moment($("#timeInput").val().trim(), "HH:MM").format("X");
	var trnFreq = $("#freqInput").val().trim();
	console.log("Btn" + trnName);

	// Creates local "temporary" object for holding employee data
	var newTrn = {
		name: trnName,
		dest: trnDest,
		time: trnTime,
		freq: trnFreq
	}

	// Uploads employee data to the database
	console.log("db upload" + newTrn);
	database.ref().push(newTrn);

	// Logs everything to console
	console.log(newTrn.name);
	console.log(newTrn.dest);
	console.log(newTrn.time);
	console.log(newTrn.freq);

	// Alert
	alert("Train successfully added");

	// Clears all of the text-boxes
	$("#trainNameInput").val("");
	$("#destInput").val("");
	$("#timeInput").val("");
	$("#freqInput").val("");

	// Prevents moving to new page
	return false;
})
};


// 3. Create Firebase event for adding employee to the database and a row in the html when a user adds an entry
database.ref().on("child_added", function(childSnapshot, prevChildKey){

	console.log(childSnapshot.val());

	// Store everything into a variable.
	var trnName = childSnapshot.val().name;
	var trnDest = childSnapshot.val().dest;
	var trnTime = childSnapshot.val().time;
	var trnFreq = childSnapshot.val().freq;

	// Employee Info
	console.log(trnName);
	console.log(trnDest);
	console.log(trnTime);
	console.log(trnFreq);

	// Prettify the train start
	var trnStartPretty = moment.unix(empStart).format("HH:MM");
	// Calculate the train time
	var trnHours = moment().diff(moment.unix(trnStart, 'X'), "hours");
	console.log(trnHours);

	// Calculate the total billed rate
	var trnBilled = trnHours * trnRate;
	console.log(trnBilled);

	// Add each train's data into the table
	$("#trainTable > tbody").append("<tr><td>" + trnName + "</td><td>" + trnRole + "</td><td>" + trnStartPretty + "</td><td>" + trnMonths + "</td><td>" + trnRate + "</td><td>" + trnBilled + "</td></tr>");

});

addTrn();

// Example Time Math
// -----------------------------------------------------------------------------
// Assume Employee start date of January 1, 2015
// Assume current date is March 1, 2016

// We know that this is 15 months.
// Now we will create code in moment.js to confirm that any attempt we use mets this test case



