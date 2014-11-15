
// works
function Game( player1_name, player2_name, scoreMax ){
	this.players = [];
	this.turnNumber = 0;
	this.currentPot = 0;
	this.scoreMax = scoreMax || 0;


	this.players.push( this.Player(player1_name) ) ;
	this.players.push( this.Player(player2_name) ) ;
	
	//set first player
	this.currentPlayer = this.players[0] ;

	console.log('new game with', this.players.length, 'players!') ;
	return this ;
}


// works
Game.prototype.Player = function( playerName ){
	console.log('player', playerName, 'added.') ;
	return {
		index: this.players.length,
		name: playerName,
		score: 0,
	}
}

Game.prototype.updatePot = function( potAmt ) {
	this.currentPot += Number( potAmt )
	return this.currentPot
};

Game.prototype.rollDice = function(){
	var die = Math.floor(Math.random() * 6) + 1 ;

	console.log( "Player", this.currentPlayer.name, "rolls", die ) ;
	
	return die ;
}
Game.prototype.turnControler = function( button, diceValue ){

	//you dont have to have pass player_name or currentPot as an argument in any method
	//the object will keep state
	
	//use
	//this.currentPlayer.name for the current player's name
	//this.currentPot for pot

	if(button == "bank"){

		//new way to up player score
		this.currentPlayer.Score += this.currentPot
		this.updateTurnNumber()
	}
	else if(button == "roll"){
		this.rollDice()
		this.updateTurnNumber()
	}
}

Game.prototype.switchPlayer = function(){

	var i = this.currentPlayer.index ;

	//set turn number
	if( this.players.length === (i + 1) ) this.turnNumber++ ;

	//switch player
	this.currentPlayer = ( i < (this.players.length -1) ) ? this.players[ ++i ] : this.players[0] ;
	
	console.log('Turn:', this.turnNumber, ', its player', this.currentPlayer.name, 'turn!')
	return this.currentPlayer ;
}

//hide test is ran in browser
if(! jQuery in window ){
	thisGame = new Game('mike', 'danny', 50);
	thisGame.rollDice() ;
	thisGame.switchPlayer() ;
	thisGame.rollDice() ;
	thisGame.switchPlayer() ;
	thisGame.rollDice() ;
	thisGame.switchPlayer() ;
	thisGame.rollDice() ;

	thisGame.switchPlayer() ;
	thisGame.rollDice() ;
	thisGame.switchPlayer() ;
	thisGame.rollDice() ;
	thisGame.switchPlayer() ;
	thisGame.rollDice() ;

	thisGame.switchPlayer() ;
	thisGame.rollDice() ;
	thisGame.switchPlayer() ;
	thisGame.rollDice() ;
	thisGame.switchPlayer() ;
	thisGame.rollDice() ;
}


