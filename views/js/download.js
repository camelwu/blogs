window.onload = function () {

    function testSys() {
        var u = navigator.userAgent;
        var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1;
        var isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
        if (isAndroid) {
            return 0;
        }
        if (isIOS) {
            return 1;
        }
    }

    function showCusDialog(id, str) {
        var dialog = document.getElementById(id);
        var tip = dialog.querySelector('.tip');
        var close = dialog.querySelector('.close');
        var mask = document.getElementById('mask');

        tip.innerHTML = str;
        dialog.className = 'prompt-modal anim-show';
        mask.className = 'shadow-in shadow';
        initCusDialog(dialog);
        close.onclick = function () {
            var timer = null
            dialog.className = 'prompt-modal anim-out';
            mask.className = 'shadow_out';
            timer = setTimeout(function () {
                dialog.className = 'prompt-modal hide';
                mask.className = 'shadow hide';
                clearInterval(timer);
            }, 200)

        };

    }

    function initCusDialog(obj) {
        var h = obj.offsetHeight;
        obj.style['margin-top'] = -h / 2 + 'px';
    }
    //用于区分生产环境还是预生产环境
    function getHost() {
        var host = window.location.href;
        var prehttp = 'https://work.pre.gomeplus.com/statics/h5/download.html';
        var linehttp = 'https://work.gomeplus.com/statics/h5/download.html';
        if(host ===prehttp){
            return 0;
        }else if (host ===linehttp) {
            return 1;
        }
    }
    var flag = getHost();// 0 预生产 1 生产
    var dl_ios = document.getElementById('dl-ios');
    dl_ios.onclick = function () {
        if(flag === 1){
            dl_ios.href = 'https://itunes.apple.com/us/app/aeromind/id1286975695?l=zh&ls=1&mt=8';
        }
        if (inWechat()) {
            wechatGuide.style.display = 'block';
            return false;
        }

        if (testSys() === 0) {
            showCusDialog('sys-tip', '您的手机是Android系统，请下载Android版本客户端！', true);
            return false;
        }
        if(flag === 0){
            var _dialog = document.getElementById('prompt-modal');
            var _mask = document.getElementById('mask');

            _dialog.className = 'prompt-modal anim-show';
            initCusDialog(_dialog);
            _mask.className = 'shadow-in shadow';
            makeSure(_dialog, _mask);
        }
    };

    function makeSure(obj, _modal) {
        var sure_btn = document.getElementById('makeSure');
        if (flag === 0){
            sure_btn.href = 'itms-services://?action=download-manifest&url=https://download.meixincdn.com/mxoffice/gomeplus/ios/pre-manifest.plist';
        } else if(flag === 1){
            sure_btn.href = 'itms-services://?action=download-manifest&url=https://download.meixincdn.com/mxoffice/gomeplus/ios/manifest.plist';
        }
        var timer = null;
        sure_btn.onclick = function () {
            obj.className = 'prompt-modal anim-out';
            _modal.className = 'shadow_out';
            timer = setTimeout(function () {
                obj.className = 'prompt-modal hide';
                _modal.className = 'shadow hide';
                clearInterval(timer);
            }, 200)
        }

    }

    var dl_android = document.getElementById('dl-android');
    if (flag === 0){
        dl_android.href = 'https://download.meixincdn.com/mxoffice/gomeplus/android-pre/Aeromind_1_3_0.apk';
    } else if(flag === 1){
        dl_android.href = 'https://download.meixincdn.com/mxoffice/gomeplus/android/Aeromind_1_3_0.apk';
    }
    dl_android.onclick = function () {
        if (inWechat()) {
            wechatGuide.style.display = 'block';
            return false;
        }
        if (testSys() === 1) {
            showCusDialog('sys-tip', '您的手机是iOS系统，请下载iOS版本客户端！', true);
            return false;
        }
    };


    /*
     *   判断是否是微信环境
     */
    function inWechat() {
        var ua = navigator.userAgent.toLowerCase();
        if (ua.match(/MicroMessenger/i) == "micromessenger") {
            return true;
        } else {
            return false;
        }
    }

    var wechatGuide = document.querySelector('.j_wechat_guide');
    wechatGuide.onclick = function () {
        this.style.display = 'none';
    };
};
