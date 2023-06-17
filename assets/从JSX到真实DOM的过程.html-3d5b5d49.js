import{_ as n,o as s,c as a,e as t}from"./app-00a966d3.js";const e={},p=t(`<h2 id="从jsx到真实dom的过程" tabindex="-1"><a class="header-anchor" href="#从jsx到真实dom的过程" aria-hidden="true">#</a> 从JSX到真实DOM的过程</h2><p>当我们在React中编写JSX代码时，JSX并不是直接被网页所认可和支持的，因为JSX实际上是一个JavaScript对象。所以在编译过程中，我们需要将JSX转换为真实的DOM元素，以便在网页上正确地呈现出我们所需要的内容。</p><p>这个转换的过程可以通过React的渲染函数——ReactDOM.render()来完成。在这个函数中，它接收两个参数：第一个参数是JSX代码，第二个参数是一个DOM节点，表示我们要将这个组件渲染到哪个DOM节点下。</p><p>当React开始渲染组件时，它会解析JSX代码，将其转换为一个虚拟DOM树。这个虚拟DOM树是由React所管理的，其中的每一个节点都对应着一个真实的DOM节点。在完成虚拟DOM树的构建后，React会进行一个「diff算法」，用来比较新的虚拟DOM树和旧的虚拟DOM树之间的差异。这个算法的目的是找出需要更新的那些节点，并对其进行更新。这样，React只需要更新需要改变的那些部分，而不是整个组件都重新渲染一遍。</p><p>在完成差异计算之后，React会将需要更新的那些节点转换为真实的DOM元素，并利用浏览器的API将这些元素添加到网页的DOM树中。这样我们就完成了JSX到真实DOM的转换，从而实现了网页的渲染。</p><p>过程：</p><ol><li>jsx语法最终会被Babel编译js对象</li><li>然后虚拟DOM会被React.createElement()执行并返回真实的DOM</li><li>由render方法将生成的真实DOM并挂到页面上(#app)</li></ol><p>流程：书写JSX代码 =&gt; Babel编译JSX =&gt; 编译后的JSX执行React.createElement的调用 =&gt; 传入到ReactElement方法中生成虚拟Dom =&gt; 最终返回给ReactDom.render生成真实DOM</p><p>最关键的两个函数：</p><ol><li><code>createElement</code>：接收虚拟DOM对象，参数是标签名、属性和子节点，返回一个包含标签名、属性和子节点的对象。</li><li><code>render</code>：接收一个虚拟DOM节点作为参数，返回该节点对应的真实DOM元素。 上面的 JSX 代码可以被转换为等价的 React.createElement() 调用，从而创建一个 React 元素。具体过程如下：</li></ol><h2 id="使用babel编译tsx文件" tabindex="-1"><a class="header-anchor" href="#使用babel编译tsx文件" aria-hidden="true">#</a> 使用babel编译tsx文件</h2><p>当我们写一个使用 JSX 的组件，并将其保存为 <code>example.jsx</code> 文件时，我们可以使用 Babel 进行转换，生成一个普通的 JavaScript 文件 <code>example.js</code>。以下是一个简单的方法将 <code>example.jsx</code> 转换为 <code>example.js</code>：</p><ol><li>使用 Node.js 安装 Babel 的基本依赖：</li></ol><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>npm install --save-dev @babel/core @babel/cli @babel/preset-react
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ol start="2"><li>创建一个 <code>.babelrc</code> 文件，并添加以下内容。这些将 Babel 配置为将 JSX 转换为标准的 JavaScript 代码：</li></ol><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>{
  &quot;presets&quot;: [&quot;@babel/preset-react&quot;]
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol start="3"><li>在命令行中使用以下命令将 JSX 转换为 JavaScript：</li></ol><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>npx babel example.jsx --out-file example.js
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>这将使用在第二步中定义的插件集，将 <code>example.jsx</code> 文件转换为 <code>example.js</code> 文件。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>const element = (
    &lt;div className=&quot;my-class&quot;&gt;
        &lt;p&gt;Hello, World!&lt;/p&gt;
    &lt;/div&gt;
);

// 编译后的代码
const element = React.createElement(
    &quot;div&quot;,
    { className: &quot;my-class&quot; },
    React.createElement(
        &quot;p&quot;,
        null,
        &quot;Hello, World!&quot;
    )
);
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>理解这个过程的关键是 JSX 语法只是一种语法糖。当我们使用 JSX 时，Babel 这样的工具会将 JSX 转换为普通的 JavaScript 代码，并将 React.createElement() 函数用来创建 React 元素。这些元素最终被 React 用来构建虚拟 DOM，以用于后续的渲染。由于这个过程需要在运行时进行，因此可以在浏览器中使用 JSX 语法，因为浏览器能够动态执行 JavaScript 代码。</p><h2 id="使用js模拟bebal这个过程" tabindex="-1"><a class="header-anchor" href="#使用js模拟bebal这个过程" aria-hidden="true">#</a> 使用JS模拟Bebal这个过程</h2><p>好的，以下是使用原生JS（不依赖 Babel）将 JSX 转换为 JavaScript 的步骤：</p><p>首先，我们需要将 JSX 代码包含在 HTML 文件中，以便在浏览器中运行。以下是一个示例：</p><div class="language-html line-numbers-mode" data-ext="html"><pre class="language-html"><code><span class="token doctype"><span class="token punctuation">&lt;!</span><span class="token doctype-tag">DOCTYPE</span> <span class="token name">html</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>html</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>head</span><span class="token punctuation">&gt;</span></span>
	<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>meta</span> <span class="token attr-name">charset</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>UTF-8<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>
	<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>title</span><span class="token punctuation">&gt;</span></span>JSX to JS<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>title</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>head</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>body</span><span class="token punctuation">&gt;</span></span>
	<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">id</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>root<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">&gt;</span></span>
	<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span><span class="token punctuation">&gt;</span></span><span class="token script"><span class="token language-javascript">
		<span class="token comment">// 在此处添加 JSX 代码</span>
	</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>body</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>html</span><span class="token punctuation">&gt;</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>接下来，我们需要在页面中添加一个 JavaScript 脚本来将 JSX 转换为标准的 JavaScript 代码。这是一个过程：</p><ol><li><p>创建一个函数，将 JSX 代码作为其输入参数。</p></li><li><p>创建一个新的 <code>div</code> 元素，并将其添加到文档的根节点中。</p></li><li><p>将 JSX 代码中的标签名称转换为标准的 HTML 元素名称。</p></li><li><p>将 JSX 中的所有属性名称转换为标准的 HTML 属性名称。</p></li><li><p>将 JSX 中的所有属性值添加到 HTML 元素的属性中。</p></li><li><p>递归遍历所有子元素，并将它们添加到 HTML 元素中。</p></li><li><p>将生成的 HTML 元素添加到根节点中。</p></li></ol><p>以下是示例代码：</p><div class="language-html line-numbers-mode" data-ext="html"><pre class="language-html"><code><span class="token doctype"><span class="token punctuation">&lt;!</span><span class="token doctype-tag">DOCTYPE</span> <span class="token name">html</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>html</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>head</span><span class="token punctuation">&gt;</span></span>
	<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>meta</span> <span class="token attr-name">charset</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>UTF-8<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>
	<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>title</span><span class="token punctuation">&gt;</span></span>JSX to JS<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>title</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>head</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>body</span><span class="token punctuation">&gt;</span></span>
	<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">id</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>root<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">&gt;</span></span>
	<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span><span class="token punctuation">&gt;</span></span><span class="token script"><span class="token language-javascript">
		<span class="token comment">// 1. 创建一个将 JSX 代码转换为 HTML 元素的函数</span>
		<span class="token keyword">function</span> <span class="token function">jsxToHTMLElement</span><span class="token punctuation">(</span><span class="token parameter">jsxCode</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
			<span class="token comment">// 2. 创建一个新的 div 元素</span>
			<span class="token keyword">const</span> element <span class="token operator">=</span> document<span class="token punctuation">.</span><span class="token function">createElement</span><span class="token punctuation">(</span><span class="token string">&#39;div&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

			<span class="token comment">// 3. 获取标签名称（用于创建 HTML 元素）</span>
			<span class="token keyword">const</span> tagName <span class="token operator">=</span> jsxCode<span class="token punctuation">.</span><span class="token function">match</span><span class="token punctuation">(</span><span class="token regex"><span class="token regex-delimiter">/</span><span class="token regex-source language-regex">(?:&lt;)([a-zA-Z]+)</span><span class="token regex-delimiter">/</span></span><span class="token punctuation">)</span><span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">.</span><span class="token function">toLowerCase</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

			<span class="token comment">// 4. 获取所有属性，并将它们添加到 HTML 元素中</span>
			<span class="token keyword">const</span> attributes <span class="token operator">=</span> jsxCode<span class="token punctuation">.</span><span class="token function">match</span><span class="token punctuation">(</span><span class="token regex"><span class="token regex-delimiter">/</span><span class="token regex-source language-regex">(?:&lt;+[a-zA-Z]+)([a-zA-Z \\-]+=[&#39;&quot;][^&quot;&#39;]*[&quot;&#39;])+</span><span class="token regex-delimiter">/</span></span><span class="token punctuation">)</span><span class="token punctuation">;</span>
			<span class="token keyword">if</span> <span class="token punctuation">(</span>attributes<span class="token punctuation">)</span> <span class="token punctuation">{</span>
				<span class="token comment">// 将所有属性名称和值添加到 HTML 元素中</span>
				attributes<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">.</span><span class="token function">match</span><span class="token punctuation">(</span><span class="token regex"><span class="token regex-delimiter">/</span><span class="token regex-source language-regex">([a-zA-Z\\-]+)=[&quot;&#39;]?([^&quot;&#39;]*)</span><span class="token regex-delimiter">/</span><span class="token regex-flags">g</span></span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">forEach</span><span class="token punctuation">(</span><span class="token parameter">attr</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
					<span class="token keyword">const</span> <span class="token punctuation">[</span>name<span class="token punctuation">,</span> value<span class="token punctuation">]</span> <span class="token operator">=</span> attr<span class="token punctuation">.</span><span class="token function">split</span><span class="token punctuation">(</span><span class="token string">&#39;=&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
					element<span class="token punctuation">.</span><span class="token function">setAttribute</span><span class="token punctuation">(</span>name<span class="token punctuation">,</span> value<span class="token punctuation">.</span><span class="token function">replace</span><span class="token punctuation">(</span><span class="token regex"><span class="token regex-delimiter">/</span><span class="token regex-source language-regex">&quot;</span><span class="token regex-delimiter">/</span><span class="token regex-flags">g</span></span><span class="token punctuation">,</span> <span class="token string">&#39;&#39;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
				<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
			<span class="token punctuation">}</span>

			<span class="token comment">// 5. 将所有子元素逐个转换为 HTML 元素，并将它们添加到当前元素中</span>
			<span class="token keyword">const</span> children <span class="token operator">=</span> jsxCode<span class="token punctuation">.</span><span class="token function">match</span><span class="token punctuation">(</span><span class="token regex"><span class="token regex-delimiter">/</span><span class="token regex-source language-regex">(?:&gt;)([\\s\\S]*)(?:&lt;\\/)</span><span class="token regex-delimiter">/</span></span><span class="token punctuation">)</span><span class="token punctuation">;</span>
			<span class="token keyword">if</span> <span class="token punctuation">(</span>children<span class="token punctuation">)</span> <span class="token punctuation">{</span>
				children<span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">.</span><span class="token function">trim</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">split</span><span class="token punctuation">(</span><span class="token regex"><span class="token regex-delimiter">/</span><span class="token regex-source language-regex">(?=&lt;)</span><span class="token regex-delimiter">/</span></span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">forEach</span><span class="token punctuation">(</span><span class="token parameter">child</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
					<span class="token keyword">const</span> childElement <span class="token operator">=</span> <span class="token function">jsxToHTMLElement</span><span class="token punctuation">(</span>child<span class="token punctuation">)</span><span class="token punctuation">;</span>
					element<span class="token punctuation">.</span><span class="token function">appendChild</span><span class="token punctuation">(</span>childElement<span class="token punctuation">)</span><span class="token punctuation">;</span>
				<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
			<span class="token punctuation">}</span>

			<span class="token comment">// 6. 返回生成的 HTML 元素</span>
			<span class="token keyword">return</span> element<span class="token punctuation">;</span>
		<span class="token punctuation">}</span>

		<span class="token comment">// 7. 调用 jsxToHTMLElement() 函数将 JSX 代码转换为 HTML 元素，并将其添加到页面中</span>
		<span class="token keyword">const</span> jsxCode <span class="token operator">=</span> <span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">
			&lt;div&gt;
				&lt;h1 class=&quot;title&quot;&gt;Hello, World!&lt;/h1&gt;
				&lt;p&gt;This is some text.&lt;/p&gt;
			&lt;/div&gt;
		</span><span class="token template-punctuation string">\`</span></span><span class="token punctuation">;</span>
		<span class="token keyword">const</span> rootElement <span class="token operator">=</span> document<span class="token punctuation">.</span><span class="token function">getElementById</span><span class="token punctuation">(</span><span class="token string">&#39;root&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
		<span class="token keyword">const</span> htmlElement <span class="token operator">=</span> <span class="token function">jsxToHTMLElement</span><span class="token punctuation">(</span>jsxCode<span class="token punctuation">)</span><span class="token punctuation">;</span>
		rootElement<span class="token punctuation">.</span><span class="token function">appendChild</span><span class="token punctuation">(</span>htmlElement<span class="token punctuation">)</span><span class="token punctuation">;</span>
	</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>body</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>html</span><span class="token punctuation">&gt;</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>总之，这是一种使用原生JS将JSX转换为JavaScript的基本方法，尽管这种方法在复杂的JSX中可能不太实用。 在实际项目中，您应该使用专门为此目的构建的库（例如React）。</p>`,30),l=[p];function c(o,i){return s(),a("div",null,l)}const d=n(e,[["render",c],["__file","从JSX到真实DOM的过程.html.vue"]]);export{d as default};
