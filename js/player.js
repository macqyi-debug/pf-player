// 音乐播放器核心逻辑

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
let currentSongIndex = 0;
let currentSide = 'A'; // 当前磁带面
let playMode = 'repeat'; // 播放模式：repeat(列表循环), repeat_one(单曲循环), shuffle(随机播放)
let audioCache = {}; // 音频缓存
let isLoading = false; // 加载状态
let volume = 0.7; // 默认音量

// 机械音效
let mechanicalSound;

// 播放列表
const playlist = {
    A: [
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
            id: '18309310',
            name: 'Comfortably Numb',
            artist: 'Pink Floyd',
            album: 'The Wall',
            cover: 'http://p1.music.126.net/WaBh0-9dmRCQo3mdtrWY2Q==/109951172026873767.jpg?param=300x300',
            url: 'http://music.163.com/song/media/outer/url?id=28238311.mp3',
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
[03:20.197]Ok.
[03:23.197]Just a little pinprick.
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
            album: 'The Wall',
            cover: 'http://p2.music.126.net/5sDLKpZW98XER9uuQrOHOw==/109951172026793754.jpg?param=300x300',
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
            id: '26789046',
            name: 'Lost For Words',
            artist: 'Pink Floyd',
            album: 'The Division Bell',
            cover: 'http://p2.music.126.net/RIDL2YnaNzgRMM_63b3GoA==/5992338371896020.jpg?param=300x300',
            url: 'http://music.163.com/song/media/outer/url?id=26789046.mp3',
            lyrics: `[01:28.58]I was spending my time in the doldrums
[01:33.47]I was caught in the cauldron of hate
[01:38.40]I felt persecuted and paralyzed
[01:43.10]I thought that everything else would just wait
[01:50.77]While you are wasting your time on your enemies
[01:56.18]Engulfed in a fever of spite
[02:01.27]Beyond your tunnel vision reality fades
[02:09.60]Like shadows into the night
[02:17.68]To martyr yourself to caution
[02:22.60]Is not going to help at all
[02:27.15]Because there'll be no safety in numbers
[02:31.74]When the Right One walks out of the door
[02:37.24]
[03:19.35]Can you see your days blighted by darkness?
[03:24.55]Is it true you beat your fists on the floor?
[03:30.21]Stuck in a world of isolation
[03:34.25]While the ivy grows over the door
[03:41.98]So I open my door to my enemies
[03:47.49]And I ask could we wipe the slate clean
[03:52.33]But they tell me to please go **** myself
[03:57.62]You know you just can't win
[04:02.56]
[04:54.50]`
        },
        {
            id: '4237525',
            name: 'Another Brick in the Wall, Pt. 2',
            artist: 'Pink Floyd',
            album: 'The Wall',
            cover: 'http://p2.music.126.net/ZQt2NIXq6huxEQI9UV0ttw==/109951172026790805.jpg?param=300x300',
            url: 'http://music.163.com/song/media/outer/url?id=4237525.mp3',
            lyrics: `[00:00.00] 作词 : Roger Waters
[00:01.00] 作曲 : Roger Waters
[00:09.71]We don't need no education
[00:18.82]We dont need no thought control
[00:24.81]
[00:28.18]No dark sarcasm in the classroom
[00:33.48]
[00:37.11]Teachers leave them kids alone
[00:42.53]
[00:47.78]Hey Teachers Leave them kids alone
[00:53.28]
[00:56.34]All in all it's just another brick in the wall
[01:01.40]
[01:04.83]All in all you're just another brick in the wall
[01:10.88]
[01:14.50]We don't need no education
[01:18.57]
[01:23.31]We dont need no thought control
[01:27.75]
[01:32.36]No dark sarcasm in the classroom
[01:36.98]
[01:41.66]Teachers leave them kids alone
[01:46.40]
[01:52.20]Hey Teachers Leave them kids alone
[01:56.63]
[02:00.95]All in all it's just another brick in the wall
[02:09.80]All in all you're just another brick in the wall`
        }
    ],
    B: [
        {
            id: '2046846879',
            name: 'If (Original)',
            artist: 'Pink Floyd',
            album: 'Atom Heart Mother',
            cover: 'http://p2.music.126.net/ksBGHdiA9aql-cLOfwHtSg==/109951168607363976.jpg?param=300x300',
            url: 'http://music.163.com/song/media/outer/url?id=2046846879.mp3',
            lyrics: `[00:00.000] 作词 : David Gilmour
[00:01.000] 作曲 : David Gilmour
[00:09.470]If I were a swan, I'd be gone
[00:18.926]If I were a train, I'd be late
[00:28.252]And if I were a good man, I'd talk with you more often than I do
[00:47.112]If I were to sleep, I could dream
[00:56.569]If I were afraid, I could hide
[01:05.894]If I go insane, please don't put your wires in my brain
[02:02.058]If I were the moon, I'd be cool
[02:11.122]If I were a rule, I would bend
[02:20.422]If I were a good man, I'd understand the spaces between friends
[02:39.204]If I were alone, I would cry
[02:48.059]And if I were with you, I'd be home and dry
[02:57.568]And if I go insane, will you still let me join in with the game?
[03:53.470]If I were a swan, I'd be gone
[04:02.743]If I were a train, I'd be late again
[04:12.043]If I were a good man, I'd talk with you more often than I do`
        },
        {
            id: '4238610',
            name: 'Chapter 24',
            artist: 'Pink Floyd',
            album: 'The Piper at the Gates of Dawn',
            cover: 'http://p2.music.126.net/RpwfPVhBM1Bc9HcJ4NnieA==/109951172027023882.jpg?param=300x300',
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
            id: '2116278123',
            name: 'The Great Gig In The Sky',
            artist: 'Pink Floyd',
            album: 'The Dark Side of the Moon',
            cover: 'http://p2.music.126.net/Edu0dmt60Y8-r7YJ8Fw8yA==/109951172697324572.jpg?param=300x300',
            url: 'http://music.163.com/song/media/outer/url?id=2116278123.mp3',
            lyrics: `[00:00.00] 作词 : Richard Wright/Clare Torry
[00:01.00] 作曲 : Richard Wright/Clare Torry
[00:03.74]Music：Wright
[00:05.12]Vocal：Clare Torry
[00:38.96]
[00:39.15]'And I am not frightened of dying, any time will do,
[00:42.74]I don't mind. Why should I be frightened of dying?
[00:49.68]There's no reason for it, you've gotta go sometime.'
[03:30.54]
[03:33.88]'I never said I was frightened of dying.'`
        },
        {
            id: '31738245',
            name: 'The Dark Side of the Moon',
            artist: 'Pink Floyd',
            album: 'The Dark Side of the Moon',
            cover: 'http://p2.music.126.net/QeEqfYkapGTGgdoM1MV7Nw==/109951172402348987.jpg?param=300x300',
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
[04:01.27]`
        },
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
            id: '481537684',
            name: 'Is This The Life We Really Want',
            artist: 'Roger Waters',
            album: 'Is This The Life We Really Want',
            cover: 'http://p2.music.126.net/INqjv0PelFHmm_CUYZCbyw==/109951165981533183.jpg?param=300x300',
            url: 'http://music.163.com/song/media/outer/url?id=481537684.mp3',
            lyrics: `[00:00.000]Donald Trump:You're CNN. I mean it's story, after story, after story is bad. I won. I won. And the other thing, chaos. There's zero chaos. We are running- This is a fine-tuned machine
[01:14.490]The goose has gotten fat
[01:22.390]On caviar and fancy bars
[01:29.490]And subprime homes
[01:32.390]And broken homes
[01:35.490]Is this the life, the holy grail?
[01:48.190]It's not enough that we succeed
[01:54.190]We still need others to fail
[02:02.100]Fear, fear drives the mills of modern man
[02:10.100]Fear keeps us all in line
[02:20.100]Fear of all those foreigners
[02:27.100]Is this the life we really want?
[02:40.100]It surely must be so
[02:46.390]For this is a democracy and what we all say goes
[03:18.290]And every time a student is run over by a tank
[03:25.100]And every time a pirate's dog is forced to walk the plank
[03:31.290]Every time a Russian bride is advertised for sale
[03:37.290]And every time a journalist is left to rot in jail
[03:44.290]Every time a young girl's life is casually spent
[03:51.290]And every time a nincompoop becomes the president
[03:57.290]Every time somebody dies reaching for their keys
[04:04.190]And every time the green land falls in the ******* sea is because
[04:10.190]All of us, the blacks and whites
[04:13.190]Chicanos, Asians, every type of ethnic group.Even folks from Guadeloupe, the old, the young
[04:23.190]Toothless hags, super models, actors, fags, bleeding hearts
[04:30.190]Football stars, men in bars, washerwomen, tailors, tarts
[04:36.190]Grandmas, grandpas, uncles, aunts
[04:39.190]Friends, relations, homeless tramps
[04:42.190]Clerics, truckers, cleaning ladies
[04:49.190]Ants – maybe not ants
[04:52.190]Why not ants?
[04:53.190]Well because its true
[04:55.390]The ants don't have enough IQ to differentiate between
[05:01.390]The pain that other people feel and well, for instance, cutting leaves
[05:09.390]Or crawling across window seals in search of open treacle tins
[05:14.390]So, like the ants, are we just dumb
[05:17.390]Is that why we don't feel or see?
[05:21.390]Or are we all just numbed out on reality TV
[05:27.390]So, every time the curtain falls
[05:41.190]Every time the curtain falls on some forgotten life
[05:47.390]It is because we all stood by, silent and indifferent`
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
            
            // 延迟加载第一首歌，先显示界面
            setTimeout(() => {
                playSong(0);
            }, 500);
        }, 300);
    } catch (error) {
        console.error('初始化播放器失败:', error);
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
            isPlaying = false;
            playIcon.style.display = 'block';
            pauseIcon.style.display = 'none';
            leftGear.classList.remove('spinning');
            rightGear.classList.remove('spinning');
        } else {
            audio.play().then(() => {
                isPlaying = true;
                playIcon.style.display = 'none';
                pauseIcon.style.display = 'block';
                leftGear.classList.add('spinning');
                rightGear.classList.add('spinning');
            }).catch(err => {
                console.error('播放失败:', err);
                showTooltip('音频加载失败，请检查网络连接');
            });
        }
    } catch (error) {
        console.error('播放/暂停操作失败:', error);
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
            
            // 同步显示歌词
            showLyrics();
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

// 播放结束处理
function handlePlaybackEnded() {
    try {
        // 自动播放下一首
        playNext();
    } catch (error) {
        console.error('处理播放结束失败:', error);
    }
}

// 音频错误处理
function handleAudioError() {
    console.error('音频错误:', audio.error);
    showTooltip('音频加载失败，请检查网络连接');
}

// 键盘快捷键处理
function handleKeyboardShortcuts(e) {
    try {
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
        const currentPlaylist = playlist[currentSide];
        currentSongIndex = (currentSongIndex - 1 + currentPlaylist.length) % currentPlaylist.length;
        playSong(currentSongIndex);
    } catch (error) {
        console.error('播放上一首失败:', error);
        showTooltip('操作失败，请重试');
    }
}

// 播放下一首
function playNext() {
    try {
        const currentPlaylist = playlist[currentSide];
        
        switch (playMode) {
            case 'repeat_one':
                // 单曲循环，重新播放当前歌曲
                playSong(currentSongIndex);
                break;
            case 'shuffle':
                // 随机播放，随机选择一首歌曲
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

// 切换播放模式
function togglePlayMode() {
    try {
        const modes = ['repeat', 'repeat_one', 'shuffle'];
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
            case 'shuffle':
                modeText = '随机播放';
                break;
        }
        
        showTooltip(`播放模式: ${modeText}`);
    } catch (error) {
        console.error('切换播放模式失败:', error);
        showTooltip('操作失败，请重试');
    }
}

// 更新播放模式图标
function updatePlayModeIcon() {
    try {
        if (playModeBtn) {
            const icon = playModeBtn.querySelector('svg');
            if (icon) {
                switch (playMode) {
                    case 'repeat':
                        icon.innerHTML = '<path d="M7 7h10v3l4-4-4-4v3H5v6h2V7zm10 10H7v-3l-4 4 4 4v-3h12v-6h-2v4z"/>';
                        break;
                    case 'repeat_one':
                        icon.innerHTML = '<path d="M7 7h10v3l4-4-4-4v3H5v6h2V7zm10 10H7v-3l-4 4 4 4v-3h12v-6h-2v4zm-4-2V9h-1l-2 1v1h1.5v4H13z"/>';
                        break;
                    case 'shuffle':
                        icon.innerHTML = '<path d="M10.59 9.17L5.41 4 4 5.41l5.17 5.17 1.42-1.41zM14.5 4l2.04 2.04L4 18.59 5.41 20 17.96 7.46 20 9.5V4h-5.5zm0 3.17l-2.41 2.41 2.41 2.41V7.17z"/>';
                        break;
                }
            }
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
        const timeRegex = /\[(\d{2}):(\d{2})\.(\d{2,3})\]/g;
        
        lines.forEach(line => {
            const timeMatches = [...line.matchAll(timeRegex)];
            const text = line.replace(timeRegex, '').trim();
            
            timeMatches.forEach(match => {
                const [, minutes, seconds, milliseconds] = match;
                const time = parseInt(minutes) * 60 + parseInt(seconds) + parseInt(milliseconds) / 1000;
                lyrics.push({ time, text });
            });
        });
        
        // 按时间排序
        const sortedLyrics = lyrics.sort((a, b) => a.time - b.time);
        
        // 计算每句歌词的持续时间
        for (let i = 0; i < sortedLyrics.length; i++) {
            if (i < sortedLyrics.length - 1) {
                sortedLyrics[i].duration = sortedLyrics[i + 1].time - sortedLyrics[i].time;
            } else {
                sortedLyrics[i].duration = 3; // 最后一句默认持续3秒
            }
        }
        
        return sortedLyrics;
    } catch (error) {
        console.error('解析歌词失败:', error);
        return [];
    }
}

// 处理歌词断句和换行
function processLyricText(text) {
    // 短句逗号之后换行
    const sentences = text.split(/[,，]/).map(s => s.trim()).filter(s => s);
    
    if (sentences.length > 1) {
        return sentences.join('<br>');
    }
    
    // 长句自动断句（按固定宽度）
    const maxLineLength = 35; // 增加最大行宽，尽量在一行显示完整句子
    if (text.length > maxLineLength) {
        // 尝试在单词边界或标点处断句
        const words = text.split(' ');
        let lines = [];
        let currentLine = '';
        
        for (const word of words) {
            if ((currentLine + word).length > maxLineLength) {
                lines.push(currentLine.trim());
                currentLine = word + ' ';
            } else {
                currentLine += word + ' ';
            }
        }
        
        if (currentLine.trim()) {
            lines.push(currentLine.trim());
        }
        
        return lines.join('<br>');
    }
    
    return text;
}

// 显示歌词
function showLyrics() {
    try {
        const currentTime = audio.currentTime;
        const lyricsContent = document.getElementById('lyricsContent');
        
        // 找到当前应该显示的歌词（更精准的匹配）
        let newIndex = -1;
        for (let i = 0; i < currentLyrics.length; i++) {
            if (currentLyrics[i].time <= currentTime) {
                newIndex = i;
            } else {
                break;
            }
        }
        
        if (newIndex !== currentLyricIndex) {
            currentLyricIndex = newIndex;
            
            if (currentLyricIndex >= 0 && currentLyricIndex < currentLyrics.length) {
                // 更新主歌词容器
                if (lyricsContent) {
                    lyricsContent.innerHTML = '';
                    
                    // 计算当前歌词的进度
                    const currentLyric = currentLyrics[currentLyricIndex];
                    let progress = 0;
                    if (currentLyric.duration) {
                        const elapsed = currentTime - currentLyric.time;
                        progress = Math.min(1, elapsed / currentLyric.duration);
                    }
                    
                    // 显示当前歌词（高亮）
                    const currentLine = document.createElement('div');
                    currentLine.className = 'lyrics-line active';
                    currentLine.innerHTML = processLyricText(currentLyric.text);
                    // 根据进度调整透明度和缩放
                    currentLine.style.opacity = 1 - progress * 0.2; // 随进度逐渐变淡
                    lyricsContent.appendChild(currentLine);
                    
                    // 显示下一句歌词（如果有）
                    if (currentLyricIndex + 1 < currentLyrics.length) {
                        const nextLyric = currentLyrics[currentLyricIndex + 1];
                        const nextLine = document.createElement('div');
                        nextLine.className = 'lyrics-line next';
                        nextLine.innerHTML = processLyricText(nextLyric.text);
                        // 根据进度调整下一句的显示效果
                        nextLine.style.opacity = 0.5 + progress * 0.5; // 随进度逐渐变亮
                        nextLine.style.transform = `translateY(${10 - progress * 10}px)`; // 随进度逐渐上移
                        lyricsContent.appendChild(nextLine);
                    }
                    
                    // 显示上一句歌词（如果有）
                    if (currentLyricIndex > 0) {
                        const prevLyric = currentLyrics[currentLyricIndex - 1];
                        const prevLine = document.createElement('div');
                        prevLine.className = 'lyrics-line';
                        prevLine.innerHTML = processLyricText(prevLyric.text);
                        prevLine.style.opacity = 0.3;
                        prevLine.style.transform = 'translateY(-10px)';
                        lyricsContent.insertBefore(prevLine, currentLine);
                    }
                }
            } else {
                // 没有歌词时显示提示
                if (lyricsContent) {
                    lyricsContent.innerHTML = '';
                    const noLyricsLine = document.createElement('div');
                    noLyricsLine.className = 'lyrics-line';
                    noLyricsLine.textContent = '暂无歌词';
                    lyricsContent.appendChild(noLyricsLine);
                }
            }
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

// 播放指定歌曲
function playSong(index) {
    try {
        const currentPlaylist = playlist[currentSide];
        const song = currentPlaylist[index];
        if (song) {
            // 显示加载状态
    isLoading = true;
    showTooltip(`加载中: ${song.name}...`);
    
    document.getElementById('trackName').textContent = song.name;
    document.getElementById('trackArtist').textContent = song.artist;
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
            } else {
                currentLyrics = [];
                currentLyricIndex = -1;
                document.getElementById('lyricsContent').innerHTML = '<div class="lyrics-line">该歌曲暂无歌词</div>';
            }
            
            // 检查是否有缓存的音频
            if (audioCache[song.id]) {
                // 使用缓存的音频
                audio.src = audioCache[song.id].src;
                playAudio(song);
            } else {
                // 创建新的音频对象并缓存
                const audioElement = new Audio(song.url);
                audioElement.preload = 'auto';
                
                audioElement.addEventListener('loadedmetadata', () => {
                    // 缓存音频
                    audioCache[song.id] = audioElement;
                    audio.src = song.url;
                    playAudio(song);
                });
                
                audioElement.addEventListener('error', () => {
                    console.error('音频加载失败:', song.url);
                    isLoading = false;
                    showTooltip('音频加载失败，请检查网络连接');
                });
                
                // 开始加载
                audioElement.load();
            }
            
            // 预加载下一首歌曲
            preloadNextSong(currentPlaylist, index);
        }
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
            isPlaying = true;
            isLoading = false;
            playIcon.style.display = 'none';
            pauseIcon.style.display = 'block';
            leftGear.classList.add('spinning');
            rightGear.classList.add('spinning');
            showTooltip(`正在播放: ${song.name} - ${song.artist}`);
            
            // 保存播放历史
            savePlayHistory(song);
            
            // 保存用户设置
            saveUserSettings();
        }).catch(err => {
            console.error('播放失败:', err);
            isLoading = false;
            showTooltip('音频加载失败，请检查网络连接');
        });
    } catch (error) {
        console.error('播放音频失败:', error);
        isLoading = false;
        showTooltip('播放失败，请重试');
    }
}

// 预加载下一首歌曲
function preloadNextSong(currentPlaylist, currentIndex) {
    try {
        let nextIndex;
        
        switch (playMode) {
            case 'shuffle':
                // 随机播放模式，随机选择一首未缓存的歌曲
                const unCachedSongs = currentPlaylist.filter((song, index) => 
                    index !== currentIndex && !audioCache[song.id]
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
                if (nextSong && !audioCache[nextSong.id]) {
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
        if (!audioCache[song.id]) {
            const audioElement = new Audio(song.url);
            audioElement.preload = 'metadata';
            audioElement.addEventListener('loadedmetadata', () => {
                audioCache[song.id] = audioElement;
                console.log(`预加载完成: ${song.name}`);
            });
            audioElement.addEventListener('error', () => {
                console.error('预加载失败:', song.url);
            });
            audioElement.load();
        }
    } catch (error) {
        console.error('预加载歌曲失败:', error);
    }
}

// 切换磁带面
function toggleSide() {
    try {
        // 获取磁带齿轮元素
        const leftGear = document.getElementById('leftGear');
        const rightGear = document.querySelector('.reel-container.right .gear');
        
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
            
            showTooltip(`已切换到 ${currentSide}-Side`);
        }
    } catch (error) {
        console.error('切换磁带面失败:', error);
        showTooltip('切换失败，请重试');
    }
}

// 切换播放列表显示/隐藏
function togglePlaylist() {
    const playlistContainer = document.getElementById('playlistContainer');
    if (playlistContainer) {
        if (playlistContainer.style.maxHeight === '0px' || playlistContainer.style.maxHeight === '') {
            playlistContainer.style.maxHeight = '400px';
            renderPlaylist();
        } else {
            playlistContainer.style.maxHeight = '0px';
        }
    }
}

// 渲染播放列表
function renderPlaylist() {
    const playlistContent = document.getElementById('playlistContent');
    const currentPlaylist = playlist[currentSide];
    
    if (!playlistContent || !currentPlaylist) return;
    
    playlistContent.innerHTML = '';
    
    currentPlaylist.forEach((song, index) => {
        const songItem = document.createElement('div');
        songItem.className = `playlist-item ${index === currentSongIndex ? 'active' : ''}`;
        songItem.style.padding = '10px 15px';
        songItem.style.cursor = 'pointer';
        songItem.style.borderBottom = '1px solid rgba(255, 255, 255, 0.05)';
        songItem.style.color = index === currentSongIndex ? '#d9ceb2' : 'rgba(255, 255, 255, 0.7)';
        songItem.style.transition = 'all 0.2s ease';
        
        songItem.innerHTML = `
            <div style="font-weight: bold; margin-bottom: 3px;">${song.name}</div>
            <div style="font-size: 12px; color: rgba(255, 255, 255, 0.5);">${song.artist} - ${song.album}</div>
        `;
        
        songItem.addEventListener('click', () => {
            currentSongIndex = index;
            playSong(index);
            togglePlaylist();
        });
        
        playlistContent.appendChild(songItem);
    });
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
    
    isSliding = false;
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
    const playlistContainer = document.getElementById('playlistContainer');
    
    // 确保播放列表容器关闭
    if (playlistContainer && playlistContainer.style.maxHeight !== '0px') {
        playlistContainer.style.maxHeight = '0px';
    }
    
    if (bgSettingsContainer) {
        if (bgSettingsContainer.style.maxHeight === '0px' || bgSettingsContainer.style.maxHeight === '') {
            bgSettingsContainer.style.maxHeight = '500px';
        } else {
            bgSettingsContainer.style.maxHeight = '0px';
        }
    }
}

// 应用背景颜色




// 播放机械音效
function playMechanicalSound() {
    try {
        // 使用Web Audio API创建简单的机械音效
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
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
        
        console.log('Background settings events bound successfully');
    } catch (error) {
        console.error('绑定背景设置事件失败:', error);
    }
}

// 应用背景颜色
function applyBgColor() {
    console.log('applyBgColor called');
    const bgColorPicker = document.getElementById('bgColorPicker');
    const iphoneContainer = document.querySelector('.iphone-container');
    const glassEffectToggle = document.getElementById('glassEffectToggle');
    
    console.log('Elements:', { bgColorPicker, iphoneContainer, glassEffectToggle });
    
    if (bgColorPicker && iphoneContainer) {
        const color = bgColorPicker.value;
        console.log('Selected color:', color);
        
        // 生成渐变颜色
        const lightColor = adjustColorBrightness(color, 10);
        const darkColor = adjustColorBrightness(color, -10);
        console.log('Gradient colors:', { lightColor, darkColor });
        
        // 移除可能的毛玻璃效果
        iphoneContainer.style.backdropFilter = 'none';
        iphoneContainer.style.backgroundColor = 'transparent';
        
        // 直接设置背景颜色，不使用setAttribute，避免覆盖其他样式
        const gradientBackground = `linear-gradient(145deg, ${lightColor} 0%, ${darkColor} 100%)`;
        // 使用更直接的方式设置背景，确保覆盖所有其他样式
        iphoneContainer.style.background = gradientBackground;
        // 强制应用样式
        iphoneContainer.style.background = gradientBackground + ' !important';
        console.log('Background style set to:', iphoneContainer.style.background);
        console.log('Computed background style:', getComputedStyle(iphoneContainer).background);
        
        // 关闭毛玻璃效果
        if (glassEffectToggle) {
            glassEffectToggle.checked = false;
        }
        
        // 保存设置
        saveUserSettings();
        
        showTooltip('背景颜色已更新');
        console.log('Background color updated successfully');
    } else {
        console.error('Elements not found');
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
    console.log('handleBgImageUpload called');
    const file = event.target.files[0];
    const iphoneContainer = document.querySelector('.iphone-container');
    const bgOpacitySlider = document.getElementById('bgOpacitySlider');
    const glassEffectToggle = document.getElementById('glassEffectToggle');
    
    console.log('Elements:', { file, iphoneContainer, bgOpacitySlider, glassEffectToggle });
    
    if (file && iphoneContainer) {
        const reader = new FileReader();
        
        reader.onload = function(e) {
            const imageUrl = e.target.result;
            console.log('Image URL:', imageUrl);
            // 获取当前透明度设置
            const opacity = bgOpacitySlider ? bgOpacitySlider.value / 100 : 1;
            console.log('Opacity:', opacity);
            
            // 直接设置背景样式，确保覆盖任何其他样式
            iphoneContainer.style.background = `url(${imageUrl}) center/cover no-repeat !important`;
            iphoneContainer.style.backgroundColor = `rgba(0,0,0,${opacity})`;
            console.log('Background style set to:', iphoneContainer.style.background);
            console.log('Background color set to:', iphoneContainer.style.backgroundColor);
            
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
            console.error('File reader error:', error);
            showTooltip('图片加载失败，请重试');
        };
        
        reader.readAsDataURL(file);
    } else {
        console.error('File or iphoneContainer not found');
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
        iphoneContainer.style.background = 'linear-gradient(145deg, #1a3834 0%, #20443e 100%) !important';
        iphoneContainer.style.backdropFilter = 'none';
        iphoneContainer.style.backgroundColor = 'transparent';
    }
    
    if (bgColorPicker) {
        bgColorPicker.value = '#1a3834';
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
                const color = settings.bgColor || '#1a3834';
                const lightColor = adjustColorBrightness(color, 10);
                const darkColor = adjustColorBrightness(color, -10);
                iphoneContainer.style.background = `linear-gradient(145deg, ${lightColor} 0%, ${darkColor} 100%) !important`;
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
    if (stickerColor) stickerColor.value = '#8B4513';
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
        retroLabel.style.background = 'linear-gradient(180deg, #8B4513 0%, #8B4513 100%)';
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
    const playlistContent = document.getElementById('playlistContent');
    
    if (!searchInput || !playlistContent) return;
    
    const keyword = searchInput.value.trim();
    
    if (!keyword) {
        showTooltip('请输入搜索关键词');
        return;
    }
    
    // 构建搜索URL
    const searchUrl = `https://www.myfreemp3.com.cn/?page=searchPage&search=${encodeURIComponent(keyword)}`;
    
    // 显示搜索结果和添加歌曲表单
    playlistContent.innerHTML = `
        <div style="padding: 20px; color: #d9ceb2;">
            <p style="margin-bottom: 10px;">搜索结果将在新标签页中打开，请在那里试听歌曲。</p>
            <p style="font-size: 12px; opacity: 0.7; margin-bottom: 15px;">备注：搜索歌曲功能只为用户提供单纯搜索、试听体验，不提供下载和商用。</p>
            <button onclick="openSearchPage('${encodeURIComponent(keyword)}')" style="margin-bottom: 20px; padding: 8px 16px; background: linear-gradient(145deg, #e8e0d0 0%, #d9ceb2 100%); color: #8B4513; border: none; border-radius: 4px; cursor: pointer; font-size: 12px;">打开搜索页面</button>
            
            <h4 style="margin-bottom: 15px; color: #d9ceb2;">添加歌曲到播放列表</h4>
            <div style="display: flex; flex-direction: column; gap: 10px;">
                <input type="text" id="addSongName" placeholder="歌曲名称" style="padding: 8px 12px; background: rgba(255, 255, 255, 0.1); border: 1px solid rgba(255, 255, 255, 0.2); border-radius: 4px; color: #d9ceb2; font-size: 12px;">
                <input type="text" id="addSongArtist" placeholder="歌手" style="padding: 8px 12px; background: rgba(255, 255, 255, 0.1); border: 1px solid rgba(255, 255, 255, 0.2); border-radius: 4px; color: #d9ceb2; font-size: 12px;">
                <input type="text" id="addSongAlbum" placeholder="专辑" style="padding: 8px 12px; background: rgba(255, 255, 255, 0.1); border: 1px solid rgba(255, 255, 255, 0.2); border-radius: 4px; color: #d9ceb2; font-size: 12px;">
                <input type="text" id="addSongUrl" placeholder="歌曲URL" style="padding: 8px 12px; background: rgba(255, 255, 255, 0.1); border: 1px solid rgba(255, 255, 255, 0.2); border-radius: 4px; color: #d9ceb2; font-size: 12px;">
                <select id="addSongSide" style="padding: 8px 12px; background: rgba(255, 255, 255, 0.1); border: 1px solid rgba(255, 255, 255, 0.2); border-radius: 4px; color: #d9ceb2; font-size: 12px;">
                    <option value="current">当前Side (${currentSide})</option>
                    <option value="A">A-Side</option>
                    <option value="B">B-Side</option>
                </select>
                <button onclick="addSong()" style="padding: 8px 16px; background: linear-gradient(145deg, #8B4513 0%, #D2B48C 100%); color: #e8e0d0; border: none; border-radius: 4px; cursor: pointer; font-size: 12px;">添加到播放列表</button>
            </div>
        </div>
    `;
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
    
    if (!songName || !songArtist || !songAlbum || !songUrl || !songSide) return;
    
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
    const loadingScreen = document.getElementById('loading-screen');
    const loadingBar = document.getElementById('loading-bar');
    
    if (!loadingScreen || !loadingBar) return;
    
    let progress = 0;
    const interval = setInterval(() => {
        progress += 5;
        if (progress <= 100) {
            loadingBar.style.width = `${progress}%`;
        } else {
            clearInterval(interval);
            // 加载完成，隐藏首屏
            setTimeout(() => {
                loadingScreen.style.opacity = '0';
                loadingScreen.style.transition = 'opacity 0.5s ease';
                setTimeout(() => {
                    loadingScreen.style.display = 'none';
                }, 500);
            }, 500);
        }
    }, 100);
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
            console.error('提取背景图片URL失败:', error);
        }
    }
    
    const settings = {
        bgColor: document.getElementById('bgColorPicker')?.value || '#1a3834',
        bgImageUrl: bgImageUrl,
        bgOpacity: document.getElementById('bgOpacitySlider')?.value || '50',
        glassEffect: document.getElementById('glassEffectToggle')?.checked || false,
        cassetteBgColor: document.getElementById('cassetteBgColor')?.value || '#e8e0d0',
        stickerColor: document.getElementById('stickerColor')?.value || '#8B4513',
        gridColor: document.getElementById('gridColor')?.value || '#e8e0d0',
        textureStyle: document.getElementById('textureStyle')?.value || 'grid',
        currentSide: currentSide,
        currentSongIndex: currentSongIndex
    };
    
    try {
        localStorage.setItem('pfPlayerSettings', JSON.stringify(settings));
        console.log('设置保存成功:', settings);
    } catch (error) {
        console.error('保存设置失败:', error);
    }
}

// 从localStorage加载用户设置
function loadUserSettings() {
    try {
        const savedSettings = localStorage.getItem('pfPlayerSettings');
        if (savedSettings) {
            const settings = JSON.parse(savedSettings);
            console.log('加载设置:', settings);
            
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
                        // 如果没有背景图片，应用颜色渐变
                        // 生成渐变颜色，与applyBgColor函数保持一致
                        const color = settings.bgColor || '#1a3834';
                        const lightColor = adjustColorBrightness(color, 10);
                        const darkColor = adjustColorBrightness(color, -10);
                        // 使用!important确保样式优先级
                        iphoneContainer.style.background = `linear-gradient(145deg, ${lightColor} 0%, ${darkColor} 100%) !important`;
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
        console.error('加载设置失败:', error);
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
        const performanceData = {
            pageLoadTime: performance.timing.loadEventEnd - performance.timing.navigationStart,
            domContentLoadedTime: performance.timing.domContentLoadedEventEnd - performance.timing.navigationStart,
            firstPaint: performance.getEntriesByType('paint')[0]?.startTime || 0,
            firstContentfulPaint: performance.getEntriesByType('paint')[1]?.startTime || 0
        };
        
        console.log('页面加载性能数据:', performanceData);
        savePerformanceData('pageLoad', performanceData);
    });
    
    // 监控长任务
    if ('PerformanceObserver' in window) {
        const observer = new PerformanceObserver((list) => {
            list.getEntries().forEach((entry) => {
                if (entry.duration > 50) {
                    console.warn('长任务:', entry);
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
            
            console.log('资源加载性能数据:', resourceData);
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
        console.error('保存性能数据失败:', error);
    }
}

// 获取性能报告
function getPerformanceReport() {
    try {
        const performanceStorage = JSON.parse(localStorage.getItem('pfPlayerPerformance') || '{}');
        console.log('性能报告:', performanceStorage);
        return performanceStorage;
    } catch (error) {
        console.error('获取性能报告失败:', error);
        return {};
    }
}

// 页面加载完成后初始化
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        // 初始化性能监控
        initPerformanceMonitoring();
        
        // 立即绑定背景设置相关事件监听器，不等待加载动画
        bindBackgroundSettingsEvents();
        
        initLoadingScreen();
        // 等待加载动画完成并完全隐藏后，再加载用户设置和初始化播放器
        setTimeout(() => {
            // 加载用户设置
            loadUserSettings();
            initPlayer();
        }, 3500); // 等待加载动画完成（2500ms）+ 淡出动画（500ms）+ 完全隐藏（500ms）
    });
} else {
    // 初始化性能监控
    initPerformanceMonitoring();
    
    // 立即绑定背景设置相关事件监听器，不等待加载动画
    bindBackgroundSettingsEvents();
    
    initLoadingScreen();
    // 等待加载动画完成并完全隐藏后，再加载用户设置和初始化播放器
    setTimeout(() => {
        // 加载用户设置
        loadUserSettings();
        initPlayer();
    }, 3500); // 等待加载动画完成（2500ms）+ 淡出动画（500ms）+ 完全隐藏（500ms）
}
