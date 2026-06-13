/**
 * QQ音乐API模块
 * 用于获取QQ音乐的歌曲播放链接和歌词
 * 
 * API endpoint: https://u.y.qq.com
 * 参考文档: https://gitee.com/gnnu/QQMusicApi
 */

const QQMusicAPI = {
    // 基础URL
    baseUrl: 'https://u.y.qq.com/cgi-bin/musicu.fcg',
    
    // 搜索API
    searchUrl: 'https://c.y.qq.com/soso/fcgi-bin/client_search_cp',
    
    // 歌词API
    lyricUrl: 'https://c.y.qq.com/lyric/fcgi-bin/fcg_lyrics_new.fcg',

    /**
     * 获取歌曲播放链接
     * @param {string} songmid - QQ音乐的歌曲mid
     * @returns {Promise<string|null>} 播放链接或null
     */
    async getSongUrl(songmid) {
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

            const response = await fetch(this.baseUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Referer': 'https://y.qq.com/',
                    'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
                },
                body: JSON.stringify(data)
            });

            const json = await response.json();
            
            if (json.req_0 && json.req_0.data && json.req_0.data.midurlinfo) {
                const purl = json.req_0.data.midurlinfo[0].purl;
                if (purl) {
                    // 腾讯音乐的域名
                    const domain = json.rep_0 && json.rep_0.data && json.rep_0.data.sip ? json.rep_0.data.sip[0] : 'https://dl.stream.qqmusic.qq.com/';
                    return domain + purl;
                }
            }
            return null;
        } catch (error) {
            console.error('获取QQ音乐链接失败:', error);
            return null;
        }
    },

    /**
     * 搜索歌曲获取songmid
     * @param {string} keyword - 搜索关键词
     * @param {number} limit - 返回数量
     * @returns {Promise<Array>} 歌曲列表
     */
    async searchSong(keyword, limit = 5) {
        try {
            const response = await fetch(`${this.searchUrl}?w=${encodeURIComponent(keyword)}&format=json&p=1&n=${limit}`, {
                headers: {
                    'Referer': 'https://y.qq.com/',
                    'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
                }
            });

            const json = await response.json();
            
            if (json.data && json.data.song) {
                return json.data.song.list.map(song => ({
                    songmid: song.songmid,
                    songname: song.songname,
                    singer: song.singer.map(s => s.name).join(', '),
                    albumname: song.albumname,
                    albummid: song.albummid
                }));
            }
            return [];
        } catch (error) {
            console.error('搜索QQ音乐失败:', error);
            return [];
        }
    },

    /**
     * 获取歌词
     * @param {string} songmid - QQ音乐的歌曲mid
     * @returns {Promise<string>} 歌词或空字符串
     */
    async getLyric(songmid) {
        try {
            const response = await fetch(`${this.lyricUrl}?songmid=${songmid}&format=json&nobase64=1`, {
                headers: {
                    'Referer': 'https://y.qq.com/',
                    'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
                }
            });

            const json = await response.json();
            
            if (json.lyric) {
                return json.lyric;
            }
            return '';
        } catch (error) {
            console.error('获取QQ音乐歌词失败:', error);
            return '';
        }
    },

    /**
     * 根据歌曲名称和艺术家自动匹配QQ音乐资源
     * @param {string} songName - 歌曲名称
     * @param {string} artist - 艺术家
     * @returns {Promise<{songmid: string, url: string}|null>}
     */
    async findSong(songName, artist) {
        const results = await this.searchSong(`${songName} ${artist}`, 3);
        
        for (const song of results) {
            // 尝试获取播放链接
            const url = await this.getSongUrl(song.songmid);
            if (url) {
                return {
                    songmid: song.songmid,
                    url: url,
                    name: song.songname,
                    singer: song.singer,
                    album: song.albumname
                };
            }
        }
        return null;
    }
};

// 导出
if (typeof module !== 'undefined' && module.exports) {
    module.exports = QQMusicAPI;
}
