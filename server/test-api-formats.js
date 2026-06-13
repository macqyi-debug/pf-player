/**
 * 修复版 - 测试不同的播放链接API格式
 */

const NETEASE_COOKIE = 'JSESSIONID-WYYY=GsctG1QIWkF3Xmt%2BlD2fXovfgrcGoSiYsTtfIGC3ISmY4adoTedgqI7C8uQCQmpXTm2VxUDI%2F9x9tHS%5CX9Ndg%2Be%5CuEGujKZxWsFZ4mSEBsFtdHlQx097%2B4eHa%5CaG2d8hHuPvROwRs2Uxv41lHd10E5km%2Fg2DONQGTjcChej%2BslZuDR%2B1%3A1780770017408; _iuqxldmzr_=32; _ntes_nnid=ad571bb4cdd7835ba7be12c3cdfdada8,1780768217455; _ntes_nuid=ad571bb4cdd7835ba7be12c3cdfdada8; Hm_lvt_1483fb4774c02a30ffa6f0e2945e9b70=1780768218; HMACCOUNT=54C5D9A53A8614DA; NMTID=00OPeAvo5zpbu9ap0xzvur6F0reNX4AAAGeng6bKA; WEVNSM=1.0.0; WNMCID=jbmfuk.1780768222232.01.0; WM_NI=jmWq4pO1hA0vIq3OzehvgatZ%2FsKlTzy%2FbDb3jYDqs19k6gKzAJUyNkLcgTOK8%2FJeX1LqrP63XD8C2JId4uz3dcVsi1syKk85pJi0iOpUSmNbuE3FevQ%2BX3L7OJQ0lMV5VTI%3D; WM_NIKE=9ca17ae2e6ffcda170e2e6eeb9c13d8dbf87d8d521edeb8ea3c85b829a9e86d2218e91fbb7d373949ca991c92af0fea7c3b92aaab39992b77c8defa8a2b37e8baffdb0f96facaaa982f752edad858dd772bbf1aea5e139aa878c92f23bfbb5fa88ca7283969b9acd6190bda9b5ce41fcf18686db3b90afbeb1b5399c9cf8a4b1428bbcfc96f939a8bd9a94ec3bb1a7858cbb3fb496a7d1ec45b48b9d8ecd6ab79bfda7e87e93f598d4cf3d8d969fd1ef4796eb9ab5cc37e2a3; WM_TID=B4XrK15XDtlBBEBFRVLD%2BMf4BKjOGg8Z; ntes_utid=tid._.2QVkfyfsae9EVkUAAEfH6ZK8VanO7yvp._.0; sDeviceId=YD-3xtilXuM%2FR9AQwQEVVLG%2FIKtAOif6zvt; __snaker__id=yPv8hGfdRLRT3Dpl; gdxidpyhxdE=j%2F6OVomVgRr%2BCGGf%2B8J1saIx2GQA4T2%2BfnqVC8rA%5CYRR%5CWWv85kKdD4P%2BMwfLvjeO%5Cn0LT%2B%2BsAKla1N2PJjfz694CDWE0GiORSAI7TlnnDCazC74st%2FA3mwLLU74DKI0inSX3nP3CY0ZDi%2F2%5Cw2kxNad9KEUNciW35WibWyw0zfdL0iI%3A1780770701396; __csrf=4c5786291a0ae3d37b186a901bc11aa7; Hm_lpvt_1483fb4774c02a30ffa6f0e2945e9b70=1780769828; ntes_kaola_ad=1';

const https = require('https');
const http = require('http');

const songId = '4235817';

function makeRequest(url, method = 'GET', postData = null) {
    return new Promise((resolve, reject) => {
        const parsedUrl = new URL(url);
        const isHttps = parsedUrl.protocol === 'https:';
        const client = isHttps ? https : http;

        const options = {
            hostname: parsedUrl.hostname,
            port: parsedUrl.port || (isHttps ? 443 : 80),
            path: parsedUrl.pathname + parsedUrl.search,
            method: method,
            headers: {
                'Cookie': NETEASE_COOKIE,
                'Referer': 'https://music.163.com/',
                'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
                'Accept': 'application/json, text/plain, */*',
                'Accept-Language': 'zh-CN,zh;q=0.9,en;q=0.8',
                'Content-Type': 'application/x-www-form-urlencoded',
                'Origin': 'https://music.163.com',
                'Connection': 'keep-alive'
            }
        };

        if (postData) {
            options.headers['Content-Length'] = Buffer.byteLength(postData);
        }

        const req = client.request(options, (res) => {
            let data = '';
            res.on('data', (chunk) => {
                data += chunk;
            });
            res.on('end', () => {
                resolve({ status: res.statusCode, data });
            });
        });

        req.on('error', reject);
        if (postData) req.write(postData);
        req.end();
    });
}

async function testAllFormats() {
    console.log('========================================');
    console.log('🎵 测试播放链接API - 多种格式');
    console.log('========================================\n');

    const tests = [
        // 格式1: GET参数id=xxx&level=exhigh
        { name: 'GET id=xxx&level=exhigh', url: `https://music.163.com/api/song/enhance/player/url?id=${songId}&level=exhigh` },

        // 格式2: POST表单提交
        { name: 'POST form ids=xxx', url: `https://music.163.com/api/song/enhance/player/url`, method: 'POST', data: `id=${songId}&level=exhigh` },

        // 格式3: GET ids作为数组
        { name: 'GET ids=[xxx]', url: `https://music.163.com/api/song/enhance/player/url?ids=[${songId}]&level=exhigh` },

        // 格式4: POST JSON body
        { name: 'POST JSON {ids:[xxx]}', url: `https://music.163.com/api/song/enhance/player/url`, method: 'POST', data: JSON.stringify({ ids: [songId], level: 'exhigh' }) },

        // 格式5: 不同的API端点
        { name: 'GET /song/play url', url: `https://music.163.com/api/song/play/url?id=${songId}&level=exhigh` },

        // 格式6: Linux API格式
        { name: 'Linux API format', url: `https://music.163.com/api/song/detail?ids=[${songId}]` },
    ];

    for (const test of tests) {
        try {
            console.log(`测试: ${test.name}`);
            console.log(`URL: ${test.url}`);

            const result = await makeRequest(
                test.url,
                test.method || 'GET',
                test.data || null
            );

            console.log(`状态: ${result.status}`);
            console.log(`响应: ${result.data.substring(0, 150)}`);

            // 尝试解析JSON
            try {
                const json = JSON.parse(result.data);
                if (json.data && json.data[0] && json.data[0].url) {
                    console.log('✅ 成功获取播放链接!');
                    console.log(`链接: ${json.data[0].url}`);
                } else if (json.songs && json.songs[0]) {
                    console.log('📋 获取到歌曲详情');
                    console.log(`歌曲名: ${json.songs[0].name}`);
                } else {
                    console.log(`响应码: ${json.code || 'N/A'}, 消息: ${json.msg || 'N/A'}`);
                }
            } catch (e) {
                // 不是JSON
            }

            console.log('');

            // 延迟
            await new Promise(r => setTimeout(r, 300));

        } catch (e) {
            console.error(`❌ 请求失败: ${e.message}\n`);
        }
    }

    console.log('========================================');
    console.log('测试完成！');
    console.log('========================================');
}

testAllFormats();
