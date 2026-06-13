/**
 * 摇滚名人堂模块
 * 展示摇滚乐队和艺术家的详细信息
 */

const HallOfFameModule = {
    // 摇滚名人堂数据
    artists: [
        {
            id: 'pink-floyd',
            name: 'Pink Floyd',
            avatar: 'PF',
            avatarColor: '#d4a574',
            founded: '1965',
            dissolved: '1995 (重组演出: 2005, 2014)',
           代表作: ['The Dark Side of the Moon', 'The Wall', 'Wish You Were Here', 'Animals'],
            style: '迷幻摇滚、前卫摇滚、艺术摇滚',
            importantShows: [
                'Live at Pompeii (1972)',
                'The Wall Tour (1980-1981)',
                'Live 8 (2005)',
                'The Endless River Tour (2014)'
            ],
            hallOfFameYear: '1996',
            description: 'Pink Floyd是英国最具影响力的迷幻摇滚乐队之一，以其哲学歌词、声音实验、精心制作的专辑和壮观的现场演出而闻名。乐队在全球销售超过2.5亿张专辑，是历史上最成功的摇滚乐队之一。',
            members: ['Syd Barrett', 'Roger Waters', 'David Gilmour', 'Nick Mason', 'Richard Wright'],
            image: 'assets/images/rockbands_pic/PinkFloyd.jpg'
        },
        {
            id: 'led-zeppelin',
            name: 'Led Zeppelin',
            avatar: 'LZ',
            avatarColor: '#ffd700',
            founded: '1968',
            dissolved: '1980',
            代表作: ['Led Zeppelin IV', 'Physical Graffiti', 'Houses of the Holy'],
            style: '硬摇滚、重金属、蓝调摇滚',
            importantShows: [
                'Royal Albert Hall (1970)',
                'Madison Square Garden (1973)',
                'Knebworth (1979)'
            ],
            hallOfFameYear: '1995',
            description: 'Led Zeppelin是英国摇滚乐队，被认为是重金属音乐的先驱之一。乐队以其沉重的吉他音色、强劲的节奏和神秘的歌词而闻名。',
            members: ['Robert Plant', 'Jimmy Page', 'John Paul Jones', 'John Bonham'],
            image: 'assets/images/rockbands_pic/LedZeppelin.jpg'
        },
        {
            id: 'the-beatles',
            name: 'The Beatles',
            avatar: 'TB',
            avatarColor: '#ff6b6b',
            founded: '1960',
            dissolved: '1970',
            代表作: ['Abbey Road', 'Sgt. Pepper\'s Lonely Hearts Club Band', 'Revolver'],
            style: '摇滚、流行、迷幻摇滚',
            importantShows: [
                'Shea Stadium (1965)',
                'Rooftop Concert (1969)',
                'Hollywood Bowl (1964-1965)'
            ],
            hallOfFameYear: '1988',
            description: 'The Beatles是英国摇滚乐队，被广泛认为是历史上最伟大的乐队之一。他们对流行音乐的发展产生了深远影响。',
            members: ['John Lennon', 'Paul McCartney', 'George Harrison', 'Ringo Starr'],
            image: 'assets/images/rockbands_pic/theBeatles.jpg'
        },
        {
            id: 'queen',
            name: 'Queen',
            avatar: 'QN',
            avatarColor: '#9b59b6',
            founded: '1970',
            dissolved: '1991 (Freddie Mercury去世)',
            代表作: ['A Night at the Opera', 'News of the World', 'The Game'],
            style: '摇滚、华丽摇滚、硬摇滚',
            importantShows: [
                'Live Aid (1985)',
                'Wembley Stadium (1986)',
                'Rock in Rio (1985)'
            ],
            hallOfFameYear: '2001',
            description: 'Queen是英国摇滚乐队，以其华丽的舞台表演和Freddie Mercury的独特嗓音而闻名。乐队在全球销售超过3亿张专辑。',
            members: ['Freddie Mercury', 'Brian May', 'Roger Taylor', 'John Deacon'],
            image: 'assets/images/rockbands_pic/theQueen.jpg'
        },
        {
            id: 'the-rolling-stones',
            name: 'The Rolling Stones',
            avatar: 'RS',
            avatarColor: '#e74c3c',
            founded: '1962',
            dissolved: '至今活跃',
            代表作: ['Sticky Fingers', 'Exile on Main St.', 'Let It Bleed'],
            style: '摇滚、蓝调摇滚、硬摇滚',
            importantShows: [
                'Altamont (1969)',
                'Hyde Park (1969)',
                'Havana Moon (2016)'
            ],
            hallOfFameYear: '1989',
            description: 'The Rolling Stones是英国摇滚乐队，被誉为"世界上最伟大的摇滚乐队"。乐队至今仍在巡演。',
            members: ['Mick Jagger', 'Keith Richards', 'Charlie Watts', 'Ronnie Wood'],
            image: 'assets/images/rockbands_pic/theRollingStone.jpg'
        }
    ],
    
    // 当前选中的艺术家
    currentArtist: null,
    
    // 渲染摇滚名人堂
    render() {
        const container = document.querySelector('.hall-of-fame .timeline');
        if (!container) return;
        
        // 调试：检查图片路径
        this.artists.forEach(artist => {
            console.log(`加载乐队图片: ${artist.name}`, artist.image);
            // 预加载图片
            const img = new Image();
            img.onload = () => console.log(`✓ 图片加载成功: ${artist.name}`);
            img.onerror = () => console.error(`✗ 图片加载失败: ${artist.name}`, artist.image);
            img.src = artist.image;
        });
        
        container.innerHTML = `
            <div class="hall-of-fame-cards" id="hall-of-fame-cards">
                ${this.artists.map(artist => `
                    <div class="artist-card" data-artist-id="${artist.id}">
                        <div class="card-poster" style="background-image: url('${artist.image}');">
                            <div class="card-poster-overlay"></div>
                            <div class="poster-content">
                                <div class="poster-name">${artist.name}</div>
                                <div class="poster-year">${artist.hallOfFameYear}年入驻</div>
                            </div>
                        </div>
                        <div class="card-overlay">
                            <span class="view-details">点击查看详情</span>
                        </div>
                    </div>
                `).join('')}
            </div>
            <div class="scroll-hint">
                <span>← 左右滑动查看更多 →</span>
            </div>
        `;
        
        this.bindEvents();
    },
    
    // 绑定事件
    bindEvents() {
        const cards = document.querySelectorAll('.artist-card');
        cards.forEach(card => {
            card.addEventListener('click', () => {
                const artistId = card.dataset.artistId;
                this.showArtistDetail(artistId);
            });
        });
        
        // 添加触摸滑动支持
        const cardsContainer = document.getElementById('hall-of-fame-cards');
        if (cardsContainer) {
            let startX = 0;
            let scrollLeft = 0;
            
            cardsContainer.addEventListener('touchstart', (e) => {
                startX = e.touches[0].pageX - cardsContainer.offsetLeft;
                scrollLeft = cardsContainer.scrollLeft;
            });
            
            cardsContainer.addEventListener('touchmove', (e) => {
                const x = e.touches[0].pageX - cardsContainer.offsetLeft;
                const walk = (x - startX) * 2;
                cardsContainer.scrollLeft = scrollLeft - walk;
            });
        }
    },
    
    // 显示艺术家详情
    showArtistDetail(artistId) {
        const artist = this.artists.find(a => a.id === artistId);
        if (!artist) return;
        
        this.currentArtist = artist;
        
        // 创建详情弹窗
        const modal = document.createElement('div');
        modal.className = 'artist-detail-modal';
        modal.id = 'artist-detail-modal';
        modal.innerHTML = `
            <div class="modal-backdrop" onclick="HallOfFameModule.closeDetail()"></div>
            <div class="modal-content">
                <button class="modal-close" onclick="HallOfFameModule.closeDetail()">×</button>
                <div class="artist-header" style="background: linear-gradient(135deg, ${artist.avatarColor}, ${this.adjustColor(artist.avatarColor, -30)});">
                    <div class="artist-avatar-large">${artist.avatar}</div>
                    <h2>${artist.name}</h2>
                    <p class="hall-year">${artist.hallOfFameYear}年入驻摇滚名人堂</p>
                </div>
                <div class="artist-details">
                    <div class="detail-section">
                        <h3>📅 成立时间</h3>
                        <p>${artist.founded}</p>
                    </div>
                    <div class="detail-section">
                        <h3>🏁 解散时间</h3>
                        <p>${artist.dissolved}</p>
                    </div>
                    <div class="detail-section">
                        <h3>🎵 代表作</h3>
                        <ul>
                            ${artist.代表作.map(album => `<li>${album}</li>`).join('')}
                        </ul>
                    </div>
                    <div class="detail-section">
                        <h3>🎸 风格流派</h3>
                        <p>${artist.style}</p>
                    </div>
                    <div class="detail-section">
                        <h3>🎤 重要演出</h3>
                        <ul>
                            ${artist.importantShows.map(show => `<li>${show}</li>`).join('')}
                        </ul>
                    </div>
                    <div class="detail-section">
                        <h3>👥 成员</h3>
                        <p>${artist.members.join('、')}</p>
                    </div>
                    <div class="detail-section">
                        <h3>📖 简介</h3>
                        <p>${artist.description}</p>
                    </div>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
        
        // 添加动画
        setTimeout(() => {
            modal.classList.add('active');
        }, 10);
    },
    
    // 关闭详情弹窗
    closeDetail() {
        const modal = document.getElementById('artist-detail-modal');
        if (modal) {
            modal.classList.remove('active');
            setTimeout(() => {
                modal.remove();
            }, 300);
        }
    },
    
    // 调整颜色亮度
    adjustColor(color, amount) {
        const hex = color.replace('#', '');
        const num = parseInt(hex, 16);
        const r = Math.min(255, Math.max(0, (num >> 16) + amount));
        const g = Math.min(255, Math.max(0, ((num >> 8) & 0x00FF) + amount));
        const b = Math.min(255, Math.max(0, (num & 0x0000FF) + amount));
        return `#${((r << 16) | (g << 8) | b).toString(16).padStart(6, '0')}`;
    },
    
    // 初始化
    init() {
        this.render();
    }
};

// 暴露全局方法
window.HallOfFameModule = HallOfFameModule;
