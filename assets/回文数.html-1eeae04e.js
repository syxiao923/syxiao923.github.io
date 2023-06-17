import{_ as t,r as p,o,c as l,a as n,b as s,d as c,e as a}from"./app-00a966d3.js";const i={},u=a(`<h2 id="题目描述" tabindex="-1"><a class="header-anchor" href="#题目描述" aria-hidden="true">#</a> 题目描述</h2><p>给你一个整数 x ，如果 x 是一个回文整数，返回 true ；否则，返回 false 。</p><p>回文数是指正序（从左向右）和倒序（从右向左）读都是一样的整数。例如，121 是回文，而 123 不是。</p><p>示例 1：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>输入：x = 121
输出：true
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>示例  2：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>输入：x = -121
输出：false
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>解释：从左向右读, 为 -121 。 从右向左读, 为 121- 。因此它不是一个回文数。</p><p>示例 3：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>输入：x = 10
输出：false
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>解释：从右向左读, 为 01 。因此它不是一个回文数。</p><p>示例 4：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>输入：x = -101
输出：false
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div>`,13),r={href:"https://leetcode-cn.com/problems/palindrome-number/",target:"_blank",rel:"noopener noreferrer"},k=a(`<h2 id="解法" tabindex="-1"><a class="header-anchor" href="#解法" aria-hidden="true">#</a> 解法</h2><h3 id="for" tabindex="-1"><a class="header-anchor" href="#for" aria-hidden="true">#</a> for</h3><p>思路：</p><ul><li>遍历时，从右至左，分别判断是否相同。</li><li>比如 121，遍历时，判断 0 位和 2 位是否相同 <ul><li>如果相同则继续判断，一直到中间是一位或者遍历完，return true。</li><li>如果不同则 return false。</li></ul></li></ul><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">var</span> <span class="token function-variable function">isPalindrome</span> <span class="token operator">=</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token parameter">x</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">typeof</span> x <span class="token operator">==</span> <span class="token string">&quot;number&quot;</span> <span class="token operator">?</span> <span class="token punctuation">(</span>x <span class="token operator">=</span> x <span class="token operator">+</span> <span class="token string">&quot;&quot;</span><span class="token punctuation">)</span> <span class="token operator">:</span> x<span class="token punctuation">;</span>
  <span class="token keyword">let</span> len <span class="token operator">=</span> x<span class="token punctuation">.</span>length<span class="token punctuation">;</span>
  <span class="token keyword">let</span> logLen <span class="token operator">=</span> Math<span class="token punctuation">.</span><span class="token function">floor</span><span class="token punctuation">(</span>len <span class="token operator">/</span> <span class="token number">2</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">let</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> logLen<span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">let</span> isEqual <span class="token operator">=</span> x<span class="token punctuation">[</span>i<span class="token punctuation">]</span> <span class="token operator">===</span> x<span class="token punctuation">[</span>len <span class="token operator">-</span> <span class="token punctuation">(</span>i <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>isEqual<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">return</span> <span class="token boolean">false</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
  <span class="token keyword">return</span> <span class="token boolean">true</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>复杂度分析</strong></p><ul><li>时间复杂度：O(n)</li><li>空间复杂度：O(1)</li></ul><h3 id="二分法-翻转字符串" tabindex="-1"><a class="header-anchor" href="#二分法-翻转字符串" aria-hidden="true">#</a> 二分法+翻转字符串</h3><p>思路：</p><ul><li>将数字分割为两半，然后翻转另一份，然后进行比较。</li><li>判断是否是奇数，如果是，截取一位再去比较。</li><li>判断两个字符串，如果相同，则 return turn，否则 return false。</li></ul><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">var</span> <span class="token function-variable function">isPalindrome</span> <span class="token operator">=</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token parameter">x</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">typeof</span> x <span class="token operator">==</span> <span class="token string">&quot;number&quot;</span> <span class="token operator">?</span> <span class="token punctuation">(</span>x <span class="token operator">=</span> x <span class="token operator">+</span> <span class="token string">&quot;&quot;</span><span class="token punctuation">)</span> <span class="token operator">:</span> x<span class="token punctuation">;</span>
  <span class="token keyword">let</span> len <span class="token operator">=</span> x<span class="token punctuation">.</span>length<span class="token punctuation">;</span>
  <span class="token keyword">let</span> isZhiNum <span class="token operator">=</span> len <span class="token operator">%</span> <span class="token number">2</span><span class="token punctuation">;</span>
  <span class="token keyword">let</span> logLen <span class="token operator">=</span> Math<span class="token punctuation">.</span><span class="token function">floor</span><span class="token punctuation">(</span>len <span class="token operator">/</span> <span class="token number">2</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token keyword">let</span> strArr <span class="token operator">=</span> x<span class="token punctuation">.</span><span class="token function">split</span><span class="token punctuation">(</span><span class="token string">&quot;&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token keyword">let</span> leftStr <span class="token operator">=</span> strArr<span class="token punctuation">.</span><span class="token function">splice</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">,</span> logLen<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span>isZhiNum <span class="token operator">==</span> <span class="token number">1</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    strArr<span class="token punctuation">.</span><span class="token function">splice</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
  <span class="token keyword">let</span> rightStr <span class="token operator">=</span> strArr<span class="token punctuation">.</span><span class="token function">reverse</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>isZhiNum<span class="token punctuation">,</span> logLen<span class="token punctuation">,</span> leftStr<span class="token punctuation">,</span> strArr<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token keyword">return</span> leftStr<span class="token punctuation">.</span><span class="token function">toString</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">===</span> rightStr<span class="token punctuation">.</span><span class="token function">toString</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>复杂度分析：</p><ul><li>时间复杂度：O(1)</li><li>空间复杂度：O(1)</li></ul><h2 id="总结" tabindex="-1"><a class="header-anchor" href="#总结" aria-hidden="true">#</a> 总结</h2><p>基础很重要，熟练掌握字符串、数学、数组方法。</p>`,15);function d(v,m){const e=p("ExternalLinkIcon");return o(),l("div",null,[u,n("p",null,[s("链接："),n("a",r,[s("回文数"),c(e)])]),k])}const h=t(i,[["render",d],["__file","回文数.html.vue"]]);export{h as default};
