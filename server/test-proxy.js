/**
 * 测试代理服务器
 */

const http = require('http');
const https = require('https');

const NETEASE_COOKIE = 'JSESSIONID-WYYY=GsctG1QIWkF3Xmt%2BlD2fXovfgrcGoSiYsTtfIGC3ISmY4adoTedgqI7C8uQCQmpXTm2VxUDI%2F9x9tHS%5CX9Ndg%2Be%5CuEGujKZxWsFZ4mSEBsFtdHlQx097%2B4eHa%5CaG2d8hHuPvROwRs2Uxv41lHd10E5km%2Fg2DONQGTjcChej%2BslZuDR%2B1%3A1780770017408; _iuqxldmzr_=32; _ntes_nnid=ad571bb4cdd7835ba7be12c3cdfdada8,1780768217455; _ntes_nuid=ad571bb4cdd7835ba7be12c3cdfdada8; Hm_lvt_1483fb4774c02a30ffa6f0e2945e9b70=1780768218; HMACCOUNT=54C5D9A53A8614DA; NMTID=00OPeAvo5zpbu9ap0xzvur6F0reNX4AAAGeng6bKA; WEVNSM=1.0.0; WNMCID=jbmfuk.1780768222232.01.0; WM_NI=jmWq4pO1hA0vIq3OzehvgatZ%2FsKlTzy%2FbDb3jYDqs19k6gKzAJUyNkLcgTOK8%2FJeX1LqrP63XD8C2JId4uz3dcVsi1syKk85pJi0iOpUSmNbuE3FevQ%2BX3L7OJQ0lMV5VTI%3D; WM_NIKE=9ca17ae2e6ffcda170e2e6eeb9c13d8dbf87d8d521edeb8ea3c85b829a9e86d2218e91fbb7d373949ca991c92af0fea7c3b92aaab39992b77c8defa8a2b37e8baffdb0f96facaaa982f752edad858dd772bbf1aea5e139aa878c92f23bfbb5fa88ca7283969b9acd6190bda9b5ce41fcf18686db3b90afbeb1b5399c9cf8a4b1428bbcfc96f939a8bd9a94ec3bb1a7858cbb3fb496a7d1ec45b48b9d8ecd6ab79bfda7e87e93f598d4cf3d8d969fd1ef4796eb9ab5cc37e2a3; WM_TID=B4XrK15XDtlBBEBFRVLD%2BMf4BKjOGg8Z; ntes_utid=tid._.2QVkfyfsae9EVkUAAEfH6ZK8VanO7yvp._.0; sDeviceId=YD-3xtilXuM%2FR9AQwQEVVLG%2FIKtAOif6zvt; Hm_lpvt_1483fb4774c02a30ffa6f0e2945e9b70=1780768520';

const options = {
    hostname: 'music.163.com',
    port: 443,
    path: '/api/song/enhance/player/url?id=4235817&level=exhigh',
    method: 'GET',
    headers: {
        'Cookie': NETEASE_COOKIE,
        'Referer': 'https://music.163.com/',
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
    }
};

console.log('正在测试网易云API...\n');

const req = https.request(options, (res) => {
    console.log(`响应状态码: ${res.statusCode}`);
    console.log(`响应头:`, res.headers);
    console.log('');
    
    let data = '';
    
    res.on('data', (chunk) => {
        data += chunk;
        console.log(`接收到数据: ${chunk.length} 字节`);
    });
    
    res.on('end', () => {
        console.log('\n========================================');
        console.log('完整响应内容:');
        console.log('========================================');
        console.log(data);
        console.log('========================================\n');
        
        try {
            const json = JSON.parse(data);
            console.log('✅ JSON解析成功!');
            console.log('解析结果:', JSON.stringify(json, null, 2));
        } catch (e) {
            console.log('❌ JSON解析失败:', e.message);
        }
    });
});

req.on('error', (e) => {
    console.error('请求失败:', e);
});

req.end();
