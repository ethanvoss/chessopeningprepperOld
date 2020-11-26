function fenToString(fenIn)
{
	var fenOut = "";
	for(var x = 0; x < fenIn.length; x++)
	{
		if(x > 0) fenOut += "/";
		for(var y = 0; y < fenIn[x].length; y++)
		{
			fenOut += fenIn[x][y];
		}
	}

	return fenOut;
}

function stringToFen(fenIn)
{
	var fen = fenIn.split('');
	var fenOut = [];
	var row = [];
	var r = 0;
	
	for (var i in fen)
	{
		if(fen[i] == "/")
		{
			fenOut.push(row);
			row = [];
			continue;
		}
		row.push(fen[i]);

	}
	fenOut.push(row);
	return fenOut;
}