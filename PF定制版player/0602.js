// 在player.js中添加音源有效性检查
function checkAudioUrl(url) {
    return new Promise((resolve) => {
        const audio = new Audio();
        audio.onloadedmetadata = () => resolve(true);
        audio.onerror = () => resolve(false);
        audio.src = url;
    });
}

// 使用时检查
async function playSong(song) {
    const isValid = await checkAudioUrl(song.url);
    if (!isValid) {
        console.warn(`音频链接失效: ${song.url}`);
        // 可以选择播放备用音源或提示用户
    }
    // 继续播放逻辑
}