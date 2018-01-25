var userAgent = window.navigator.userAgent,
flag = userAgent.match(/Android/i) || -1 != userAgent.indexOf("iPhone") || -1 != userAgent.indexOf("iPod") || -1 != userAgent.indexOf("iPad"),
isSafari = -1 != userAgent.indexOf("Safari") && -1 == userAgent.indexOf("Chrome"),
isIE = (!!window.ActiveXObject || "ActiveXObject" in window) ? true : false;

var indexHead = document.getElementById("_index_bg"),
headScrollInterpolator = .5,
scrollEffect = function (scrollTop) {
    if (0 > scrollTop && (scrollTop = 0), isSafari , !isIE) {
        var b = "";
        "undefined" != typeof document.body.style.transform ? b = "transform" : ["webkit", "moz", "o", "ms"].forEach(function (scrollTop) {
                "undefined" != typeof document.body.style[scrollTop + "Transform"] && (b = scrollTop + "Transform");
            });
        b ? indexHead.style[b] = "translate3d(0," + scrollTop * headScrollInterpolator + "px,0)" : indexHead.style.top = scrollTop * headScrollInterpolator + "px";
    }
};
window.onscroll = function () {
var nav = document.getElementById('nav');
var navshow = document.getElementById('navshow');
var scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
if (scrollTop >= 645) {
    if(navshow.offsetHeight == 0){
        navshow.style.height = '80px';
        navshow.style.transition = 'height .2s';
        navshow.style.webkitTransition = 'height .2s';
        navshow.style.mozTransition = 'height .2s';
        navshow.style.oTransition = 'height .2s';
    }
} else if(scrollTop<645 && scrollTop>80){
    if(navshow.offsetHeight == 80){
        navshow.style.height = '0px';
        navshow.style.webkitTransition = 'height .2s';
        navshow.style.mozTransition = 'height .2s';
        navshow.style.oTransition = 'height .2s';
    }
}
scrollEffect(scrollTop);
};
var ele = document.getElementById('_index_bg');
var elem = document.getElementById('_banner_bg');
// 为了看到效果加个延时
setTimeout(function(){
// 若图片URL失效请自行替换
var imgUrl = ele.getAttribute('data-img');
var imgObject = new Image();
var imgPath = elem.getAttribute('data-img');
var imgObj = new Image();

imgObject.src = imgUrl;
imgObj.src = imgPath;
imgObject.onload = function(){
    ele.style.background ='url('+imgUrl+') no-repeat center';
    ele.style.backgroundSize ='cover';
    ele.setAttribute('class', 'big-background complete');
};
imgObj.onload = function () {
    elem.style.background ='url('+imgPath+') no-repeat center';
    elem.style.backgroundSize ='cover';
    elem.setAttribute('class', 'backround-icon complete');
}
}, 500);
document.getElementById('win-download').onclick = function () {
    var url =this.getAttribute('data-url');
    window.location.href = url;
};
document.getElementById('mac-download').onclick = function () {
    var url =this.getAttribute('data-url');
    window.location.href = url;
};
document.getElementById('a-download').onclick = function () {
window.location.href = '/downloads#a';
};
document.getElementById('i-download').onclick = function () {
window.location.href = '/downloads#i';
};