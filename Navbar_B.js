// (function() {
//     const navId = 'linkly-dark-nav';
//     if (document.getElementById(navId)) return;

//     // 1. 核心数据 (与浅色版一致)
//     const menus = {
//         p: [{n:'智能名片 · 基础版',u:'Shop_General.html#essential'}, {n:'智能名片 · 半定制版',u:'Shop_General.html#studio'}, {n:'智能名片 · 全定制版',u:'Shop_General.html#bespoke'}, {n:'软件会员',u:'Shop_General.html#saas'}],
//         f: [{n:'功能概览',u:'Product.html'}, {n:'Linkly AI',u:'AI_Detailed_2.html'}, {n:'Linkly 企业版',u:'B_Detailed_2black_WordPolish.html'}],
//         s: [{n:'应用下载',u:'Download.html'}, {n:'使用说明',u:'User_Guide.html'}, {n:'技术详情',u:'Tech_Spec.html'}, {n:'常见问题',u:'QA.html'}, {n:'联系我们',u:'Contact_Us.html'}]
//     };

//     // 2. 注入深色版强力 CSS
//     const style = document.createElement('style');
//     style.innerHTML = `
//         #${navId} { font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", sans-serif; -webkit-font-smoothing: antialiased; }
//         .glass-nav-dark { background: rgba(22, 22, 23, 0.8) !important; backdrop-filter: blur(20px) !important; -webkit-backdrop-filter: blur(20px) !important; border-bottom: 1px solid rgba(255, 255, 255, 0.1) !important; }

//         /* PC 端悬停逻辑优化版 */
//         @media (min-width: 768px) {
//             .mobile-only { display: none !important; }
            
//             .nav-group:hover .dropdown-card { 
//                 opacity: 1 !important; 
//                 visibility: visible !important; 
//                 transform: translateX(-50%) translateY(0) !important; /* 回归原位 */
//                 pointer-events: auto !important; /* 开启交互 */
//             }

//             .dropdown-card {
//                 position: absolute !important;
//                 top: 100% !important; /* 紧贴导航栏底部 */
//                 left: 50% !important;
//                 /* 初始状态：稍微向下位移 + 缩短位移距离提高丝滑度 */
//                 transform: translateX(-50%) translateY(8px) !important; 
//                 opacity: 0 !important;
//                 visibility: hidden !important;
//                 /* 关键优化：缩短时间，分离 transition 属性 */
//                 transition: opacity 0.15s ease-out, transform 0.15s ease-out, visibility 0.15s !important;
//                 z-index: 50 !important;
//                 padding-top: 12px !important; /* 桥接间隙，防止鼠标滑过中断 */
//                 pointer-events: none !important; /* 隐藏时禁止拦截鼠标 */
//             }
//         }

//         /* 移动端侧滑逻辑 (深色主题) */
//         @media (max-width: 767px) {
//             .pc-only { display: none !important; }
//             .u-m-item { display: flex; justify-content: space-between; align-items: center; padding: 16px 0; border-bottom: 1px solid #333; font-size: 17px; color: #f5f5f7; cursor: pointer; }
//             .u-sub-item { display: block; padding: 16px 0; border-bottom: 1px solid #333; font-size: 17px; color: #f5f5f7; text-decoration: none; }
//             .u-back-text { color: #86868b !important; font-size: 17px; display: flex; align-items: center; gap: 8px; padding: 16px 0; border-bottom: 1px solid #333; cursor: pointer; }
//         }

//         .buy-btn-dark { background-color: #ffffff !important; color: #000000 !important; padding: 4px 12px; border-radius: 20px; font-size: 12px; text-decoration: none; font-weight: 500; transition: all 0.3s; }
//         .buy-btn-dark:hover { background-color: #2997ff !important; color: white !important; }
//     `;
//     document.head.appendChild(style);

//     // 3. 构建 HTML (深色版)
//     const nav = document.createElement('nav');
//     nav.id = navId;
//     nav.className = 'fixed top-0 w-full z-[10000] glass-nav-dark';
//     nav.style.height = '48px';

//     nav.innerHTML = `
//         <div class="max-w-[980px] mx-auto px-6 h-full flex items-center justify-between">
//             <a href="index.html" class="flex items-center"><img src="Logo/darkBGver.png" style="height: 22px;"></a>
            
//             <div class="pc-only hidden md:flex items-center gap-8 h-full">
//                 <div class="nav-group relative h-full flex items-center">
//                     <a href="Product.html" style="color: #e8e8ed; font-size: 0.875rem; text-decoration: none; transition: color 0.3s;" onmouseover="this.style.color='#2997ff'" onmouseout="this.style.color='#e8e8ed'" class="py-4">产品</a>
//                     <div class="dropdown-card">
//                         <div class="bg-[#161617]/90 backdrop-blur-xl border border-white/10 rounded-xl shadow-2xl p-2 min-w-[150px] flex flex-col gap-1">
//                             <a href="Shop_General.html#essential" class="block px-4 py-2.5 text-[13px] text-[#e8e8ed] hover:bg-white/10 hover:text-[#2997ff] rounded-lg text-center whitespace-nowrap" style="text-decoration:none;">智能名片·基础版</a>
//                             <a href="Shop_General.html#studio" class="block px-4 py-2.5 text-[13px] text-[#e8e8ed] hover:bg-white/10 hover:text-[#2997ff] rounded-lg text-center whitespace-nowrap" style="text-decoration:none;">智能名片·半定制版</a>
//                             <a href="Shop_General.html#bespoke" class="block px-4 py-2.5 text-[13px] text-[#e8e8ed] hover:bg-white/10 hover:text-[#2997ff] rounded-lg text-center whitespace-nowrap" style="text-decoration:none;">智能名片·全定制版</a>
//                             <a href="Shop_General.html#saas" class="block px-4 py-2.5 text-[13px] text-[#e8e8ed] hover:bg-white/10 hover:text-[#2997ff] rounded-lg text-center whitespace-nowrap" style="text-decoration:none;">软件会员</a>
//                         </div>
//                     </div>
//                 </div>
//                 <div class="nav-group relative h-full flex items-center">
//                     <a href="Product.html" style="color: #e8e8ed; font-size: 0.875rem; text-decoration: none; transition: color 0.3s;" onmouseover="this.style.color='#2997ff'" onmouseout="this.style.color='#e8e8ed'" class="py-4">功能</a>
//                     <div class="dropdown-card">
//                         <div class="bg-[#161617]/90 backdrop-blur-xl border border-white/10 rounded-xl shadow-2xl p-2 min-w-[140px] flex flex-col gap-1">
//                             <a href="Product.html" class="block px-4 py-2.5 text-[13px] text-[#e8e8ed] hover:bg-white/10 hover:text-[#2997ff] rounded-lg text-center" style="text-decoration:none;">功能概览</a>
//                             <a href="AI_Detailed_2.html" class="block px-4 py-2.5 text-[13px] text-[#e8e8ed] hover:bg-white/10 hover:text-[#2997ff] rounded-lg text-center" style="text-decoration:none;">Linkly AI</a>
//                             <a href="B_Detailed_2black_WordPolish.html" class="block px-4 py-2.5 text-[13px] text-[#e8e8ed] hover:bg-white/10 hover:text-[#2997ff] rounded-lg text-center" style="text-decoration:none;">Linkly 企业版</a>
//                         </div>
//                     </div>
//                 </div>
//                 <a href="Scene.html" style="color: #e8e8ed; font-size: 0.875rem; text-decoration: none; transition: color 0.3s;" onmouseover="this.style.color='#2997ff'" onmouseout="this.style.color='#e8e8ed'">使用场景</a>
//                 <a href="VIP_Compare_2.html" style="color: #e8e8ed; font-size: 0.875rem; text-decoration: none; transition: color 0.3s;" onmouseover="this.style.color='#2997ff'" onmouseout="this.style.color='#e8e8ed'">定价</a>
//                 <div class="nav-group relative h-full flex items-center">
//                     <a href="Download.html" style="color: #e8e8ed; font-size: 0.875rem; text-decoration: none; transition: color 0.3s;" onmouseover="this.style.color='#2997ff'" onmouseout="this.style.color='#e8e8ed'" class="py-4">支持</a>
//                     <div class="dropdown-card">
//                         <div class="bg-[#161617]/90 backdrop-blur-xl border border-white/10 rounded-xl shadow-2xl p-2 min-w-[140px] flex flex-col gap-1">
//                             <a href="Download.html" class="block px-4 py-2.5 text-[13px] text-[#e8e8ed] hover:bg-white/10 hover:text-[#2997ff] rounded-lg text-center" style="text-decoration:none;">应用下载</a>
//                             <a href="User_Guide.html" class="block px-4 py-2.5 text-[13px] text-[#e8e8ed] hover:bg-white/10 hover:text-[#2997ff] rounded-lg text-center" style="text-decoration:none;">使用说明</a>
//                             <a href="Tech_Spec.html" class="block px-4 py-2.5 text-[13px] text-[#e8e8ed] hover:bg-white/10 hover:text-[#2997ff] rounded-lg text-center" style="text-decoration:none;">技术详情</a>
//                             <a href="QA.html" class="block px-4 py-2.5 text-[13px] text-[#e8e8ed] hover:bg-white/10 hover:text-[#2997ff] rounded-lg text-center" style="text-decoration:none;">常见问题</a>
//                             <a href="Contact_Us.html" class="block px-4 py-2.5 text-[13px] text-[#e8e8ed] hover:bg-white/10 hover:text-[#2997ff] rounded-lg text-center" style="text-decoration:none;">联系我们</a>
//                         </div>
//                     </div>
//                 </div>
//             </div>

//             <div class="flex items-center gap-4">
//                 <a href="ShopBag.html" style="color:#e8e8ed;"><svg width="17" height="17" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"/></svg></a>
//                 <a href="Shop_General.html" class="buy-btn-dark">购买</a>
//                 <a href="https://linkly.solutions" class="pc-only hidden md:block text-[#e8e8ed] text-[13px] hover:text-[#2997ff] transition-all" style="text-decoration:none;">登录</a>
                
//                 <div id="u-toggle-dark" class="m-only cursor-pointer flex items-center" style="color:#e8e8ed; padding:4px;">
//                     <svg id="u-icon-dark" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.2" viewBox="0 0 24 24"><path d="M4 6h16M4 12h16M4 18h16"/></svg>
//                 </div>
//             </div>
//         </div>

//         <div id="u-overlay-dark" style="position:fixed; top:48px; left:0; width:100%; height:100vh; background:#161617; display:none; overflow:hidden;">
//             <div id="u-slider-dark" style="display:flex; width:200%; height:100%; transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);">
//                 <div style="width:50%; padding:0 40px; box-sizing:border-box;">
//                     <div class="u-m-item" onclick="window.uShowB('p')">产品 <svg width="12" height="12" stroke="#666" stroke-width="1.2" fill="none"><path d="M5 2l5 5-5 5"/></svg></div>
//                     <div class="u-m-item" onclick="window.uShowB('f')">功能 <svg width="12" height="12" stroke="#666" stroke-width="1.2" fill="none"><path d="M5 2l5 5-5 5"/></svg></div>
//                     <a href="Scene.html" class="u-m-item" style="text-decoration:none">使用场景</a>
//                     <a href="VIP_Compare_2.html" class="u-m-item" style="text-decoration:none">定价</a>
//                     <div class="u-m-item" onclick="window.uShowB('s')">支持 <svg width="12" height="12" stroke="#666" stroke-width="1.2" fill="none"><path d="M5 2l5 5-5 5"/></svg></div>
//                     <a href="https://linkly.solutions" style="display:block;margin-top:32px;color:#2997ff;text-decoration:none;font-size:17px;">登录账户</a>
//                 </div>
//                 <div style="width:50%; padding:0 40px; box-sizing:border-box; background:#161617;">
//                     <div onclick="window.uBackB()" class="u-back-text"><svg width="14" height="14" stroke="#86868b" stroke-width="1.2" fill="none"><path d="M9 12l-5-5 5-5"/></svg> 返回</div>
//                     <div id="u-sub-content-dark"></div>
//                 </div>
//             </div>
//         </div>
//     </nav>
//     `;

//     // 4. 逻辑控制
//     window.uShowB = (k) => {
//         document.getElementById('u-sub-content-dark').innerHTML = menus[k].map(i => `<a href="${i.u}" class="u-sub-item">${i.n}</a>`).join('');
//         document.getElementById('u-slider-dark').style.transform = 'translateX(-50%)';
//     };
//     window.uBackB = () => document.getElementById('u-slider-dark').style.transform = 'translateX(0)';

//     function mount() {
//         document.body.prepend(nav);
//         const btn = document.getElementById('u-toggle-dark');
//         const overlay = document.getElementById('u-overlay-dark');
//         const icon = document.getElementById('u-icon-dark');
        
//         btn.onclick = () => {
//             const isOpen = overlay.style.display === 'block';
//             overlay.style.display = isOpen ? 'none' : 'block';
//             document.body.style.overflow = isOpen ? '' : 'hidden';
//             icon.innerHTML = isOpen ? '<path d="M4 6h16M4 12h16M4 18h16"/>' : '<path d="M18 6L6 18M6 6l12 12"/>';
//             if (isOpen) window.uBackB();
//         };
//     }

//     if (document.body) mount(); else window.addEventListener('DOMContentLoaded', mount);
// })();
















(function() {
    const navId = 'linkly-dark-nav';
    if (document.getElementById(navId)) return;

    // 1. 核心数据 (与浅色版一致)
    const menus = {
        p: [{n:'智能名片 · 基础版',u:'Shop_General.html#essential'}, {n:'智能名片 · 半定制版',u:'Shop_General.html#studio'}, {n:'智能名片 · 全定制版',u:'Shop_General.html#bespoke'}, {n:'软件会员',u:'Shop_General.html#saas'}],
        f: [{n:'功能概览',u:'Product.html'}, {n:'Linkly AI',u:'AI_Detailed_2.html'}, {n:'Linkly 企业版',u:'B_Detailed_2black_WordPolish.html'}],
        s: [{n:'应用下载',u:'Download.html'}, {n:'使用说明',u:'User_Guide.html'}, {n:'技术详情',u:'Tech_Spec.html'}, {n:'常见问题',u:'QA.html'}, {n:'联系我们',u:'Contact_Us.html'}]
    };

    // 2. 注入深色版强力 CSS
    const style = document.createElement('style');
    style.innerHTML = `
        #${navId} { font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", sans-serif; -webkit-font-smoothing: antialiased; }
        .glass-nav-dark { background: rgba(22, 22, 23, 0.8) !important; backdrop-filter: blur(20px) !important; -webkit-backdrop-filter: blur(20px) !important; border-bottom: 1px solid rgba(255, 255, 255, 0.1) !important; }

        /* PC 端悬停逻辑优化版 */
        @media (min-width: 768px) {
            .mobile-only { display: none !important; } /* 强制在 PC 端隐藏三道杠图标 */
            
            .nav-group:hover .dropdown-card { 
                opacity: 1 !important; 
                visibility: visible !important; 
                transform: translateX(-50%) translateY(0) !important; 
                pointer-events: auto !important; 
            }

            .dropdown-card {
                position: absolute !important;
                top: 100% !important; 
                left: 50% !important;
                transform: translateX(-50%) translateY(8px) !important; 
                opacity: 0 !important;
                visibility: hidden !important;
                transition: opacity 0.15s ease-out, transform 0.15s ease-out, visibility 0.15s !important;
                z-index: 50 !important;
                padding-top: 12px !important; 
                pointer-events: none !important; 
            }
        }

        /* 移动端侧滑逻辑 (深色主题) */
        @media (max-width: 767px) {
            .pc-only { display: none !important; }
            .u-m-item { display: flex; justify-content: space-between; align-items: center; padding: 16px 0; border-bottom: 1px solid #333; font-size: 17px; color: #f5f5f7; cursor: pointer; }
            .u-sub-item { display: block; padding: 16px 0; border-bottom: 1px solid #333; font-size: 17px; color: #f5f5f7; text-decoration: none; }
            .u-back-text { color: #86868b !important; font-size: 17px; display: flex; align-items: center; gap: 8px; padding: 16px 0; border-bottom: 1px solid #333; cursor: pointer; }
        }

        .buy-btn-dark { background-color: #ffffff !important; color: #000000 !important; padding: 4px 12px; border-radius: 20px; font-size: 12px; text-decoration: none; font-weight: 500; transition: all 0.3s; }
        .buy-btn-dark:hover { background-color: #2997ff !important; color: white !important; }
    `;
    document.head.appendChild(style);

    // 3. 构建 HTML (深色版)
    const nav = document.createElement('nav');
    nav.id = navId;
    nav.className = 'fixed top-0 w-full z-[10000] glass-nav-dark';
    nav.style.height = '48px';

    nav.innerHTML = `
        <div class="max-w-[980px] mx-auto px-6 h-full flex items-center justify-between">
            <a href="index.html" class="flex items-center"><img src="Logo/darkBGver.png" style="height: 22px;"></a>
            
            <div class="pc-only hidden md:flex items-center gap-8 h-full">
                <div class="nav-group relative h-full flex items-center">
                    <a href="Product.html" style="color: #e8e8ed; font-size: 0.875rem; text-decoration: none; transition: color 0.3s;" onmouseover="this.style.color='#2997ff'" onmouseout="this.style.color='#e8e8ed'" class="py-4">产品</a>
                    <div class="dropdown-card">
                        <div class="bg-[#161617]/90 backdrop-blur-xl border border-white/10 rounded-xl shadow-2xl p-2 min-w-[150px] flex flex-col gap-1">
                            <a href="Product.html" class="block px-4 py-2.5 text-[13px] text-[#e8e8ed] hover:bg-white/10 hover:text-[#2997ff] rounded-lg text-center whitespace-nowrap" style="text-decoration:none;">智能社交</a>
                            <a
                                href="WebGen.html"
                                target="_blank"
                                rel="noopener noreferrer"
                                class="block px-4 py-2.5 text-[13px] text-[#e8e8ed] hover:bg-white/10 hover:text-[#2997ff] rounded-lg text-center whitespace-nowrap"
                                style="text-decoration:none;"
                                >
                                智能网页
                            </a>
                            <a href="Entertainment.html" class="block px-4 py-2.5 text-[13px] text-[#e8e8ed] hover:bg-white/10 hover:text-[#2997ff] rounded-lg text-center whitespace-nowrap" style="text-decoration:none;">智能文娱</a>
                        </div>
                    </div>
                </div>
                <div class="nav-group relative h-full flex items-center">
                    <a href="Product.html" style="color: #e8e8ed; font-size: 0.875rem; text-decoration: none; transition: color 0.3s;" onmouseover="this.style.color='#2997ff'" onmouseout="this.style.color='#e8e8ed'" class="py-4">功能</a>
                    <div class="dropdown-card">
                        <div class="bg-[#161617]/90 backdrop-blur-xl border border-white/10 rounded-xl shadow-2xl p-2 min-w-[140px] flex flex-col gap-1">
                            <a href="Product.html" class="block px-4 py-2.5 text-[13px] text-[#e8e8ed] hover:bg-white/10 hover:text-[#2997ff] rounded-lg text-center" style="text-decoration:none;">功能概览</a>
                            <a href="AI_Detailed_2.html" class="block px-4 py-2.5 text-[13px] text-[#e8e8ed] hover:bg-white/10 hover:text-[#2997ff] rounded-lg text-center" style="text-decoration:none;">Linkly AI</a>
                            <a href="B_Detailed_2black_WordPolish.html" class="block px-4 py-2.5 text-[13px] text-[#e8e8ed] hover:bg-white/10 hover:text-[#2997ff] rounded-lg text-center" style="text-decoration:none;">Linkly 企业版</a>
                        </div>
                    </div>
                </div>
                <a href="Scene.html" style="color: #e8e8ed; font-size: 0.875rem; text-decoration: none; transition: color 0.3s;" onmouseover="this.style.color='#2997ff'" onmouseout="this.style.color='#e8e8ed'">使用场景</a>
                <a href="VIP_Compare_2.html" style="color: #e8e8ed; font-size: 0.875rem; text-decoration: none; transition: color 0.3s;" onmouseover="this.style.color='#2997ff'" onmouseout="this.style.color='#e8e8ed'">定价</a>
                <div class="nav-group relative h-full flex items-center">
                    <a href="Download.html" style="color: #e8e8ed; font-size: 0.875rem; text-decoration: none; transition: color 0.3s;" onmouseover="this.style.color='#2997ff'" onmouseout="this.style.color='#e8e8ed'" class="py-4">支持</a>
                    <div class="dropdown-card">
                        <div class="bg-[#161617]/90 backdrop-blur-xl border border-white/10 rounded-xl shadow-2xl p-2 min-w-[140px] flex flex-col gap-1">
                            <a href="Download.html" class="block px-4 py-2.5 text-[13px] text-[#e8e8ed] hover:bg-white/10 hover:text-[#2997ff] rounded-lg text-center" style="text-decoration:none;">应用下载</a>
                            <a href="User_Guide.html" class="block px-4 py-2.5 text-[13px] text-[#e8e8ed] hover:bg-white/10 hover:text-[#2997ff] rounded-lg text-center" style="text-decoration:none;">使用说明</a>
                            <a href="Tech_Spec.html" class="block px-4 py-2.5 text-[13px] text-[#e8e8ed] hover:bg-white/10 hover:text-[#2997ff] rounded-lg text-center" style="text-decoration:none;">技术详情</a>
                            <a href="QA.html" class="block px-4 py-2.5 text-[13px] text-[#e8e8ed] hover:bg-white/10 hover:text-[#2997ff] rounded-lg text-center" style="text-decoration:none;">常见问题</a>
                            <a href="Contact_Us.html" class="block px-4 py-2.5 text-[13px] text-[#e8e8ed] hover:bg-white/10 hover:text-[#2997ff] rounded-lg text-center" style="text-decoration:none;">联系我们</a>
                        </div>
                    </div>
                </div>
            </div>

            <div class="flex items-center gap-4">
                <a href="ShopBag.html" style="color:#e8e8ed;"><svg width="17" height="17" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"/></svg></a>
                <a href="Shop_General.html" class="buy-btn-dark">购买</a>
                <a href="https://linkly.solutions" class="pc-only hidden md:block text-[#e8e8ed] text-[13px] hover:text-[#2997ff] transition-all" style="text-decoration:none;">登录</a>
                
                <div id="u-toggle-dark" class="mobile-only cursor-pointer flex items-center" style="color:#e8e8ed; padding:4px;">
                    <svg id="u-icon-dark" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.2" viewBox="0 0 24 24"><path d="M4 6h16M4 12h16M4 18h16"/></svg>
                </div>
            </div>
        </div>

        <div id="u-overlay-dark" style="position:fixed; top:48px; left:0; width:100%; height:100vh; background:#161617; display:none; overflow:hidden;">
            <div id="u-slider-dark" style="display:flex; width:200%; height:100%; transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);">
                <div style="width:50%; padding:0 40px; box-sizing:border-box;">
                    <div class="u-m-item" onclick="window.uShowB('p')">产品 <svg width="12" height="12" stroke="#666" stroke-width="1.2" fill="none"><path d="M5 2l5 5-5 5"/></svg></div>
                    <div class="u-m-item" onclick="window.uShowB('f')">功能 <svg width="12" height="12" stroke="#666" stroke-width="1.2" fill="none"><path d="M5 2l5 5-5 5"/></svg></div>
                    <a href="Scene.html" class="u-m-item" style="text-decoration:none">使用场景</a>
                    <a href="VIP_Compare_2.html" class="u-m-item" style="text-decoration:none">定价</a>
                    <div class="u-m-item" onclick="window.uShowB('s')">支持 <svg width="12" height="12" stroke="#666" stroke-width="1.2" fill="none"><path d="M5 2l5 5-5 5"/></svg></div>
                    <a href="https://linkly.solutions" style="display:block;margin-top:32px;color:#2997ff;text-decoration:none;font-size:17px;">登录账户</a>
                </div>
                <div style="width:50%; padding:0 40px; box-sizing:border-box; background:#161617;">
                    <div onclick="window.uBackB()" class="u-back-text"><svg width="14" height="14" stroke="#86868b" stroke-width="1.2" fill="none"><path d="M9 12l-5-5 5-5"/></svg> 返回</div>
                    <div id="u-sub-content-dark"></div>
                </div>
            </div>
        </div>
    </nav>
    `;

    // 4. 逻辑控制
    window.uShowB = (k) => {
        document.getElementById('u-sub-content-dark').innerHTML = menus[k].map(i => `<a href="${i.u}" class="u-sub-item">${i.n}</a>`).join('');
        document.getElementById('u-slider-dark').style.transform = 'translateX(-50%)';
    };
    window.uBackB = () => document.getElementById('u-slider-dark').style.transform = 'translateX(0)';

    function mount() {
        document.body.prepend(nav);
        const btn = document.getElementById('u-toggle-dark');
        const overlay = document.getElementById('u-overlay-dark');
        const icon = document.getElementById('u-icon-dark');
        
        btn.onclick = () => {
            const isOpen = overlay.style.display === 'block';
            overlay.style.display = isOpen ? 'none' : 'block';
            document.body.style.overflow = isOpen ? '' : 'hidden';
            icon.innerHTML = isOpen ? '<path d="M4 6h16M4 12h16M4 18h16"/>' : '<path d="M18 6L6 18M6 6l12 12"/>';
            if (isOpen) window.uBackB();
        };
    }

    if (document.body) mount(); else window.addEventListener('DOMContentLoaded', mount);
})();