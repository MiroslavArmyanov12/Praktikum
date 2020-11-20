	var visElements;
	
	function zoomOut() {
	var normElements = document.getElementsByClassName('resizeElements');
	for (i = 0; i < normElements.length; i++) {
	normElements[i].style.width = "150px";
	normElements[i].style.height = "150px";
	}
	document.getElementById("smallView").style.color='red';	
	document.getElementById("normalView").style.color='yellow';	
	document.getElementById("largeView").style.color='yellow';	

	document.getElementById("smallView").style.background='yellow';	
	document.getElementById("normalView").style.background='black';	
	document.getElementById("largeView").style.background='black';	
	
	visElements = document.getElementsByClassName('clshards');
	for (i = 0; i < visElements.length; i++) {
	visElements[i].style.visibility = "hidden"; }
	visElements = document.getElementsByClassName('cllevel');
	for (i = 0; i < visElements.length; i++) {
	visElements[i].style.visibility = "hidden"; }
	}
	
	
	function zoomIn() {
	var smallElements = document.getElementsByClassName('resizeElements');
	for (i = 0; i < smallElements.length; i++) {
	smallElements[i].style.width = "235px";
	smallElements[i].style.height = "235px";
	}
	document.getElementById("normalView").style.color='red';	
	document.getElementById("smallView").style.color='yellow';	
	document.getElementById("largeView").style.color='yellow';	
	
	document.getElementById("normalView").style.background='yellow';	
	document.getElementById("smallView").style.background='black';	
	document.getElementById("largeView").style.background='black';	
	
	visElements = document.getElementsByClassName('clshards');
	for (i = 0; i < visElements.length; i++) {
	visElements[i].style.visibility = "visible"; }
	visElements = document.getElementsByClassName('cllevel');
	for (i = 0; i < visElements.length; i++) {
	visElements[i].style.visibility = "visible"; }
	}
	
	function zoomMore() {
	var hugeElements = document.getElementsByClassName('resizeElements');
	for (i = 0; i < hugeElements.length; i++) {
	hugeElements[i].style.width = "500px";
	hugeElements[i].style.height = "500px";
	}
	document.getElementById("largeView").style.color='red';	
	document.getElementById("smallView").style.color='yellow';	
	document.getElementById("normalView").style.color='yellow';	
	
	document.getElementById("largeView").style.background='yellow';	
	document.getElementById("smallView").style.background='black';	
	document.getElementById("normalView").style.background='black';	
	
	visElements = document.getElementsByClassName('clshards');
	for (i = 0; i < visElements.length; i++) {
	visElements[i].style.visibility = "hidden"; }
	visElements = document.getElementsByClassName('cllevel');
	for (i = 0; i < visElements.length; i++) {
	visElements[i].style.visibility = "hidden"; }
	}