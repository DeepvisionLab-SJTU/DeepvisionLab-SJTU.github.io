import{_ as a,P as i,ao as e,O as t}from"./chunks/framework.N_DV59mb.js";const n="/assets/tailscale_step1.CiHThkpm.png",o="/assets/tailscale_step2.BAGnXV9f.png",l="/assets/tailscale_step3.BlTgnjZw.png",p="/assets/tailscale_step4.DDI_G29e.png",r="/assets/tailscale_step5.GZbiAzO_.png",b=JSON.parse('{"title":"How To Join Our Zerotier Network","description":"","frontmatter":{},"headers":[],"relativePath":"join-our-tailnet.md","filePath":"join-our-tailnet.md"}'),h={name:"join-our-tailnet.md"};function c(d,s,u,k,g,m){return t(),i("div",null,s[0]||(s[0]=[e(`<h1 id="how-to-join-our-zerotier-network" tabindex="-1">How To Join Our Zerotier Network <a class="header-anchor" href="#how-to-join-our-zerotier-network" aria-label="Permalink to &quot;How To Join Our Zerotier Network&quot;">​</a></h1><p>This page demonstrates the way of joining our Tailnet for Mac, Linux, Windows, iPhone, Andriod. You can access our private resources such like GPU servers, docs and any other materials when you are granted a virtual IP address by Tailnet.</p><p><strong>We remove zerotier since it may encounter some stability issues, which often resulting in connection timeout. Meanwhile, Tailnet is much easier than zerotier to configure. You only need to install it and then login in with our public account. Moreover, Tailnet provides some interesting features, such like TailDrop, a sharing tool like AirDrop.</strong></p><h2 id="download-tailscale-app" tabindex="-1">Download Tailscale APP <a class="header-anchor" href="#download-tailscale-app" aria-label="Permalink to &quot;Download Tailscale APP&quot;">​</a></h2><p>You can follow the <a href="https://tailscale.com/download/" target="_blank" rel="noreferrer">official instructions </a> to install the Tailscale APP on your devices.</p><p>You can also refer to the following steps:</p><p><strong>Linux</strong></p><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">curl</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -fsSL</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> https://tailscale.com/install.sh</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> |</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> sudo</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> sh</span></span></code></pre></div><p><strong>Mac</strong></p><div class="language-md vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">md</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">Download Link: https://pkgs.tailscale.com/stable/Tailscale-latest-macos.pkg</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">Install it as other APPs in you Mac.</span></span></code></pre></div><p><strong>Windows</strong></p><div class="language-md vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">md</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">Download Link: https://pkgs.tailscale.com/stable/tailscale-setup-latest.exe</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">Install it as other APPs in you Windows.</span></span></code></pre></div><p><strong>iPhone</strong></p><div class="language-md vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">md</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">Download Tailscale from App Store: https://apps.apple.com/us/app/tailscale/id1470499037?ls=1</span></span></code></pre></div><p><strong>Android</strong></p><div class="language-md vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">md</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">Download Tailscale from Google Play: https://play.google.com/store/apps/details?id=com.tailscale.ipn</span></span></code></pre></div><h2 id="join-self-host-moon" tabindex="-1">Join self-host Moon <a class="header-anchor" href="#join-self-host-moon" aria-label="Permalink to &quot;Join self-host Moon&quot;">​</a></h2><p><strong>Linux/Mac/Windows</strong></p><p>Run the followings on your terminal. <em>Note that Windows users should open the powershell with the administrator privilege and the &#39;sudo&#39; is not needed.</em></p><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">sudo</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> zerotier-cli</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> orbit</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> 681475fc6d</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> 681475fc6d</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># wait for 1 minute</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">sudo</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> zerotier-cli</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> listpeers</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">#check whether &#39;118.25.27.204&#39; in the output lines, for example:</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">#200 listpeers 681475fc6d 118.25.27.204/9993;263;257 5(这里可能不一样) 1.12.2 MOON</span></span></code></pre></div><h2 id="join-our-tailnet" tabindex="-1">Join Our Tailnet <a class="header-anchor" href="#join-our-tailnet" aria-label="Permalink to &quot;Join Our Tailnet&quot;">​</a></h2><ul><li><p>Open the Tailscale application and then click &#39;settings&#39;:</p><p><img src="`+n+'" alt="click settings"></p></li></ul><hr><ul><li><p>Add accounts:</p><p><img src="'+o+'" alt="add accounts"></p></li></ul><hr><ul><li><p>Login with the account we provided:</p><p><img src="'+l+'" alt="login"></p></li></ul><hr><ul><li><p>Click &#39;connect&#39; to bind your device with our account:</p><p><img src="'+p+'" alt="connect"></p></li></ul><hr><ul><li><p>Check status and you can observe that a virtual IP is assigned to your device:</p><p><img src="'+r+'" alt="check"></p></li></ul><hr><h2 id="enjoy-it" tabindex="-1">Enjoy it <a class="header-anchor" href="#enjoy-it" aria-label="Permalink to &quot;Enjoy it&quot;">​</a></h2><p>Keep it opening like other VPN apps and feel free to connect to any private resources from Deepvision Lab!</p>',33)]))}const v=a(h,[["render",c]]);export{b as __pageData,v as default};
