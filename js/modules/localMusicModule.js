/**
 * 本地音乐导入模块
 * 使用 IndexedDB 存储大型音频文件，避免 localStorage 容量限制
 */

const LocalMusicModule = {
    // IndexedDB 数据库名称和版本
    DB_NAME: 'PFPlayerDB',
    DB_VERSION: 1,
    STORE_NAME: 'songs',
    db: null,
    
    // 本地歌曲缓存（用于同步访问）
    cachedLocalSongs: [],
    
    // 支持的音乐格式
    supportedFormats: [
        'audio/mpeg',      // MP3
        'audio/wav',       // WAV
        'audio/ogg',       // OGG
        'audio/flac',      // FLAC
        'audio/aac',       // AAC
        'audio/m4a',       // M4A
        'audio/mp4',       // MP4 Audio
        'audio/wma',       // WMA
        'audio/webm'       // WebM
    ],
    
    // 文件扩展名映射
    formatExtensions: {
        'audio/mpeg': '.mp3',
        'audio/wav': '.wav',
        'audio/ogg': '.ogg',
        'audio/flac': '.flac',
        'audio/aac': '.aac',
        'audio/m4a': '.m4a',
        'audio/mp4': '.mp4',
        'audio/wma': '.wma',
        'audio/webm': '.webm'
    },
    
    // 初始化
    async init() {
        // 初始化 IndexedDB
        await this.initDB();
        this.bindEvents();
        this.loadLocalSongs();
        this.loadPlaybackState();
    },
    
    // 初始化 IndexedDB
    initDB() {
        return new Promise((resolve, reject) => {
            if (this.db) {
                resolve(this.db);
                return;
            }
            
            const request = indexedDB.open(this.DB_NAME, this.DB_VERSION);
            
            request.onerror = (event) => {
                console.error('IndexedDB 打开失败:', event.target.error);
                reject(event.target.error);
            };
            
            request.onsuccess = (event) => {
                this.db = event.target.result;
                console.log('IndexedDB 初始化成功');
                resolve(this.db);
            };
            
            request.onupgradeneeded = (event) => {
                const db = event.target.result;
                
                // 创建歌曲存储对象
                if (!db.objectStoreNames.contains(this.STORE_NAME)) {
                    const store = db.createObjectStore(this.STORE_NAME, { keyPath: 'id' });
                    store.createIndex('name', 'name', { unique: false });
                    store.createIndex('artist', 'artist', { unique: false });
                    store.createIndex('addedAt', 'addedAt', { unique: false });
                }
                
                console.log('IndexedDB 对象存储已创建');
            };
        });
    },
    
    // 保存歌曲到 IndexedDB
    saveSongToDB(song) {
        return new Promise((resolve, reject) => {
            if (!this.db) {
                reject(new Error('IndexedDB 未初始化'));
                return;
            }
            
            const transaction = this.db.transaction([this.STORE_NAME], 'readwrite');
            const store = transaction.objectStore(this.STORE_NAME);
            const request = store.put(song);
            
            request.onsuccess = () => {
                console.log('歌曲已保存到 IndexedDB:', song.name);
                resolve(song);
            };
            
            request.onerror = (event) => {
                console.error('保存歌曲失败:', event.target.error);
                reject(event.target.error);
            };
        });
    },
    
    // 从 IndexedDB 获取所有歌曲
    getAllSongsFromDB() {
        return new Promise((resolve, reject) => {
            if (!this.db) {
                resolve([]);
                return;
            }
            
            const transaction = this.db.transaction([this.STORE_NAME], 'readonly');
            const store = transaction.objectStore(this.STORE_NAME);
            const request = store.getAll();
            
            request.onsuccess = (event) => {
                resolve(event.target.result || []);
            };
            
            request.onerror = (event) => {
                console.error('获取歌曲失败:', event.target.error);
                reject(event.target.error);
            };
        });
    },
    
    // 从 IndexedDB 删除歌曲
    deleteSongFromDB(songId) {
        return new Promise((resolve, reject) => {
            if (!this.db) {
                reject(new Error('IndexedDB 未初始化'));
                return;
            }
            
            const transaction = this.db.transaction([this.STORE_NAME], 'readwrite');
            const store = transaction.objectStore(this.STORE_NAME);
            const request = store.delete(songId);
            
            request.onsuccess = () => {
                console.log('歌曲已从 IndexedDB 删除');
                resolve();
            };
            
            request.onerror = (event) => {
                console.error('删除歌曲失败:', event.target.error);
                reject(event.target.error);
            };
        });
    },
    
    // 绑定事件
    bindEvents() {
        // 文件上传输入
        const fileInput = document.getElementById('music-file-input');
        if (fileInput) {
            fileInput.addEventListener('change', (e) => {
                this.handleFileSelect(e);
                // 重置文件输入，允许选择相同文件
                fileInput.value = '';
            });
        }
        
        // 拖拽上传区域
        const dropZone = document.getElementById('drop-zone');
        if (dropZone) {
            dropZone.addEventListener('dragover', (e) => {
                e.preventDefault();
                dropZone.classList.add('drag-over');
            });
            
            dropZone.addEventListener('dragleave', (e) => {
                e.preventDefault();
                dropZone.classList.remove('drag-over');
            });
            
            dropZone.addEventListener('drop', (e) => {
                e.preventDefault();
                dropZone.classList.remove('drag-over');
                const files = e.dataTransfer.files;
                this.processFiles(files);
            });
        }
        
        // 点击上传区域
        dropZone?.addEventListener('click', () => {
            fileInput?.click();
        });
    },
    
    // 处理文件选择
    handleFileSelect(e) {
        const files = e.target.files;
        if (files.length > 0) {
            this.processFiles(files);
        }
    },
    
    // 处理上传的文件
    async processFiles(files) {
        // 支持的扩展名
        const supportedExtensions = ['.mp3', '.wav', '.ogg', '.flac', '.aac', '.m4a', '.mp4', '.wma', '.webm'];
        
        const validFiles = Array.from(files).filter(file => {
            // 首先检查 MIME 类型
            const hasValidMimeType = this.supportedFormats.includes(file.type);
            
            // 如果 MIME 类型无效，检查扩展名
            if (!hasValidMimeType) {
                const fileName = file.name.toLowerCase();
                return supportedExtensions.some(ext => fileName.endsWith(ext));
            }
            
            return true;
        });
        
        if (validFiles.length === 0) {
            UIManager.showToast('请选择有效的音乐文件！', 'error');
            return;
        }
        
        UIManager.showToast(`正在导入 ${validFiles.length} 首歌曲...`, 'info');
        
        const importedSongs = [];
        for (const file of validFiles) {
            const song = await this.importFile(file);
            if (song) {
                importedSongs.push(song);
            }
        }
        
        // 显示导入成功提示
        if (importedSongs.length > 0) {
            const songNames = importedSongs.map(s => s.name).slice(0, 3).join('、');
            const moreText = importedSongs.length > 3 ? `等${importedSongs.length}首歌曲` : '';
            UIManager.showToast(`✅ 成功导入：${songNames}${moreText}`, 'success');
            
            // 自动创建/更新本地歌单
            this.createOrUpdateLocalPlaylist(importedSongs);
            
            // 跳转到本地歌曲歌单页面
            setTimeout(() => {
                this.navigateToLocalPlaylist();
            }, 1000);
        }
        
        this.hideImportPanel();
        
        // 更新播放列表显示
        this.updateLocalSongsList();
    },
    
    // 导入单个文件
    async importFile(file) {
        return new Promise((resolve) => {
            // 解析文件名获取信息
            const songInfo = this.parseFileName(file.name);
            
            // 读取文件为 base64 data URL 进行持久化存储
            this.readFileAsDataURL(file).then((dataUrl) => {
                // 使用Web Audio API尝试获取更多元数据
                this.extractMetadata(file, dataUrl, (metadata) => {
                    const song = {
                        id: `local_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
                        name: metadata.title || songInfo.name || file.name,
                        artist: metadata.artist || songInfo.artist || '未知艺术家',
                        album: metadata.album || songInfo.album || '未知专辑',
                        cover: metadata.cover || this.generateCover(songInfo.name),
                        url: dataUrl,
                        duration: metadata.duration || 0,
                        fileSize: file.size,
                        fileName: file.name,
                        mimeType: file.type || 'audio/mpeg',
                        type: 'local',
                        addedAt: Date.now()
                    };
                    
                    // 添加到播放列表
                    this.addToPlaylist(song);
                    resolve(song);
                });
            }).catch((error) => {
                console.error('读取文件失败:', file.name, error);
                UIManager.showToast(`读取文件失败: ${file.name}`, 'error');
                resolve(null);
            });
        });
    },
    
    // 将文件读取为 base64 data URL（持久化存储方案）
    readFileAsDataURL(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = (e) => {
                resolve(e.target.result);
            };
            reader.onerror = (e) => {
                reject(e);
            };
            reader.readAsDataURL(file);
        });
    },
    
    // 解析文件名
    parseFileName(fileName) {
        // 移除扩展名
        const nameWithoutExt = fileName.replace(/\.[^/.]+$/, '');
        
        // 尝试解析 "艺术家 - 歌曲名" 格式
        const dashIndex = nameWithoutExt.lastIndexOf(' - ');
        if (dashIndex !== -1) {
            return {
                artist: nameWithoutExt.substring(0, dashIndex).trim(),
                name: nameWithoutExt.substring(dashIndex + 3).trim(),
                album: ''
            };
        }
        
        // 尝试解析 "歌曲名 - 专辑" 格式
        const parenthesisMatch = nameWithoutExt.match(/(.+?)\s*\((.+?)\)$/);
        if (parenthesisMatch) {
            return {
                artist: '',
                name: parenthesisMatch[1].trim(),
                album: parenthesisMatch[2].trim()
            };
        }
        
        return {
            artist: '',
            name: nameWithoutExt,
            album: ''
        };
    },
    
    // 提取音频元数据
    extractMetadata(file, fileUrl, callback) {
        const audio = new Audio();
        audio.src = fileUrl;
        
        let metadata = {
            title: '',
            artist: '',
            album: '',
            cover: '',
            duration: 0
        };
        
        audio.addEventListener('loadedmetadata', () => {
            metadata.duration = audio.duration;
            
            // 尝试读取ID3标签（简化版本）
            this.readID3Tags(file, (id3Data) => {
                metadata.title = id3Data.title || metadata.title;
                metadata.artist = id3Data.artist || metadata.artist;
                metadata.album = id3Data.album || metadata.album;
                metadata.cover = id3Data.cover || metadata.cover;
                
                callback(metadata);
            });
        });
        
        audio.addEventListener('error', () => {
            callback(metadata);
        });
    },
    
    // 读取ID3标签（简化实现）
    readID3Tags(file, callback) {
        const reader = new FileReader();
        reader.onload = (e) => {
            const arrayBuffer = e.target.result;
            const data = new Uint8Array(arrayBuffer);
            
            let result = { title: '', artist: '', album: '', cover: '' };
            
            // 尝试查找ID3v2标签
            if (data[0] === 0x49 && data[1] === 0x44 && data[2] === 0x33) {
                // ID3v2标签存在
                const majorVersion = data[3];
                const revision = data[4];
                const flags = data[5];
                const size = this.syncSafeInt(data.subarray(6, 10));
                
                // 简单解析文本帧
                let offset = 10;
                while (offset < size) {
                    const frameId = String.fromCharCode(...data.subarray(offset, offset + 4));
                    const frameSize = this.syncSafeInt(data.subarray(offset + 4, offset + 8));
                    
                    if (frameSize > 0 && frameId.length === 4) {
                        const encoding = data[offset + 10];
                        const content = this.decodeString(data.subarray(offset + 11, offset + 10 + frameSize), encoding);
                        
                        if (frameId === 'TIT2') result.title = content.trim();
                        else if (frameId === 'TPE1') result.artist = content.trim();
                        else if (frameId === 'TALB') result.album = content.trim();
                        else if (frameId === 'APIC') {
                            // 封面图片 - 使用 base64 data URL 代替 Blob URL
                            const mimeTypeEnd = data.subarray(offset + 12).findIndex(v => v === 0);
                            let mimeType = String.fromCharCode(...data.subarray(offset + 12, offset + 12 + mimeTypeEnd));
                            if (!mimeType || mimeType.length < 3) mimeType = 'image/jpeg';
                            const descriptionEnd = data.subarray(offset + 12 + mimeTypeEnd + 1).findIndex(v => v === 0);
                            const picData = data.subarray(offset + 12 + mimeTypeEnd + 1 + descriptionEnd + 1, offset + 10 + frameSize);
                            
                            if (picData.length > 0) {
                                // 将 Uint8Array 转换为 base64 data URL（持久化存储）
                                let binary = '';
                                const bytes = new Uint8Array(picData);
                                const chunkSize = 0x8000; // 分块处理避免栈溢出
                                for (let i = 0; i < bytes.length; i += chunkSize) {
                                    binary += String.fromCharCode.apply(null, bytes.subarray(i, i + chunkSize));
                                }
                                const base64Cover = btoa(binary);
                                result.cover = `data:${mimeType};base64,${base64Cover}`;
                            }
                        }
                    }
                    
                    offset += 10 + frameSize;
                }
            }
            
            callback(result);
        };
        
        // 只读取文件头部（ID3标签通常在开头）
        const slice = file.slice(0, 1024 * 10); // 最多读取10KB
        reader.readAsArrayBuffer(slice);
    },
    
    // 同步安全整数转换
    syncSafeInt(bytes) {
        return (bytes[0] << 21) | (bytes[1] << 14) | (bytes[2] << 7) | bytes[3];
    },
    
    // 解码字符串
    decodeString(bytes, encoding) {
        try {
            if (encoding === 0x00) {
                // ISO-8859-1
                return String.fromCharCode(...bytes);
            } else if (encoding === 0x01) {
                // UTF-16 with BOM
                const decoder = new TextDecoder('utf-16');
                return decoder.decode(bytes);
            } else if (encoding === 0x02) {
                // UTF-16BE without BOM
                const decoder = new TextDecoder('utf-16be');
                return decoder.decode(bytes);
            } else if (encoding === 0x03) {
                // UTF-8
                const decoder = new TextDecoder('utf-8');
                return decoder.decode(bytes);
            }
        } catch (e) {
            console.error('字符串解码失败:', e);
        }
        return String.fromCharCode(...bytes);
    },
    
    // 生成封面图标
    generateCover(name) {
        const icons = ['🎵', '🎸', '🎹', '🎺', '🎻', '🥁', '🎷', '🎤', '🎧', '💿', '📀', '🔊'];
        const hash = name.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
        return icons[hash % icons.length];
    },
    
    // 添加到播放列表（使用 IndexedDB 存储）
    async addToPlaylist(song) {
        try {
            // 检查是否已存在
            const existingSongs = await this.getAllSongsFromDB();
            const exists = existingSongs.some(s => s.url === song.url || s.id === song.id);
            if (exists) {
                console.log('歌曲已存在:', song.name);
                return;
            }
            
            // 保存到 IndexedDB
            await this.saveSongToDB(song);

            // 同时添加到全局播放列表
            const pl = typeof playlist !== 'undefined' ? playlist : window.playlist;
            if (pl) {
                if (!pl.local) {
                    pl.local = [];
                }
                pl.local.push(song);
            }

            // 添加到 PlayerStore 的播放列表
            if (typeof PlayerStore !== 'undefined' && PlayerStore.state) {
                const existingIds = new Set(PlayerStore.state.playlist.map(s => s.id));
                if (!existingIds.has(song.id)) {
                    PlayerStore.state.playlist.push(song);
                }
            }
            
            // 更新 UI
            this.updateLocalSongsList();
            
            // 同步更新播放列表面板
            if (typeof UIManager !== 'undefined' && typeof UIManager.updatePlaylistContent === 'function') {
                UIManager.updatePlaylistContent();
            }
            
            console.log('添加本地歌曲:', song.name);
        } catch (error) {
            console.error('添加歌曲失败:', error);
            UIManager.showToast('添加歌曲失败，请重试', 'error');
        }
    },
    
    // 获取本地歌曲列表（从 IndexedDB 获取）
    async getLocalSongs() {
        try {
            // 从 IndexedDB 获取
            const songs = await this.getAllSongsFromDB();
            
            // 过滤掉失效的 Blob URL
            const validSongs = songs.filter(song => {
                if (song.url && song.url.startsWith('blob:')) {
                    console.warn('检测到已失效的 Blob URL 歌曲:', song.name || song.title);
                    return false;
                }
                return true;
            });
            
            // 更新缓存
            this.cachedLocalSongs = validSongs;
            
            return validSongs;
        } catch (e) {
            console.error('读取本地歌曲失败:', e);
            // 如果 IndexedDB 失败，尝试从 localStorage 读取（向后兼容）
            try {
                const stored = localStorage.getItem('localSongs');
                if (stored) {
                    const songs = JSON.parse(stored);
                    // 更新缓存
                    this.cachedLocalSongs = songs;
                    return songs;
                }
            } catch (lsError) {
                console.error('localStorage 读取也失败:', lsError);
            }
            return [];
        }
    },
    
    // 加载本地歌曲到播放列表
    async loadLocalSongs() {
        const localSongs = await this.getLocalSongs();

        const pl = typeof playlist !== 'undefined' ? playlist : window.playlist;
        if (pl && localSongs.length > 0) {
            pl.local = localSongs;
        }

        // 更新UI显示
        this.updateLocalSongsList();
    },
    
    // 更新本地歌曲列表UI
    async updateLocalSongsList() {
        const localSongs = await this.getLocalSongs();
        const countElement = document.querySelector('.menu-item[data-page="local-songs"] .menu-content p');
        
        if (countElement) {
            countElement.textContent = `${localSongs.length} 首`;
        }
        
        // 更新歌单数量
        const playlists = this.getPlaylists();
        const playlistCountEl = document.getElementById('playlist-count');
        if (playlistCountEl) {
            playlistCountEl.textContent = `${playlists.length} 个`;
        }
        
        // 如果有专门的本地歌曲页面，也更新它
        const localSongsContainer = document.getElementById('local-songs-container');
        if (localSongsContainer) {
            this.renderLocalSongsList(localSongsContainer, localSongs);
        }
    },
    
    // 渲染本地歌曲列表
    renderLocalSongsList(container, songs) {
        if (songs.length === 0) {
            container.innerHTML = `
                <div class="empty-state">
                    <div class="empty-icon">📁</div>
                    <p>暂无本地歌曲</p>
                    <button class="import-btn" onclick="UIManager.showImportPanel()">导入歌曲</button>
                </div>
            `;
            return;
        }
        
        container.innerHTML = `
            <div class="song-list">
                ${songs.map((song, index) => `
                    <div class="song-item" data-song-id="${song.id}" data-song-index="${index}">
                        <div class="song-cover">${typeof song.cover === 'string' && song.cover.startsWith('http') ? `<img src="${song.cover}" alt="${song.name}" />` : song.cover}</div>
                        <div class="song-details">
                            <h4>${song.name}</h4>
                            <p>${song.artist}</p>
                            <p class="song-album">${song.album}</p>
                        </div>
                        <button class="play-btn" onclick="LocalMusicModule.playLocalSong(${index})">▶</button>
                        <button class="delete-btn" onclick="LocalMusicModule.deleteLocalSong('${song.id}')">🗑️</button>
                    </div>
                `).join('')}
            </div>
        `;
    },
    
    // 播放本地歌曲
    async playLocalSong(index) {
        const localSongs = await this.getLocalSongs();
        if (localSongs[index]) {
            const song = localSongs[index];
            
            // 同步到 PlayerStore
            PlayerStore.state.playlist = localSongs;
            
            // 设置当前播放列表为本地歌曲
            if (typeof playlist !== 'undefined') {
                playlist.local = localSongs;
            }
            
            // 播放歌曲
            PlayerStore.play(song, index);
            
            // 调用 playSong 实际播放
            if (typeof playSong === 'function') {
                playSong(index);
            }
            UIManager.showMiniPlayer();
        }
    },
    // 删除本地歌曲（使用 IndexedDB）
    async deleteLocalSong(songId) {
        try {
            // 从 IndexedDB 删除
            await this.deleteSongFromDB(songId);

            // 更新播放列表
            const localSongs = await this.getLocalSongs();
            const pl = typeof playlist !== 'undefined' ? playlist : window.playlist;
            if (pl && pl.local) {
                pl.local = localSongs;
            }

            // 从 PlayerStore 移除
            if (typeof PlayerStore !== 'undefined') {
                PlayerStore.removeFromPlaylist(songId);
            }
            
            UIManager.showToast('已删除歌曲', 'success');
            this.updateLocalSongsList();
        } catch (error) {
            console.error('删除歌曲失败:', error);
            UIManager.showToast('删除失败，请重试', 'error');
        }
    },
    
    // 保存播放状态
    savePlaybackState(songId, currentTime, duration) {
        const state = {
            songId,
            currentTime,
            duration,
            savedAt: Date.now()
        };
        localStorage.setItem('playbackState', JSON.stringify(state));
    },
    
    // 加载播放状态
    loadPlaybackState() {
        try {
            const stored = localStorage.getItem('playbackState');
            if (stored) {
                const state = JSON.parse(stored);
                
                // 检查是否过期（超过7天）
                if (Date.now() - state.savedAt < 7 * 24 * 60 * 60 * 1000) {
                    return state;
                }
            }
        } catch (e) {
            console.error('读取播放状态失败:', e);
        }
        return null;
    },
    
    // 恢复播放
    resumePlayback() {
        const state = this.loadPlaybackState();
        if (state) {
            // 查找对应的歌曲
            const localSongs = this.getLocalSongs();
            const song = localSongs.find(s => s.id === state.songId);
            
            if (song) {
                // 设置播放列表
                if (typeof playlist !== 'undefined') {
                    playlist.current = playlist.local || localSongs;
                }
                
                // 播放并跳转到保存的位置
                PlayerStore.play(song);
                
                // 需要等待音频加载后再设置时间
                setTimeout(() => {
                    const audio = document.getElementById('audio-player');
                    if (audio) {
                        audio.currentTime = state.currentTime;
                    }
                }, 1000);
                
                UIManager.showToast('已恢复上次播放', 'info');
            }
        }
    },
    
    // ==================== 歌单管理功能 ====================
    
    // 获取所有歌单（包含 Blob URL 过滤）
    getPlaylists() {
        try {
            const stored = localStorage.getItem('localPlaylists');
            if (!stored) return [];
            
            const playlists = JSON.parse(stored);
            let needsSave = false;
            
            // 过滤歌单中歌曲的 Blob URL（已失效）
            playlists.forEach(playlist => {
                if (playlist.songs && playlist.songs.length > 0) {
                    const validSongs = playlist.songs.filter(song => {
                        if (song.url && song.url.startsWith('blob:')) {
                            console.warn('过滤歌单中已失效的 Blob URL 歌曲:', song.name || song.title);
                            needsSave = true;
                            return false;
                        }
                        return true;
                    });
                    playlist.songs = validSongs;
                    playlist.songCount = validSongs.length;
                }
            });
            
            // 如果有过滤，保存更新后的歌单
            if (needsSave) {
                localStorage.setItem('localPlaylists', JSON.stringify(playlists));
            }
            
            return playlists;
        } catch (e) {
            console.error('读取歌单失败:', e);
            return [];
        }
    },
    
    // 保存歌单
    savePlaylists(playlists) {
        try {
            localStorage.setItem('localPlaylists', JSON.stringify(playlists));
        } catch (e) {
            console.error('保存歌单失败:', e);
        }
    },
    
    // 创建或更新本地歌单
    createOrUpdateLocalPlaylist(songs) {
        let playlists = this.getPlaylists();
        
        // 查找是否存在"本地歌曲"歌单
        let localPlaylist = playlists.find(p => p.id === 'local-default');
        
        if (!localPlaylist) {
            // 创建默认本地歌单
            localPlaylist = {
                id: 'local-default',
                name: '本地歌曲',
                description: '从本地导入的歌曲',
                cover: '📁',
                songs: [],
                createdAt: Date.now(),
                updatedAt: Date.now()
            };
            playlists.push(localPlaylist);
        }
        
        // 添加新歌曲到歌单
        const existingIds = new Set(localPlaylist.songs.map(s => s.id));
        songs.forEach(song => {
            if (!existingIds.has(song.id)) {
                localPlaylist.songs.push(song);
            }
        });
        
        localPlaylist.updatedAt = Date.now();
        localPlaylist.songCount = localPlaylist.songs.length;
        
        this.savePlaylists(playlists);
        
        // 更新歌单列表UI
        this.updatePlaylistUI();
    },
    
    // 创建新歌单
    createPlaylist(name, description = '') {
        const playlists = this.getPlaylists();
        
        const newPlaylist = {
            id: `playlist_${Date.now()}`,
            name: name || '新建歌单',
            description: description,
            cover: this.generateCover(name),
            songs: [],
            createdAt: Date.now(),
            updatedAt: Date.now(),
            songCount: 0
        };
        
        playlists.push(newPlaylist);
        this.savePlaylists(playlists);
        
        UIManager.showToast(`歌单"${name}"创建成功`, 'success');
        this.updatePlaylistUI();
        
        return newPlaylist;
    },
    
    // 重命名歌单
    renamePlaylist(playlistId, newName) {
        const playlists = this.getPlaylists();
        const playlist = playlists.find(p => p.id === playlistId);
        
        if (playlist) {
            playlist.name = newName;
            playlist.updatedAt = Date.now();
            this.savePlaylists(playlists);
            UIManager.showToast('歌单已重命名', 'success');
            this.updatePlaylistUI();
        }
    },
    
    // 删除歌单
    deletePlaylist(playlistId) {
        let playlists = this.getPlaylists();
        playlists = playlists.filter(p => p.id !== playlistId);
        this.savePlaylists(playlists);
        UIManager.showToast('歌单已删除', 'success');
        this.updatePlaylistUI();
    },
    
    // 添加歌曲到歌单
    addSongToPlaylist(playlistId, song) {
        const playlists = this.getPlaylists();
        const playlist = playlists.find(p => p.id === playlistId);
        
        if (playlist) {
            // 检查歌曲是否已存在
            const exists = playlist.songs.some(s => s.id === song.id);
            if (!exists) {
                playlist.songs.push(song);
                playlist.songCount = playlist.songs.length;
                playlist.updatedAt = Date.now();
                this.savePlaylists(playlists);
                UIManager.showToast(`已添加到"${playlist.name}"`, 'success');
            } else {
                UIManager.showToast('歌曲已在该歌单中', 'info');
            }
        }
    },
    
    // 从歌单移除歌曲
    removeSongFromPlaylist(playlistId, songId) {
        const playlists = this.getPlaylists();
        const playlist = playlists.find(p => p.id === playlistId);
        
        if (playlist) {
            playlist.songs = playlist.songs.filter(s => s.id !== songId);
            playlist.songCount = playlist.songs.length;
            playlist.updatedAt = Date.now();
            this.savePlaylists(playlists);
            UIManager.showToast('已从歌单移除', 'success');
            this.updatePlaylistUI();
        }
    },
    
    // 歌曲排序
    sortPlaylistSongs(playlistId, sortBy = 'name', order = 'asc') {
        const playlists = this.getPlaylists();
        const playlist = playlists.find(p => p.id === playlistId);
        
        if (playlist && playlist.songs.length > 0) {
            playlist.songs.sort((a, b) => {
                let valueA, valueB;
                
                switch (sortBy) {
                    case 'name':
                        valueA = a.name.toLowerCase();
                        valueB = b.name.toLowerCase();
                        break;
                    case 'artist':
                        valueA = a.artist.toLowerCase();
                        valueB = b.artist.toLowerCase();
                        break;
                    case 'album':
                        valueA = a.album.toLowerCase();
                        valueB = b.album.toLowerCase();
                        break;
                    case 'addedAt':
                        valueA = a.addedAt || 0;
                        valueB = b.addedAt || 0;
                        break;
                    case 'duration':
                        valueA = a.duration || 0;
                        valueB = b.duration || 0;
                        break;
                    default:
                        valueA = a.name.toLowerCase();
                        valueB = b.name.toLowerCase();
                }
                
                if (order === 'asc') {
                    return valueA < valueB ? -1 : valueA > valueB ? 1 : 0;
                } else {
                    return valueA > valueB ? -1 : valueA < valueB ? 1 : 0;
                }
            });
            
            playlist.updatedAt = Date.now();
            this.savePlaylists(playlists);
            UIManager.showToast('排序完成', 'success');
            this.updatePlaylistUI();
        }
    },
    
    // 更新歌单UI
    updatePlaylistUI() {
        const playlists = this.getPlaylists();
        
        // 更新歌单数量显示
        const playlistCountEl = document.querySelector('.menu-item[data-page="playlists"] .menu-content p');
        if (playlistCountEl) {
            playlistCountEl.textContent = `${playlists.length} 个歌单`;
        }
        
        // 如果有歌单容器，更新歌单列表
        const playlistContainer = document.getElementById('playlist-container');
        if (playlistContainer) {
            this.renderPlaylistList(playlistContainer, playlists);
        }
    },
    
    // 渲染歌单列表
    renderPlaylistList(container, playlists) {
        if (playlists.length === 0) {
            container.innerHTML = `
                <div class="empty-state">
                    <div class="empty-icon">📋</div>
                    <p>暂无歌单</p>
                    <button class="create-playlist-btn" onclick="LocalMusicModule.showCreatePlaylistDialog()">创建歌单</button>
                </div>
            `;
            return;
        }
        
        container.innerHTML = `
            <div class="playlist-list">
                ${playlists.map(playlist => `
                    <div class="playlist-item" data-playlist-id="${playlist.id}" onclick="LocalMusicModule.renderPlaylistDetail('${playlist.id}')">
                        <div class="playlist-cover">${playlist.cover}</div>
                        <div class="playlist-info">
                            <h4>${playlist.name}</h4>
                            <p>${playlist.songCount || 0} 首歌曲</p>
                        </div>
                        <div class="playlist-actions">
                            <button class="play-playlist-btn" onclick="event.stopPropagation(); LocalMusicModule.playPlaylist('${playlist.id}')">▶</button>
                            <button class="sort-playlist-btn" onclick="event.stopPropagation(); LocalMusicModule.showSortDialog('${playlist.id}')">↕️</button>
                            <button class="edit-playlist-btn" onclick="event.stopPropagation(); LocalMusicModule.showRenameDialog('${playlist.id}')">✏️</button>
                            <button class="delete-playlist-btn" onclick="event.stopPropagation(); LocalMusicModule.confirmDeletePlaylist('${playlist.id}')">🗑️</button>
                        </div>
                    </div>
                `).join('')}
            </div>
        `;
    },
    
    // 渲染歌单详情页面
    renderPlaylistDetail(playlistId) {
        const playlists = this.getPlaylists();
        const playlist = playlists.find(p => p.id === playlistId);
        
        if (!playlist) {
            UIManager.showToast('歌单不存在', 'error');
            return;
        }
        
        // 构建详情HTML
        const detailHTML = `
            <div class="playlist-detail">
                <div class="playlist-detail-header">
                    <button class="back-btn" onclick="LocalMusicModule.showMyPlaylists()">← 返回</button>
                    <div class="playlist-detail-info">
                        <div class="playlist-detail-cover">${playlist.cover}</div>
                        <div class="playlist-detail-meta">
                            <h2>${playlist.name}</h2>
                            <p>${playlist.description || ''}</p>
                            <p>${playlist.songCount || 0} 首歌曲</p>
                        </div>
                    </div>
                </div>
                <div class="playlist-detail-content">
                    ${playlist.songs.length > 0 ? `
                        <div class="song-list">
                            ${playlist.songs.map((song, index) => `
                                <div class="song-item" data-song-id="${song.id}" data-index="${index}">
                                    <span class="song-number">${index + 1}</span>
                                    <div class="song-info">
                                        <h4>${song.name}</h4>
                                        <p>${song.artist} - ${song.album}</p>
                                    </div>
                                    <button class="song-play-btn" onclick="LocalMusicModule.playSongFromPlaylist('${playlistId}', ${index})">▶</button>
                                </div>
                            `).join('')}
                        </div>
                    ` : `
                        <div class="empty-state">
                            <div class="empty-icon">🎵</div>
                            <p>该歌单暂无歌曲</p>
                        </div>
                    `}
                </div>
            </div>
        `;
        
        // 找到内容区域并渲染
        const container = document.getElementById('content-container') || document.getElementById('my-page-content');
        if (container) {
            container.innerHTML = detailHTML;
        }
        
        // 更新页面标题
        document.getElementById('page-title').textContent = playlist.name;
    },
    
    // 从歌单播放歌曲
    playSongFromPlaylist(playlistId, index) {
        const playlists = this.getPlaylists();
        const playlist = playlists.find(p => p.id === playlistId);
        
        if (playlist && playlist.songs[index]) {
            // 设置播放列表
            this.setCurrentPlaylist(playlist.songs, index);
            
            // 播放歌曲
            if (typeof playSong === 'function') {
                playSong(index);
            }
            
            UIManager.showToast(`正在播放：${playlist.songs[index].name}`, 'info');
        }
    },
    
    // 显示我的歌单列表
    showMyPlaylists() {
        // 更新页面标题
        const pageTitle = document.getElementById('page-title');
        if (pageTitle) pageTitle.textContent = '我的歌单';
        
        // 渲染歌单列表
        const container = document.getElementById('content-container') || document.getElementById('my-page-content');
        if (container) {
            container.innerHTML = `
                <div class="playlists-page">
                    <div class="playlists-header" style="padding: 16px; display: flex; justify-content: space-between; align-items: center;">
                        <h3>我的歌单</h3>
                        <button class="create-playlist-btn" onclick="LocalMusicModule.showCreatePlaylistDialog()" style="padding: 8px 16px; background: #d4a574; color: white; border: none; border-radius: 20px; cursor: pointer;">+ 新建歌单</button>
                    </div>
                    <div id="playlist-container"></div>
                </div>
            `;
            this.updatePlaylistUI();
        }
    },
    
    // 显示本地歌曲页面
    showLocalSongsPage() {
        const pageTitle = document.getElementById('page-title');
        if (pageTitle) pageTitle.textContent = '本地歌曲';
        
        const container = document.getElementById('content-container') || document.getElementById('my-page-content');
        if (container) {
            this.updateLocalSongsList();
            // 查找或创建本地歌曲容器
            let localContainer = document.getElementById('local-songs-container');
            if (!localContainer) {
                localContainer = document.createElement('div');
                localContainer.id = 'local-songs-container';
                container.innerHTML = '';
                container.appendChild(localContainer);
            }
            this.getLocalSongs().then(songs => {
                this.renderLocalSongsList(localContainer, songs);
            });
        }
    },
    
    // 显示播放历史页面
    showHistoryPage() {
        const pageTitle = document.getElementById('page-title');
        if (pageTitle) pageTitle.textContent = '播放历史';
        
        const container = document.getElementById('content-container') || document.getElementById('my-page-content');
        if (container) {
            const history = this.getPlayHistory();
            container.innerHTML = `
                <div class="history-page">
                    <div class="history-header" style="padding: 16px; display: flex; justify-content: space-between; align-items: center;">
                        <h3>播放历史</h3>
                        <span style="color: #999; font-size: 14px;">${history.length} 首</span>
                    </div>
                    <div id="history-container">
                        ${history.length > 0 ? `
                            <div class="song-list">
                                ${history.map((song, index) => `
                                    <div class="song-item" data-song-id="${song.id}" data-index="${index}">
                                        <span class="song-number">${index + 1}</span>
                                        <div class="song-info">
                                            <h4>${song.name || '未知歌曲'}</h4>
                                            <p>${song.artist || '未知艺术家'}${song.playTime ? ' · ' + new Date(song.playTime).toLocaleDateString() : ''}</p>
                                        </div>
                                        <button class="song-play-btn" onclick="LocalMusicModule.playLocalSong(${index})">▶</button>
                                    </div>
                                `).join('')}
                            </div>
                        ` : `
                            <div class="empty-state" style="text-align: center; padding: 40px;">
                                <div class="empty-icon" style="font-size: 48px; margin-bottom: 16px;">🕐</div>
                                <p style="color: #999;">暂无播放记录</p>
                            </div>
                        `}
                    </div>
                </div>
            `;
        }
    },
    
    // 显示创建歌单对话框
    showCreatePlaylistDialog() {
        const name = prompt('请输入歌单名称：', '新建歌单');
        if (name && name.trim()) {
            this.createPlaylist(name.trim());
        }
    },
    
    // 显示重命名对话框
    showRenameDialog(playlistId) {
        const playlists = this.getPlaylists();
        const playlist = playlists.find(p => p.id === playlistId);
        if (playlist) {
            const newName = prompt('请输入新的歌单名称：', playlist.name);
            if (newName && newName.trim() && newName !== playlist.name) {
                this.renamePlaylist(playlistId, newName.trim());
            }
        }
    },
    
    // 显示排序对话框
    showSortDialog(playlistId) {
        const sortBy = prompt('请选择排序方式：\n1. 歌曲名\n2. 艺术家\n3. 专辑\n4. 添加时间\n5. 时长', '1');
        const sortOptions = ['name', 'artist', 'album', 'addedAt', 'duration'];
        const index = parseInt(sortBy) - 1;
        
        if (index >= 0 && index < sortOptions.length) {
            const order = confirm('升序排列？\n点击"确定"升序，点击"取消"降序');
            this.sortPlaylistSongs(playlistId, sortOptions[index], order ? 'asc' : 'desc');
        }
    },
    
    // 确认删除歌单
    confirmDeletePlaylist(playlistId) {
        if (confirm('确定要删除这个歌单吗？')) {
            this.deletePlaylist(playlistId);
        }
    },
    
    // 播放歌单
    playPlaylist(playlistId) {
        const playlists = this.getPlaylists();
        const playlist = playlists.find(p => p.id === playlistId);
        
        if (playlist && playlist.songs.length > 0) {
            // 设置当前播放列表
            if (typeof window.playlist !== 'undefined') {
                window.playlist.current = playlist.songs;
            }
            
            // 播放第一首歌
            PlayerStore.play(playlist.songs[0]);
            UIManager.showMiniPlayer();
            UIManager.showToast(`正在播放：${playlist.name}`, 'info');
        }
    },
    
    // 隐藏导入面板
    hideImportPanel() {
        UIManager.hideImportPanel();
    },
    
    // 跳转到本地歌曲歌单页面
    navigateToLocalPlaylist() {
        const localPlaylist = this.getLocalPlaylist();
        if (localPlaylist) {
            this.renderPlaylistDetail(localPlaylist.id);
        }
    },
    
    // 添加到播放历史
    addToPlayHistory(song) {
        let history = this.getPlayHistory();
        
        // 移除已存在的相同歌曲（避免重复）
        history = history.filter(s => s.id !== song.id);
        
        // 添加到开头
        history.unshift({
            ...song,
            playTime: Date.now()
        });
        
        // 最多保留100首历史记录
        if (history.length > 100) {
            history = history.slice(0, 100);
        }
        
        localStorage.setItem('pf_play_history', JSON.stringify(history));
        
        // 更新已播歌单
        this.createHistoryPlaylist();
    },
    
    // 获取播放历史（包含 Blob URL 过滤）
    getPlayHistory() {
        const history = localStorage.getItem('pf_play_history');
        if (!history) return [];
        
        const items = JSON.parse(history);
        
        // 过滤掉 Blob URL 的历史记录（已失效）
        const validItems = items.filter(item => {
            if (item.url && item.url.startsWith('blob:')) {
                console.warn('过滤已失效的 Blob URL 历史记录:', item.name || item.title);
                return false;
            }
            return true;
        });
        
        // 如果有过滤，保存更新后的历史
        if (validItems.length !== items.length) {
            localStorage.setItem('pf_play_history', JSON.stringify(validItems));
        }
        
        return validItems;
    },
    
    // 创建/更新已播歌单
    createHistoryPlaylist() {
        const history = this.getPlayHistory();
        const playlists = this.getPlaylists();
        
        // 查找已播歌单
        let historyPlaylist = playlists.find(p => p.id === 'playlist_history');
        
        if (!historyPlaylist) {
            // 创建新的已播歌单
            historyPlaylist = {
                id: 'playlist_history',
                name: '已播歌曲',
                description: '自动记录您播放过的歌曲',
                cover: '🎵',
                songs: [],
                createdAt: Date.now(),
                updatedAt: Date.now(),
                songCount: 0,
                isSystem: true // 标记为系统歌单，不可删除
            };
            playlists.push(historyPlaylist);
        }
        
        // 更新歌单内容
        historyPlaylist.songs = history.map(s => ({
            id: s.id,
            name: s.name,
            artist: s.artist,
            album: s.album,
            cover: s.cover,
            url: s.url
        }));
        historyPlaylist.songCount = historyPlaylist.songs.length;
        historyPlaylist.updatedAt = Date.now();
        
        this.savePlaylists(playlists);
        this.updatePlaylistUI();
    },
    
    // 获取当前播放列表
    getCurrentPlaylist() {
        const playlist = localStorage.getItem('pf_current_playlist');
        return playlist ? JSON.parse(playlist) : {
            name: '播放列表',
            songs: [],
            currentIndex: 0
        };
    },
    
    // 设置当前播放列表
    setCurrentPlaylist(songs, currentIndex = 0) {
        const playlist = {
            name: '播放列表',
            songs: songs,
            currentIndex: currentIndex
        };
        localStorage.setItem('pf_current_playlist', JSON.stringify(playlist));
    },
    
    // 添加到当前播放列表
    addToCurrentPlaylist(song) {
        const playlist = this.getCurrentPlaylist();
        
        // 检查是否已存在
        const exists = playlist.songs.some(s => s.id === song.id);
        if (!exists) {
            playlist.songs.push(song);
            this.saveCurrentPlaylist(playlist);
            UIManager.showToast('已添加到播放列表', 'success');
        } else {
            UIManager.showToast('该歌曲已在播放列表中', 'info');
        }
    },
    
    // 从当前播放列表移除
    removeFromCurrentPlaylist(songId) {
        const playlist = this.getCurrentPlaylist();
        playlist.songs = playlist.songs.filter(s => s.id !== songId);
        
        // 如果移除的是当前播放的歌曲，调整索引
        if (playlist.currentIndex >= playlist.songs.length) {
            playlist.currentIndex = Math.max(0, playlist.songs.length - 1);
        }
        
        this.saveCurrentPlaylist(playlist);
        UIManager.showToast('已从播放列表移除', 'info');
    },
    
    // 清空当前播放列表
    clearCurrentPlaylist() {
        const playlist = {
            name: '播放列表',
            songs: [],
            currentIndex: 0
        };
        this.saveCurrentPlaylist(playlist);
        UIManager.showToast('播放列表已清空', 'info');
    },
    
    // 保存当前播放列表
    saveCurrentPlaylist(playlist) {
        localStorage.setItem('pf_current_playlist', JSON.stringify(playlist));
    },
    
    // 播放当前播放列表
    playCurrentPlaylist(startIndex = 0) {
        const playlist = this.getCurrentPlaylist();
        if (playlist.songs.length > 0) {
            playlist.currentIndex = startIndex;
            this.saveCurrentPlaylist(playlist);
            
            // 触发播放 - 直接调用全局 playSong 函数
            if (typeof playSong === 'function') {
                playSong(startIndex);
            }
        } else {
            UIManager.showToast('播放列表为空', 'info');
        }
    }
};

// 暴露全局方法
window.LocalMusicModule = LocalMusicModule;

// 页面加载时初始化
document.addEventListener('DOMContentLoaded', () => {
    LocalMusicModule.init();
});
