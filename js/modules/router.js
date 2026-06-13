/**
 * 路由管理器
 * 管理应用页面切换
 */

const Router = {
    routes: {},
    currentRoute: 'discover',
    rootElement: null,
    
    init(rootElementId) {
        this.rootElement = document.getElementById(rootElementId);
        if (!this.rootElement) {
            console.error('路由根元素未找到');
            return;
        }
        
        // 监听 hash 变化
        window.addEventListener('hashchange', () => this.handleRouteChange());
        
        // 初始路由
        this.handleRouteChange();
    },
    
    register(route, renderFn) {
        this.routes[route] = renderFn;
    },
    
    navigate(route) {
        window.location.hash = route;
    },
    
    handleRouteChange() {
        const hash = window.location.hash.slice(1) || 'discover';
        const route = hash.split('?')[0]; // 去掉查询参数
        
        if (this.routes[route]) {
            this.currentRoute = route;
            this.render(route);
            this.updateNavigation(route);
        } else {
            // 默认跳转到首页
            this.navigate('discover');
        }
    },
    
    render(route) {
        if (!this.rootElement || !this.routes[route]) return;
        
        // 渲染页面内容
        this.routes[route](this.rootElement);
        
        // 触发路由变化事件
        window.dispatchEvent(new CustomEvent('routechange', { detail: { route } }));
    },
    
    updateNavigation(route) {
        // 更新导航高亮
        document.querySelectorAll('.nav-item').forEach(item => {
            item.classList.remove('active');
            if (item.dataset.route === route) {
                item.classList.add('active');
            }
        });
    },
    
    getCurrentRoute() {
        return this.currentRoute;
    }
};
