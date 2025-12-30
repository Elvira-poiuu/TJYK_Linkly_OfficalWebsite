// (function() {
//     const navId = 'linkly-final-nav';
//     if (document.getElementById(navId)) return;

//     // 1. 注入强力 CSS：确保 PC 悬停效果和移动端侧滑逻辑 100% 生效
//     const style = document.createElement('style');
//     style.innerHTML = `
//         /* 基础重置 */
//         #${navId} { font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", sans-serif; -webkit-font-smoothing: antialiased; }
//         .glass-nav { background: rgba(255, 255, 255, 0.8) !important; backdrop-filter: blur(20px) !important; -webkit-backdrop-filter: blur(20px) !important; border-bottom: 1px solid rgba(0, 0, 0, 0.1) !important; }

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

//         /* 移动端侧滑逻辑 */
//         @media (max-width: 767px) {
//             .pc-only { display: none !important; }
//             .u-m-item { display: flex; justify-content: space-between; align-items: center; padding: 16px 0; border-bottom: 1px solid #f2f2f2; font-size: 17px; color: #1d1d1f; cursor: pointer; }
//             .u-sub-item { display: block; padding: 16px 0; border-bottom: 1px solid #f2f2f2; font-size: 17px; color: #1d1d1f; text-decoration: none; }
//             .u-back-text { color: #86868b !important; font-size: 17px; display: flex; align-items: center; gap: 8px; padding: 16px 0; border-bottom: 1px solid #f2f2f2; cursor: pointer; }
//         }

//         .buy-btn-style { background-color: #1d1d1f !important; color: white !important; padding: 4px 12px; border-radius: 20px; font-size: 12px; text-decoration: none; transition: background 0.3s; }
//         .buy-btn-style:hover { background-color: #0071e3 !important; }
//     `;
//     document.head.appendChild(style);

//     // 2. 核心数据
//     const menus = {
//         p: [{n:'智能名片·基础版',u:'Shop_General.html#essential'}, {n:'智能名片·半定制版',u:'Shop_General.html#studio'}, {n:'智能名片·全定制版',u:'Shop_General.html#bespoke'}, {n:'软件会员',u:'Shop_General.html#saas'}],
//         f: [{n:'功能概览',u:'Product.html'}, {n:'Linkly AI',u:'AI_Detailed_2.html'}, {n:'Linkly 企业版',u:'B_Detailed_2black_WordPolish.html'}],
//         s: [{n:'应用下载',u:'Download.html'}, {n:'使用说明',u:'User_Guide.html'}, {n:'技术详情',u:'Tech_Spec.html'}, {n:'常见问题',u:'QA.html'}, {n:'联系我们',u:'Contact_Us.html'}]
//     };

//     // 3. 构建 HTML：严格复制原始 Scene.html 的 PC 结构
//     const nav = document.createElement('nav');
//     nav.id = navId;
//     nav.className = 'fixed top-0 w-full z-[10000] glass-nav';
//     nav.style.height = '48px';

//     nav.innerHTML = `
//         <div class="max-w-[980px] mx-auto px-6 h-full flex items-center justify-between">
//             <a href="index.html" class="flex items-center"><img src="Logo/lightBGver.png" style="height: 22px;"></a>
            
//             <div class="pc-only hidden md:flex items-center gap-8 h-full">
//                 <div class="nav-group relative h-full flex items-center">
//                     <a href="Product.html" class="text-[#1d1d1f] text-[0.875rem] hover:text-[#0071e3] transition-colors py-4">产品</a>
//                     <div class="dropdown-card">
//                         <div class="bg-white/90 backdrop-blur-xl border border-gray-200 rounded-xl shadow-xl p-2 min-w-[150px] flex flex-col gap-1 overflow-hidden">
//                             <a href="Shop_General.html#essential" class="block px-4 py-2.5 text-[13px] text-[#1d1d1f] hover:bg-[#f5f5f7] hover:text-[#0071e3] rounded-lg text-center whitespace-nowrap">智能名片·基础版</a>
//                             <a href="Shop_General.html#studio" class="block px-4 py-2.5 text-[13px] text-[#1d1d1f] hover:bg-[#f5f5f7] hover:text-[#0071e3] rounded-lg text-center whitespace-nowrap">智能名片·半定制版</a>
//                             <a href="Shop_General.html#bespoke" class="block px-4 py-2.5 text-[13px] text-[#1d1d1f] hover:bg-[#f5f5f7] hover:text-[#0071e3] rounded-lg text-center whitespace-nowrap">智能名片·全定制版</a>
//                             <a href="Shop_General.html#saas" class="block px-4 py-2.5 text-[13px] text-[#1d1d1f] hover:bg-[#f5f5f7] hover:text-[#0071e3] rounded-lg text-center whitespace-nowrap">软件会员</a>
//                         </div>
//                     </div>
//                 </div>
//                 <div class="nav-group relative h-full flex items-center">
//                     <a href="Product.html" class="text-[#1d1d1f] text-[0.875rem] hover:text-[#0071e3] transition-colors py-4">功能</a>
//                     <div class="dropdown-card">
//                         <div class="bg-white/90 backdrop-blur-xl border border-gray-200 rounded-xl shadow-xl p-2 min-w-[140px] flex flex-col gap-1 overflow-hidden">
//                             <a href="Product.html" class="block px-4 py-2.5 text-[13px] text-[#1d1d1f] hover:bg-[#f5f5f7] hover:text-[#0071e3] rounded-lg text-center whitespace-nowrap">功能概览</a>
//                             <a href="AI_Detailed_2.html" class="block px-4 py-2.5 text-[13px] text-[#1d1d1f] hover:bg-[#f5f5f7] hover:text-[#0071e3] rounded-lg text-center whitespace-nowrap">Linkly AI</a>
//                             <a href="B_Detailed_2black_WordPolish.html" class="block px-4 py-2.5 text-[13px] text-[#1d1d1f] hover:bg-[#f5f5f7] hover:text-[#0071e3] rounded-lg text-center whitespace-nowrap">Linkly 企业版</a>
//                         </div>
//                     </div>
//                 </div>
//                 <a href="Scene.html" class="text-[#1d1d1f] text-[0.875rem] hover:text-[#0071e3] transition-colors">使用场景</a>
//                 <a href="VIP_Compare_2.html" class="text-[#1d1d1f] text-[0.875rem] hover:text-[#0071e3] transition-colors">定价</a>
//                 <div class="nav-group relative h-full flex items-center">
//                     <a href="Download.html" class="text-[#1d1d1f] text-[0.875rem] hover:text-[#0071e3] transition-colors py-4">支持</a>
//                     <div class="dropdown-card">
//                         <div class="bg-white/90 backdrop-blur-xl border border-gray-200 rounded-xl shadow-xl p-2 min-w-[140px] flex flex-col gap-1 overflow-hidden">
//                             <a href="Download.html" class="block px-4 py-2.5 text-[13px] text-[#1d1d1f] hover:bg-[#f5f5f7] hover:text-[#0071e3] rounded-lg text-center">应用下载</a>
//                             <a href="User_Guide.html" class="block px-4 py-2.5 text-[13px] text-[#1d1d1f] hover:bg-[#f5f5f7] hover:text-[#0071e3] rounded-lg text-center">使用说明</a>
//                             <a href="Tech_Spec.html" class="block px-4 py-2.5 text-[13px] text-[#1d1d1f] hover:bg-[#f5f5f7] hover:text-[#0071e3] rounded-lg text-center">技术详情</a>
//                             <a href="QA.html" class="block px-4 py-2.5 text-[13px] text-[#1d1d1f] hover:bg-[#f5f5f7] hover:text-[#0071e3] rounded-lg text-center">常见问题</a>
//                             <a href="Contact_Us.html" class="block px-4 py-2.5 text-[13px] text-[#1d1d1f] hover:bg-[#f5f5f7] hover:text-[#0071e3] rounded-lg text-center">联系我们</a>
//                         </div>
//                     </div>
//                 </div>
//             </div>

//             <div class="flex items-center gap-4">
//                 <a href="ShopBag.html" style="color:#1d1d1f;opacity:0.8;"><svg width="17" height="17" fill="none" stroke="currentColor" stroke-width="1.2" viewBox="0 0 24 24"><path d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"/></svg></a>
//                 <a href="Shop_General.html" class="buy-btn-style">购买</a>
//                 <a href="https://linkly.solutions" class="pc-only hidden md:block text-[#1d1d1f] text-[13px] hover:text-[#0071e3] transition-colors">登录</a>
                
//                 <div id="u-toggle" class="mobile-only cursor-pointer flex items-center" style="color:#1d1d1f; padding:4px;">
//                     <svg id="u-icon" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.2" viewBox="0 0 24 24"><path d="M4 6h16M4 12h16M4 18h16"/></svg>
//                 </div>
//             </div>
//         </div>

//         <div id="u-overlay" style="position:fixed; top:48px; left:0; width:100%; height:100vh; background:#fff; display:none; overflow:hidden;">
//             <div id="u-slider" style="display:flex; width:200%; height:100%; transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);">
//                 <div style="width:50%; padding:0 40px; box-sizing:border-box;">
//                     <div class="u-m-item" onclick="window.uShow('p')">产品 <svg width="12" height="12" stroke="#ccc" stroke-width="1.2" fill="none"><path d="M5 2l5 5-5 5"/></svg></div>
//                     <div class="u-m-item" onclick="window.uShow('f')">功能 <svg width="12" height="12" stroke="#ccc" stroke-width="1.2" fill="none"><path d="M5 2l5 5-5 5"/></svg></div>
//                     <a href="Scene.html" class="u-m-item" style="text-decoration:none">使用场景</a>
//                     <a href="VIP_Compare_2.html" class="u-m-item" style="text-decoration:none">定价</a>
//                     <div class="u-m-item" onclick="window.uShow('s')">支持 <svg width="12" height="12" stroke="#ccc" stroke-width="1.2" fill="none"><path d="M5 2l5 5-5 5"/></svg></div>
//                     <a href="https://linkly.solutions" style="display:block;margin-top:32px;color:#0071e3;text-decoration:none;font-size:17px;">登录账户</a>
//                 </div>
//                 <div style="width:50%; padding:0 40px; box-sizing:border-box; background:#fff;">
//                     <div onclick="window.uBack()" class="u-back-text"><svg width="14" height="14" stroke="#86868b" stroke-width="1.2" fill="none"><path d="M9 12l-5-5 5-5"/></svg> 返回</div>
//                     <div id="u-sub-content"></div>
//                 </div>
//             </div>
//         </div>
//     </nav>
//     `;

//     // 4. 逻辑控制
//     window.uShow = (k) => {
//         document.getElementById('u-sub-content').innerHTML = menus[k].map(i => `<a href="${i.u}" class="u-sub-item">${i.n}</a>`).join('');
//         document.getElementById('u-slider').style.transform = 'translateX(-50%)';
//     };
//     window.uBack = () => document.getElementById('u-slider').style.transform = 'translateX(0)';

//     function mount() {
//         document.body.prepend(nav);
//         const btn = document.getElementById('u-toggle');
//         const overlay = document.getElementById('u-overlay');
//         const icon = document.getElementById('u-icon');
        
//         btn.onclick = () => {
//             const isOpen = overlay.style.display === 'block';
//             overlay.style.display = isOpen ? 'none' : 'block';
//             document.body.style.overflow = isOpen ? '' : 'hidden';
//             icon.innerHTML = isOpen ? '<path d="M4 6h16M4 12h16M4 18h16"/>' : '<path d="M18 6L6 18M6 6l12 12"/>';
//             if (isOpen) window.uBack();
//         };
//     }

//     if (document.body) mount(); else window.addEventListener('DOMContentLoaded', mount);
// })();

















(function() {
    const navId = 'linkly-final-nav';
    if (document.getElementById(navId)) return;

    // 1. 注入强力 CSS：确保 PC 悬停效果和移动端侧滑逻辑 100% 生效
    const style = document.createElement('style');
    style.innerHTML = `
        /* 基础重置 */
        #${navId} { font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", sans-serif; -webkit-font-smoothing: antialiased; }
        .glass-nav { background: rgba(255, 255, 255, 0.8) !important; backdrop-filter: blur(20px) !important; -webkit-backdrop-filter: blur(20px) !important; border-bottom: 1px solid rgba(0, 0, 0, 0.1) !important; }

        /* PC 端悬停逻辑优化版 */
        @media (min-width: 768px) {
            .mobile-only { display: none !important; } /* 强制在 PC 端隐藏三道杠图标 */
            
            .nav-group:hover .dropdown-card { 
                opacity: 1 !important; 
                visibility: visible !important; 
                transform: translateX(-50%) translateY(0) !important; /* 回归原位 */
                pointer-events: auto !important; /* 开启交互 */
            }

            .dropdown-card {
                position: absolute !important;
                top: 100% !important; /* 紧贴导航栏底部 */
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

        /* 移动端侧滑逻辑 */
        @media (max-width: 767px) {
            .pc-only { display: none !important; }
            .u-m-item { display: flex; justify-content: space-between; align-items: center; padding: 16px 0; border-bottom: 1px solid #f2f2f2; font-size: 17px; color: #1d1d1f; cursor: pointer; }
            .u-sub-item { display: block; padding: 16px 0; border-bottom: 1px solid #f2f2f2; font-size: 17px; color: #1d1d1f; text-decoration: none; }
            .u-back-text { color: #86868b !important; font-size: 17px; display: flex; align-items: center; gap: 8px; padding: 16px 0; border-bottom: 1px solid #f2f2f2; cursor: pointer; }
        }

        .buy-btn-style { background-color: #1d1d1f !important; color: white !important; padding: 4px 12px; border-radius: 20px; font-size: 12px; text-decoration: none; transition: background 0.3s; }
        .buy-btn-style:hover { background-color: #0071e3 !important; }
    `;
    document.head.appendChild(style);

    // 2. 核心数据
    const menus = {
        p: [{n:'智能名片·基础版',u:'Shop_General.html#essential'}, {n:'智能名片·半定制版',u:'Shop_General.html#studio'}, {n:'智能名片·全定制版',u:'Shop_General.html#bespoke'}, {n:'软件会员',u:'Shop_General.html#saas'}],
        f: [{n:'功能概览',u:'Product.html'}, {n:'Linkly AI',u:'AI_Detailed_2.html'}, {n:'Linkly 企业版',u:'B_Detailed_2black_WordPolish.html'}],
        s: [{n:'应用下载',u:'Download.html'}, {n:'使用说明',u:'User_Guide.html'}, {n:'技术详情',u:'Tech_Spec.html'}, {n:'常见问题',u:'QA.html'}, {n:'联系我们',u:'Contact_Us.html'}]
    };

    // 3. 构建 HTML：严格复制原始 Scene.html 的 PC 结构
    const nav = document.createElement('nav');
    nav.id = navId;
    nav.className = 'fixed top-0 w-full z-[10000] glass-nav';
    nav.style.height = '48px';

    nav.innerHTML = `
        <div class="max-w-[980px] mx-auto px-6 h-full flex items-center justify-between">
            <a href="index.html" class="flex items-center"><img src="Logo/lightBGver.png" style="height: 22px;"></a>
            
            <div class="pc-only hidden md:flex items-center gap-8 h-full">
                <div class="nav-group relative h-full flex items-center">
                    <a href="Product.html" class="text-[#1d1d1f] text-[0.875rem] hover:text-[#0071e3] transition-colors py-4">产品</a>
                    <div class="dropdown-card">
                        <div class="bg-white/90 backdrop-blur-xl border border-gray-200 rounded-xl shadow-xl p-2 min-w-[150px] flex flex-col gap-1 overflow-hidden">
                            <a href="Product.html" class="block px-4 py-2.5 text-[13px] text-[#1d1d1f] hover:bg-[#f5f5f7] hover:text-[#0071e3] rounded-lg text-center whitespace-nowrap">智能社交</a>
                            <a
                                href="WebGen.html"
                                target="_blank"
                                rel="noopener noreferrer"
                                class="block px-4 py-2.5 text-[13px] text-[#1d1d1f] hover:bg-[#f5f5f7] hover:text-[#0071e3] rounded-lg text-center whitespace-nowrap"
                                >
                                智能网页
                            </a>
                            <a href="Entertainment.html" class="block px-4 py-2.5 text-[13px] text-[#1d1d1f] hover:bg-[#f5f5f7] hover:text-[#0071e3] rounded-lg text-center whitespace-nowrap">智能文娱</a>
                        </div>
                    </div>
                </div>
                <div class="nav-group relative h-full flex items-center">
                    <a href="Product.html" class="text-[#1d1d1f] text-[0.875rem] hover:text-[#0071e3] transition-colors py-4">功能</a>
                    <div class="dropdown-card">
                        <div class="bg-white/90 backdrop-blur-xl border border-gray-200 rounded-xl shadow-xl p-2 min-w-[140px] flex flex-col gap-1 overflow-hidden">
                            <a href="Product.html" class="block px-4 py-2.5 text-[13px] text-[#1d1d1f] hover:bg-[#f5f5f7] hover:text-[#0071e3] rounded-lg text-center whitespace-nowrap">功能概览</a>
                            <a href="AI_Detailed_2.html" class="block px-4 py-2.5 text-[13px] text-[#1d1d1f] hover:bg-[#f5f5f7] hover:text-[#0071e3] rounded-lg text-center whitespace-nowrap">Linkly AI</a>
                            <a href="B_Detailed_2black_WordPolish.html" class="block px-4 py-2.5 text-[13px] text-[#1d1d1f] hover:bg-[#f5f5f7] hover:text-[#0071e3] rounded-lg text-center whitespace-nowrap">Linkly 企业版</a>
                        </div>
                    </div>
                </div>
                <a href="Scene.html" class="text-[#1d1d1f] text-[0.875rem] hover:text-[#0071e3] transition-colors">使用场景</a>
                <a href="VIP_Compare_2.html" class="text-[#1d1d1f] text-[0.875rem] hover:text-[#0071e3] transition-colors">定价</a>
                <div class="nav-group relative h-full flex items-center">
                    <a href="Download.html" class="text-[#1d1d1f] text-[0.875rem] hover:text-[#0071e3] transition-colors py-4">支持</a>
                    <div class="dropdown-card">
                        <div class="bg-white/90 backdrop-blur-xl border border-gray-200 rounded-xl shadow-xl p-2 min-w-[140px] flex flex-col gap-1 overflow-hidden">
                            <a href="Download.html" class="block px-4 py-2.5 text-[13px] text-[#1d1d1f] hover:bg-[#f5f5f7] hover:text-[#0071e3] rounded-lg text-center">应用下载</a>
                            <a href="User_Guide.html" class="block px-4 py-2.5 text-[13px] text-[#1d1d1f] hover:bg-[#f5f5f7] hover:text-[#0071e3] rounded-lg text-center">使用说明</a>
                            <a href="Tech_Spec.html" class="block px-4 py-2.5 text-[13px] text-[#1d1d1f] hover:bg-[#f5f5f7] hover:text-[#0071e3] rounded-lg text-center">技术详情</a>
                            <a href="QA.html" class="block px-4 py-2.5 text-[13px] text-[#1d1d1f] hover:bg-[#f5f5f7] hover:text-[#0071e3] rounded-lg text-center">常见问题</a>
                            <a href="Contact_Us.html" class="block px-4 py-2.5 text-[13px] text-[#1d1d1f] hover:bg-[#f5f5f7] hover:text-[#0071e3] rounded-lg text-center">联系我们</a>
                        </div>
                    </div>
                </div>
            </div>

            <div class="flex items-center gap-4">
                <a href="ShopBag.html" style="color:#1d1d1f;opacity:0.8;"><svg width="17" height="17" fill="none" stroke="currentColor" stroke-width="1.2" viewBox="0 0 24 24"><path d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"/></svg></a>
                <a href="Shop_General.html" class="buy-btn-style">购买</a>
                <a href="https://linkly.solutions" class="pc-only hidden md:block text-[#1d1d1f] text-[13px] hover:text-[#0071e3] transition-colors">登录</a>
                
                <div id="u-toggle" class="mobile-only cursor-pointer flex items-center" style="color:#1d1d1f; padding:4px;">
                    <svg id="u-icon" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.2" viewBox="0 0 24 24"><path d="M4 6h16M4 12h16M4 18h16"/></svg>
                </div>
            </div>
        </div>

        <div id="u-overlay" style="position:fixed; top:48px; left:0; width:100%; height:100vh; background:#fff; display:none; overflow:hidden;">
            <div id="u-slider" style="display:flex; width:200%; height:100%; transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);">
                <div style="width:50%; padding:0 40px; box-sizing:border-box;">
                    <div class="u-m-item" onclick="window.uShow('p')">产品 <svg width="12" height="12" stroke="#ccc" stroke-width="1.2" fill="none"><path d="M5 2l5 5-5 5"/></svg></div>
                    <div class="u-m-item" onclick="window.uShow('f')">功能 <svg width="12" height="12" stroke="#ccc" stroke-width="1.2" fill="none"><path d="M5 2l5 5-5 5"/></svg></div>
                    <a href="Scene.html" class="u-m-item" style="text-decoration:none">使用场景</a>
                    <a href="VIP_Compare_2.html" class="u-m-item" style="text-decoration:none">定价</a>
                    <div class="u-m-item" onclick="window.uShow('s')">支持 <svg width="12" height="12" stroke="#ccc" stroke-width="1.2" fill="none"><path d="M5 2l5 5-5 5"/></svg></div>
                    <a href="https://linkly.solutions" style="display:block;margin-top:32px;color:#0071e3;text-decoration:none;font-size:17px;">登录账户</a>
                </div>
                <div style="width:50%; padding:0 40px; box-sizing:border-box; background:#fff;">
                    <div onclick="window.uBack()" class="u-back-text"><svg width="14" height="14" stroke="#86868b" stroke-width="1.2" fill="none"><path d="M9 12l-5-5 5-5"/></svg> 返回</div>
                    <div id="u-sub-content"></div>
                </div>
            </div>
        </div>
    </nav>
    `;

    // 4. 逻辑控制
    window.uShow = (k) => {
        document.getElementById('u-sub-content').innerHTML = menus[k].map(i => `<a href="${i.u}" class="u-sub-item">${i.n}</a>`).join('');
        document.getElementById('u-slider').style.transform = 'translateX(-50%)';
    };
    window.uBack = () => document.getElementById('u-slider').style.transform = 'translateX(0)';

    function mount() {
        document.body.prepend(nav);
        const btn = document.getElementById('u-toggle');
        const overlay = document.getElementById('u-overlay');
        const icon = document.getElementById('u-icon');
        
        btn.onclick = () => {
            const isOpen = overlay.style.display === 'block';
            overlay.style.display = isOpen ? 'none' : 'block';
            document.body.style.overflow = isOpen ? '' : 'hidden';
            icon.innerHTML = isOpen ? '<path d="M4 6h16M4 12h16M4 18h16"/>' : '<path d="M18 6L6 18M6 6l12 12"/>';
            if (isOpen) window.uBack();
        };
    }

    if (document.body) mount(); else window.addEventListener('DOMContentLoaded', mount);
})();