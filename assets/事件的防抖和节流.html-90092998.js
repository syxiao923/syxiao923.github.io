import{_ as n,o as s,c as a,e as t}from"./app-00a966d3.js";const e={},p=t(`<h1 id="事件的防抖和节流" tabindex="-1"><a class="header-anchor" href="#事件的防抖和节流" aria-hidden="true">#</a> 事件的防抖和节流</h1><p>防抖和节流函数是我们经常用到的函数，在实际的开发过程中，如 scroll、resize、click、键盘等事件很容易被多次触发，频繁的触发回调会导致页面卡顿和抖动，为了避免这种情况，需要使用节流和防抖的方法来减少无用的操作和网络请求，也是面试中经常遇到的问题，需要牢牢掌握。</p><h2 id="防抖和节流的本质" tabindex="-1"><a class="header-anchor" href="#防抖和节流的本质" aria-hidden="true">#</a> 防抖和节流的本质</h2><p>都是<strong>闭包</strong>的形式存在的.</p><p>他们通过对事件的回调函数进行包裹、以保存自由变量的形式来缓存时间信息，最后使用 setTimeout 来控制事件的触发频率。</p><h2 id="节流-第一个人说了算" tabindex="-1"><a class="header-anchor" href="#节流-第一个人说了算" aria-hidden="true">#</a> 节流：第一个人说了算</h2><p>节流（Throttle）的中心思想在于：<strong>在某段时间内不过你触发了多少次，我都只认第一次，并且在计时结束时给出响应。</strong></p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token doc-comment comment">/**
 * 函数节流
 * 作用：一段时间内的多次操作，只按照第一次触发开始计算，并在计时结束时给予响应。
 * 场景：如输入搜索功能
 * <span class="token keyword">@param</span> <span class="token parameter">fn</span> 需要进行节流操作的事件函数
 * <span class="token keyword">@param</span> <span class="token parameter">interval</span> 间隔时间
 * <span class="token keyword">@returns</span> <span class="token class-name"><span class="token punctuation">{</span>Function<span class="token punctuation">}</span></span>
 */</span>
<span class="token keyword">function</span> <span class="token function">throttle</span><span class="token punctuation">(</span><span class="token parameter">fn<span class="token punctuation">,</span> interval <span class="token operator">=</span> <span class="token number">500</span></span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">let</span> last <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
  <span class="token keyword">return</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter"><span class="token operator">...</span>args</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">let</span> now <span class="token operator">=</span> <span class="token operator">+</span><span class="token keyword">new</span> <span class="token class-name">Date</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>now <span class="token operator">-</span> last <span class="token operator">&gt;</span> interval<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      last <span class="token operator">=</span> now<span class="token punctuation">;</span>
      <span class="token function">fn</span><span class="token punctuation">.</span><span class="token function">call</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">,</span> args<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token doc-comment comment">/**
 * 步骤
 * 接受一个函数，和一个触发间隔时间，时间默认是 500ms
 * 默认赋值为0
 * 将多个参数解构为一个参数数组
 * 记录本次触发回调的时间
 * 判断上次触发的时间和本次之间的间隔是否大于我们设定的阈值
 * 将本次触发的时间赋值给last，用于下次判断
 * 使用call调用传入的回调函数，并传入参数
 *
 */</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>使用：在 onScorll 中使用节流</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token comment">// 使用 throttle 来包装 scorll 的回调函数，设置间隔时间为1s</span>
<span class="token keyword">const</span> better_scorll <span class="token operator">=</span> <span class="token function">throttle</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&quot;触发了滚动事件&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token number">1000</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
document<span class="token punctuation">.</span><span class="token function">addEventListenner</span><span class="token punctuation">(</span><span class="token string">&quot;scorll&quot;</span><span class="token punctuation">,</span> better_scorll<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">// 1s内，无论触发多少次，都只从第一次触发之后的1s后给出响应。</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="防抖-最后一个人说了算" tabindex="-1"><a class="header-anchor" href="#防抖-最后一个人说了算" aria-hidden="true">#</a> 防抖：最后一个人说了算</h2><p>防抖的中心思想在于：<strong>我会等你到底。在某段时间内，不管你触发了多少次回调，我都只认最后一次</strong></p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token doc-comment comment">/**
 * 函数防抖
 * 作用：一段时间内的多次操作，只执行最后一次。
 * 场景：如点击登录/注册/支付等按钮时
 * <span class="token keyword">@param</span> <span class="token parameter">fn</span> 需要进行防抖操作的事件函数
 * <span class="token keyword">@param</span> <span class="token parameter">delay</span> 延迟时间
 * <span class="token keyword">@returns</span> <span class="token class-name"><span class="token punctuation">{</span>Function<span class="token punctuation">}</span></span>
 */</span>
<span class="token keyword">function</span> <span class="token function">debounce</span><span class="token punctuation">(</span><span class="token parameter">fn<span class="token punctuation">,</span> delay <span class="token operator">=</span> <span class="token number">500</span></span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">let</span> timer <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
  <span class="token keyword">return</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter"><span class="token operator">...</span>args</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>timer<span class="token punctuation">)</span> <span class="token function">clearTimeout</span><span class="token punctuation">(</span>timer<span class="token punctuation">)</span><span class="token punctuation">;</span>
    timer <span class="token operator">=</span> <span class="token function">setTimeout</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
      <span class="token function">fn</span><span class="token punctuation">.</span><span class="token function">call</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">,</span> args<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span> delay<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token doc-comment comment">/**
 * 接受一个函数，和一个触发间隔时间，时间默认是 500ms
 * 定时器 id 默认赋值为null
 * 将多个参数解构为一个参数数组
 * 判断timer是否存在，如存在就取消定时器
 * 然后创建一个新的定时器，并将id赋值给timer
 * 然后如果再次点击重复上面的操作，一直到delay时间内没点时，定时器执行
 * 执行时：使用call调用传入的回调函数，并传入参数
 *
 */</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>使用：在 onScorll 中使用防抖</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token comment">// 用debounce来包装scroll的回调</span>
<span class="token keyword">const</span> better_scroll <span class="token operator">=</span> <span class="token function">debounce</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&quot;触发了滚动事件&quot;</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token number">1000</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
document<span class="token punctuation">.</span><span class="token function">addEventListener</span><span class="token punctuation">(</span><span class="token string">&quot;scroll&quot;</span><span class="token punctuation">,</span> better_scroll<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="用-throttle-来优化-debounce" tabindex="-1"><a class="header-anchor" href="#用-throttle-来优化-debounce" aria-hidden="true">#</a> 用 Throttle 来优化 Debounce</h2><p>debounce 的问题是它太有耐心了，试想，如果用户的操作十分频繁————他每次都不等 debounce 设置的 delay 的时间结束就进行下一次操作，于是每次 debounce 都会为用户重新生成定时器，回调函数被延迟了一次又一次，用户迟迟得不到响应，用户也会对这个页面产生“页面卡死”了的观感。</p><p>为了避免弄巧成拙，我们需要借力 Throttle 的思想，打造一个“有底线”的 debounce ，等你可以，但我有我的原则：<strong>delay 时间内，我可以为你重新生成定时器，但是只要 delay 时间一到，我就必须给用户一个响应。</strong></p><p>这种 Throttle 和 debounce 合体的思想，已经被很多成熟的前端库应用到他们的加强版 throttle 函数中了。</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token doc-comment comment">/**
 * 加强版节流函数
 * 作用：delay时间内的多次操作将会重新生成定时器，但只要delay时间一到就执行一次。
 * 场景：如点击登录/注册/支付等按钮时
 * <span class="token keyword">@param</span> <span class="token parameter">fn</span> 需要进行防抖操作的事件函数
 * <span class="token keyword">@param</span> <span class="token parameter">delay</span> 延迟时间
 * <span class="token keyword">@returns</span> <span class="token class-name"><span class="token punctuation">{</span>Function<span class="token punctuation">}</span></span>
 */</span>
<span class="token keyword">function</span> <span class="token function">throttle</span><span class="token punctuation">(</span><span class="token parameter">fn<span class="token punctuation">,</span> delay <span class="token operator">=</span> <span class="token number">500</span></span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">let</span> last <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
  <span class="token keyword">let</span> timer <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
  <span class="token keyword">return</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter"><span class="token operator">...</span>args</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">let</span> now <span class="token operator">=</span> <span class="token operator">+</span><span class="token keyword">new</span> <span class="token class-name">Date</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>now <span class="token operator">-</span> last <span class="token operator">&lt;</span> delay<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token comment">// 如果间隔时间小于我们设定的阈值，则重新生成一个定时器</span>
      <span class="token keyword">if</span> <span class="token punctuation">(</span>timer<span class="token punctuation">)</span> <span class="token function">clearTimeout</span><span class="token punctuation">(</span>timer<span class="token punctuation">)</span><span class="token punctuation">;</span>
      timer <span class="token operator">=</span> <span class="token function">setTimeout</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
        last <span class="token operator">=</span> now<span class="token punctuation">;</span>
        <span class="token function">fn</span><span class="token punctuation">.</span><span class="token function">call</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">,</span> args<span class="token punctuation">)</span><span class="token punctuation">;</span>
      <span class="token punctuation">}</span><span class="token punctuation">,</span> delay<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
      <span class="token comment">// 如果 间隔时间大于设定的阈值，就执行一次。</span>
      last <span class="token operator">=</span> now<span class="token punctuation">;</span>
      <span class="token function">fn</span><span class="token punctuation">.</span><span class="token function">call</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">,</span> args<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token doc-comment comment">/**
 * 接受一个函数和延迟时间，延迟时间默认是500ms
 * 定义一个开始执行的时间戳和定时器id，赋予默认值
 * 返回一个函数，并将参数转为数组。
 * 函数内，拿到当前的时间戳
 * 判断，是否小于间隔时间：
 * 小于：则清楚定时器，然后重新生成定时器。定时器内直接赋值,然后call函数，
 * 大于：直接赋值,然后call函数，
 */</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>使用：在 onScorll 中使用加强版 throttle</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token comment">// 用throttle来包装scroll的回调</span>
<span class="token keyword">const</span> better_scroll <span class="token operator">=</span> <span class="token function">throttle</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&quot;触发了滚动事件&quot;</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token number">1000</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
document<span class="token punctuation">.</span><span class="token function">addEventListener</span><span class="token punctuation">(</span><span class="token string">&quot;scroll&quot;</span><span class="token punctuation">,</span> better_scroll<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,22),o=[p];function c(l,i){return s(),a("div",null,o)}const r=n(e,[["render",c],["__file","事件的防抖和节流.html.vue"]]);export{r as default};
