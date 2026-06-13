/**
 * 推荐功能模块
 */

const RecommendationModule = {
    // 每日推荐数据 - 根据日期生成不同推荐
    getDailyRecommendation() {
        const today = new Date();
        const dayOfYear = Math.floor((today - new Date(today.getFullYear(), 0, 0)) / 86400000);
        
        // 根据日期选择推荐歌曲
        const recommendations = [
            {
                id: '4235817',
                name: 'Wish You Were Here',
                artist: 'Pink Floyd',
                album: 'Wish You Were Here',
                cover: 'http://p1.music.126.net/5sDLKpZW98XER9uuQrOHOw==/109951172026793754.jpg?param=300x300',
                description: '一首关于思念与缺席的诗意之作',
                reason: '今日是适合怀旧的日子'
            },
            {
                id: '4235820',
                name: 'Time',
                artist: 'Pink Floyd',
                album: 'The Dark Side of the Moon',
                cover: 'http://p1.music.126.net/jU6izvh453jH2x5m_-ZJ8g==/109951169795407244.jpg?param=300x300',
                description: '时间是最珍贵的礼物',
                reason: '提醒你珍惜每一刻'
            },
            {
                id: '28238311',
                name: 'Comfortably Numb',
                artist: 'Pink Floyd',
                album: 'The Wall',
                cover: 'http://p1.music.126.net/4pT4cY9x85N6g6x7q7Z7gA==/109951169830833314.jpg?param=300x300',
                description: '迷幻摇滚的巅峰之作',
                reason: '适合今天放松心情'
            },
            {
                id: '33394060',
                name: 'Echoes',
                artist: 'Pink Floyd',
                album: 'Meddle',
                cover: 'http://p1.music.126.net/7a8d7a8d7a8d7a8d7a8d7a8d7a8d7a8d/109951169795407245.jpg?param=300x300',
                description: '探索深空与海洋的神秘联系',
                reason: '开启一段心灵之旅'
            },
            {
                id: '4237525',
                name: 'Another Brick in the Wall',
                artist: 'Pink Floyd',
                album: 'The Wall',
                cover: 'http://p1.music.126.net/4pT4cY9x85N6g6x7q7Z7gA==/109951169830833314.jpg?param=300x300',
                description: '反抗体制的呐喊',
                reason: '激发你的独立思考'
            }
        ];
        
        // 根据日期选择推荐
        return recommendations[dayOfYear % recommendations.length];
    },
    
    // 获取猜你喜欢列表
    getRecommendations() {
        // 模拟基于播放历史的推荐
        const recommendedSongs = [
            {
                id: '4235817',
                name: 'Wish You Were Here',
                artist: 'Pink Floyd',
                album: 'Wish You Were Here',
                cover: 'http://p1.music.126.net/5sDLKpZW98XER9uuQrOHOw==/109951172026793754.jpg?param=300x300',
                reason: '基于您喜欢的经典摇滚'
            },
            {
                id: '4235820',
                name: 'Time',
                artist: 'Pink Floyd',
                album: 'Dark Side of the Moon',
                cover: 'http://p1.music.126.net/jU6izvh453jH2x5m_-ZJ8g==/109951169795407244.jpg?param=300x300',
                reason: '来自您收藏的专辑'
            },
            {
                id: '28238311',
                name: 'Comfortably Numb',
                artist: 'Pink Floyd',
                album: 'The Wall',
                cover: 'http://p1.music.126.net/4pT4cY9x85N6g6x7q7Z7gA==/109951169830833314.jpg?param=300x300',
                reason: '与您常听的歌曲风格相似'
            },
            {
                id: '4237525',
                name: 'Another Brick in the Wall',
                artist: 'Pink Floyd',
                album: 'The Wall',
                cover: 'http://p1.music.126.net/4pT4cY9x85N6g6x7q7Z7gA==/109951169830833314.jpg?param=300x300',
                reason: '热门推荐'
            },
            {
                id: '33394060',
                name: 'Echoes',
                artist: 'Pink Floyd',
                album: 'Meddle',
                cover: 'http://p1.music.126.net/7a8d7a8d7a8d7a8d7a8d7a8d7a8d7a8d/109951169795407245.jpg?param=300x300',
                reason: '深度聆听推荐'
            },
            {
                id: '4235802',
                name: 'Hey You',
                artist: 'Pink Floyd',
                album: 'The Wall',
                cover: 'http://p1.music.126.net/4pT4cY9x85N6g6x7q7Z7gA==/109951169830833314.jpg?param=300x300',
                reason: '情感共鸣推荐'
            }
        ];
        
        return recommendedSongs;
    },
    
    // 渲染每日推荐卡片
    renderDailyRecommendation() {
        const card = document.getElementById('daily-recommendation-card');
        if (!card) return;
        
        const rec = this.getDailyRecommendation();
        
        // 设置背景样式：优先使用专辑封面图虚化效果，失败则使用深绿-浅绿渐变
        const backgroundStyle = rec.cover 
            ? `background-image: url('${rec.cover}'); background-size: cover; background-position: center; filter: blur(20px);`
            : 'background: linear-gradient(135deg, #1a4d3e 0%, #2d8a6e 50%, #4db6ac 100%);';
        
        card.innerHTML = `
            <div class="card-background" style="${backgroundStyle}"></div>
            <div class="card-content">
                <div class="album-art">
                    <img src="${rec.cover}" alt="${rec.name}" onerror="this.style.display='none'; this.parentElement.innerHTML='🎵'">
                </div>
                <div class="song-info">
                    <span class="recommendation-badge">今日推荐</span>
                    <h3>《${rec.name}》</h3>
                    <p>${rec.artist} · ${rec.album}</p>
                    <p class="description">${rec.description}</p>
                    <p class="reason">💡 ${rec.reason}</p>
                </div>
                <button class="play-recommendation-btn" onclick="RecommendationModule.playRecommendation()">▶</button>
            </div>
        `;
        
        // 监听封面图片加载失败，使用默认渐变背景
        const cardBackground = card.querySelector('.card-background');
        const albumImg = card.querySelector('.album-art img');
        if (albumImg) {
            albumImg.onerror = () => {
                cardBackground.style.cssText = 'background: linear-gradient(135deg, #1a4d3e 0%, #2d8a6e 50%, #4db6ac 100%); filter: none;';
                albumImg.style.display = 'none';
                albumImg.parentElement.innerHTML = '🎵';
            };
        }
    },
    
    // 渲染猜你喜欢列表
    renderRecommendations() {
        const container = document.getElementById('recommendations-list');
        if (!container) return;
        
        const songs = this.getRecommendations();
        
        container.innerHTML = songs.map((song, index) => `
            <div class="song-item" data-song-index="${index}">
                <div class="song-cover">
                    <img src="${song.cover}" alt="${song.name}" onerror="this.style.display='none'; this.parentElement.innerHTML='🎵';">
                </div>
                <div class="song-details">
                    <h4>${song.name}</h4>
                    <p>${song.artist}</p>
                    <p class="recommend-reason">${song.reason}</p>
                </div>
                <button class="play-btn" onclick="RecommendationModule.playSong(${index})">▶</button>
            </div>
        `).join('');
    },
    
    // 播放每日推荐歌曲
    playRecommendation() {
        const rec = this.getDailyRecommendation();
        const song = {
            id: rec.id,
            name: rec.name,
            artist: rec.artist,
            album: rec.album,
            cover: rec.cover,
            url: `http://music.163.com/song/media/outer/url?id=${rec.id}.mp3`
        };
        
        // 找到歌曲在播放列表中的索引
        const allSongs = [...(playlist.A || []), ...(playlist.B || [])];
        const songIndex = allSongs.findIndex(s => s.id === rec.id);
        
        if (songIndex !== -1 && typeof playSong === 'function') {
            // 如果歌曲在播放列表中，使用playSong播放
            currentSongIndex = songIndex;
            playSong(songIndex);
        } else {
            // 否则使用PlayerStore播放
            PlayerStore.play(song);
            UIManager.showMiniPlayer();
        }
    },
    
    // 播放推荐列表中的歌曲
    playSong(index) {
        const songs = this.getRecommendations();
        if (songs[index]) {
            const song = {
                id: songs[index].id,
                name: songs[index].name,
                artist: songs[index].artist,
                album: songs[index].album,
                cover: songs[index].cover,
                url: `http://music.163.com/song/media/outer/url?id=${songs[index].id}.mp3`
            };
            
            // 找到歌曲在播放列表中的索引
            const allSongs = [...(playlist.A || []), ...(playlist.B || [])];
            const songIndex = allSongs.findIndex(s => s.id === songs[index].id);
            
            if (songIndex !== -1 && typeof playSong === 'function') {
                // 如果歌曲在播放列表中，使用playSong播放
                currentSongIndex = songIndex;
                playSong(songIndex);
            } else {
                // 否则使用PlayerStore播放
                PlayerStore.play(song);
                UIManager.showMiniPlayer();
            }
        }
    },
    
    // 初始化推荐功能
    init() {
        this.renderDailyRecommendation();
        this.renderRecommendations();
    }
};

// 暴露全局方法
window.RecommendationModule = RecommendationModule;
