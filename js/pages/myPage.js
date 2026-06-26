/**
 * 我的（My）页面 - 用户个人中心
 */

const MyPage = {
    render(container) {
        const state = PlayerStore.state;
        
        container.innerHTML = `
            <div class="page my-page">
                <div class="page-header">
                    <h1>我的</h1>
                    <p class="subtitle">从未被磨平的棱角依然锋利</p>
                </div>
                
                <div class="page-content">
                    <!-- 个人资料 -->
                    <section class="section profile-section">
                        <div class="profile-card">
                            <div class="profile-avatar">
                                <div class="avatar-frame">👤</div>
                                <button class="avatar-edit">✏️</button>
                            </div>
                            <div class="profile-info">
                                <h2>摇滚乐迷</h2>
                                <div class="badges">
                                    <span class="badge">🎸 Riff 解构师</span>
                                    <span class="badge">💿 黑胶收藏家</span>
                                </div>
                            </div>
                            <button class="edit-profile">编辑资料</button>
                        </div>
                        
                        <!-- 日签 -->
                        <div class="daily-quote">
                            <blockquote>
                                "The band is a democracy... until someone brings in a new idea."
                                <cite>— Roger Waters</cite>
                            </blockquote>
                            <button class="quote-action">🎯 今日挑战</button>
                        </div>
                    </section>
                    
                    <!-- 功能快捷入口 -->
                    <section class="section quick-actions">
                        <div class="action-grid">
                            <div class="action-item" data-action="favorites">
                                <div class="action-icon">❤️</div>
                                <span>喜欢</span>
                                <span class="count">${state.favorites.length}</span>
                            </div>
                            <div class="action-item" data-action="recent">
                                <div class="action-icon">🕐</div>
                                <span>最近</span>
                                <span class="count">${state.recentPlays.length}</span>
                            </div>
                            <div class="action-item" data-action="downloads">
                                <div class="action-icon">⬇️</div>
                                <span>下载</span>
                                <span class="count">0</span>
                            </div>
                            <div class="action-item" data-action="collections">
                                <div class="action-icon">📁</div>
                                <span>收藏</span>
                                <span class="count">0</span>
                            </div>
                        </div>
                    </section>
                    
                    <!-- 音乐管理 -->
                    <section class="section music-management">
                        <h2><svg class="play-icon-svg" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>曲库</h2>
                        
                        <div class="menu-list">
                            <div class="menu-item" data-page="liked-songs" onclick="toggleMusicLibrary(this, 'liked')">
                                <div class="menu-icon">❤️</div>
                                <div class="menu-content-wrapper">
                                    <div class="menu-content">
                                        <h3>喜欢的歌曲</h3>
                                        <p>${state.favorites.length} 首</p>
                                    </div>
                                </div>
                                <span class="arrow">›</span>
                            </div>
                            <div class="menu-item-content" id="liked-content">
                                <div class="song-list" id="liked-songs-list">
                                    ${this.renderSongList(state.favorites)}
                                </div>
                            </div>
                            
                            <div class="menu-item" data-page="local-songs" onclick="toggleMusicLibrary(this, 'local')">
                                <div class="menu-icon">📂</div>
                                <div class="menu-content-wrapper">
                                    <div class="menu-content">
                                        <h3>本地歌曲</h3>
                                        <p>${state.playlist.length} 首</p>
                                    </div>
                                </div>
                                <button class="import-btn" id="import-music-btn" onclick="event.stopPropagation();">导入</button>
                                <span class="arrow">›</span>
                            </div>
                            <div class="menu-item-content" id="local-content">
                                <div class="song-list" id="local-songs-list">
                                    ${this.renderSongList(state.playlist)}
                                </div>
                            </div>
                            
                            <div class="menu-item" data-page="playlists" onclick="toggleMusicLibrary(this, 'playlists')">
                                <div class="menu-icon">📋</div>
                                <div class="menu-content-wrapper">
                                    <div class="menu-content">
                                        <h3>歌单</h3>
                                        <p id="playlist-count">${this.getPlaylistCount()} 个</p>
                                    </div>
                                </div>
                                <span class="arrow">›</span>
                            </div>
                            <div class="menu-item-content" id="playlists-content">
                                <div class="playlist-grid" id="playlists-grid">
                                    ${this.renderPlaylists()}
                                </div>
                            </div>
                            
                            <div class="menu-item" data-page="history" onclick="toggleMusicLibrary(this, 'history')">
                                <div class="menu-icon">📜</div>
                                <div class="menu-content-wrapper">
                                    <div class="menu-content">
                                        <h3>播放历史</h3>
                                        <p>时间线视图</p>
                                    </div>
                                </div>
                                <span class="arrow">›</span>
                            </div>
                            <div class="menu-item-content" id="history-content">
                                <div class="history-timeline" id="history-timeline">
                                    ${this.renderHistory()}
                                </div>
                            </div>
                        </div>
                    </section>
                    
                    <!-- 设置 -->
                    <section class="section settings-section">
                        <h2><svg class="play-icon-svg" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>设置</h2>
                        
                        <div class="settings-group">
                            <div class="setting-item">
                                <div class="setting-info">
                                    <h3>音质与播放</h3>
                                    <p>音频输出、设备链模拟</p>
                                </div>
                                <span class="arrow">›</span>
                            </div>
                            
                            <div class="setting-item">
                                <div class="setting-info">
                                    <h3>外观</h3>
                                    <p>主题、壁纸、装扮</p>
                                </div>
                                <span class="arrow">›</span>
                            </div>
                            
                            <div class="setting-item">
                                <div class="setting-info">
                                    <h3>隐私与权限</h3>
                                    <p>数据管理、权限控制</p>
                                </div>
                                <span class="arrow">›</span>
                            </div>
                            
                            <div class="setting-item">
                                <div class="setting-info">
                                    <h3>辅助功能</h3>
                                    <p>无障碍支持</p>
                                </div>
                                <span class="arrow">›</span>
                            </div>
                            
                            <div class="setting-item">
                                <div class="setting-info">
                                    <h3>关于我们</h3>
                                    <p>版本 v4.2.0</p>
                                </div>
                                <span class="arrow">›</span>
                            </div>
                        </div>
                    </section>
                    
                    <!-- 登录/其他选项 -->
                    <section class="section account-section">
                        <button class="logout-btn">退出登录</button>
                    </section>
                </div>
            </div>
        `;
        
        this.bindEvents();
    },
    
    bindEvents() {
        // 功能快捷入口
        document.querySelectorAll('.action-item').forEach(item => {
            item.addEventListener('click', () => {
                const action = item.dataset.action;
                console.log('点击功能:', action);
                // 导航到对应页面
                Router.navigate(`my-${action}`);
            });
        });
        
        // 菜单项
        document.querySelectorAll('.menu-item').forEach(item => {
            item.addEventListener('click', () => {
                const page = item.dataset.page;
                if (page) {
                    console.log('导航到:', page);
                    if (page === 'playlists' && window.LocalMusicModule) {
                        LocalMusicModule.showMyPlaylists();
                    } else if (page === 'local-songs' && window.LocalMusicModule) {
                        LocalMusicModule.showLocalSongsPage();
                    } else if (page === 'history' && window.LocalMusicModule) {
                        LocalMusicModule.showHistoryPage();
                    }
                }
            });
        });
        
        // 导入音乐按钮
        const importBtn = document.getElementById('import-music-btn');
        if (importBtn) {
            importBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                UIManager.showImportPanel();
            });
        }
        
        // 设置项
        document.querySelectorAll('.setting-item').forEach(item => {
            item.addEventListener('click', () => {
                const settingName = item.querySelector('h3').textContent;
                console.log('打开设置:', settingName);
            });
        });
    },
    
    // 获取歌单数量
    getPlaylistCount() {
        try {
            const stored = localStorage.getItem('localPlaylists');
            const playlists = stored ? JSON.parse(stored) : [];
            return playlists.length;
        } catch (e) {
            return 0;
        }
    },

    // 渲染歌曲列表
    renderSongList(songs) {
        if (!songs || songs.length === 0) {
            return `
                <div class="empty-state">
                    <div class="empty-state-icon">🎵</div>
                    <div class="empty-state-text">暂无歌曲</div>
                </div>
            `;
        }
        
        return songs.slice(0, 10).map(song => `
            <div class="song-item" onclick="playSongById('${song.id}')">
                <div class="song-item-album">💿</div>
                <div class="song-item-info">
                    <div class="song-item-title">${song.name}</div>
                    <div class="song-item-artist">${song.artist || '未知艺术家'}</div>
                </div>
                <div class="song-item-duration">${song.duration || '--:--'}</div>
            </div>
        `).join('') + (songs.length > 10 ? `<div class="empty-state"><div class="empty-state-text">还有 ${songs.length - 10} 首歌曲...</div></div>` : '');
    },

    // 渲染歌单
    renderPlaylists() {
        try {
            const stored = localStorage.getItem('localPlaylists');
            const playlists = stored ? JSON.parse(stored) : [];
            
            if (playlists.length === 0) {
                return `
                    <div class="empty-state" style="grid-column: span 2;">
                        <div class="empty-state-icon">📋</div>
                        <div class="empty-state-text">暂无歌单</div>
                    </div>
                `;
            }
            
            return playlists.map(playlist => `
                <div class="playlist-card" onclick="showPlaylistDetail('${playlist.id}')">
                    <div class="playlist-cover">🎶</div>
                    <div class="playlist-name">${playlist.name}</div>
                    <div class="playlist-count">${playlist.songs ? playlist.songs.length : 0} 首</div>
                </div>
            `).join('');
        } catch (e) {
            return '<div class="empty-state" style="grid-column: span 2;"><div class="empty-state-text">加载失败</div></div>';
        }
    },

    // 渲染播放历史
    renderHistory() {
        try {
            const recentPlays = PlayerStore.state.recentPlays || [];
            
            if (recentPlays.length === 0) {
                return `
                    <div class="empty-state">
                        <div class="empty-state-icon">📜</div>
                        <div class="empty-state-text">暂无播放记录</div>
                    </div>
                `;
            }
            
            // 按日期分组
            const grouped = {};
            recentPlays.forEach(song => {
                const date = song.playedAt ? new Date(song.playedAt).toLocaleDateString() : '未知时间';
                if (!grouped[date]) {
                    grouped[date] = [];
                }
                grouped[date].push(song);
            });
            
            return Object.entries(grouped).slice(0, 5).map(([date, songs]) => `
                <div class="history-group">
                    <div class="history-date">${date}</div>
                    <div class="history-songs">
                        ${songs.slice(0, 3).map(song => `
                            <div class="song-item" onclick="playSongById('${song.id}')">
                                <div class="song-item-album">💿</div>
                                <div class="song-item-info">
                                    <div class="song-item-title">${song.name}</div>
                                    <div class="song-item-artist">${song.artist || '未知艺术家'}</div>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </div>
            `).join('');
        } catch (e) {
            return '<div class="empty-state"><div class="empty-state-text">加载失败</div></div>';
        }
    }
};

// 音乐库展开/折叠功能
function toggleMusicLibrary(element, type) {
    const contentId = `${type}-content`;
    const content = document.getElementById(contentId);
    
    if (!content) return;
    
    // 关闭其他展开的项目
    document.querySelectorAll('.menu-item-content.show').forEach(item => {
        if (item.id !== contentId) {
            item.classList.remove('show');
        }
    });
    
    document.querySelectorAll('.menu-item.expanded').forEach(item => {
        if (item !== element) {
            item.classList.remove('expanded');
        }
    });
    
    // 切换当前项目
    content.classList.toggle('show');
    element.classList.toggle('expanded');
    
    // 旋转箭头
    const arrow = element.querySelector('.arrow');
    if (arrow) {
        arrow.style.transform = content.classList.contains('show') ? 'rotate(90deg)' : '';
    }
}

// 播放指定歌曲
function playSongById(songId) {
    console.log('播放歌曲:', songId);
    // 查找并播放歌曲
    const state = PlayerStore.state;
    let song = null;
    
    // 从各个列表中查找歌曲
    const allSongs = [
        ...(state.favorites || []),
        ...(state.playlist || []),
        ...(state.recentPlays || [])
    ];
    
    song = allSongs.find(s => s.id === songId);
    
    if (song) {
        const index = (state.playlist || []).findIndex(s => s.id === songId);
        if (index !== -1) {
            currentSongIndex = index;
            playSong(index);
        }
    }
}

// 显示歌单详情
function showPlaylistDetail(playlistId) {
    console.log('显示歌单详情:', playlistId);
    // 可以在这里打开歌单详情弹窗
    const stored = localStorage.getItem('localPlaylists');
    const playlists = stored ? JSON.parse(stored) : [];
    const playlist = playlists.find(p => p.id === playlistId);
    
    if (playlist) {
        alert(`歌单: ${playlist.name}\n歌曲数: ${playlist.songs ? playlist.songs.length : 0}`);
    }
}