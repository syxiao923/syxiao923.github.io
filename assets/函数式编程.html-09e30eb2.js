import{_ as e,r as o,o as c,c as l,a as n,b as s,d as p,e as t}from"./app-00a966d3.js";const u={},i=t(`<h1 id="函数式编程" tabindex="-1"><a class="header-anchor" href="#函数式编程" aria-hidden="true">#</a> 函数式编程</h1><h2 id="什么是函数式编程" tabindex="-1"><a class="header-anchor" href="#什么是函数式编程" aria-hidden="true">#</a> 什么是函数式编程</h2><p><strong>函数式编程是以调用函数为主的软件开发风格</strong></p><blockquote><p>函数式编程会改变我们处理日常工作时的思路，让我们使用函数来<strong>抽象</strong>作用在数据上的控制流于操作，从而在系统中消除副作用并减少对状态的改变。</p></blockquote><p>最关键的是<strong>抽象</strong>作用，其实编程功底最后比拼的就是抽象能力。</p><h2 id="函数式编程和命令式编程" tabindex="-1"><a class="header-anchor" href="#函数式编程和命令式编程" aria-hidden="true">#</a> 函数式编程和命令式编程</h2><p>函数式编程和命令式编程二者都属于编程范式，最大的不同在于：</p><p><strong>命令式编程关心解决问题的步骤，函数式编程关心数据的映射</strong></p><p>所谓命令式编程，就是你要做什么事情，把这个步骤描绘出来，然后交给机器去做。</p><p>比如一个求和函数，我们通常这样写：</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">let</span> nums<span class="token operator">=</span><span class="token punctuation">[</span><span class="token number">49</span><span class="token punctuation">,</span><span class="token number">50</span><span class="token punctuation">,</span><span class="token number">43</span><span class="token punctuation">,</span><span class="token number">55</span><span class="token punctuation">,</span><span class="token number">64</span><span class="token punctuation">]</span><span class="token punctuation">;</span>

<span class="token keyword">let</span> sum<span class="token operator">=</span><span class="token number">0</span><span class="token punctuation">;</span>
<span class="token keyword">for</span><span class="token punctuation">(</span><span class="token keyword">let</span> i<span class="token operator">=</span><span class="token number">0</span><span class="token punctuation">;</span>i<span class="token operator">&lt;</span>nums<span class="token punctuation">.</span>length<span class="token punctuation">;</span>i<span class="token operator">++</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
    sum<span class="token operator">+=</span>nums<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>sum<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如果改为函数式编程则：</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code>console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token number">49</span><span class="token punctuation">,</span><span class="token number">50</span><span class="token punctuation">,</span><span class="token number">43</span><span class="token punctuation">,</span><span class="token number">55</span><span class="token punctuation">,</span><span class="token number">64</span><span class="token punctuation">]</span><span class="token punctuation">.</span><span class="token function">reduce</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">a<span class="token punctuation">,</span>b</span><span class="token punctuation">)</span><span class="token operator">=&gt;</span>a<span class="token operator">+</span>b<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div>`,13),r={href:"https://baike.baidu.com/item/%E5%87%BD%E6%95%B0%E5%89%AF%E4%BD%9C%E7%94%A8/22723425?fr=aladdin",target:"_blank",rel:"noopener noreferrer"},k=t(`<p>什么是副作用，举例：</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">let</span> sum <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
<span class="token keyword">function</span> <span class="token function">add</span><span class="token punctuation">(</span><span class="token parameter">nums</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
    <span class="token keyword">for</span><span class="token punctuation">(</span><span class="token keyword">let</span> i<span class="token operator">=</span><span class="token number">0</span><span class="token punctuation">;</span>i<span class="token operator">&lt;</span>nums<span class="token punctuation">.</span>length<span class="token punctuation">;</span>i<span class="token operator">++</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
        sum<span class="token operator">+=</span>nums<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">return</span> sum<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token function">add</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">,</span><span class="token number">2</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token comment">// 3</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token function">add</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token number">2</span><span class="token punctuation">,</span><span class="token number">4</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token comment">// 9</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>副作用</strong> (Side Effect)是指函数或者表达式的行为依赖于外部世界。具体可参照Wiki上的定义，副作用是指</p><ol><li>函数或者表达式修改了它的SCOPE之外的状态</li><li>函数或者表达式除了返回语句外还与外部世界或者它所调用的函数有明显的交互行为</li></ol><h2 id="纯函数" tabindex="-1"><a class="header-anchor" href="#纯函数" aria-hidden="true">#</a> 纯函数</h2><p>所谓纯函数，就是<strong>对于相同的输入，永远都会给出相同的输出，没有任何副作用，也不依赖外部环境的状态。</strong></p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">let</span> arr<span class="token operator">=</span><span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">,</span><span class="token number">2</span><span class="token punctuation">,</span><span class="token number">3</span><span class="token punctuation">,</span><span class="token number">4</span><span class="token punctuation">,</span><span class="token number">5</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
arr<span class="token punctuation">.</span><span class="token function">slice</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">,</span><span class="token number">2</span><span class="token punctuation">)</span><span class="token punctuation">;</span><span class="token comment">//这是纯函数，因为只要参数一样，输出总一样</span>
arr<span class="token punctuation">.</span><span class="token function">slice</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">,</span><span class="token number">2</span><span class="token punctuation">)</span><span class="token punctuation">;</span><span class="token comment">//输出结果与上一句相同</span>
<span class="token comment">// ----</span>
arr<span class="token punctuation">.</span><span class="token function">splice</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">,</span><span class="token number">2</span><span class="token punctuation">)</span><span class="token punctuation">;</span><span class="token comment">//非纯函数，参数一样，但是输出变化了</span>
arr<span class="token punctuation">.</span><span class="token function">splice</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">,</span><span class="token number">2</span><span class="token punctuation">)</span><span class="token punctuation">;</span><span class="token comment">//输出变化了，与上一句结果不同</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>纯函数的输入和输出是确定的，不会有副作用，是可信的。</p><h2 id="高级函数" tabindex="-1"><a class="header-anchor" href="#高级函数" aria-hidden="true">#</a> 高级函数</h2><p>众所周知，函数在JS中是一等公民，即可以当作参数被传递、也可以当作返回值返回。</p><p>高阶函数是对其他函数进行操作的函数，操作可以是将它们作为参数，或者是返回它们。 简单来说，<strong>高阶函数是一个接收函数作为参数或将函数作为输出返回的函数</strong>。例如，Array.prototype.map，Array.prototype.filter 和 Array.prototype.reduce 是语言中内置的一些高阶函数。</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code>console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">,</span><span class="token number">2</span><span class="token punctuation">,</span><span class="token number">3</span><span class="token punctuation">]</span><span class="token punctuation">.</span><span class="token function">map</span><span class="token punctuation">(</span><span class="token parameter">e</span><span class="token operator">=&gt;</span>e <span class="token operator">*</span> <span class="token number">2</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token comment">// [2,4,6]</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>简而言之，高阶函数是一个可以接收函数作为参数，甚至返回一个函数的函数。 它就像常规函数一样，只是多了接收和返回其他函数的附加能力，即参数和输出。</p><h2 id="函数柯里化" tabindex="-1"><a class="header-anchor" href="#函数柯里化" aria-hidden="true">#</a> 函数柯里化</h2><p>先来了解柯里化的定义：柯里化（Currying）是一种技术，它把接受m个参数的函数变成接受n个参数的函数，并且该函数返回一个新函数，这个新函数接受余下的参数...如此循环，直到最后的返回的结果。</p><p>看一个例子：</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token comment">// 普通的add函数</span>
<span class="token keyword">function</span> <span class="token function">add</span><span class="token punctuation">(</span><span class="token parameter">x<span class="token punctuation">,</span> y</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> x <span class="token operator">+</span> y
<span class="token punctuation">}</span>

<span class="token comment">// Currying后</span>
<span class="token keyword">function</span> <span class="token function">curryingAdd</span><span class="token punctuation">(</span><span class="token parameter">x</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">y</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> x <span class="token operator">+</span> y
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token function">add</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">)</span>           <span class="token comment">// 3</span>
<span class="token function">curryingAdd</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">)</span>   <span class="token comment">// 3</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>实际上就是把add函数的x，y两个参数变成了先用一个函数接收x然后返回一个函数去处理y参数。 那么，柯里化额外的封装了一层有什么具体的好处呢？</p><p>好处主要有三点</p><ul><li>复用参数：每个参数可以多次复用</li><li>延迟运行：用闭包把传入参数保存起来，当传入参数的说了足够执行函数时，在执行函数</li><li>动态创建函数：参数不够时会返回接受剩下参数的函数</li></ul><p>一道经典面试题：</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token comment">// 实现一个add方法，使计算结果能够满足如下预期：</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token function">add</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">,</span><span class="token number">2</span><span class="token punctuation">,</span><span class="token number">3</span><span class="token punctuation">,</span><span class="token number">4</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token comment">// 10</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token function">add</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">)</span><span class="token punctuation">(</span><span class="token number">3</span><span class="token punctuation">)</span><span class="token punctuation">(</span><span class="token number">4</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token comment">// 10</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token function">add</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">,</span><span class="token number">2</span><span class="token punctuation">)</span><span class="token punctuation">(</span><span class="token number">3</span><span class="token punctuation">,</span><span class="token number">4</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token comment">// 10</span>

<span class="token comment">// --add 函数--</span>
<span class="token keyword">const</span> <span class="token function-variable function">sum</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token parameter">a<span class="token punctuation">,</span> b<span class="token punctuation">,</span> c<span class="token punctuation">,</span> d</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> a <span class="token operator">+</span> b <span class="token operator">+</span> c <span class="token operator">+</span> d<span class="token punctuation">;</span>
<span class="token keyword">const</span> add <span class="token operator">=</span> <span class="token function">curry</span><span class="token punctuation">(</span>sum<span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// --curry 实现--</span>
<span class="token keyword">function</span> <span class="token function">curry2</span><span class="token punctuation">(</span><span class="token parameter">fn</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
    <span class="token keyword">function</span> <span class="token function">judge</span><span class="token punctuation">(</span><span class="token parameter"><span class="token operator">...</span>args</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token comment">// console.log(...args)</span>
        <span class="token keyword">if</span><span class="token punctuation">(</span>args<span class="token punctuation">.</span>length <span class="token operator">===</span> fn<span class="token punctuation">.</span>length<span class="token punctuation">)</span><span class="token punctuation">{</span>
            <span class="token keyword">return</span> <span class="token function">fn</span><span class="token punctuation">(</span><span class="token operator">...</span>args<span class="token punctuation">)</span>
        <span class="token punctuation">}</span><span class="token keyword">else</span><span class="token punctuation">{</span>
           <span class="token keyword">return</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token parameter"><span class="token operator">...</span>arg</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
               <span class="token keyword">return</span> <span class="token function">judge</span><span class="token punctuation">(</span><span class="token operator">...</span>args<span class="token punctuation">,</span> <span class="token operator">...</span>arg<span class="token punctuation">)</span>
           <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">return</span> judge
<span class="token punctuation">}</span>
<span class="token comment">// ---curry 简单实现---</span>
<span class="token keyword">const</span> <span class="token function-variable function">curry</span> <span class="token operator">=</span> <span class="token parameter">fn</span> <span class="token operator">=&gt;</span>
  <span class="token punctuation">(</span><span class="token function-variable function">judge</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token parameter"><span class="token operator">...</span>args</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span>
    args<span class="token punctuation">.</span>length <span class="token operator">===</span> fn<span class="token punctuation">.</span>length
      <span class="token operator">?</span> <span class="token function">fn</span><span class="token punctuation">(</span><span class="token operator">...</span>args<span class="token punctuation">)</span>
      <span class="token operator">:</span> <span class="token punctuation">(</span><span class="token parameter"><span class="token operator">...</span>arg</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token function">judge</span><span class="token punctuation">(</span><span class="token operator">...</span>args<span class="token punctuation">,</span> <span class="token operator">...</span>arg<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,22),d={href:"https://coffe1891.gitbook.io/frontend-hard-mode-interview/1/1.3.2",target:"_blank",rel:"noopener noreferrer"},m={href:"https://juejin.cn/post/6844903882208837645",target:"_blank",rel:"noopener noreferrer"},v={href:"https://github.com/mqyqingfeng/Blog/issues/42",target:"_blank",rel:"noopener noreferrer"},b=t('<h2 id="函数式编程的好处" tabindex="-1"><a class="header-anchor" href="#函数式编程的好处" aria-hidden="true">#</a> 函数式编程的好处</h2><p>其实前面已经穿插的讲了很多函数式编程的好处，本篇最后再总体归纳一下。</p><p>首先，最直观的角度来说，函数式风格的代码可以写得更简洁，大大减少了程序员的键盘敲击输入量。</p><p>其次，函数式的代码是“对映射的描述”，它不仅可以描述数组这样的数据结构之间的对应关系，任何能在计算机中体现的东西之间的对应关系都可以描述——比如函数和函数之间的映射；比如外部操作到 GUI 之间的映射（就是现在前端热炒的 FRP——响应式编程的一种范式）。它的抽象程度可以很高，这就意味着函数式的代码可以更方便的复用。</p><p>再次，函数式编程将细节封装到函数内部隐藏起来，不过多的依赖外部环境，让程序员专注业务的实现，优化的时候，可以专注优化函数内部实现即可，甚至无需改动外部代码，可以让代码更容易维护。</p><p>另外，因为在函数式编程里，函数是纯函数，没有副作用，不改变函数之外的变量，不会造成死锁，因此是多线程安全的，所以函数式编程可以方便地进行并行计算。这个特性对于充分利用多核CPU尤其重要。然后，函数式编程没有副作用，只要保证接口不变，内部实现是外部无关的。所以，可以在运行状态下直接升级代码，不需要重启，也不需要停机。</p><p>还有，可以惰性求值、缓存计算以加快多次执行的速度。</p><p>最后，将代码写成这种样子可以方便用数学思维进行科学研究。</p><p>以上具体的好处，将在后续文章中逐一演示。</p><h2 id="参考" tabindex="-1"><a class="header-anchor" href="#参考" aria-hidden="true">#</a> 参考</h2>',10),g={href:"https://coffe1891.gitbook.io/frontend-hard-mode-interview/5/5.2.1",target:"_blank",rel:"noopener noreferrer"};function f(h,y){const a=o("ExternalLinkIcon");return c(),l("div",null,[i,n("p",null,[s("这样就可以把程序员的注意力从从程序的步骤控制、变量的维护等繁琐的事情中解放出来，去专注于要实现什么，而且中间没有"),n("a",r,[s("副作用"),p(a)]),s("。")]),k,n("ul",null,[n("li",null,[s("参考 "),n("ul",null,[n("li",null,[n("a",d,[s("JS函数柯里化"),p(a)])]),n("li",null,[n("a",m,[s("彻底弄明白JS函数柯里化"),p(a)])]),n("li",null,[n("a",v,[s("牙羽的博客"),p(a)])])])])]),b,n("ul",null,[n("li",null,[n("a",g,[s("编程范式-函数式编程"),p(a)])])])])}const w=e(u,[["render",f],["__file","函数式编程.html.vue"]]);export{w as default};
