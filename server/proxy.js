/**
 * 网易云音乐API代理服务器
 * 解决浏览器CORS跨域限制
 */

const http = require('http');
const https = require('https');
const url = require('url');

// 配置
const PORT = 3001;
const NETEASE_API_BASE = 'https://music.163.com';

// 用户的cookie（从neteaseVipApi.js获取）
let NETEASE_COOKIE = '_iuqxldmzr_=32; _ntes_nnid=ad571bb4cdd7835ba7be12c3cdfdada8,1780768217455; _ntes_nuid=ad571bb4cdd7835ba7be12c3cdfdada8; Hm_lvt_1483fb4774c02a30ffa6f0e2945e9b70=1780768218; HMACCOUNT=54C5D9A53A8614DA; NMTID=00OPeAvo5zpbu9ap0xzvur6F0reNX4AAAGeng6bKA; WEVNSM=1.0.0; WNMCID=jbmfuk.1780768222232.01.0; WM_NI=jmWq4pO1hA0vIq3OzehvgatZ%2FsKlTzy%2FbDb3jYDqs19k6gKzAJUyNkLcgTOK8%2FJeX1LqrP63XD8C2JId4uz3dcVsi1syKk85pJi0iOpUSmNbuE3FevQ%2BX3L7OJQ0lMV5VTI%3D; WM_NIKE=9ca17ae2e6ffcda170e2e6eeb9c13d8dbf87d8d521edeb8ea3c85b829a9e86d2218e91fbb7d373949ca991c92af0fea7c3b92aaab39992b77c8defa8a2b37e8baffdb0f96facaaa982f752edad858dd772bbf1aea5e139aa878c92f23bfbb5fa88ca7283969b9acd6190bda9b5ce41fcf18686db3b90afbeb1b5399c9cf8a4b1428bbcfc96f939a8bd9a94ec3bb1a7858cbb3fb496a7d1ec45b48b9d8ecd6ab79bfda7e87e93f598d4cf3d8d969fd1ef4796eb9ab5cc37e2a3; WM_TID=B4XrK15XDtlBBEBFRVLD%2BMf4BKjOGg8Z; ntes_utid=tid._.2QVkfyfsae9EVkUAAEfH6ZK8VanO7yvp._.0; sDeviceId=YD-3xtilXuM%2FR9AQwQEVVLG%2FIKtAOif6zvt; __snaker__id=yPv8hGfdRLRT3Dpl; gdxidpyhxdE=j%2F6OVomVgRr%2BCGGf%2B8J1saIx2GQA4T2%2BfnqVC8rA%5CYRR%5CWWv85kKdD4P%2BMwfLvjeO%5Cn0LT%2B%2BsAKla1N2PJjfz694CDWE0GiORSAI7TlnnDCazC74st%2FA3mwLLU74DKI0inSX3nP3CY0ZDi%2F2%5Cw2kxNad9KEUNciW35WibWyw0zfdL0iI%3A1780770701396; __csrf=4c5786291a0ae3d37b186a901bc11aa7; ntes_kaola_ad=1; JSESSIONID-WYYY=PnaYODyvxYUzuiM%5C28AYPFgDD%2FJSgAcxn0sX%5CbVXH2r0y3%2Bi1pQrXX%5CDG%5CZRU7pS1Z%2BBQw%5CvS70E7mxs0WDO%5CrHkGOvqSMI5%2Fp4W5Qd4QASvlX0%2B6zJS%2BrMbXdUjOqknhrPi57aew2zyKG35TylKcsk%5CXMiDd8nx%5CIe81eJHBmApaDW7%3A1780771757420; Hm_lpvt_1483fb4774c02a30ffa6f0e2945e9b70=1780770136';

// 创建代理服务器
const server = http.createServer((req, res) => {
    // 设置CORS头
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    
    // 处理OPTIONS预检请求
    if (req.method === 'OPTIONS') {
        res.writeHead(200);
        res.end();
        return;
    }
    
    const parsedUrl = url.parse(req.url, true);
    const path = parsedUrl.pathname;
    
    console.log(`[${new Date().toLocaleTimeString()}] ${req.method} ${path}`);
    
    // 路由处理
    if (path === '/api/song/url') {
        proxyToNetease(`/api/song/enhance/player/url?id=${parsedUrl.query.id}&level=${parsedUrl.query.level || 'exhigh'}`, res);
    } else if (path === '/api/song/detail') {
        proxyToNetease(`/api/song/detail?id=${parsedUrl.query.id}`, res);
    } else if (path === '/api/song/lyric') {
        proxyToNetease(`/api/song/lyric?id=${parsedUrl.query.id}&lv=1&kv=1&tv=-1`, res);
    } else if (path === '/api/search') {
        proxyToNetease(`/api/search/get/web?csrf_token=&hlpretag=&hlposttag=&s=${encodeURIComponent(parsedUrl.query.keyword)}&type=1&offset=0&total=true&limit=20`, res);
    } else if (path === '/health') {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ status: 'ok', message: '代理服务器运行正常' }));
    } else {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Not Found', message: '请使用正确的API路径' }));
    }
});

/**
 * 代理请求到网易云音乐
 */
function proxyToNetease(neteasePath, res) {
    const options = {
        hostname: 'music.163.com',
        port: 443,
        path: neteasePath,
        method: 'GET',
        headers: {
            'Cookie': NETEASE_COOKIE,
            'Referer': 'https://music.163.com/',
            'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
        }
    };
    
    const proxyReq = https.request(options, (proxyRes) => {
        let data = '';
        
        proxyRes.on('data', (chunk) => {
            data += chunk;
        });
        
        proxyRes.on('end', () => {
            res.writeHead(proxyRes.statusCode, {
                'Content-Type': 'application/json',
                'Cache-Control': 'no-cache'
            });
            res.end(data);
        });
    });
    
    proxyReq.on('error', (e) => {
        console.error('代理请求错误:', e);
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Proxy Error', message: e.message }));
    });
    
    proxyReq.end();
}

// 启动服务器
server.listen(PORT, () => {
    console.log('========================================');
    console.log('🎵 网易云音乐API代理服务器');
    console.log(`📍 运行地址: http://localhost:${PORT}`);
    console.log('');
    console.log('📋 可用API:');
    console.log(`  - GET http://localhost:${PORT}/health`);
    console.log(`  - GET http://localhost:${PORT}/api/song/url?id=歌曲ID`);
    console.log(`  - GET http://localhost:${PORT}/api/song/detail?id=歌曲ID`);
    console.log(`  - GET http://localhost:${PORT}/api/song/lyric?id=歌曲ID`);
    console.log(`  - GET http://localhost:${PORT}/api/search?keyword=搜索词`);
    console.log('');
    console.log('========================================');
});
