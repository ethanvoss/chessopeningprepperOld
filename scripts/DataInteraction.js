function newMove()
{
	var input = document.getElementById('moveInput');
	var playerMove = input.value;
	var move = expandMove(currentFen[pieceMoves], input.value, side);

	if(move != "err")
		{
			currentFen.push(moveToFen(currentFen[pieceMoves], move));
			makeMove(move);
			input.value = "";

			if(side == "black") moveOutput(oppMove, playerMove);

			//get opp move
			var findmove = findMove();

			var oMove = expandMove(currentFen[pieceMoves], findmove["move"],oppSide);
			currentFen.push(moveToFen(currentFen[pieceMoves], oMove));
			makeMove(oMove);

			if(side == "white") moveOutput(playerMove, oppMove);
			
		}
	else
		{
			console.log("error with move input");
		}



	//findMove(input.value);
}

function moveOutput(whiteMove, blackMove)
{
	var list = document.getElementById('moveList');
	var listElement = document.createElement('li');


	listElement.innerHTML = whiteMove + " " + blackMove;
	list.appendChild(listElement);
}

function updateMoveDisplay(oMove)
{
	var display = document.getElementById('moveDisplay');
	display.innerHTML = "their move is " + oMove["move"] + ". theyve played this " + oMove["timesPlayed"] + " times in this position."
}

function findMove()
{
	var oppSide = "white";
	if(side == "white") oppSide = "black";

	var pool = [];
	for(var g in games)
	{
		if(games[g].fens[pieceMoves] == currentFen[pieceMoves])
		{
			pool.push(games[g]);
		}
	}
	//find most common move
	var movePool = {};
	for(var i in pool)
		{

			var game = pool[i];
			var move = game.moves[pieceMoves+1];	
			//adds all moves played in this position to movePool
			var found = false;
	            for (var mov in movePool) 
		            {
		                if (mov == move) 
			                {
			                    found = true;
			                    movePool[move] += 1;
			                    continue;
			                }
		            }
	            if (!found) movePool[move] = 1;
		}
	var moveCount = 0;
	var playedMove;
	//find most played move
	for(var mov in movePool)
		{
			if(movePool[mov] > moveCount)
				{
					moveCount = movePool[mov];
					playedMove = mov;
				}
		}
	oppMove = playedMove;
	console.log(playedMove);	
	//returns most played move and times it was played

	var out = 
	{
		"move" : playedMove,
		"timesPlayed" : moveCount
	}
	updateMoveDisplay(out);
	return out;
}

function makeMove(move)
{
	board.move(move);
	pieceMoves++;
}