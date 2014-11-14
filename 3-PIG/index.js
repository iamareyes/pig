updateDom = function(score1, score2, whoseTurn, dice1, dice2){
	$('#dice').html(dice1, dice2)

	$('#score1').html(score1);
	$('#score2').html(score2);
}

createGame = function(player1, player2){
	var thisGame = new Game(player1, player2);
	return thisGame;
	// change DOM elements to appear as when the page initially loads
}

$(document).ready(function(){
	//event listeners	
})