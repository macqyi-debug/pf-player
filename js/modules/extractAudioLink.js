/**
 * 网易云音乐音频链接提取工具（浏览器端使用）
 * 
 * 使用方法：
 * 1. 在浏览器中打开 https://music.163.com
 * 2. 登录您的账号
 * 3. 搜索并播放一首Pink Floyd的歌曲
 * 4. 按F12打开开发者工具
 * 5. 切换到"控制台(Console)"标签
 * 6. 粘贴此脚本并按Enter
 * 7. 复制输出的音频链接
 */

(function() {
    console.log('========================================');
    console.log('🎵 网易云音乐音频链接提取工具');
    console.log('========================================\n');

    // 方法1: 尝试从audio元素获取当前播放链接
    console.log('方法1: 检查页面上的audio元素...');
    const audios = document.querySelectorAll('audio');
    if (audios.length > 0) {
        audios.forEach((audio, i) => {
            console.log(`\n找到audio元素 #${i + 1}:`);
            console.log(`  src: ${audio.src || '无src属性'}`);
            console.log(`  currentSrc: ${audio.currentSrc || '空'}`);
            console.log(`  readyState: ${audio.readyState}`);
        });
    } else {
        console.log('  未找到audio元素');
    }

    // 方法2: 尝试从DOM获取flashvars中的链接
    console.log('\n方法2: 检查页面中的音频变量...');
    
    // 检查window对象中的音频相关变量
    const audioVars = [];
    for (const key in window) {
        if (key.toLowerCase().includes('audio') || 
            key.toLowerCase().includes('player') ||
            key.toLowerCase().includes('music') ||
            key.toLowerCase().includes('song')) {
            try {
                const value = window[key];
                if (value && typeof value === 'object') {
                    if (value.src || value.url || value.mp3url || value.playUrl) {
                        audioVars.push({
                            name: key,
                            value: value.src || value.url || value.mp3url || value.playUrl
                        });
                    }
                }
            } catch (e) {}
        }
    }
    
    if (audioVars.length > 0) {
        console.log('找到可能的音频变量:');
        audioVars.forEach(v => {
            console.log(`  ${v.name}: ${v.value}`);
        });
    } else {
        console.log('  未找到相关变量');
    }

    // 方法3: 尝试从网易云音乐播放器的内部API获取
    console.log('\n方法3: 检查Netease Cloud Music API...');
    
    // 尝试查找播放器实例
    let playerInstance = null;
    
    // 常见变量名
    const possibleNames = [
        'player', 'Player', 'musicPlayer', 'audioPlayer', ' AudioPlayer',
        '$player', 'playerModule', 'playerStore', 'playerInstance'
    ];
    
    possibleNames.forEach(name => {
        if (window[name] && typeof window[name] === 'object') {
            playerInstance = window[name];
        }
    });

    // 方法4: 直接提取页面上的音频链接（如果有的话）
    console.log('\n方法4: 搜索页面中的所有链接...');
    const links = document.querySelectorAll('a[href*=".mp3"], a[href*=".m4a"], link[href*="music"]');
    if (links.length > 0) {
        console.log('找到可能的音频链接:');
        links.forEach(link => {
            console.log(`  ${link.href}`);
        });
    } else {
        console.log('  未找到直接链接');
    }

    // 输出最终结果
    console.log('\n========================================');
    console.log('📋 提取结果');
    console.log('========================================');
    
    // 尝试从audio元素获取
    const audioElement = document.querySelector('audio');
    if (audioElement && audioElement.src) {
        console.log('\n✅ 找到音频链接!');
        console.log('链接: ' + audioElement.src);
        console.log('\n👉 这是当前播放歌曲的直链，可以直接复制使用!');
        
        // 复制到剪贴板
        if (confirm('是否复制链接到剪贴板？')) {
            navigator.clipboard.writeText(audioElement.src).then(() => {
                alert('链接已复制!');
            });
        }
    } else {
        console.log('\n❌ 未找到音频链接');
        console.log('\n💡 建议:');
        console.log('1. 请先在网易云音乐网页版播放一首歌曲');
        console.log('2. 确保歌曲正在播放中');
        console.log('3. 然后再次运行此脚本');
    }
    
    console.log('\n========================================\n');
})();
