/**
 * 首页（Discover）页面
 */

const DiscoverPage = {
    render(container) {
        container.innerHTML = `
            <div class="page discover-page">
                <div class="page-header">
                    <h1>发现</h1>
                    <div class="search-bar">
                        <input type="text" placeholder="搜索 Pink Floyd 歌曲、专辑..." id="search-input">
                        <button class="search-btn">
                            <span>🔍</span>
                        </button>
                    </div>
                    <!-- 搜索结果区域 -->
                    <div id="search-results" class="search-results"></div>
                </div>
                
                <div class="page-content">
                    <!-- 每日推荐 -->
                    <section class="section daily-recommendation">
                        <h2>▶OOTJ今日推荐</h2>
                        <div class="recommendation-card" id="daily-recommendation-card">
                            <div class="card-background"></div>
                            <div class="card-content">
                                <div class="album-art">🌙</div>
                                <div class="song-info">
                                    <h3>《Echoes》</h3>
                                    <p>1971 · Meddle</p>
                                    <p class="description">探索深空与海洋的神秘联系</p>
                                </div>
                            </div>
                        </div>
                    </section>
                    
                    <!-- 猜你喜欢 -->
                    <section class="section recommendations">
                        <h2>▶猜你喜欢</h2>
                        <div class="song-list" id="recommendations-list">
                            <div class="song-item">
                                <div class="song-cover">🎸</div>
                                <div class="song-details">
                                    <h4>On the Run</h4>
                                    <p>Dark Side of the Moon</p>
                                </div>
                                <button class="play-btn">▶</button>
                            </div>
                            <div class="song-item">
                                <div class="song-cover">⌛</div>
                                <div class="song-details">
                                    <h4>Time</h4>
                                    <p>Dark Side of the Moon</p>
                                </div>
                                <button class="play-btn">▶</button>
                            </div>
                            <div class="song-item">
                                <div class="song-cover">🌹</div>
                                <div class="song-details">
                                    <h4>Wish You Were Here</h4>
                                    <p>Wish You Were Here</p>
                                </div>
                                <button class="play-btn">▶</button>
                            </div>
                        </div>
                    </section>
                    
                    <!-- SOLO 大赏 -->
                    <section class="section solo-section">
                        <h2>▶SOLO大赏</h2>
                        <div class="solo-grid">
                            <div class="solo-card">
                                <div class="solo-icon">🎹</div>
                                <h3>Comfortably Numb</h3>
                                <p>Gilmour 经典 Solo</p>
                                <span class="badge">Guitar</span>
                            </div>
                            <div class="solo-card">
                                <div class="solo-icon">🎺</div>
                                <h3>Another Brick in the Wall</h3>
                                <p>实验性节奏编排</p>
                                <span class="badge">Rhythm</span>
                            </div>
                        </div>
                    </section>
                    
                    <!-- RIFF 大赏 -->
                    <section class="section riff-section">
                        <h2>▶RIFF瑞拂</h2>
                        <div class="riff-list">
                            <div class="riff-item">
                                <div class="riff-icon">💰</div>
                                <div class="riff-info">
                                    <h4>Money</h4>
                                    <p>B minor blues riff · 7/4 拍</p>
                                </div>
                            </div>
                            <div class="riff-item">
                                <div class="riff-icon">🏗️</div>
                                <div class="riff-info">
                                    <h4>Another Brick in the Wall Pt.2</h4>
                                    <p>四分附点 + 十六分休止</p>
                                </div>
                            </div>
                        </div>
                    </section>
                    
                    <!-- 摇滚名人堂 -->
                    <section class="section hall-of-fame">
                        <h2>▶摇滚名人堂</h2>
                        <div class="timeline">
                            <div class="timeline-item" data-year="1965">
                                <span class="year">1965</span>
                                <div class="artist-info">
                                    <div class="artist-avatar">PF</div>
                                    <h4>Pink Floyd</h4>
                                    <p>伦敦迷幻摇滚先驱</p>
                                </div>
                            </div>
                        </div>
                    </section>
                    
                    <!-- 巨星逸闻 -->
                    <section class="section stories">
                        <h2>▶ROCK NEWS</h2>
                        <div class="story-card">
                            <div class="story-image">🎨</div>
                            <div class="story-content">
                                <h3>The Division Bell</h3>
                                <p>封面拍摄地 GPS 坐标公开，AR 实景还原技术解密</p>
                                <button class="read-more">阅读更多</button>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        `;
        
        this.bindEvents();
        this.initRecommendations();
    },
    
    initRecommendations() {
        if (typeof RecommendationModule !== 'undefined') {
            RecommendationModule.init();
        }
        if (typeof HallOfFameModule !== 'undefined') {
            HallOfFameModule.init();
        }
    },
    
    bindEvents() {
        // 搜索功能
        const searchInput = document.getElementById('search-input');
        if (searchInput) {
            searchInput.addEventListener('input', (e) => {
                this.handleSearch(e.target.value);
            });
        }
        
        // 推荐卡片点击
        const recommendationCard = document.getElementById('daily-recommendation-card');
        if (recommendationCard) {
            recommendationCard.addEventListener('click', () => {
                this.playDailyRecommendation();
            });
        }
        
        // 搜索按钮点击事件
        const searchBtn = document.querySelector('.search-btn');
        if (searchBtn) {
            searchBtn.addEventListener('click', () => {
                const searchInput = document.getElementById('search-input');
                if (searchInput) {
                    const query = searchInput.value.trim();
                    if (query) {
                        this.handleSearch(query);
                    }
                }
            });
        }
        
        // 播放按钮
        document.querySelectorAll('.play-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const songItem = e.target.closest('.song-item');
                if (songItem) {
                    const song = {
                        title: songItem.querySelector('h4').textContent,
                        artist: songItem.querySelector('p').textContent,
                        id: Date.now()
                    };
                    PlayerStore.play(song);
                    UIManager.showMiniPlayer();
                }
            });
        });
    },
    
    handleSearch(query) {
        console.log('搜索:', query);
        
        // 如果搜索词为空，清空搜索结果
        if (!query.trim()) {
            SearchModule.clearResults();
            const pageContent = document.querySelector('.discover-page .page-content');
            if (pageContent) pageContent.style.display = 'block';
            return;
        }
        
        // 调用搜索模块
        try {
            const results = SearchModule.searchLocalSongs(query);
            console.log('搜索结果:', results);
            SearchModule.renderSearchResults(results);
            
            // 显示搜索结果，隐藏其他内容
            const pageContent = document.querySelector('.discover-page .page-content');
            if (pageContent) pageContent.style.display = 'none';
        } catch (error) {
            console.error('搜索出错:', error);
        }
    },
    
    playDailyRecommendation() {
        const song = {
            id: 'daily-rec',
            title: 'Echoes',
            artist: 'Pink Floyd',
            album: 'Meddle',
            year: 1971
        };
        PlayerStore.play(song);
        UIManager.showMiniPlayer();
    }
};