var tpl_head = '\
<div class="header-box">\
    <div class="header">\
        <div class="fl clearfix">\
            <a class="fl title" target="_parent" href="/statics/main/website.html"></a>\
        </div>\
        <div class="fr">\
            <a href="/statics/main/website.html" class="fl header-btn" target="_parent">首页</a>\
            <a href="/statics/main/main.html" class="fl header-btn" target="_parent">下载</a>\
            <a class="fl login-btn" href="/login.html" target="_parent">登录企业</a>\
            <a class="fl create-company-btn" href="/pages/createCompany/createCompany.html" target="_parent">注册企业</a>\
        </div>\
    </div>\
</div>\
';

function heredoc(fn) {
    return fn.toString().split('\n').slice(1,-1).join('\n') + '\n'
}

