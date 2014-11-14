function Game(){
	this.listOfPlayers = [];
	this.turnNumber = 0;
	this.currentPot = 0;
}
Game.prototype.updateDatePot = function(potAmt) {
	this.currentPot += Number(potAmt)
	return this.currentPot
};
Game.prototype.updateTurnNumber = function(numTurn){
	this.turnNumber ++
	return this.t
}