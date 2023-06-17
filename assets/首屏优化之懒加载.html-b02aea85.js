import{_ as e,r as c,o,c as l,f as u,a as n,b as t,d as p,e as s}from"./app-00a966d3.js";const i={},k=s(`<h1 id="首屏优化之懒加载" tabindex="-1"><a class="header-anchor" href="#首屏优化之懒加载" aria-hidden="true">#</a> 首屏优化之懒加载</h1><p>懒加载(Lazy-Load)。它是针对图片加载时机的优化：在一些图片量比较大的网站（比如电商网站首页，或者团购网站、小游戏首页等），如果我们尝试在用户打开页面的时候，就把所有的图片资源加载完毕，那么很可能会造成白屏、卡顿等现象，因为图片真的太多了，一口气处理这么多任务，浏览器做不到啊！</p><h2 id="目的" tabindex="-1"><a class="header-anchor" href="#目的" aria-hidden="true">#</a> 目的</h2><p><strong>懒加载</strong>的目的是当页面的图片进入到用户的可视范围之内在加载图片的一种优化方式。</p><p>可以增加首屏加载的速度，毕竟，用户点开页面的瞬间，呈现给他的只是首屏，我们只要把首屏的资源图片加载处理就可以了，至于下面的图片，当用户下滑当当前位置的时候，在加载出来也是没问题的，对于性能压力也小了，用户体验也没有变差。</p><h2 id="原理" tabindex="-1"><a class="header-anchor" href="#原理" aria-hidden="true">#</a> 原理</h2><p>在页面初始化的时候， <code>&lt;img&gt;</code>图片的<code>src</code>实际上是放在<code>data-src</code>属性上的，当元素处于可视范围内的时候，就把<code>data-src</code>赋值给<code>src</code>属性，完成图片加载。</p><div class="language-html line-numbers-mode" data-ext="html"><pre class="language-html"><code>// 在一开始加载的时候
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>img</span> <span class="token attr-name">data-src</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>http://xx.com/xx.png<span class="token punctuation">&quot;</span></span> <span class="token attr-name">src</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span><span class="token punctuation">&quot;</span></span> <span class="token punctuation">/&gt;</span></span>

// 在进入可视范围内时
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>img</span> <span class="token attr-name">data-src</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>http://xx.com/xx.png<span class="token punctuation">&quot;</span></span> <span class="token attr-name">src</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>http://xx.com/xx.png<span class="token punctuation">&quot;</span></span> <span class="token punctuation">/&gt;</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>使用背景图来实现，原理也是一样的，把<code>background-image</code>放在，在可视范围时，就把<code>data-src</code>赋值给<code>src</code>属性，完成图片加载。</p><div class="language-html line-numbers-mode" data-ext="html"><pre class="language-html"><code>// 在一开始加载的时候
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span>
  <span class="token attr-name">data-src</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>http://xx.com/xx.png<span class="token punctuation">&quot;</span></span>
  <span class="token special-attr"><span class="token attr-name">style</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span><span class="token value css language-css"><span class="token property">background-image</span><span class="token punctuation">:</span> none<span class="token punctuation">;</span><span class="token property">background-size</span><span class="token punctuation">:</span> cover<span class="token punctuation">;</span></span><span class="token punctuation">&quot;</span></span></span>
<span class="token punctuation">&gt;</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">&gt;</span></span>

// 在进入可视范围内时
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span>
  <span class="token attr-name">data-src</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>http://xx.com/xx.png<span class="token punctuation">&quot;</span></span>
  <span class="token special-attr"><span class="token attr-name">style</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span><span class="token value css language-css"><span class="token property">background-image</span><span class="token punctuation">:</span> <span class="token url"><span class="token function">url</span><span class="token punctuation">(</span>http://xx.com/xx.png<span class="token punctuation">)</span></span><span class="token punctuation">;</span><span class="token property">background-size</span><span class="token punctuation">:</span> cover<span class="token punctuation">;</span></span><span class="token punctuation">&quot;</span></span></span>
<span class="token punctuation">&gt;</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">&gt;</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="实现一个懒加载" tabindex="-1"><a class="header-anchor" href="#实现一个懒加载" aria-hidden="true">#</a> 实现一个懒加载</h2><p>基于上面的实现思路，自己实现一个懒加载。</p><p>新建一个 <code>index.html</code> 中，为这些图片预置 <code>img</code> 标签：</p><div class="language-html line-numbers-mode" data-ext="html"><pre class="language-html"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>head</span><span class="token punctuation">&gt;</span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>style</span><span class="token punctuation">&gt;</span></span><span class="token style"><span class="token language-css">
    <span class="token selector">.img</span> <span class="token punctuation">{</span>
      <span class="token property">width</span><span class="token punctuation">:</span> 200px<span class="token punctuation">;</span>
      <span class="token property">height</span><span class="token punctuation">:</span> 200px<span class="token punctuation">;</span>
      <span class="token property">background-color</span><span class="token punctuation">:</span> gray<span class="token punctuation">;</span>
      <span class="token property">margin-bottom</span><span class="token punctuation">:</span> 20px<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token selector">.pic</span> <span class="token punctuation">{</span>
      <span class="token property">width</span><span class="token punctuation">:</span> 100%<span class="token punctuation">;</span>
      <span class="token property">height</span><span class="token punctuation">:</span> 100%<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
  </span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>style</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>head</span><span class="token punctuation">&gt;</span></span>
<span class="token comment">&lt;!-- 图片来自网络，侵删。 --&gt;</span>

<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>body</span><span class="token punctuation">&gt;</span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>container<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>img<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>
      <span class="token comment">&lt;!-- 注意我们并没有为它引入真实的src --&gt;</span>
      <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>img</span>
        <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>pic<span class="token punctuation">&quot;</span></span>
        <span class="token attr-name">alt</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>加载中<span class="token punctuation">&quot;</span></span>
        <span class="token attr-name">data-src</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>https://tse1-mm.cn.bing.net/th/id/OIP.8OrEFn_rKe82kqAWFjTuMwHaEo?pid=Api&amp;rs=1<span class="token punctuation">&quot;</span></span>
      <span class="token punctuation">/&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>img<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>
      <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>img</span>
        <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>pic<span class="token punctuation">&quot;</span></span>
        <span class="token attr-name">alt</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>加载中<span class="token punctuation">&quot;</span></span>
        <span class="token attr-name">data-src</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>https://ssl.tzoo-img.com/images/tzoo.94911.0.910013.seoul-nami.jpg?width=1080<span class="token punctuation">&quot;</span></span>
      <span class="token punctuation">/&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>img<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>
      <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>img</span>
        <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>pic<span class="token punctuation">&quot;</span></span>
        <span class="token attr-name">alt</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>加载中<span class="token punctuation">&quot;</span></span>
        <span class="token attr-name">data-src</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>https://tse4-mm.cn.bing.net/th/id/OIP.ZitgAuABnwkrGn4lid2ZmQHaEK?pid=Api&amp;rs=1<span class="token punctuation">&quot;</span></span>
      <span class="token punctuation">/&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>img<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>
      <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>img</span>
        <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>pic<span class="token punctuation">&quot;</span></span>
        <span class="token attr-name">alt</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>加载中<span class="token punctuation">&quot;</span></span>
        <span class="token attr-name">data-src</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>http://pic34.photophoto.cn/20150315/0034034862056002_b.jpg<span class="token punctuation">&quot;</span></span>
      <span class="token punctuation">/&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>img<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>
      <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>img</span>
        <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>pic<span class="token punctuation">&quot;</span></span>
        <span class="token attr-name">alt</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>加载中<span class="token punctuation">&quot;</span></span>
        <span class="token attr-name">data-src</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>http://img.mp.sohu.com/upload/20170724/32d4409f34194b029ed287abf1c99b70_th.png<span class="token punctuation">&quot;</span></span>
      <span class="token punctuation">/&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>img<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>
      <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>img</span>
        <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>pic<span class="token punctuation">&quot;</span></span>
        <span class="token attr-name">alt</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>加载中<span class="token punctuation">&quot;</span></span>
        <span class="token attr-name">data-src</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>https://pic6.wed114.cn/20180829/2018082910075991913520.jpg<span class="token punctuation">&quot;</span></span>
      <span class="token punctuation">/&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>img<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>
      <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>img</span>
        <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>pic<span class="token punctuation">&quot;</span></span>
        <span class="token attr-name">alt</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>加载中<span class="token punctuation">&quot;</span></span>
        <span class="token attr-name">data-src</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>https://tse4-mm.cn.bing.net/th/id/OIP.PZdPKj3sXEX2jLrepx3MUwHaEo?pid=Api&amp;rs=1<span class="token punctuation">&quot;</span></span>
      <span class="token punctuation">/&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>img<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>
      <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>img</span>
        <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>pic<span class="token punctuation">&quot;</span></span>
        <span class="token attr-name">alt</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>加载中<span class="token punctuation">&quot;</span></span>
        <span class="token attr-name">data-src</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>https://pic6.wed114.cn/20180829/2018082910075831439349.jpg<span class="token punctuation">&quot;</span></span>
      <span class="token punctuation">/&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>img<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>
      <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>img</span>
        <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>pic<span class="token punctuation">&quot;</span></span>
        <span class="token attr-name">alt</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>加载中<span class="token punctuation">&quot;</span></span>
        <span class="token attr-name">data-src</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>https://pic6.wed114.cn/20180829/2018082910075468043336.jpg<span class="token punctuation">&quot;</span></span>
      <span class="token punctuation">/&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>img<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>
      <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>img</span>
        <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>pic<span class="token punctuation">&quot;</span></span>
        <span class="token attr-name">alt</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>加载中<span class="token punctuation">&quot;</span></span>
        <span class="token attr-name">data-src</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>https://tse2-mm.cn.bing.net/th/id/OIP.CRYz5Bv4vylsMh83G4CsLgHaFj?pid=Api&amp;rs=1<span class="token punctuation">&quot;</span></span>
      <span class="token punctuation">/&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">&gt;</span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>body</span><span class="token punctuation">&gt;</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在懒加载的实现中，有两个关键的数值：一个是<strong>当前可视区域的高度</strong>，另一个是<strong>元素距离可视区域顶部的高度</strong>。</p><p><strong>当前可视区域的高度</strong>，在现代浏览器及 IE9 以上的浏览器中，可以使用<code>window.innerHeight</code>属性获取，在低版本的 IE 中使用<code>document.documentElment.clientHeight</code> 获取，这里我们兼容两种情况：</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">const</span> viewHeight <span class="token operator">=</span> window<span class="token punctuation">.</span>innerHeight <span class="token operator">||</span> document<span class="token punctuation">.</span>documentElement<span class="token punctuation">.</span>clientHeight<span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>而<strong>元素距离可视区域顶部的高度</strong>，这里我们用 <code>getBoundingClientRect()</code>方法来获取返回元素的大小和相对于尺寸的位置，对于该 API，MDN 的解释是：</p><blockquote><p>Element.getBoundingClientRect() 方法返回元素的大小及其相对于视口的位置。</p></blockquote><p>返回的属性中有一个相对于可视区域顶部的高度也就是<code>top</code>属性，刚好就是我们需要的元素距离顶部的距离。</p><p>这样，两个属性就都得到了。</p><p>我们利用<strong>当前可视区域的高度</strong>大于等于<strong>元素距离可视区域顶部的高度</strong>就可以确定，该元素是否已经进入到了可视范围：</p>`,22),r=s(`<div class="language-html line-numbers-mode" data-ext="html"><pre class="language-html"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span><span class="token punctuation">&gt;</span></span><span class="token script"><span class="token language-javascript">
  <span class="token comment">// 获取所有的图片标签</span>
  <span class="token keyword">const</span> imgs <span class="token operator">=</span> document<span class="token punctuation">.</span><span class="token function">getElementsByTagName</span><span class="token punctuation">(</span><span class="token string">&quot;img&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token comment">// 获取可视区域的高度</span>
  <span class="token keyword">const</span> viewHeight <span class="token operator">=</span>
    window<span class="token punctuation">.</span>innerHeight <span class="token operator">||</span> document<span class="token punctuation">.</span>documentElement<span class="token punctuation">.</span>clientHeight<span class="token punctuation">;</span>
  <span class="token comment">// num用于统计当前显示到了哪一张图片，避免每次都从第一张图片开始检查是否露出</span>
  <span class="token keyword">let</span> num <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>

  <span class="token keyword">function</span> <span class="token function">lazyload</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&quot;滚动...&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">let</span> i <span class="token operator">=</span> num<span class="token punctuation">;</span> i <span class="token operator">&lt;</span> imgs<span class="token punctuation">.</span>length<span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token comment">// 用可视区域高度减去元素顶部距离可视区域顶部的高度</span>
      <span class="token keyword">let</span> distance <span class="token operator">=</span> viewHeight <span class="token operator">-</span> imgs<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">.</span><span class="token function">getBoundingClientRect</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span>top<span class="token punctuation">;</span>
      <span class="token comment">// 如果可视区域高度大于等于元素顶部距离可视区域顶部的高度，说明元素露出</span>
      <span class="token keyword">if</span> <span class="token punctuation">(</span>distance <span class="token operator">&gt;=</span> <span class="token number">0</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">// 给元素写入真实的src，展示图片</span>
        imgs<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">.</span>src <span class="token operator">=</span> imgs<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">.</span><span class="token function">getAttribute</span><span class="token punctuation">(</span><span class="token string">&quot;data-src&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">// 前i张图片已经加载完毕，下次从第i+1张开始检查是否露出</span>
        num <span class="token operator">=</span> i <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">;</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>

  <span class="token comment">// 防抖函数</span>
  <span class="token keyword">function</span> <span class="token function">debounce</span><span class="token punctuation">(</span><span class="token parameter">fn<span class="token punctuation">,</span> delay <span class="token operator">=</span> <span class="token number">500</span></span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">let</span> timer <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
    <span class="token keyword">return</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token parameter"><span class="token operator">...</span>args</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">if</span> <span class="token punctuation">(</span>timer<span class="token punctuation">)</span> <span class="token function">clearTimeout</span><span class="token punctuation">(</span>timer<span class="token punctuation">)</span><span class="token punctuation">;</span>
      timer <span class="token operator">=</span> <span class="token function">setTimeout</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
        <span class="token function">fn</span><span class="token punctuation">.</span><span class="token function">call</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">,</span> args<span class="token punctuation">)</span><span class="token punctuation">;</span>
      <span class="token punctuation">}</span><span class="token punctuation">,</span> delay<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>

  <span class="token comment">// 是的页面初始化是加载首屏图片</span>
  window<span class="token punctuation">.</span>onload <span class="token operator">=</span> lazyload<span class="token punctuation">;</span>
  <span class="token comment">// 监听Scroll事件，为了防止频繁调用，使用防抖函数优化一下</span>
  window<span class="token punctuation">.</span><span class="token function">addEventListener</span><span class="token punctuation">(</span><span class="token string">&quot;scroll&quot;</span><span class="token punctuation">,</span> <span class="token function">debounce</span><span class="token punctuation">(</span>lazyload<span class="token punctuation">,</span> <span class="token number">600</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token boolean">false</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">&gt;</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,1),d={href:"//jsrun.net/es3Kp/embedded/all/light",target:"_blank",rel:"noopener noreferrer"},v=n("iframe",{width:"100%",height:"300",src:"//jsrun.net/es3Kp/embedded/all/light",allowfullscreen:"allowfullscreen",frameborder:"0"},null,-1),m=s('<h2 id="小结" tabindex="-1"><a class="header-anchor" href="#小结" aria-hidden="true">#</a> 小结</h2><ul><li>先收集到页面中所有的<code>img</code>(也可以用<code>class</code>)。</li><li>获取到视图高度，计算显示的<code>img</code>，避免重复赋值<code>src</code>。</li><li>当滑动向下滑动鼠标，会触发<code>onScroll</code>事件(防抖)，然后触发计算是否赋值<code>src</code>。</li></ul><h2 id="参考资料" tabindex="-1"><a class="header-anchor" href="#参考资料" aria-hidden="true">#</a> 参考资料</h2>',3),g={href:"https://juejin.im/book/6844733750048210957/section/6844733750031417352",target:"_blank",rel:"noopener noreferrer"};function b(q,h){const a=c("ExternalLinkIcon");return o(),l("div",null,[k,u(" ![](/images/alazy-load.png) "),r,n("p",null,[n("strong",null,[n("a",d,[t("图片懒加载-线上预览"),p(a)])])]),v,m,n("ul",null,[n("li",null,[n("a",g,[t("前端性能优化原理与实践小册"),p(a)])])])])}const x=e(i,[["render",b],["__file","首屏优化之懒加载.html.vue"]]);export{x as default};
