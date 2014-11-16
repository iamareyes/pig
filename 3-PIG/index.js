/* turn form data in an object 
http://stackoverflow.com/a/1186309/3140931
*/

$.fn.serializeObject = function(){
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

updateDom = function(score1, score2, nextPlayer, die, pot, winner){
	die = die || [ 1, 1 ];

	$('#pot').html(pot);
	$('#score1').html(score1);
	$('#score2').html(score2);
	$('#bank-button').prop("disabled", false)
	$('#roll-button').prop("disabled", false)	

	if (winner) {
		alert(winner + ' IS THE WINNER!!!!!!  \n Play Again?')
		$('#bank-button').prop("disabled", true)
		$('#roll-button').prop("disabled", true)			
		$('#create-game-modal').slideDown('slow');
		$('#body-container').toggleClass('make-opaque');
	}

	if (die) {
		$('#diceOne').attr('src', 'images/' + die[0] + '.png');
		$('#diceTwo').attr('src', 'images/' + die[1] + '.png');
	}

	if (nextPlayer){
		$('.player').toggleClass('make-opaque');
	}

	if (pot == 0 || die[0] == die[1]) {
		$('#bank-button').prop("disabled", true);
	}

	if (die[0] == 1 || die[1] == 1) {
		$('#bank-button').prop("disabled", true);
		$('#roll-button').prop("disabled", true);	    		
		var buttonTimer;
		function disableButtons(){
			$('#roll-button').prop("disabled", false); 
		}
		function callTimer() {
			buttonTimer = setTimeout(disableButtons, 2000)
		};
		callTimer();
	}
}

//keep thisGame global
var thisGame ;
var newGame;

createGame = function(player1, player2, scoreMax){
	thisGame = new Game(player1, player2, scoreMax);



	//return thisGame;
	// here we'll change DOM elements to appear as when the page initially loads
}


$(document).ready(function(){
	//bank button shouldn't be enabled with a pot of 0
	$('#bank-button').prop("disabled", true)	
	$('#roll-button').prop("disabled", false)				

	//show the make game model
	$('#create-game-modal').slideDown('slow');

	//make game submit
	$('#create-game-modal > form').on('submit', function( event ){
		//stop form from processing
		event.preventDefault();

		//get the form data into an object
		var input = $( this ).serializeObject();
		
		//make sure the name's are not empty
		if( input['player-one-name'] === '' || input['player-two-name'] === '' ){
			alert('Please enter player names');
			return false ;
		}

		$( this ).find('[type]').val(''); 		

		//start the game
		createGame( input['player-one-name'], 
			input['player-two-name'], 
			input['game-max-score'] 
		);
		
		//set the players name in the DOM
		$('#p-one > * > h3').html( input['player-one-name'] );
		$('#p-two > * > h3').html( input['player-two-name'] );

		//hide modal and show container
		$('#create-game-modal').slideUp('fast', function(){
			$('#body-container').toggleClass('make-opaque');
		});
		return false;
	});

	$( '#bank-button' ).on( 'click', function( event ){
		thisGame.turnControler( 'bank' );
	} );

	$('#roll-button').on('click', function(){
		thisGame.turnControler( 'roll' );
	});

	$( '#bank-newGame' ).on( 'click', function( event ){
		//thisGame = null;
		$('#body-container').toggleClass('make-opaque');
		$( '#create-game-modal' ).slideDown('slow');

	} );
	
} );
