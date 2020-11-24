function initializeGames(pgnArr)
{
	//convert pgns into games
	//for(var i in pgnArr)
	//{
		console.log(baseFen); //logs the messed up fen
		var outgoingFens = [];
		outgoingFens.push(baseFen); //this is what messes up baseFen. if it is not run base fen is not messed up
		var pieceMoves = 0;
		var g = pgnArr[0].split(' ');
		var moveNumber = 1;


		for(var j = 0; j < g.length; j++)
			{
				
				if(g[j] == moveNumber.toString() + ".")
					{
						//moves found
						var whiteMove = g[j+1];
						var blackMove = g[j+2];

						//find fen for white move
						whiteMove = expandMove(outgoingFens[pieceMoves],whiteMove,"white");
						var newFen = moveToFen(outgoingFens[pieceMoves],whiteMove);
						//console.log("fen for " + whiteMove);
						//console.log(newFen)
						outgoingFens.push(newFen);
						pieceMoves++;
						//find fen for black move
						blackMove = expandMove(outgoingFens[pieceMoves],blackMove,"black");
						newFen = moveToFen(outgoingFens[pieceMoves],blackMove);
						//console.log("fen for " + blackMove);
						//console.log(newFen)
						outgoingFens.push(newFen);
						pieceMoves++;

						moveNumber++;
					}
			}
		games.push(new Game(outgoingFens));

	//}
	console.log(games);
}

class Game
{
	constructor(fenIn)
	{
		this.fens = fenIn;
	}
}