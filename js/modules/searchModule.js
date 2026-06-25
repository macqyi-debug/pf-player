/**
 * 搜索功能模块扩展
 */

const SearchModule = {
    // 本地搜索歌曲
    searchLocalSongs(query) {
        if (!query.trim()) return [];
        
        const keyword = query.toLowerCase();
        const allSongs = [...playlist.A, ...playlist.B];
        
        return allSongs.filter(song => 
            song.name.toLowerCase().includes(keyword) ||
            song.artist.toLowerCase().includes(keyword) ||
            song.album.toLowerCase().includes(keyword)
        );
    },
    
    // 渲染搜索结果
    renderSearchResults(results) {
        const container = document.getElementById('search-results');
        if (!container) return;
        
        if (results.length === 0) {
            container.innerHTML = `
                <div class="no-results">
                    <p>未找到相关歌曲</p>
                    <p class="hint">试试其他关键词</p>
                </div>
            `;
            container.classList.add('show');
            return;
        }
        
        container.innerHTML = `
            <div class="search-results-header">
                <h3>找到 ${results.length} 首歌曲</h3>
            </div>
            <div class="search-results-list">
                ${results.map((song, index) => `
                    <div class="song-item search-result-item" data-song-id="${song.id}" data-index="${index}">
                        <div class="song-cover">
                            <img src="${song.cover || '🎸'}" alt="${song.name}" onerror="this.style.display='none'; this.parentElement.innerHTML='🎸'">
                        </div>
                        <div class="song-details">
                            <h4>${song.name}</h4>
                            <p>${song.artist} - ${song.album}</p>
                        </div>
                        <button class="play-btn" onclick="SearchModule.playSong(${index})">▶</button>
                    </div>
                `).join('')}
            </div>
        `;
        container.classList.add('show');
    },
    
    // 播放搜索到的歌曲
    playSong(index) {
        const searchInput = document.getElementById('search-input');
        const query = searchInput.value.trim();
        const results = this.searchLocalSongs(query);
        
        if (results[index]) {
            const song = results[index];
            PlayerStore.play(song);
            UIManager.showMiniPlayer();
        }
    },
    
    // 清空搜索结果
    clearResults() {
        const container = document.getElementById('search-results');
        if (container) {
            container.innerHTML = '';
            container.classList.remove('show');
        }
    }
};

// 暴露全局方法
window.SearchModule = SearchModule;
