// works
function Game( player1_name, player2_name, scoreMax ){
	/*
	Initialize the game and set each variable that will be needed
	*/

	this.players = [];
	this.turnNumber = 0;
	this.currentPot = 0;
	this.scoreMax = scoreMax || 0;

	//Push each player to the players array
	this.players.push( this.Player(player1_name) ) ;
	this.players.push( this.Player(player2_name) ) ;
	
	//set first player to player zero
	this.currentPlayer = this.players[0] ;

	console.log('new game with', this.players.length, 'players!') ;
	return this ;
}


// works
Game.prototype.Player = function( playerName ){
	/*
	Make a setting object for each player to be inserted into the players array
	*/
	console.log('player', playerName, 'added.') ;

	//return player object for players array
	return {
		index: this.players.length,
		pName: playerName,
		score: 0,
	}
}

Game.prototype.updatePot = function( potAmt ) {
	this.currentPot += Number( potAmt )
	return this.currentPot
};

Game.prototype.rollDice = function(){
	var die = [ Math.floor(Math.random() * 6) + 1, 
		Math.floor(Math.random() * 6) + 1 ];

	console.log( "Player", this.currentPlayer.pName, "rolls", die ) ;

	return die ;
}

Game.prototype.turnControler = function( action ){
	if(action == "bank"){
		this.currentPlayer.score += this.currentPot ;
		if (this.currentPlayer.score >= this.scoreMax) {
			updateDom(null, null, null, [ 1,1 ], null, this.currentPlayer.pName);
		} else {
			this.currentPot = 0;
			updateDom(this.players[0].score, this.players[1].score, this.switchPlayer(), false, this.currentPot);
		}
	}
	else if( action == "roll"){
		var newDie = this.rollDice();
		if (newDie[0] == 1 && newDie[1] == 1) {
			this.currentPlayer.score = 0;
			this.currentPot = 0;
			updateDom(this.players[0].score, this.players[1].score, this.switchPlayer(), newDie, this.currentPot);
		} else if (newDie[0] == 1 || newDie[1] == 1) {
			this.currentPot = 0;
			updateDom(this.players[0].score, this.players[1].score, this.switchPlayer(), newDie, this.currentPot);
		} else {
			this.currentPot = 0;
			this.currentPot += (newDie[0] + newDie[1]);
			updateDom(this.players[0].score, this.players[1].score, null, newDie, this.currentPot);			
		}
	}
}

Game.prototype.switchPlayer = function(){
	/*
	This method should probably be named something like endTurn and handle anything 
	that needs to be done at the end of each players turn.
	*/

	//get the current player index
	var i = this.currentPlayer.index ;

	//increment the turn counter only id each player has want
	if( this.players.length === (i + 1) ) this.turnNumber++ ;

	//switch player to next player
	this.currentPlayer = ( i < (this.players.length -1) ) ? this.players[ ++i ] : this.players[0] ;

	console.log('Turn:', this.turnNumber, ', its player', this.currentPlayer.pName, 'turn!')
	return this.currentPlayer.pName ;
}

//only show test if ran from nodeJS
// if( typeof( document ) == "undefined" ){
// 	thisGame = new Game('mike', 'danny', 50);
// 	thisGame.rollDice() ;
// 	thisGame.switchPlayer() ;
// 	thisGame.rollDice() ;
// 	thisGame.switchPlayer() ;
// 	thisGame.rollDice() ;
// 	thisGame.switchPlayer() ;
// 	thisGame.rollDice() ;

// 	thisGame.switchPlayer() ;
// 	thisGame.rollDice() ;
// 	thisGame.switchPlayer() ;
// 	thisGame.rollDice() ;
// 	thisGame.switchPlayer() ;
// 	thisGame.rollDice() ;

// 	thisGame.switchPlayer() ;
// 	thisGame.rollDice() ;
// 	thisGame.switchPlayer() ;
// 	thisGame.rollDice() ;
// 	thisGame.switchPlayer() ;
// 	thisGame.rollDice() ;
// }
