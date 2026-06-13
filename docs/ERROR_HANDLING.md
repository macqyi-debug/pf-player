# PF-Player 错误处理机制说明

## 📋 概述

PF-Player v4.1.5 引入了完善的错误处理机制，提供统一的错误管理、分类和上报功能。

## 🎯 核心组件

### 1. 错误类型定义 (ErrorTypes)

```javascript
const ErrorTypes = {
    // 音频相关错误
    AUDIO_LOAD_ERROR: 'AUDIO_LOAD_ERROR',       // 音频加载失败
    AUDIO_PLAY_ERROR: 'AUDIO_PLAY_ERROR',       // 音频播放失败
    
    // 歌词相关错误
    LYRICS_LOAD_ERROR: 'LYRICS_LOAD_ERROR',     // 歌词加载失败
    LYRICS_PARSE_ERROR: 'LYRICS_PARSE_ERROR',   // 歌词解析失败
    
    // UI相关错误
    UI_RENDER_ERROR: 'UI_RENDER_ERROR',         // UI渲染失败
    
    // 存储相关错误
    STORAGE_LOAD_ERROR: 'STORAGE_LOAD_ERROR',   // 存储加载失败
    
    // 网络相关错误
    NETWORK_ERROR: 'NETWORK_ERROR'             // 网络错误
};
```

### 2. 错误严重级别 (ErrorSeverity)

```javascript
const ErrorSeverity = {
    LOW: 'LOW',       // 不影响核心功能
    MEDIUM: 'MEDIUM', // 影响部分功能
    HIGH: 'HIGH',     // 影响核心功能
    CRITICAL: 'CRITICAL' // 导致应用崩溃
};
```

### 3. 自定义错误类 (PlayerError)

```javascript
class PlayerError extends Error {
    constructor(type, message, severity, details) {
        super(message);
        this.type = type;        // 错误类型
        this.severity = severity; // 严重级别
        this.details = details;  // 详细信息
        this.timestamp = new Date().toISOString();
    }
}
```

## 🚀 快速使用

### 1. 记录错误

```javascript
try {
    // 可能出错的代码
    audio.play();
} catch (error) {
    ErrorHandler.log(error, { context: 'audio', action: 'play' });
}
```

### 2. 安全执行函数

```javascript
// 方式1: 同步函数
const result = ErrorHandler.safeExecute(() => {
    return someFunction();
}, {
    context: 'player',
    defaultValue: null,
    showTooltip: true
});

// 方式2: 异步函数
const result = await ErrorHandler.safeAsyncExecute(async () => {
    return await fetchAudio(url);
}, {
    context: 'audio',
    defaultValue: null
});
```

### 3. 创建自定义错误

```javascript
const error = ErrorHandler.createError(
    ErrorTypes.AUDIO_PLAY_ERROR,
    '播放失败，请检查网络连接',
    ErrorSeverity.MEDIUM,
    { songId: 123 }
);

ErrorHandler.log(error);
```

## 🎨 专用错误处理器

### 音频错误处理

```javascript
// 处理音频加载错误
try {
    audio.src = song.url;
    audio.load();
} catch (error) {
    const playerError = AudioErrorHandler.handleLoadError(error, song);
    if (playerError) {
        ErrorHandler.log(playerError);
        showNotification(playerError.message, 'error');
    }
}

// 处理音频播放错误
audio.play().catch(error => {
    const playerError = AudioErrorHandler.handlePlayError(error);
    if (playerError) {
        ErrorHandler.log(playerError);
    }
});
```

### 歌词错误处理

```javascript
// 处理歌词加载错误
try {
    const lyrics = await loadLyrics(song.id);
} catch (error) {
    const playerError = LyricsErrorHandler.handleLoadError(error, song);
    ErrorHandler.log(playerError);
    // 显示默认提示
    showLyricsHint('暂无歌词');
}

// 处理歌词解析错误
try {
    parseLyrics(lyricsText);
} catch (error) {
    const playerError = LyricsErrorHandler.handleParseError(error, lyricsText);
    ErrorHandler.log(playerError);
}
```

### UI错误处理

```javascript
// 处理UI渲染错误
try {
    updateUI(element);
} catch (error) {
    const playerError = UIErrorHandler.handleRenderError(error, 'player');
    ErrorHandler.log(playerError);
}

// 处理UI更新错误
try {
    updateProgress(currentTime);
} catch (error) {
    const playerError = UIErrorHandler.handleUpdateError(error, 'progress-bar');
    ErrorHandler.log(playerError);
}
```

## 📊 错误统计

### 获取所有错误

```javascript
const errors = ErrorHandler.getErrors();
console.log('Errors:', errors);
```

### 获取错误统计

```javascript
const stats = ErrorHandler.getStats();
console.log('Error stats:', stats);
// 输出: { AUDIO_LOAD_ERROR: 2, LYRICS_LOAD_ERROR: 1 }
```

### 清空错误记录

```javascript
ErrorHandler.clearErrors();
```

## ⚙️ 全局错误处理

初始化全局错误处理器（在应用启动时调用一次）：

```javascript
// 在 app.js 或 player.js 的开头
if (typeof setupGlobalErrorHandlers === 'function') {
    setupGlobalErrorHandlers();
}
```

这将自动捕获：
- 未处理的Promise rejection
- 全局JavaScript错误
- 资源加载错误（图片、音频等）

## 🛠️ 在现有代码中集成

### 1. 在 player.js 中使用

```javascript
// 原来的代码
try {
    audio.play();
} catch (error) {
    Logger.error('播放失败:', error);
    showTooltip('播放失败，请重试');
}

// 改进后
try {
    audio.play();
} catch (error) {
    const playerError = AudioErrorHandler.handlePlayError(error);
    if (playerError) {
        ErrorHandler.log(playerError);
        showTooltip(playerError.message);
    }
}
```

### 2. 使用安全执行包装

```javascript
// 原来的代码
function updateLyrics() {
    try {
        // 更新歌词逻辑
    } catch (error) {
        Logger.error('更新歌词失败:', error);
    }
}

// 改进后
function updateLyrics() {
    ErrorHandler.safeExecute(() => {
        // 更新歌词逻辑
    }, {
        context: 'lyrics',
        showTooltip: false
    });
}
```

## 📈 最佳实践

### 1. 区分错误严重级别

```javascript
// 严重错误 - 影响核心功能
throw ErrorHandler.createError(
    ErrorTypes.AUDIO_PLAY_ERROR,
    '无法播放音频',
    ErrorSeverity.HIGH
);

// 轻微错误 - 只记录不提示
ErrorHandler.log(error, { context: 'ui' });
```

### 2. 提供有意义的错误信息

```javascript
// ❌ 不好的
throw new Error('Error');

// ✅ 好的
throw ErrorHandler.createError(
    ErrorTypes.AUDIO_LOAD_ERROR,
    `无法加载歌曲: ${song.title} by ${song.artist}`,
    ErrorSeverity.HIGH,
    { songId: song.id, url: song.url }
);
```

### 3. 包含上下文信息

```javascript
ErrorHandler.log(error, {
    context: 'player',
    action: 'play',
    songId: currentSong.id,
    currentTime: audio.currentTime,
    playlistLength: playlist.length
});
```

## 🔮 未来扩展

### 1. 错误上报服务

可以集成Sentry、TrackJS等错误追踪服务：

```javascript
// 在 setupGlobalErrorHandlers 中添加
if (window.Sentry) {
    Sentry.init({ dsn: 'your-dsn' });
    window.addEventListener('error', (event) => {
        Sentry.captureException(event.error);
    });
}
```

### 2. 错误恢复机制

```javascript
async function playWithRetry(song, maxRetries = 3) {
    for (let i = 0; i < maxRetries; i++) {
        try {
            return await playAudio(song);
        } catch (error) {
            if (i === maxRetries - 1) {
                throw error;
            }
            await sleep(1000 * (i + 1)); // 指数退避
        }
    }
}
```

### 3. 错误用户反馈

```javascript
function showErrorFeedback(error) {
    const errorMessage = {
        [ErrorTypes.AUDIO_LOAD_ERROR]: '无法加载音频，请检查网络',
        [ErrorTypes.NETWORK_ERROR]: '网络连接失败，请检查网络设置',
        [ErrorTypes.LYRICS_LOAD_ERROR]: '暂无歌词'
    };
    
    showNotification(errorMessage[error.type] || '操作失败', 'error');
}
```

## 📝 版本历史

- **v4.1.5** (2026-06-06) - 初始错误处理模块
  - ✅ 统一的错误类型定义
  - ✅ 错误严重级别分类
  - ✅ 自定义错误类
  - ✅ 错误收集和统计
  - ✅ 专用错误处理器
  - ✅ 全局错误处理

---

*最后更新：2026-06-06*
