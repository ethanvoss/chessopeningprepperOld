const cConvert = ["a","b","c","d","e","f","g","h"];

function moveToFen(fen, move)
{	
	//convert move to fen then return that fen

	var fenOut = fen;
	var positions = move.split('-');
	
	var oldPos = positions[0];
	var newPos = positions[1];
	var piece;
	var r, c;

	//get piece and set old pos;
		//set r and c to old pos in fen format
		r = parseInt(oldPos.split('')[1]) - 1;
		for(var i in cConvert)
		{
			if(cConvert[i] == oldPos.split('')[0]) c = i;
		}
		c = parseInt(c);

	piece = fen[r][c];
	fenOut[r][c] = "0";

	//set new pos to piece
		//set r and c to new pos in fen format
		r = parseInt(newPos.split('')[1]) - 1;
		for(var i in cConvert)
		{
			if(cConvert[i] == newPos.split('')[0]) c = i;
		}
		c = parseInt(c);
	fenOut[r][c] = piece;
	return fenOut;
}

function expandMove(fen, move, side)
{
	var moveInArr = move.split('');
	const WhitePieces = ["K", "Q", "R", "B", "N", "P"];
	const BlackPieces = ["k", "q", "r", "b", "n", "p"];


	//Find Piece
	var piece;
	var pieceNum;
	switch(moveInArr[0]) //gets array index for xPieces array
		{
			case "K":
				pieceNum = 0;
				break;
			case "Q":
				pieceNum = 1;
				break;
			case "R":
				pieceNum = 2;
				break;
			case "B":
				pieceNum = 3;
				break;
			case "N":
				pieceNum = 4;
				break;
			default:
				pieceNum = 5;
				break;
		}
	switch(side)	//sets the piece to the correct color
		{
			case "white":
				piece = WhitePieces[pieceNum];
				break;
			case "black":
				piece = BlackPieces[pieceNum];
				break;
			default:
				console.log("Function MoveToFen() error: the incoming side was not white or black");
		}

	//Pawn Stuff
	if(piece == "P" || piece == "p")
		{
			var isCapture = false;	
			if(moveInArr[1] == "x")
				{
					isCapture = true;
				}
			
			if(isCapture)	//Capture
				{
					//Doesnt work with en passant
					var mult = 1; if(side == "black") mult = -1;
					var oldPos = moveInArr[0] + (parseInt(moveInArr[3]) - (1 * mult)).toString();
				}
			else	//Not a capture
				{

					//check fen for one move back
					var oldPos;
					var mult = 1; if(side == "black") mult = -1;
					var c = moveInArr[0];
					for(var i in cConvert)
						{
							if(cConvert[i] == c) c = i;
						}
					c = parseInt(c);
					var r = parseInt(moveInArr[1]) - (1 * mult);
					if(fen[r][c] == piece) // piece found 1 space behind
						{
							oldPos = cConvert[c] + r.toString();
						}
					else 	//Must be a double move
						{
							oldPos = cConvert[c] + (r - (1 * mult))
						}

					
				}
		}
	else //Piece is not a pawn
	{
		const pieceMoves = [
			"1,0/-1,0/0,1/0,-1/1,1/1,-1/-1,-1/-1,1/NoLoop",//King
			"1,0/-1,0/0,1/0,-1/1,1/1,-1/-1,-1/-1,1/Loop",//Queen
			"1,0/-1,0/0,1/0,-1/Loop",//Rook
			"1,1/1,-1/-1,-1/-1,1/Loop",//Bishop
			"-2,1/-1,2/1,2/2,1/-2,-1/-1,-2/1,-2/2,-1/NoLoop"//Nite

			];
		var startR, startC;
		startR = (parseInt(moveInArr[moveInArr.length-1]) - 1); //row is in fen format so its 1 less then the move name
		for(var i in cConvert)
			{
				if(cConvert[i] == moveInArr[moveInArr.length-2]) startC = i; //collum is in fen format so its a number not a letter
			}


		const instructions = pieceMoves[pieceNum].split('/');
		var found = false;

		for(var i = 0; i < instructions.length-1;i++)
		{
			var instruction = instructions[i].split(',');
			var search = true;
			var r = startR;
			var c = parseInt(startC);
			while(search)
				{
					r += parseInt(instruction[1]);
					c += parseInt(instruction[0]);

					if(c > 7 || c < 0) search = false;
					if(r > 7 || r < 0) search = false;

					if(search == false) break;
					var lookingAt = fen[r][c];	

					if(lookingAt == piece) //piece found 
						{
							console.log("piece found at " + c + "," + r);
							found = true;
							break;
						}
					
					//Doesnt loop if last instruction is NoLoop
					if(instructions[instructions.length-1] == "NoLoop") search = false;
					
				}//end of while loop
			if(found) //piece was found
				{
					//converts fen formatted r and c to move format
					oldPosR = (r + 1).toString();
					oldPosC = cConvert[c];

					oldPos = oldPosC + oldPosR;
					break;
				}
		}//end of for loop
		if(!found)
			{
				console.log("piece not found");
				console.log("looking for " + moveInArr);
				console.log("looking in ");
				console.log(fen);
			}
	}
	var newPos = moveInArr[moveInArr.length-2] + moveInArr[moveInArr.length-1];
	return (oldPos + "-" + newPos);

}