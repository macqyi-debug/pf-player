/**
 * 直接测试网易云API
 */

const NETEASE_COOKIE = 'JSESSIONID-WYYY=GsctG1QIWkF3Xmt%2BlD2fXovfgrcGoSiYsTtfIGC3ISmY4adoTedgqI7C8uQCQmpXTm2VxUDI%2F9x9tHS%5CX9Ndg%2Be%5CuEGujKZxWsFZ4mSEBsFtdHlQx097%2B4eHa%5CaG2d8hHuPvROwRs2Uxv41lHd10E5km%2Fg2DONQGTjcChej%2BslZuDR%2B1%3A1780770017408; _iuqxldmzr_=32; _ntes_nnid=ad571bb4cdd7835ba7be12c3cdfdada8,1780768217455; _ntes_nuid=ad571bb4cdd7835ba7be12c3cdfdada8; Hm_lvt_1483fb4774c02a30ffa6f0e2945e9b70=1780768218; HMACCOUNT=54C5D9A53A8614DA; NMTID=00OPeAvo5zpbu9ap0xzvur6F0reNX4AAAGeng6bKA; WEVNSM=1.0.0; WNMCID=jbmfuk.1780768222232.01.0; WM_NI=jmWq4pO1hA0vIq3OzehvgatZ%2FsKlTzy%2FbDb3jYDqs19k6gKzAJUyNkLcgTOK8%2FJeX1LqrP63XD8C2JId4uz3dcVsi1syKk85pJi0iOpUSmNbuE3FevQ%2BX3L7OJQ0lMV5VTI%3D; WM_NIKE=9ca17ae2e6ffcda170e2e6eeb9c13d8dbf87d8d521edeb8ea3c85b829a9e86d2218e91fbb7d373949ca991c92af0fea7c3b92aaab39992b77c8defa8a2b37e8baffdb0f96facaaa982f752edad858dd772bbf1aea5e139aa878c92f23bfbb5fa88ca7283969b9acd6190bda9b5ce41fcf18686db3b90afbeb1b5399c9cf8a4b1428bbcfc96f939a8bd9a94ec3bb1a7858cbb3fb496a7d1ec45b48b9d8ecd6ab79bfda7e87e93f598d4cf3d8d969fd1ef4796eb9ab5cc37e2a3; WM_TID=B4XrK15XDtlBBEBFRVLD%2BMf4BKjOGg8Z; ntes_utid=tid._.2QVkfyfsae9EVkUAAEfH6ZK8VanO7yvp._.0; sDeviceId=YD-3xtilXuM%2FR9AQwQEVVLG%2FIKtAOif6zvt; __snaker__id=yPv8hGfdRLRT3Dpl; gdxidpyhxdE=j%2F6OVomVgRr%2BCGGf%2B8J1saIx2GQA4T2%2BfnqVC8rA%5CYRR%5CWWv85kKdD4P%2BMwfLvjeO%5Cn0LT%2B%2BsAKla1N2PJjfz694CDWE0GiORSAI7TlnnDCazC74st%2FA3mwLLU74DKI0inSX3nP3CY0ZDi%2F2%5Cw2kxNad9KEUNciW35WibWyw0zfdL0iI%3A1780770701396; __csrf=4c5786291a0ae3d37b186a901bc11aa7; Hm_lpvt_1483fb4774c02a30ffa6f0e2945e9b70=1780769828; ntes_kaola_ad=1';

const https = require('https');

// 测试歌曲ID
const songId = '4235817'; // Wish You Were Here

console.log('========================================');
console.log('🎵 直接测试网易云音乐API');
console.log('========================================\n');

console.log(`测试歌曲ID: ${songId}\n`);

// 方法1: 旧API (v1)
const url1 = `/api/song/enhance/player/url?id=${songId}&level=exhigh`;
console.log('方法1 - 旧API:', url1);

// 方法2: 搜索API
const url2 = '/api/search/get/web?s=' + encodeURIComponent('Pink Floyd Wish You Were Here') + '&type=1&offset=0&total=true&limit=20';
console.log('方法2 - 搜索API:', url2);

// 方法3: 获取歌曲详情
const url3 = `/api/song/detail?ids=[${songId}]`;
console.log('方法3 - 歌曲详情:', url3);

// 方法4: 直接获取播放链接 (不同的API格式)
const url4 = `/api/song/play?id=${songId}`;
console.log('方法4 - 播放API:', url4);

console.log('\n========================================');

// 测试函数
function testUrl(path) {
    return new Promise((resolve, reject) => {
        const options = {
            hostname: 'music.163.com',
            port: 443,
            path: path,
            method: 'GET',
            headers: {
                'Cookie': NETEASE_COOKIE,
                'Referer': 'https://music.163.com/',
                'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
                'Accept': 'application/json',
                'Connection': 'keep-alive'
            }
        };

        const req = https.request(options, (res) => {
            let data = '';
            res.on('data', (chunk) => {
                data += chunk;
            });
            res.on('end', () => {
                console.log(`\nURL: ${path}`);
                console.log(`状态: ${res.statusCode}`);
                console.log(`响应: ${data.substring(0, 200)}`);
                resolve({ path, status: res.statusCode, data });
            });
        });

        req.on('error', (e) => {
            reject(e);
        });

        req.end();
    });
}

// 依次测试
async function runTests() {
    try {
        await testUrl('/api/song/enhance/player/url?id=4235817&level=exhigh');
        await new Promise(r => setTimeout(r, 500));

        await testUrl('/api/song/detail?ids=[4235817]');
        await new Promise(r => setTimeout(r, 500));

        await testUrl('/api/search/get/web?s=Wish%20You%20Were%20Here&type=1&limit=5');

        console.log('\n========================================');
        console.log('测试完成！');
        console.log('========================================\n');
    } catch (e) {
        console.error('测试失败:', e);
    }
}

runTests();
