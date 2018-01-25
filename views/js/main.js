var nav = document.getElementById('nav');
var navBtns = nav.getElementsByTagName('span');
var contentBox = document.getElementById('contentBox');
var platform = window.location.href.split('#')[1];
if(platform){
    if(platform == "w"){
        for (var j = 0; j < contentBox.children.length; j++) {
            removeClass(contentBox.children[j],'show');
            removeClass(contentBox.children[j],'hide');
            addClass(contentBox.children[j],'hide');
        }
        for (var q = 0; q < navBtns.length; q++) {
            removeClass(navBtns[q],'active');
        }
        addClass(contentBox.children[0],'show');
        addClass(navBtns[0],'active');
    }else if(platform == "m"){
        for (var j = 0; j < contentBox.children.length; j++) {
            removeClass(contentBox.children[j],'show');
            removeClass(contentBox.children[j],'hide');
            addClass(contentBox.children[j],'hide');
        }
        for (var q = 0; q < navBtns.length; q++) {
            removeClass(navBtns[q],'active');
        }
        addClass(contentBox.children[1],'show');
        addClass(navBtns[1],'active');
    }else if(platform == "a"){
        for (var j = 0; j < contentBox.children.length; j++) {
            removeClass(contentBox.children[j],'show');
            removeClass(contentBox.children[j],'hide');
            addClass(contentBox.children[j],'hide');
        }
        for (var q = 0; q < navBtns.length; q++) {
            removeClass(navBtns[q],'active');
        }
        addClass(contentBox.children[2],'show');
        addClass(navBtns[2],'active');
    }else if(platform == "i"){
        for (var j = 0; j < contentBox.children.length; j++) {
            removeClass(contentBox.children[j],'show');
            removeClass(contentBox.children[j],'hide');
            addClass(contentBox.children[j],'hide');
        }
        for (var q = 0; q < navBtns.length; q++) {
            removeClass(navBtns[q],'active');
        }
        addClass(contentBox.children[3],'show');
        addClass(navBtns[3],'active');
    }
}else{
    for (var i = 0; i < navBtns.length; i++) {
        (function(i){
            navBtns[i].onclick = function(){
                for (var j = 0; j < contentBox.children.length; j++) {
                    removeClass(contentBox.children[j],'show');
                    removeClass(contentBox.children[j],'hide');
                    addClass(contentBox.children[j],'hide');
                }
                for (var q = 0; q < navBtns.length; q++) {
                    removeClass(navBtns[q],'active');
                }
                addClass(contentBox.children[i],'show');
                addClass(this,'active');
            }
        })(i)
    }
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