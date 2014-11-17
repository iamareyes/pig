"use strict";
/* turn form data in an object 
http://stackoverflow.com/a/1186309/3140931
*/

jQuery.fn.serializeObject = function(){
	var o = {};
	var a = this.serializeArray();
	$.each(a, function() {
		if (o[this.name] !== undefined) {
			if (!o[this.name].push) {
				o[this.name] = [o[this.name]];
			}
			o[this.name].push(this.value || '');
		} else {
			o[this.name] = this.value || '';
		}
	});
	return o;
};

//extent Game for this interface
Game.prototype.updateGUI = function(){
	/*
	updateDom should get its data right from the thisGame object
	*/

	$('.player').toggleClass('make-opaque');
	$('.player0 > h1').html( this.players[0].score );
	$('.player1 > h1').html( this.players[1].score );
	$dom.pot.html('0');

	//reset dice
	$dom.diceOne.attr( 'src', 'images/1.png' );
	$dom.diceTwo.attr( 'src', 'images/1.png' );

	//reset the buttons
	$('#button-container > button').prop( "disabled",false );
	$dom.bankButton.prop( "disabled", true );

	//Game.prototype.updateGUI();
	return true;
};

//keep thisGame global
var thisGame,
	$dom;

var newGame = function( player0, player1, scoreMax){
	thisGame = new Game();
	thisGame.Player( [ player0, player1 ] );
	thisGame.scoreMax = scoreMax || 100;
	
	//set the players name in the DOM
	$('#player0 h2').html( player0 );
	$('#player1 h2').html( player1 );

	//set the gaol
	$('#max-score').html( scoreMax );
	return true;
}

$(document).ready(function(){
	//hold some dom short cuts
	$dom = {
		diceOne: $('#diceOne'),
		diceTwo: $('#diceTwo'),
		pot: $('#pot'),
		bankButton: $('#bank'),
	}

	//show the make game model
	$('fieldset.create-game-modal').slideDown('slow');

	//make game submit
	$('.create-game-modal > form').on('submit', function( event ){
		
		//stop form from processing
		event.preventDefault();

		//get the form data into an object
		var input = $( this ).serializeObject();

		//make sure the name's are not empty
		if( input.player0 === '' || input.player1 === '' ){
			console.log( input );
			alert('Please enter player names');
			return false ;
		}

		//make sure player names are not the same
		if( input.player0 === input.player1 ){
			alert('Please set different player names');
			return false ;
		}

		//empty input elements
		$( this )[0].reset();

		//set the game up
		newGame( input.player0, input.player1, input.scoreMax);

		//hide modal and show container
		$('.create-game-modal').slideUp( 'fast', function(){
			$( 'main' ).toggleClass( 'make-opaque' );
		} );

		return false;
	});

	$('#newGame').on('click', function(){
		$('main').toggleClass( 'make-opaque' );
		$('fieldset.create-game-modal').slideDown('slow');
	});

	$dom.bankButton.on( 'click', function( event ){
		thisGame.bank();
	});

	//roll dice, works, but not properly.
	$('#roll').on( 'click', function(){

		var dice = thisGame.rollDice();

		$('#button-container > button').prop( "disabled", true );

		$dom.diceOne.attr( 'src', 'images/' + dice[0] + '.png' );
		$dom.diceTwo.attr( 'src', 'images/' + dice[1] + '.png' );
		$dom.pot.html( thisGame.currentPot );

		$dom.bankButton.prop( "disabled", thisGame.bankDiable );
	});

} );
