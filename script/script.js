var GUI = {

	displayMessage : function(content) {
		var messageArea = document.getElementById("message_area");
		messageArea.innerHTML = content;		
	},

	displayHit	: function(id) {
		var cell = document.getElementById(id);
		cell.className += " hit";
		this.displayMessage("HIT");
	},

	displayMiss: function (id) {
		var cell = document.getElementById(id);
		cell.className += " miss";
		this.displayMessage("MISS");
	},

};



var board = {

	boardSize: 7,
	shipNum: 5,
	guesses: 0,

	ships : [
		{locations: [], length: 0},
		{locations: [], length: 0},
		{locations: [], length: 0},
		{locations: [], length: 0},
		{locations: [], length: 0},
	],

	isSunk : function() {
		GUI.displayMessage("\"Ship was sunk\"");
	},

	isOver : function() {
		if(confirm("Congratulation: You sink all ships with " + this.guesses + " guesses." + "\nClick <OK> to Replay"))
      		window.location.reload();	
	},


/**************************************/
// why "this" keyword is uninvokable?
// because "this" is bound to the calling obj when function is called, not when it's declared.
	// in this case: "this" refers to "button" not "board"
		// that's why "this.ships" is undefined because there is no "ships" in button

/***** so, take it outside ****/
	// onFire : function(EventObj) {
	// 	console.log(this);
	// 	board.guesses++;
	// 	var guess = EventObj.target.id;
	// 	// disable button after clicking
	// 	document.getElementById(guess).setAttribute("disabled", "1");

	// 	for (var ship of board.ships) {

	// 		if (ship.locations.indexOf(guess) >= 0) {

	// 			GUI.displayHit(guess);
	// 			ship.length--;

	// 			if (!ship.length) {
	// 				board.isSunk();
	// 				board.shipNum--;
	// 			}
	// 			if (!board.shipNum) 
	// 				board.isOver();

	// 			return true;
	// 		}

	// 	}
		
	// 	GUI.displayMiss(guess);
	// 	return false;

	// },


	generateShipLocation : function() {
		var locations;
 		for (var ship of this.ships) {
			do {
				locations = this.generateShip(ship);
			} while (this.isOverlap(locations));

			ship.locations = locations;

		}
		// console.log("Ships array: ");
		// console.log(this.ships);
	},


	generateShip : function(ship) {

		// length [2,4]
		ship.length = Math.floor(Math.random() * 3) + 2;
		var direction = Math.floor(Math.random() * 2);
		
		var row, col;		
		// horizontal
		if (direction === 1) {
			var row = Math.floor(Math.random() * this.boardSize);
			var col = Math.floor(Math.random() * (this.boardSize - ship.length + 1));
		}
		// vertical
		else {
			var row = Math.floor(Math.random() * (this.boardSize - ship.length + 1));
			var col = Math.floor(Math.random() * this.boardSize);
		}

		var newShipLocations = [];
		for (var i = 0; i < ship.length; ++i) {
			if (direction === 1) 
				newShipLocations.push(row + "" + (col+i));
			else
				newShipLocations.push((row+i) + "" + col);
		}

		return newShipLocations;

	},


	isOverlap: function(locations) {
		for (var ship of this.ships) {
			for (var j = 0; j < locations.length; j++) 
				if (ship.locations.indexOf(locations[j]) >= 0) 
					return true;
		}
		return false;
	},


};



function onFire(EventObj) {
	board.guesses++;
	var guess = EventObj.target.id;
	// disable button after clicking
	document.getElementById(guess).setAttribute("disabled", "1");

	for (var ship of board.ships) {

		if (ship.locations.indexOf(guess) >= 0) {

			GUI.displayHit(guess);
			ship.length--;

			if (!ship.length) {
				board.isSunk();
				board.shipNum--;
			}
			if (!board.shipNum) 
				board.isOver();

			return true;
		}
	}
	
	GUI.displayMiss(guess);
	return false;
}



window.onload = init;

function init () {

	// handler
	var buttons = document.getElementsByTagName("button");
	for (var button of buttons)
		button.onclick = onFire;

	board.generateShipLocation();

}









