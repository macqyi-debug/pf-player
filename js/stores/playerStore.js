/**
 * 播放器状态管理
 * 集中管理播放器的所有状态和操作
 */

const PlayerStore = {
    state: {
        currentSong: null,
        playlist: [],
        isPlaying: false,
        isLoading: false,
        volume: 1,
        currentTime: 0,
        duration: 0,
        playbackMode: 'sequential', // sequential, repeat, shuffle
        favorites: [],
        recentPlays: []
    },
    
    listeners: [],
    initialized: false,
    
    async init() {
        // 防止重复初始化
        if (this.initialized) return;

        let localSongs = [];
        // 先加载本地歌曲缓存（用于后续还原 favorites/recentPlays 中的本地歌曲）
        if (window.LocalMusicModule) {
            try {
                localSongs = await LocalMusicModule.getLocalSongs();
            } catch (e) {
                console.warn('加载本地歌曲失败:', e);
            }
        }

        // 从本地存储加载数据
        const savedState = localStorage.getItem('pfPlayerState');
        if (savedState) {
            try {
                const parsed = JSON.parse(savedState);

                // 还原本地歌曲（无 url 的本地歌曲从 IndexedDB 还原）
                const hydrateFromLocal = (songs) => {
                    if (!songs || songs.length === 0) return [];
                    return songs.map(song => {
                        if (song && song.type === 'local' && (!song.url || song.url === null)) {
                            const fullSong = localSongs.find(s => s.id === song.id);
                            return fullSong || song;
                        }
                        return song;
                    }).filter(s => s && s.name);
                };

                this.state.favorites = hydrateFromLocal(parsed.favorites || []);
                this.state.recentPlays = hydrateFromLocal(parsed.recentPlays || []);

                // 播放列表：过滤 Blob URL，并还原本地歌曲
                const savedPlaylist = parsed.playlist || [];
                this.state.playlist = savedPlaylist.filter(song => {
                    if (song.url && song.url.startsWith('blob:')) {
                        console.warn('PlayerStore 过滤已失效的 Blob URL 歌曲:', song.name || song.title);
                        return false;
                    }
                    return true;
                }).map(song => {
                    if (song && song.type === 'local' && (!song.url || song.url === null)) {
                        const fullSong = localSongs.find(s => s.id === song.id);
                        return fullSong || song;
                    }
                    return song;
                });

                this.state.volume = parsed.volume ?? 1;
            } catch (e) {
                console.error('加载播放器状态失败:', e);
            }
        }

        // 首先加载磁带盒默认歌曲（A面和B面）
        if (window.playlist) {
            const existingIds = new Set(this.state.playlist.map(s => s.id));

            // 添加A面歌曲
            (window.playlist.A || []).forEach(song => {
                if (!existingIds.has(song.id)) {
                    this.state.playlist.push({ ...song, side: 'A' });
                    existingIds.add(song.id);
                }
            });

            // 添加B面歌曲
            (window.playlist.B || []).forEach(song => {
                if (!existingIds.has(song.id)) {
                    this.state.playlist.push({ ...song, side: 'B' });
                    existingIds.add(song.id);
                }
            });

            console.log('PlayerStore 加载了磁带盒默认歌曲:', this.state.playlist.length, '首');
        }

        // 添加本地歌曲到播放列表（去重后添加）
        if (localSongs.length > 0) {
            const existingIds = new Set(this.state.playlist.map(s => s.id));
            localSongs.forEach(song => {
                if (!existingIds.has(song.id)) {
                    this.state.playlist.push(song);
                }
            });
            console.log('PlayerStore 总播放列表歌曲:', this.state.playlist.length, '首');
        }

        this.initialized = true;
    },
    
    // 精简歌曲对象（去除大字段 url 和 cover data URL）
    compactSong(song) {
        if (!song) return song;
        return {
            id: song.id,
            name: song.name,
            artist: song.artist || '',
            album: song.album || '',
            cover: (typeof song.cover === 'string' && song.cover.startsWith('data:')) ? '' : (song.cover || ''),
            duration: song.duration || 0,
            type: song.type || '',
            addedAt: song.addedAt || Date.now()
        };
    },

    save() {
        try {
            // 保存到本地存储时，所有歌曲都精简（去除 url 和 cover data URL）
            const toSave = {
                favorites: (this.state.favorites || []).map(song => this.compactSong(song)),
                recentPlays: (this.state.recentPlays || []).map(song => this.compactSong(song)),
                playlist: (this.state.playlist || []).map(song => this.compactSong(song)),
                volume: this.state.volume
            };
            localStorage.setItem('pfPlayerState', JSON.stringify(toSave));
        } catch (e) {
            console.error('保存播放器状态失败:', e);
            // 如果仍然失败，尝试清理部分数据
            if (e.name === 'QuotaExceededError') {
                this.cleanupStorage();
            }
        }
    },

    cleanupStorage() {
        try {
            // 清理最近播放记录和播放列表来释放空间（只保留收藏和音量）
            const toSave = {
                favorites: (this.state.favorites || []).slice(0, 50).map(song => this.compactSong(song)),
                recentPlays: [],
                playlist: [],
                volume: this.state.volume
            };
            localStorage.setItem('pfPlayerState', JSON.stringify(toSave));
            console.log('已清理部分存储数据以释放空间');
        } catch (e) {
            console.error('清理存储失败:', e);
        }
    },
    
    subscribe(listener) {
        this.listeners.push(listener);
        // 立即通知一次当前状态
        listener(this.state);
        return () => {
            this.listeners = this.listeners.filter(l => l !== listener);
        };
    },
    
    getState() {
        return this.state;
    },
    
    notify() {
        this.listeners.forEach(listener => listener(this.state));
    },
    
    setState(updates) {
        this.state = { ...this.state, ...updates };
        this.save();
        this.notify();
    },
    
    // 播放控制
    play(song) {
        if (!song) return;
        this.setState({ 
            currentSong: song, 
            isPlaying: true,
            isLoading: true 
        });
        
        // 添加到最近播放
        this.addToRecentPlays(song);
    },
    
    pause() {
        this.setState({ isPlaying: false });
    },
    
    resume() {
        this.setState({ isPlaying: true });
    },
    
    toggle() {
        if (this.state.isPlaying) {
            this.pause();
        } else {
            this.resume();
        }
    },
    
    // 播放列表管理
    addToPlaylist(song) {
        if (!this.state.playlist.find(s => s.id === song.id)) {
            this.setState({
                playlist: [...this.state.playlist, song]
            });
        }
    },
    
    removeFromPlaylist(songId) {
        this.setState({
            playlist: this.state.playlist.filter(s => s.id !== songId)
        });
    },
    
    clearPlaylist() {
        this.setState({ playlist: [] });
    },
    
    setPlaylist(newPlaylist) {
        this.setState({ playlist: newPlaylist });
    },
    
    // 收藏管理
    addToFavorites(song) {
        if (!this.state.favorites.find(s => s.id === song.id)) {
            this.setState({
                favorites: [...this.state.favorites, song]
            });
        }
    },
    
    removeFromFavorites(songId) {
        this.setState({
            favorites: this.state.favorites.filter(s => s.id !== songId)
        });
    },
    
    toggleFavorite(song) {
        const isFav = this.state.favorites.find(s => s.id === song.id);
        if (isFav) {
            this.setState({
                favorites: this.state.favorites.filter(s => s.id !== song.id)
            });
        } else {
            this.setState({
                favorites: [...this.state.favorites, song]
            });
        }
    },
    
    isFavorite(songId) {
        return this.state.favorites.some(s => s.id === songId);
    },
    
    // 最近播放
    addToRecentPlays(song) {
        const filtered = this.state.recentPlays.filter(s => s.id !== song.id);
        const updated = [song, ...filtered].slice(0, 50); // 保留最近50首
        this.setState({ recentPlays: updated });
    },
    
    // 播放模式
    setPlaybackMode(mode) {
        this.setState({ playbackMode: mode });
    },
    
    // 音量
    setVolume(volume) {
        this.setState({ volume: Math.max(0, Math.min(1, volume)) });
    },
    
    // 进度更新
    setProgress(currentTime, duration) {
        this.setState({ currentTime, duration });
    },
    
    setLoading(isLoading) {
        this.setState({ isLoading });
    }
};

// 初始化
PlayerStore.init();