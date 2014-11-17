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

function enableButton(button) {
	$(button).prop("disabled", false);
	$(button).hover(
		function() {
			$(this).css("border-left", ".2em solid black");
			$(this).css("border-top", ".2em solid black");
			$(this).css("border-right", ".2em solid rgb(221, 221, 221)");
			$(this).css("border-bottom", ".2em solid rgb(221, 221, 221)");
		}, function() {
			$(this).css("border-left", ".2em solid rgb(221, 221, 221)");
			$(this).css("border-top", ".2em solid rgb(221, 221, 221)");
			$(this).css("border-right", ".2em solid black");
			$(this).css("border-bottom", ".2em solid black");
		}
	)
}

var updateDom = function(score1, score2, nextPlayer, die, pot, winner){
	$('#pot').html(pot);
	$('#p-one > h1').html(score1);
	$('#p-two > h1').html(score2);
	enableButton('#bank');
	enableButton('#roll');

	if (winner) {
		var i = thisGame.currentPlayer.index;
		$('#player' + i).show();
		alert(winner + ' IS THE WINNER!!!!!!  \n Play Again?');
		$('#bank').prop("disabled", true);
		$('#roll').prop("disabled", true);
		$('.create-game-modal').slideDown('slow');
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
		$('#bank').prop("disabled", true);
		$('#bank').addClass('no-hover')	

	}

	if (die[0] == 1 || die[1] == 1) {
		$('#bank').prop("disabled", true);
		$('#roll').prop("disabled", true);
		var buttonTimer;

		setTimeout( function(){
			enableButton('#roll');
		}, 2000 );
	}
	return true;
};

//keep thisGame global
var thisGame ;

var createGame = function(player1, player2, scoreMax){

	//hide trophy
	$('.player > img').hide();

	//start the game
	thisGame = new Game(player1, player2, scoreMax);

	
	//set the players name in the DOM
	$('#p-one > h2').html( player1 );
	$('#p-two > h2').html( player2 );
	$('#max-score').html( scoreMax );

	return true;
};


$(document).ready(function(){

	//slide the make game modal down
	$('fieldset.create-game-modal').slideDown('slow');

	//bank button shouldn't be enabled with a pot of 0
	$('#bank').prop("disabled", true);
	enableButton('#roll');


	//make game submit
	$('.create-game-modal > form').on('submit', function( event ){
		//stop form from processing
		event.preventDefault();

		//get the form data into an object
		var input = $( this ).serializeObject();
		
		//max score check
		if( input['game-max-score'] <= 0 ){
			alert('Please enter valid score!');
			return false ;
		}

		//make sure player names are not the same
		if( input['player-one-name'] === input['player-two-name'] ){
			alert('Please set different player names');
			return false ;
		}

		//reset the form
		$(this)[0].reset();

		createGame( input['player-one-name'], input['player-two-name'], input['game-max-score']) ;

			//hide modal and show container

		$('.create-game-modal').slideUp( 'fast', function(){
			$('#body-container').toggleClass( 'make-opaque' );
		});

		return false;
	});

	$( '#bank' ).on( 'click', function( event ){
		thisGame.turnControler( 'bank' );
	} );

	$('#roll').on('click', function(){
		thisGame.turnControler( 'roll' );
	});

	$('#brand-new-game').on('click', function(){
		$('#diceOne').attr('src', 'images/1.png');
		$('#diceTwo').attr('src', 'images/1.png');
		$('#bank').prop("disabled", true);
		enableButton('#roll');
		$('.create-game-modal').slideDown('slow');
		$('#body-container').toggleClass('make-opaque');
	});
});
