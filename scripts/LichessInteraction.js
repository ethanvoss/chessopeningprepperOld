function fetchFromLichess(user, type)
{
  console.log("Loading ");
  const api = "http://lichess.org/api/games/user/";
  var perams = "";
  if(type != "all") { //if something other than "all" is selected, add game type to params
    perams = "?perfType=" + type;
  }
  


  fetch(api + user + perams).then(function(res) { //make request to lichess for the games
    return res.text();
  }).then(function(data){
    //set status
    document.getElementById('status').textContent = "Games loaded";
    //send pulled data to be disected
    disectPgn(data, user);
  }).catch(err => console.log(err))

}

function disectPgn(data, user)
{
  var pgn = data.split('\n');

  var tempGames = [];
  var sideIndicator;

  if(side == "white") sideIndicator = "[black \"" + user.toLowerCase() + "\"]";
    else sideIndicator = "[white \"" + user.toLowerCase() + "\"]";
    
  //sort out games where the selected user is on the opposing side
  var pullNextGame = false;
  for(var i in pgn)
  {
    if(pgn[i].toLowerCase() == sideIndicator) pullNextGame = true;
    var line = pgn[i].split('');
    
    if(line[0] == "1" && pullNextGame)
    {
      tempGames.push(pgn[i]);
      pullNextGame = false;
    }
    
  }
  games = initializeGames(tempGames);
}