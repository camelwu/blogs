var anchor = window.location.href.split("#")[1];
var verUl = document.querySelectorAll('.ver-ul');
if(/Ios/.test(anchor)){
	for (var i = 0; i < verUl.length; i++) {
		removeClass(verUl[i],"selected");
	}
	addClass(document.getElementById('Ios'),"selected")
}else if(/Android/.test(anchor)){
	for (var i = 0; i < verUl.length; i++) {
		removeClass(verUl[i],"selected");
	}
	addClass(document.getElementById('Android'),"selected")
}else if(/Mac/.test(anchor)){
	for (var i = 0; i < verUl.length; i++) {
		removeClass(verUl[i],"selected");
	}
	addClass(document.getElementById('Mac'),"selected")
}else if(/Windows/.test(anchor)){
	for (var i = 0; i < verUl.length; i++) {
		removeClass(verUl[i],"selected");
	}
	addClass(document.getElementById('Windows'),"selected")
}
function removeClass(ele, sClass){
	var classArr = ele.className.split(' ');
	for(var i = 0; i < classArr.length; i++){
		if(classArr[i] == sClass){
			classArr.splice(i--,1);
		}
	}
	ele.className = classArr.join(' '); 
}

function addClass (ele, sClass){
	var classArr = ele.className.split(' ');
	for (var i = 0; i < classArr.length; i++) {
		if(classArr[i] == sClass){
			return;
		}
	}
	ele.className += (" "+sClass);
}