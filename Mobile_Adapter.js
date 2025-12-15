(function() {
    // ==========================================
    // 1. 自动注入 Viewport Meta (解决手机端缩放问题)
    // ==========================================
    if (!document.querySelector('meta[name="viewport"]')) {
        const meta = document.createElement('meta');
        meta.name = "viewport";
        meta.content = "width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no";
        document.head.appendChild(meta);
    }

    // ==========================================
    // 2. 自动注入通用适配 CSS (解决排版错乱)
    // ==========================================
    const style = document.createElement('style');
    style.innerHTML = `
        /* --- 移动端样式 (仅在屏幕小于 900px 时生效) --- */
        @media (max-width: 900px) {
            /* 1. 强制将所有双栏布局改为单栏 */
            .shop-layout, 
            .product-configurator, 
            .checkout-layout,
            .bespoke-layout,
            .step-container,
            .grid-cols-2, 
            .flex-row {
                display: flex !important;
                flex-direction: column !important;
                grid-template-columns: 1fr !important;
                gap: 40px !important;
            }

            /* 2. 调整内边距，防止内容贴边 */
            .main-container, 
            .container, 
            .checkout-container,
            .page-wrapper,
            .step-section {
                padding-left: 20px !important;
                padding-right: 20px !important;
                padding-top: 80px !important; /* 留出导航栏高度 */
                width: 100% !important;
                max-width: 100% !important;
            }

            /* 3. 针对 Shop_General 等页面的侧边栏处理 (放到底部) */
            .shop-sidebar, 
            .order-sidebar {
                order: 2 !important;
                width: 100% !important;
                height: auto !important;
                position: static !important; /* 取消固定定位 */
            }

            /* 4. 针对预览图区域 (Shop_Studio 等) */
            .preview-stage, 
            .upload-stage {
                position: static !important;
                top: 0 !important;
                width: 100% !important;
                min-height: 300px !important;
                padding: 40px 20px !important;
            }

            /* 5. 字体大小自适应 */
            h1, .hero-title, .panel-title, .shop-header h1 {
                font-size: 32px !important;
                line-height: 1.2 !important;
            }
            
            /* 6. 导航栏调整 */
            nav {
                padding: 0 20px !important;
                justify-content: space-between !important;
            }
            .nav-content { width: auto !important; padding: 0 !important; }
            
            /* 隐藏桌面端菜单链接 */
            .navbar-links, 
            .hidden.md\\:flex,
            nav > div > div.flex.gap-6 { 
                display: none !important; 
            }
            
            /* 显示汉堡按钮 */
            #mobile-menu-btn { display: block !important; }
        }

        /* --- 汉堡菜单样式 --- */
        #mobile-menu-btn {
            display: none; /* 默认隐藏，移动端显示 */
            background: none; border: none; cursor: pointer; z-index: 10001;
            padding: 10px; margin-right: -10px;
            color: inherit; /* 跟随当前页面文字颜色 */
        }
        
        /* 强制深色背景页面的按钮为白色 */
        body[style*="background-color: #000"] #mobile-menu-btn,
        body.bg-black #mobile-menu-btn {
            color: #fff !important;
        }

        /* 全屏菜单遮罩 */
        #mobile-menu-overlay {
            position: fixed; top: 0; left: 0; width: 100%; height: 100vh;
            background: rgba(255,255,255,0.98); 
            backdrop-filter: blur(20px);
            z-index: 10000;
            display: flex; flex-direction: column; 
            align-items: center; justify-content: center;
            opacity: 0; pointer-events: none; transition: 0.3s ease;
        }
        
        /* 深色模式下的菜单背景 */
        body[style*="background-color: #000"] #mobile-menu-overlay,
        body.bg-black #mobile-menu-overlay {
            background: rgba(20,20,20,0.98);
        }

        #mobile-menu-overlay.active { opacity: 1; pointer-events: auto; }

        /* 菜单链接 */
        .mobile-link {
            font-size: 24px; font-weight: 600; 
            color: #1d1d1f; text-decoration: none; 
            margin: 15px 0; transition: 0.2s;
        }
        
        body[style*="background-color: #000"] .mobile-link,
        body.bg-black .mobile-link {
            color: #fff;
        }
        
        .mobile-link:hover { color: #0071e3 !important; }
        
        .mobile-btn {
            margin-top: 30px; padding: 12px 40px; 
            background: #0071e3; color: white !important; 
            border-radius: 980px; font-size: 18px; font-weight: 600; 
            text-decoration: none;
        }
    `;
    document.head.appendChild(style);

    // ==========================================
    // 3. 自动注入 HTML 结构 (Dom Ready 后执行)
    // ==========================================
    function initMobileNav() {
        const nav = document.querySelector('nav');
        if (!nav) return; // 如果页面没有 nav 标签则跳过

        // 1. 查找或创建汉堡按钮容器
        // 我们尝试找到 nav 内部最右侧的元素，插在它旁边
        // 通常是 .nav-content 的兄弟节点
        
        const btn = document.createElement('button');
        btn.id = 'mobile-menu-btn';
        // 汉堡图标 SVG
        btn.innerHTML = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>`;
        
        // 插入按钮：优先插入到 nav 的最后一个子元素里，或者直接 append 到 nav
        // 为了通用性，我们直接 append 到 nav，并通过 CSS 绝对定位或 Flex 控制
        // 这里采用 Flex 布局控制，假设 nav 是 flex 容器
        nav.appendChild(btn);

        // 2. 创建全屏菜单层
        const overlay = document.createElement('div');
        overlay.id = 'mobile-menu-overlay';
        
        // 菜单内容 (硬编码核心链接，确保统一)
        overlay.innerHTML = `
            <a href="index.html" class="mobile-link">首页</a>
            <a href="Shop_General.html" class="mobile-link">商店</a>
            <a href="Product.html" class="mobile-link">产品介绍</a>
            <a href="VIP_Compare_2.html" class="mobile-link">会员定价</a>
            <a href="Contact_Us.html" class="mobile-link">联系支持</a>
            <a href="ShopBag.html" class="mobile-link" style="font-size:16px; margin-top:10px; color:#86868b !important;">
                <svg style="display:inline-block; vertical-align:middle; margin-right:5px;" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 01-8 0"/></svg>
                购物袋
            </a>
            <a href="Shop_General.html" class="mobile-btn">立即购买</a>
        `;
        
        document.body.appendChild(overlay);

        // 3. 绑定点击事件
        btn.addEventListener('click', function(e) {
            e.stopPropagation();
            const isActive = overlay.classList.contains('active');
            
            if (isActive) {
                // 关闭菜单
                overlay.classList.remove('active');
                // 恢复汉堡图标
                btn.innerHTML = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>`;
                document.body.style.overflow = ''; // 恢复滚动
            } else {
                // 打开菜单
                overlay.classList.add('active');
                // 变成关闭图标 (X)
                btn.innerHTML = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>`;
                document.body.style.overflow = 'hidden'; // 禁止背景滚动
            }
        });
    }

    // 等待 DOM 加载完成后执行
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initMobileNav);
    } else {
        initMobileNav();
    }

})();