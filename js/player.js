// 音乐播放器核心逻辑

// ============================================
// 日志控制模块
// ============================================
const Logger = {
    isDebug: false, // 设置为 true 启用调试日志，false 禁用
    debug(...args) {
        if (this.isDebug) {
            console.log('[DEBUG]', ...args);
        }
    },
    info(...args) {
        if (this.isDebug) {
            console.log('[INFO]', ...args);
        }
    },
    warn(...args) {
        if (this.isDebug) {
            console.warn('[WARN]', ...args);
        }
    },
    error(...args) {
        console.error('[ERROR]', ...args);
    }
};
// ============================================

// ============================================
// Service Worker 注册（PWA支持）
// ============================================
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('./service-worker.js')
            .then((registration) => {
                Logger.debug('ServiceWorker registration successful with scope: ', registration.scope);
            })
            .catch((err) => {
                Logger.debug('ServiceWorker registration failed: ', err);
            });
    });
}
// ============================================

// 全局变量
let audio;
let playBtn;
let playIcon;
let pauseIcon;
let leftGear;
let rightGear;
let progressBar;
let progressContainer;
let progressIndicator;
let currentTimeEl;
let totalTimeEl;
let recordBtn;
let tooltip;
let playModeBtn;
let volumeSlider;
let slideContainer;
let shareButtons;
let currentPage = 1; // 当前页面：1-播放界面，2-专辑封面，3-歌词纯享
let startX = 0;
let currentX = 0;
let isSliding = false;
let isPlaying = false;
let isRecording = false;
let currentLyrics = [];
let currentLyricIndex = -1;
// 将歌词变量暴露为全局变量，供横屏模式使用
window.currentLyrics = currentLyrics;
window.currentLyricIndex = currentLyricIndex;
let currentSongIndex = 0;
let currentSide = 'A'; // 当前磁带面
let currentTape = 0; // 当前磁带索引：0-默认磁带（Pink Floyd歌曲），1-本地歌曲磁带
let playMode = 'repeat'; // 播放模式：repeat(列表循环), repeat_one(单曲循环), zaxin(扎心循环)

// 磁带配置
const tapeConfigs = [
    {
        id: 'default',
        name: 'Pink Floyd',
        colors: {
            case: 'linear-gradient(145deg, #F7E9D7 0%, #EDE3D5 50%, #E3D8CB 100%)',
            label: '#D9776A',
            screw: '#c4b89a'
        },
        side: 'A'
    },
    {
        id: 'local',
        name: '本地歌曲',
        colors: {
            case: 'linear-gradient(145deg, #2d5a4a 0%, #1f4235 50%, #152d25 100%)',
            label: '#0d1a15',
            screw: '#2a4a3a'
        },
        side: 'A'
    },
    {
        id: 'indigo',
        name: '靛蓝回响',
        colors: {
            case: 'linear-gradient(145deg, #483D8B 0%, #3C3070 50%, #2A2050 100%)',
            label: '#D9776A',
            screw: '#363056'
        },
        side: 'A'
    }
];
let audioCache = {}; // 音频缓存
let audioCacheOrder = []; // 缓存访问顺序（用于 LRU）
let isLoading = false; // 加载状态
let volume = 0.7; // 默认音量
const MAX_AUDIO_CACHE_SIZE = 10; // 最大缓存歌曲数量

// 音频缓存管理器 - 防止缓存无限增长
const audioCacheManager = {
    // 添加缓存
    add(songId, audioElement) {
        // 如果缓存已满，删除最旧的缓存
        if (audioCacheOrder.length >= MAX_AUDIO_CACHE_SIZE) {
            const oldestId = audioCacheOrder.shift(); // 获取最旧的
            if (audioCache[oldestId]) {
                Logger.debug(`清理过期缓存: ${oldestId}`);
                delete audioCache[oldestId];
            }
        }
        
        // 添加到缓存
        audioCache[songId] = audioElement;
        audioCacheOrder.push(songId);
    },
    
    // 检查是否存在
    has(songId) {
        return !!audioCache[songId];
    },
    
    // 获取缓存
    get(songId) {
        return audioCache[songId];
    },
    
    // 删除缓存
    remove(songId) {
        if (audioCache[songId]) {
            delete audioCache[songId];
            const index = audioCacheOrder.indexOf(songId);
            if (index > -1) {
                audioCacheOrder.splice(index, 1);
            }
        }
    },
    
    // 清空所有缓存
    clear() {
        audioCache = {};
        audioCacheOrder = [];
    },
    
    // 获取缓存大小
    size() {
        return audioCacheOrder.length;
    }
};

// 机械音效
let mechanicalSound;

// 播放列表（全局变量，供其他模块使用）
window.playlist = {
    A: [
        {
            id: '4237525',
            name: 'Another Brick in the Wall, Pt. 2',
            artist: 'Pink Floyd',
            album: 'The Wall',
            cover: 'http://p1.music.126.net/5sDLKpZW98XER9uuQrOHOw==/109951172026793754.jpg?param=300x300',
            url: 'http://music.163.com/song/media/outer/url?id=4237525.mp3',
            lyrics: `[00:00.00] 作词 : Roger Waters
[00:01.00] 作曲 : Roger Waters
[00:02.09]We don't need no education.
[00:10.78]We don't need no thought control.
[00:17.59]No dark sarcasm in the classroom.
[00:28.59]Teacher, leave those kids alone.
[00:38.27]Hey, Teacher, leave those kids alone!
[00:48.59]All in all it's just another brick in the wall.
[00:54.96]All in all you're just another brick in the wall.
[01:05.09]We don't need no education.
[01:15.40]We don't need no thought control.
[01:24.02]No dark sarcasm in the classroom.
[01:32.02]Teachers, leave those kids alone.
[01:43.15]Hey, Teacher, leave us kids alone!
[01:52.90]All in all you're just another brick in the wall.
[02:02.34]All in all you're just another brick in the wall.`
        },
        {
            id: '18309310',
            name: 'Comfortably Numb',
            artist: 'Pink Floyd',
            album: 'The Wall',
            cover: 'http://p1.music.126.net/WaBh0-9dmRCQo3mdtrWY2Q==/109951172026873767.jpg?param=300x300',
            url: 'http://music.163.com/song/media/outer/url?id=18309310.mp3',
            lyrics: `[00:00.000] 作词 : David Gilmour/Roger Waters
[00:01.000] 作曲 : David Gilmour/Roger Waters
[00:42.847]Hello.
[00:44.667]Is there anybody in there?
[00:47.146]Just nod if you can hear me.
[00:52.305]Is there anyone home?
[00:56.460]Come on, now.
[00:58.585]I hear you're feeling down.
[01:04.198]Well I can ease your pain,
[01:06.926]Get you on your feet again.
[01:11.600]Relax.
[01:14.198]I need some information first.
[01:19.370]Just the basic facts:
[01:22.100]Can you show me where it hurts?
[01:27.500]There is no pain, you are receding.
[01:34.500]A distant ship's smoke on the horizon.
[01:42.390]You are only coming through in waves.
[01:49.114]Your lips move but I can't hear what you're sayin'.
[01:57.660]When I was a child I had a fever.
[02:04.459]My hands felt just like two balloons.
[02:12.358]Now I got that feeling once again.
[02:16.177]I can't explain, you would not understand.
[02:21.296]This is not how I am.
[02:27.585]I have become comfortably numb.
[03:08.960]I have become comfortably numb.
[03:20.197]Ok.[03:23.197]Just a little pinprick.
[03:26.516]There'll be no more --Aaaaaahhhhh!
[03:30.137]But you may feel a little sick.
[03:35.168]Can you stand up?
[03:38.997]I do believe it's working. Good.
[03:41.346]That'll keep you going for the show.
[03:46.396]Come on it's time to go.
[03:51.960]There is no pain, you are receding.
[03:59.546]A distant ship's smoke on the horizon.
[04:06.137]You are only coming through in waves.
[04:13.527]Your lips move but I can't hear what you're sayin'.
[04:20.397]When I was a child I caught a fleeting glimpse,
[04:28.397]Out of the corner of my eye.
[04:36.989]I turned to look but it was gone.
[04:40.489]I cannot put my finger on it now.
[04:45.998]The child is grown, the dream is gone.
[04:51.169]I have become comfortably numb.`
        },
        {
            id: '4235820',
            name: 'Time',
            artist: 'Pink Floyd',
            album: 'The Dark Side of the Moon',
            cover: 'http://p1.music.126.net/5sDLKpZW98XER9uuQrOHOw==/109951172026793754.jpg?param=300x300',
            url: 'http://music.163.com/song/media/outer/url?id=4235820.mp3',
            lyrics: `[00:00.00] 作词 : Roger Waters
[00:00.00] 作曲 : David Gilmour/Nick Mason/Roger Waters/Richard Wright
[00:00.00] Ticking away  the moments that make up a dull day
[01:49.65]You  fritter and waste the hours in an offhand way.
[01:59.46]Kicking around on a piece of ground in your home town
[02:06.69]Waiting for someone or something to show you the way.
[02:13.98]Tired of lying in the sunshine staying home to watch the rain.
[02:21.57]You are young and life is long  and there is time to kill today.
[02:29.61]And then one day you find  ten years have got behind you.
[02:36.69]No one told you when to run, you missed the starting gun.
[03:25.35]So you run  and you run to catch up with the sun but it's sinking
[04:18.27]Racing around  to come up behind you again.
[04:25.26]The sun is the same in a relative way but you're older,
[04:32.43]Shorter of breath  and one day closer to death.
[04:39.72]Every year is getting shorter  never seem to find the time.
[04:47.10]Plans that either come to naught  or half a page  of scribbled lines
[04:54.51]Hanging on in quiet  desperation is the English way
[05:01.89]The time is gone, the song is over,
[05:05.79]Thought I'd something more to say.
[05:34.14]I like to be here, but I can't.
[05:42.18]When I come home  already tired.
[05:49.26]Scroll to warm my body  beside the fire.`
        },
        {
            id: '4235802',
            name: 'Hey You',
            artist: 'Pink Floyd',
            album: 'The Wall',
            cover: 'http://p2.music.126.net/5sDLKpZW98XER9uuQrOHOw==/109951172026793754.jpg?param=300x300',
            url: 'http://music.163.com/song/media/outer/url?id=4235802.mp3',
            lyrics: `[00:00.00] 作词 : Roger Waters
[00:01.00] 作曲 : Roger Waters
[00:36.14]Hey you ! out there in the cold
[00:40.24]Getting lonely, getting old, can you feel me
[00:46.70]Hey you ! Standing in the aisles
[00:50.20]With itchy feet and fading smiles, can you feel me
[00:56.94]Hey you ! don't help them to bury the light
[01:08.10]Don't give in without a fight.
[01:21.06]Hey you ! out there on your own
[01:24.98]sitting naked by the phone would you touch me
[01:31.52]Hey you ! with your ear against the wall
[01:35.69]Waiting for someone to call out would you touch me
[01:42.50]Hey you ! would you help me to carry the stone
[01:53.67]Open your heart, I'm coming home
[02:58.20]But it was only a fantasy
[03:05.35]The wall was too high as you can see
[03:12.46]No matter how he tried he could not break free
[03:19.79]And the worms ate into his brain.
[03:55.98]Hey you ! out there on the road
[03:59.97]Always doing what you're told, can you help me
[04:06.47]Hey you ! out there beyond the wall
[04:10.31]Breaking bottles in the hall, can you help me
[04:18.16]Hey you ! don't tell me there's no hope at all
[04:28.31]Together we stand, divided we fall.`
        },
        {
            id: '33394057',
            name: 'Fearless',
            artist: 'Pink Floyd',
            album: 'Meddle',
            cover: 'http://p1.music.126.net/ZmVlJYtotvxFJ7CfhEZTeQ==/7840617418744160.jpg?param=300x300',
            url: 'http://music.163.com/song/media/outer/url?id=33394057.mp3',
            lyrics: `[00:00.00] 作词 : Pink Floyd
[00:01.00] 作曲 : Pink Floyd
[00:44.30]You say the hill's too steep to climb
[00:51.41]Climb it
[00:57.77]You say you'd like to see me try
[01:04.74]Climbing
[01:11.05]You pick the place and I'll choose the time
[01:16.71]And I'll climb
[01:19.43]That hill in my own way
[01:24.73]Just wait a while for the right day
[01:32.11]And as I rise above the tree lines and the clouds
[01:37.81]I look down hearing the sound of the things you've said today
[01:46.64]
[02:47.30]Fearlessly the idiot faced the crowd
[02:54.81]Smiling
[03:00.83]Merciless the magistrate turns around
[03:08.46]Frowning
[03:14.68]And who's the fool who wears the crown
[03:20.69]And go down
[03:23.39]In your own way
[03:28.80]And every day is the right day
[03:36.09]And as you rise above the fear-lines in his brow
[03:41.87]You look down hearing the sound of the faces in the crowd`
        },
        {
            id: '4235817',
            name: 'Wish You Were Here',
            artist: 'Pink Floyd',
            album: 'Wish You Were Here',
            cover: 'http://p1.music.126.net/5sDLKpZW98XER9uuQrOHOw==/109951172026793754.jpg?param=300x300',
            url: 'http://music.163.com/song/media/outer/url?id=4235817.mp3',
            lyrics: `[00:00.000] 作词 : Roger Waters
[00:01.000] 作曲 : David Gilmour/Roger Waters
[01:35.434]So, so you think you can tell
[01:41.933]Heaven from Hell
[01:45.694]Blue skies from pain
[01:50.182]Can you tell a green field from a cold steel rail?
[01:58.682]A smile from a veil?
[02:02.676]Do you think you can tell?
[02:07.179]And did they get you to trade
[02:10.934]Your heroes for ghosts?
[02:15.180]Hot ashes for trees?
[02:19.173]Hot air for a cool breeze?
[02:22.932]Cold comfort for change?
[02:27.184]And did you exchange
[02:30.427]A walk on part in the war
[02:34.186]For a lead role in a cage?
[03:16.690]How I wish, how I Wish You Were Here
[03:23.181]We're just two lost souls swimming in a fish bowl
[03:28.441]Year after year
[03:32.932]Running over the same old ground
[03:36.681]What have we found?
[03:38.932]The same old fears
[03:42.435]Wish You Were Here`
        },
        {
            id: '4238610',
            name: 'Chapter 24',
            artist: 'Pink Floyd',
            album: 'The Piper at the Gates of Dawn',
            cover: 'http://p1.music.126.net/RpwfPVhBM1Bc9HcJ4NnieA==/109951172027023882.jpg?param=300x300',
            url: 'http://music.163.com/song/media/outer/url?id=4238610.mp3',
            lyrics: `[00:00.00] 作词 : Syd Barrett
[00:00.95] 作曲 : Syd Barrett
[00:01.91]All movement is accomplished in six stages
[00:09.64]And the seventh brings return
[00:16.04]The seven is the number of the young light
[00:24.27]It forms when darkness is increased by one
[00:32.60]Change return success
[00:36.50]Going and coming without error
[00:40.62]Action brings good fortune
[00:44.61]Sunset
[00:52.52]The time is with the month of winter solstice
[00:59.94]When the change is due to come
[01:06.80]Thunder in the Earth the course of Heaven
[01:14.53]Things cannot be destroyed once and for all
[01:22.90]Change return success
[01:26.87]Going and coming without error
[01:30.77]Action brings good fortune
[01:34.89]Sunset
[01:38.95]Sunrise
[01:49.59]
[02:06.66]All movement is accomplished in six stages
[02:14.46]And the seventh brings return
[02:20.87]The seven is the number of the young light
[02:29.04]It forms when darkness is increased by one
[02:37.21]Change return success
[02:41.22]Going and coming without error
[02:45.36]Action brings good fortune
[02:49.14]Sunset
[02:53.29]Sunrise（sunrise）
[03:03.33]Sunrise（sunrise）
[03:13.30]Sunrise`
        },
        {
            id: '18309364',
            name: 'Pigs (Three Different Ones)',
            artist: 'Pink Floyd',
            album: 'Animals',
            cover: 'http://p1.music.126.net/s9fGgcK4Gz3-9h8dpvNSwA==/2536573325526444.jpg?param=300x300',
            url: 'http://music.163.com/song/media/outer/url?id=18309364.mp3',
            lyrics: `[00:00.000] 作词 : Roger Waters
[00:01.000] 作曲 : Roger Waters
[01:08.650]Big man pig man ha ha charade you are
[01:16.890]
[01:27.000]You well heeled big wheel ha ha charade you are
[01:42.240]And when your hand is on your heart
[01:50.050]You're nearly a good laugh
[01:53.620]Almost a joker
[01:56.520]With your head down in the pig bin
[01:59.970]Saying keep on digging
[02:04.860]Pig stain on your fat chin
[02:08.330]What do you hope to find
[02:12.690]When you're down in the pig mine
[02:15.950]You're nearly a laugh
[02:19.700]You're nearly a laugh
[02:21.550]But you're really a cry
[02:28.000]
[02:44.980]Bus stop rat bag ha ha charade you are
[02:52.260]
[03:02.560]You ****** up old hag ha ha charade you are
[03:17.930]You radiate cold shafts of broken glass
[03:26.200]You're nearly a good laugh
[03:29.640]Almost worth a quick grin
[03:33.140]You like the feel of steel
[03:36.750]You're hot stuff with a hat pin
[03:40.500]And good fun with a hand gun
[03:44.270]You're nearly a laugh
[03:48.000]You're nearly a laugh
[03:49.740]But you're really a cry
[03:55.820]
[08:08.750]Hey you Whitehouse ha ha charade you are
[08:16.360]
[08:26.600]You house proud town mouse ha ha charade you are
[08:41.730]You're trying to keep our feelings off the street
[08:49.530]You're nearly a real treat
[08:52.970]All tight lips and cold feet
[08:56.380]And do you feel abused
[09:02.990]You gotta stem the evil tide
[09:07.260]And keep it all on the inside
[09:10.430]Mary you're nearly a treat
[09:14.110]Mary you're nearly a treat
[09:16.380]But you're really a cry
[09:21.600]`
        },
        {
            id: '18309769',
            name: 'Brain Damage',
            artist: 'Pink Floyd',
            album: 'The Dark Side of the Moon',
            cover: 'http://p1.music.126.net/06AEb-q2iWrhS4zg_b51yA==/2537672837122343.jpg?param=300x300',
            url: 'http://music.163.com/song/media/outer/url?id=18309769.mp3',
            lyrics: `[00:00.00] 作词 : Roger Waters
[00:01.00] 作曲 : Roger Waters
[00:14.37]The lunatic is on the grass
[00:19.66]
[00:22.51]The lunatic is on the grass
[00:26.55]
[00:28.47]Remembering games and daisy chains and laughs
[00:35.71]
[00:36.58]Got to keep the loonies on the path
[00:42.66]
[00:44.40]The lunatic is in the hall
[00:48.64]
[00:49.76]The lunatics are in my hall
[00:55.64]
[00:57.43]The paper holds their folded faces to the floor
[01:05.52]
[01:05.93]And every day the paper boy brings more
[01:13.68]
[01:14.48]And if the dam breaks open many years too soon
[01:22.14]
[01:23.08]And if there is no room upon the hill
[01:26.93]
[01:27.49]And if your head explodes with dark forbodings too
[01:35.88]
[01:36.81]I'll see you on the dark side of the moon
[01:41.86]
[01:48.46]The lunatic is in my head
[01:54.12]
[01:54.68]The lunatic is in my head
[02:00.02]
[02:01.78]You raise the blade, you make the change
[02:09.72]
[02:10.23]You re-arrange me 'till I'm sane
[02:14.56]
[02:17.77]You lock the door
[02:21.16]
[02:21.69]And throw away the key
[02:22.54]
[02:23.61]There's someone in my head but it's not me.
[02:29.09]
[02:31.09]And if the cloud bursts, thunder in your ear
[02:40.25]
[02:40.55]You shout and no one seems to hear
[02:45.17]
[02:45.64]And if the band you're in starts playing different tunes
[02:54.38]
[02:54.90]I'll see you on the dark side of the moon`
        },
        {
            id: '4238606',
            name: 'The Gnome',
            artist: 'Pink Floyd',
            album: 'The Piper at the Gates of Dawn',
            cover: 'http://p1.music.126.net/RpwfPVhBM1Bc9HcJ4NnieA==/109951172027023882.jpg?param=300x300',
            url: 'http://music.163.com/song/media/outer/url?id=4238606.mp3',
            lyrics: `[00:00.00] 作词 : Syd Barrett
[00:01.00] 作曲 : Syd Barrett
[00:04.40]I want to tell you a story
[00:08.31]About a little man
[00:11.00]If I can A gnome named
[00:13.87]Grimble Grumble
[00:16.76]And little gnomes stay in their home
[00:21.06]Eating,Sleeping,
[00:25.17]Drinking their wine
[00:31.22]He wore a scarlet tunic,
[00:35.29]A blue green hood,
[00:37.40]It looked quite good
[00:39.54]He had a big adventure
[00:43.50]Admist the grass
[00:45.48]Fresh air at last
[00:47.66]Wining,Dining,biding his time
[00:57.76]And then one day-
[01:00.69]Hooray!Another way for gnomes to say hoooooray!
[01:14.51]Look at the sky, look at the river
[01:18.94]Isn't it good?
[01:22.83]Look at the sky, look at the river
[01:27.10]Isn't it good?
[01:31.14]Winding, Finding places to go
[01:41.27]And then one day-
[01:44.17]Hooray!Another way for gnomes to say hoooooooooooooray
[01:58.10]Hooooooooooooray!`
        }
    ],
    B: [
        {
            id: '33394060',
            name: 'Echoes',
            artist: 'Pink Floyd',
            album: 'Meddle',
            cover: 'http://p2.music.126.net/ZmVlJYtotvxFJ7CfhEZTeQ==/7840617418744160.jpg?param=300x300',
            url: 'http://music.163.com/song/media/outer/url?id=33394060.mp3',
            lyrics: `[02:57.72]Overhead the albatross
[03:01.20]Hangs motionless upon the air
[03:05.01]And deep beneath the rolling waves
[03:08.91]In labyrinths of coral caves
[03:12.99]The echo of a distant time
[03:16.63]Comes willowing across the sand
[03:20.22]And everything is green and submarine
[03:28.03]And no one showed us to the land
[03:31.70]And no one knows the where's or why's
[03:35.46]Something stirs and something tries
[03:38.96]And starts to climb toward the light
[03:45.17]
[04:11.77]Strangers passing in the street
[04:15.28]By chance two separate glances meet
[04:18.89]And I am you and what I see is me
[04:26.61]And do I take you by the hand
[04:30.85]And lead you through the land
[04:33.78]And help me understand the best I can
[04:41.28]And no one calls us to move on
[04:44.53]And no one forces down our eyes
[04:48.52]No one speaks and no one tries
[04:52.21]No one flies around the sun
[04:58.22]
[19:11.47]Cloudless everyday you fall
[19:14.94]Upon my waking eyes
[19:18.61]Inviting and inciting me
[19:22.30]To rise
[19:26.19]And through the window in the wall
[19:29.73]Come streaming in on sunlight wings
[19:33.51]A million bright ambassadors of morning
[19:40.74]And no one sings me lullabies
[19:44.70]And no one makes me close my eyes
[19:48.39]So I throw the windows wide
[19:52.02]And call to you across the sky`
        },
        {
            id: '4237914',
            name: 'Welcome to the Machine',
            artist: 'Pink Floyd',
            album: 'Wish You Were Here',
            cover: 'http://p1.music.126.net/YNiXGF64S5GPWQteqILYXQ==/109951172027020970.jpg?param=300x300',
            url: 'http://music.163.com/song/media/outer/url?id=4237914.mp3',
            lyrics: `[00:00.000] 作词 : Roger Waters
[00:01.000] 作曲 : Roger Waters
[01:03.769]Welcome my son, welcome to the machine.
[01:18.189]Where have you been?
[01:21.750]It's alright we know where you've been.
[01:32.189]You've been in the pipeline, filling in time,
[01:39.310]Provided with toys and 'Scouting for Boys'.
[01:46.628]You bought a guitar to punish your ma,
[01:53.820]And you didn't like school, and you
[01:57.800]know you're nobody's fool,
[02:05.700]So welcome to the machine.
[03:58.259]Welcome my son, welcome to the machine.
[04:09.388]
[04:14.289]What did you dream?
[04:16.156]It's alright we told you what to dream.
[04:27.399]You dreamed of a big star,
[04:33.779]He played a mean guitar,
[04:40.799]He always ate in the Steak Bar.
[04:47.717]He loved to drive in his Jaguar.
[04:49.779]
[04:54.990]So welcome to the Machine.`
        },
        {
            id: '3388954600',
            name: 'Money',
            artist: 'Pink Floyd',
            album: 'The Dark Side of the Moon',
            cover: 'http://p2.music.126.net/k0aNDKAo4Cj5y6aCdYqQQg==/109951173316977121.jpg?param=300x300',
            url: 'http://music.163.com/song/media/outer/url?id=3388954600.mp3',
            lyrics: `[00:00.000] 作曲 : Roger Waters
[00:40.380]Money, a get away
[00:46.444]Go get a good job with more pay and you're okay
[00:53.877]Money, it's a gas
[01:00.256]Grab that cash with both hands and make a stash
[01:07.698]A new car, caviar, four-star daydream
[01:11.901]Think I'll buy me a football team
[01:16.163]
[01:21.435]Money, we'll get back
[01:27.433]I'm all right, Jack, keep your hands off of my stack
[01:34.752]Money, it's a hit
[01:40.777]Don't give me that do-goody-good bullshit
[01:47.051]I'm in the hi-fidelity first class traveling set
[01:52.599]And I think I need a Lear jet
[01:56.364]
[05:10.940]Money, it's a crime
[05:16.971]Share it fairly, but don't take a slice of my pie
[05:23.998]Money, so they say
[05:29.735]Is the root of all evil today
[05:37.280]But if you ask for a rise, it's no surprise that they're giving none away
[05:45.311]Away, away, away, away, away, away, away`
        },
        {
            id: '4237911',
            name: 'Shine On You Crazy Diamond (Pts. 1-5)',
            artist: 'Pink Floyd',
            album: 'Wish You Were Here',
            cover: 'http://p1.music.126.net/YNiXGF64S5GPWQteqILYXQ==/109951172027020970.jpg?param=300x300',
            url: 'http://music.163.com/song/media/outer/url?id=4237911.mp3',
            lyrics: `[00:00.000] 作词 : David Gilmour/Roger Waters
[00:01.000] 作曲 : David Gilmour/Roger Waters/Richard Wright
[00:02.400](Instrumental Music)
[08:41.520]Remember when you were young,
[08:46.950]You shone like the sun.
[08:51.351]Shine on you crazy diamond.
[09:02.041]Now there's a look in your eyes,
[09:07.942]Like black holes in the sky.
[09:12.758]Shine on you crazy diamond.
[09:22.399]You were caught in the cross fire of childhood and stardom,
[09:28.250]Blown on the steel breeze.
[09:33.871]Come on you target for faraway laughter,
[09:39.008]Come on you stranger, you legend, you martyr, and shine!
[09:50.700]
[10:05.371]You reached for the secret too soon,
[10:11.849]You cried for the moon.
[10:15.770]Shine on you crazy diamond.
[10:26.200]Threatened by shadows at night,
[10:32.399]And exposed in the light.
[10:36.650]Shine on you crazy diamond.
[10:46.250]Well you wore out your welcome with random precision,
[10:52.140]Rode on the steel breeze.
[10:57.628]Come on you raver, you seer of visions,
[11:02.671]Come on you painter, you piper, you prisoner, and shine!`
        },
        {
            id: '4237927',
            name: 'Shine On You Crazy Diamond (Pts. 6-9)',
            artist: 'Pink Floyd',
            album: 'Wish You Were Here',
            cover: 'http://p1.music.126.net/YNiXGF64S5GPWQteqILYXQ==/109951172027020970.jpg?param=300x300',
            url: 'http://music.163.com/song/media/outer/url?id=4237927.mp3',
            lyrics: `[00:00.000] 作词 : Roger Waters
[00:01.000] 作曲 : David Gilmour/Roger Waters/Richard Wright
[04:59.697]Nobody knows where you are, how near or how far.
[05:09.896]Shine on you crazy diamond.
[05:20.276]Pile on many more layers and I'll be joining you there.
[05:30.476]Shine on you crazy diamond.
[05:40.226]And we'll bask in the shadow of yesterday's triumph,
[05:46.266]sail on the steel breeze.
[05:51.836]Come on you boy child, you winner and loser,
[05:56.608]come on you miner for truth and delusion, and shine`
        },
        {
            id: '4236412',
            name: 'The Great Gig In The Sky',
            artist: 'Pink Floyd',
            album: 'The Dark Side of the Moon',
            cover: 'http://p1.music.126.net/snMfT2THbbI0SRIoCwyeVQ==/109951165545616251.jpg?param=300x300',
            url: 'http://music.163.com/song/media/outer/url?id=4236412.mp3',
            lyrics: `[00:39.76]And I am not frightened of dying
[00:42.27]Any time will do, I don't mind
[00:47.42]Why should I be frightened of dying?
[00:50.30]There's no reason for it, you've gotta go sometime
[03:34.84]I never said I was afraid of dying`
        },
        {
            id: '3388954942',
            name: "Wot's...Uh the Deal",
            artist: 'Pink Floyd',
            album: 'Obscured by Clouds',
            cover: 'http://p1.music.126.net/k0aNDKAo4Cj5y6aCdYqQQg==/109951173316977121.jpg?param=300x300',
            url: 'http://music.163.com/song/media/outer/url?id=3388954942.mp3',
            lyrics: `[00:00.000] 作曲 : Roger Waters/David Gilmour
[00:22.143]Heaven sent the promised land,
[00:27.410]Looks alright from where I stand,
[00:32.950]'Cause I'm the man on the outside looking in,
[00:44.003]Waiting on the first step,
[00:49.536]Show me where the key is kept,
[00:55.077]Point me down the right line because it's time,
[01:05.387]To let me in from the cold,
[01:10.422]Turn my lead into gold,
[01:16.196]'Cause there's a chill wind blowing in my soul,
[01:21.267]And I think I'm growing old,
[01:28.325]Flash the readies,
[01:31.673]Wot's... uh the deal?
[01:34.182]Got to make it to the next meal,
[01:39.451]Try to keep up with the turnin' of the wheel,
[01:50.970]Mile after mile (Mile after mile),
[01:53.480]Stone after stone (Stone after stone),
[01:55.747]Turn to speak but you're alone
[02:01.321]Million miles from home, you're on your own,
[02:11.607]So let me in from the cold,
[02:16.127]Turn my lead into gold,
[02:21.643]'Cause there's a chill wind blowing in my soul,
[02:26.971]And I think I'm growing old,
[03:38.873]Fire bright by candlelight,
[03:43.638]And her by my side,
[03:49.160]And if she prefers we need never stir again,
[03:59.703]Someone sent the promised land,
[04:05.448]And I grabbed it with both hands,
[04:10.216]Now, I'm the man on the inside looking out,
[04:20.288]Hear me shout, "Come on in!"
[04:24.805]"What's the news and where ya been?",
[04:30.607]'Cause there's no wind left in my soul,
[04:34.900]And I've grown old.`
        },
        {
            id: '22509738',
            name: 'Here I Go',
            artist: 'Syd Barrett',
            album: 'The Best of Syd Barrett',
            cover: 'http://p1.music.126.net/EvBUaZh0P_KmNjQbLalgRg==/109951165975313432.jpg?param=300x300',
            url: 'http://music.163.com/song/media/outer/url?id=22509738.mp3',
            lyrics: `[00:00.00] 作词 : Syd Barrett
[00:00.38] 作曲 : Syd Barrett
[00:00.77]This is a story about a girl that I knew
[00:05.19]She didn't like my songs
[00:07.21]And that made me feel blue
[00:08.94]She said: "a big band is far better than you"...
[00:14.77]She don't rock and roll, she don't like it
[00:19.01]She don't do the stroll, well she don't do it right
[00:22.87]Well, everything's wrong and my patience was gone
[00:26.51]When I woke one morning
[00:28.59]And remembered this song
[00:30.20]Oh, kinda catchy, I hoped
[00:37.88]That she would talk to me now
[00:39.88]And even allow me to hold her hand
[00:43.99]And forget that old band.
[00:46.47]I strolled around to her pad
[00:54.03]Her light was off and that's bad
[01:01.83]Her sister said that my girl was gone
[01:09.41]"But come inside, boy, and play, play, play me a song!"
[01:16.12]I said"Yeah! Here I go"
[01:20.71]She's kinda cute; don't you know,
[01:23.65]That after a while of seeing her smile
[01:27.61]I knew we could make it, make it in style
[02:01.28]So now I've got all I need
[02:09.29]She and I are in love, we've agreed
[02:16.41]She likes this song and my others too
[02:24.39]So now you see my world is...
[02:30.90]Because of this tune!
[02:33.39]What a boon this tune!
[02:36.66]I tell you soon
[02:37.97]We'll be lying in bed, happily wed,
[02:41.95]And I won't think of that girl
[02:44.26]Or what she said...`
        },
        {
            id: '481535699',
            name: 'Wait For Her',
            artist: 'Roger Waters',
            album: 'Is This The Life We Really Want',
            cover: 'http://p1.music.126.net/INqjv0PelFHmm_CUYZCbyw==/109951165981533183.jpg?param=300x300',
            url: 'http://music.163.com/song/media/outer/url?id=481535699.mp3',
            lyrics: `[00:29.88]Will a glass inlaid with gemstones on a pool around the evening
[00:37.36]Among the perfumed roses wait for her
[00:44.86]With the patience of a pack horse loaded for the mountains
[00:52.24]Like a stoic noble prince wait for her
[00:59.11]With seven pillows laid out on the stair
[01:03.81]The scent of
[01:05.48]Incense fills the air
[01:09.43]Be calm and wait for her
[01:15.04]And do not flush the sparrows that are nesting in her braids
[01:22.34]All along the barricades wait for her
[01:31.85]And if she comes soon wait for her
[01:46.89]And if she comes late wait
[02:00.77]Let her be still as a summer afternoon
[02:07.56]A garden in full bloom
[02:14.34]Let her breathe in the air that is foreign to her heart
[02:23.21]Let her lips part wait for her
[02:30.20]Take her to the balcony see the moon soaked in milk
[02:37.30]Hear the rustle of her silk wait for her
[02:45.02]Don't let your eyes alight upon the twin doves of her breast
[02:53.12]Lest they take flight
[02:55.69]Wait for her
[03:02.01]And if she comes soon wait for her
[03:16.90]And if she comes late wait wait
[03:29.28]Serve her water before wine
[03:34.00]Do not touch her hand
[03:37.29]Let your fingertips rest at her command
[03:44.66]Speak softly as a flute would to a fearful violin
[03:52.18]Breathe out breathe in
[04:30.09]And as the echo fades from her final fusillade
[04:37.62]Remember the promises you made`
        },
        {
            id: '31738245',
            name: 'The Dark Side of the Moon',
            artist: 'Pink Floyd',
            album: 'The Dark Side of the Moon',
            cover: 'http://p1.music.126.net/QeEqfYkapGTGgdoM1MV7Nw==/109951172402348987.jpg?param=300x300',
            url: 'http://music.163.com/song/media/outer/url?id=31738245.mp3',
            lyrics: `[00:00.00] 作词 : Roger Waters
[00:00.00] 作曲 : Roger Waters/David Gilmour/Richard Wright/Nick Mason
[00:00.00]The Dark Side of the Moon
[00:27.00]
[00:30.00]Speak To Me
[00:33.00](Instrumental)
[01:08.00]
[01:11.00]Breathe
[01:14.00]
[02:26.70]Breathe，breathe in the air
[02:34.28]Don't be afraid to care
[02:41.76]Leave，but don't leave me
[02:48.00]Look around choose your own ground
[02:55.76]For long you live and high you fly
[02:59.57]And smiles you'll give and tears you'll cry
[03:03.25]And all you touch and all you see
[03:06.95]Is all your life will ever be
[03:11.15]Run rabbit run
[03:18.24]Dig that hole forget the sun
[03:25.80]And when at last the work is done
[03:32.34]Don't sit down it's time to dig another one
[03:40.10]For long you live and high you fly
[03:43.68]But only if you ride the tide
[03:47.44]And balanced on the biggest wave
[03:51.06]You race towards an early grave
[03:55.27]
[03:58.27]On The Run
[04:01.27](Instrumental)
[07:32.16]
[07:35.16]Time
[07:38.16]
[09:58.71]Ticking away the moments that make up a dull day
[10:06.03]You fritter and waste the hours in an off hand way
[10:13.31]Kicking around on a piece of ground in your home town
[10:20.54]Waiting for someone or something to show you the way
[10:27.95]Tired of lying in the sunshine staying home to watch the rain
[10:35.58]You are young and life is long and there is time to kill today
[10:43.07]And then one day you find ten years has got behind you
[10:51.01]No one told you when to run, you missed the starting gun
[10:59.13]
[12:24.79]And you run and you run to catch up with the sun, but it's sinking
[12:32.34]And racing around to come up behind you again
[12:39.54]The sun is the same in the relative way, but you're older
[12:46.39]And shorter of breath and one day closer to death
[12:53.58]Every year is getting shorter, never seem to find the time
[13:00.81]Plans that either come to naught or half a page of scribbled lines
[13:08.17]Hanging on in quiet desperation is the English way
[13:15.68]The time is gone the song is over, thought I'd something more to say
[13:24.65]
[13:40.21]Home, home again
[13:47.74]I like to be here when I can
[13:56.30]When I come home cold and tired
[14:03.27]It's good to warm my bones beside the fire
[14:11.07]Far away, across the field
[14:14.72]The tolling of the iron bell
[14:19.16]Calls the faithful to their knees
[14:22.94]To hear the softly spoken magic spell
[14:30.19]
[14:33.19]The Great Gig In The Sky
[14:36.19](Instrumental)
[19:18.06]
[19:22.06]Money
[19:25.06]
[20:02.94]Money, get away
[20:09.59]Get a good job with more pay and your OK
[20:16.96]Money, it's a gas
[20:23.17]Grab that cash with both hands and make a stash
[20:30.37]New car caviar four star daydream
[20:34.90]Think I'll buy me a football team
[20:42.69]Money, get back
[20:50.50]I'm all right Jack keep your hands off my stack
[20:57.39]Money, it's a hit
[21:03.69]Don't give me that do goody good bullshit
[21:09.64]I'm in the hi-fidelity first class traveling set
[21:15.41]And I think I need a Lear jet
[21:20.17]
[24:33.80]Money, it's a crime
[24:39.66]Share it fairly but don't take a slice of my pie
[24:46.61]Money, so they say
[24:52.52]Is the root of all evil today
[24:59.75]But if you ask for a rise it's no surprise that they're giving none away
[25:17.30]
[25:56.01]Us and Them
[25:59.01]
[27:27.58]Us and Them
[27:41.40]And after all we're only ordinary men
[28:01.26]Me and you
[28:15.37]God only knows its not what we would choose to do
[28:35.00]Forward he cried from the rear and the front rank died
[28:47.56]And the General sat and the lines on the map moved from side to side
[29:00.80]Black and Blue
[29:14.60]And who knows which is which and who is who
[29:34.22]Up and Down
[29:47.90]And in the end its only round and round and round
[30:06.84]Havent you heard its a battle of words the poster bearer cried
[30:19.65]Listen son, said the man with the gun theres room for you inside
[30:32.75]
[32:03.49]Down and Out
[32:17.27]It cant be helped but theres a lot of it about
[32:37.12]With, without
[32:51.08]And who'll deny, it's what the fightings' all about
[33:09.45]Get out of the way, its a busy day and I've got things on my mind
[33:22.04]For want of the price of tea and a slice the old man died
[33:33.15]
[33:35.15]Any Colour You Like
[33:38.15](Instrumental)
[36:57.93]
[37:00.93]Brain Damage
[37:03.93]
[37:15.11]The lunatic is on the grass
[37:23.07]The lunatic is on the grass
[37:30.32]Remembering games and daisy chains and laughs
[37:37.08]Got to keep the loonies on the path
[37:44.71]The lunatic is in the hall
[37:51.62]The lunatics are in my hall
[37:59.02]The paper holds their folded faces to the floor
[38:06.13]And every day the paper boy brings more
[38:16.55]And if the dam breaks open many years too soon
[38:23.25]And if there is no room upon the hill
[38:30.71]And if your head explodes with dark forebodings too
[38:37.61]I'll see you on the dark side of the moon
[38:48.71]The lunatic is in my head
[38:56.01]The lunatic is in my head
[39:03.07]You raise the blade, you make the change
[39:10.54]You re-arrange me 'till I'm sane
[39:17.60]You lock the door
[39:20.56]And throw away the key
[39:24.36]There's someone in my head but it's not me.
[39:35.18]And if the cloud bursts, thunder in your ear
[39:42.53]You shout and no one seems to hear
[39:49.06]And if the band you're in starts playing different tunes
[39:56.34]I'll see you on the dark side of the moon
[40:02.49]
[40:50.75]Eclipse
[40:53.75]
[41:01.72]All that you touch
[41:04.10]All that you see
[41:06.96]All that you taste
[41:09.43]All you feel
[41:12.56]All that you love
[41:14.85]All that you hate
[41:17.58]All you distrust
[41:20.41]All you save
[41:22.88]All that you give
[41:25.22]All that you deal
[41:28.06]All that you buy
[41:30.42]Beg, borrow or steal
[41:33.33]All you create
[41:35.58]All you destroy
[41:38.54]All that you do
[41:40.95]All that you say
[41:43.86]All that you eat
[41:46.43]Everyone you meet
[41:48.89]All that you slight
[41:51.60]everyone you fight
[41:54.21]All that is now
[41:56.53]All that is gone
[41:59.16]All that's to come
[42:01.61]And everything under the sun is in tune
[42:06.81]But the sun is eclipsed by the moon.`
        }
    ]
};

// 初始化
function initPlayer() {
    try {
        // 获取元素
        audio = document.getElementById('audioPlayer');
        playBtn = document.getElementById('playBtn');
        playIcon = document.getElementById('playIcon');
        pauseIcon = document.getElementById('pauseIcon');
        leftGear = document.getElementById('leftGear');
        rightGear = document.getElementById('rightGear');
        progressBar = document.getElementById('progressBar');
        progressContainer = document.querySelector('.progress-container');
        progressIndicator = document.getElementById('progressIndicator');
        currentTimeEl = document.getElementById('currentTime');
        totalTimeEl = document.getElementById('totalTime');
        recordBtn = document.getElementById('recordBtn');
        tooltip = document.getElementById('tooltip');
        playModeBtn = document.getElementById('playModeBtn');
        volumeSlider = document.getElementById('volumeSlider');
        slideContainer = document.getElementById('slideContainer');
        shareButtons = document.querySelector('.share-buttons');

        // 设置初始音量
        setVolume(volume);

        // 绑定事件监听器
        bindEventListeners();

        // 初始化播放模式按钮
        updatePlayModeIcon();
        
        // 初始化磁带计数器
        updateTapeCounter();

        // 初始化进度指示器
        if (progressIndicator) {
            progressIndicator.style.left = '0%';
            progressIndicator.style.display = 'block';
        }

        // 显示提示
        showTooltip('按空格键播放/暂停');
        
        // 延迟初始化非关键功能，提高页面加载速度
        setTimeout(() => {
            // 初始化机械音效
            mechanicalSound = new Audio();
            
            // 不自动播放，等待用户选择歌曲
            // playSong(0) 已移除，改为手动触发
        }, 300);
    } catch (error) {
        Logger.error('初始化播放器失败:', error);
        showTooltip('播放器初始化失败，请刷新页面重试');
    }
}

// 全局变量
let isDragging = false;

// 绑定事件监听器
function bindEventListeners() {
    // 音频事件
    audio.addEventListener('timeupdate', updateProgress);
    audio.addEventListener('loadedmetadata', updateTotalTime);
    audio.addEventListener('ended', handlePlaybackEnded);
    audio.addEventListener('error', handleAudioError);

    // 进度条事件
    if (progressContainer) {
        progressContainer.addEventListener('click', handleProgressClick);
        
        // 进度条拖动事件
        progressContainer.addEventListener('mousedown', handleProgressDragStart);
        progressContainer.addEventListener('touchstart', handleProgressDragStart);
    }

    // 滑动事件
    if (slideContainer) {
        slideContainer.addEventListener('touchstart', handleTouchStart);
        slideContainer.addEventListener('touchmove', handleTouchMove);
        slideContainer.addEventListener('touchend', handleTouchEnd);
        // 鼠标事件（用于PC端测试）
        slideContainer.addEventListener('mousedown', handleTouchStart);
        slideContainer.addEventListener('mousemove', handleTouchMove);
        slideContainer.addEventListener('mouseup', handleTouchEnd);
        slideContainer.addEventListener('mouseleave', handleTouchEnd);
    }
    
    // 磁带盒点击翻面事件 - 已在HTML中通过onclick绑定，此处不再重复绑定

    // 全局鼠标/触摸移动事件
    document.addEventListener('mousemove', handleDragMove);
    document.addEventListener('touchmove', handleDragMove);
    document.addEventListener('mouseup', handleDragEnd);
    document.addEventListener('touchend', handleDragEnd);

    // 键盘快捷键
    document.addEventListener('keydown', handleKeyboardShortcuts);

    // 背景设置事件已在bindBackgroundSettingsEvents函数中绑定
    // 这里不再重复绑定
    
    // 点击外部关闭分享选项面板
    document.addEventListener('click', function(e) {
        const shareButtons = document.querySelector('.share-buttons');
        const shareOptions = document.getElementById('shareOptions');
        
        if (shareOptions && shareOptions.style.display === 'flex' && !shareButtons.contains(e.target)) {
            shareOptions.style.display = 'none';
        }
    });
}

// 统一同步播放状态到所有UI组件
function syncPlayState(playing) {
    isPlaying = playing;
    
    // 同步主播放器图标 (通过ID获取的img元素)
    if (playIcon) playIcon.style.display = playing ? 'none' : 'block';
    if (pauseIcon) pauseIcon.style.display = playing ? 'block' : 'none';
    
    // 同步底部悬浮播放器图标
    const miniPlayIcon = document.getElementById('mini-play-icon');
    const miniPauseIcon = document.getElementById('mini-pause-icon');
    if (miniPlayIcon) miniPlayIcon.style.display = playing ? 'none' : 'block';
    if (miniPauseIcon) miniPauseIcon.style.display = playing ? 'block' : 'none';
    
    // 同步横屏模式播放图标
    const landscapePlayIcon = document.getElementById('landscapePlayIcon');
    const landscapePauseIcon = document.getElementById('landscapePauseIcon');
    if (landscapePlayIcon) landscapePlayIcon.style.display = playing ? 'none' : 'block';
    if (landscapePauseIcon) landscapePauseIcon.style.display = playing ? 'block' : 'none';
    
    // 同步磁带齿轮动画
    if (playing) {
        if (leftGear) leftGear.classList.add('spinning');
        if (rightGear) rightGear.classList.add('spinning');
    } else {
        if (leftGear) leftGear.classList.remove('spinning');
        if (rightGear) rightGear.classList.remove('spinning');
    }
    
    // 同步PlayerStore状态
    if (typeof PlayerStore !== 'undefined') {
        PlayerStore.setState({ isPlaying: playing });
    }
    
    console.log('[状态同步] 播放状态:', playing ? '播放中' : '已暂停');
}

// 格式化时间
function formatTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
}

// 显示提示
function showTooltip(message) {
    if (tooltip) {
        tooltip.textContent = message;
        tooltip.classList.add('show');
        setTimeout(() => {
            tooltip.classList.remove('show');
        }, 2000);
    }
}

// 播放/暂停
function togglePlay() {
    try {
        if (isPlaying) {
            audio.pause();
            syncPlayState(false);
        } else {
            audio.play().then(() => {
                syncPlayState(true);
            }).catch(err => {
                Logger.error('播放失败:', err);
                showTooltip('音频加载失败，请检查网络连接');
            });
        }
    } catch (error) {
        Logger.error('播放/暂停操作失败:', error);
        showTooltip('操作失败，请重试');
    }
}



// 录音
function toggleRecord() {
    try {
        isRecording = !isRecording;
        if (isRecording) {
            recordBtn.classList.add('recording');
            showTooltip('开始录音...');
        } else {
            recordBtn.classList.remove('recording');
            showTooltip('录音已保存');
        }
    } catch (error) {
        console.error('录音操作失败:', error);
        showTooltip('操作失败，请重试');
    }
}

// 更新进度条
function updateProgress() {
    try {
        if (audio.duration) {
            const progress = (audio.currentTime / audio.duration) * 100;
            progressBar.style.width = progress + '%';
            currentTimeEl.textContent = formatTime(audio.currentTime);
            
            // 更新进度指示器位置
            if (progressIndicator) {
                // 确保指示器在进度条范围内
                const clampedProgress = Math.max(0, Math.min(100, progress));
                progressIndicator.style.left = clampedProgress + '%';
                // 确保指示器可见
                progressIndicator.style.display = 'block';
            }
            
            // 更新底部悬浮播放栏的进度环
            const miniProgressBar = document.getElementById('mini-progress-bar');
            if (miniProgressBar) {
                // 圆的周长 = 2 * π * r = 2 * 3.14159 * 20 ≈ 125.6
                const circumference = 125.6;
                const offset = circumference - (progress / 100) * circumference;
                miniProgressBar.style.strokeDashoffset = offset;
            }
            
            // 同步显示歌词
            showLyrics();
            // 更新完整歌词列表
            updateFullLyrics();
            
            // 保存播放状态（每5秒保存一次）
            savePlaybackState();
        }
    } catch (error) {
        console.error('更新进度条失败:', error);
    }
}

// 更新总时间
function updateTotalTime() {
    try {
        totalTimeEl.textContent = formatTime(audio.duration);
    } catch (error) {
        console.error('更新总时间失败:', error);
    }
}

// 处理进度条点击事件
function handleProgressClick(e) {
    try {
        if (audio.duration) {
            const rect = progressContainer.getBoundingClientRect();
            const clickX = e.clientX - rect.left;
            const progressPercentage = clickX / rect.width;
            const newTime = progressPercentage * audio.duration;
            
            audio.currentTime = newTime;
            updateProgress();
            showTooltip(`跳转到 ${formatTime(newTime)}`);
        }
    } catch (error) {
        console.error('处理进度条点击失败:', error);
        showTooltip('操作失败，请重试');
    }
}

// 处理进度条拖动开始
function handleProgressDragStart(e) {
    e.preventDefault();
    isDragging = true;
    
    // 显示变粗效果
    showBarsThicker();
    
    // 立即处理一次拖动，以响应点击位置
    handleDragMove(e);
}

// 处理拖动过程
function handleDragMove(e) {
    if (!isDragging || !progressContainer || !audio.duration) return;
    
    e.preventDefault();
    
    const rect = progressContainer.getBoundingClientRect();
    const clientX = e.type === 'touchmove' ? e.touches[0].clientX : e.clientX;
    const clickX = clientX - rect.left;
    const progressPercentage = Math.max(0, Math.min(1, clickX / rect.width));
    const newTime = progressPercentage * audio.duration;
    
    // 设置音频时间
    audio.currentTime = newTime;
    
    // 更新进度条
    const progress = progressPercentage * 100;
    progressBar.style.width = progress + '%';
    currentTimeEl.textContent = formatTime(audio.currentTime);
    
    // 更新进度指示器位置
    if (progressIndicator) {
        progressIndicator.style.left = progress + '%';
        progressIndicator.style.display = 'block';
    }
    
    // 同步显示歌词
    showLyrics();
}

// 处理拖动结束
function handleDragEnd() {
    if (isDragging) {
        isDragging = false;
        
        // 恢复正常粗细
        showBarsNormal();
        
        // 显示最终位置提示
        if (audio.duration) {
            showTooltip(`跳转到 ${formatTime(audio.currentTime)}`);
        }
    }
}

// 显示变粗效果
function showBarsThicker() {
    // 进度条变粗
    if (progressContainer) {
        progressContainer.style.height = '4px';
        progressContainer.style.borderRadius = '2px';
    }
    
    if (progressBar) {
        progressBar.style.borderRadius = '2px';
    }
    
    // 音量条变粗
    const volumeContainer = document.querySelector('.volume-container');
    const volumeBar = document.getElementById('volumeBar');
    if (volumeContainer) {
        volumeContainer.style.height = '4px';
        volumeContainer.style.borderRadius = '2px';
    }
    if (volumeBar) {
        volumeBar.style.borderRadius = '2px';
    }
    
    // 速度条变粗
    const speedContainer = document.querySelector('.speed-container');
    const speedBar = document.getElementById('speedBar');
    if (speedContainer) {
        speedContainer.style.height = '4px';
        speedContainer.style.borderRadius = '2px';
    }
    if (speedBar) {
        speedBar.style.borderRadius = '2px';
    }
}

// 显示正常粗细
function showBarsNormal() {
    // 进度条恢复正常
    if (progressContainer) {
        progressContainer.style.height = '2px';
        progressContainer.style.borderRadius = '1px';
    }
    
    if (progressBar) {
        progressBar.style.borderRadius = '1px';
    }
    
    // 音量条恢复正常
    const volumeContainer = document.querySelector('.volume-container');
    const volumeBar = document.getElementById('volumeBar');
    if (volumeContainer) {
        volumeContainer.style.height = '2px';
        volumeContainer.style.borderRadius = '1px';
    }
    if (volumeBar) {
        volumeBar.style.borderRadius = '1px';
    }
    
    // 速度条恢复正常
    const speedContainer = document.querySelector('.speed-container');
    const speedBar = document.getElementById('speedBar');
    if (speedContainer) {
        speedContainer.style.height = '2px';
        speedContainer.style.borderRadius = '1px';
    }
    if (speedBar) {
        speedBar.style.borderRadius = '1px';
    }
}

// 播放状态保存相关变量
let lastSaveTime = 0;
const SAVE_INTERVAL = 5000; // 5秒保存一次

// 保存播放状态
function savePlaybackState() {
    try {
        const now = Date.now();
        if (now - lastSaveTime < SAVE_INTERVAL) return;
        
        lastSaveTime = now;
        
        // 使用 PlayerStore 获取当前歌曲，兼容旧代码
        let currentSong = null;
        if (typeof PlayerStore !== 'undefined' && PlayerStore.state && PlayerStore.state.currentSong) {
            currentSong = PlayerStore.state.currentSong;
        }
        
        if (currentSong && audio && audio.duration) {
            const state = {
                songId: currentSong.id,
                songName: currentSong.name || currentSong.title,
                artist: currentSong.artist,
                currentTime: audio.currentTime,
                duration: audio.duration,
                savedAt: now
            };
            localStorage.setItem('playbackState', JSON.stringify(state));
        }
    } catch (error) {
        console.error('保存播放状态失败:', error);
    }
}

// 加载播放状态
function loadPlaybackState() {
    try {
        const stored = localStorage.getItem('playbackState');
        if (stored) {
            const state = JSON.parse(stored);
            
            // 检查是否过期（超过7天）
            if (Date.now() - state.savedAt < 7 * 24 * 60 * 60 * 1000) {
                return state;
            }
        }
    } catch (error) {
        console.error('读取播放状态失败:', error);
    }
    return null;
}

// 恢复播放状态
function resumePlayback() {
    const state = loadPlaybackState();
    if (state) {
        // 查找对应的歌曲
        let foundSong = null;
        let foundIndex = -1;
        
        // 搜索所有播放列表
        for (const key of Object.keys(playlist)) {
            const list = playlist[key];
            if (Array.isArray(list)) {
                const index = list.findIndex(s => s.id === state.songId);
                if (index !== -1) {
                    foundSong = list[index];
                    foundIndex = index;
                    break;
                }
            }
        }
        
        if (foundSong) {
            // 切换到对应的播放列表
            currentSide = foundSong.side || 'A';
            
            // 播放歌曲
            playSong(foundIndex);
            
            // 等待音频加载后跳转到保存的位置
            setTimeout(() => {
                if (audio && !isNaN(state.currentTime)) {
                    audio.currentTime = state.currentTime;
                    UIManager.showToast(`已恢复播放: ${state.songName}`, 'info');
                }
            }, 500);
        }
    }
}

// 播放结束处理
function handlePlaybackEnded() {
    try {
        // 自动播放下一首
        playNext();
    } catch (error) {
        Logger.error('处理播放结束失败:', error);
    }
}

// 音频错误处理
function handleAudioError() {
    Logger.debug('音频错误:', audio.error);
    showTooltip('音频加载失败，请检查网络连接');
}

// 键盘快捷键处理
function handleKeyboardShortcuts(e) {
    try {
        // 如果焦点在输入框中，不处理快捷键
        const activeElement = document.activeElement;
        if (activeElement && (activeElement.tagName === 'INPUT' || activeElement.tagName === 'TEXTAREA')) {
            return;
        }
        
        if (e.code === 'Space') {
            e.preventDefault();
            togglePlay();
        } else if (e.code === 'ArrowUp') {
            e.preventDefault();
            playPrevious();
        } else if (e.code === 'ArrowDown') {
            e.preventDefault();
            playNext();
        }
    } catch (error) {
        console.error('处理键盘快捷键失败:', error);
    }
}

// 分享功能
function shareTo(platform) {
    try {
        const url = encodeURIComponent(window.location.href);
        const title = encodeURIComponent('复古磁带播放器 - Pink Floyd');
        const desc = encodeURIComponent('正在听 Pink Floyd 的《月之暗面》，这个复古磁带播放器太酷了！');
        
        let shareUrl = '';
        
        switch (platform) {
            case 'weibo':
                shareUrl = `https://service.weibo.com/share/share.php?url=${url}&title=${desc}`;
                break;
            case 'wechat':
                // 微信分享需要特殊处理，这里打开微信分享页面
                showTooltip('请在微信中打开链接进行分享');
                return;
            case 'qq':
                shareUrl = `https://connect.qq.com/widget/shareqq/index.html?url=${url}&title=${title}&desc=${desc}`;
                break;
            case 'facebook':
                shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}&quote=${desc}`;
                break;
            case 'instagram':
                // Instagram分享需要特殊处理，这里提示用户
                showTooltip('请截图分享到Instagram');
                return;
            default:
                return;
        }
        
        if (shareUrl) {
            window.open(shareUrl, '_blank', 'width=600,height=400');
        }
    } catch (error) {
        console.error('分享失败:', error);
        showTooltip('分享失败，请重试');
    }
}

// 播放上一首
function playPrevious() {
    try {
        console.log('🔄 上一首按钮被点击');
        const currentPlaylist = getCurrentTapePlaylist();
        console.log('当前播放列表长度:', currentPlaylist.length);
        if (currentPlaylist.length === 0) {
            showTooltip('播放列表为空');
            return;
        }
        currentSongIndex = (currentSongIndex - 1 + currentPlaylist.length) % currentPlaylist.length;
        console.log('切换到索引:', currentSongIndex);
        playSong(currentSongIndex);
    } catch (error) {
        console.error('播放上一首失败:', error);
        showTooltip('操作失败，请重试');
    }
}

// 播放下一首
function playNext() {
    try {
        console.log('🔄 下一首按钮被点击');
        const currentPlaylist = getCurrentTapePlaylist();
        console.log('当前播放列表长度:', currentPlaylist.length);
        if (currentPlaylist.length === 0) {
            showTooltip('播放列表为空');
            return;
        }
        
        switch (playMode) {
            case 'repeat_one':
                // 单曲循环，重新播放当前歌曲
                playSong(currentSongIndex);
                break;
            case 'zaxin':
                // 扎心循环，随机选择一首歌曲
                let randomIndex;
                do {
                    randomIndex = Math.floor(Math.random() * currentPlaylist.length);
                } while (randomIndex === currentSongIndex && currentPlaylist.length > 1);
                currentSongIndex = randomIndex;
                playSong(currentSongIndex);
                break;
            case 'repeat':
            default:
                // 列表循环
                currentSongIndex = (currentSongIndex + 1) % currentPlaylist.length;
                playSong(currentSongIndex);
                break;
        }
    } catch (error) {
        console.error('播放下一首失败:', error);
        showTooltip('操作失败，请重试');
    }
}

// 分享当前歌曲
function shareCurrentSong() {
    try {
        const currentPlaylist = playlist[currentSide];
        const song = currentPlaylist[currentSongIndex];
        
        if (!song) {
            showTooltip('暂无歌曲可分享');
            return;
        }
        
        const shareText = `正在播放: ${song.title} - ${song.artist}`;
        
        // 尝试使用 Web Share API
        if (navigator.share) {
            navigator.share({
                title: song.title,
                text: shareText,
                url: song.url
            }).catch(err => {
                console.log('分享取消或失败:', err);
                fallbackShare(shareText);
            });
        } else {
            fallbackShare(shareText);
        }
    } catch (error) {
        console.error('分享失败:', error);
        showTooltip('分享失败');
    }
}

// 备用分享方法
function fallbackShare(text) {
    // 复制到剪贴板
    if (navigator.clipboard) {
        navigator.clipboard.writeText(text).then(() => {
            showTooltip('已复制分享内容');
        }).catch(() => {
            showTooltip('复制失败，请手动复制');
        });
    } else {
        // 使用现代的clipboard API
        navigator.clipboard.writeText(text).then(() => {
            showTooltip('已复制分享内容');
        }).catch(() => {
            showTooltip('复制失败，请手动复制');
        });
    }
}

// 切换播放模式
function togglePlayMode() {
    try {
        const modes = ['repeat', 'repeat_one', 'zaxin'];
        const currentIndex = modes.indexOf(playMode);
        const nextIndex = (currentIndex + 1) % modes.length;
        playMode = modes[nextIndex];
        
        updatePlayModeIcon();
        
        let modeText = '';
        switch (playMode) {
            case 'repeat':
                modeText = '列表循环';
                break;
            case 'repeat_one':
                modeText = '单曲循环';
                break;
            case 'zaxin':
                modeText = '扎心循环';
                break;
        }
        
        showTooltip(`播放模式: ${modeText}`);
    } catch (error) {
        console.error('切换播放模式失败:', error);
        showTooltip('操作失败，请重试');
    }
}

// 横屏模式切换循环模式
function toggleLoopMode() {
    togglePlayMode();
}

// 横屏模式切换播放暂停
function togglePlayPause() {
    togglePlay();
}

// 更新播放模式图标
function updatePlayModeIcon() {
    try {
        const iconBasePath = 'assets/images/icons/';
        let iconFile = '';
        let modeTitle = '';
        
        switch (playMode) {
            case 'repeat':
                iconFile = 'List_loop.png';
                modeTitle = '播放模式: 列表循环';
                break;
            case 'repeat_one':
                iconFile = 'Single_loop.png';
                modeTitle = '播放模式: 单曲循环';
                break;
            case 'zaxin':
                iconFile = 'Heartbreaking_loop.png';
                modeTitle = '播放模式: 扎心循环';
                break;
        }
        
        const iconUrl = iconBasePath + iconFile;
        
        // 更新主播放器的循环模式图标
        if (playModeBtn) {
            const iconImg = playModeBtn.querySelector('img');
            if (iconImg) {
                iconImg.src = iconUrl;
                iconImg.alt = modeTitle.replace('播放模式: ', '');
            }
            playModeBtn.title = modeTitle.replace('播放模式: ', '');
        }
        
        // 更新主播放器的playModeIcon元素（带ID的img）
        const playModeIconEl = document.getElementById('playModeIcon');
        if (playModeIconEl) {
            playModeIconEl.src = iconUrl;
            playModeIconEl.alt = modeTitle.replace('播放模式: ', '');
        }
        
        // 更新横屏模式的循环模式图标
        const landscapeLoopIcon = document.getElementById('landscapeLoopIcon');
        if (landscapeLoopIcon) {
            landscapeLoopIcon.src = iconUrl;
            landscapeLoopIcon.alt = modeTitle.replace('播放模式: ', '');
        }
        
        const landscapeLoopBtn = document.getElementById('landscapeLoopBtn');
        if (landscapeLoopBtn) {
            landscapeLoopBtn.title = modeTitle.replace('播放模式: ', '');
        }
    } catch (error) {
        console.error('更新播放模式图标失败:', error);
    }
}

// 设置音量
function setVolume(newVolume) {
    try {
        volume = Math.max(0, Math.min(1, newVolume));
        audio.volume = volume;
        
        if (volumeSlider) {
            volumeSlider.value = volume * 100;
        }
        
        // 更新音量UI
        updateVolumeUI(volume * 100);
        
        showTooltip(`音量: ${Math.round(volume * 100)}%`);
    } catch (error) {
        console.error('设置音量失败:', error);
    }
}

// 更新音量
function updateVolume(value) {
    try {
        const newVolume = value / 100;
        setVolume(newVolume);
    } catch (error) {
        console.error('更新音量失败:', error);
    }
}

// 更新音量条和指示器
function updateVolumeUI(value) {
    try {
        const volumeBar = document.getElementById('volumeBar');
        const volumeIndicator = document.getElementById('volumeIndicator');
        if (volumeBar && volumeIndicator) {
            volumeBar.style.width = value + '%';
            volumeIndicator.style.left = value + '%';
        }
    } catch (error) {
        console.error('更新音量UI失败:', error);
    }
}

// 播放速度等级定义
const SPEED_LEVELS = [
    { value: 0.5, label: '×0.5' },
    { value: 0.75, label: '×0.75' },
    { value: 1.0, label: '×1.0' },
    { value: 1.25, label: '×1.25' },
    { value: 1.35, label: '×1.35' },
    { value: 1.5, label: '×1.5' },
    { value: 1.65, label: '×1.65' },
    { value: 1.8, label: '×1.8' },
    { value: 2.0, label: '×2.0' }
];

// 当前播放速度
let currentSpeed = 1.0;

// 更新播放速度
function updateSpeed(value) {
    try {
        // 更新速度指示器位置
        const speedIndicator = document.getElementById('speedIndicator');
        if (speedIndicator) {
            speedIndicator.style.left = value + '%';
        }
        
        // 根据滑块位置确定播放速度
        // 将0-100%的范围映射到9个速度等级
        const speedIndex = Math.round((value / 100) * (SPEED_LEVELS.length - 1));
        const newSpeed = SPEED_LEVELS[speedIndex].value;
        const speedLabel = SPEED_LEVELS[speedIndex].label;
        
        // 如果速度发生变化，应用新速度
        if (newSpeed !== currentSpeed) {
            currentSpeed = newSpeed;
            applySpeed(newSpeed, speedLabel);
        }
    } catch (error) {
        console.error('更新播放速度失败:', error);
    }
}

// 应用播放速度
function applySpeed(speed, label) {
    try {
        // 设置音频的播放速度
        if (audio) {
            audio.playbackRate = speed;
            showTooltip(`播放速度: ${label}`);
        }
    } catch (error) {
        console.error('应用播放速度失败:', error);
        showTooltip('应用播放速度失败');
    }
}

// 解析歌词
function parseLyrics(lyricsText) {
    try {
        const lyrics = [];
        const lines = lyricsText.split('\n');
        // 支持多种时间格式：[mm:ss.xx] 和 [mm:ss.xxx]
        const timeRegex = /\[(\d{2}):(\d{2})\.(\d{2,3})\]/g;
        
        lines.forEach(line => {
            const timeMatches = [...line.matchAll(timeRegex)];
            const text = line.replace(timeRegex, '').trim();
            
            // 过滤掉无关行（作词、作曲等）
            if (text && !text.includes('作词') && !text.includes('作曲') && !text.includes('编曲') && !text.includes('制作') && !text.includes('监制')) {
                timeMatches.forEach(match => {
                    const [, minutes, seconds, milliseconds] = match;
                    // 精确计算时间（支持2位和3位毫秒）
                    const ms = milliseconds.length === 2 ? parseInt(milliseconds) * 10 : parseInt(milliseconds);
                    const time = parseInt(minutes) * 60 + parseInt(seconds) + ms / 1000;
                    lyrics.push({ time, text });
                });
            }
        });
        
        // 按时间排序
        const sortedLyrics = lyrics.sort((a, b) => a.time - b.time);
        
        // 去重：移除相同时间的歌词
        const uniqueLyrics = [];
        for (let i = 0; i < sortedLyrics.length; i++) {
            if (i === 0 || sortedLyrics[i].time !== sortedLyrics[i - 1].time) {
                uniqueLyrics.push(sortedLyrics[i]);
            }
        }
        
        // 计算每句歌词的持续时间
        for (let i = 0; i < uniqueLyrics.length; i++) {
            if (i < uniqueLyrics.length - 1) {
                uniqueLyrics[i].duration = uniqueLyrics[i + 1].time - uniqueLyrics[i].time;
            } else {
                uniqueLyrics[i].duration = 5; // 最后一句默认持续5秒
            }
        }
        
        console.log(`解析歌词完成，共 ${uniqueLyrics.length} 行`);
        return uniqueLyrics;
    } catch (error) {
        console.error('解析歌词失败:', error);
        return [];
    }
}

// 处理歌词断句和换行

// 评论功能
let user = null; // 当前登录用户
let comments = []; // 评论列表

// 切换评论容器显示/隐藏
function toggleComments() {
    try {
        const commentContainer = document.getElementById('commentContainer');
        if (commentContainer) {
            // 检查当前状态，处理不同的maxHeight值
            const currentMaxHeight = commentContainer.style.maxHeight;
            if (currentMaxHeight === '400px') {
                commentContainer.style.maxHeight = '0';
            } else {
                commentContainer.style.maxHeight = '400px';
                // 加载评论
                loadComments();
            }
        }
    } catch (error) {
        console.error('切换评论容器失败:', error);
    }
}

// 加载评论
function loadComments() {
    try {
        const currentSong = playlist[currentSide][currentSongIndex];
        if (!currentSong) return;
        
        // 从localStorage加载评论
        const savedComments = localStorage.getItem('pfPlayerComments');
        if (savedComments) {
            const allComments = JSON.parse(savedComments);
            // 根据当前歌曲ID过滤评论
            comments = allComments.filter(comment => comment.songId === currentSong.id);
        } else {
            // 默认评论
            comments = [
                {
                    id: 1,
                    songId: currentSong.id,
                    username: '游客',
                    content: '这是一个示例评论，欢迎使用PF-Player！',
                    time: '2026-02-11 12:00',
                    level: 0
                }
            ];
        }
        renderComments();
    } catch (error) {
        console.error('加载评论失败:', error);
    }
}

// 渲染评论列表
function renderComments() {
    try {
        const commentList = document.getElementById('commentList');
        if (commentList) {
            commentList.innerHTML = '';
            
            comments.forEach(comment => {
                const commentItem = document.createElement('div');
                commentItem.className = 'comment-item';
                commentItem.style = 'padding: 10px 0; border-bottom: 1px solid rgba(255, 255, 255, 0.05);';
                
                const levelText = comment.level > 0 ? ` Lv${comment.level}` : '';
                const isCurrentUserComment = user && user.username === comment.username;
                
                commentItem.innerHTML = `
                    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 5px;">
                        <div style="display: flex; align-items: center;">
                            <span style="color: #d9ceb2; font-weight: bold; font-size: 12px;">${comment.username}${levelText}</span>
                            <span style="color: #888; font-size: 10px; margin-left: 10px;">${comment.time}</span>
                        </div>
                        ${isCurrentUserComment ? `<button onclick="deleteComment(${comment.id})" style="padding: 2px 6px; background: rgba(255, 71, 87, 0.2); border: 1px solid rgba(255, 71, 87, 0.4); border-radius: 4px; color: #ff4757; font-size: 10px; cursor: pointer;">删除</button>` : ''}
                    </div>
                    <p style="color: #e8e0d0; font-size: 12px; margin: 0;">${comment.content}</p>
                    <div style="margin-top: 5px;">
                        <button onclick="replyToComment(${comment.id}, '${comment.username}')" style="padding: 2px 6px; background: rgba(255, 255, 255, 0.1); border: 1px solid rgba(255, 255, 255, 0.2); border-radius: 4px; color: #d9ceb2; font-size: 10px; cursor: pointer;">回复</button>
                    </div>
                `;
                
                commentList.appendChild(commentItem);
            });
        }
    } catch (error) {
        console.error('渲染评论失败:', error);
    }
}

// 删除评论
function deleteComment(commentId) {
    try {
        if (!user) {
            showTooltip('请先登录');
            return;
        }
        
        // 确认删除
        if (!confirm('确定要删除这条评论吗？')) {
            return;
        }
        
        // 从localStorage加载所有评论
        const savedComments = localStorage.getItem('pfPlayerComments');
        if (!savedComments) {
            showTooltip('评论数据不存在');
            return;
        }
        
        let allComments = JSON.parse(savedComments);
        
        // 过滤掉要删除的评论及其回复
        const filteredComments = allComments.filter(comment => {
            return comment.id !== commentId && comment.parentId !== commentId;
        });
        
        // 保存到localStorage
        localStorage.setItem('pfPlayerComments', JSON.stringify(filteredComments));
        
        // 更新当前评论列表
        const currentSong = playlist[currentSide][currentSongIndex];
        if (currentSong) {
            comments = filteredComments.filter(comment => comment.songId === currentSong.id);
        }
        
        // 重新渲染评论
        renderComments();
        
        showTooltip('评论删除成功');
    } catch (error) {
        console.error('删除评论失败:', error);
        showTooltip('评论删除失败，请重试');
    }
}

// 回复评论
function replyToComment(_commentId, username) {
    try {
        if (!user) {
            showTooltip('请先登录');
            return;
        }
        
        const commentInput = document.getElementById('commentInput');
        if (commentInput) {
            commentInput.value = `@${username} `;
            commentInput.focus();
        }
    } catch (error) {
        console.error('回复评论失败:', error);
    }
}

// 提交评论
function submitComment() {
    try {
        if (!user) {
            showTooltip('请先登录');
            return;
        }
        
        const currentSong = playlist[currentSide][currentSongIndex];
        if (!currentSong) {
            showTooltip('当前没有播放歌曲');
            return;
        }
        
        const commentInput = document.getElementById('commentInput');
        const content = commentInput.value.trim();
        
        if (!content) {
            showTooltip('请输入评论内容');
            return;
        }
        
        // 创建新评论
        const newComment = {
            id: Date.now(),
            songId: currentSong.id,
            username: user.username,
            content: content,
            time: new Date().toLocaleString('zh-CN'),
            level: user.level,
            parentId: null // 用于回复功能
        };
        
        // 从localStorage加载所有评论
        const savedComments = localStorage.getItem('pfPlayerComments');
        let allComments = [];
        if (savedComments) {
            allComments = JSON.parse(savedComments);
        }
        
        // 添加新评论
        allComments.unshift(newComment);
        
        // 保存到localStorage
        localStorage.setItem('pfPlayerComments', JSON.stringify(allComments));
        
        // 更新当前评论列表
        comments = allComments.filter(comment => comment.songId === currentSong.id);
        
        // 清空输入框
        commentInput.value = '';
        
        // 重新渲染评论
        renderComments();
        
        showTooltip('评论发表成功');
    } catch (error) {
        console.error('提交评论失败:', error);
        showTooltip('评论发表失败，请重试');
    }
}

// 切换登录/注册弹窗
function toggleLogin() {
    try {
        const loginModal = document.getElementById('loginModal');
        if (loginModal) {
            if (loginModal.style.display === 'flex') {
                loginModal.style.display = 'none';
            } else {
                loginModal.style.display = 'flex';
                // 更新弹窗状态
                updateLoginModalStatus();
            }
        }
    } catch (error) {
        console.error('切换登录弹窗失败:', error);
    }
}

// 显示登录表单
function showLoginForm(type) {
    try {
        const loginInput = document.getElementById('loginInput');
        if (loginInput) {
            switch (type) {
                case 'phone':
                    loginInput.placeholder = '请输入手机号';
                    break;
                case 'wechat':
                    loginInput.placeholder = '请输入微信号';
                    break;
                case 'netease':
                    loginInput.placeholder = '请输入网易邮箱';
                    break;
                case 'google':
                    loginInput.placeholder = '请输入谷歌邮箱';
                    break;
            }
        }
    } catch (error) {
        console.error('显示登录表单失败:', error);
    }
}

// 切换登录/注册表单
function toggleAuthForm() {
    try {
        const loginForm = document.getElementById('loginForm');
        const registerForm = document.getElementById('registerForm');
        const toggleBtn = document.getElementById('toggleAuthBtn');
        
        if (loginForm.style.display !== 'none') {
            loginForm.style.display = 'none';
            registerForm.style.display = 'block';
            toggleBtn.textContent = '已有账号？立即登录';
        } else {
            loginForm.style.display = 'block';
            registerForm.style.display = 'none';
            toggleBtn.textContent = '没有账号？立即注册';
        }
    } catch (error) {
        console.error('切换登录/注册表单失败:', error);
    }
}

// 登录
function login() {
    try {
        const loginInput = document.getElementById('loginInput');
        const passwordInput = document.getElementById('passwordInput');
        const username = loginInput.value.trim();
        const password = passwordInput.value.trim();
        
        if (!username || !password) {
            showTooltip('请输入账号和密码');
            return;
        }
        
        // 从localStorage加载用户
        const savedUsers = localStorage.getItem('pfPlayerUsers');
        let users = [];
        if (savedUsers) {
            users = JSON.parse(savedUsers);
        }
        
        // 查找用户
        const existingUser = users.find(u => u.username === username && u.password === password);
        
        if (existingUser) {
            // 登录成功
            user = existingUser;
            updateUserStatus();
            toggleLogin();
            showTooltip('登录成功');
        } else {
            showTooltip('账号或密码错误');
        }
    } catch (error) {
        console.error('登录失败:', error);
        showTooltip('登录失败，请重试');
    }
}

// 注册
function register() {
    try {
        const registerInput = document.getElementById('registerInput');
        const registerPasswordInput = document.getElementById('registerPasswordInput');
        const confirmPasswordInput = document.getElementById('confirmPasswordInput');
        const username = registerInput.value.trim();
        const password = registerPasswordInput.value.trim();
        const confirmPassword = confirmPasswordInput.value.trim();
        
        if (!username || !password) {
            showTooltip('请输入账号和密码');
            return;
        }
        
        if (password !== confirmPassword) {
            showTooltip('两次输入的密码不一致');
            return;
        }
        
        // 从localStorage加载用户
        const savedUsers = localStorage.getItem('pfPlayerUsers');
        let users = [];
        if (savedUsers) {
            users = JSON.parse(savedUsers);
        }
        
        // 检查用户是否已存在
        const existingUser = users.find(u => u.username === username);
        if (existingUser) {
            showTooltip('账号已存在');
            return;
        }
        
        // 创建新用户
        const newUser = {
            username: username,
            password: password,
            level: 1,
            registerDate: new Date().toISOString(),
            lastLoginDate: new Date().toISOString()
        };
        
        // 添加到用户列表
        users.push(newUser);
        
        // 保存到localStorage
        localStorage.setItem('pfPlayerUsers', JSON.stringify(users));
        
        // 自动登录
        user = newUser;
        updateUserStatus();
        toggleLogin();
        showTooltip('注册成功');
    } catch (error) {
        console.error('注册失败:', error);
        showTooltip('注册失败，请重试');
    }
}

// 更新用户状态
function updateUserStatus() {
    try {
        const userStatus = document.getElementById('userStatus');
        const loginBtn = document.getElementById('loginBtn');
        const submitCommentBtn = document.getElementById('submitCommentBtn');
        
        if (user) {
            // 更新用户等级
            updateUserLevel();
            
            if (userStatus) {
                userStatus.textContent = `欢迎，${user.username} (Lv${user.level})`;
            }
            
            if (loginBtn) {
                loginBtn.textContent = '退出登录';
                loginBtn.onclick = logout;
            }
            
            if (submitCommentBtn) {
                submitCommentBtn.disabled = false;
                submitCommentBtn.style.background = 'linear-gradient(145deg, #8B4513 0%, #D2B48C 100%)';
                submitCommentBtn.style.color = '#e8e0d0';
                submitCommentBtn.style.cursor = 'pointer';
            }
        } else {
            if (userStatus) {
                userStatus.textContent = '登录后可以发表评论';
            }
            
            if (loginBtn) {
                loginBtn.textContent = '登录/注册';
                loginBtn.onclick = toggleLogin;
            }
            
            if (submitCommentBtn) {
                submitCommentBtn.disabled = true;
                submitCommentBtn.style.background = 'rgba(139, 69, 19, 0.5)';
                submitCommentBtn.style.color = '#888';
                submitCommentBtn.style.cursor = 'not-allowed';
            }
        }
    } catch (error) {
        console.error('更新用户状态失败:', error);
    }
}

// 退出登录
function logout() {
    try {
        user = null;
        updateUserStatus();
        showTooltip('退出登录成功');
    } catch (error) {
        console.error('退出登录失败:', error);
    }
}

// 显示用户设置界面
function showUserSettings() {
    try {
        const loginForm = document.getElementById('loginForm');
        const registerForm = document.getElementById('registerForm');
        const userSettings = document.getElementById('userSettings');
        const userMenu = document.getElementById('userMenu');
        const toggleAuthBtn = document.getElementById('toggleAuthBtn');
        
        if (loginForm && registerForm && userSettings && userMenu && toggleAuthBtn) {
            // 隐藏其他表单
            loginForm.style.display = 'none';
            registerForm.style.display = 'none';
            userMenu.style.display = 'none';
            toggleAuthBtn.style.display = 'none';
            
            // 显示用户设置表单
            userSettings.style.display = 'block';
            
            // 设置标题
            const modalTitle = document.querySelector('.login-modal h3');
            if (modalTitle) {
                modalTitle.textContent = '用户设置';
            }
        }
    } catch (error) {
        console.error('显示用户设置界面失败:', error);
    }
}

// 更新用户设置
function updateUserSettings() {
    try {
        const newUsernameInput = document.getElementById('newUsernameInput');
        const currentPasswordInput = document.getElementById('currentPasswordInput');
        const newPasswordInput = document.getElementById('newPasswordInput');
        
        const newUsername = newUsernameInput.value.trim();
        const currentPassword = currentPasswordInput.value.trim();
        const newPassword = newPasswordInput.value.trim();
        
        if (!currentPassword) {
            showTooltip('请输入当前密码');
            return;
        }
        
        // 验证当前密码
        if (user.password !== currentPassword) {
            showTooltip('当前密码错误');
            return;
        }
        
        // 从localStorage加载用户
        const savedUsers = localStorage.getItem('pfPlayerUsers');
        if (!savedUsers) {
            showTooltip('用户数据不存在');
            return;
        }
        
        let users = JSON.parse(savedUsers);
        const userIndex = users.findIndex(u => u.username === user.username);
        
        if (userIndex === -1) {
            showTooltip('用户不存在');
            return;
        }
        
        // 更新用户信息
        if (newUsername) {
            users[userIndex].username = newUsername;
            user.username = newUsername;
        }
        
        if (newPassword) {
            users[userIndex].password = newPassword;
            user.password = newPassword;
        }
        
        // 保存到localStorage
        localStorage.setItem('pfPlayerUsers', JSON.stringify(users));
        
        // 清空输入框
        newUsernameInput.value = '';
        currentPasswordInput.value = '';
        newPasswordInput.value = '';
        
        // 更新用户状态
        updateUserStatus();
        
        showTooltip('设置更新成功');
        
        // 关闭登录弹窗
        toggleLogin();
    } catch (error) {
        console.error('更新用户设置失败:', error);
        showTooltip('设置更新失败，请重试');
    }
}

// 更新登录弹窗状态
function updateLoginModalStatus() {
    try {
        const loginForm = document.getElementById('loginForm');
        const registerForm = document.getElementById('registerForm');
        const userSettings = document.getElementById('userSettings');
        const userMenu = document.getElementById('userMenu');
        const toggleAuthBtn = document.getElementById('toggleAuthBtn');
        
        if (loginForm && registerForm && userSettings && userMenu && toggleAuthBtn) {
            if (user) {
                // 已登录状态
                loginForm.style.display = 'none';
                registerForm.style.display = 'none';
                userSettings.style.display = 'none';
                toggleAuthBtn.style.display = 'none';
                userMenu.style.display = 'block';
                
                // 设置标题
                const modalTitle = document.querySelector('.login-modal h3');
                if (modalTitle) {
                    modalTitle.textContent = `欢迎，${user.username}`;
                }
            } else {
                // 未登录状态
                loginForm.style.display = 'block';
                registerForm.style.display = 'none';
                userSettings.style.display = 'none';
                userMenu.style.display = 'none';
                toggleAuthBtn.style.display = 'block';
                
                // 设置标题
                const modalTitle = document.querySelector('.login-modal h3');
                if (modalTitle) {
                    modalTitle.textContent = '登录/注册';
                }
            }
        }
    } catch (error) {
        console.error('更新登录弹窗状态失败:', error);
    }
}

// 切换用户主页弹窗
function toggleUserProfile() {
    try {
        const userProfileModal = document.getElementById('userProfileModal');
        if (userProfileModal) {
            if (userProfileModal.style.display === 'flex') {
                userProfileModal.style.display = 'none';
            } else {
                userProfileModal.style.display = 'flex';
                updateUserProfile();
            }
        }
    } catch (error) {
        console.error('切换用户主页弹窗失败:', error);
    }
}

// 更新用户主页信息
function updateUserProfile() {
    try {
        const profileUsername = document.getElementById('profileUsername');
        const profileLevel = document.getElementById('profileLevel');
        const profileRegTime = document.getElementById('profileRegTime');
        const profileUsageTime = document.getElementById('profileUsageTime');
        const likedSongsList = document.getElementById('likedSongsList');
        const profileBgImage = document.getElementById('profileBgImage');
        const profileBgPlaceholder = document.getElementById('profileBgPlaceholder');
        const avatarImage = document.getElementById('avatarImage');
        const avatarPlaceholder = document.getElementById('avatarPlaceholder');
        
        if (user) {
            // 已登录状态
            if (profileUsername) profileUsername.textContent = user.username;
            if (profileLevel) profileLevel.textContent = `Lv${user.level}`;
            if (profileRegTime) profileRegTime.textContent = user.regTime;
            
            // 计算使用时长
            if (profileUsageTime) {
                const regDate = new Date(user.regTime);
                const now = new Date();
                const days = Math.floor((now - regDate) / (1000 * 60 * 60 * 24));
                profileUsageTime.textContent = `${days}天`;
            }
            
            // 显示喜欢的歌曲
            if (likedSongsList) {
                if (likedSongs.length > 0) {
                    let likedSongsHTML = '';
                    likedSongs.forEach((song, index) => {
                        likedSongsHTML += `
                            <div style="display: flex; align-items: center; justify-content: space-between; padding: 5px 0; border-bottom: 1px solid rgba(255, 255, 255, 0.05);">
                                <div style="display: flex; align-items: center;">
                                    <span style="color: #888; font-size: 10px; margin-right: 10px;">${index + 1}</span>
                                    <div>
                                        <div style="color: #d9ceb2; font-size: 12px;">${song.name}</div>
                                        <div style="color: #888; font-size: 10px;">${song.artist}</div>
                                    </div>
                                </div>
                                <button onclick="playLikedSong(${index})" style="padding: 2px 6px; background: rgba(255, 255, 255, 0.1); border: 1px solid rgba(255, 255, 255, 0.2); border-radius: 4px; color: #d9ceb2; font-size: 10px; cursor: pointer;">播放</button>
                            </div>
                        `;
                    });
                    likedSongsList.innerHTML = likedSongsHTML;
                } else {
                    likedSongsList.innerHTML = '<div style="text-align: center; color: #888; font-size: 12px; padding: 20px;">暂无喜欢的歌曲</div>';
                }
            }
            
            // 显示头像
            if (avatarImage && avatarPlaceholder && user.avatar) {
                avatarImage.src = user.avatar;
                avatarImage.style.display = 'block';
                avatarPlaceholder.style.display = 'none';
            } else if (avatarImage && avatarPlaceholder) {
                avatarImage.style.display = 'none';
                avatarPlaceholder.style.display = 'block';
            }
            
            // 显示背景图
            if (profileBgImage && profileBgPlaceholder && user.bgImage) {
                profileBgImage.src = user.bgImage;
                profileBgImage.style.display = 'block';
                profileBgPlaceholder.style.display = 'none';
            } else if (profileBgImage && profileBgPlaceholder) {
                profileBgImage.style.display = 'none';
                profileBgPlaceholder.style.display = 'block';
            }
        } else {
            // 未登录状态
            if (profileUsername) profileUsername.textContent = '未登录';
            if (profileLevel) profileLevel.textContent = 'Lv0';
            if (profileRegTime) profileRegTime.textContent = '--';
            if (profileUsageTime) profileUsageTime.textContent = '--';
            if (likedSongsList) {
                likedSongsList.innerHTML = '<div style="text-align: center; color: #888; font-size: 12px; padding: 20px;">请先登录</div>';
            }
            if (avatarImage && avatarPlaceholder) {
                avatarImage.style.display = 'none';
                avatarPlaceholder.style.display = 'block';
            }
            if (profileBgImage && profileBgPlaceholder) {
                profileBgImage.style.display = 'none';
                profileBgPlaceholder.style.display = 'block';
            }
        }
    } catch (error) {
        console.error('更新用户主页信息失败:', error);
    }
}

// 上传头像
function uploadAvatar() {
    try {
        if (!user) {
            showTooltip('请先登录');
            return;
        }
        
        const avatarInput = document.getElementById('avatarInput');
        const file = avatarInput.files[0];
        
        if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                const avatarData = e.target.result;
                
                // 更新用户数据
                user.avatar = avatarData;
                
                // 从localStorage加载用户
                const savedUsers = localStorage.getItem('pfPlayerUsers');
                if (savedUsers) {
                    let users = JSON.parse(savedUsers);
                    const userIndex = users.findIndex(u => u.username === user.username);
                    
                    if (userIndex !== -1) {
                        users[userIndex].avatar = avatarData;
                        localStorage.setItem('pfPlayerUsers', JSON.stringify(users));
                    }
                }
                
                // 更新用户主页
                updateUserProfile();
                showTooltip('头像上传成功');
            };
            reader.readAsDataURL(file);
        }
    } catch (error) {
        console.error('上传头像失败:', error);
        showTooltip('头像上传失败，请重试');
    }
}

// 上传背景图
function uploadProfileBg() {
    try {
        if (!user) {
            showTooltip('请先登录');
            return;
        }
        
        const profileBgInput = document.getElementById('profileBgInput');
        const file = profileBgInput.files[0];
        
        if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                const bgData = e.target.result;
                
                // 更新用户数据
                user.bgImage = bgData;
                
                // 从localStorage加载用户
                const savedUsers = localStorage.getItem('pfPlayerUsers');
                if (savedUsers) {
                    let users = JSON.parse(savedUsers);
                    const userIndex = users.findIndex(u => u.username === user.username);
                    
                    if (userIndex !== -1) {
                        users[userIndex].bgImage = bgData;
                        localStorage.setItem('pfPlayerUsers', JSON.stringify(users));
                    }
                }
                
                // 更新用户主页
                updateUserProfile();
                showTooltip('背景图上传成功');
            };
            reader.readAsDataURL(file);
        }
    } catch (error) {
        console.error('上传背景图失败:', error);
        showTooltip('背景图上传失败，请重试');
    }
}

// 播放喜欢的歌曲
function playLikedSong(index) {
    try {
        if (likedSongs[index]) {
            const song = likedSongs[index];
            
            // 查找歌曲在播放列表中的位置
            let found = false;
            for (let i = 0; i < playlist[currentSide].length; i++) {
                if (playlist[currentSide][i].id === song.id) {
                    playSong(i);
                    found = true;
                    break;
                }
            }
            
            if (!found) {
                showTooltip('歌曲不在当前播放列表中');
            }
        }
    } catch (error) {
        console.error('播放喜欢的歌曲失败:', error);
    }
}

// 更新用户等级
function updateUserLevel() {
    try {
        if (!user) return;
        
        const registerDate = new Date(user.registerDate);
        const now = new Date();
        const days = Math.floor((now - registerDate) / (1000 * 60 * 60 * 24));
        
        // 根据使用时长更新等级
        let level = 1;
        if (days >= 365) {
            level = 4;
        } else if (days >= 100) {
            level = 3;
        } else if (days >= 30) {
            level = 2;
        }
        
        if (level !== user.level) {
            user.level = level;
            
            // 保存到localStorage
            const savedUsers = localStorage.getItem('pfPlayerUsers');
            if (savedUsers) {
                let users = JSON.parse(savedUsers);
                const userIndex = users.findIndex(u => u.username === user.username);
                if (userIndex !== -1) {
                    users[userIndex] = user;
                    localStorage.setItem('pfPlayerUsers', JSON.stringify(users));
                }
            }
        }
        
        // 更新最后登录时间
        user.lastLoginDate = new Date().toISOString();
    } catch (error) {
        console.error('更新用户等级失败:', error);
    }
}

// 喜欢收藏功能
let likedSongs = [];

// 切换喜欢状态
function toggleLike() {
    try {
        console.log('❤️ 收藏按钮被点击');
        const currentSong = playlist[currentSide] ? playlist[currentSide][currentSongIndex] : null;
        
        console.log('当前歌曲:', currentSong);
        console.log('当前磁带:', currentTape, '当前面:', currentSide, '当前索引:', currentSongIndex);
        
        if (!currentSong) {
            console.error('无法获取当前歌曲');
            return;
        }
        
        // 从localStorage加载喜欢的歌曲
        const savedLikedSongs = localStorage.getItem('pfPlayerLikedSongs');
        if (savedLikedSongs) {
            likedSongs = JSON.parse(savedLikedSongs);
        }
        
        // 检查歌曲是否已被喜欢
        const isLiked = likedSongs.some(song => song.id === currentSong.id);
        
        if (isLiked) {
            // 取消喜欢
            likedSongs = likedSongs.filter(song => song.id !== currentSong.id);
            showTooltip('已取消收藏');
        } else {
            // 添加喜欢
            likedSongs.push(currentSong);
            showTooltip('收藏成功');
        }
        
        // 保存到localStorage
        localStorage.setItem('pfPlayerLikedSongs', JSON.stringify(likedSongs));
        
        // 更新喜欢按钮状态
        updateLikeBtnStatus();
    } catch (error) {
        console.error('切换喜欢状态失败:', error);
        showTooltip('操作失败，请重试');
    }
}

// 更新喜欢按钮状态
function updateLikeBtnStatus() {
    try {
        const currentSong = playlist[currentSide] ? playlist[currentSide][currentSongIndex] : null;
        
        if (!currentSong) return;
        
        // 检查歌曲是否已被喜欢
        const isLiked = likedSongs.some(song => song.id === currentSong.id);
        
        // 更新主播放界面的喜欢按钮 (likeIconBefore / likeIconAfter)
        const likeIconBefore = document.getElementById('likeIconBefore');
        const likeIconAfter = document.getElementById('likeIconAfter');
        if (likeIconBefore && likeIconAfter) {
            if (isLiked) {
                likeIconBefore.style.display = 'none';
                likeIconAfter.style.display = 'block';
            } else {
                likeIconBefore.style.display = 'block';
                likeIconAfter.style.display = 'none';
            }
        }
        
        // 更新底部悬浮播放器的喜欢按钮 (mini-like-icon-before / mini-like-icon-after)
        const miniLikeIconBefore = document.getElementById('mini-like-icon-before');
        const miniLikeIconAfter = document.getElementById('mini-like-icon-after');
        if (miniLikeIconBefore && miniLikeIconAfter) {
            if (isLiked) {
                miniLikeIconBefore.style.display = 'none';
                miniLikeIconAfter.style.display = 'block';
            } else {
                miniLikeIconBefore.style.display = 'block';
                miniLikeIconAfter.style.display = 'none';
            }
        }
        
        // 更新横屏模式的喜欢按钮 (landscapeLikeIconBefore / landscapeLikeIconAfter)
        const landscapeLikeIconBefore = document.getElementById('landscapeLikeIconBefore');
        const landscapeLikeIconAfter = document.getElementById('landscapeLikeIconAfter');
        if (landscapeLikeIconBefore && landscapeLikeIconAfter) {
            if (isLiked) {
                landscapeLikeIconBefore.style.display = 'none';
                landscapeLikeIconAfter.style.display = 'block';
            } else {
                landscapeLikeIconBefore.style.display = 'block';
                landscapeLikeIconAfter.style.display = 'none';
            }
        }
    } catch (error) {
        console.error('更新喜欢按钮状态失败:', error);
    }
}

// 初始化用户状态和喜欢状态
function initUserAndLikeStatus() {
    try {
        // 从localStorage加载用户
        const savedUsers = localStorage.getItem('pfPlayerUsers');
        if (savedUsers) {
            const users = JSON.parse(savedUsers);
            // 简单起见，这里加载第一个用户
            if (users.length > 0) {
                user = users[0];
            }
        }
        
        // 从localStorage加载喜欢的歌曲
        const savedLikedSongs = localStorage.getItem('pfPlayerLikedSongs');
        if (savedLikedSongs) {
            likedSongs = JSON.parse(savedLikedSongs);
        }
        
        // 更新用户状态
        updateUserStatus();
        
        // 更新喜欢按钮状态
        updateLikeBtnStatus();
    } catch (error) {
        console.error('初始化用户和喜欢状态失败:', error);
    }
}

// 限制评论长度
function limitCommentLength() {
    try {
        const commentInput = document.getElementById('commentInput');
        const commentLength = document.getElementById('commentLength');
        
        if (commentInput && commentLength) {
            let content = commentInput.value;
            
            // 限制字符数为500
            if (content.length > 500) {
                content = content.substring(0, 500);
                commentInput.value = content;
            }
            
            // 更新字符数显示
            commentLength.textContent = `${content.length}/500`;
        }
    } catch (error) {
        console.error('限制评论长度失败:', error);
    }
}

// 页面加载完成后初始化
window.addEventListener('DOMContentLoaded', function() {
    // 初始化用户和喜欢状态
    initUserAndLikeStatus();
    
    // 恢复播放状态
    setTimeout(() => {
        resumePlayback();
    }, 1000);
});
function processLyricText(text) {
    // 优先在演唱停顿的标点处换行（逗号、句号、问号、感叹号等）
    const pauseMarks = /[,，。！？!?.]/g;

    // 如果文本中包含停顿标点，按标点分割
    if (pauseMarks.test(text)) {
        const parts = text.split(/([,，。！？!?.])/);
        let result = [];
        let currentPart = '';

        for (let i = 0; i < parts.length; i++) {
            const part = parts[i];
            // 如果是标点符号，添加到当前部分
            if (/[,，。！？!?.]/.test(part)) {
                currentPart += part;
                // 标点后换行（除非是最后一个标点）
                if (i < parts.length - 1) {
                    result.push(currentPart.trim());
                    currentPart = '';
                }
            } else {
                currentPart += part;
            }
        }

        // 添加最后一部分
        if (currentPart.trim()) {
            result.push(currentPart.trim());
        }

        if (result.length > 1) {
            return result.join('<br>');
        }
    }

    // 长句自动断句（按固定宽度）
    const maxLineLength = 30;
    if (text.length > maxLineLength) {
        // 尝试在单词边界或空格处断句
        const words = text.split(' ');
        let lines = [];
        let currentLine = '';

        for (const word of words) {
            if ((currentLine + word).length > maxLineLength && currentLine.trim()) {
                lines.push(currentLine.trim());
                currentLine = word + ' ';
            } else {
                currentLine += word + ' ';
            }
        }

        if (currentLine.trim()) {
            lines.push(currentLine.trim());
        }

        if (lines.length > 1) {
            return lines.join('<br>');
        }
    }

    return text;
}

// 显示歌词
function showLyrics() {
    try {
        const currentTime = audio.currentTime;
        const lyricsFullList = document.getElementById('lyricsFullList');
        const lyricsScrollContent = document.getElementById('lyricsScrollContent');
        const lyricsScrollWrapper = document.getElementById('lyricsScrollWrapper');
        
        // 找到当前应该显示的歌词（更精准的匹配）
        let newIndex = -1;
        for (let i = 0; i < currentLyrics.length; i++) {
            if (currentLyrics[i].time <= currentTime) {
                newIndex = i;
            } else {
                break;
            }
        }
        
        // 更新播放页的歌词显示（横向滚动）
        if (lyricsScrollContent && lyricsScrollWrapper) {
            if (newIndex >= 0 && newIndex < currentLyrics.length) {
                // 计算当前歌词的进度
                const currentLyric = currentLyrics[newIndex];
                let progress = 0;
                if (currentLyric.duration) {
                    const elapsed = currentTime - currentLyric.time;
                    progress = Math.min(1, elapsed / currentLyric.duration);
                }
                
                // 直接显示歌词文本（不换行）
                const lyricText = currentLyric.text;
                lyricsScrollContent.innerHTML = `<span style="color: #d9ceb2; font-size: 16px; opacity: 1; white-space: nowrap; display: inline-block; text-align: center;">${lyricText}</span>`;
                
                // 等待DOM更新后再计算位置
                requestAnimationFrame(() => {
                    const wrapperWidth = lyricsScrollWrapper.clientWidth;
                    const contentWidth = lyricsScrollContent.scrollWidth;
                    
                    if (contentWidth > wrapperWidth) {
                        // 需要滚动：计算居中后的滚动距离
                        const scrollDistance = contentWidth - wrapperWidth;
                        // 使用缓动函数，让滚动更平滑
                        const easeProgress = 1 - Math.pow(1 - progress, 3);
                        const scrollPosition = scrollDistance * easeProgress;
                        lyricsScrollContent.style.transform = `translateX(${-scrollPosition}px)`;
                        lyricsScrollContent.style.transition = 'transform 0.3s ease-out';
                    } else {
                        // 不需要滚动：居中显示
                        lyricsScrollContent.style.transform = 'translateX(0)';
                        lyricsScrollContent.style.transition = 'transform 0.3s ease-out';
                    }
                });
            } else {
                // 没有歌词时显示提示（居中）
                lyricsScrollContent.innerHTML = `<span style="color: #d9ceb2; font-size: 16px; opacity: 0.5; white-space: nowrap; display: inline-block; text-align: center;">暂无歌词</span>`;
                lyricsScrollContent.style.transform = 'translateX(0)';
                lyricsScrollContent.style.transition = 'transform 0.3s ease-out';
            }
        }
        
        // 更新歌词页的滚动效果
        if (lyricsFullList && newIndex >= 0) {
            // 移除所有激活状态
            const allLines = lyricsFullList.querySelectorAll('.lyrics-line');
            allLines.forEach(line => line.classList.remove('active'));            
            // 找到并激活当前歌词
            const activeLine = lyricsFullList.querySelector(`.lyrics-line[data-index="${newIndex}"]`);
            if (activeLine) {
                activeLine.classList.add('active');
                
                // 滚动到当前歌词位置
                const lyricsFullContainer = document.getElementById('lyricsFullContainer');
                if (lyricsFullContainer) {
                    const containerHeight = lyricsFullContainer.clientHeight;
                    const lineTop = activeLine.offsetTop;
                    const lineHeight = activeLine.clientHeight;
                    
                    // 让当前歌词居中显示
                    lyricsFullContainer.scrollTo({
                        top: lineTop - containerHeight / 2 + lineHeight / 2,
                        behavior: 'smooth'
                    });
                }
            }
        }
        
        // 更新歌词索引（如果发生变化）
        if (newIndex !== currentLyricIndex) {
            currentLyricIndex = newIndex;
            // 同步更新全局变量
            window.currentLyricIndex = currentLyricIndex;
        }
    } catch (error) {
        console.error('显示歌词失败:', error);
    }
}



// 复制歌词
function copyLyrics() {
    try {
        const currentPlaylist = playlist[currentSide];
        const currentSong = currentPlaylist[currentSongIndex];
        if (currentSong && currentSong.lyrics) {
            // 提取纯歌词文本
            const lyricsText = currentSong.lyrics
                .split('\n')
                .map(line => line.replace(/\[(\d{2}):(\d{2})\.(\d{2,3})\]/g, '').trim())
                .filter(line => line && !line.includes('作词') && !line.includes('作曲'))
                .join('\n');
            
            // 复制到剪贴板
            navigator.clipboard.writeText(lyricsText).then(() => {
                showTooltip('歌词已复制到剪贴板');
            }).catch(err => {
                console.error('复制失败:', err);
                showTooltip('复制失败，请手动复制');
            });
        } else {
            showTooltip('该歌曲暂无歌词');
        }
    } catch (error) {
        console.error('复制歌词失败:', error);
        showTooltip('操作失败，请重试');
    }
}

// 初始化完整歌词列表
function initFullLyrics() {
    const lyricsFullList = document.getElementById('lyricsFullList');
    const lyricsSongTitle = document.getElementById('lyricsSongTitle');
    const lyricsSongArtist = document.getElementById('lyricsSongArtist');
    
    // 更新歌词页的歌曲信息
    if (lyricsSongTitle && lyricsSongArtist) {
        const currentPlaylist = playlist[currentSide];
        const currentSong = currentPlaylist[currentSongIndex];
        if (currentSong) {
            lyricsSongTitle.textContent = currentSong.name || '未知歌曲';
            lyricsSongArtist.textContent = currentSong.artist || '未知艺术家';
        }
    }
    
    if (!lyricsFullList || currentLyrics.length === 0) {
        lyricsFullList.innerHTML = '<div class="lyrics-line" data-index="-1" style="color: #d9ceb2; font-size: 16px; opacity: 0.6;">暂无歌词</div>';
        return;
    }

    // 清空现有歌词
    lyricsFullList.innerHTML = '';

    // 添加所有歌词行
    currentLyrics.forEach((lyric, index) => {
        const lineEl = document.createElement('div');
        lineEl.className = 'lyrics-line';
        lineEl.setAttribute('data-index', index);
        lineEl.setAttribute('data-time', lyric.time);
        lineEl.innerHTML = processLyricText(lyric.text);
        lyricsFullList.appendChild(lineEl);
    });
}

// 更新完整歌词列表的高亮
function updateFullLyrics() {
    const currentTime = audio.currentTime;
    const lyricsFullList = document.getElementById('lyricsFullList');
    const lyricsFullContainer = document.getElementById('lyricsFullContainer');

    if (!lyricsFullList || currentLyrics.length === 0) return;

    // 找到当前应该高亮的歌词行
    let newIndex = -1;
    for (let i = 0; i < currentLyrics.length; i++) {
        if (currentLyrics[i].time <= currentTime) {
            newIndex = i;
        } else {
            break;
        }
    }

    // 如果歌词行索引发生变化，则更新高亮
    if (newIndex !== currentLyricIndex) {
        currentLyricIndex = newIndex;
        // 同步更新全局变量
        window.currentLyricIndex = currentLyricIndex;

        // 更新所有歌词行的样式
        const allLines = lyricsFullList.querySelectorAll('.lyrics-line');
        allLines.forEach((line, index) => {
            // 移除所有高亮类
            line.classList.remove('active', 'prev', 'next');

            if (index === currentLyricIndex) {
                // 当前行 - 高亮
                line.classList.add('active');
                // 样式会通过CSS自动应用
                
                // 自动滚动到当前行
                if (lyricsFullContainer) {
                    scrollToLyricLine(line, lyricsFullContainer);
                }
            } else if (index === currentLyricIndex - 1) {
                // 上一行 - 渐隐
                line.classList.add('prev');
            } else if (index === currentLyricIndex + 1) {
                // 下一行 - 渐显
                line.classList.add('next');
            }
        });
    }
}

// 滚动到指定歌词行
function scrollToLyricLine(targetLine, container) {
    if (!targetLine || !container) return;

    const containerHeight = container.clientHeight;
    const lineTop = targetLine.offsetTop;
    const lineHeight = targetLine.clientHeight;

    // 计算滚动位置，使当前行居中
    const scrollTop = lineTop - (containerHeight / 2) + (lineHeight / 2);

    // 使用平滑滚动，但不要太频繁
    const currentScrollTop = container.scrollTop;
    const diff = Math.abs(scrollTop - currentScrollTop);
    
    // 只有当滚动距离大于一定阈值时才滚动，避免抖动
    if (diff > 5) {
        container.scrollTo({
            top: Math.max(0, scrollTop),
            behavior: 'smooth'
        });
    }
}

// 播放指定歌曲
function playSong(index) {
    try {
        // 检查音频播放器是否已初始化
        if (!audio) {
            console.warn('音频播放器尚未初始化，等待初始化完成...');
            // 等待播放器初始化
            const checkInterval = setInterval(() => {
                if (audio) {
                    clearInterval(checkInterval);
                    playSong(index); // 重新调用
                }
            }, 100);
            // 设置超时
            setTimeout(() => {
                clearInterval(checkInterval);
                if (!audio) {
                    console.error('音频播放器初始化超时');
                    showTooltip('播放器初始化失败，请刷新页面');
                }
            }, 5000);
            return;
        }
        
        // 根据当前磁带获取播放列表
        let currentPlaylist = getCurrentTapePlaylist();
        console.log(`当前磁带: ${currentTape} (${tapeConfigs[currentTape]?.name || '未知'})，使用播放列表，索引: ${index}，总共有: ${currentPlaylist.length} 首`);
        
        // 如果当前磁带没有歌曲，尝试其他来源
        if (currentPlaylist.length === 0) {
            if (typeof PlayerStore !== 'undefined' && PlayerStore.state && PlayerStore.state.playlist && PlayerStore.state.playlist.length > 0) {
                currentPlaylist = PlayerStore.state.playlist;
                console.log('当前磁带无歌曲，使用 PlayerStore 播放列表');
            }
        }
        
        let song = currentPlaylist[index];
        if (!song) {
            console.error('歌曲不存在，索引:', index);
            return;
        }

        // 对于本地歌曲，从 playlist.local 获取完整数据（包含 data URL）
        if (song.type === 'local') {
            const pl = typeof playlist !== 'undefined' ? playlist : window.playlist;
            if (pl && pl.local && Array.isArray(pl.local)) {
                const fullSong = pl.local.find(s => s.id === song.id);
                if (fullSong) {
                    song = fullSong; // 使用完整的歌曲数据
                    console.log('从 playlist.local 获取完整本地歌曲:', song.name);
                }
            }
        }

        console.log('准备播放歌曲:', song.name || song.title);
        
        // 更新PlayerStore状态
        PlayerStore.play(song);
        
        // 记录播放历史
        if (window.LocalMusicModule) {
            LocalMusicModule.addToPlayHistory(song);
        }
        
        // 显示加载状态
    isLoading = true;
    showTooltip(`加载中: ${song.name || song.title || '未知歌曲'}...`);
    
    // 更新歌曲名称（支持长标题滚动）
    const trackNameEl = document.getElementById('trackName');
    if (trackNameEl) {
        const songName = song.name || song.title || '未知歌曲';
        // 如果标题长度超过15个字符，启用横向滚动
        if (songName.length > 15) {
            trackNameEl.innerHTML = `<span class="track-name-scroll">${songName}</span>`;
            trackNameEl.style.textOverflow = 'unset';
        } else {
            trackNameEl.textContent = songName;
            trackNameEl.style.textOverflow = 'ellipsis';
        }
    }
    
    document.getElementById('trackArtist').textContent = song.artist || '未知艺术家';
    document.getElementById('trackAlbum').textContent = song.album || '';
    
    // 更新专辑封面（使用懒加载）
    const albumCover = document.getElementById('albumCover');
    if (albumCover) {
        // 先设置占位符
        albumCover.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="300" height="300" viewBox="0 0 300 300"%3E%3Crect width="300" height="300" fill="%23333"/%3E%3Ctext x="50%" y="50%" font-size="14" fill="%23666" text-anchor="middle" dy=".3em"%3E加载中...%3C/text%3E%3C/svg%3E';
        albumCover.alt = song.album || '专辑封面';
        
        // 懒加载实际封面
        if (song.cover) {
            const img = new Image();
            img.onload = function() {
                albumCover.src = song.cover;
            };
            img.onerror = function() {
                // 加载失败时使用默认封面
                albumCover.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="300" height="300" viewBox="0 0 300 300"%3E%3Crect width="300" height="300" fill="%23333"/%3E%3Ctext x="50%" y="50%" font-size="14" fill="%23666" text-anchor="middle" dy=".3em"%3E无封面%3C/text%3E%3C/svg%3E';
            };
            img.src = song.cover;
        }
    }
    
    // 更新磁带计数器
    updateTapeCounter();
            
            // 加载歌词
            if (song.lyrics) {
                currentLyrics = parseLyrics(song.lyrics);
                currentLyricIndex = -1;
                // 同步更新全局变量
                window.currentLyrics = currentLyrics;
                window.currentLyricIndex = currentLyricIndex;
                // 初始化完整歌词列表
                initFullLyrics();
            } else {
                currentLyrics = [];
                currentLyricIndex = -1;
                // 同步更新全局变量
                window.currentLyrics = currentLyrics;
                window.currentLyricIndex = currentLyricIndex;
                // 更新新的歌词滚动结构
                const lyricsScrollContent = document.getElementById('lyricsScrollContent');
                if (lyricsScrollContent) {
                    lyricsScrollContent.innerHTML = '<span style="color: #d9ceb2; font-size: 16px; opacity: 0.5;">该歌曲暂无歌词</span>';
                    lyricsScrollContent.style.transform = 'translateX(0)';
                }
                // 清空完整歌词列表
                const lyricsFullList = document.getElementById('lyricsFullList');
                if (lyricsFullList) {
                    lyricsFullList.innerHTML = '<div class="lyrics-line" style="color: #d9ceb2; font-size: 14px; opacity: 0.5;">暂无歌词</div>';
                }
            }
            
            // 检查是否有缓存的音频
            if (audioCacheManager.has(song.id)) {
                // 使用缓存的音频
                audio.src = audioCacheManager.get(song.id).src;
                playAudio(song);
            } else {
                // 创建新的音频对象并缓存
                const audioElement = new Audio(song.url);
                audioElement.preload = 'auto';
                
                audioElement.addEventListener('loadedmetadata', () => {
                    // 使用缓存管理器添加音频
                    audioCacheManager.add(song.id, audioElement);
                    if (audio) {
                        audio.src = song.url;
                        playAudio(song);
                    } else {
                        console.error('音频播放器未初始化');
                        isLoading = false;
                    }
                });
                
                audioElement.addEventListener('error', () => {
                    Logger.debug('音频加载失败:', song.url);
                    isLoading = false;
                    showTooltip('音频加载失败，请检查网络连接');
                });
                
                // 开始加载
                audioElement.load();
            }
            
            // 更新喜欢按钮状态
            updateLikeBtnStatus();
            
            // 更新评论列表
            loadComments();
            
            // 预加载下一首歌曲
            preloadNextSong(currentPlaylist, index);
    } catch (error) {
        console.error('播放歌曲失败:', error);
        isLoading = false;
        showTooltip('播放失败，请重试');
    }
}

// 播放音频
function playAudio(song) {
    try {
        audio.play().then(() => {
            isLoading = false;
            syncPlayState(true);
            
            showTooltip(`正在播放: ${song.name} - ${song.artist}`);
            
            // 更新PlayerStore状态（用于底部悬浮播放器同步）
            if (typeof PlayerStore !== 'undefined') {
                PlayerStore.setState({
                    currentSong: {
                        id: song.id,
                        title: song.name,
                        artist: song.artist,
                        cover: song.cover
                    },
                    isPlaying: true,
                    isLoading: false
                });
            }
            
            // 保存播放历史
            savePlayHistory(song);
            
            // 保存用户设置
            saveUserSettings();
        }).catch(err => {
            // 优雅处理 AbortError（播放被暂停打断）
            if (err.name === 'AbortError') {
                Logger.debug('播放被暂停打断', err);
            } else {
                Logger.error('播放失败:', err);
                showTooltip('音频加载失败，请检查网络连接');
            }
            isLoading = false;
        });
    } catch (error) {
        Logger.error('播放音频失败:', error);
        isLoading = false;
        showTooltip('播放失败，请重试');
    }
}

// 预加载下一首歌曲
function preloadNextSong(currentPlaylist, currentIndex) {
    try {
        let nextIndex;
        
        switch (playMode) {
            case 'zaxin':
                // 扎心循环模式，随机选择一首未缓存的歌曲
                const unCachedSongs = currentPlaylist.filter((song, index) => 
                    index !== currentIndex && !audioCacheManager.has(song.id)
                );
                if (unCachedSongs.length > 0) {
                    const randomSong = unCachedSongs[Math.floor(Math.random() * unCachedSongs.length)];
                    preloadSong(randomSong);
                }
                break;
            case 'repeat_one':
                // 单曲循环模式，不需要预加载
                break;
            case 'repeat':
            default:
                // 列表循环模式，预加载下一首
                nextIndex = (currentIndex + 1) % currentPlaylist.length;
                const nextSong = currentPlaylist[nextIndex];
                if (nextSong && !audioCacheManager.has(nextSong.id)) {
                    preloadSong(nextSong);
                }
                break;
        }
    } catch (error) {
        console.error('预加载歌曲失败:', error);
    }
}

// 预加载指定歌曲
function preloadSong(song) {
    try {
        if (!audioCacheManager.has(song.id)) {
            const audioElement = new Audio(song.url);
            audioElement.preload = 'metadata';
            audioElement.addEventListener('loadedmetadata', () => {
                audioCacheManager.add(song.id, audioElement);
                Logger.debug(`预加载完成: ${song.name}`);
            });
            audioElement.addEventListener('error', () => {
                Logger.debug('预加载失败:', song.url);
            });
            audioElement.load();
        }
    } catch (error) {
        Logger.debug('预加载歌曲失败:', error);
    }
}

// 切换磁带
function switchTape(direction) {
    try {
        const cassette = document.querySelector('.cassette');
        const labelArea = document.querySelector('.label-area');
        const tapeCounter = document.querySelector('.tape-counter');
        const screws = document.querySelectorAll('.screw');
        
        if (!cassette) return;
        
        // 计算新的磁带索引
        let newTape = currentTape;
        if (direction === 'left') {
            newTape = (currentTape + 1) % tapeConfigs.length;
        } else if (direction === 'right') {
            newTape = (currentTape - 1 + tapeConfigs.length) % tapeConfigs.length;
        }
        
        if (newTape === currentTape) return;
        
        // 显示切换提示
        showTooltip(`正在切换到 "${tapeConfigs[newTape].name}" 磁带...`);
        
        // 添加切换动画
        cassette.classList.add('tape-switch');
        
        // 暂停当前播放
        if (audio && !audio.paused) {
            audio.pause();
        }
        
        // 播放机械音效
        playMechanicalSound();
        
        // 使用requestAnimationFrame确保动画流畅
        requestAnimationFrame(() => {
            setTimeout(() => {
                // 更新磁带配置
                currentTape = newTape;
                const config = tapeConfigs[currentTape];
                
                // 更新磁带外观
                cassette.style.background = config.colors.case;
                
                // 更新螺丝颜色
                screws.forEach(screw => {
                    screw.style.background = config.colors.screw;
                });
                
                // 更新标签区域
                if (labelArea) {
                    labelArea.style.background = config.colors.label;
                }
                
                // 更新磁带计数器显示
                if (tapeCounter) {
                    tapeCounter.innerHTML = `<div class="counter-text">当前磁带：${config.name} - <span id="currentSideDisplay">${currentSide}-Side</span> 第<span id="currentTrackDisplay">01</span>首 / <span id="totalTracksDisplay">${getCurrentTapeSongCount()}</span>首</div>`;
                }
                
                // 重置歌曲索引
                currentSongIndex = 0;
                
                // 移除切换动画
                cassette.classList.remove('tape-switch');
                
                // 播放新磁带的第一首歌
                playSong(0);
                
                showTooltip(`已切换到 "${config.name}" 磁带`);
            }, 600); // 匹配CSS动画时间
        });
        
    } catch (error) {
        console.error('切换磁带失败:', error);
    }
}

// 获取当前磁带的歌曲数量
function getCurrentTapeSongCount() {
    const pl = typeof playlist !== 'undefined' ? playlist : window.playlist;

    if (currentTape === 0 || currentTape === 2) {
        // 默认磁带（Pink Floyd）或第三张磁带（靛蓝回响），返回当前面的歌曲数
        return pl[currentSide]?.length || 0;
    } else {
        // 第二张磁带（本地歌曲）- 无数量限制
        // 返回 playlist.local 中的歌曲数量
        if (pl.local && pl.local.length > 0) {
            return pl.local.length;
        }
        // 如果 playlist.local 为空，尝试从 LocalMusicModule 获取
        if (window.LocalMusicModule) {
            return LocalMusicModule.getLocalSongs().length || 0;
        }
        return 0;
    }
}

// 获取当前磁带的播放列表
function getCurrentTapePlaylist() {
    const pl = typeof playlist !== 'undefined' ? playlist : window.playlist;

    if (currentTape === 0 || currentTape === 2) {
        // 默认磁带（Pink Floyd）或第三张磁带（靛蓝回响）
        return pl[currentSide] || [];
    } else {
        // 第二张磁带（本地歌曲）- 从 playlist.local 获取，无数量限制
        // 本地歌曲存储在 A-side
        if (pl.local && pl.local.length > 0) {
            // 如果当前面是 A，返回所有本地歌曲；如果当前面是 B，也返回所有本地歌曲（无限制）
            return pl.local;
        }
        // 如果 playlist.local 为空，尝试从 IndexedDB 获取
        if (window.LocalMusicModule) {
            const cachedSongs = LocalMusicModule.cachedLocalSongs || [];
            if (cachedSongs.length > 0) {
                return cachedSongs;
            }
        }
        // 最后尝试从 PlayerStore 获取
        if (typeof PlayerStore !== 'undefined' && PlayerStore.state && PlayerStore.state.playlist) {
            const localSongs = PlayerStore.state.playlist.filter(song => song.type === 'local');
            if (localSongs.length > 0) {
                return localSongs;
            }
        }
        return [];
    }
}

// 切换磁带面
function toggleSide() {
    try {
        // 获取磁带齿轮元素
        const leftGear = document.getElementById('leftGear');
        const rightGear = document.getElementById('rightGear');
        const flipTooltip = document.getElementById('flipTooltip');
        
        // 显示翻面提示框
        if (flipTooltip) {
            flipTooltip.classList.add('show');
        }
        
        // 添加快速旋转动画
        if (leftGear && rightGear) {
            // 暂停当前播放
            if (audio && !audio.paused) {
                audio.pause();
            }
            
            // 播放机械音效
            playMechanicalSound();
            
            // 添加快速旋转类
            leftGear.classList.add('fast-rotate');
            rightGear.classList.add('fast-rotate-reverse');
            
            // 禁用标签区域点击
            const labelArea = document.querySelector('.label-area');
            if (labelArea) {
                labelArea.style.pointerEvents = 'none';
            }
            
            // 切换磁带面
            currentSide = currentSide === 'A' ? 'B' : 'A';
            
            // 更新界面
                  // 磁带计数器会通过updateTapeCounter函数自动更新
            
            // 显示切换提示
            showTooltip(`正在切换到 ${currentSide}-Side...`);
            
            // 动画结束后恢复
            setTimeout(() => {
                // 移除快速旋转类
                leftGear.classList.remove('fast-rotate');
                rightGear.classList.remove('fast-rotate-reverse');
                
                // 切换齿轮旋转方向
                const leftGearSpin = leftGear.querySelector('.gear-outer');
                const rightGearSpin = rightGear.querySelector('.gear-outer');
                
                if (leftGearSpin && rightGearSpin) {
                    // 切换旋转方向类
                    if (currentSide === 'A') {
                        leftGearSpin.style.animationDirection = 'normal';
                        rightGearSpin.style.animationDirection = 'normal';
                    } else {
                        leftGearSpin.style.animationDirection = 'reverse';
                        rightGearSpin.style.animationDirection = 'reverse';
                    }
                }
                
                // 重置歌曲索引并播放第一首歌
                currentSongIndex = 0;
                playSong(0);
                
                // 恢复标签区域点击
                if (labelArea) {
                    labelArea.style.pointerEvents = 'auto';
                }
                
                // 隐藏翻面提示框
                if (flipTooltip) {
                    flipTooltip.classList.remove('show');
                }
                
                showTooltip(`已切换到 ${currentSide}-Side`);
            }, 1000); // 1秒动画时间
        } else {
            // 备用方案：无动画切换
            currentSide = currentSide === 'A' ? 'B' : 'A';
            
            // 更新界面
                  // 磁带计数器会通过updateTapeCounter函数自动更新
            
            // 重置歌曲索引并播放第一首歌
            currentSongIndex = 0;
            playSong(0);
            
            // 隐藏翻面提示框
            if (flipTooltip) {
                flipTooltip.classList.remove('show');
            }
            
            showTooltip(`已切换到 ${currentSide}-Side`);
        }
    } catch (error) {
        console.error('切换磁带面失败:', error);
        showTooltip('切换失败，请重试');
        
        // 隐藏翻面提示框
        const flipTooltip = document.getElementById('flipTooltip');
        if (flipTooltip) {
            flipTooltip.classList.remove('show');
        }
    }
}

// 切换播放列表面板显示/隐藏（统一版本）
function togglePlaylistPanel() {
    try {
        console.log('[DEBUG] togglePlaylistPanel 被调用');
        console.log('[DEBUG] UIManager 存在:', typeof UIManager !== 'undefined');
        console.log('[DEBUG] UIManager.showPlaylistPanel:', typeof UIManager !== 'undefined' ? typeof UIManager.showPlaylistPanel : 'N/A');
        
        // 统一使用悬浮播放条的播放列表面板
        if (typeof UIManager !== 'undefined' && typeof UIManager.showPlaylistPanel === 'function') {
            console.log('[DEBUG] 调用 UIManager.showPlaylistPanel()');
            UIManager.showPlaylistPanel();
        } else {
            // 备用方案：直接操作DOM
            const panel = document.getElementById('playlist-panel');
            console.log('[DEBUG] 播放列表面板元素:', panel);
            if (panel) {
                panel.classList.add('show');
                console.log('[DEBUG] 使用备用方案显示播放列表面板');
            } else {
                console.warn('[DEBUG] 播放列表面板元素不存在');
            }
        }
    } catch (error) {
        console.error('[DEBUG] 切换播放列表面板失败:', error);
    }
}

// 旧版播放列表切换函数（保持向后兼容，直接调用统一版本）
function togglePlaylist() {
    togglePlaylistPanel();
}

// 渲染播放列表（统一版本，调用 UIManager）
function renderPlaylist() {
    if (typeof UIManager !== 'undefined' && typeof UIManager.updatePlaylistContent === 'function') {
        UIManager.updatePlaylistContent();
        console.log('已调用 UIManager.updatePlaylistContent 刷新播放列表');
    } else {
        console.warn('UIManager.updatePlaylistContent 不可用');
    }
}

// 触摸开始事件
function handleTouchStart(e) {
    // 检查是否在分享按钮上触发的事件，如果是则不处理滑动
    const target = e.target.closest('.share-buttons');
    if (target) return;
    
    // 检查是否在播放按钮或其他控制按钮上触发的事件
    const controlBtn = e.target.closest('.control-btn, .play-btn, .volume-container, .speed-container');
    if (controlBtn) return;
    
    isSliding = true;
    startX = e.type === 'mousedown' ? e.clientX : e.touches[0].clientX;
    currentX = startX;
    // 阻止默认行为，防止页面滚动
    e.preventDefault();
}

// 触摸移动事件
function handleTouchMove(e) {
    // 检查是否在分享按钮上触发的事件，如果是则不处理滑动
    const target = e.target.closest('.share-buttons');
    if (target) return;
    
    // 检查是否在播放按钮或其他控制按钮上触发的事件
    const controlBtn = e.target.closest('.control-btn, .play-btn, .volume-container, .speed-container');
    if (controlBtn) return;
    
    if (!isSliding) return;
    currentX = e.type === 'mousemove' ? e.clientX : e.touches[0].clientX;
    // 阻止默认行为，防止页面滚动
    e.preventDefault();
}

// 触摸结束事件
function handleTouchEnd(e) {
    // 检查是否在分享按钮上触发的事件，如果是则不处理滑动
    const target = e.target.closest('.share-buttons');
    if (target) return;
    
    // 检查是否在播放按钮或其他控制按钮上触发的事件
    const controlBtn = e.target.closest('.control-btn, .play-btn, .volume-container, .speed-container');
    if (controlBtn) return;
    
    if (!isSliding) return;
    
    const diffX = currentX - startX;
    const threshold = 30; // 调整滑动阈值，提高灵敏度
    
    // 检查是否在磁带盒区域滑动
    const cassetteCase = e.target.closest('.cassette-case');
    if (cassetteCase) {
        // 磁带盒区域滑动：切换磁带
        if (Math.abs(diffX) > 50) {
            if (diffX > 0) {
                // 向右滑动：切换到上一盘磁带
                switchTape('right');
            } else {
                // 向左滑动：切换到下一盘磁带
                switchTape('left');
            }
        }
    } else {
        // 非磁带盒区域滑动：切换页面
        if (Math.abs(diffX) > threshold) {
            if (diffX > 0) {
                // 向右滑动
                if (currentPage > 1) {
                    slideToPage(currentPage - 1);
                }
            } else {
                // 向左滑动
                if (currentPage < 2) {
                    slideToPage(currentPage + 1);
                }
            }
        }
    }
    
    isSliding = false;
}

// 更新滑动指示器
function updateSlideIndicators(page) {
    const indicators = document.querySelectorAll('.slide-indicators .indicator');
    indicators.forEach(indicator => {
        const indicatorPage = parseInt(indicator.getAttribute('data-page'));
        if (indicatorPage === page) {
            indicator.classList.add('active');
        } else {
            indicator.classList.remove('active');
        }
    });
}

// 切换到指定页面
function slideToPage(page) {
    if (page < 1 || page > 2) return;
    
    currentPage = page;
    
    // 更新滑动容器样式
    slideContainer.className = 'slide-container';
    if (page > 1) {
        slideContainer.classList.add(`slide-to-${page}`);
    }
    
    // 更新滑动指示器
    updateSlideIndicators(page);
    
    // 显示所有元素（第一页和第二页都显示所有元素）
    const timeDisplay = document.querySelector('.time-display');
    const progressContainer = document.querySelector('.progress-container');
    const volumeContainer = document.querySelector('.volume-container');
    const speedContainer = document.querySelector('.speed-container');
    const lyricsContainer = document.querySelector('.lyrics-container');
    const trackInfo = document.querySelector('.track-info');
    
    if (timeDisplay) timeDisplay.style.display = 'flex';
    if (progressContainer) progressContainer.style.display = 'block';
    if (volumeContainer) volumeContainer.style.display = 'block';
    if (speedContainer) speedContainer.style.display = 'block';
    if (lyricsContainer) lyricsContainer.style.display = 'block';
    if (trackInfo) trackInfo.style.display = 'block';
    
    // 处理歌词页底部提示
    const lyricsHint = document.getElementById('lyricsHint');
    if (page === 2) {
        // 滑到歌词页：显示提示并启动呼吸动画，3秒后隐藏
        if (lyricsHint) {
            lyricsHint.style.display = 'block';
            lyricsHint.style.animation = 'breathHint 2s ease-in-out infinite';
            lyricsHint.style.opacity = '1';
            
            // 3秒后隐藏提示
            setTimeout(() => {
                lyricsHint.style.opacity = '0';
                lyricsHint.style.transition = 'opacity 1s ease';
                setTimeout(() => {
                    lyricsHint.style.animation = 'none';
                }, 1000);
            }, 3000);
        }
    } else {
        // 返回播放页：重置提示状态
        if (lyricsHint) {
            lyricsHint.style.display = 'block';
            lyricsHint.style.opacity = '1';
            lyricsHint.style.animation = 'breathHint 2s ease-in-out infinite';
        }
    }
    
    // 显示提示
    let pageName = '';
    switch (page) {
        case 1:
            pageName = '播放界面';
            break;
        case 2:
            pageName = '专辑封面';
            break;
    }
    showTooltip(`已切换到${pageName}`);
}

// 分享选项相关函数

// 切换分享选项面板的显示/隐藏
function toggleShareOptions() {
    const shareOptions = document.getElementById('shareOptions');
    if (shareOptions) {
        if (shareOptions.style.display === 'none' || shareOptions.style.display === '') {
            shareOptions.style.display = 'flex';
            shareOptions.style.flexDirection = 'column';
        } else {
            shareOptions.style.display = 'none';
        }
    }
}

// 分享到不同平台
function shareTo(platform) {
    try {
        const currentPlaylist = playlist[currentSide];
        const currentSong = currentPlaylist[currentSongIndex];
        
        if (!currentSong) {
            showTooltip('请先选择要分享的歌曲');
            return;
        }
        
        const shareText = `我正在使用PF定制版播放器收听《${currentSong.name}》- ${currentSong.artist}，快来一起听吧！`;
        const shareUrl = window.location.href;
        
        switch (platform) {
            case 'weibo':
                // 微博分享
                const weiboUrl = `http://service.weibo.com/share/share.php?url=${encodeURIComponent(shareUrl)}&title=${encodeURIComponent(shareText)}&pic=${encodeURIComponent(currentSong.cover || '')}`;
                window.open(weiboUrl, '_blank', 'width=600,height=400');
                break;
            case 'wechat':
                // 微信分享（需要用户手动扫码）
                showTooltip('请截图分享到微信');
                break;
            case 'qq':
                // QQ分享
                const qqUrl = `https://connect.qq.com/widget/shareqq/index.html?url=${encodeURIComponent(shareUrl)}&title=${encodeURIComponent(shareText)}&summary=${encodeURIComponent(shareText)}&pics=${encodeURIComponent(currentSong.cover || '')}`;
                window.open(qqUrl, '_blank', 'width=600,height=400');
                break;
            case 'instagram':
                // Instagram分享（需要用户手动分享）
                showTooltip('请截图分享到Instagram');
                break;
        }
        
        // 关闭分享选项面板
        const shareOptions = document.getElementById('shareOptions');
        if (shareOptions) {
            shareOptions.style.display = 'none';
        }
        
        showTooltip(`已分享到${getPlatformName(platform)}`);
    } catch (error) {
        console.error('分享失败:', error);
        showTooltip('分享失败，请重试');
    }
}

// 获取平台名称
function getPlatformName(platform) {
    const platformMap = {
        'weibo': '微博',
        'wechat': '微信',
        'qq': 'QQ',
        'instagram': 'Instagram'
    };
    return platformMap[platform] || platform;
}

// 复制分享链接
function copyShareLink() {
    try {
        const shareUrl = window.location.href;
        
        navigator.clipboard.writeText(shareUrl).then(() => {
            showTooltip('分享链接已复制到剪贴板');
        }).catch(err => {
            console.error('复制失败:', err);
            showTooltip('复制失败，请手动复制');
        });
        
        // 关闭分享选项面板
        const shareOptions = document.getElementById('shareOptions');
        if (shareOptions) {
            shareOptions.style.display = 'none';
        }
    } catch (error) {
        console.error('复制链接失败:', error);
        showTooltip('操作失败，请重试');
    }
}

// 背景设置相关函数

// 切换背景设置容器的显示/隐藏
function toggleBgSettings() {
    const bgSettingsContainer = document.getElementById('bgSettingsContainer');
    
    if (bgSettingsContainer) {
        // 检查当前状态，处理不同的maxHeight值
        const currentMaxHeight = bgSettingsContainer.style.maxHeight;
        if (currentMaxHeight === '500px') {
            bgSettingsContainer.style.maxHeight = '0';
        } else {
            bgSettingsContainer.style.maxHeight = '500px';
        }
    }
}

// 应用背景颜色




// 播放机械音效
function playMechanicalSound() {
    try {
        // 使用Web Audio API创建简单的机械音效
        // @ts-ignore - webkitAudioContext 用于兼容旧版浏览器
        const AudioContextClass = window.AudioContext || window.webkitAudioContext;
        if (!AudioContextClass) {
            console.warn('Web Audio API 不支持');
            return;
        }
        const audioContext = new AudioContextClass();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        oscillator.frequency.setValueAtTime(200, audioContext.currentTime);
        oscillator.frequency.exponentialRampToValueAtTime(100, audioContext.currentTime + 0.2);
        
        gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.2);
        
        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 0.2);
    } catch (error) {
        console.error('播放机械音效失败:', error);
    }
}

// 更新磁带计数器
function updateTapeCounter() {
    try {
        const currentSideDisplay = document.getElementById('currentSideDisplay');
        const currentTrackDisplay = document.getElementById('currentTrackDisplay');
        const totalTracksDisplay = document.getElementById('totalTracksDisplay');
        
        if (currentSideDisplay && currentTrackDisplay && totalTracksDisplay) {
            currentSideDisplay.textContent = `${currentSide}-Side`;
            currentTrackDisplay.textContent = String(currentSongIndex + 1).padStart(2, '0');
            totalTracksDisplay.textContent = String(playlist[currentSide].length).padStart(2, '0');
        }
    } catch (error) {
        console.error('更新磁带计数器失败:', error);
    }
}

// 重置背景


// 更新磁带盒风格
function updateCassetteStyle() {
    // 获取磁带盒元素
    const cassette = document.querySelector('.cassette');
    const retroLabel = document.querySelector('.retro-label');
    
    if (!cassette || !retroLabel) return;
    
    // 获取颜色值
    const cassetteBgColor = document.getElementById('cassetteBgColor').value;
    const stickerColor = document.getElementById('stickerColor').value;
    const gridColor = document.getElementById('gridColor').value;
    const textureStyle = document.getElementById('textureStyle').value;
    
    // 更新磁带盒背景色
    cassette.style.background = `linear-gradient(145deg, ${cassetteBgColor} 0%, ${adjustColorBrightness(cassetteBgColor, -10)} 50%, ${adjustColorBrightness(cassetteBgColor, -20)} 100%)`;
    
    // 更新贴纸颜色
    retroLabel.style.background = `linear-gradient(180deg, ${stickerColor} 0%, ${stickerColor} 100%)`;
    
    // 更新网格纹理
    updateGridTexture(gridColor, textureStyle);
    
    showTooltip('磁带盒风格已更新');
}

// 更新网格纹理
function updateGridTexture(color, style) {
    const cassette = document.querySelector('.cassette');
    if (!cassette) return;
    
    // 移除现有的::after样式
    const styleId = 'gridTextureStyle';
    let styleElement = document.getElementById(styleId);
    
    if (!styleElement) {
        styleElement = document.createElement('style');
        styleElement.id = styleId;
        document.head.appendChild(styleElement);
    }
    
    // 根据选择的样式生成不同的纹理
    let backgroundStyle = '';
    let backgroundSize = '';
    let backgroundPosition = '';
    
    switch (style) {
        case 'grid':
            backgroundStyle = `
                linear-gradient(
                    45deg,
                    ${color} 25%,
                    transparent 25%,
                    transparent 50%,
                    ${color} 50%,
                    ${color} 75%,
                    transparent 75%,
                    transparent
                ),
                linear-gradient(
                    -45deg,
                    ${color} 25%,
                    transparent 25%,
                    transparent 50%,
                    ${color} 50%,
                    ${color} 75%,
                    transparent 75%,
                    transparent
                )`;
            backgroundSize = '8px 8px';
            backgroundPosition = '0px 0px, 0px 0px';
            break;
        case 'diamond':
            backgroundStyle = `
                linear-gradient(
                    45deg,
                    ${color} 20%,
                    transparent 20%,
                    transparent 80%,
                    ${color} 80%
                ),
                linear-gradient(
                    -45deg,
                    ${color} 20%,
                    transparent 20%,
                    transparent 80%,
                    ${color} 80%
                )`;
            backgroundSize = '10px 10px';
            backgroundPosition = '0px 0px, 0px 0px';
            break;
        case 'heart':
            // 使用重复的❤形图案
            backgroundStyle = `radial-gradient(
                circle,
                ${color} 3px,
                transparent 3px
            ),
            radial-gradient(
                circle,
                ${color} 3px,
                transparent 3px
            )`;
            backgroundSize = '16px 16px';
            backgroundPosition = '0px 0px, 8px 8px';
            break;
        case 'dots':
            // 使用放大的圆形波点图案
            backgroundStyle = `radial-gradient(circle, ${color} 40%, transparent 40%)`;
            backgroundSize = '12px 12px';
            backgroundPosition = '0px 0px';
            break;
    }
    
    // 设置纹理样式
    styleElement.textContent = `
        .cassette::after {
            background: ${backgroundStyle} !important;
            background-size: ${backgroundSize} !important;
            background-position: ${backgroundPosition} !important;
        }
    `;
}



// 绑定背景设置相关事件监听器
function bindBackgroundSettingsEvents() {
    try {
        // 背景设置事件
        const bgColorPicker = document.getElementById('bgColorPicker');
        const applyColorBtn = document.querySelector('button[onclick="applyBgColor()"]');
        const bgImageUpload = document.getElementById('bgImageUpload');
        const bgOpacitySlider = document.getElementById('bgOpacitySlider');
        const glassEffectToggle = document.getElementById('glassEffectToggle');
        
        if (bgColorPicker) {
            bgColorPicker.addEventListener('change', applyBgColor);
        }
        
        if (applyColorBtn) {
            applyColorBtn.addEventListener('click', applyBgColor);
        }
        
        if (bgImageUpload) {
            bgImageUpload.addEventListener('change', handleBgImageUpload);
        }
        
        if (bgOpacitySlider) {
            bgOpacitySlider.addEventListener('input', updateBgOpacity);
        }
        
        if (glassEffectToggle) {
            glassEffectToggle.addEventListener('change', toggleGlassEffect);
        }
        
        Logger.debug('Background settings events bound successfully');
    } catch (error) {
        Logger.debug('绑定背景设置事件失败:', error);
    }
}

// 应用背景颜色
function applyBgColor() {
    Logger.debug('applyBgColor called');
    const bgColorPicker = document.getElementById('bgColorPicker');
    const iphoneContainer = document.querySelector('.iphone-container');
    const glassEffectToggle = document.getElementById('glassEffectToggle');
    
    Logger.debug('Elements:', { bgColorPicker, iphoneContainer, glassEffectToggle });
    
    if (bgColorPicker && iphoneContainer) {
        const color = bgColorPicker.value;
        Logger.debug('Selected color:', color);
        
        // 生成渐变颜色
        const lightColor = adjustColorBrightness(color, 10);
        const darkColor = adjustColorBrightness(color, -10);
        Logger.debug('Gradient colors:', { lightColor, darkColor });
        
        // 移除可能的毛玻璃效果
        iphoneContainer.style.backdropFilter = 'none';
        iphoneContainer.style.backgroundColor = 'transparent';
        
        // 直接设置背景颜色，不使用setAttribute，避免覆盖其他样式
        const gradientBackground = `linear-gradient(145deg, ${lightColor} 0%, ${darkColor} 100%)`;
        // 使用更直接的方式设置背景，确保覆盖所有其他样式
        iphoneContainer.style.background = gradientBackground;
        // 强制应用样式
        iphoneContainer.style.background = gradientBackground + ' !important';
        Logger.debug('Background style set to:', iphoneContainer.style.background);
        Logger.debug('Computed background style:', getComputedStyle(iphoneContainer).background);
        
        // 关闭毛玻璃效果
        if (glassEffectToggle) {
            glassEffectToggle.checked = false;
        }
        
        // 保存设置
        saveUserSettings();
        
        showTooltip('背景颜色已更新');
        Logger.debug('Background color updated successfully');
    } else {
        Logger.debug('Elements not found');
        showTooltip('设置失败，请重试');
    }
}

// 调整颜色亮度的辅助函数
function adjustColorBrightness(color, percent) {
    const num = parseInt(color.replace("#", ""), 16);
    const amt = Math.round(2.55 * percent);
    const R = (num >> 16) + amt;
    const G = (num >> 8 & 0x00FF) + amt;
    const B = (num & 0x0000FF) + amt;
    return "#" + (0x1000000 + (R<255?R<1?0:R:255)*0x10000 + (G<255?G<1?0:G:255)*0x100 + (B<255?B<1?0:B:255)).toString(16).slice(1);
}

// 处理背景图片上传
function handleBgImageUpload(event) {
    Logger.debug('handleBgImageUpload called');
    const file = event.target.files[0];
    const iphoneContainer = document.querySelector('.iphone-container');
    const bgOpacitySlider = document.getElementById('bgOpacitySlider');
    const glassEffectToggle = document.getElementById('glassEffectToggle');
    
    Logger.debug('Elements:', { file, iphoneContainer, bgOpacitySlider, glassEffectToggle });
    
    if (file && iphoneContainer) {
        const reader = new FileReader();
        
        reader.onload = function(e) {
            const imageUrl = e.target.result;
            Logger.debug('Image URL:', imageUrl);
            // 获取当前透明度设置
            const opacity = bgOpacitySlider ? bgOpacitySlider.value / 100 : 1;
            Logger.debug('Opacity:', opacity);
            
            // 直接设置背景样式，确保覆盖任何其他样式
            iphoneContainer.style.background = `url(${imageUrl}) center/cover no-repeat !important`;
            iphoneContainer.style.backgroundColor = `rgba(0,0,0,${opacity})`;
            Logger.debug('Background style set to:', iphoneContainer.style.background);
            Logger.debug('Background color set to:', iphoneContainer.style.backgroundColor);
            
            // 关闭毛玻璃效果
            if (glassEffectToggle) {
                glassEffectToggle.checked = false;
                iphoneContainer.style.backdropFilter = 'none';
                // 不要设置backgroundColor为transparent，因为这会覆盖之前设置的透明度
            }
            
            showTooltip('背景图片已更新');
            // 保存设置
            saveUserSettings();
        };
        
        reader.onerror = function(error) {
            Logger.debug('File reader error:', error);
            showTooltip('图片加载失败，请重试');
        };
        
        reader.readAsDataURL(file);
    } else {
        Logger.debug('File or iphoneContainer not found');
        showTooltip('设置失败，请重试');
    }
}

// 更新背景图片透明度
function updateBgOpacity() {
    const opacitySlider = document.getElementById('bgOpacitySlider');
    const opacityValue = document.getElementById('opacityValue');
    const iphoneContainer = document.querySelector('.iphone-container');
    
    if (opacitySlider && opacityValue && iphoneContainer) {
        const opacity = opacitySlider.value / 100;
        opacityValue.textContent = `${opacitySlider.value}%`;
        
        // 检查当前背景是否为图片
        const currentBackground = iphoneContainer.style.background;
        if (currentBackground && currentBackground.includes('url(')) {
            // 如果是图片背景，修改背景样式以包含透明度
            try {
                const urlMatch = currentBackground.match(/url\((["']?)([^"']+)\1\)/);
                if (urlMatch && urlMatch[2]) {
                    const imageUrl = urlMatch[2];
                    iphoneContainer.style.background = `url(${imageUrl}) center/cover no-repeat rgba(0,0,0,${opacity}) !important`;
                    showTooltip('背景图片透明度已更新');
                }
            } catch (error) {
                console.error('提取图片URL失败:', error);
                showTooltip('更新透明度失败');
            }
        } else {
            // 如果是渐变背景，保持不变
            showTooltip('透明度调节仅适用于背景图片');
        }
        
        // 保存设置
        saveUserSettings();
    }
}

// 重置背景
function resetBackground() {
    const iphoneContainer = document.querySelector('.iphone-container');
    const bgColorPicker = document.getElementById('bgColorPicker');
    const bgOpacitySlider = document.getElementById('bgOpacitySlider');
    const opacityValue = document.getElementById('opacityValue');
    const glassEffectToggle = document.getElementById('glassEffectToggle');
    
    if (iphoneContainer) {
        // 重置为默认背景
        iphoneContainer.style.background = '#1f6156 !important';
        iphoneContainer.style.backdropFilter = 'none';
        iphoneContainer.style.backgroundColor = 'transparent';
    }
    
    if (bgColorPicker) {
        bgColorPicker.value = '#1f6156';
    }
    
    if (bgOpacitySlider) {
        bgOpacitySlider.value = '100';
    }
    
    if (opacityValue) {
        opacityValue.textContent = '100%';
    }
    
    if (glassEffectToggle) {
        glassEffectToggle.checked = false;
    }
    
    showTooltip('背景已重置为默认');
    saveUserSettings();
}

// 切换毛玻璃效果
function toggleGlassEffect() {
    const glassEffectToggle = document.getElementById('glassEffectToggle');
    const iphoneContainer = document.querySelector('.iphone-container');
    
    if (glassEffectToggle && iphoneContainer) {
        if (glassEffectToggle.checked) {
            // 启用毛玻璃效果
            // 清除背景图片或渐变，只设置半透明背景色
            iphoneContainer.style.background = 'rgba(255, 255, 255, 0.1) !important';
            iphoneContainer.style.backdropFilter = 'blur(10px)';
            showTooltip('毛玻璃效果已启用');
        } else {
            // 禁用毛玻璃效果
            iphoneContainer.style.backdropFilter = 'none';
            iphoneContainer.style.backgroundColor = 'transparent';
            // 恢复之前的背景设置
            const settings = JSON.parse(localStorage.getItem('pfPlayerSettings') || '{}');
            if (settings.bgImageUrl) {
                const opacity = (settings.bgOpacity || '50') / 100;
                iphoneContainer.style.background = `url(${settings.bgImageUrl}) center/cover no-repeat rgba(0,0,0,${opacity}) !important`;
            } else {
                const color = settings.bgColor || '#1f6156';
                iphoneContainer.style.background = `${color} !important`;
            }
            showTooltip('毛玻璃效果已禁用');
        }
        
        // 保存设置
        saveUserSettings();
    }
}

// 重置磁带盒风格
function resetCassetteStyle() {
    // 重置颜色选择器
    const cassetteBgColor = document.getElementById('cassetteBgColor');
    const stickerColor = document.getElementById('stickerColor');
    const gridColor = document.getElementById('gridColor');
    const textureStyle = document.getElementById('textureStyle');
    const gridThickness = document.getElementById('gridThickness');
    const gridThicknessValue = document.getElementById('gridThicknessValue');
    
    if (cassetteBgColor) cassetteBgColor.value = '#e8e0d0';
    if (stickerColor) stickerColor.value = '#785b3a';
    if (gridColor) gridColor.value = '#e8e0d0';
    if (textureStyle) textureStyle.value = 'grid';
    if (gridThickness) gridThickness.value = 1;
    if (gridThicknessValue) gridThicknessValue.textContent = '1px';
    
    // 重置样式
    const cassette = document.querySelector('.cassette');
    const retroLabel = document.querySelector('.retro-label');
    
    if (cassette) {
        cassette.style.background = 'linear-gradient(145deg, #e8e0d0 0%, #d9ceb2 50%, #c8b898 100%)';
    }
    
    if (retroLabel) {
        retroLabel.style.background = 'linear-gradient(180deg, #785b3a 0%, #785b3a 100%)';
    }
    
    // 移除自定义样式
    const styleId1 = 'gridTextureStyle';
    const styleId2 = 'gridThicknessStyle';
    const style1 = document.getElementById(styleId1);
    const style2 = document.getElementById(styleId2);
    
    if (style1) style1.remove();
    if (style2) style2.remove();
    
    showTooltip('磁带盒风格已重置');
}



// 调整颜色亮度的辅助函数
function adjustColorBrightness(color, percent) {
    const num = parseInt(color.replace("#", ""), 16);
    const amt = Math.round(2.55 * percent);
    const R = (num >> 16) + amt;
    const G = (num >> 8 & 0x00FF) + amt;
    const B = (num & 0x0000FF) + amt;
    return "#" + (0x1000000 + (R<255?R<1?0:R:255)*0x10000 + (G<255?G<1?0:G:255)*0x100 + (B<255?B<1?0:B:255)).toString(16).slice(1);
}

// 搜索歌曲功能
function searchSongs() {
    const searchInput = document.getElementById('searchInput');
    
    if (!searchInput) {
        // 如果没有搜索框，直接打开搜索页面
        showTooltip('请在播放列表中使用搜索功能');
        return;
    }
    
    const keyword = searchInput.value.trim();
    
    if (!keyword) {
        showTooltip('请输入搜索关键词');
        return;
    }
    
    // 直接打开搜索页面
    openSearchPage(encodeURIComponent(keyword));
}

// 打开搜索页面
function openSearchPage(keyword) {
    const searchUrl = `https://www.myfreemp3.com.cn/?page=searchPage&search=${keyword}`;
    window.open(searchUrl, '_blank');
    showTooltip('搜索页面已在新标签页中打开');
}

// 添加歌曲到播放列表
function addSong() {
    const songName = document.getElementById('addSongName');
    const songArtist = document.getElementById('addSongArtist');
    const songAlbum = document.getElementById('addSongAlbum');
    const songUrl = document.getElementById('addSongUrl');
    const songSide = document.getElementById('addSongSide');
    
    if (!songName || !songArtist || !songAlbum || !songUrl || !songSide) {
        showTooltip('请填写歌曲信息');
        return;
    }
    
    const name = songName.value.trim();
    const artist = songArtist.value.trim();
    const album = songAlbum.value.trim();
    const url = songUrl.value.trim();
    const side = songSide.value === 'current' ? currentSide : songSide.value;
    
    if (!name || !artist || !url) {
        showTooltip('请填写歌曲名称、歌手和URL');
        return;
    }
    
    // 创建新歌曲对象
    const newSong = {
        id: Date.now().toString(),
        name: name,
        artist: artist,
        album: album,
        cover: '',
        url: url,
        lyrics: ''
    };
    
    // 添加歌曲到指定side
    playlist[side].push(newSong);
    
    // 同时添加到 PlayerStore 播放列表
    if (typeof PlayerStore !== 'undefined' && PlayerStore.state) {
        PlayerStore.state.playlist.push(newSong);
    }
    
    // 显示成功提示
    showTooltip(`歌曲已添加到${side === 'A' ? 'A-Side' : 'B-Side'}播放列表`);
    
    // 重新渲染播放列表
    renderPlaylist();
    
    // 清空表单
    songName.value = '';
    songArtist.value = '';
    songAlbum.value = '';
    songUrl.value = '';
}

// 加载动画
function initLoadingScreen() {
    Logger.debug('Initializing loading screen');
    const loadingScreen = document.getElementById('loading-screen');
    const loadingBar = document.getElementById('loading-bar');
    
    Logger.debug('Loading screen elements:', { loadingScreen, loadingBar });
    
    if (!loadingScreen || !loadingBar) {
        Logger.debug('Loading screen elements not found');
        return;
    }
    
    let progress = 0;
    const interval = setInterval(() => {
        progress += 5;
        if (progress <= 100) {
            loadingBar.style.width = `${progress}%`;
            Logger.debug('Loading progress:', progress);
        } else {
            clearInterval(interval);
            Logger.debug('Loading complete, hiding screen');
            // 加载完成，隐藏首屏
            setTimeout(() => {
                if (loadingScreen) {
                    loadingScreen.style.opacity = '0';
                    loadingScreen.style.transition = 'opacity 0.5s ease';
                    Logger.debug('Setting loading screen opacity to 0');
                    setTimeout(() => {
                        if (loadingScreen) {
                            loadingScreen.style.display = 'none';
                            Logger.debug('Setting loading screen display to none');
                        }
                    }, 500);
                }
            }, 500);
        }
    }, 100);
}

// 强制隐藏加载屏幕的函数，作为备用方案
function forceHideLoadingScreen() {
    Logger.debug('Forcing hide loading screen');
    const loadingScreen = document.getElementById('loading-screen');
    if (loadingScreen) {
        loadingScreen.style.opacity = '0';
        loadingScreen.style.transition = 'opacity 0.5s ease';
        setTimeout(() => {
            if (loadingScreen) {
                loadingScreen.style.display = 'none';
                Logger.debug('Forced loading screen hidden');
            }
        }, 500);
    }
}

// 本地存储功能

// 保存用户设置到localStorage
function saveUserSettings() {
    // 获取背景图片URL
    let bgImageUrl = '';
    const iphoneContainer = document.querySelector('.iphone-container');
    if (iphoneContainer && iphoneContainer.style.background && iphoneContainer.style.background.includes('url(')) {
        try {
            const urlMatch = iphoneContainer.style.background.match(/url\((["']?)([^"']+)\1\)/);
            if (urlMatch && urlMatch[2]) {
                bgImageUrl = urlMatch[2];
            }
        } catch (error) {
            Logger.debug('提取背景图片URL失败:', error);
        }
    }
    
    const settings = {
        bgColor: document.getElementById('bgColorPicker')?.value || '#1f6156',
        bgImageUrl: bgImageUrl,
        bgOpacity: document.getElementById('bgOpacitySlider')?.value || '50',
        glassEffect: document.getElementById('glassEffectToggle')?.checked || false,
        cassetteBgColor: document.getElementById('cassetteBgColor')?.value || '#e8e0d0',
        stickerColor: document.getElementById('stickerColor')?.value || '#785b3a',
        gridColor: document.getElementById('gridColor')?.value || '#e8e0d0',
        textureStyle: document.getElementById('textureStyle')?.value || 'grid',
        currentSide: currentSide,
        currentSongIndex: currentSongIndex
    };
    
    try {
        localStorage.setItem('pfPlayerSettings', JSON.stringify(settings));
        Logger.debug('设置保存成功:', settings);
    } catch (error) {
        Logger.debug('保存设置失败:', error);
    }
}

// 从localStorage加载用户设置
function loadUserSettings() {
    try {
        const savedSettings = localStorage.getItem('pfPlayerSettings');
        if (savedSettings) {
            const settings = JSON.parse(savedSettings);
            Logger.debug('加载设置:', settings);
            
            // 应用设置
            if (document.getElementById('bgColorPicker')) {
                document.getElementById('bgColorPicker').value = settings.bgColor;
                const iphoneContainer = document.querySelector('.iphone-container');
                if (iphoneContainer) {
                    // 检查是否有背景图片URL
                    if (settings.bgImageUrl) {
                        // 如果有背景图片，应用图片背景
                        const opacity = (settings.bgOpacity || '50') / 100;
                        iphoneContainer.style.background = `url(${settings.bgImageUrl}) center/cover no-repeat rgba(0,0,0,${opacity}) !important`;
                    } else {
                        // 如果没有背景图片，应用颜色
                        // 使用纯色背景，过滤无效颜色（如黑色）
                        let color = settings.bgColor;
                        if (!color || color === '#000000' || color === '#000' || color === 'black' || color === 'rgb(0, 0, 0)') {
                            color = '#1f6156';
                        }
                        // 使用!important确保样式优先级
                        iphoneContainer.style.background = `${color} !important`;
                    }
                    
                    // 应用毛玻璃效果
                    if (settings.glassEffect) {
                        iphoneContainer.style.backdropFilter = 'blur(10px)';
                        iphoneContainer.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
                    } else {
                        iphoneContainer.style.backdropFilter = 'none';
                        iphoneContainer.style.backgroundColor = 'transparent';
                    }
                }
            }
            
            if (document.getElementById('bgOpacitySlider')) {
                document.getElementById('bgOpacitySlider').value = settings.bgOpacity || '50';
                const opacityValue = document.getElementById('opacityValue');
                if (opacityValue) {
                    opacityValue.textContent = `${settings.bgOpacity || '50'}%`;
                }
            }
            
            if (document.getElementById('glassEffectToggle')) {
                document.getElementById('glassEffectToggle').checked = settings.glassEffect || false;
            }
            
            if (document.getElementById('cassetteBgColor')) {
                document.getElementById('cassetteBgColor').value = settings.cassetteBgColor;
            }
            
            if (document.getElementById('stickerColor')) {
                document.getElementById('stickerColor').value = settings.stickerColor;
            }
            
            if (document.getElementById('gridColor')) {
                document.getElementById('gridColor').value = settings.gridColor;
            }
            
            if (document.getElementById('textureStyle')) {
                document.getElementById('textureStyle').value = settings.textureStyle;
            }
            
            // 恢复播放状态
            if (settings.currentSide) {
                currentSide = settings.currentSide;
            }
            
            if (settings.currentSongIndex !== undefined) {
                currentSongIndex = settings.currentSongIndex;
            }
            
            return true;
        }
    } catch (error) {
        Logger.debug('加载设置失败:', error);
    }
    return false;
}

// 保存播放历史到localStorage
function savePlayHistory(song) {
    try {
        const history = JSON.parse(localStorage.getItem('pfPlayerHistory') || '[]');
        
        // 移除已存在的相同歌曲
        const filteredHistory = history.filter(item => item.id !== song.id);
        
        // 添加到历史记录开头
        filteredHistory.unshift({
            id: song.id,
            name: song.name,
            artist: song.artist,
            album: song.album,
            playedAt: new Date().toISOString()
        });
        
        // 限制历史记录数量
        const limitedHistory = filteredHistory.slice(0, 50);
        
        localStorage.setItem('pfPlayerHistory', JSON.stringify(limitedHistory));
    } catch (error) {
        console.error('保存播放历史失败:', error);
    }
}

// 性能监控功能

// 初始化性能监控
function initPerformanceMonitoring() {
    // 监控页面加载性能
    window.addEventListener('load', () => {
        // 使用现代的 PerformanceNavigationTiming API
        const navigationEntries = performance.getEntriesByType('navigation');
        const paintEntries = performance.getEntriesByType('paint');
        
        const performanceData = {
            pageLoadTime: navigationEntries[0]?.loadEventEnd || 0,
            domContentLoadedTime: navigationEntries[0]?.domContentLoadedEventEnd || 0,
            firstPaint: paintEntries[0]?.startTime || 0,
            firstContentfulPaint: paintEntries[1]?.startTime || 0
        };
        
        Logger.debug('页面加载性能数据:', performanceData);
        savePerformanceData('pageLoad', performanceData);
    });
    
    // 监控长任务
    if ('PerformanceObserver' in window) {
        const observer = new PerformanceObserver((list) => {
            list.getEntries().forEach((entry) => {
                if (entry.duration > 50) {
                    Logger.debug('长任务:', entry);
                    savePerformanceData('longTask', {
                        duration: entry.duration,
                        startTime: entry.startTime,
                        name: entry.name
                    });
                }
            });
        });
        
        observer.observe({ entryTypes: ['longtask'] });
    }
    
    // 监控资源加载
    if ('PerformanceObserver' in window) {
        const resourceObserver = new PerformanceObserver((list) => {
            const resources = list.getEntries();
            const resourceData = resources.map(resource => ({
                name: resource.name,
                duration: resource.duration,
                transferSize: resource.transferSize,
                decodedBodySize: resource.decodedBodySize
            }));
            
            Logger.debug('资源加载性能数据:', resourceData);
            savePerformanceData('resources', resourceData);
        });
        
        resourceObserver.observe({ entryTypes: ['resource'] });
    }
}

// 保存性能数据到localStorage
function savePerformanceData(type, data) {
    try {
        const performanceStorage = JSON.parse(localStorage.getItem('pfPlayerPerformance') || '{}');
        
        if (!performanceStorage[type]) {
            performanceStorage[type] = [];
        }
        
        performanceStorage[type].push({
            timestamp: new Date().toISOString(),
            data: data
        });
        
        // 限制数据量
        if (performanceStorage[type].length > 20) {
            performanceStorage[type] = performanceStorage[type].slice(-20);
        }
        
        localStorage.setItem('pfPlayerPerformance', JSON.stringify(performanceStorage));
    } catch (error) {
        Logger.debug('保存性能数据失败:', error);
    }
}

// 获取性能报告
function getPerformanceReport() {
    try {
        const performanceStorage = JSON.parse(localStorage.getItem('pfPlayerPerformance') || '{}');
        Logger.debug('性能报告:', performanceStorage);
        return performanceStorage;
    } catch (error) {
        Logger.debug('获取性能报告失败:', error);
        return {};
    }
}

// 页面加载完成后初始化
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        Logger.debug('DOMContentLoaded event fired');
        // 初始化性能监控
        initPerformanceMonitoring();
        
        // 立即绑定背景设置相关事件监听器，不等待加载动画
        bindBackgroundSettingsEvents();
        
        initLoadingScreen();
        // 等待加载动画完成并完全隐藏后，再加载用户设置和初始化播放器
        setTimeout(() => {
            // 强制隐藏加载屏幕作为安全保障
            forceHideLoadingScreen();
            // 加载用户设置
            loadUserSettings();
            initPlayer();
        }, 3500); // 等待加载动画完成（2500ms）+ 淡出动画（500ms）+ 完全隐藏（500ms）
        
        // 添加额外的安全保障，确保加载屏幕在5秒后一定被隐藏
        setTimeout(() => {
            Logger.debug('Final safety check: forcing hide loading screen');
            forceHideLoadingScreen();
        }, 5000);
    });
} else {
    Logger.debug('DOM already loaded');
    // 初始化性能监控
    initPerformanceMonitoring();
    
    // 立即绑定背景设置相关事件监听器，不等待加载动画
    bindBackgroundSettingsEvents();
    
    initLoadingScreen();
    // 等待加载动画完成并完全隐藏后，再加载用户设置和初始化播放器
    setTimeout(() => {
        // 强制隐藏加载屏幕作为安全保障
        forceHideLoadingScreen();
        // 加载用户设置
        loadUserSettings();
        initPlayer();
    }, 3500); // 等待加载动画完成（2500ms）+ 淡出动画（500ms）+ 完全隐藏（500ms）
    
    // 添加额外的安全保障，确保加载屏幕在5秒后一定被隐藏
    setTimeout(() => {
        Logger.debug('Final safety check: forcing hide loading screen');
        forceHideLoadingScreen();
    }, 5000);
}
