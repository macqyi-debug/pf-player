/**
 * 刷新QQ音乐播放链接脚本
 * 用于更新playlist中的歌曲链接
 * 
 * 使用方法: 在浏览器控制台中运行
 */

// Pink Floyd歌曲的QQ Music songmid映射
// 需要先通过QQ Music搜索获取这些ID
const pinkFloydSongMids = {
    // A面
    'Wish You Were Here': '003rJSwm3TechU',           // 示例songmid，需要验证
    'Comfortably Numb': '002G0sJY2wThyx',            // 示例songmid，需要验证
    'Time': '003rJSwm3TechU',                        // 示例songmid，需要验证
    'Hey You': '003rJSwm3TechU',                     // 示例songmid，需要验证
    'Lost For Words': '003rJSwm3TechU',              // 示例songmid，需要验证
    'Another Brick in the Wall': '003rJSwm3TechU',   // 示例songmid，需要验证
    
    // B面
    'If': '003rJSwm3TechU',                          // 示例songmid，需要验证
    'Chapter 24': '003rJSwm3TechU',                  // 示例songmid，需要验证
    'The Great Gig In The Sky': '003rJSwm3TechU',   // 示例songmid，需要验证
    'The Dark Side of the Moon': '003rJSwm3TechU',   // 示例songmid，需要验证
    'Echoes': '003rJSwm3TechU',                      // 示例songmid，需要验证
    'Is This The Life We Really Want': '003rJSwm3TechU' // 示例songmid，需要验证
};

/**
 * 刷新单个歌曲的播放链接
 */
async function refreshSongUrl(songName, songmid) {
    try {
        const guid = Math.floor(Math.random() * 9999999999);
        const data = {
            "req_0": {
                "module": "vkey.GetVkeyServer",
                "method": "CgiGetVkey",
                "param": {
                    "guid": guid.toString(),
                    "songmid": [songmid],
                    "songtype": [0],
                    "uin": "0",
                    "loginflag": 0,
                    "platform": "20"
                }
            }
        };

        const response = await fetch('https://u.y.qq.com/cgi-bin/musicu.fcg', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Referer': 'https://y.qq.com/',
                'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36'
            },
            body: JSON.stringify(data)
        });

        const json = await response.json();
        
        if (json.req_0 && json.req_0.data && json.req_0.data.midurlinfo) {
            const purl = json.req_0.data.midurlinfo[0].purl;
            if (purl) {
                const domain = 'https://dl.stream.qqmusic.qq.com/';
                return domain + purl;
            }
        }
        return null;
    } catch (error) {
        console.error(`刷新 ${songName} 失败:`, error);
        return null;
    }
}

/**
 * 搜索歌曲获取正确的songmid
 */
async function searchQQMusic(keyword) {
    try {
        const response = await fetch(
            `https://c.y.qq.com/soso/fcgi-bin/client_search_cp?w=${encodeURIComponent(keyword)}&format=json&p=1&n=3`,
            {
                headers: {
                    'Referer': 'https://y.qq.com/',
                    'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36'
                }
            }
        );
        
        const json = await response.json();
        
        if (json.data && json.data.song && json.data.song.list.length > 0) {
            // 优先选择Pink Floyd的歌曲
            const songs = json.data.song.list;
            const pinkFloydSong = songs.find(s => 
                s.singer && s.singer.some(singer => singer.name.toLowerCase().includes('pink floyd'))
            );
            return pinkFloydSong || songs[0];
        }
        return null;
    } catch (error) {
        console.error('搜索失败:', error);
        return null;
    }
}

/**
 * 自动更新所有歌曲链接
 */
async function updateAllSongs() {
    console.log('开始更新QQ音乐链接...');
    
    const results = [];
    
    for (const songName of Object.keys(pinkFloydSongMids)) {
        console.log(`正在搜索: ${songName}...`);
        
        // 搜索歌曲
        const searchResult = await searchQQMusic(`${songName} Pink Floyd`);
        
        if (searchResult) {
            console.log(`  找到: ${searchResult.songname} by ${searchResult.singer.map(s => s.name).join(', ')}`);
            
            // 获取播放链接
            const url = await refreshSongUrl(searchResult.songname, searchResult.songmid);
            
            if (url) {
                console.log(`  ✓ 获取链接成功`);
                results.push({
                    name: searchResult.songname,
                    songmid: searchResult.songmid,
                    url: url
                });
            } else {
                console.log(`  ✗ 获取链接失败（可能需要VIP）`);
            }
        } else {
            console.log(`  ✗ 未找到`);
        }
        
        // 添加延迟避免请求过快
        await new Promise(resolve => setTimeout(resolve, 500));
    }
    
    console.log('\n========== 更新结果 ==========');
    console.log(JSON.stringify(results, null, 2));
    
    return results;
}

// 导出到全局
if (typeof window !== 'undefined') {
    window.updateAllSongs = updateAllSongs;
    window.searchQQMusic = searchQQMusic;
    window.refreshSongUrl = refreshSongUrl;
    window.pinkFloydSongMids = pinkFloydSongMids;
}

console.log('QQ音乐链接更新脚本已加载');
console.log('运行 updateAllSongs() 开始更新所有歌曲链接');
