// PF-Player 应用路由管理器
class AppRouter {
    constructor() {
        this.currentPage = 'discover';
        this.pages = ['discover', 'meet', 'my'];
        this.pageContainer = document.getElementById('page-container');
        this.navItems = document.querySelectorAll('.nav-item');
        this.playerModal = document.getElementById('player-modal');
        
        this.init();
    }

    init() {
        this.loadPage(this.currentPage);
        this.setupNavigation();
        this.setupPlayerTriggers();
    }

    async loadPage(pageName) {
        const pageMap = {
            'discover': 'pages/Discover.html',
            'meet': 'pages/Meet.html',
            'my': 'pages/My.html'
        };

        try {
            const response = await fetch(pageMap[pageName]);
            const html = await response.text();
            this.pageContainer.innerHTML = html;
            this.currentPage = pageName;
            this.updateNavigation();
            
            // 加载页面后初始化交互事件
            this.initPageEvents(pageName);
        } catch (error) {
            console.error('Failed to load page:', error);
        }
    }

    setupNavigation() {
        this.navItems.forEach(item => {
            item.addEventListener('click', (e) => {
                const pageName = e.currentTarget.dataset.page;
                if (pageName !== this.currentPage) {
                    this.loadPage(pageName);
                }
            });
        });
    }

    updateNavigation() {
        this.navItems.forEach(item => {
            item.classList.remove('active');
            if (item.dataset.page === this.currentPage) {
                item.classList.add('active');
            }
        });
    }

    setupPlayerTriggers() {
        // 监听所有播放按钮点击
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('play-btn') || 
                e.target.classList.contains('liked-play') ||
                e.target.classList.contains('ctrl-btn')) {
                this.openPlayer();
            }
        });
    }

    openPlayer() {
        if (this.playerModal) {
            this.playerModal.style.display = 'block';
        }
    }

    closePlayer() {
        if (this.playerModal) {
            this.playerModal.style.display = 'none';
        }
    }

    initPageEvents(pageName) {
        switch(pageName) {
            case 'discover':
                this.initDiscoverEvents();
                break;
            case 'meet':
                this.initMeetEvents();
                break;
            case 'my':
                this.initMyEvents();
                break;
        }
    }

    initDiscoverEvents() {
        // 搜索功能
        const searchInput = document.querySelector('.search-input');
        if (searchInput) {
            searchInput.addEventListener('keyup', (e) => {
                if (e.key === 'Enter') {
                    console.log('Search:', searchInput.value);
                }
            });
        }

        // 歌曲播放
        const songItems = document.querySelectorAll('.song-item');
        songItems.forEach(item => {
            item.addEventListener('click', () => {
                this.openPlayer();
            });
        });
    }

    initMeetEvents() {
        // 换一批按钮
        const shuffleBtn = document.querySelector('.shuffle-btn');
        if (shuffleBtn) {
            shuffleBtn.addEventListener('click', () => {
                console.log('Shuffle related songs');
            });
        }

        // 添加到播放列表
        const addBtns = document.querySelectorAll('.add-btn');
        addBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                console.log('Add to playlist');
            });
        });
    }

    initMyEvents() {
        // 快捷入口点击
        const quickItems = document.querySelectorAll('.quick-item');
        quickItems.forEach(item => {
            item.addEventListener('click', () => {
                const text = item.querySelector('.quick-text').textContent;
                console.log('Quick action:', text);
            });
        });

        // 阶段标签切换
        const phaseTabs = document.querySelectorAll('.phase-tab');
        phaseTabs.forEach(tab => {
            tab.addEventListener('click', () => {
                phaseTabs.forEach(t => t.classList.remove('active'));
                tab.classList.add('active');
                console.log('Phase:', tab.textContent);
            });
        });

        // 下载选项切换
        const downloadOptions = document.querySelectorAll('.download-option');
        downloadOptions.forEach(option => {
            option.addEventListener('click', () => {
                const status = option.querySelector('.option-status');
                if (status) {
                    // 先移除所有选中状态
                    document.querySelectorAll('.option-status').forEach(s => s.classList.remove('active'));
                    status.classList.add('active');
                }
            });
        });
    }
}

// 页面加载完成后初始化应用
document.addEventListener('DOMContentLoaded', () => {
    // 等待加载动画完成后再初始化
    setTimeout(() => {
        const loadingScreen = document.getElementById('loading-screen');
        if (loadingScreen) {
            loadingScreen.style.opacity = '0';
            setTimeout(() => {
                loadingScreen.style.display = 'none';
            }, 500);
        }
        
        // 初始化应用路由
        window.appRouter = new AppRouter();
    }, 2500);
});