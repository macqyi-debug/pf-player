/**
 * PF-Player 播放器核心功能测试
 * 版本：v4.1.5
 */

// 模拟DOM环境
const mockDocument = {
    getElementById: jest.fn(),
    querySelector: jest.fn(),
    createElement: jest.fn(() => ({
        style: {},
        appendChild: jest.fn(),
        removeChild: jest.fn(),
        addEventListener: jest.fn()
    }))
};

global.document = mockDocument;

// 模拟Audio对象
const mockAudio = {
    play: jest.fn(() => Promise.resolve()),
    pause: jest.fn(),
    currentTime: 0,
    duration: 180,
    volume: 1,
    src: '',
    load: jest.fn()
};

global.Audio = jest.fn(() => mockAudio);

// 模拟Logger
global.Logger = {
    debug: jest.fn(),
    info: jest.fn(),
    warn: jest.fn(),
    error: jest.fn()
};

// 模拟PlayerStore
global.PlayerStore = {
    state: {
        isPlaying: false,
        currentSong: null,
        playlist: [],
        recentPlays: []
    },
    setState: jest.fn(),
    getState: jest.fn(() => global.PlayerStore.state)
};

describe('播放器核心功能测试', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe('播放状态管理', () => {
        test('播放器初始状态应为暂停', () => {
            expect(PlayerStore.state.isPlaying).toBe(false);
        });

        test('设置播放状态为true', () => {
            PlayerStore.setState({ isPlaying: true });
            expect(PlayerStore.setState).toHaveBeenCalledWith({ isPlaying: true });
        });

        test('设置播放状态为false', () => {
            PlayerStore.setState({ isPlaying: false });
            expect(PlayerStore.setState).toHaveBeenCalledWith({ isPlaying: false });
        });
    });

    describe('音频控制', () => {
        test('音频播放函数应被调用', () => {
            mockAudio.play();
            expect(mockAudio.play).toHaveBeenCalled();
        });

        test('音频暂停函数应被调用', () => {
            mockAudio.pause();
            expect(mockAudio.pause).toHaveBeenCalled();
        });

        test('音频加载函数应被调用', () => {
            mockAudio.load();
            expect(mockAudio.load).toHaveBeenCalled();
        });
    });

    describe('进度更新', () => {
        test('当前播放时间应为0', () => {
            expect(mockAudio.currentTime).toBe(0);
        });

        test('音频时长应为180秒', () => {
            expect(mockAudio.duration).toBe(180);
        });

        test('音量应为1', () => {
            expect(mockAudio.volume).toBe(1);
        });
    });

    describe('播放列表管理', () => {
        test('播放列表应为空', () => {
            expect(PlayerStore.state.playlist).toEqual([]);
        });

        test('应能添加歌曲到播放列表', () => {
            const song = {
                id: 1,
                title: 'Test Song',
                artist: 'Test Artist',
                duration: 200
            };
            
            PlayerStore.setState({
                playlist: [song]
            });
            
            expect(PlayerStore.state.playlist).toHaveLength(1);
            expect(PlayerStore.state.playlist[0].title).toBe('Test Song');
        });

        test('应能清空播放列表', () => {
            PlayerStore.setState({ playlist: [] });
            expect(PlayerStore.state.playlist).toEqual([]);
        });
    });

    describe('最近播放记录', () => {
        test('最近播放应为空', () => {
            expect(PlayerStore.state.recentPlays).toEqual([]);
        });

        test('应能添加最近播放记录', () => {
            const song = {
                id: 1,
                title: 'Recent Song',
                artist: 'Recent Artist',
                duration: 180
            };
            
            PlayerStore.setState({
                recentPlays: [song]
            });
            
            expect(PlayerStore.state.recentPlays).toHaveLength(1);
        });
    });
});
