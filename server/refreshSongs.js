/**
 * Pink Floyd歌曲链接刷新工具
 * 使用代理服务器获取VIP播放链接
 */

const https = require('https');

// 代理服务器地址
const PROXY_BASE = 'http://localhost:3001';

// Pink Floyd歌曲列表（网易云音乐ID）
const PINK_FLOYD_SONGS = [
    {
        id: '4235817',
        name: 'Wish You Were Here',
        artist: 'Pink Floyd',
        side: 'A',
        track: 1
    },
    {
        id: '28238311',
        name: 'Comfortably Numb',
        artist: 'Pink Floyd',
        side: 'A',
        track: 2
    },
    {
        id: '4235820',
        name: 'Time',
        artist: 'Pink Floyd',
        side: 'A',
        track: 3
    },
    {
        id: '4235802',
        name: 'Hey You',
        artist: 'Pink Floyd',
        side: 'A',
        track: 4
    },
    {
        id: '26789046',
        name: 'Lost For Words',
        artist: 'Pink Floyd',
        side: 'A',
        track: 5
    },
    {
        id: '4237525',
        name: 'Another Brick in the Wall',
        artist: 'Pink Floyd',
        side: 'A',
        track: 6
    },
    {
        id: '2046846879',
        name: 'If (Original)',
        artist: 'Pink Floyd',
        side: 'B',
        track: 1
    },
    {
        id: '4238610',
        name: 'Chapter 24',
        artist: 'Pink Floyd',
        side: 'B',
        track: 2
    },
    {
        id: '2116278123',
        name: 'The Great Gig In The Sky',
        artist: 'Pink Floyd',
        side: 'B',
        track: 3
    },
    {
        id: '31738245',
        name: 'The Dark Side of the Moon',
        artist: 'Pink Floyd',
        side: 'B',
        track: 4
    },
    {
        id: '33394060',
        name: 'Echoes',
        artist: 'Pink Floyd',
        side: 'B',
        track: 5
    },
    {
        id: '481537684',
        name: 'Is This The Life We Really Want',
        artist: 'Pink Floyd',
        side: 'B',
        track: 6
    }
];

/**
 * HTTP请求函数
 */
function httpRequest(url) {
    return new Promise((resolve, reject) => {
        const parsedUrl = new URL(url);
        const isHttps = parsedUrl.protocol === 'https:';
        const client = isHttps ? https : require('http');
        
        const options = {
            hostname: parsedUrl.hostname,
            port: parsedUrl.port || (isHttps ? 443 : 80),
            path: parsedUrl.pathname + parsedUrl.search,
            method: 'GET',
            headers: {
                'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
            }
        };
        
        const req = client.request(options, (res) => {
            let data = '';
            res.on('data', (chunk) => {
                data += chunk;
            });
            res.on('end', () => {
                try {
                    resolve(JSON.parse(data));
                } catch (e) {
                    reject(e);
                }
            });
        });
        
        req.on('error', reject);
        req.end();
    });
}

/**
 * 获取歌曲播放链接
 */
async function getSongUrl(songId) {
    try {
        const data = await httpRequest(`${PROXY_BASE}/api/song/url?id=${songId}&level=exhigh`);
        
        if (data.data && data.data[0] && data.data[0].url) {
            return {
                url: data.data[0].url,
                level: data.data[0].level,
                size: data.data[0].size
            };
        }
        return null;
    } catch (error) {
        console.error(`获取歌曲 ${songId} 链接失败:`, error.message);
        return null;
    }
}

/**
 * 延迟函数
 */
function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * 主函数：刷新所有链接
 */
async function refreshAllLinks() {
    console.log('========================================');
    console.log('🎵 Pink Floyd 歌曲链接刷新工具');
    console.log('========================================\n');
    
    // 检查代理服务器是否运行
    try {
        await httpRequest(`${PROXY_BASE}/health`);
        console.log('✅ 代理服务器连接正常\n');
    } catch (error) {
        console.error('❌ 无法连接代理服务器！');
        console.error('请先运行: node server/proxy.js\n');
        console.error('然后在另一个终端运行此脚本');
        process.exit(1);
    }
    
    const results = [];
    
    console.log('开始刷新歌曲链接...\n');
    
    for (const song of PINK_FLOYD_SONGS) {
        console.log(`正在处理: ${song.name} (ID: ${song.id})...`);
        
        const urlInfo = await getSongUrl(song.id);
        
        if (urlInfo) {
            console.log(`  ✅ 成功! 音质: ${urlInfo.level}, 大小: ${(urlInfo.size / 1024 / 1024).toFixed(2)}MB`);
            console.log(`  📎 链接: ${urlInfo.url.substring(0, 60)}...`);
            
            results.push({
                ...song,
                url: urlInfo.url,
                level: urlInfo.level
            });
        } else {
            console.log(`  ❌ 失败（可能需要VIP或版权限制）`);
            results.push({
                ...song,
                url: null,
                level: null
            });
        }
        
        // 添加延迟避免请求过快
        await delay(300);
    }
    
    console.log('\n========================================');
    console.log('刷新完成！');
    console.log(`成功: ${results.filter(r => r.url).length}/${results.length}\n`);
    
    // 生成player.js格式的代码
    const playerCode = `// 由 refreshSongs.js 自动生成 - ${new Date().toLocaleString()}
// 更新到 js/player.js 文件

const sideA = [
${results.filter(r => r.side === 'A').map(r => 
`    {
        id: '${r.id}',
        name: '${r.name}',
        artist: '${r.artist}',
        url: '${r.url || ''}',
        duration: 0
    }`
).join(',\n')}
];

const sideB = [
${results.filter(r => r.side === 'B').map(r => 
`    {
        id: '${r.id}',
        name: '${r.name}',
        artist: '${r.artist}',
        url: '${r.url || ''}',
        duration: 0
    }`
).join(',\n')}
];
`;
    
    console.log('========================================');
    console.log('复制下方代码替换到 js/player.js:');
    console.log('========================================\n');
    console.log(playerCode);
    
    // 同时保存到文件
    const fs = require('fs');
    const outputFile = 'server/generated-player-data.js';
    fs.writeFileSync(outputFile, playerCode, 'utf8');
    console.log(`\n✅ 已保存到: ${outputFile}`);
    
    return results;
}

// 运行主函数
refreshAllLinks().catch(console.error);
