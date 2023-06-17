import{_ as p,r as o,o as c,c as l,a as n,b as s,d as e,e as t}from"./app-00a966d3.js";const i={},u=t(`<h2 id="描述" tabindex="-1"><a class="header-anchor" href="#描述" aria-hidden="true">#</a> 描述</h2><p>给定一个整数数组 nums ，找到一个具有最大和的连续子数组（子数组最少包含一个元素），返回其最大和。</p><p>示例 1：</p><div class="language-输入：nums line-numbers-mode" data-ext="输入：nums"><pre class="language-输入：nums"><code>输出：6
解释：连续子数组 [4,-1,2,1] 的和最大，为 6 。
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>示例 2：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>输入：nums = [1]
输出：1
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>示例 3：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>输入：nums = [0]
输出：0
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>示例 4：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>输入：nums = [-1]
输出：-1
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>示例 5：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>输入：nums = [-100000]
输出：-100000
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div>`,12),r={href:"https://leetcode-cn.com/problems/maximum-subarray/",target:"_blank",rel:"noopener noreferrer"},d=t(`<h2 id="解法" tabindex="-1"><a class="header-anchor" href="#解法" aria-hidden="true">#</a> 解法</h2><h3 id="动态规划" tabindex="-1"><a class="header-anchor" href="#动态规划" aria-hidden="true">#</a> 动态规划</h3><p>这个想了半天也没写出来..</p><p>一开始看不懂，后来看了官方的题解，自己一步步 debug 才勉强看懂，但是还不是很完全理解。</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">maxArrSum</span><span class="token punctuation">(</span><span class="token parameter">nums</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">let</span> sum <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> <span class="token comment">// 维护一个当前最大数组的和</span>
  <span class="token keyword">let</span> ans <span class="token operator">=</span> nums<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">;</span> <span class="token comment">// 维护一个当前的最大值</span>
  <span class="token keyword">let</span> len <span class="token operator">=</span> nums<span class="token punctuation">.</span>length<span class="token punctuation">;</span>
  <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">let</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> len<span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">let</span> num <span class="token operator">=</span> nums<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">;</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>sum <span class="token operator">&gt;=</span> <span class="token number">0</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      sum <span class="token operator">=</span> sum <span class="token operator">+</span> num<span class="token punctuation">;</span> <span class="token comment">// 如果小于或等于零 就+=</span>
    <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
      sum <span class="token operator">=</span> num<span class="token punctuation">;</span> <span class="token comment">// 大于零就赋值</span>
    <span class="token punctuation">}</span>
    ans <span class="token operator">=</span> Math<span class="token punctuation">.</span><span class="token function">max</span><span class="token punctuation">(</span>sum<span class="token punctuation">,</span> ans<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
  <span class="token keyword">return</span> ans<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token keyword">let</span> arr <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token operator">-</span><span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">,</span> <span class="token operator">-</span><span class="token number">3</span><span class="token punctuation">,</span> <span class="token number">4</span><span class="token punctuation">,</span> <span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">,</span> <span class="token operator">-</span><span class="token number">5</span><span class="token punctuation">,</span> <span class="token number">4</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
<span class="token keyword">let</span> result <span class="token operator">=</span> <span class="token function">maxArrSum</span><span class="token punctuation">(</span>arr<span class="token punctuation">)</span><span class="token punctuation">;</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>result<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">//6</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="思路" tabindex="-1"><a class="header-anchor" href="#思路" aria-hidden="true">#</a> 思路</h2><ol><li>动态规划的是首先对数组进行遍历，当前最大连续子序列和为 sum，结果为 ans</li><li>如果 sum &gt; 0，则说明 sum 对结果有增益效果，则 sum 保留并加上当前遍历数字</li><li>如果 sum &lt;= 0，则说明 sum 对结果无增益效果，需要舍弃，则 sum 直接更新为当前遍历数字</li><li>每次比较 sum 和 ans 的大小，将最大值置为 ans，遍历结束返回结果</li></ol><p><strong>复杂度分析</strong></p><ul><li>时间复杂度：O(n)</li><li>空间复杂度：O(1)</li></ul><h2 id="总结" tabindex="-1"><a class="header-anchor" href="#总结" aria-hidden="true">#</a> 总结</h2><p>动态规划：是一种将复杂问题分解成更小问题来解决的优化技术 分而治之：将一个规模为 N 的问题分解为 K 个规模较小的子问题(K &lt;= N)，这些子问题相互独立且与原问题性质相同，求出子问题的解，就可以求出原问题的解。</p><p>看不懂解法就 debug 一步一步的看怎么执行的，然后慢慢理解着看。</p>`,12),k={href:"https://juejin.cn/post/6933147477399109640",target:"_blank",rel:"noopener noreferrer"};function m(v,b){const a=o("ExternalLinkIcon");return c(),l("div",null,[u,n("p",null,[s("题目："),n("a",r,[s("最大子序和"),e(a)])]),d,n("p",null,[s("本文正在参与「掘金 2021 春招闯关活动」, 点击查看 "),n("a",k,[s("活动详情"),e(a)])])])}const g=p(i,[["render",m],["__file","最大子序和.html.vue"]]);export{g as default};
