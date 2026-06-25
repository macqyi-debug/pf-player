/**
 * UI 管理器
 * 统一管理播放器 UI 组件和交互
 */

const UIManager = {
    init() {
        this.initNavigation();
        this.initBottomPlayer();
        this.initPlayerModal();
        this.initImportPanel();
        this.initMiniPlayer();
        this.initPlaylistPanel();
    },
    
    // 初始化底部导航
    initNavigation() {
        const navItems = document.querySelectorAll('.nav-item');
        navItems.forEach(item => {
            item.addEventListener('click', () => {
                const route = item.dataset.route;
                if (route) {
                    Router.navigate(route);
                }
            });
        });
        
        // 监听路由变化
        window.addEventListener('routechange', (e) => {
            console.log('路由变化:', e.detail.route);
            this.restoreBackgroundSettings();
        });
    },
    
    // 恢复背景设置，防止页面切换时背景变浅
    restoreBackgroundSettings() {
        const iphoneContainer = document.querySelector('.iphone-container');
        if (!iphoneContainer) return;
        
        try {
            const settings = JSON.parse(localStorage.getItem('pfPlayerSettings') || '{}');
            
            // 检查是否有自定义背景设置
            if (settings.bgImageUrl) {
                const opacity = (settings.bgOpacity || '50') / 100;
                iphoneContainer.style.background = `url(${settings.bgImageUrl}) center/cover no-repeat rgba(0,0,0,${opacity}) !important`;
            } else if (settings.bgColor) {
                // 使用用户设置的背景颜色
                const color = settings.bgColor;
                const lightColor = this.adjustColorBrightness(color, 10);
                const darkColor = this.adjustColorBrightness(color, -10);
                const gradientBackground = `linear-gradient(145deg, ${lightColor} 0%, ${darkColor} 100%)`;
                iphoneContainer.style.background = gradientBackground;
            } else {
                // 使用默认背景颜色
                iphoneContainer.style.background = 'linear-gradient(145deg, #2a7a6d 0%, #1f6156 100%)';
            }
            
            // 移除毛玻璃效果（如果之前有）
            iphoneContainer.style.backdropFilter = 'none';
            iphoneContainer.style.backgroundColor = 'transparent';
            
        } catch (error) {
            console.error('恢复背景设置失败:', error);
        }
    },
    
    // 调整颜色亮度的辅助函数
    adjustColorBrightness(color, percent) {
        const num = parseInt(color.replace("#", ""), 16);
        const amt = Math.round(2.55 * percent);
        const R = (num >> 16) + amt;
        const G = (num >> 8 & 0x00FF) + amt;
        const B = (num & 0x0000FF) + amt;
        return "#" + (0x1000000 + (R<255?R<1?0:R:255)*0x10000 + (G<255?G<1?0:G:255)*0x100 + (B<255?B<1?0:B:255)).toString(16).slice(1);
    },
    
    // 初始化底部迷你播放器
    initBottomPlayer() {
        const bottomPlayer = document.getElementById('bottom-player');
        const miniLeft = document.getElementById('mini-player-trigger');
        
        // 点击左侧区域展开主播放器
        if (miniLeft) {
            miniLeft.addEventListener('click', (e) => {
                e.stopPropagation();
                this.showFullPlayer();
            });
        }
        
        // 播放/暂停按钮
        const playBtn = document.getElementById('mini-play-btn');
        if (playBtn) {
            playBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                const state = PlayerStore.state;
                if (state.isPlaying) {
                    PlayerStore.pause();
                } else {
                    PlayerStore.resume();
                }
            });
        }
        
        // 收藏按钮
        const likeBtn = document.getElementById('mini-like-btn');
        if (likeBtn) {
            likeBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                const state = PlayerStore.state;
                if (state.currentSong) {
                    if (PlayerStore.isFavorite(state.currentSong.id)) {
                        PlayerStore.removeFromFavorites(state.currentSong.id);
                    } else {
                        PlayerStore.addToFavorites(state.currentSong);
                    }
                    likeBtn.classList.toggle('liked');
                }
            });
        }
        
        // 播放列表按钮
        const listBtn = document.getElementById('mini-list-btn');
        if (listBtn) {
            listBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                this.showPlaylistPanel();
            });
        }
    },
    
    // 初始化全屏播放器模态框
    initPlayerModal() {
        const modal = document.getElementById('player-modal');
        const closeBtn = document.getElementById('close-player-btn');
        
        if (closeBtn && modal) {
            closeBtn.addEventListener('click', () => {
                this.hideFullPlayer();
            });
            
            // 点击背景关闭
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    this.hideFullPlayer();
                }
            });
        }
        
        // 监听播放器状态变化
        PlayerStore.subscribe((state) => {
            this.updatePlayerUI(state);
        });
    },
    
    // 初始化导入面板
    initImportPanel() {
        const importPanel = document.getElementById('import-panel');
        const importCloseBtn = document.getElementById('import-close-btn');
        
        if (importCloseBtn && importPanel) {
            importCloseBtn.addEventListener('click', () => {
                this.hideImportPanel();
            });
            
            // 点击背景关闭
            importPanel.addEventListener('click', (e) => {
                if (e.target === importPanel) {
                    this.hideImportPanel();
                }
            });
        }
    },
    
    // 初始化底部常驻播放栏
    initMiniPlayer() {
        const bottomPlayer = document.getElementById('bottom-player');
        
        if (bottomPlayer) {
            // 监听播放器状态
            PlayerStore.subscribe((state) => {
                this.updateMiniPlayer(state);
            });
            
            // 初始化时立即更新一次
            this.updateMiniPlayer(PlayerStore.getState());
        }
    },
    
    // 显示/隐藏迷你播放器
    showMiniPlayer() {
        const bottomPlayer = document.getElementById('bottom-player');
        if (bottomPlayer) {
            bottomPlayer.classList.add('active');
        }
    },
    
    hideMiniPlayer() {
        const bottomPlayer = document.getElementById('bottom-player');
        if (bottomPlayer) {
            bottomPlayer.classList.remove('active');
        }
    },
    
    // 显示全屏播放器
    showFullPlayer() {
        const modal = document.getElementById('player-modal');
        if (modal) {
            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    },
    
    // 隐藏全屏播放器
    hideFullPlayer() {
        const modal = document.getElementById('player-modal');
        if (modal) {
            modal.classList.remove('active');
            document.body.style.overflow = '';
        }
    },
    
    // 显示提示信息
    showToast(message, type = 'info') {
        // 移除现有的toast
        const existingToast = document.querySelector('.toast-message');
        if (existingToast) {
            existingToast.remove();
        }
        
        // 创建toast元素
        const toast = document.createElement('div');
        toast.className = `toast-message toast-${type}`;
        toast.textContent = message;
        
        // 设置样式
        toast.style.cssText = `
            position: fixed;
            top: 80px;
            left: 50%;
            transform: translateX(-50%);
            background: ${type === 'success' ? '#1f6156' : type === 'error' ? '#c0392b' : 'rgba(79, 65, 53, 0.95)'};
            color: #d9ceb2;
            padding: 12px 24px;
            border-radius: 25px;
            font-size: 14px;
            z-index: 9999;
            box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
            animation: toastFadeIn 0.3s ease;
            max-width: 90%;
            text-align: center;
        `;
        
        document.body.appendChild(toast);
        
        // 添加动画样式
        if (!document.getElementById('toast-styles')) {
            const style = document.createElement('style');
            style.id = 'toast-styles';
            style.textContent = `
                @keyframes toastFadeIn {
                    from { opacity: 0; transform: translateX(-50%) translateY(-20px); }
                    to { opacity: 1; transform: translateX(-50%) translateY(0); }
                }
                @keyframes toastFadeOut {
                    from { opacity: 1; transform: translateX(-50%) translateY(0); }
                    to { opacity: 0; transform: translateX(-50%) translateY(-20px); }
                }
            `;
            document.head.appendChild(style);
        }
        
        // 3秒后自动移除
        setTimeout(() => {
            toast.style.animation = 'toastFadeOut 0.3s ease forwards';
            setTimeout(() => {
                if (toast.parentNode) {
                    toast.remove();
                }
            }, 300);
        }, 3000);
    },
    
    // 显示导入面板
    showImportPanel() {
        const importPanel = document.getElementById('import-panel');
        if (importPanel) {
            importPanel.classList.add('active');
        }
    },
    
    // 隐藏导入面板
    hideImportPanel() {
        const importPanel = document.getElementById('import-panel');
        if (importPanel) {
            importPanel.classList.remove('active');
        }
    },
    
    // 播放模式列表
    playModes: [
        { id: 'sequential', name: '顺序', icon: 'M8 5v14l11-7z' },
        { id: 'repeat', name: '循环', icon: 'M7 7h10v3l4-4-4-4v3H5v6h2V7zm0 10h10v3l4-4-4-4v3H5v6h2v-6z' },
        { id: 'single', name: '单曲', icon: 'M12 8v4l3 3H9l3-3V8zm0 9c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2z' },
        { id: 'random', name: '随机', icon: 'M19.43 12.98c.04-.32.07-.64.07-.98s-.03-.66-.07-.98l2.11-1.65c.19-.15.24-.42.12-.64l-2-3.46c-.12-.22-.39-.3-.61-.22l-2.49 1c-.52-.39-1.08-.7-1.66-.94l-.38-2.65c-.03-.24-.24-.42-.48-.42h-4c-.24 0-.45.18-.48.42l-.38 2.65c-.58.24-1.14.55-1.66.94l-2.49-1c-.22-.08-.49 0-.61.22l-2 3.46c-.12.22-.07.49.12.64l2.11 1.65c-.04.32-.07.64-.07.98s.03.66.07.98l-2.11 1.65c-.19.15-.24.42-.12.64l2 3.46c.12.22.39.3.61.22l2.49-1c.52.39 1.08.7 1.66.94l.38 2.65c.03.24.24.42.48.42h4c.24 0 .45-.18.48-.42l.38-2.65c.58-.24 1.14-.55 1.66-.94l2.49 1c.22.08.49 0 .61-.22l2-3.46c.12-.22.07-.49-.12-.64l-2.11-1.65zm-7.43 2.52c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z' },
        { id: 'vinyl', name: '黑胶', icon: 'M12 3c-4.97 0-9 4.03-9 9s4.03 9 9 9 9-4.03 9-9-4.03-9-9-9zm0 16c-3.86 0-7-3.14-7-7s3.14-7 7-7 7 3.14 7 7-3.14 7-7 7zm0-12c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5z' }
    ],
    
    // 更新迷你播放器UI
    updateMiniPlayer(state) {
        const bottomPlayer = document.getElementById('bottom-player');
        if (!bottomPlayer) return;
        
        // 始终显示底部播放栏
        bottomPlayer.style.display = 'flex';
        
        // 更新滚动文本（始终更新，不管是否有歌曲）
        const scrollText = document.getElementById('mini-scroll-text');
        const scrollTextClone = document.getElementById('mini-scroll-text-clone');
        if (state.currentSong) {
            const text = `${state.currentSong.title || '未知歌曲'} - ${state.currentSong.artist || '未知艺术家'}`;
            if (scrollText) scrollText.textContent = text;
            if (scrollTextClone) scrollTextClone.textContent = text;
            
            // 更新封面
            const coverImg = document.getElementById('mini-cover-img');
            const coverPlaceholder = document.getElementById('mini-cover-placeholder');
            if (state.currentSong.cover) {
                coverImg.src = state.currentSong.cover;
                coverImg.style.display = 'block';
                coverPlaceholder.style.display = 'none';
            } else {
                coverImg.style.display = 'none';
                coverPlaceholder.style.display = 'flex';
            }
            
            // 更新收藏按钮状态
            const likeBtn = document.getElementById('mini-like-btn');
            if (likeBtn) {
                const isLiked = PlayerStore.isFavorite(state.currentSong.id);
                likeBtn.classList.toggle('liked', isLiked);
            }
        } else {
            // 没有歌曲时显示默认文本
            if (scrollText) scrollText.textContent = '未选择歌曲 - 请选择歌曲播放';
            if (scrollTextClone) scrollTextClone.textContent = '未选择歌曲 - 请选择歌曲播放';
            
            // 显示默认封面
            const coverImg = document.getElementById('mini-cover-img');
            const coverPlaceholder = document.getElementById('mini-cover-placeholder');
            if (coverImg) coverImg.style.display = 'none';
            if (coverPlaceholder) coverPlaceholder.style.display = 'flex';
        }
        
        // 更新播放按钮
        const playBtn = document.getElementById('mini-play-btn');
        if (playBtn) {
            const playIcon = playBtn.querySelector('.mini-play-icon');
            const pauseIcon = playBtn.querySelector('.mini-pause-icon');
            if (playIcon && pauseIcon) {
                playIcon.style.display = state.isPlaying ? 'none' : 'block';
                pauseIcon.style.display = state.isPlaying ? 'block' : 'none';
            }
        }
    },
    
    // 更新迷你播放器进度条
    updateMiniProgress(state) {
        const progressBar = document.getElementById('mini-progress-bar');
        const progressFill = document.getElementById('mini-progress-fill');
        const progressThumb = document.getElementById('mini-progress-thumb');
        const currentTimeEl = document.querySelector('.mini-current-time');
        const durationEl = document.querySelector('.mini-duration');
        
        if (!progressBar || !progressFill) return;
        
        const progress = state.duration > 0 ? (state.currentTime / state.duration) * 100 : 0;
        progressFill.style.width = `${progress}%`;
        progressThumb.style.left = `${progress}%`;
        
        // 更新时间显示（精确到毫秒）
        currentTimeEl.textContent = this.formatTimeWithMs(state.currentTime);
        durationEl.textContent = this.formatTimeWithMs(state.duration);
    },
    
    // 格式化时间（精确到毫秒）
    formatTimeWithMs(seconds) {
        const ms = Math.floor((seconds % 1) * 1000);
        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}.${ms.toString().padStart(3, '0')}`;
    },
    
    // 更新播放模式
    updatePlayMode(state) {
        const modeBtn = document.getElementById('mini-mode-btn');
        if (!modeBtn) return;
        
        const currentMode = this.playModes.find(m => m.id === state.playbackMode) || this.playModes[0];
        const iconPath = modeBtn.querySelector('svg path');
        if (iconPath) {
            iconPath.setAttribute('d', currentMode.icon);
        }
        modeBtn.title = currentMode.name;
        
        // 点击切换模式
        modeBtn.onclick = () => {
            const currentIndex = this.playModes.findIndex(m => m.id === state.playbackMode);
            const nextIndex = (currentIndex + 1) % this.playModes.length;
            PlayerStore.setPlaybackMode(this.playModes[nextIndex].id);
        };
    },
    
    // 初始化时间旅行功能
    initTimeTravel() {
        const progressContainer = document.getElementById('mini-progress-container');
        const panel = document.getElementById('time-travel-panel');
        const closeBtn = document.getElementById('time-travel-close');
        const slider = document.getElementById('time-travel-slider');
        const timeDisplay = document.getElementById('time-travel-time');
        
        let longPressTimer = null;
        
        // 长按进度条触发时间旅行
        progressContainer.addEventListener('mousedown', () => {
            longPressTimer = setTimeout(() => {
                this.showTimeTravel();
            }, 500);
        });
        
        progressContainer.addEventListener('mouseup', () => {
            if (longPressTimer) {
                clearTimeout(longPressTimer);
                longPressTimer = null;
            }
        });
        
        progressContainer.addEventListener('mouseleave', () => {
            if (longPressTimer) {
                clearTimeout(longPressTimer);
                longPressTimer = null;
            }
        });
        
        // 关闭时间旅行面板
        closeBtn.addEventListener('click', () => {
            this.hideTimeTravel();
        });
        
        // 点击面板外部关闭
        document.addEventListener('click', (e) => {
            if (panel.classList.contains('show') && !panel.contains(e.target) && !progressContainer.contains(e.target)) {
                this.hideTimeTravel();
            }
        });
        
        // 滑块事件
        slider.addEventListener('input', (e) => {
            const progress = parseFloat(e.target.value);
            const state = PlayerStore.state;
            const time = (progress / 100) * state.duration;
            timeDisplay.textContent = this.formatTimeWithMs(time);
        });
        
        slider.addEventListener('change', (e) => {
            const progress = parseFloat(e.target.value);
            const state = PlayerStore.state;
            const time = (progress / 100) * state.duration;
            PlayerStore.seek(time);
            this.hideTimeTravel();
        });
    },
    
    // 显示时间旅行面板
    showTimeTravel() {
        const panel = document.getElementById('time-travel-panel');
        const slider = document.getElementById('time-travel-slider');
        const timeDisplay = document.getElementById('time-travel-time');
        const progressBar = document.getElementById('time-travel-progress');
        
        const state = PlayerStore.state;
        const progress = state.duration > 0 ? (state.currentTime / state.duration) * 100 : 0;
        
        slider.value = progress;
        timeDisplay.textContent = this.formatTimeWithMs(state.currentTime);
        progressBar.style.width = `${progress}%`;
        
        panel.classList.add('show');
    },
    
    // 隐藏时间旅行面板
    hideTimeTravel() {
        const panel = document.getElementById('time-travel-panel');
        panel.classList.remove('show');
    },
    
    // 更新播放器UI
    updatePlayerUI(state) {
        const modal = document.getElementById('player-modal');
        if (!modal) return;
        
        // 更新歌曲信息
        const titleEl = modal.querySelector('.player-song-title');
        const artistEl = modal.querySelector('.player-song-artist');
        
        if (titleEl) titleEl.textContent = state.currentSong?.title || '未选择歌曲';
        if (artistEl) artistEl.textContent = state.currentSong?.artist || '';
        
        // 更新进度
        const progressBar = modal.querySelector('.progress-bar');
        const currentTimeEl = modal.querySelector('.current-time');
        const totalTimeEl = modal.querySelector('.total-time');
        
        if (progressBar && state.duration > 0) {
            const progress = (state.currentTime / state.duration) * 100;
            progressBar.style.width = `${progress}%`;
        }
        
        if (currentTimeEl) {
            currentTimeEl.textContent = this.formatTime(state.currentTime);
        }
        if (totalTimeEl) {
            totalTimeEl.textContent = this.formatTime(state.duration);
        }
        
        // 更新播放按钮
        const playBtn = modal.querySelector('.player-play-btn');
        if (playBtn) {
            const playIcon = playBtn.querySelector('.play-icon');
            const pauseIcon = playBtn.querySelector('.pause-icon');
            if (playIcon && pauseIcon) {
                playIcon.style.display = state.isPlaying ? 'none' : 'block';
                pauseIcon.style.display = state.isPlaying ? 'block' : 'none';
            }
        }
    },
    
    // 格式化时间
    formatTime(seconds) {
        if (!seconds || isNaN(seconds)) return '00:00';
        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    },
    
    // 初始化播放列表面板状态
    initPlaylistPanel() {
        const panel = document.getElementById('playlist-panel');
        if (panel) {
            // 确保面板初始状态是隐藏的
            panel.classList.remove('show');
            console.log('[DEBUG] 播放列表面板已初始化（隐藏状态）');
        }
    },
    
    // 防抖计时器
    playlistPanelDebounceTimer: null,
    
    // ===== 播放列表面板 =====
    showPlaylistPanel() {
        // 防抖：如果正在处理中，取消之前的调用
        if (this.playlistPanelDebounceTimer) {
            clearTimeout(this.playlistPanelDebounceTimer);
        }
        
        this.playlistPanelDebounceTimer = setTimeout(() => {
            const panel = document.getElementById('playlist-panel');
            console.log('[DEBUG] UIManager.showPlaylistPanel 被调用');
            console.log('[DEBUG] 播放列表面板元素:', panel);
            
            if (!panel) {
                console.warn('[DEBUG] 播放列表面板不存在');
                return;
            }

            // 切换显示/隐藏状态
            const isShowing = panel.classList.contains('show');
            console.log('[DEBUG] 面板当前 show 状态:', isShowing);
            console.log('[DEBUG] 面板 className:', panel.className);
            
            if (isShowing) {
                console.log('[DEBUG] 面板已显示，调用 hidePlaylistPanel');
                this.hidePlaylistPanel();
                return;
            }

            console.log('[DEBUG] 更新播放列表内容');
            this.updatePlaylistContent();
            
            // 强制显示面板
            panel.classList.add('show');
            panel.style.display = 'flex';
            panel.style.transform = 'translateX(-50%) translateY(0)';
            console.log('[DEBUG] 已添加 show 类，面板样式:', panel.style.cssText);

            // 初始化标签切换
            this.initPlaylistTabs();
            
            // 关闭按钮（面板内的关闭按钮，如有）
            const closeBtn = document.getElementById('playlist-close');
            if (closeBtn) {
                closeBtn.onclick = (e) => {
                    e.stopPropagation();
                    this.hidePlaylistPanel();
                };
            }
            
            // 更多操作按钮
            this.initPlaylistMoreBtn();
            
            // 点击面板外部关闭
            const clickOutsideHandler = (e) => {
                // 检查是否点击了播放列表按钮
                const isPlaylistBtn = e.target.closest('#playlistBtn') || e.target.closest('#mini-list-btn');
                
                if (!panel.contains(e.target) && !isPlaylistBtn) {
                    this.hidePlaylistPanel();
                    document.removeEventListener('click', clickOutsideHandler);
                }
            };
            setTimeout(() => {
                document.addEventListener('click', clickOutsideHandler);
            }, 100);
        }, 50);
    },
    
    // 初始化更多操作按钮
    initPlaylistMoreBtn() {
        const moreBtn = document.getElementById('playlist-more-btn');
        const moreMenu = document.getElementById('playlist-more-menu');
        
        if (!moreBtn || !moreMenu) return;
        
        moreBtn.onclick = (e) => {
            e.stopPropagation();
            moreMenu.classList.toggle('show');
        };
        
        // 菜单点击事件
        moreMenu.querySelectorAll('.menu-item').forEach(item => {
            item.onclick = (e) => {
                e.stopPropagation();
                const action = item.dataset.action;
                if (action === 'clear') {
                    this.clearCurrentPlaylist();
                } else if (action === 'sort') {
                    this.sortPlaylist();
                }
                moreMenu.classList.remove('show');
            };
        });
        
        // 点击其他地方关闭菜单
        document.addEventListener('click', (e) => {
            if (!moreBtn.contains(e.target) && !moreMenu.contains(e.target)) {
                moreMenu.classList.remove('show');
            }
        });
    },
    
    // 清空播放列表
    clearCurrentPlaylist() {
        if (typeof PlayerStore !== 'undefined') {
            PlayerStore.clearPlaylist();
            showTooltip('播放列表已清空');
            this.updatePlaylistContent();
        }
    },
    
    // 歌曲排序
    sortPlaylist() {
        // 简单实现：按歌曲名称排序
        if (typeof PlayerStore !== 'undefined') {
            const sorted = [...PlayerStore.state.playlist].sort((a, b) => {
                const nameA = (a.title || a.name || '').toLowerCase();
                const nameB = (b.title || b.name || '').toLowerCase();
                return nameA.localeCompare(nameB);
            });
            PlayerStore.setPlaylist(sorted);
            showTooltip('播放列表已排序');
            this.updatePlaylistContent();
        }
    },
    
    hidePlaylistPanel() {
        const panel = document.getElementById('playlist-panel');
        if (panel) {
            panel.classList.remove('show');
            panel.style.transform = 'translateX(-50%) translateY(100%)';
            console.log('[DEBUG] hidePlaylistPanel: 面板已隐藏');
        }
    },
    
    togglePlaylistPanel() {
        this.showPlaylistPanel();
    },
    
    initPlaylistTabs() {
        const tabs = document.querySelectorAll('.playlist-tab');
        tabs.forEach(tab => {
            tab.onclick = () => {
                tabs.forEach(t => t.classList.remove('active'));
                tab.classList.add('active');
                
                const tabName = tab.dataset.tab;
                document.querySelectorAll('.playlist-content').forEach(content => {
                    content.classList.remove('active');
                });
                document.getElementById(`playlist-${tabName}`).classList.add('active');
            };
        });
    },
    
    async updatePlaylistContent() {
        const state = PlayerStore.state;
        const currentSongId = state.currentSong?.id;
        
        // 确保本地歌曲在播放列表中
        if (window.LocalMusicModule) {
            const localSongs = await LocalMusicModule.getLocalSongs();
            const existingIds = new Set(state.playlist.map(s => s.id));
            localSongs.forEach(song => {
                if (!existingIds.has(song.id)) {
                    state.playlist.push(song);
                    existingIds.add(song.id);
                }
            });
        }
        
        // 更新数量 - 确保计数准确
        const currentCountEl = document.getElementById('current-count');
        const historyCountEl = document.getElementById('history-count');
        const playlistsCountEl = document.getElementById('playlists-count');
        
        if (currentCountEl) {
            currentCountEl.textContent = state.playlist?.length || 0;
        }
        
        // 从 LocalMusicModule 获取播放历史数量
        if (historyCountEl) {
            const playHistoryCount = window.LocalMusicModule ? LocalMusicModule.getPlayHistory().length : 0;
            historyCountEl.textContent = playHistoryCount;
        }
        
        // 更新歌单数量
        if (playlistsCountEl) {
            const playlistsCount = window.LocalMusicModule ? LocalMusicModule.getPlaylists().length : 0;
            playlistsCountEl.textContent = playlistsCount;
        }
        
        // 更新正在播放列表（使用虚拟滚动优化大型播放列表）
        const currentContainer = document.getElementById('playlist-current');
        if (state.playlist && state.playlist.length > 0) {
            // 对于大型播放列表，只渲染可见部分
            const maxVisibleItems = 100; // 最多渲染100项
            const totalItems = state.playlist.length;
            
            if (totalItems > maxVisibleItems) {
                // 大型播放列表：显示提示和部分内容
                currentContainer.innerHTML = `
                    <div class="playlist-notice" style="padding: 10px; color: #999; font-size: 12px; text-align: center;">
                        共 ${totalItems} 首歌曲，显示前 ${maxVisibleItems} 首
                    </div>
                    ${state.playlist.slice(0, maxVisibleItems).map((song, index) => {
                        const isPlaying = song.id === currentSongId;
                        const playingClass = isPlaying ? 'playing' : '';
                        const playingIcon = isPlaying ? '<span class="playing-icon"><svg viewBox="0 0 24 24" fill="currentColor"><polygon points="5,3 19,12 5,21"/></svg></span>' : `<span class="playlist-item-number">${index + 1}</span>`;
                        const songTitle = song.title || song.name || '未知歌曲';
                        const songArtist = song.artist || '未知艺术家';
                        return `
                        <div class="playlist-item ${playingClass}" data-index="${index}" data-id="${song.id}">
                            ${playingIcon}
                            <div class="playlist-item-info">
                                <div class="playlist-item-title">${songTitle}${isPlaying ? ' - 正在播放' : ''}</div>
                                <div class="playlist-item-artist">${songArtist}</div>
                            </div>
                            <span class="playlist-item-duration">${this.formatTime(song.duration)}</span>
                        </div>
                    `}).join('')}
                `;
            } else {
                // 小型播放列表：渲染全部
                currentContainer.innerHTML = state.playlist.map((song, index) => {
                    const isPlaying = song.id === currentSongId;
                    const playingClass = isPlaying ? 'playing' : '';
                    const playingIcon = isPlaying ? '<span class="playing-icon"><svg viewBox="0 0 24 24" fill="currentColor"><polygon points="5,3 19,12 5,21"/></svg></span>' : `<span class="playlist-item-number">${index + 1}</span>`;
                    const songTitle = song.title || song.name || '未知歌曲';
                    const songArtist = song.artist || '未知艺术家';
                    return `
                    <div class="playlist-item ${playingClass}" data-index="${index}" data-id="${song.id}">
                        ${playingIcon}
                        <div class="playlist-item-info">
                            <div class="playlist-item-title">${songTitle}${isPlaying ? ' - 正在播放' : ''}</div>
                            <div class="playlist-item-artist">${songArtist}</div>
                        </div>
                        <span class="playlist-item-duration">${this.formatTime(song.duration)}</span>
                    </div>
                `}).join('');
            }
            
            // 添加点击事件
            currentContainer.querySelectorAll('.playlist-item').forEach(item => {
                item.onclick = () => {
                    const index = parseInt(item.dataset.index);
                    const song = state.playlist[index];
                    if (song) {
                        // 更新 PlayerStore 状态
                        PlayerStore.play(song);
                        
                        // 同时更新全局播放列表，使 playSong 索引一致
                        if (typeof playlist !== 'undefined') {
                            playlist.local = state.playlist;
                        }
                        
                        // 调用全局 playSong 触发实际播放
                        if (typeof playSong === 'function') {
                            playSong(index);
                        }
                        
                        this.hidePlaylistPanel();
                    }
                };
            });
        } else {
            currentContainer.innerHTML = '<div class="playlist-empty">暂无播放列表</div>';
        }
        
        // 更新已播曲目
        const historyContainer = document.getElementById('playlist-history');
        // 从 LocalMusicModule 获取播放历史
        const playHistory = window.LocalMusicModule ? LocalMusicModule.getPlayHistory() : [];
        if (playHistory && playHistory.length > 0) {
            historyContainer.innerHTML = playHistory.map((song, index) => `
                <div class="playlist-item" data-index="${index}" data-song-id="${song.id}">
                    <span class="playlist-item-number">${index + 1}</span>
                    <div class="playlist-item-info">
                        <div class="playlist-item-title">${song.name || '未知歌曲'}</div>
                        <div class="playlist-item-artist">${song.artist || '未知艺术家'}</div>
                    </div>
                    <span class="playlist-item-duration">${song.duration ? this.formatTime(song.duration) : ''}</span>
                </div>
            `).join('');
            
            // 添加点击播放事件
            historyContainer.querySelectorAll('.playlist-item').forEach(item => {
                item.addEventListener('click', () => {
                    const index = parseInt(item.dataset.index);
                    if (!isNaN(index) && playHistory[index]) {
                        const song = playHistory[index];
                        // 同步到 PlayerStore 播放列表
                        PlayerStore.play(song);
                        // 同步全局播放列表
                        if (typeof playlist !== 'undefined') {
                            playlist.local = playHistory;
                        }
                        if (typeof playSong === 'function') {
                            playSong(index);
                        }
                        this.hidePlaylistPanel();
                    }
                });
            });
        } else {
            historyContainer.innerHTML = '<div class="playlist-empty">暂无播放记录</div>';
        }
        
        // 更新已播歌单
        const playlistsContainer = document.getElementById('playlist-playlists');
        const playlists = window.LocalMusicModule ? LocalMusicModule.getPlaylists() : [];
        if (playlists && playlists.length > 0) {
            playlistsContainer.innerHTML = playlists.map(pl => `
                <div class="playlist-item playlist-item-playlist" data-playlist-id="${pl.id}">
                    <span class="playlist-item-cover">${pl.cover}</span>
                    <div class="playlist-item-info">
                        <div class="playlist-item-title">${pl.name}</div>
                        <div class="playlist-item-artist">${pl.songCount || 0} 首歌曲</div>
                    </div>
                </div>
            `).join('');
            
            // 添加歌单点击事件 - 直接播放歌单
            playlistsContainer.querySelectorAll('.playlist-item-playlist').forEach(item => {
                item.addEventListener('click', () => {
                    const playlistId = item.dataset.playlistId;
                    if (window.LocalMusicModule) {
                        const pls = LocalMusicModule.getPlaylists();
                        const pl = pls.find(p => p.id === playlistId);
                        if (pl && pl.songs && pl.songs.length > 0) {
                            // 同步播放列表
                            PlayerStore.play(pl.songs[0]);
                            PlayerStore.state.playlist = pl.songs;
                            if (typeof playlist !== 'undefined') {
                                playlist.local = pl.songs;
                            }
                            if (typeof playSong === 'function') {
                                playSong(0);
                            }
                            UIManager.showToast(`正在播放：${pl.name}`, 'info');
                        } else {
                            UIManager.showToast('该歌单没有歌曲', 'info');
                        }
                    }
                    this.hidePlaylistPanel();
                });
            });
        } else {
            playlistsContainer.innerHTML = '<div class="playlist-empty">暂无歌单</div>';
        }
    },
    
    // 清空当前播放列表
    clearCurrentPlaylist() {
        if (confirm('确定要清空播放列表吗？')) {
            // 清空 PlayerStore 播放列表
            if (typeof PlayerStore !== 'undefined') {
                PlayerStore.clearPlaylist();
            }
            
            // 清空全局 playlist 对象
            if (typeof playlist !== 'undefined') {
                playlist.local = [];
                playlist.current = [];
            }
            
            // 停止播放
            if (typeof audio !== 'undefined' && audio.pause) {
                audio.pause();
            }
            
            // 更新 UI
            this.updatePlaylistContent();
            this.showToast('播放列表已清空', 'success');
        }
    }
};