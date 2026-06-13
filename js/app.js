/**
 * PF-Player 应用主入口
 * 版本：v4.2.0 (优化迭代)
 */

// 全局变量
let isLandscapeMode = false;

// 订阅PlayerStore状态变化
function initPlayerStoreListener() {
    PlayerStore.subscribe((state) => {
        // 当状态变化时，如果是横屏模式，更新横屏UI
        if (isLandscapeMode) {
            updateLandscapeUI();
        }
    });
}

const App = {
    // 应用状态
    isLoading: true,
    currentPage: 'discover',
    
    // 初始化应用
    async init() {
        console.log('🎸 PF-Player v4.2.0 正在初始化...');
        
        // 先初始化PlayerStore
        await PlayerStore.init();
        
        // 初始化PlayerStore监听
        initPlayerStoreListener();
        
        // 初始化各个模块
        this.initRouter();
        this.initUI();
        this.initPlayer();
        
        // 路由到首页
        Router.navigate('discover');
        
        console.log('✅ PF-Player 初始化完成');
    },
    
    // 初始化路由
    initRouter() {
        // 初始化路由系统，设置根元素
        Router.init('page-container');
        
        // 注册页面路由
        Router.register('discover', DiscoverPage.render.bind(DiscoverPage));
        Router.register('meet', MeetPage.render.bind(MeetPage));
        Router.register('my', MyPage.render.bind(MyPage));
    },
    
    // 初始化UI
    initUI() {
        UIManager.init();
    },
    
    // 初始化播放器
    initPlayer() {
        // 播放器逻辑已在 player.js 中实现
        console.log('🔊 播放器已就绪');
    },
    
    // 隐藏加载屏幕
    hideLoadingScreen() {
        const loadingScreen = document.getElementById('loading-screen');
        if (loadingScreen) {
            // 延迟隐藏，让加载动画显示完整
            setTimeout(() => {
                loadingScreen.style.opacity = '0';
                loadingScreen.style.transition = 'opacity 0.5s ease';
                setTimeout(() => {
                    loadingScreen.style.display = 'none';
                    this.isLoading = false;
                }, 500);
            }, 1500); // 1.5秒加载动画
        }
    },
    
    // 获取当前页面
    getCurrentPage() {
        return this.currentPage;
    }
};

// 页面加载完成后初始化应用
document.addEventListener('DOMContentLoaded', () => {
    // 先启动加载动画
    if (typeof initLoadingScreen === 'function') {
        initLoadingScreen();
    }
    
    // 延迟初始化应用，让加载动画有时间展示
    setTimeout(() => {
        App.init();
    }, 500);
});

// 横竖屏切换功能

/**
 * 切换横竖屏模式
 */
function toggleScreenOrientation() {
    const landscapeContainer = document.getElementById('landscapePlayerContainer');
    
    if (isLandscapeMode) {
        // 切换到竖屏
        closeLandscapePlayer();
    } else {
        // 切换到横屏
        openLandscapePlayer();
    }
}

/**
 * 打开横屏播放器
 */
function openLandscapePlayer() {
    const landscapeContainer = document.getElementById('landscapePlayerContainer');
    const playerModal = document.getElementById('player-modal');
    
    if (!landscapeContainer || !playerModal) return;
    
    isLandscapeMode = true;
    landscapeContainer.classList.add('active');
    playerModal.classList.remove('active');
    
    // 更新横屏UI
    updateLandscapeUI();
}

/**
 * 关闭横屏播放器
 */
function closeLandscapePlayer() {
    const landscapeContainer = document.getElementById('landscapePlayerContainer');
    const playerModal = document.getElementById('player-modal');
    
    if (!landscapeContainer || !playerModal) return;
    
    isLandscapeMode = false;
    landscapeContainer.classList.remove('active');
    playerModal.classList.add('active');
    
    // 停止旋转动画
    const vinylDisc = document.getElementById('vinylDisc');
    if (vinylDisc) {
        vinylDisc.classList.remove('spinning');
    }
}

/**
 * 更新横屏UI
 */
function updateLandscapeUI() {
    const state = PlayerStore.getState();
    const currentSong = state.currentSong;
    
    console.log('updateLandscapeUI called, currentSong:', currentSong);
    
    // 更新专辑封面
    const vinylCoverImg = document.getElementById('vinylCoverImg');
    if (vinylCoverImg) {
        if (currentSong && currentSong.cover) {
            vinylCoverImg.src = currentSong.cover;
            vinylCoverImg.alt = currentSong.name || currentSong.title || '专辑封面';
            console.log('Setting cover:', currentSong.cover);
        } else if (currentSong && currentSong.albumArt) {
            vinylCoverImg.src = currentSong.albumArt;
            vinylCoverImg.alt = currentSong.name || currentSong.title || '专辑封面';
            console.log('Setting cover from albumArt:', currentSong.albumArt);
        } else {
            // 如果没有封面，使用默认图片
            vinylCoverImg.src = 'assets/images/PF-Logo.png';
            vinylCoverImg.alt = '专辑封面';
            console.log('No cover available, using default');
        }
        
        // 添加图片加载错误处理
        vinylCoverImg.onerror = function() {
            console.log('Cover image load failed, using default');
            this.src = 'assets/images/PF-Logo.png';
        };
    } else {
        console.log('vinylCoverImg element not found');
    }
    
    // 更新歌词
    updateLandscapeLyrics();
    
    // 更新播放状态
    updateLandscapePlayState();
    
    // 更新喜欢状态
    updateLandscapeFavoriteState();
    
    // 更新循环模式状态
    updateLandscapeLoopState();
}

/**
 * 更新横屏歌词显示
 */
function updateLandscapeLyrics() {
    const lyricsContent = document.getElementById('landscapeLyricsContent');
    if (!lyricsContent) return;
    
    // 使用全局变量 currentLyrics 和 currentLyricIndex
    const lyrics = window.currentLyrics || [];
    const currentLine = window.currentLyricIndex || -1;
    
    if (!lyrics || lyrics.length === 0) {
        lyricsContent.innerHTML = '<div class="landscape-lyric-line active">等待播放...</div>';
        return;
    }
    
    // 检查是否需要重新渲染歌词（只有当歌词行数发生变化时才重新渲染）
    const existingLines = lyricsContent.querySelectorAll('.landscape-lyric-line');
    if (existingLines.length !== lyrics.length) {
        let html = '';
        lyrics.forEach((line, index) => {
            const activeClass = index === currentLine ? 'active' : '';
            html += `<div class="landscape-lyric-line ${activeClass}" data-index="${index}">${line.text || line.content || ''}</div>`;
        });
        lyricsContent.innerHTML = html;
    } else {
        // 只更新高亮状态
        existingLines.forEach((line, index) => {
            if (index === currentLine) {
                line.classList.add('active');
            } else {
                line.classList.remove('active');
            }
        });
    }
    
    // 滚动到当前歌词行
    scrollLandscapeLyrics(currentLine);
}

/**
 * 滚动横屏歌词到当前行
 */
function scrollLandscapeLyrics(currentLine) {
    const lyricsContainer = document.querySelector('.landscape-lyrics-container');
    const activeLine = document.querySelector(`.landscape-lyric-line[data-index="${currentLine}"]`);
    
    if (lyricsContainer && activeLine) {
        const containerHeight = lyricsContainer.clientHeight;
        const lineTop = activeLine.offsetTop;
        const lineHeight = activeLine.clientHeight;
        
        lyricsContainer.scrollTo({
            top: lineTop - containerHeight / 2 + lineHeight / 2,
            behavior: 'smooth'
        });
    }
}

/**
 * 更新横屏播放状态
 */
function updateLandscapePlayState() {
    // 直接从audio元素获取播放状态，确保准确性
    const audioElement = document.querySelector('audio');
    const isPlaying = audioElement ? !audioElement.paused : false;
    
    // 更新播放状态到store
    PlayerStore.setState({ isPlaying: isPlaying });
    
    // 更新黑胶唱片旋转
    const vinylDisc = document.getElementById('vinylDisc');
    if (vinylDisc) {
        if (isPlaying) {
            vinylDisc.classList.add('spinning');
        } else {
            vinylDisc.classList.remove('spinning');
        }
    }
    
    // 更新唱针位置
    const tonearm = document.getElementById('tonearm');
    if (tonearm) {
        if (isPlaying) {
            tonearm.classList.add('playing');
        } else {
            tonearm.classList.remove('playing');
        }
    }
    
    // 更新播放按钮图标
    updateLandscapePlayIcons(isPlaying);
}

/**
 * 更新横屏播放按钮图标
 */
function updateLandscapePlayIcons(isPlaying) {
    const playIcon = document.getElementById('landscapePlayIcon');
    if (playIcon) {
        if (isPlaying) {
            playIcon.innerHTML = '<rect x="5" y="4" width="4" height="16"></rect><rect x="15" y="4" width="4" height="16"></rect>';
        } else {
            playIcon.innerHTML = '<polygon points="8 4 20 12 8 20 8 4"></polygon>';
        }
    }
}

/**
 * 更新横屏喜欢状态
 */
function updateLandscapeFavoriteState() {
    const state = PlayerStore.getState();
    const currentSong = state.currentSong;
    
    if (!currentSong) return;
    
    const isFav = PlayerStore.isFavorite(currentSong.id);
    const likeBtn = document.getElementById('landscapeLikeBtn');
    
    if (likeBtn) {
        const svg = likeBtn.querySelector('svg');
        if (isFav) {
            likeBtn.classList.add('active');
            svg.setAttribute('fill', '#e74c3c');
        } else {
            likeBtn.classList.remove('active');
            svg.setAttribute('fill', 'none');
        }
    }
}

/**
 * 更新横屏循环模式状态
 */
function updateLandscapeLoopState() {
    const state = PlayerStore.getState();
    const loopMode = state.loopMode || 'none';
    
    const loopBtn = document.getElementById('landscapeLoopBtn');
    if (!loopBtn) return;
    
    const svg = loopBtn.querySelector('svg');
    
    if (loopMode === 'one') {
        loopBtn.classList.add('active');
        svg.setAttribute('stroke', '#e74c3c');
        // 显示单曲循环图标
        svg.innerHTML = '<circle cx="12" cy="12" r="10"></circle><text x="12" y="16" font-size="12" text-anchor="middle" fill="currentColor">1</text>';
    } else if (loopMode === 'all') {
        loopBtn.classList.add('active');
        svg.setAttribute('stroke', '#e74c3c');
        // 显示列表循环图标
        svg.innerHTML = '<polyline points="17 1 21 5 17 9"></polyline><path d="M3 11V9a4 4 0 0 1 4-4h14"></path><polyline points="7 23 3 19 7 15"></polyline><path d="M21 13v2a4 4 0 0 1-4 4H3"></path>';
    } else if (loopMode === 'shuffle') {
        loopBtn.classList.add('active');
        svg.setAttribute('stroke', '#e74c3c');
        // 显示随机循环图标
        svg.innerHTML = '<polyline points="16 3 21 3 21 8"></polyline><line x1="4" y1="20" x2="21" y2="3"></line><polyline points="21 16 21 21 16 21"></polyline><line x1="15" y1="15" x2="21" y2="21"></line><line x1="4" y1="4" x2="9" y2="9"></line>';
    } else {
        loopBtn.classList.remove('active');
        svg.setAttribute('stroke', 'currentColor');
        // 显示默认循环图标
        svg.innerHTML = '<polyline points="17 1 21 5 17 9"></polyline><path d="M3 11V9a4 4 0 0 1 4-4h14"></path><polyline points="7 23 3 19 7 15"></polyline><path d="M21 13v2a4 4 0 0 1-4 4H3"></path>';
    }
}

/**
 * 在横屏模式下切换喜欢状态
 */
function toggleFavoriteInLandscape() {
    const state = PlayerStore.getState();
    const currentSong = state.currentSong;
    
    if (!currentSong) return;
    
    if (PlayerStore.isFavorite(currentSong.id)) {
        PlayerStore.removeFromFavorites(currentSong.id);
    } else {
        PlayerStore.addToFavorites(currentSong);
    }
    
    updateLandscapeFavoriteState();
}

/**
 * 横屏模式下切换循环模式
 */
function toggleLoopMode() {
    const state = PlayerStore.getState();
    const currentMode = state.loopMode || 'none';
    
    let newMode;
    if (currentMode === 'none') {
        newMode = 'all';
    } else if (currentMode === 'all') {
        newMode = 'one';
    } else if (currentMode === 'one') {
        newMode = 'shuffle';
    } else {
        newMode = 'none';
    }
    
    PlayerStore.setState({ loopMode: newMode });
    updateLandscapeLoopState();
    
    // 同步更新主播放器的循环按钮
    const mainLoopBtn = document.getElementById('loopBtn');
    if (mainLoopBtn) {
        mainLoopBtn.setAttribute('data-loop', newMode);
    }
}

// 注意：playPrevious 和 playNext 函数已在 player.js 中定义
// 这里不需要重复定义，直接使用 player.js 中的函数

/**
 * 横屏模式下播放/暂停
 */
function togglePlayPause() {
    // 触发播放/暂停事件
    const audioElement = document.querySelector('audio');
    if (audioElement) {
        if (audioElement.paused) {
            audioElement.play().catch(console.error);
        } else {
            audioElement.pause();
        }
    }
}

/**
 * 打开换肤弹窗
 */
function openSkinModal() {
    const skinModal = document.getElementById('skinModal');
    if (skinModal) {
        skinModal.classList.add('active');
    }
}

/**
 * 关闭换肤弹窗
 */
function closeSkinModal() {
    const skinModal = document.getElementById('skinModal');
    if (skinModal) {
        skinModal.classList.remove('active');
    }
}

// 监听播放器事件，更新横屏UI
document.addEventListener('player:play', () => {
    if (isLandscapeMode) {
        updateLandscapePlayState();
    }
});

document.addEventListener('player:pause', () => {
    if (isLandscapeMode) {
        updateLandscapePlayState();
    }
});

document.addEventListener('player:timeupdate', () => {
    if (isLandscapeMode) {
        updateLandscapeLyrics();
    }
});

document.addEventListener('player:songchange', () => {
    if (isLandscapeMode) {
        updateLandscapeUI();
    }
});

// 点击换肤弹窗背景关闭
document.addEventListener('click', (e) => {
    const skinModal = document.getElementById('skinModal');
    if (skinModal && e.target === skinModal) {
        closeSkinModal();
    }
});

// 监听音频元素事件
document.addEventListener('DOMContentLoaded', () => {
    // 延迟检查音频元素，确保其已被创建
    setTimeout(() => {
        setupAudioListeners();
    }, 100);
});

function setupAudioListeners() {
    const audioElement = document.querySelector('audio');
    if (audioElement) {
        // 监听播放事件
        audioElement.addEventListener('play', () => {
            PlayerStore.setState({ isPlaying: true });
            if (isLandscapeMode) {
                updateLandscapePlayState();
            }
        });
        
        // 监听暂停事件
        audioElement.addEventListener('pause', () => {
            PlayerStore.setState({ isPlaying: false });
            if (isLandscapeMode) {
                updateLandscapePlayState();
            }
        });
        
        // 监听时间更新事件
        audioElement.addEventListener('timeupdate', () => {
            if (isLandscapeMode) {
                updateLandscapeLyrics();
            }
        });
        
        // 同步初始播放状态
        if (isLandscapeMode) {
            PlayerStore.setState({ isPlaying: !audioElement.paused });
            updateLandscapePlayState();
        }
    } else {
        // 如果音频元素还未创建，继续等待
        setTimeout(setupAudioListeners, 100);
    }
}