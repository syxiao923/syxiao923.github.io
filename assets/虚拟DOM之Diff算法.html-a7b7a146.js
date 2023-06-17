import{_ as e,r as o,o as c,c as l,a as n,b as s,d as t,e as p}from"./app-00a966d3.js";const i={},u=p(`<h1 id="虚拟-dom-之-diff-算法" tabindex="-1"><a class="header-anchor" href="#虚拟-dom-之-diff-算法" aria-hidden="true">#</a> 虚拟 DOM 之 Diff 算法</h1><p>上一节讲了<a href="./%E4%B8%80%E6%AC%A1%E6%90%9E%E6%87%82-Vue%E4%B9%8B%E8%99%9A%E6%8B%9FDOM">虚拟 DOM</a>，但是虚拟 DOM 是如何更新的？新旧节点的 path 又是如何进行的？这都需要一个 Diff 来完成。</p><p>给定任意两颗数，采用<strong>先序深度优先遍历</strong>的算法，找到最少的转换步骤。</p><p>DOM-diff 比较两个虚拟 DOM 的区别，也就是在比较两个对象的区别。</p><p>作用：<strong>根据两个虚拟 DOM 对象创建出补丁，然后打补丁、更新 DOM。</strong></p><h2 id="diff-逻辑" tabindex="-1"><a class="header-anchor" href="#diff-逻辑" aria-hidden="true">#</a> Diff 逻辑</h2><p>diff 的作用也了解了，他就是通过对比新老 Node，从而得到最后的 Patch</p><p>接受两个参数 newNode 和 oldNode</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token comment">// diff.js</span>
<span class="token keyword">function</span> <span class="token function">diff</span><span class="token punctuation">(</span><span class="token parameter">odlTree<span class="token punctuation">,</span> newTree</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token comment">// 声明变量 patches 用来存放补丁的对象</span>
  <span class="token keyword">let</span> patches <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">;</span>
  <span class="token comment">// 第一次比较的 应该是树的第0个索引</span>
  <span class="token keyword">let</span> index <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
  <span class="token comment">// 递归树</span>
  <span class="token function">walk</span><span class="token punctuation">(</span>odlTree<span class="token punctuation">,</span> newTree<span class="token punctuation">,</span> index<span class="token punctuation">,</span> patches<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token keyword">return</span> patches<span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">function</span> <span class="token function">walk</span><span class="token punctuation">(</span><span class="token parameter">oldNode<span class="token punctuation">,</span> newNode<span class="token punctuation">,</span> index<span class="token punctuation">,</span> patches</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token comment">// 每一个元素都有一个补丁</span>
  <span class="token keyword">let</span> current <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">;</span>

  <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>newNode<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// ----规则 1 新节点不存在----</span>
    current<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
      <span class="token literal-property property">type</span><span class="token operator">:</span> <span class="token string">&quot;REMOVE&quot;</span><span class="token punctuation">,</span>
      index<span class="token punctuation">,</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token function">isString</span><span class="token punctuation">(</span>oldNode<span class="token punctuation">)</span> <span class="token operator">&amp;&amp;</span> <span class="token function">isString</span><span class="token punctuation">(</span>newNode<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// 是文本节点</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>oldNode <span class="token operator">!==</span> newNode<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token comment">// 文本发生了变化</span>
      current<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
        <span class="token literal-property property">type</span><span class="token operator">:</span> <span class="token string">&quot;TEXT&quot;</span><span class="token punctuation">,</span>
        <span class="token literal-property property">text</span><span class="token operator">:</span> newNode<span class="token punctuation">,</span>
      <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token keyword">if</span> <span class="token punctuation">(</span>oldNode<span class="token punctuation">.</span>type <span class="token operator">===</span> newNode<span class="token punctuation">.</span>type<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// 比较属性变化</span>
    <span class="token keyword">let</span> attr <span class="token operator">=</span> <span class="token function">diffAttr</span><span class="token punctuation">(</span>oldNode<span class="token punctuation">.</span>props<span class="token punctuation">,</span> newNode<span class="token punctuation">.</span>props<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>Object<span class="token punctuation">.</span>keys<span class="token punctuation">[</span>attr<span class="token punctuation">]</span><span class="token punctuation">.</span>length <span class="token operator">&gt;</span> <span class="token number">0</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token comment">// 有更新的属性</span>
      current<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
        <span class="token literal-property property">type</span><span class="token operator">:</span> <span class="token string">&quot;ATTR&quot;</span><span class="token punctuation">,</span>
        attr<span class="token punctuation">,</span>
      <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token comment">// 如果有子节点，递归子节点</span>
    <span class="token function">diffChildren</span><span class="token punctuation">(</span>oldNode<span class="token punctuation">.</span>children<span class="token punctuation">,</span> newNode<span class="token punctuation">.</span>children<span class="token punctuation">,</span> patches<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
    <span class="token comment">// 都没有 说明节点被替换了</span>
    current<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
      <span class="token literal-property property">type</span><span class="token operator">:</span> <span class="token string">&quot;REPLACE&quot;</span><span class="token punctuation">,</span>
      newNode<span class="token punctuation">,</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
  <span class="token comment">// 当前节点有补丁</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span>current<span class="token punctuation">.</span>length<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    patches<span class="token punctuation">[</span>index<span class="token punctuation">]</span> <span class="token operator">=</span> current<span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
<span class="token comment">// 比较是否是 文本 类型</span>
<span class="token keyword">function</span> <span class="token function">isString</span><span class="token punctuation">(</span><span class="token parameter">node</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">return</span> <span class="token keyword">typeof</span> node <span class="token operator">===</span> <span class="token string">&quot;string&quot;</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token comment">// 比较属性的差异</span>
<span class="token keyword">function</span> <span class="token function">diffAttr</span><span class="token punctuation">(</span><span class="token parameter">oldProps<span class="token punctuation">,</span> newProps</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">let</span> patch <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">;</span>
  <span class="token comment">// 1. 改变的属性</span>
  <span class="token comment">// 判断新老属性的变更，把最后的变更放在patch中</span>
  <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">let</span> key <span class="token keyword">in</span> oldProps<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>oldProps<span class="token punctuation">[</span>key<span class="token punctuation">]</span> <span class="token operator">!==</span> newProps<span class="token punctuation">[</span>key<span class="token punctuation">]</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token comment">// 以新属性为准，因为新属性是最后的变更</span>
      patch<span class="token punctuation">[</span>key<span class="token punctuation">]</span> <span class="token operator">=</span> newProps<span class="token punctuation">[</span>key<span class="token punctuation">]</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
  <span class="token comment">// 2. 新增的属性</span>
  <span class="token comment">// 判断 假如新的属性，在老属性中没有，也添加patch</span>
  <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">let</span> key <span class="token keyword">in</span> newProps<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>oldProps<span class="token punctuation">[</span>key<span class="token punctuation">]</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      patch<span class="token punctuation">[</span>key<span class="token punctuation">]</span> <span class="token operator">=</span> newProps<span class="token punctuation">[</span>key<span class="token punctuation">]</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
  <span class="token keyword">return</span> patch<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token comment">// 基于一个num序号来实现的</span>
<span class="token keyword">let</span> num <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
<span class="token comment">// 递归子节点</span>
<span class="token keyword">function</span> <span class="token function">diffChildren</span><span class="token punctuation">(</span><span class="token parameter">oldChildren<span class="token punctuation">,</span> newChildren<span class="token punctuation">,</span> patches</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token comment">// 比较老的第一个和新的第一个</span>
  oldChildren<span class="token punctuation">.</span><span class="token function">forEach</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">e<span class="token punctuation">,</span> i</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
    <span class="token function">walk</span><span class="token punctuation">(</span>e<span class="token punctuation">,</span> newChildren<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">,</span> <span class="token operator">++</span>num<span class="token punctuation">,</span> patches<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token comment">// https://www.cnblogs.com/wind-lanyan/p/9061684.html</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="比较规则" tabindex="-1"><a class="header-anchor" href="#比较规则" aria-hidden="true">#</a> 比较规则</h3><ol><li>新 Node 节点不存在时：REMOVE</li><li>文本的变化：TEXT</li><li>节点类型相同，属性不同时：ATTR</li><li>接点类型不同，使用替换：REPLACE</li></ol><h2 id="patch-逻辑" tabindex="-1"><a class="header-anchor" href="#patch-逻辑" aria-hidden="true">#</a> Patch 逻辑</h2><p>其实就是元素去打补丁，通过 type 然后执行不同的操作如新增、删除、移动、修改等...</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token comment">// patch</span>

<span class="token keyword">let</span> allPatches<span class="token punctuation">;</span>
<span class="token keyword">let</span> index2 <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>

<span class="token keyword">function</span> <span class="token function">patch</span><span class="token punctuation">(</span><span class="token parameter">node<span class="token punctuation">,</span> patches</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  allPatches <span class="token operator">=</span> patches<span class="token punctuation">;</span>
  <span class="token comment">// 打补丁</span>
  <span class="token function">walk2</span><span class="token punctuation">(</span>node<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">function</span> <span class="token function">walk2</span><span class="token punctuation">(</span><span class="token parameter">node</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">let</span> current <span class="token operator">=</span> allPatches<span class="token punctuation">[</span>index2<span class="token operator">++</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
  <span class="token keyword">let</span> childNodes <span class="token operator">=</span> node<span class="token punctuation">.</span>childNodes<span class="token punctuation">;</span>
  <span class="token comment">// 先序遍历 继续遍历递归子节点</span>
  childNodes<span class="token punctuation">.</span><span class="token function">forEach</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">child</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token function">walk2</span><span class="token punctuation">(</span>child<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span>current<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// debugger</span>
    <span class="token function">doPatch</span><span class="token punctuation">(</span>node<span class="token punctuation">,</span> current<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token comment">//打补丁</span>
<span class="token keyword">function</span> <span class="token function">doPatch</span><span class="token punctuation">(</span><span class="token parameter">node<span class="token punctuation">,</span> patches</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token comment">// 遍历所有打过的补丁</span>
  patches<span class="token punctuation">.</span><span class="token function">forEach</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">patch</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
    <span class="token keyword">switch</span> <span class="token punctuation">(</span>patch<span class="token punctuation">.</span>type<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">case</span> <span class="token string">&quot;ATTR&quot;</span><span class="token operator">:</span>
        <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">let</span> key <span class="token keyword">in</span> patch<span class="token punctuation">.</span>attr<span class="token punctuation">)</span> <span class="token punctuation">{</span>
          <span class="token keyword">let</span> value <span class="token operator">=</span> patch<span class="token punctuation">.</span>attr<span class="token punctuation">[</span>key<span class="token punctuation">]</span><span class="token punctuation">;</span>
          <span class="token keyword">if</span> <span class="token punctuation">(</span>value<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token function">setAttr</span><span class="token punctuation">(</span>node<span class="token punctuation">,</span> key<span class="token punctuation">,</span> value<span class="token punctuation">)</span><span class="token punctuation">;</span>
          <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
            node<span class="token punctuation">.</span><span class="token function">removeAttribute</span><span class="token punctuation">(</span>key<span class="token punctuation">)</span><span class="token punctuation">;</span>
          <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">break</span><span class="token punctuation">;</span>
      <span class="token keyword">case</span> <span class="token string">&quot;TEXT&quot;</span><span class="token operator">:</span>
        node<span class="token punctuation">.</span>textContent <span class="token operator">=</span> patch<span class="token punctuation">.</span>text<span class="token punctuation">;</span>
        <span class="token keyword">break</span><span class="token punctuation">;</span>
      <span class="token keyword">case</span> <span class="token string">&quot;REPLACE&quot;</span><span class="token operator">:</span>
        <span class="token keyword">let</span> newNode <span class="token operator">=</span> patch<span class="token punctuation">.</span>newNode<span class="token punctuation">;</span>
        newNode <span class="token operator">=</span>
          newNode <span class="token keyword">instanceof</span> <span class="token class-name">Element</span>
            <span class="token operator">?</span> <span class="token function">render</span><span class="token punctuation">(</span>newNode<span class="token punctuation">)</span>
            <span class="token operator">:</span> document<span class="token punctuation">.</span><span class="token function">createTextNode</span><span class="token punctuation">(</span>newNode<span class="token punctuation">)</span><span class="token punctuation">;</span>
        node<span class="token punctuation">.</span>parentNode<span class="token punctuation">.</span><span class="token function">replaceChild</span><span class="token punctuation">(</span>newNode<span class="token punctuation">,</span> node<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">break</span><span class="token punctuation">;</span>
      <span class="token keyword">case</span> <span class="token string">&quot;REMOVE&quot;</span><span class="token operator">:</span>
        node<span class="token punctuation">.</span>parentNode<span class="token punctuation">.</span><span class="token function">removeChild</span><span class="token punctuation">(</span>node<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">break</span><span class="token punctuation">;</span>
      <span class="token keyword">default</span><span class="token operator">:</span>
        <span class="token keyword">break</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,14),k={href:"https://ustbhuangyi.github.io/vue-analysis/v2/components/patch.html",target:"_blank",rel:"noopener noreferrer"},r={href:"https://github1s.com/vuejs/vue/blob/HEAD/src/core/vdom/patch.js",target:"_blank",rel:"noopener noreferrer"},d=n("h2",{id:"总结",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#总结","aria-hidden":"true"},"#"),s(" 总结")],-1),v={href:"https://github.com/AnsonZnl/virtual-dom-study",target:"_blank",rel:"noopener noreferrer"},m=p("<p><strong>捋一下主要方法的作用：</strong></p><ul><li>Element：创建虚拟 DOM 元素的类 <ul><li>createElement：创建虚拟 DOM 并返回</li></ul></li><li>render：将虚拟 DOM 渲染成真实的 DOM</li><li>diff：对比新老虚拟 DOM，然后返回变更</li><li>patch：将 diff 的变更更新到真实的 DOM 上</li></ul><p><strong>梳理一下整个 DOM-diff 的过程：</strong></p><ul><li>用 JS 对象模拟 DOM（虚拟 DOM）</li><li>把虚拟 DOM 转化成真实的 DOM 并插入到页面中</li><li>如果有事件改变了虚拟 DOM，就比较两个虚拟 DOM 树的差异，得到差异对象（diff)</li><li>最后把差异对象（变化）更新到真实的 DOM 树上（patch）</li></ul>",4),b={href:"https://github.com/ascoders/weekly/blob/v2/190.%E7%B2%BE%E8%AF%BB%E3%80%8ADOM%20diff%20%E5%8E%9F%E7%90%86%E8%AF%A6%E8%A7%A3%E3%80%8B.md",target:"_blank",rel:"noopener noreferrer"},h={href:"https://github.com/ascoders/weekly/blob/v2/192.%E7%B2%BE%E8%AF%BB%E3%80%8ADOM%20diff%20%E6%9C%80%E9%95%BF%E4%B8%8A%E5%8D%87%E5%AD%90%E5%BA%8F%E5%88%97%E3%80%8B.md",target:"_blank",rel:"noopener noreferrer"},f=n("h2",{id:"参考",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#参考","aria-hidden":"true"},"#"),s(" 参考")],-1),y={href:"https://juejin.cn/post/6844903806132568072#heading-8",target:"_blank",rel:"noopener noreferrer"};function w(E,g){const a=o("ExternalLinkIcon");return c(),l("div",null,[u,n("p",null,[s("为了便于理解，只是罗列出了一小部分，Vue 的 patch 更复杂，可以参考："),n("a",k,[s("vue 技术揭秘"),t(a)]),s("和"),n("a",r,[s("vuejs/src/core/vdom/patch"),t(a)])]),d,n("p",null,[s("代码地址："),n("a",v,[s("virtual-dom-study"),t(a)])]),m,n("p",null,[s("这并不是 Vue，所使用的 diff 方法，只是一个简单的 diff 过程，Vue 的 diff 可以参考："),n("a",b,[s("精读《DOM diff 原理详解》"),t(a)]),s("和"),n("a",h,[s("精读《DOM diff 最长上升子序列》"),t(a)])]),f,n("ul",null,[n("li",null,[n("a",y,[s("学习虚拟 DOM"),t(a)])])])])}const D=e(i,[["render",w],["__file","虚拟DOM之Diff算法.html.vue"]]);export{D as default};
