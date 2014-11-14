var Player = function(pname){
	this.playerName = pname
	this.score = 0
}

function Game(){
	this.listOfPlayers = [];
	this.turnNumber = 0;
	this.currentPot = 0;
	this.scoreMax = 0;
}

Game.prototype.updatePot = function(potAmt) {
	this.currentPot += Number(potAmt)
	return this.currentPot
};

Game.prototype.updateTurnNumber = function(numTurn){
	this.turnNumber ++
	return this.turnNumber
}
Game.prototype.initGame = function(player1_name,player2_name,scoreMax){
	this.scoreMax = scoreMax
	var player1 = new Player(player1_name)
	var player2 =  new Player(player2_name)
	this.listOfPlayers.push(player1)
	this.listOfPlayers.push(player2)
}
Game.prototype.rollDice = function(){
	// return two dice number
}
Game.prototype.updateScore = function(player_name,newAmt) {
	for (var i = 0; i < this.listOfPlayers.length; i++){
        if (this.listOfPlayers[i].playerName == player_name){
            this.listOfPlayers[i].score += Number(newAmt);
        }
    }
};
Game.prototype.turnControler = function(player_name,currentPot,button,diceValue){

}
Game.prototype.switchPlayer = function(){
	
}