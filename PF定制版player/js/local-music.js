// 本地音乐导入功能
let localMusicList = [];

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

function handleLocalMusicUpload(event) {
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
            isLocal: true
        };
        
        localMusicList.push(localSong);
        playlist['B'].push(localSong);
        importedCount++;
        
        console.log('已添加:', fileName);
    }
    
    // 保存到 localStorage
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
function removeLocalMusic(songId) {
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
    
    // 更新 localStorage
    saveLocalMusicList();
    
    // 更新播放列表显示
    if (currentSide === 'B') {
        renderPlaylist();
    }
    
    console.log('已删除本地音乐:', songId);
}

// 清空所有本地音乐
function clearLocalMusic() {
    // 释放所有 Blob URL
    localMusicList.forEach(song => {
        blobUrlManager.revoke(song.id);
    });
    
    // 清空列表
    localMusicList = [];
    playlist['B'] = [];
    
    // 更新 localStorage
    saveLocalMusicList();
    
    // 更新播放列表显示
    if (currentSide === 'B') {
        renderPlaylist();
    }
    
    console.log('已清空所有本地音乐');
}

function loadLocalMusicList() {
    try {
        const saved = localStorage.getItem('pf_local_music');
        if (saved) {
            const list = JSON.parse(saved);
            if (list.length > 0) {
                const tooltip = document.getElementById('tooltip');
                if (tooltip) {
                    tooltip.textContent = '检测到 ' + list.length + ' 首已保存的本地音乐，请重新导入';
                    tooltip.classList.add('show');
                    setTimeout(() => { tooltip.classList.remove('show'); }, 3000);
                }
            }
        }
    } catch (e) {
        console.error('加载本地音乐列表失败:', e);
    }
}

// 页面加载时初始化
document.addEventListener('DOMContentLoaded', function() {
    initLocalMusicUpload();
    loadLocalMusicList();
});

// 如果页面已经加载完成，立即初始化
if (document.readyState === 'complete') {
    initLocalMusicUpload();
    loadLocalMusicList();
}

// 页面卸载时清理所有 Blob URL，防止内存泄漏
window.addEventListener('beforeunload', function() {
    blobUrlManager.revokeAll();
    console.log('页面卸载，已释放所有 Blob URL');
});