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

updateDom = function(score1, score2, whoseTurn, dice1, dice2, pot){
	$('#dice').html(dice1, dice2);
	$('#pot').html(pot);
	// here we'll toggle some class here to clearly show whose turn it is
	$('#score1').html(score1);
	$('#score2').html(score2);
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

		//start the game
		createGame( input['player-one-name'], 
			input['player-two-name'], 
			input['game-max-score'] 
		);
		
		//hide modal and show container
		$('#create-game-modal').slideUp('fast', function(){
			$('#body-container').toggleClass('make-opaque');
		})

		return false;
	} );
} );
