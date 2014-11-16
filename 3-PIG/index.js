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
	if (winner) {
		// need html to announce winner and ask for new game
	}
	if (die) {
		$('#diceOne').attr('src', 'images/' + die[0] + '.png');
		$('#diceTwo').attr('src', 'images/' + die[1] + '.png');
	}
	$('#pot').html(pot);
	if (nextPlayer){
		$('.player').toggleClass('make-opaque');
	}
	$('#score1').html(score1);
	$('#score2').html(score2);
	if (die[0] == 1 || die[1] == 1) {
		$('#bank-button, #roll-button').click(function() {
      var bank = this[0];
      var roll = this[1];        
      bank.disabled = true;
      roll.disabled = true;        
      setTimeout(function() {
       bank.disabled = false;
       roll.disabled = false;           
      }, 2000);
    });  
	}
}

//keep thisGame global
var thisGame ;

createGame = function(player1, player2, scoreMax){
	thisGame = new Game(player1, player2, scoreMax);



	//return thisGame;
	// here we'll change DOM elements to appear as when the page initially loads
}


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
		})

		return false;
	} );

	$( '#bank-button' ).on( 'click', function( event ){
		thisGame.turnControler( 'bank' );
	} );

	$( '#bank-newGame' ).on( 'click', function( event ){
		thisGame = null;
		$('#body-container').toggleClass('make-opaque');
		$( '#create-game-modal' ).slideDown('slow');

	} );

	//roll dice, works, but not properly.
	$('#roll-button').on('click', function(){
		thisGame.turnControler( 'bank' );

		/*
		var dice = thisGame.rollDice();
		$('#diceOne').attr('src', 'images/' + dice[0] + '.png');
		$('#diceTwo').attr('src', 'images/' + dice[1] + '.png');
		*/
	});
	
} );
