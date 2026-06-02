// 本地音乐导入功能

// Logger已在 player.js 中定义，无需重复定义

let localMusicList = [];

// IndexedDB 数据库名称和版本
const DB_NAME = 'PFPlayerLocalMusic';
const DB_VERSION = 1;
const STORE_NAME = 'musicFiles';

// IndexedDB 管理器
const indexedDBManager = {
    db: null,
    
    // 打开数据库
    async openDB() {
        return new Promise((resolve, reject) => {
            const request = indexedDB.open(DB_NAME, DB_VERSION);
            
            request.onerror = () => {
                Logger.error('打开 IndexedDB 失败');
                reject(request.error);
            };
            
            request.onsuccess = () => {
                this.db = request.result;
                resolve(this.db);
            };
            
            request.onupgradeneeded = (event) => {
                const db = event.target.result;
                if (!db.objectStoreNames.contains(STORE_NAME)) {
                    db.createObjectStore(STORE_NAME, { keyPath: 'id' });
                }
            };
        });
    },
    
    // 保存文件到 IndexedDB
    async saveFile(file, songId, songInfo) {
        return new Promise((resolve, reject) => {
            const transaction = this.db.transaction([STORE_NAME], 'readwrite');
            const store = transaction.objectStore(STORE_NAME);
            
            const reader = new FileReader();
            reader.onload = (e) => {
                const request = store.put({
                    id: songId,
                    name: songInfo.name,
                    artist: songInfo.artist,
                    album: songInfo.album,
                    fileName: file.name,
                    fileData: e.target.result, // 存储 ArrayBuffer
                    mimeType: file.type,
                    addedTime: Date.now()
                });
                
                request.onsuccess = () => resolve();
                request.onerror = () => reject(request.error);
            };
            reader.readAsArrayBuffer(file);
        });
    },
    
    // 获取文件从 IndexedDB
    async getFile(songId) {
        return new Promise((resolve, reject) => {
            const transaction = this.db.transaction([STORE_NAME], 'readonly');
            const store = transaction.objectStore(STORE_NAME);
            const request = store.get(songId);
            
            request.onsuccess = () => resolve(request.result);
            request.onerror = () => reject(request.error);
        });
    },
    
    // 获取所有文件
    async getAllFiles() {
        return new Promise((resolve, reject) => {
            const transaction = this.db.transaction([STORE_NAME], 'readonly');
            const store = transaction.objectStore(STORE_NAME);
            const request = store.getAll();
            
            request.onsuccess = () => resolve(request.result);
            request.onerror = () => reject(request.error);
        });
    },
    
    // 删除文件
    async deleteFile(songId) {
        return new Promise((resolve, reject) => {
            const transaction = this.db.transaction([STORE_NAME], 'readwrite');
            const store = transaction.objectStore(STORE_NAME);
            const request = store.delete(songId);
            
            request.onsuccess = () => resolve();
            request.onerror = () => reject(request.error);
        });
    },
    
    // 清空所有文件
    async clearAll() {
        return new Promise((resolve, reject) => {
            const transaction = this.db.transaction([STORE_NAME], 'readwrite');
            const store = transaction.objectStore(STORE_NAME);
            const request = store.clear();
            
            request.onsuccess = () => resolve();
            request.onerror = () => reject(request.error);
        });
    }
};

// Blob URL 管理器 - 防止内存泄漏
const blobUrlManager = {
    urls: new Map(), // id -> url 映射
    
    create(file, id) {
        const url = URL.createObjectURL(file);
        this.urls.set(id, url);
        return url;
    },
    
    revoke(id) {
        const url = this.urls.get(id);
        if (url) {
            URL.revokeObjectURL(url);
            this.urls.delete(id);
        }
    },
    
    revokeAll() {
        this.urls.forEach((url) => {
            URL.revokeObjectURL(url);
        });
        this.urls.clear();
    },
    
    get(id) {
        return this.urls.get(id);
    }
};

function initLocalMusicUpload() {
    const uploadInput = document.getElementById('localMusicUpload');
    if (uploadInput) {
        uploadInput.addEventListener('change', handleLocalMusicUpload);
        console.log('本地音乐上传初始化成功');
    } else {
        console.log('未找到 localMusicUpload 元素');
    }
}

async function handleLocalMusicUpload(event) {
    const files = event.target.files;
    if (!files || files.length === 0) return;
    
    console.log('开始导入音乐:', files.length);
    
    // 显示导入提示
    const tooltip = document.getElementById('tooltip');
    if (tooltip) {
        tooltip.textContent = '正在导入 ' + files.length + ' 首音乐...';
        tooltip.classList.add('show');
    }
    
    let importedCount = 0;
    
    for (let i = 0; i < files.length; i++) {
        const file = files[i];
        
        if (!file.type.startsWith('audio/')) {
            console.log('跳过非音频文件:', file.name);
            continue;
        }
        
        const fileName = file.name.replace(/\.[^/.]+$/, '');
        const songId = 'local_' + Date.now() + '_' + i;
        const fileUrl = blobUrlManager.create(file, songId);
        
        const localSong = {
            id: songId,
            name: fileName,
            artist: '本地音乐',
            album: '本地专辑',
            cover: generateCover(fileName),
            url: fileUrl,
            lyrics: '',
            isLocal: true,
            fileName: file.name // 保存原始文件名用于恢复
        };
        
        localMusicList.push(localSong);
        playlist['B'].push(localSong);
        importedCount++;
        
        // 异步保存到 IndexedDB
        try {
            await indexedDBManager.saveFile(file, songId, {
                name: fileName,
                artist: '本地音乐',
                album: '本地专辑'
            });
            console.log('已保存到 IndexedDB:', fileName);
        } catch (err) {
            console.error('保存到 IndexedDB 失败:', err);
        }
        
        console.log('已添加:', fileName);
    }
    
    // 保存元数据到 localStorage
    saveLocalMusicList();
    
    // 更新播放列表显示
    if (currentSide === 'B') {
        renderPlaylist();
    }
    
    // 显示成功提示
    if (tooltip) {
        tooltip.textContent = '成功导入 ' + importedCount + ' 首本地音乐';
        tooltip.classList.add('show');
        
        // 3秒后隐藏提示
        setTimeout(() => {
            tooltip.classList.remove('show');
        }, 3000);
    }
    
    // 清空输入
    event.target.value = '';
    
    console.log('导入完成，共导入:', importedCount, '首');
}

function generateCover(name) {
    let hash = 0;
    for (let i = 0; i < name.length; i++) {
        hash = name.charCodeAt(i) + ((hash << 5) - hash);
    }
    
    const colors = [
        '#8B4513', '#6B4423', '#2F4F4F', '#4A4A4A',
        '#2C5F7C', '#1E3A5F', '#2D4A3E', '#5D4E37',
        '#4A3728', '#3D2914', '#5C4033', '#4A4A3A'
    ];
    
    const bgColor = colors[Math.abs(hash) % colors.length];
    return 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="300" height="300" viewBox="0 0 300 300"%3E%3Crect width="300" height="300" fill="' + bgColor + '"/%3E%3Ctext x="50%25" y="50%25" font-size="24" fill="#d9ceb2" text-anchor="middle" dy=".3em"%3E' + encodeURIComponent(name.substring(0, 6)) + '%3C/text%3E%3C/svg%3E';
}

function saveLocalMusicList() {
    const savedList = localMusicList.map(function(song) {
        return { id: song.id, name: song.name, artist: song.artist, album: song.album, isLocal: true };
    });
    localStorage.setItem('pf_local_music', JSON.stringify(savedList));
}

// 删除单首本地音乐
async function removeLocalMusic(songId) {
    // 从 localMusicList 中移除
    const index = localMusicList.findIndex(song => song.id === songId);
    if (index !== -1) {
        localMusicList.splice(index, 1);
    }
    
    // 从播放列表中移除
    const playlistIndex = playlist['B'].findIndex(song => song.id === songId);
    if (playlistIndex !== -1) {
        playlist['B'].splice(playlistIndex, 1);
    }
    
    // 释放 Blob URL
    blobUrlManager.revoke(songId);
    
    // 从 IndexedDB 删除
    try {
        await indexedDBManager.deleteFile(songId);
    } catch (err) {
        console.error('从 IndexedDB 删除文件失败:', err);
    }
    
    // 更新 localStorage
    saveLocalMusicList();
    
    // 更新播放列表显示
    if (currentSide === 'B') {
        renderPlaylist();
    }
    
    console.log('已删除本地音乐:', songId);
}

// 清空所有本地音乐
async function clearLocalMusic() {
    // 释放所有 Blob URL
    localMusicList.forEach(song => {
        blobUrlManager.revoke(song.id);
    });
    
    // 清空列表
    localMusicList = [];
    playlist['B'] = [];
    
    // 清空 IndexedDB
    try {
        await indexedDBManager.clearAll();
    } catch (err) {
        console.error('清空 IndexedDB 失败:', err);
    }
    
    // 更新 localStorage
    saveLocalMusicList();
    
    // 更新播放列表显示
    if (currentSide === 'B') {
        renderPlaylist();
    }
    
    console.log('已清空所有本地音乐');
}

// 从 IndexedDB 恢复本地音乐列表
async function loadLocalMusicListFromIndexedDB() {
    try {
        // 确保数据库已打开
        if (!indexedDBManager.db) {
            await indexedDBManager.openDB();
        }
        
        // 从 IndexedDB 获取所有保存的音乐文件
        const savedFiles = await indexedDBManager.getAllFiles();
        
        if (savedFiles && savedFiles.length > 0) {
            console.log('从 IndexedDB 恢复', savedFiles.length, '首本地音乐');
            
            let restoredCount = 0;
            
            for (const fileData of savedFiles) {
                try {
                    // 将 ArrayBuffer 转换回 Blob
                    const blob = new Blob([fileData.fileData], { type: fileData.mimeType });
                    const file = new File([blob], fileData.fileName, { type: fileData.mimeType });
                    
                    // 创建 Blob URL
                    const fileUrl = blobUrlManager.create(file, fileData.id);
                    
                    // 创建歌曲对象
                    const localSong = {
                        id: fileData.id,
                        name: fileData.name,
                        artist: fileData.artist,
                        album: fileData.album,
                        cover: generateCover(fileData.name),
                        url: fileUrl,
                        lyrics: '',
                        isLocal: true,
                        fileName: fileData.fileName
                    };
                    
                    localMusicList.push(localSong);
                    playlist['B'].push(localSong);
                    restoredCount++;
                } catch (err) {
                    console.error('恢复音乐失败:', fileData.name, err);
                }
            }
            
            // 显示恢复成功提示
            if (restoredCount > 0) {
                const tooltip = document.getElementById('tooltip');
                if (tooltip) {
                    tooltip.textContent = '已恢复 ' + restoredCount + ' 首本地音乐';
                    tooltip.classList.add('show');
                    setTimeout(() => {
                        tooltip.classList.remove('show');
                    }, 3000);
                }
                
                // 更新播放列表显示
                if (currentSide === 'B') {
                    renderPlaylist();
                }
            }
            
            console.log('恢复完成，共恢复', restoredCount, '首本地音乐');
        }
    } catch (err) {
        console.error('从 IndexedDB 恢复音乐失败:', err);
    }
}

// 初始化并恢复本地音乐列表
async function initAndRestoreLocalMusic() {
    try {
        // 打开 IndexedDB
        await indexedDBManager.openDB();
        console.log('IndexedDB 初始化成功');
        
        // 恢复音乐列表
        await loadLocalMusicListFromIndexedDB();
    } catch (err) {
        console.error('初始化本地音乐功能失败:', err);
    }
}

// 页面加载时初始化
document.addEventListener('DOMContentLoaded', async function() {
    initLocalMusicUpload();
    // 从 IndexedDB 恢复本地音乐列表
    await initAndRestoreLocalMusic();
});

// 如果页面已经加载完成，立即初始化
if (document.readyState === 'complete') {
    initLocalMusicUpload();
    // 从 IndexedDB 恢复本地音乐列表
    initAndRestoreLocalMusic();
}

// 页面卸载时清理所有 Blob URL，防止内存泄漏
window.addEventListener('beforeunload', function() {
    blobUrlManager.revokeAll();
    console.log('页面卸载，已释放所有 Blob URL');
});
