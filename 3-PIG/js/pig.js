"use strict";
function Game(){
	/*
	Initialize the game and set up the object
	*/
	this.players = [];
	this.turnNumber = 0;
	this.currentPot = 0;
	this.scoreMax = 100;
	this.bankDisable = true;

	console.log('new game with', this.players.length, 'players!') ;
	return this ;
}

// works
Game.prototype.Player = function( player ){
	/*
	Make a setting object for each player to be inserted into the players array
	*/

	if( !Array.isArray( player ) ) player = [player];

	for( var i = 0; i < player.length; i++){

		console.log(this.players.length, 'player', player[i], 'added.') ;
	
		this.players.push( {
			index: this.players.length,
			name: player[i],
			score: 0
		} );
	}

	//set current player if empty
	if( !this.currentPlayer ) this.currentPlayer = this.players[0] ;
	
	return true;
};

Game.prototype.rollDice = function(){

	console.log( this.currentPlayer.name, "rolls the dice" );

	var die = [ Math.floor(Math.random() * 6) + 1, 
		Math.floor(Math.random() * 6) + 1 ];

	console.log( "Dice 1", this.currentPlayer.name, die[0], die[1] ) ;
	
	if( die[0] === 1 && die[1] === 1 ){

		console.log( "Snake eyes, you lose every thing!" );
		this.currentPlayer.score = 0;
		this.switchPlayer();

	}else if( die[0] === 1 || die[1] === 1 ){

		console.log( "Pig! lose your turn!");
		this.switchPlayer();

	}else if( die[0] === die[1] ){

		console.log( "Doubles, you MUST roll again!" );

		this.currentPot += die[0] + die[1];
		this.bankDisable = true;
		
	}else{

		this.bankDisable = false;
		this.currentPot += die[0] + die[1];

	}

	return die ;
};

Game.prototype.bank = function(){

	if( this.bankDisable ){
		console.log( 'Bank is disabled, please roll' );
		return false;
	}

	this.currentPlayer.score += Number( this.currentPot ) ;

	if ( this.currentPlayer.Score >= this.scoreMax ) {
		//this.gameOver();
		return true;
	}

	return this.switchPlayer();
};

Game.prototype.gameOver = function(){
	//needs work...

	console.log('winner');
}

Game.prototype.switchPlayer = function(){
	/*
	This method should probably be named something like endTurn and handle anything 
	that needs to be done at the end of each players turn.
	*/

	//get the current player index
	var i = this.currentPlayer.index ;

	//reset current pot
	this.currentPot = 0;

	//increment the turn counter only if each player has went
	if( this.players.length === i + 1 ) this.turnNumber++ ;

	//switch this.currentPlayer to next player
	this.currentPlayer = ( i < (this.players.length -1) ) ? this.players[ ++i ] : this.players[0] ;
	
	//call the interface update function
	this.updateGUI();

	return this.currentPlayer ;
};

Game.prototype.updateGUI = function(){

	//update player stats in console
	this.players.forEach( function( value ){
		console.log( value.name, 'has', value.score, 'point.' );
	} );

	console.log( 'Turn:', this.turnNumber, ', its player', this.currentPlayer.name, 'turn!');
};

//only show test if ran from nodeJS
if( typeof( document ) == "undefined" ){
	var thisGame = new Game();
	thisGame.Player( ['bob','frank'] );
	
	thisGame.rollDice() ;
	/*
	thisGame.switchPlayer() ;
	thisGame.rollDice() ;
	thisGame.switchPlayer() ;
	thisGame.rollDice() ;
	thisGame.switchPlayer() ;
	thisGame.rollDice() ;
	*/
}
