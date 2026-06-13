/**
 * 网易云音乐API模块 - VIP版本
 * 使用网易云音乐VIP账号获取高质量播放链接
 * 
 * 使用说明：
 * 1. 登录网易云音乐网页版获取cookie
 * 2. 将cookie填入下方 COOKIE 变量
 * 3. 在浏览器控制台运行 refreshAllLinks() 函数
 */

// ==================== 配置区域 ====================

// 替换为您的网易云音乐cookie
// 获取方法：登录 https://music.163.com ，按F12打开开发者工具 -> Application -> Cookies -> 复制cookie值
const NETEASE_COOKIE = 'YOUR_NETEASE_MUSIC_COOKIE_HERE';

// API基础地址
const API_BASE = 'https://music.163.com';

// Pink Floyd歌曲的网易云音乐ID（需要您手动搜索获取）
const PINK_FLOYD_SONGS = {
    'Wish You Were Here': 4235817,
    'Comfortably Numb': 28238311,
    'Time': 4235820,
    'Hey You': 4235802,
    'Lost For Words': 26789046,
    'Another Brick in the Wall': 4237525,
    'If (Original)': 2046846879,
    'Chapter 24': 4238610,
    'The Great Gig In The Sky': 2116278123,
    'The Dark Side of the Moon': 31738245,
    'Echoes': 33394060,
    'Is This The Life We Really Want': 481537684
};

// ==================== 核心函数 ====================

/**
 * 获取歌曲详情（包括播放链接）
 * @param {number} songId - 歌曲ID
 * @returns {Promise<object>} 歌曲信息
 */
async function getSongDetail(songId) {
    try {
        const response = await fetch(`${API_BASE}/api/song/detail?id=${songId}`, {
            headers: {
                'Cookie': NETEASE_COOKIE,
                'Referer': 'https://music.163.com/',
                'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
            }
        });
        
        const data = await response.json();
        return data;
    } catch (error) {
        console.error(`获取歌曲 ${songId} 详情失败:`, error);
        return null;
    }
}

/**
 * 获取歌曲播放链接（需要VIP）
 * @param {number} songId - 歌曲ID
 * @param {string} level - 音质：standard(标准)/higher(高品)/exhigh(超高)/lossless(无损)
 * @returns {Promise<string|null>} 播放链接
 */
async function getSongUrl(songId, level = 'exhigh') {
    try {
        const response = await fetch(`${API_BASE}/api/song/enhance/player/url?id=${songId}&level=${level}`, {
            headers: {
                'Cookie': NETEASE_COOKIE,
                'Referer': 'https://music.163.com/',
                'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
            }
        });
        
        const data = await response.json();
        
        if (data.data && data.data[0] && data.data[0].url) {
            return {
                url: data.data[0].url,
                level: data.data[0].level,
                size: data.data[0].size
            };
        }
        return null;
    } catch (error) {
        console.error(`获取歌曲 ${songId} 链接失败:`, error);
        return null;
    }
}

/**
 * 搜索歌曲
 * @param {string} keyword - 搜索关键词
 * @returns {Promise<Array>} 搜索结果
 */
async function searchSong(keyword) {
    try {
        const response = await fetch(`${API_BASE}/api/search/get/web?csrf_token=&hlpretag=&hlposttag=&s=${encodeURIComponent(keyword)}&type=1&offset=0&total=true&limit=20`, {
            headers: {
                'Cookie': NETEASE_COOKIE,
                'Referer': 'https://music.163.com/',
                'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
            }
        });
        
        const data = await response.json();
        
        if (data.result && data.result.songs) {
            return data.result.songs;
        }
        return [];
    } catch (error) {
        console.error('搜索失败:', error);
        return [];
    }
}

/**
 * 获取歌词
 * @param {number} songId - 歌曲ID
 * @returns {Promise<string>} 歌词
 */
async function getLyric(songId) {
    try {
        const response = await fetch(`${API_BASE}/api/song/lyric?id=${songId}&lv=1&kv=1&tv=-1`, {
            headers: {
                'Cookie': NETEASE_COOKIE,
                'Referer': 'https://music.163.com/',
                'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
            }
        });
        
        const data = await response.json();
        
        if (data.lrc && data.lrc.lyric) {
            return data.lrc.lyric;
        }
        return '';
    } catch (error) {
        console.error(`获取歌词失败:`, error);
        return '';
    }
}

/**
 * 刷新所有歌曲链接（主要函数）
 */
async function refreshAllLinks() {
    if (NETEASE_COOKIE === 'YOUR_NETEASE_MUSIC_COOKIE_HERE') {
        console.error('❌ 请先设置您的网易云音乐cookie！');
        console.log('获取cookie方法：');
        console.log('1. 登录 https://music.163.com');
        console.log('2. 按F12打开开发者工具');
        console.log('3. 切换到 Application 选项卡');
        console.log('4. 左侧选择 Cookies -> https://music.163.com');
        console.log('5. 复制 cookie 值，替换脚本中的 NETEASE_COOKIE 变量');
        return;
    }
    
    console.log('🎵 开始刷新网易云音乐VIP链接...\n');
    
    const results = [];
    
    for (const [name, id] of Object.entries(PINK_FLOYD_SONGS)) {
        console.log(`正在处理: ${name} (ID: ${id})...`);
        
        // 获取播放链接
        const urlInfo = await getSongUrl(id, 'exhigh');
        
        if (urlInfo) {
            console.log(`  ✅ 获取成功! 音质: ${urlInfo.level}, 大小: ${(urlInfo.size / 1024 / 1024).toFixed(2)}MB`);
            console.log(`  📎 链接: ${urlInfo.url.substring(0, 80)}...`);
            
            results.push({
                name: name,
                id: id,
                url: urlInfo.url,
                level: urlInfo.level
            });
        } else {
            console.log(`  ❌ 获取失败（可能需要VIP或版权限制）`);
        }
        
        // 添加延迟避免请求过快
        await new Promise(resolve => setTimeout(resolve, 500));
    }
    
    console.log('\n========== 刷新结果 ==========');
    console.log(JSON.stringify(results, null, 2));
    
    // 生成可直接使用的代码
    console.log('\n========== 复制下方代码到 player.js ==========');
    const jsCode = results.map(r => 
        `        {\n            id: '${r.id}',\n            name: '${r.name}',\n            url: '${r.url}'\n        }`
    ).join(',\n');
    console.log(jsCode);
    
    return results;
}

/**
 * 交互式搜索并获取链接
 */
async function interactiveSearch() {
    if (NETEASE_COOKIE === 'YOUR_NETEASE_MUSIC_COOKIE_HERE') {
        console.error('❌ 请先设置您的网易云音乐cookie！');
        return;
    }
    
    const keyword = prompt('请输入要搜索的歌曲（留空搜索Pink Floyd热门歌曲）：', 'Pink Floyd Wish You Were Here');
    
    if (!keyword) return;
    
    const songs = await searchSong(keyword);
    
    if (songs.length === 0) {
        console.log('未找到结果');
        return;
    }
    
    console.log(`\n找到 ${songs.length} 首歌曲：`);
    songs.forEach((song, i) => {
        console.log(`${i + 1}. ${song.name} - ${song.artists.map(a => a.name).join(', ')} (ID: ${song.id})`);
    });
    
    const choice = prompt(`请选择歌曲编号（1-${songs.length}）：`, '1');
    const index = parseInt(choice) - 1;
    
    if (index >= 0 && index < songs.length) {
        const song = songs[index];
        console.log(`\n正在获取: ${song.name}...`);
        
        const urlInfo = await getSongUrl(song.id, 'exhigh');
        
        if (urlInfo) {
            console.log(`\n✅ 播放链接获取成功！`);
            console.log(`URL: ${urlInfo.url}`);
            console.log(`\n复制到player.js中使用：`);
            console.log(`url: '${urlInfo.url}'`);
        } else {
            console.log('❌ 获取失败');
        }
    }
}

// 导出到全局
if (typeof window !== 'undefined') {
    window.refreshAllLinks = refreshAllLinks;
    window.getSongUrl = getSongUrl;
    window.searchSong = searchSong;
    window.getLyric = getLyric;
    window.NETEASE_COOKIE = NETEASE_COOKIE;
    window.interactiveSearch = interactiveSearch;
}

console.log('🎵 网易云音乐VIP链接刷新工具已加载');
console.log('使用方法：');
console.log('1. 先设置您的cookie: window.NETEASE_COOKIE = "您的cookie"');
console.log('2. 运行 refreshAllLinks() 开始刷新所有链接');
console.log('3. 或运行 interactiveSearch() 交互式搜索歌曲');
