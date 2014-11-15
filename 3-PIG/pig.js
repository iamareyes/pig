// works
var Player = function(pname){
	this.playerName = pname
	this.score = 0
}
// works
function Game(){
	this.listOfPlayers = [];
	this.turnNumber = 0;
	this.currentPot = 0;
	this.scoreMax = 0;
}
// works
Game.prototype.updatePot = function(potAmt) {
	this.currentPot += Number(potAmt)
	return this.currentPot
};
// works
Game.prototype.updateTurnNumber = function(){
	this.turnNumber ++
	return this.turnNumber
}
// works
Game.prototype.initGame = function(player1_name,player2_name,scoreMax){
	this.scoreMax = scoreMax
	var player1 = new Player(player1_name)
	var player2 =  new Player(player2_name)
	this.listOfPlayers.push(player1)
	this.listOfPlayers.push(player2)
}
// works
Game.prototype.rollDice = function(){
	var die = Math.floor(Math.random() * 6) + 1
	return die
}
// works
Game.prototype.updateScore = function(player_name,newAmt) {
	for (var i = 0; i < this.listOfPlayers.length; i++){
        if (this.listOfPlayers[i].playerName == player_name){
            this.listOfPlayers[i].score += Number(newAmt);
        }
    }
}
// works
Game.prototype.turnControler = function(player_name,currentPot,button,diceValue){
	if(button == "bank"){
		this.updateScore(player_name,currentPot)
		this.updateTurnNumber()
	}
	else if(button == "roll"){
		this.rollDice()
		this.updateTurnNumber()
	}
}
Game.prototype.switchPlayer = function(){
	/*not sure how to switch between players*/
}
