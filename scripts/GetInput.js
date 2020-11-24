document.getElementById('submit').addEventListener('click', function(){
	var user = document.getElementById('input').value;
	var type = document.getElementById('types').value;
	side = document.getElementById('side').value;


	fetchFromLichess(user,type);

	//remove input elements
	var inputdiv = document.getElementById('inputdiv');
	inputdiv.innerHTML = '';

	//loading status
	var loadingStatus = document.getElementById('loadingstatus');
	var status = document.createElement("H3");
	status.setAttribute('id','status');
	status.textContent = "Loading " + user + "'s games";
	loadingStatus.appendChild(status);

})