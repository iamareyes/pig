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

	$( '.player' ).toggleClass('make-opaque');
	$( '#score0' ).html( this.players[0].score );
	$( '#score1' ).html( this.players[1].score );
	$( '#pot' ).html('0');

	//reset dice
	$( '#diceOne' ).attr( 'src', 'images/1.png' );
	$( '#diceTwo' ).attr( 'src', 'images/1.png' );

	return true;
};

//keep thisGame global
var thisGame;

$(document).ready(function(){

	//show the make game model
	$('#create-game-modal').slideDown('slow');

	//make game submit
	$('#create-game-modal > form').on('submit', function( event ){
		
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
		$( this ).find( '[type]' ).val('');

		//set the game up
		thisGame = new Game();
		thisGame.Player( [ input.player0, input.player1 ] );
		thisGame.scoreMax = input.score || 100;
		
		//set the players name in the DOM
		$( '#player0 h3' ).html( input.player0 );
		$( '#player1 h3' ).html( input.player1 );

		//hide modal and show container
		$( '#create-game-modal' ).slideUp( 'fast', function(){
			$( '#body-container' ).toggleClass( 'make-opaque' );
		} );

		return false;
	} );

	$( '#bank-button' ).on( 'click', function( event ){
		thisGame.bank();
	} );

	//roll dice, works, but not properly.
	$( '#roll-button' ).on( 'click', function(){
		var dice = thisGame.rollDice();
		$( '#diceOne' ).attr( 'src', 'images/' + dice[0] + '.png' );
		$( '#diceTwo' ).attr( 'src', 'images/' + dice[1] + '.png' );
		$( '#pot' ).html( thisGame.currentPot );
	});

} );
