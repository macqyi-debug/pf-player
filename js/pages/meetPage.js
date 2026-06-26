/**
 * 邂逅（Meet）页面 - 社交发现功能
 */

const MeetPage = {
    render(container) {
        container.innerHTML = `
            <div class="page meet-page">
                <div class="page-header">
                    <h1>邂逅</h1>
                    <p class="subtitle">和滚圈老铁听最牛逼的音乐</p>
                </div>
                
                <div class="page-content">
                    <!-- 弹幕评论播放页 -->
                    <section class="section danmaku-player">
                        <h2><svg class="play-icon-svg" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>发射弹幕</h2>
                        <div class="player-with-danmaku">
                            <div class="song-info">
                                <h3>Comfortably Numb</h3>
                                <p>Pink Floyd · The Wall</p>
                            </div>
                            <div class="danmaku-track">
                                <div class="danmaku-rail">
                                    <div class="danmaku-item">02:17 处镲片衰减时间比 1973 年温布利场长 120ms</div>
                                    <div class="danmaku-item">Gilmour 的延音处理太绝了！</div>
                                    <div class="danmaku-item">这段 Solo 用了 Fuzz Face + Hiwatt</div>
                                    <div class="danmaku-item">Roger Waters 的贝斯线太有层次了</div>
                                    <div class="danmaku-item">1979 年的录音技术太超前了</div>
                                    <div class="danmaku-item">这段solo影响了无数吉他手</div>
                                    <div class="danmaku-item">EMI Abbey Road 的 Plate Reverb 太赞了</div>
                                    <div class="danmaku-item">这张专辑销量超过 3000 万张</div>
                                </div>
                            </div>
                        </div>
                    </section>
                    
                    <!-- 推荐乐迷 -->
                    <section class="section recommended-users">
                        <h2><svg class="play-icon-svg" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>这不巧了</h2>
                        <div class="user-list">
                            <div class="user-card">
                                <div class="user-avatar">
                                    <div class="cartoon-avatar male">
                                        <div class="cartoon-head">
                                            <div class="cartoon-hat">
                                                <div class="rock-hat"></div>
                                            </div>
                                            <div class="cartoon-hair male-spiky"></div>
                                            <div class="cartoon-glasses"></div>
                                            <div class="cartoon-eyes">
                                                <div class="cartoon-eye"></div>
                                                <div class="cartoon-eye"></div>
                                            </div>
                                            <div class="cartoon-mouth"></div>
                                        </div>
                                    </div>
                                </div>
                                <div class="user-info">
                                    <h4>Riff考古员</h4>
                                    <p class="user-level">Lv.7 · 资深乐迷</p>
                                    <p class="user-bio">推荐理由：这段使用了 1975 年 EMI Abbey Road 的 Plate Reverb</p>
                                </div>
                                <button class="follow-btn">关注</button>
                            </div>
                            
                            <div class="user-card">
                                <div class="user-avatar">
                                    <div class="cartoon-avatar female">
                                        <div class="cartoon-head">
                                            <div class="cartoon-hair female-long"></div>
                                            <div class="cartoon-eyes">
                                                <div class="cartoon-eye"></div>
                                                <div class="cartoon-eye"></div>
                                            </div>
                                            <div class="cartoon-mouth"></div>
                                        </div>
                                    </div>
                                </div>
                                <div class="user-info">
                                    <h4>母带分析师</h4>
                                    <p class="user-level">Lv.9 · 音频工程师</p>
                                    <p class="user-bio">专注于 Pink Floyd 录音技术研究</p>
                                </div>
                                <button class="follow-btn">关注</button>
                            </div>
                            
                            <div class="user-card">
                                <div class="user-avatar">
                                    <div class="cartoon-avatar male">
                                        <div class="cartoon-head">
                                            <div class="cartoon-hat">
                                                <div class="rock-hat"></div>
                                            </div>
                                            <div class="cartoon-hair male-spiky"></div>
                                            <div class="cartoon-eyes">
                                                <div class="cartoon-eye"></div>
                                                <div class="cartoon-eye"></div>
                                            </div>
                                            <div class="cartoon-mouth"></div>
                                        </div>
                                    </div>
                                </div>
                                <div class="user-info">
                                    <h4>吉他手老王</h4>
                                    <p class="user-level">Lv.5 · 吉他爱好者</p>
                                    <p class="user-bio">正在练习《Comfortably Numb》Solo</p>
                                </div>
                                <button class="follow-btn">关注</button>
                            </div>
                        </div>
                    </section>
                    
                    <!-- 歌曲关联 -->
                    <section class="section song-connections">
                        <h2><svg class="play-icon-svg" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>ONE MORE SONG</h2>
                        <div class="connection-card">
                            <div class="song-metadata">
                                <h3>Hey You</h3>
                                <div class="metadata-details">
                                    <div class="meta-item">
                                        <span class="label">录音室：</span>
                                        <span class="value">Britannia Row Studios, 1978</span>
                                    </div>
                                    <div class="meta-item">
                                        <span class="label">设备链：</span>
                                        <span class="value">Neve 8078 → EMT 140 Plate → Studer A80</span>
                                    </div>
                                    <div class="meta-item">
                                        <span class="label">采样率：</span>
                                        <span class="value">192kHz / 24bit</span>
                                    </div>
                                </div>
                            </div>
                            
                            <div class="similar-songs">
                                <h4>喜欢这首歌的人也喜欢：</h4>
                                <div class="similar-list">
                                    <div class="similar-item">
                                        <div class="similar-cover">🎸</div>
                                        <div class="similar-info">
                                            <h5>Run Like Hell</h5>
                                            <p>相同压缩比设定</p>
                                        </div>
                                        <button class="play-similar">▶</button>
                                    </div>
                                    <div class="similar-item">
                                        <div class="similar-cover">🌟</div>
                                        <div class="similar-info">
                                            <h5>The Great Gig in the Sky</h5>
                                            <p>相同 Vocal ADT 延时差值</p>
                                        </div>
                                        <button class="play-similar">▶</button>
                                    </div>
                                </div>
                                <button class="refresh-btn">🔄 换一批</button>
                            </div>
                        </div>
                    </section>
                    
                    <!-- 互动提示 -->
                    <section class="section swipe-guide">
                        <div class="guide-card">
                            <div class="guide-icon">👆</div>
                            <h3>左右滑动发现更多</h3>
                            <p>左滑查看推荐者信息 · 右滑查看歌曲关联</p>
                        </div>
                    </section>
                </div>
            </div>
        `;
        
        this.bindEvents();
    },
    
    bindEvents() {
        // 关注按钮
        document.querySelectorAll('.follow-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const userCard = e.target.closest('.user-card');
                const userName = userCard.querySelector('h4').textContent;
                
                if (e.target.textContent === '关注') {
                    e.target.textContent = '已关注';
                    e.target.classList.add('following');
                    console.log(`已关注 ${userName}`);
                } else {
                    e.target.textContent = '关注';
                    e.target.classList.remove('following');
                    console.log(`取消关注 ${userName}`);
                }
            });
        });
        
        // 播放相似歌曲
        document.querySelectorAll('.play-similar').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const similarItem = e.target.closest('.similar-item');
                const song = {
                    id: Date.now(),
                    title: similarItem.querySelector('h5').textContent,
                    artist: 'Pink Floyd'
                };
                PlayerStore.play(song);
                UIManager.showMiniPlayer();
            });
        });
        
        // 换一批
        document.querySelector('.refresh-btn')?.addEventListener('click', () => {
            console.log('换一批推荐');
        });
        
        // 播放当前歌曲
        document.getElementById('meet-album-cover')?.addEventListener('click', () => {
            const song = {
                id: 'meet-current',
                title: 'Comfortably Numb',
                artist: 'Pink Floyd',
                album: 'The Wall'
            };
            PlayerStore.play(song);
            UIManager.showMiniPlayer();
        });
    }
};