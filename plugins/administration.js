// The goal of this module is to build in
// the ability to moderate the chat more efficiently.
// We will use this to keep track of current cases.
// DQs a user has on them, and much more.
// This will tie into the verification system, and thus
// create a way to track all sorts of user data, and allow
// us, the admins, to moderate the chat in a far more efficient way.
//
// Some examples of features:
// * Slow Mode
// * In-Chat DQ
// * Auto-Mute
// * Moderator Tools for Handling Cases.
// * Demote/Rank Up Users.
// * Kick/Ban Users
// * Force Skip Music <-- See musicplayer.js
// * Add/Remove data from the helpful links list.


var firebase = require('firebase');

// Initialize the app with no authentication
firebase.initializeApp({
	serviceAccount: "./vexbot-6c4a4d1a2f1c.json",
    databaseURL: "https://vexbot-668e9.firebaseio.com"
});


vexBot.commands.register = function(data) {
    var db = firebase.database();
    var ref = db.ref("/userData");
	var splitChar = ";";

	var lastStart = 0;
	var numOfItems = 1;
	var userInfo = [];
	for(var a = 0; a < data.message.length; a++) {
		if(data.message.charAt(a) == splitChar) {
			console.log("True at: " + a);
			console.log(data.message.substring(lastStart, a));
			userInfo[numOfItems-1] = data.message.substring(lastStart, a);
			numOfItems++;
			lastStart = a+1;
		} else {
			console.log("False at" + a);
		}
	}
	console.log(data.message.substring(lastStart, data.message.length));
	userInfo[numOfItems-1] = data.message.substring(lastStart, data.message.length);
	console.log(userInfo);


	var userStuff = data.id;


	ref.once("value", function(snapshot) {
        console.log(snapshot.val());
    });

    var usersRef = ref.child("users");
	if(userInfo[2]) {
		data.respond("Sorry, you have inputted too many paramaters");
	} else {
		usersRef.child(userStuff).set({
    	    teamNumber: userInfo[1],
    		name: userInfo[0]
		});
		data.respond("Congratulations, " + userInfo[0] + " you have now registered as Team#: " + userInfo[1]);
		vexBot.client.addToRole({
		    server: "197777408198180864",
		    user: data.id,
		    role: "The Role ID"
		});
	}
};
vexBot.commandUsage.poll = "<Name>;<TeamNumber>";
vexBot.commandDescs.poll = "Registers you as a member with name: <Name> on team: <TeamNumber>";

vexBot.commands.roles = function(data) {
		for (var s in vexBot.servers) {
			console.log("Roles \n");
			console.log(servers[s]);
			data.respond(vexBot.servers[s].members[data.id].roles);
		}
}
