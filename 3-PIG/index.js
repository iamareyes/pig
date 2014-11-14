updateDom = function(score1, score2, whoseTurn, dice1, dice2, pot){
	$('#dice').html(dice1, dice2);
	$('#pot').html(pot);
	// here we'll toggle some class here to clearly show whose turn it is
	$('#score1').html(score1);
	$('#score2').html(score2);
}

createGame = function(player1, player2, scoreMax){
	var thisGame = new Game();
	thisGame.initGame(player1, player2, scoreMax)
	return thisGame;
	// here we'll change DOM elements to appear as when the page initially loads
}

$(document).ready(function(){
	//event listeners	
})