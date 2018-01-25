
/**
 * 与客户端交互组件
 * @author		王锋(wangfeng8@)
 * @requires	Zepto
 * @date		2016-02-24
 *
 *
 */
(function(){

	/**
	 * 检测平台
	 * @return string [ios|android|null]
	 */
	function platform(){
		var ua = navigator.userAgent.toLowerCase();
		if (ua.match(/iphone|ipod/ig)){
			return 'ios';
		} else if (ua.match(/android/i)) {
			return 'android';
		} else {
			return '';
		}
	}


	/**
	 * 检测平台
	 * @return string [ios|android|null]
	 */
	window.onload = function() {
	    var oLi = document.getElementById("j_question_list").getElementsByTagName("li");
	    for (var i = 0; i < oLi.length; i++) {
	    	//增加索引
	        oLi[i].index = i;
	        //点击作者
	        oLi[i].addEventListener('click',function(e){
	        	//e.preventDefault();	//先阻止默认
	        	var index = this.index,
	        		title = oLi[index].innerText;
				if(platform() == 'ios'){
					iosCall(title);
				}else if(platform() == 'android'){
					window.Click && window.Click.setPosition(title);
				}
			},false);
	    } 
	}

})();
