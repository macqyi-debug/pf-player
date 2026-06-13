/**
 * 尝试使用POST请求体获取播放链接
 */

const NETEASE_COOKIE = '_iuqxldmzr_=32; _ntes_nnid=ad571bb4cdd7835ba7be12c3cdfdada8,1780768217455; _ntes_nuid=ad571bb4cdd7835ba7be12c3cdfdada8; Hm_lvt_1483fb4774c02a30ffa6f0e2945e9b70=1780768218; HMACCOUNT=54C5D9A53A8614DA; NMTID=00OPeAvo5zpbu9ap0xzvur6F0reNX4AAAGeng6bKA; WEVNSM=1.0.0; WNMCID=jbmfuk.1780768222232.01.0; WM_NI=jmWq4pO1hA0vIq3OzehvgatZ%2FsKlTzy%2FbDb3jYDqs19k6gKzAJUyNkLcgTOK8%2FJeX1LqrP63XD8C2JId4uz3dcVsi1syKk85pJi0iOpUSmNbuE3FevQ%2BX3L7OJQ0lMV5VTI%3D; WM_NIKE=9ca17ae2e6ffcda170e2e6eeb9c13d8dbf87d8d521edeb8ea3c85b829a9e86d2218e91fbb7d373949ca991c92af0fea7c3b92aaab39992b77c8defa8a2b37e8baffdb0f96facaaa982f752edad858dd772bbf1aea5e139aa878c92f23bfbb5fa88ca7283969b9acd6190bda9b5ce41fcf18686db3b90afbeb1b5399c9cf8a4b1428bbcfc96f939a8bd9a94ec3bb1a7858cbb3fb496a7d1ec45b48b9d8ecd6ab79bfda7e87e93f598d4cf3d8d969fd1ef4796eb9ab5cc37e2a3; WM_TID=B4XrK15XDtlBBEBFRVLD%2BMf4BKjOGg8Z; ntes_utid=tid._.2QVkfyfsae9EVkUAAEfH6ZK8VanO7yvp._.0; sDeviceId=YD-3xtilXuM%2FR9AQwQEVVLG%2FIKtAOif6zvt; __snaker__id=yPv8hGfdRLRT3Dpl; gdxidpyhxdE=j%2F6OVomVgRr%2BCGGf%2B8J1saIx2GQA4T2%2BfnqVC8rA%5CYRR%5CWWv85kKdD4P%2BMwfLvjeO%5Cn0LT%2B%2BsAKla1N2PJjfz694CDWE0GiORSAI7TlnnDCazC74st%2FA3mwLLU74DKI0inSX3nP3CY0ZDi%2F2%5Cw2kxNad9KEUNciW35WibWyw0zfdL0iI%3A1780770701396; __csrf=4c5786291a0ae3d37b186a901bc11aa7; ntes_kaola_ad=1; JSESSIONID-WYYY=PnaYODyvxYUzuiM%5C28AYPFgDD%2FJSgAcxn0sX%5CbVXH2r0y3%2Bi1pQrXX%5CDG%5CZRU7pS1Z%2BBQw%5CvS70E7mxs0WDO%5CrHkGOvqSMI5%2Fp4W5Qd4QASvlX0%2B6zJS%2BrMbXdUjOqknhrPi57aew2zyKG35TylKcsk%5CXMiDd8nx%5CIe81eJHBmApaDW7%3A1780771757420; Hm_lpvt_1483fb4774c02a30ffa6f0e2945e9b70=1780770136';

const https = require('https');
const querystring = require('querystring');

const songId = '4235817'; // Wish You Were Here

function makeRequest(options, postData = null) {
    return new Promise((resolve, reject) => {
        const req = https.request(options, (res) => {
            let data = '';
            res.on('data', (chunk) => {
                data += chunk;
            });
            res.on('end', () => {
                resolve({ status: res.statusCode, headers: res.headers, data });
            });
        });

        req.on('error', reject);
        if (postData) req.write(postData);
        req.end();
    });
}

async function testFormats() {
    console.log('========================================');
    console.log('🎵 深度测试 - POST请求体格式');
    console.log('========================================\n');

    // 测试1: 标准POST表单格式
    console.log('测试1: 标准POST表单格式 (id=xxx&level=exhigh)');
    let result = await makeRequest({
        hostname: 'music.163.com',
        port: 443,
        path: '/api/song/enhance/player/url',
        method: 'POST',
        headers: {
            'Cookie': NETEASE_COOKIE,
            'Referer': 'https://music.163.com/',
            'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    }, `id=${songId}&level=exhigh`);
    console.log(`状态: ${result.status}`);
    console.log(`响应: ${result.data.substring(0, 100)}`);
    console.log('');

    // 测试2: POST JSON格式
    console.log('测试2: POST JSON格式 {ids:[xxx],level:"exhigh"}');
    result = await makeRequest({
        hostname: 'music.163.com',
        port: 443,
        path: '/api/song/enhance/player/url',
        method: 'POST',
        headers: {
            'Cookie': NETEASE_COOKIE,
            'Referer': 'https://music.163.com/',
            'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
            'Content-Type': 'application/json'
        }
    }, JSON.stringify({ ids: [songId], level: 'exhigh' }));
    console.log(`状态: ${result.status}`);
    console.log(`响应: ${result.data.substring(0, 100)}`);
    console.log('');

    // 测试3: GET with different params
    console.log('测试3: GET - 尝试不同的参数格式');
    result = await makeRequest({
        hostname: 'music.163.com',
        port: 443,
        path: `/api/song/enhance/player/url?id=${songId}&level=exhigh&encodeType=aac`,
        method: 'GET',
        headers: {
            'Cookie': NETEASE_COOKIE,
            'Referer': 'https://music.163.com/',
            'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
        }
    });
    console.log(`状态: ${result.status}`);
    console.log(`响应: ${result.data.substring(0, 100)}`);
    console.log('');

    // 测试4: 尝试使用curl命令格式
    console.log('测试4: 检查curl生成的请求');
    const curlCmd = `curl -X GET "https://music.163.com/api/song/enhance/player/url?id=${songId}&level=exhigh" \\
  -H "Cookie: ${NETEASE_COOKIE}" \\
  -H "Referer: https://music.163.com/" \\
  -H "User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"`;
    console.log(curlCmd);
    console.log('');

    // 测试5: 直接检查原始响应
    console.log('测试5: 完整原始响应检查');
    result = await makeRequest({
        hostname: 'music.163.com',
        port: 443,
        path: `/api/song/enhance/player/url?id=${songId}&level=exhigh`,
        method: 'GET',
        headers: {
            'Cookie': NETEASE_COOKIE,
            'Referer': 'https://music.163.com/',
            'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
            'Accept': '*/*'
        }
    });
    console.log(`状态: ${result.status}`);
    console.log(`完整响应: ${result.data}`);
    console.log(`响应长度: ${result.data.length} 字节`);

    // 分析响应
    if (result.data.includes('"msg":"参数错误"')) {
        console.log('\n⚠️ 检测到"参数错误"响应');
        console.log('可能原因:');
        console.log('1. API需要特定的请求参数格式');
        console.log('2. 可能需要登录态更完整的Cookie');
        console.log('3. 网易云可能已更改API');
    }

    console.log('\n========================================');
    console.log('测试完成');
    console.log('========================================');
}

testFormats().catch(console.error);
