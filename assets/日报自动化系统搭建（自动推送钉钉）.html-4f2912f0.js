import{_ as e,o as n,c as s,e as d}from"./app-26157173.js";const i={},a=d(`<h1 id="日报自动化系统-从-0-到每天-7-30-自动推送钉钉日报" tabindex="-1"><a class="header-anchor" href="#日报自动化系统-从-0-到每天-7-30-自动推送钉钉日报" aria-hidden="true">#</a> 日报自动化系统：从 0 到每天 7:30 自动推送钉钉日报</h1><blockquote><p>一套跑在群晖 NAS 上的自动日报系统：每天早上 7:30，自动抓取若干行业公众号 24 小时内的文章，AI 生成一段话摘要，渲染成海报长图和网页版日报，推送到钉钉群。</p><p>本文中的域名、IP、端口、目录、容器名等均为脱敏后的示例值，替换为自己的即可。</p></blockquote><hr><h2 id="一、最终效果" tabindex="-1"><a class="header-anchor" href="#一、最终效果" aria-hidden="true">#</a> 一、最终效果</h2><p>每天早上 7:30，钉钉群里收到一条消息：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>📰 行业日报 2026-10-24

【今日海报】
https://your-nas.synology.me:18080/report_20261024.png   ← 点击看长图

1. 【某公众号】文章标题……
   一段话摘要。原文：https://mp.weixin.qq.com/s/xxxx
2. ……
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>海报：所有文章浓缩成一张长图，手机点开即看</li><li>网页版：<code>report_doc_YYYYMMDD.html</code>，排版完整可转发</li><li>全程无人工干预，NAS 断电重启后自动恢复</li></ul><hr><h2 id="二、整体架构" tabindex="-1"><a class="header-anchor" href="#二、整体架构" aria-hidden="true">#</a> 二、整体架构</h2><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>┌──────────────────────── 群晖 NAS（Docker） ────────────────────────┐
│                                                                    │
│  ┌──────────────┐        ┌─────────────────────────────────────┐  │
│  │  we-mp-rss    │        │  daily-report 容器（自建）            │  │
│  │  容器          │        │                                     │  │
│  │  微信公众号    │◄───────│  scheduler.py（常驻，7:30 触发）      │  │
│  │  → RSS 服务    │  内部   │      │ 每天 07:30                   │  │
│  │  端口 8001     │  网络   │      ▼                             │  │
│  └──────────────┘        │  pipeline.py（一次跑完 5 步）：      │  │
│                          │   1. sync_source 同步订阅源          │  │
│                          │   2. fetch_rss    抓 24h 内文章      │  │
│                          │   3. summarize    AI 一段话总结      │  │
│                          │   4. render       画海报长图          │  │
│                          │   5. push         推送钉钉            │  │
│                          │                                     │  │
│                          │  另内嵌一个静态文件服务（端口 8080）    │  │
│                          │  → 海报 PNG / 日报 HTML 可被访问      │  │
└──────────────────────────┼─────────────────────────────────────┘
                           │
              ①内网：http://192.168.1.100:8080/report_xxx.png
              ②公网：http://your-nas.synology.me:18080/report_xxx.png
                     （DDNS 域名 + 路由器端口转发 18080→8080）
                           │
                           ▼
                    钉钉群机器人
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>一句话概括：<strong>we-mp-rss 负责「把微信公众号变成 RSS」，日报容器负责「把 RSS 变成日报」，scheduler 负责「每天准时跑」。</strong></p><hr><h2 id="三、实现原理-逐层拆解" tabindex="-1"><a class="header-anchor" href="#三、实现原理-逐层拆解" aria-hidden="true">#</a> 三、实现原理（逐层拆解）</h2><h3 id="_1-微信公众号抓取为什么难" tabindex="-1"><a class="header-anchor" href="#_1-微信公众号抓取为什么难" aria-hidden="true">#</a> 1. 微信公众号抓取为什么难？</h3><p>微信公众号没有公开 API，直接爬会被封。本方案用 <strong>we-mp-rss</strong>（开源项目）中转：</p><ul><li>部署一个 we-mp-rss 容器，登录对应的账号通道</li><li>把要监控的公众号加入采集列表，we-mp-rss 自动采集它们的最新文章</li><li>对外输出标准 RSS 格式，后续程序就能像读普通网站一样读公众号了</li></ul><p>采集通道选用可免关注、免自有公众号平台登录的那一种：只要采集列表里加了这个号就能采。</p><h3 id="_2-怎么抓到「24-小时内」的文章" tabindex="-1"><a class="header-anchor" href="#_2-怎么抓到「24-小时内」的文章" aria-hidden="true">#</a> 2. 怎么抓到「24 小时内」的文章？</h3><p>RSS 里的每篇文章都带发布时间。<code>fetch_rss.py</code> 拿到全部文章后，按时间过滤：只留 <code>发布时间 &gt; 现在 - 24小时</code> 的。没有新文章就跳过，不凑数。</p><h3 id="_3-ai-摘要怎么生成" tabindex="-1"><a class="header-anchor" href="#_3-ai-摘要怎么生成" aria-hidden="true">#</a> 3. AI 摘要怎么生成？</h3><p><code>summarize.py</code> 把每篇文章的正文开头部分发给大模型 API，提示词就一句话：「用一段话（80 字内）总结这篇文章的核心信息」。产出摘要列表，供海报和钉钉消息使用。</p><h3 id="_4-海报长图怎么画的" tabindex="-1"><a class="header-anchor" href="#_4-海报长图怎么画的" aria-hidden="true">#</a> 4. 海报长图怎么画的？</h3><p><code>render.py</code> 用 Python 的 Pillow 库直接画：</p><ol><li>新建一张白底长图（宽度 1080px，高度按内容自动算）</li><li>画标题、日期、逐条画「标题 + 摘要 + 来源」</li><li>中文字体从挂载目录读（如 msyh.ttc），避免容器里装字体</li><li>保存为 <code>data/report_YYYYMMDD.png</code></li></ol><h3 id="_5-每天准时执行-不是-cron-是常驻程序" tabindex="-1"><a class="header-anchor" href="#_5-每天准时执行-不是-cron-是常驻程序" aria-hidden="true">#</a> 5. 每天准时执行：不是 cron，是常驻程序</h3><p>NAS 容器里没有 Windows 那样的计划任务界面，这里用最朴素的原理——<strong>程序不退出，自己算时间</strong>：</p><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token comment"># scheduler.py 核心逻辑（简化）</span>
<span class="token keyword">while</span> <span class="token boolean">True</span><span class="token punctuation">:</span>
    next_run <span class="token operator">=</span> 明天 <span class="token number">07</span><span class="token punctuation">:</span><span class="token number">30</span> 的时刻
    sleep<span class="token punctuation">(</span>距离 next_run 的秒数<span class="token punctuation">)</span>      <span class="token comment"># 睡到点</span>
    subprocess<span class="token punctuation">.</span>run<span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token string">&quot;python&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;pipeline.py&quot;</span><span class="token punctuation">]</span><span class="token punctuation">)</span>   <span class="token comment"># 起子进程跑全流程</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>容器启动时 <code>CMD [&quot;python&quot;, &quot;scheduler.py&quot;]</code>，这个进程永远活着</li><li><code>restart: unless-stopped</code> 保证 NAS 重启后容器自动拉起，时钟继续</li><li>没有做 7:30 错过补跑（故意保持简单，当晚手动触发一次即可）</li></ul><h3 id="_6-钉钉图片为什么不显示-本方案最关键的坑" tabindex="-1"><a class="header-anchor" href="#_6-钉钉图片为什么不显示-本方案最关键的坑" aria-hidden="true">#</a> 6. 钉钉图片为什么不显示？（本方案最关键的坑）</h3><p>钉钉机器人的 markdown 消息里，<code>![](图片地址)</code> 这张图是<strong>每个员工的手机客户端去下载</strong>的——手机不在你家局域网，所以 <code>http://192.168.1.100:8080/xxx.png</code> 这种内网地址在别人手机上就是裂图。</p><p>解决思路：让海报有一个<strong>公网可达的地址</strong>，分两步：</p><p><strong>① DDNS —— 解决「IP 会变」</strong></p><p>家庭宽带的公网 IP 隔几天就变。群晖 DSM「控制面板 → 外部访问 → DDNS」注册免费域名（如 <code>your-nas.synology.me</code>），群晖自动把当前 IP 同步上去。域名永远不变，指向自动跟随。</p><p><strong>② 端口转发 —— 解决「外网进不来」</strong></p><p>家用路由器默认挡住外部访问。在路由器加一条规则：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>外网访问 18080 端口  →  转发给内网 192.168.1.100 的 8080 端口
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>于是手机流量访问 <code>http://your-nas.synology.me:18080/report_20261024.png</code>，实际命中的就是 NAS 上海报的静态服务。</p><blockquote><p>注意：群晖 QuickConnect（<code>xxx.quickconnect.cn</code>）只能代理群晖自家服务，不能代理 Docker 自定义端口，所以这条路走不通，必须端口转发。</p></blockquote><h3 id="_7-静态文件服务从哪来" tabindex="-1"><a class="header-anchor" href="#_7-静态文件服务从哪来" aria-hidden="true">#</a> 7. 静态文件服务从哪来？</h3><p>日报容器里的 <code>scheduler.py</code> 在空闲时顺手开了一个微型 HTTP 服务（Python 标准库，20 行），把海报输出目录当网站根目录，监听 8080。不需要 Nginx，够用。</p><hr><h2 id="四、文件结构" tabindex="-1"><a class="header-anchor" href="#四、文件结构" aria-hidden="true">#</a> 四、文件结构</h2><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>daily-report-nas/
├── docker-compose.yml     # 两个容器：we-mp-rss + daily-report
├── Dockerfile             # 日报镜像（python:3.12-slim + pillow）
├── .env                   # 钉钉 webhook、图片公网地址模板、账号
├── fonts/                 # 中文字体（挂载进容器）
├── app/
│   ├── scheduler.py       # 常驻调度 + 静态文件服务（容器入口）
│   ├── pipeline.py        # 每日全流程编排（5 步串联）
│   ├── sync_source.py     # 同步订阅源
│   ├── fetch_rss.py       # 抓 RSS、过滤 24h、解析正文
│   ├── summarize.py       # AI 摘要
│   ├── render.py          # 画海报长图
│   ├── render_doc.py      # 生成网页版日报
│   ├── push.py            # 推送钉钉（markdown，含自定义关键词）
│   └── add_mp.py          # 手动添加公众号：python add_mp.py &lt;文章链接&gt;
└── data/                  # 海报 PNG、日报 HTML、配置数据
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><hr><h2 id="五、日常操作备忘" tabindex="-1"><a class="header-anchor" href="#五、日常操作备忘" aria-hidden="true">#</a> 五、日常操作备忘</h2><table><thead><tr><th>想做什么</th><th>怎么做</th></tr></thead><tbody><tr><td>手动立即推一次</td><td>SSH 到 NAS，<code>cd /volume1/docker/daily-report &amp;&amp; sh run_later.sh 5</code>（5 秒后执行）</td></tr><tr><td>加一个公众号</td><td>复制任意该号文章链接，<code>python add_mp.py &lt;链接&gt;</code>，或 we-mp-rss 面板粘贴链接添加（自动跟随）</td></tr><tr><td>去掉某个公众号</td><td>we-mp-rss 面板删除该订阅，下次运行自动出局</td></tr><tr><td>看运行日志</td><td><code>docker logs --tail 100 daily-report</code>，或查看 <code>run.log</code></td></tr><tr><td>改推送时间</td><td><code>.env</code> 里改 <code>RUN_AT=07:30</code>，然后 <code>docker compose up -d daily-report</code> 重建</td></tr><tr><td>验证海报公网可达</td><td>浏览器（手机流量）开 <code>http://your-nas.synology.me:18080/report_今日日期.png</code></td></tr></tbody></table><hr><h2 id="六、已知边界" tabindex="-1"><a class="header-anchor" href="#六、已知边界" aria-hidden="true">#</a> 六、已知边界</h2><ul><li><strong>7:30 不补跑</strong>：如果 7:30 时 NAS 关机/断网，当天就跳过（可手动 <code>run_later.sh</code> 补）</li><li><strong>无公网 IPv4 的宽带跑不通公网图片</strong>：如果运营商给的是大内网地址（100.64.x.x），需打客服电话申请公网 IP</li><li><strong>采集通道依赖第三方账号</strong>：账号失效需到 we-mp-rss 面板（<code>http://192.168.1.100:4000</code>）重新登录</li><li><strong>钉钉机器人有频率限制</strong>：每分钟 20 条，正常单条日报远够用</li></ul><hr><p><em>文中涉及的内网 IP、域名、端口与部署路径均为示例，请按自己的环境替换。</em></p>`,51),r=[a];function l(t,c){return n(),s("div",null,r)}const p=e(i,[["render",l],["__file","日报自动化系统搭建（自动推送钉钉）.html.vue"]]);export{p as default};
