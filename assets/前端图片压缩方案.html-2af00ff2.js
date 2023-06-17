import{_ as a,r as t,o as p,c as e,a as n,b as o,d as c,e as l}from"./app-00a966d3.js";const u={},i=l(`<h1 id="前端图片压缩方案" tabindex="-1"><a class="header-anchor" href="#前端图片压缩方案" aria-hidden="true">#</a> 前端图片压缩方案</h1><p>压缩图片原理：</p><p>先通过 js 中 img 构造函数，实例化 img 对象，后将图片的路径给转移到中，再建立一个 canvas 画布，后对画布进行各方面的数值的设置。</p><p>如代码所示：</p><div class="language-html line-numbers-mode" data-ext="html"><pre class="language-html"><code><span class="token doctype"><span class="token punctuation">&lt;!</span><span class="token doctype-tag">DOCTYPE</span> <span class="token name">html</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>html</span> <span class="token attr-name">lang</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>en<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>head</span><span class="token punctuation">&gt;</span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>meta</span> <span class="token attr-name">charset</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>UTF-8<span class="token punctuation">&quot;</span></span> <span class="token punctuation">/&gt;</span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>meta</span> <span class="token attr-name">http-equiv</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>X-UA-Compatible<span class="token punctuation">&quot;</span></span> <span class="token attr-name">content</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>IE=edge<span class="token punctuation">&quot;</span></span> <span class="token punctuation">/&gt;</span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>meta</span> <span class="token attr-name">name</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>viewport<span class="token punctuation">&quot;</span></span> <span class="token attr-name">content</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>width=device-width, initial-scale=1.0<span class="token punctuation">&quot;</span></span> <span class="token punctuation">/&gt;</span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>title</span><span class="token punctuation">&gt;</span></span>Document<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>title</span><span class="token punctuation">&gt;</span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>style</span><span class="token punctuation">&gt;</span></span><span class="token style"><span class="token language-css">
            <span class="token selector">canvas</span> <span class="token punctuation">{</span>
                <span class="token property">border</span><span class="token punctuation">:</span> 1px solid black<span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
        </span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>style</span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>head</span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>body</span><span class="token punctuation">&gt;</span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>canvas</span> <span class="token attr-name">id</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>mycanvas<span class="token punctuation">&quot;</span></span> <span class="token attr-name">width</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>1000<span class="token punctuation">&quot;</span></span> <span class="token attr-name">height</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>1000<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>canvas</span><span class="token punctuation">&gt;</span></span>
        //设置画布的宽高
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>body</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>html</span><span class="token punctuation">&gt;</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>js 部分</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token comment">//图片压缩，利用image对象 和canvas绘图将图像压缩</span>
window<span class="token punctuation">.</span><span class="token function-variable function">onload</span> <span class="token operator">=</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">var</span> mycanvas <span class="token operator">=</span> document<span class="token punctuation">.</span><span class="token function">getElementById</span><span class="token punctuation">(</span><span class="token string">&quot;mycanvas&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">var</span> ctx <span class="token operator">=</span> mycanvas<span class="token punctuation">.</span><span class="token function">getContext</span><span class="token punctuation">(</span><span class="token string">&quot;2d&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">var</span> img <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Image</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    img<span class="token punctuation">.</span>src <span class="token operator">=</span> <span class="token string">&quot;./实验.jpg&quot;</span><span class="token punctuation">;</span>
    img<span class="token punctuation">.</span><span class="token function-variable function">onload</span> <span class="token operator">=</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">// alert(&#39;加载完毕&#39;)</span>
        <span class="token comment">// 将图片画到canvas上面上去</span>
        ctx<span class="token punctuation">.</span><span class="token function">drawImage</span><span class="token punctuation">(</span>img<span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span> <span class="token number">500</span><span class="token punctuation">,</span> <span class="token number">500</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>base64 压缩</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token comment">//压缩base64方法</span>
<span class="token keyword">function</span> <span class="token function">dealImage</span><span class="token punctuation">(</span><span class="token parameter">base64<span class="token punctuation">,</span> w<span class="token punctuation">,</span> callback</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">var</span> newImage <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Image</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">var</span> quality <span class="token operator">=</span> <span class="token number">0.6</span><span class="token punctuation">;</span> <span class="token comment">//压缩系数0-1之间</span>
    newImage<span class="token punctuation">.</span>src <span class="token operator">=</span> base64<span class="token punctuation">;</span>
    newImage<span class="token punctuation">.</span><span class="token function">setAttribute</span><span class="token punctuation">(</span><span class="token string">&quot;crossOrigin&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;Anonymous&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">//url为外域时需要</span>
    <span class="token keyword">var</span> imgWidth<span class="token punctuation">,</span> imgHeight<span class="token punctuation">;</span>
    newImage<span class="token punctuation">.</span><span class="token function-variable function">onload</span> <span class="token operator">=</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        imgWidth <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span>width<span class="token punctuation">;</span>
        imgHeight <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span>height<span class="token punctuation">;</span>
        <span class="token keyword">var</span> canvas <span class="token operator">=</span> document<span class="token punctuation">.</span><span class="token function">createElement</span><span class="token punctuation">(</span><span class="token string">&quot;canvas&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">var</span> ctx <span class="token operator">=</span> canvas<span class="token punctuation">.</span><span class="token function">getContext</span><span class="token punctuation">(</span><span class="token string">&quot;2d&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>Math<span class="token punctuation">.</span><span class="token function">max</span><span class="token punctuation">(</span>imgWidth<span class="token punctuation">,</span> imgHeight<span class="token punctuation">)</span> <span class="token operator">&gt;</span> w<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">if</span> <span class="token punctuation">(</span>imgWidth <span class="token operator">&gt;</span> imgHeight<span class="token punctuation">)</span> <span class="token punctuation">{</span>
                canvas<span class="token punctuation">.</span>width <span class="token operator">=</span> w<span class="token punctuation">;</span>
                canvas<span class="token punctuation">.</span>height <span class="token operator">=</span> <span class="token punctuation">(</span>w <span class="token operator">*</span> imgHeight<span class="token punctuation">)</span> <span class="token operator">/</span> imgWidth<span class="token punctuation">;</span>
            <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
                canvas<span class="token punctuation">.</span>height <span class="token operator">=</span> w<span class="token punctuation">;</span>
                canvas<span class="token punctuation">.</span>width <span class="token operator">=</span> <span class="token punctuation">(</span>w <span class="token operator">*</span> imgWidth<span class="token punctuation">)</span> <span class="token operator">/</span> imgHeight<span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
            canvas<span class="token punctuation">.</span>width <span class="token operator">=</span> imgWidth<span class="token punctuation">;</span>
            canvas<span class="token punctuation">.</span>height <span class="token operator">=</span> imgHeight<span class="token punctuation">;</span>
            quality <span class="token operator">=</span> <span class="token number">0.6</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        ctx<span class="token punctuation">.</span><span class="token function">clearRect</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span> canvas<span class="token punctuation">.</span>width<span class="token punctuation">,</span> canvas<span class="token punctuation">.</span>height<span class="token punctuation">)</span><span class="token punctuation">;</span>
        ctx<span class="token punctuation">.</span><span class="token function">drawImage</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span> canvas<span class="token punctuation">.</span>width<span class="token punctuation">,</span> canvas<span class="token punctuation">.</span>height<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">var</span> base64 <span class="token operator">=</span> canvas<span class="token punctuation">.</span><span class="token function">toDataURL</span><span class="token punctuation">(</span><span class="token string">&quot;image/jpeg&quot;</span><span class="token punctuation">,</span> quality<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">//压缩语句</span>
        <span class="token function">callback</span><span class="token punctuation">(</span>base64<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">//必须通过回调函数返回，否则无法及时拿到该值</span>
    <span class="token punctuation">}</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token doc-comment comment">/**
 * 返回压缩后的base64
 * <span class="token keyword">@param</span> <span class="token parameter">file</span>
 */</span>
<span class="token keyword">export</span> <span class="token keyword">function</span> <span class="token function">getPicCompress</span><span class="token punctuation">(</span><span class="token parameter"><span class="token literal-property property">file</span><span class="token operator">:</span> File</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token punctuation">(</span>
        <span class="token keyword">new</span> <span class="token class-name">Promise</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">&lt;</span>
        string <span class="token operator">&gt;</span>
        <span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">resolve<span class="token punctuation">,</span> reject</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
            <span class="token keyword">let</span> quality <span class="token operator">=</span> <span class="token number">0.8</span><span class="token punctuation">;</span> <span class="token comment">// 压缩系数0-1之间</span>
            <span class="token keyword">let</span> reader <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">FileReader</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            reader<span class="token punctuation">.</span><span class="token function">readAsDataURL</span><span class="token punctuation">(</span>file<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token keyword">let</span> imgWidth<span class="token punctuation">;</span>
            <span class="token keyword">let</span> imgHeight<span class="token punctuation">;</span>
            reader<span class="token punctuation">.</span><span class="token function-variable function">onload</span> <span class="token operator">=</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">e</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                <span class="token keyword">let</span> <span class="token literal-property property">image</span><span class="token operator">:</span> any <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Image</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 新建一个img标签（还没嵌入DOM节点)</span>
                image<span class="token punctuation">.</span>src <span class="token operator">=</span> e<span class="token punctuation">.</span>target<span class="token punctuation">.</span>result<span class="token punctuation">;</span>
                image<span class="token punctuation">.</span><span class="token function-variable function">onload</span> <span class="token operator">=</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                    imgWidth <span class="token operator">=</span> image<span class="token punctuation">.</span>width<span class="token punctuation">;</span>
                    imgHeight <span class="token operator">=</span> image<span class="token punctuation">.</span>height<span class="token punctuation">;</span>
                    <span class="token keyword">let</span> canvas <span class="token operator">=</span> document<span class="token punctuation">.</span><span class="token function">createElement</span><span class="token punctuation">(</span><span class="token string">&quot;canvas&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                    <span class="token keyword">let</span> ctx <span class="token operator">=</span> canvas<span class="token punctuation">.</span><span class="token function">getContext</span><span class="token punctuation">(</span><span class="token string">&quot;2d&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                    <span class="token keyword">if</span> <span class="token punctuation">(</span>Math<span class="token punctuation">.</span><span class="token function">max</span><span class="token punctuation">(</span>imgWidth<span class="token punctuation">,</span> imgHeight<span class="token punctuation">)</span> <span class="token operator">&gt;</span> <span class="token number">1024</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                        <span class="token keyword">if</span> <span class="token punctuation">(</span>imgWidth <span class="token operator">&gt;</span> imgHeight<span class="token punctuation">)</span> <span class="token punctuation">{</span>
                            canvas<span class="token punctuation">.</span>width <span class="token operator">=</span> <span class="token number">1024</span><span class="token punctuation">;</span>
                            canvas<span class="token punctuation">.</span>height <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token number">1024</span> <span class="token operator">*</span> imgHeight<span class="token punctuation">)</span> <span class="token operator">/</span> imgWidth<span class="token punctuation">;</span>
                        <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
                            canvas<span class="token punctuation">.</span>height <span class="token operator">=</span> <span class="token number">1024</span><span class="token punctuation">;</span>
                            canvas<span class="token punctuation">.</span>width <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token number">1024</span> <span class="token operator">*</span> imgWidth<span class="token punctuation">)</span> <span class="token operator">/</span> imgHeight<span class="token punctuation">;</span>
                        <span class="token punctuation">}</span>
                    <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
                        canvas<span class="token punctuation">.</span>width <span class="token operator">=</span> imgWidth<span class="token punctuation">;</span>
                        canvas<span class="token punctuation">.</span>height <span class="token operator">=</span> imgHeight<span class="token punctuation">;</span>
                        quality <span class="token operator">=</span> <span class="token number">0.8</span><span class="token punctuation">;</span>
                    <span class="token punctuation">}</span>
                    ctx<span class="token punctuation">.</span><span class="token function">clearRect</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span> canvas<span class="token punctuation">.</span>width<span class="token punctuation">,</span> canvas<span class="token punctuation">.</span>height<span class="token punctuation">)</span><span class="token punctuation">;</span>
                    ctx<span class="token punctuation">.</span><span class="token function">drawImage</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span> canvas<span class="token punctuation">.</span>width<span class="token punctuation">,</span> canvas<span class="token punctuation">.</span>height<span class="token punctuation">)</span><span class="token punctuation">;</span>
                    <span class="token keyword">let</span> base64 <span class="token operator">=</span> canvas<span class="token punctuation">.</span><span class="token function">toDataURL</span><span class="token punctuation">(</span><span class="token string">&quot;image/jpeg&quot;</span><span class="token punctuation">,</span> quality<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 压缩语句</span>
                    <span class="token function">resolve</span><span class="token punctuation">(</span>base64<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 必须通过回调函数返回，否则无法及时拿到该值</span>
                <span class="token punctuation">}</span><span class="token punctuation">;</span>
                reader<span class="token punctuation">.</span><span class="token function-variable function">onerror</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token parameter">error</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token function">reject</span><span class="token punctuation">(</span>error<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span><span class="token punctuation">)</span>
    <span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>基本都是通过图片转 canvas 然后通过 toDataURL 到处低质量的图完成的压缩。</p><p>toDataURl 方法接收两个参数，返回一个包含图片展示的 data URI 。可以使用 type 参数其类型，默认为 PNG 格式。图片的分辨率为 96dpi。</p><ol><li>type 可选 图片格式，默认为 image/png</li><li>encoderOptions 可选 在指定图片格式为 image/jpeg 或 image/webp 的情况下，可以从 0 到 1 的区间内选择图片的质量。如果超出取值范围，将会使用默认值 0.92。其他参数会被忽略。</li></ol>`,13),k={href:"https://developer.mozilla.org/zh-CN/docs/Web/API/HTMLCanvasElement/toDataURL",target:"_blank",rel:"noopener noreferrer"};function r(d,v){const s=t("ExternalLinkIcon");return p(),e("div",null,[i,n("ul",null,[n("li",null,[n("a",k,[o("MDN - Canvas.toDataURl"),c(s)])])])])}const g=a(u,[["render",r],["__file","前端图片压缩方案.html.vue"]]);export{g as default};
