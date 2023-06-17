import{_ as r,r as n,o as c,c as i,a as e,b as o,d as t,e as l}from"./app-00a966d3.js";const s={},d=l('<h1 id="aop-面向切面编程" tabindex="-1"><a class="header-anchor" href="#aop-面向切面编程" aria-hidden="true">#</a> AOP 面向切面编程</h1><h2 id="什么是aop" tabindex="-1"><a class="header-anchor" href="#什么是aop" aria-hidden="true">#</a> 什么是AOP?</h2><p>什么是AOP？中文意思是面向切面编程，听起来感觉很模糊。先举个生产的例子。</p><ul><li>农场的水果包装流水线一开始只有 <code>采摘 - 清洗 - 贴标签</code></li></ul><p><img src="https://user-images.githubusercontent.com/8216630/42586566-0014a912-856b-11e8-8e96-6aa54db8f60c.png" alt="example"></p><ul><li>为了提高销量，想加上两道工序 <code>分类</code> 和 <code>包装</code> 但又不能干扰原有的流程，同时如果没增加收益可以随时撤销新增工序。</li></ul><p><img src="https://user-images.githubusercontent.com/8216630/42586569-0113afe8-856b-11e8-9580-4238053ddc60.png" alt="example"></p><ul><li>最后在流水线的中的空隙插上两个工人去处理，形成<code>采摘 - 分类 - 清洗 - 包装 - 贴标签</code> 的新流程，而且工人可以随时撤回。</li></ul><p>回到什么是AOP？就是在现有代码程序中，在程序生命周期或者横向流程中 <code>加入/减去</code> 一个或多个功能，不影响原有功能。</p><h2 id="koa-js-的切面" tabindex="-1"><a class="header-anchor" href="#koa-js-的切面" aria-hidden="true">#</a> Koa.js 的切面</h2><ul><li>切面由中间件机制实现</li><li>一个中间件一般有两个切面</li><li>遵循先进后出的切面执行顺序，类似入栈出栈的顺序</li></ul><p><img src="https://user-images.githubusercontent.com/8216630/42587672-084c4402-856e-11e8-8fb4-dde31009baad.png" alt="example"></p><h2 id="参考文章" tabindex="-1"><a class="header-anchor" href="#参考文章" aria-hidden="true">#</a> 参考文章</h2>',13),h={href:"http://know.cujojs.com/tutorials/aop/intro-to-aspect-oriented-programming",target:"_blank",rel:"noopener noreferrer"},p={href:"http://bubkoo.com/2014/05/08/intro-to-aspect-oriented-programming/",target:"_blank",rel:"noopener noreferrer"},u={href:"http://www.alloyteam.com/2013/08/yong-aop-gai-shan-javascript-dai-ma/",target:"_blank",rel:"noopener noreferrer"};function _(m,g){const a=n("ExternalLinkIcon");return c(),i("div",null,[d,e("ul",null,[e("li",null,[e("a",h,[o("Intro to Aspect Oriented Programming"),t(a)])]),e("li",null,[e("a",p,[o("面向切面编程（AOP）简介"),t(a)])]),e("li",null,[e("a",u,[o("用AOP改善javascript代码"),t(a)])])])])}const b=r(s,[["render",_],["__file","AOP 面向切面编程.html.vue"]]);export{b as default};
