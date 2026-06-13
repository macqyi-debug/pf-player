// 示例音频数据 - 使用免费音乐源
// 当没有真正的Pink Floyd音频时使用

const demoPlaylist = {
    A: [
        {
            id: 'demo-1',
            name: 'Wish You Were Here (Demo)',
            artist: 'Pink Floyd',
            album: 'Wish You Were Here',
            cover: 'http://p1.music.126.net/5sDLKpZW98XER9uuQrOHOw==/109951172026793754.jpg?param=300x300',
            url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
            lyrics: `[00:00.000]So, so you think you can tell
[00:05.000]Heaven from Hell
[00:10.000]Blue skies from pain
[00:15.000]Wish you were here
[00:20.000]How I wish, how I wish you were here`
        },
        {
            id: 'demo-2',
            name: 'Comfortably Numb (Demo)',
            artist: 'Pink Floyd',
            album: 'The Wall',
            cover: 'http://p1.music.126.net/WaBh0-9dmRCQo3mdtrWY2Q==/109951172026873767.jpg?param=300x300',
            url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3',
            lyrics: `[00:00.000]Hello, is there anybody in there?
[00:05.000]Just nod if you can hear me
[00:10.000]I have become comfortably numb`
        },
        {
            id: 'demo-3',
            name: 'Time (Demo)',
            artist: 'Pink Floyd',
            album: 'Dark Side of the Moon',
            cover: 'http://p2.music.126.net/5sDLKpZW98XER9uuQrOHOw==/109951172026793754.jpg?param=300x300',
            url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3',
            lyrics: `[00:00.000]Ticking away the moments
[00:05.000]You fritter and waste the hours
[00:10.000]Time is gone`
        },
        {
            id: 'demo-4',
            name: 'Hey You (Demo)',
            artist: 'Pink Floyd',
            album: 'The Wall',
            cover: 'http://p1.music.126.net/WaBh0-9dmRCQo3mdtrWY2Q==/109951172026873767.jpg?param=300x300',
            url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3',
            lyrics: `[00:00.000]Hey you, out there in the cold
[00:05.000]Getting lonely, getting old`
        },
        {
            id: 'demo-5',
            name: 'Lost For Words (Demo)',
            artist: 'Pink Floyd',
            album: 'Division Bell',
            cover: 'http://p1.music.126.net/WaBh0-9dmRCQo3mdtrWY2Q==/109951172026873767.jpg?param=300x300',
            url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3',
            lyrics: `[00:00.000]So I opened my door to my enemies
[00:05.000]And I said, \"Here, ya go\"`
        },
        {
            id: 'demo-6',
            name: 'Another Brick (Demo)',
            artist: 'Pink Floyd',
            album: 'The Wall',
            cover: 'http://p2.music.126.net/5sDLKpZW98XER9uuQrOHOw==/109951172026793754.jpg?param=300x300',
            url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3',
            lyrics: `[00:00.000]We don't need no education
[00:05.000]Hey, teacher, leave them kids alone!`
        }
    ],
    B: [
        {
            id: 'demo-7',
            name: 'If (Demo)',
            artist: 'Pink Floyd',
            album: 'Atom Heart Mother',
            cover: 'http://p1.music.126.net/WaBh0-9dmRCQo3mdtrWY2Q==/109951172026873767.jpg?param=300x300',
            url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-7.mp3',
            lyrics: `[00:00.000]If I were a swan, I'd be gone
[00:05.000]If I were a train, I'd be late`
        },
        {
            id: 'demo-8',
            name: 'Chapter 24 (Demo)',
            artist: 'Pink Floyd',
            album: 'Piper at Gates',
            cover: 'http://p2.music.126.net/5sDLKpZW98XER9uuQrOHOw==/109951172026793754.jpg?param=300x300',
            url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3',
            lyrics: `[00:00.000]Chapter 24, the time is gone
[00:05.000]Seasons change, one by one`
        },
        {
            id: 'demo-9',
            name: 'Great Gig (Demo)',
            artist: 'Pink Floyd',
            album: 'Dark Side of the Moon',
            cover: 'http://p1.music.126.net/WaBh0-9dmRCQo3mdtrWY2Q==/109951172026873767.jpg?param=300x300',
            url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-9.mp3',
            lyrics: `[00:00.000][Vocal improvisation]`
        },
        {
            id: 'demo-10',
            name: 'Dark Side (Demo)',
            artist: 'Pink Floyd',
            album: 'Dark Side of the Moon',
            cover: 'http://p2.music.126.net/5sDLKpZW98XER9uuQrOHOw==/109951172026793754.jpg?param=300x300',
            url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-10.mp3',
            lyrics: `[00:00.000]All that you touch, all that you see
[00:05.000]All that you taste, all that you feel`
        },
        {
            id: 'demo-11',
            name: 'Echoes (Demo)',
            artist: 'Pink Floyd',
            album: 'Meddle',
            cover: 'http://p1.music.126.net/WaBh0-9dmRCQo3mdtrWY2Q==/109951172026873767.jpg?param=300x300',
            url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-11.mp3',
            lyrics: `[00:00.000]Overhead the albatross
[00:05.000]Hangs motionless upon the air`
        },
        {
            id: 'demo-12',
            name: 'Is This The Life (Demo)',
            artist: 'Roger Waters',
            album: 'Radio KAOS',
            cover: 'http://p2.music.126.net/5sDLKpZW98XER9uuQrOHOw==/109951172026793754.jpg?param=300x300',
            url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-12.mp3',
            lyrics: `[00:00.000]Is this the life we really want?
[00:05.000]Is this the world we really want?`
        }
    ]
};

// 使用方法：在浏览器控制台运行 useDemoAudio()
window.useDemoAudio = function() {
    console.log('🎵 正在切换到示例音频...');
    
    // 检查是否有 playlist 对象
    if (typeof window.player !== 'undefined' && window.player.playlist) {
        window.player.playlist = demoPlaylist;
        console.log('✅ 成功切换到示例音频！');
    } else {
        console.log('⚠️ 请在播放器加载后再运行此命令');
    }
    
    return demoPlaylist;
};

console.log('🎵 示例音频模块已加载');
console.log('👉 在播放器加载后，在控制台运行 useDemoAudio() 使用示例音频');
