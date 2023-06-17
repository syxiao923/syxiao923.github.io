import{_ as t,r as p,o as l,c as o,a as n,b as s,d as c,e as a}from"./app-00a966d3.js";const i={},u=a(`<h2 id="描述" tabindex="-1"><a class="header-anchor" href="#描述" aria-hidden="true">#</a> 描述</h2><p>将两个升序链表合并为一个新的 升序 链表并返回。新链表是通过拼接给定的两个链表的所有节点组成的。</p><p>示例 1：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>输入：l1 = [1,2,4], l2 = [1,3,4]
输出：[1,1,2,3,4,4]
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>示例 2：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>输入：l1 = [], l2 = []
输出：[]
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>示例 3：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>输入：l1 = [], l2 = [0]
输出：[0]
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div>`,8),r={href:"https://leetcode-cn.com/problems/merge-two-sorted-lists/",target:"_blank",rel:"noopener noreferrer"},d=a(`<h2 id="解法" tabindex="-1"><a class="header-anchor" href="#解法" aria-hidden="true">#</a> 解法</h2><h3 id="递归" tabindex="-1"><a class="header-anchor" href="#递归" aria-hidden="true">#</a> 递归</h3><p><strong>思路</strong> 分而治之， 自上而下的方式。 边界条件： 如果 l1 为 null， 则返回 l2， 说明， 反之。 递归条件：判断 l1 和 l2 头节点值得大小， 那个更小， 就把那个添加到上一个的前面。</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">let</span> <span class="token function-variable function">mergeTwoLists</span> <span class="token operator">=</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token parameter">l1<span class="token punctuation">,</span> l2</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span>l1 <span class="token operator">==</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token keyword">return</span> l2<span class="token punctuation">;</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span>l2 <span class="token operator">==</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token keyword">return</span> l1<span class="token punctuation">;</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span>l1<span class="token punctuation">.</span>val <span class="token operator">&lt;=</span> l2<span class="token punctuation">.</span>val<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    l1<span class="token punctuation">.</span>next <span class="token operator">=</span> <span class="token function">mergeTwoLists</span><span class="token punctuation">(</span>l1<span class="token punctuation">.</span>next<span class="token punctuation">,</span> l2<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">return</span> l1<span class="token punctuation">;</span>
  <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
    l2<span class="token punctuation">.</span>next <span class="token operator">=</span> <span class="token function">mergeTwoLists</span><span class="token punctuation">(</span>l1<span class="token punctuation">,</span> l2<span class="token punctuation">.</span>next<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">return</span> l2<span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>复杂度分析</strong></p><ul><li>时间复杂度：O(1)</li><li>空间复杂度：O(m+n)</li></ul><h3 id="迭代" tabindex="-1"><a class="header-anchor" href="#迭代" aria-hidden="true">#</a> 迭代</h3><p>当判断 l1 和 l2 都是 null 时，判断 l1 和 l2 的哪个头节点更小，然后将较小的节点添加到结果里，对应链表里应该移除当前节点然后后移一位。</p><p>思路： 1.新建一个空节点（headNode），然后维护一个 prev 指针，调整他的 next 指针。</p><ol start="2"><li>判断 l1 和 l2 的值大小，如果 l1 &lt; l2 就把 l1 当前的节点接到 prev 节点的后面，同时将 l1 的指针后移一位。否则，l2 也执行同样同样操作。</li><li>重复 2，直到 l1 或者 l2 为空后，将非空列表接在合并链表的后面，返回即可。</li></ol><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">var</span> <span class="token function-variable function">mergeTwoLists</span> <span class="token operator">=</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token parameter">l1<span class="token punctuation">,</span> l2</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">let</span> mergedHead <span class="token operator">=</span> <span class="token punctuation">{</span>
    <span class="token literal-property property">val</span><span class="token operator">:</span> <span class="token string">&quot;&quot;</span><span class="token punctuation">,</span>
    <span class="token literal-property property">next</span><span class="token operator">:</span> <span class="token keyword">null</span><span class="token punctuation">,</span>
  <span class="token punctuation">}</span><span class="token punctuation">;</span>
  <span class="token keyword">let</span> crt <span class="token operator">=</span> mergedHead<span class="token punctuation">;</span> <span class="token comment">// 活动指针</span>
  <span class="token keyword">while</span> <span class="token punctuation">(</span>l1 <span class="token operator">&amp;&amp;</span> l2<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>l1<span class="token punctuation">.</span>val <span class="token operator">&gt;</span> l2<span class="token punctuation">.</span>val<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      crt<span class="token punctuation">.</span>next <span class="token operator">=</span> l2<span class="token punctuation">;</span> <span class="token comment">// 拿出小值往前排</span>
      l2 <span class="token operator">=</span> l2<span class="token punctuation">.</span>next<span class="token punctuation">;</span> <span class="token comment">// 将 l2 重新赋值，相当于了删除了一个节点</span>
    <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
      crt<span class="token punctuation">.</span>next <span class="token operator">=</span> l1<span class="token punctuation">;</span> <span class="token comment">//</span>
      l1 <span class="token operator">=</span> l1<span class="token punctuation">.</span>next<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    crt <span class="token operator">=</span> crt<span class="token punctuation">.</span>next<span class="token punctuation">;</span> <span class="token comment">// 相等的情况</span>
  <span class="token punctuation">}</span>
  crt<span class="token punctuation">.</span>next <span class="token operator">=</span> l1 <span class="token operator">||</span> l2<span class="token punctuation">;</span>
  <span class="token keyword">return</span> mergedHead<span class="token punctuation">.</span>next<span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>复杂度分析</strong></p><ul><li>时间复杂度：O(n)</li><li>空间复杂度：O(1)</li></ul><h2 id="总结" tabindex="-1"><a class="header-anchor" href="#总结" aria-hidden="true">#</a> 总结</h2><p>总感觉 JS 实现的链表怪怪的，打印出来一堆对象套对象。</p><p>这一节涉及的知识挺多的，链表、递归。</p>`,16);function k(v,m){const e=p("ExternalLinkIcon");return l(),o("div",null,[u,n("p",null,[s("题目链接："),n("a",r,[s("合并两个有序链表"),c(e)])]),d])}const h=t(i,[["render",k],["__file","合并两个有序链表.html.vue"]]);export{h as default};
