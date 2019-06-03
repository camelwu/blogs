# Project introduce  
express项目，离开java和php后很久没正经写过服务器端渲染，事实上过去几年大量宣扬的前后端分离是为了开发过程更加顺畅，从性能上看未见得是最优方案，当前常见的有三种方案：  
+ 「后端渲染」传统的asp、php、jsp 或 Java|Ruby 直接输出html，再加载静态资源并重构（重绘或重排）网页的渲染机制；
+ 「前端渲染」空白html，通过 js 来控制渲染页面大部分内容，代表是现在流行的 SPA 单页面应用；
+ 「同构渲染」首次渲染时使用 Node.js 来直出html。一般来说同构渲染是介于前后端中的共有部分；
技术的演进最终目的是为了商业目的更快、更快、更快！！！
我们可以从下面几张图进行对比：  


## 日志
+ 通过express脚手架搭建基础架构
+ 增加依赖
+ 增加模版文件(jade=>ejs=>art-template)
+ conncet-mongo 从过去的db，host=> url: mongodb://localhost:27017/names
+ multer文件上传的成功失败，如何操作。
+ 交互信息为何使用connect-flash？
+ mongoDB通过_id,需ObjectId = require('mongodb').ObjectId;再_id = ObjectId(id),才能使用
+ collection.{insert,find(one),update,remove}，还有其它API
+ connect-flash，morgan的使用

利用这段时间工作不忙的机会，把技术进行整理和分享：  
### 技术栈 
``` 
{
    framework: express V4.x,  
    mongooDB: mongoose,  
    template: art-template,  
    access-control: express-session + mongoose + connect-mongo,
    logger: morgan,  
    router: customFunction
}

```
### 项目结构
功能：  
后台管理页面



