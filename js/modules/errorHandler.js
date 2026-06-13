/**
 * PF-Player 错误处理模块
 * 版本：v4.1.5
 * 
 * 提供统一的错误处理、错误类型定义和错误上报机制
 */

// ==================== 错误类型定义 ====================

const ErrorTypes = {
    // 音频相关错误
    AUDIO_LOAD_ERROR: 'AUDIO_LOAD_ERROR',           // 音频加载失败
    AUDIO_PLAY_ERROR: 'AUDIO_PLAY_ERROR',             // 音频播放失败
    AUDIO_PAUSE_ERROR: 'AUDIO_PAUSE_ERROR',           // 音频暂停失败
    
    // 歌词相关错误
    LYRICS_LOAD_ERROR: 'LYRICS_LOAD_ERROR',           // 歌词加载失败
    LYRICS_PARSE_ERROR: 'LYRICS_PARSE_ERROR',         // 歌词解析失败
    LYRICS_SYNC_ERROR: 'LYRICS_SYNC_ERROR',           // 歌词同步失败
    
    // 播放列表相关错误
    PLAYLIST_LOAD_ERROR: 'PLAYLIST_LOAD_ERROR',       // 播放列表加载失败
    PLAYLIST_ADD_ERROR: 'PLAYLIST_ADD_ERROR',         // 添加歌曲到播放列表失败
    PLAYLIST_REMOVE_ERROR: 'PLAYLIST_REMOVE_ERROR',   // 从播放列表移除歌曲失败
    
    // UI相关错误
    UI_RENDER_ERROR: 'UI_RENDER_ERROR',               // UI渲染失败
    UI_UPDATE_ERROR: 'UI_UPDATE_ERROR',                 // UI更新失败
    UI_INTERACTION_ERROR: 'UI_INTERACTION_ERROR',      // UI交互失败
    
    // 存储相关错误
    STORAGE_LOAD_ERROR: 'STORAGE_LOAD_ERROR',         // 存储加载失败
    STORAGE_SAVE_ERROR: 'STORAGE_SAVE_ERROR',         // 存储保存失败
    
    // 网络相关错误
    NETWORK_ERROR: 'NETWORK_ERROR',                   // 网络错误
    NETWORK_TIMEOUT: 'NETWORK_TIMEOUT',               // 网络超时
    
    // 未知错误
    UNKNOWN_ERROR: 'UNKNOWN_ERROR'                    // 未知错误
};

// ==================== 错误严重级别 ====================

const ErrorSeverity = {
    LOW: 'LOW',       // 低 - 不影响核心功能
    MEDIUM: 'MEDIUM', // 中 - 影响部分功能
    HIGH: 'HIGH',     // 高 - 影响核心功能
    CRITICAL: 'CRITICAL' // 严重 - 导致应用崩溃
};

// ==================== 错误处理类 ====================

class PlayerError extends Error {
    constructor(type, message, severity = ErrorSeverity.MEDIUM, details = {}) {
        super(message);
        this.name = 'PlayerError';
        this.type = type;
        this.severity = severity;
        this.details = details;
        this.timestamp = new Date().toISOString();
    }
    
    toJSON() {
        return {
            name: this.name,
            type: this.type,
            message: this.message,
            severity: this.severity,
            details: this.details,
            timestamp: this.timestamp,
            stack: this.stack
        };
    }
}

// ==================== 错误处理工具 ====================

const ErrorHandler = {
    // 错误收集器
    errors: [],
    
    // 最大错误收集数量
    maxErrors: 100,
    
    /**
     * 记录错误
     */
    log(error, context = {}) {
        const errorInfo = {
            error: error instanceof Error ? {
                name: error.name,
                message: error.message,
                stack: error.stack
            } : error,
            context,
            timestamp: new Date().toISOString()
        };
        
        // 添加到错误收集器
        this.errors.push(errorInfo);
        
        // 限制错误数量
        if (this.errors.length > this.maxErrors) {
            this.errors.shift();
        }
        
        // 输出到控制台
        console.error('❌ Player Error:', errorInfo);
        
        // 如果是严重错误，触发错误上报
        if (error instanceof PlayerError && error.severity === ErrorSeverity.CRITICAL) {
            this.report(error);
        }
    },
    
    /**
     * 安全执行函数
     * @param {Function} fn - 要执行的函数
     * @param {Object} options - 配置选项
     * @returns {*} 函数返回值
     */
    safeExecute(fn, options = {}) {
        const {
            context = 'unknown',
            defaultValue = null,
            showTooltip = true,
            logError = true
        } = options;
        
        try {
            return fn();
        } catch (error) {
            if (logError) {
                this.log(error, { context, action: 'safeExecute' });
            }
            
            if (showTooltip && typeof showNotification === 'function') {
                showNotification(`操作失败: ${error.message}`, 'error');
            }
            
            return defaultValue;
        }
    },
    
    /**
     * 异步安全执行
     * @param {AsyncFunction} asyncFn - 异步函数
     * @param {Object} options - 配置选项
     * @returns {Promise<*>} 函数返回值
     */
    async safeAsyncExecute(asyncFn, options = {}) {
        const {
            context = 'unknown',
            defaultValue = null,
            showTooltip = true,
            logError = true
        } = options;
        
        try {
            return await asyncFn();
        } catch (error) {
            if (logError) {
                this.log(error, { context, action: 'safeAsyncExecute' });
            }
            
            if (showTooltip && typeof showNotification === 'function') {
                showNotification(`操作失败: ${error.message}`, 'error');
            }
            
            return defaultValue;
        }
    },
    
    /**
     * 创建播放器错误
     */
    createError(type, message, severity = ErrorSeverity.MEDIUM, details = {}) {
        return new PlayerError(type, message, severity, details);
    },
    
    /**
     * 上报错误（可以扩展为发送到服务器）
     */
    report(error) {
        // 可以在此处添加错误上报逻辑
        console.warn('🚨 Error reported:', error);
        
        // 示例：发送到错误追踪服务
        // if (window.Sentry) {
        //     Sentry.captureException(error);
        // }
    },
    
    /**
     * 获取所有错误
     */
    getErrors() {
        return [...this.errors];
    },
    
    /**
     * 清空错误记录
     */
    clearErrors() {
        this.errors = [];
    },
    
    /**
     * 获取错误统计
     */
    getStats() {
        const stats = {};
        this.errors.forEach(err => {
            const type = err.error?.type || 'UNKNOWN';
            stats[type] = (stats[type] || 0) + 1;
        });
        return stats;
    }
};

// ==================== 音频错误处理 ====================

const AudioErrorHandler = {
    /**
     * 处理音频加载错误
     */
    handleLoadError(error, song) {
        ErrorHandler.log(error, {
            context: 'audio',
            action: 'load',
            song: song?.id
        });
        
        return ErrorHandler.createError(
            ErrorTypes.AUDIO_LOAD_ERROR,
            `无法加载音频: ${song?.title || '未知歌曲'}`,
            ErrorSeverity.HIGH,
            { songId: song?.id }
        );
    },
    
    /**
     * 处理音频播放错误
     */
    handlePlayError(error) {
        // 忽略 AbortError（播放被暂停打断）
        if (error.name === 'AbortError') {
            return null;
        }
        
        ErrorHandler.log(error, {
            context: 'audio',
            action: 'play'
        });
        
        return ErrorHandler.createError(
            ErrorTypes.AUDIO_PLAY_ERROR,
            '播放失败，请检查网络连接',
            ErrorSeverity.MEDIUM,
            { originalError: error.message }
        );
    },
    
    /**
     * 处理音频时间更新错误
     */
    handleTimeUpdateError(error) {
        ErrorHandler.log(error, {
            context: 'audio',
            action: 'timeUpdate'
        });
    }
};

// ==================== 歌词错误处理 ====================

const LyricsErrorHandler = {
    /**
     * 处理歌词加载错误
     */
    handleLoadError(error, song) {
        ErrorHandler.log(error, {
            context: 'lyrics',
            action: 'load',
            song: song?.id
        });
        
        return ErrorHandler.createError(
            ErrorTypes.LYRICS_LOAD_ERROR,
            `无法加载歌词: ${song?.title || '未知歌曲'}`,
            ErrorSeverity.LOW,
            { songId: song?.id }
        );
    },
    
    /**
     * 处理歌词解析错误
     */
    handleParseError(error, lyricsText) {
        ErrorHandler.log(error, {
            context: 'lyrics',
            action: 'parse',
            lyricsLength: lyricsText?.length
        });
        
        return ErrorHandler.createError(
            ErrorTypes.LYRICS_PARSE_ERROR,
            '歌词格式解析失败',
            ErrorSeverity.MEDIUM,
            { preview: lyricsText?.substring(0, 100) }
        );
    },
    
    /**
     * 处理歌词同步错误
     */
    handleSyncError(error) {
        ErrorHandler.log(error, {
            context: 'lyrics',
            action: 'sync'
        });
        
        return ErrorHandler.createError(
            ErrorTypes.LYRICS_SYNC_ERROR,
            '歌词同步失败',
            ErrorSeverity.LOW
        );
    }
};

// ==================== UI错误处理 ====================

const UIErrorHandler = {
    /**
     * 处理UI渲染错误
     */
    handleRenderError(error, component) {
        ErrorHandler.log(error, {
            context: 'ui',
            action: 'render',
            component
        });
        
        return ErrorHandler.createError(
            ErrorTypes.UI_RENDER_ERROR,
            `组件渲染失败: ${component}`,
            ErrorSeverity.MEDIUM,
            { component }
        );
    },
    
    /**
     * 处理UI更新错误
     */
    handleUpdateError(error, elementId) {
        ErrorHandler.log(error, {
            context: 'ui',
            action: 'update',
            elementId
        });
        
        return ErrorHandler.createError(
            ErrorTypes.UI_UPDATE_ERROR,
            `UI更新失败: ${elementId}`,
            ErrorSeverity.LOW,
            { elementId }
        );
    },
    
    /**
     * 处理UI交互错误
     */
    handleInteractionError(error, action) {
        ErrorHandler.log(error, {
            context: 'ui',
            action: 'interaction',
            interaction: action
        });
        
        return ErrorHandler.createError(
            ErrorTypes.UI_INTERACTION_ERROR,
            `交互操作失败: ${action}`,
            ErrorSeverity.LOW,
            { action }
        );
    }
};

// ==================== 全局错误处理 ====================

function setupGlobalErrorHandlers() {
    // 捕获未处理的Promise rejection
    window.addEventListener('unhandledrejection', (event) => {
        ErrorHandler.log(event.reason, {
            context: 'global',
            action: 'unhandledRejection'
        });
    });
    
    // 捕获全局JavaScript错误
    window.addEventListener('error', (event) => {
        ErrorHandler.log(event.error, {
            context: 'global',
            action: 'uncaughtError',
            filename: event.filename,
            lineno: event.lineno
        });
    });
    
    // 捕获资源加载错误
    window.addEventListener('error', (event) => {
        if (event.target !== window) {
            ErrorHandler.log(new Error(`Resource load failed: ${event.target.src || event.target.href}`), {
                context: 'global',
                action: 'resourceLoadError',
                resource: event.target.tagName
            });
        }
    }, true);
}

// ==================== 导出模块 ====================

// 如果是浏览器环境
if (typeof window !== 'undefined') {
    window.ErrorHandler = ErrorHandler;
    window.ErrorTypes = ErrorTypes;
    window.ErrorSeverity = ErrorSeverity;
    window.PlayerError = PlayerError;
    window.AudioErrorHandler = AudioErrorHandler;
    window.LyricsErrorHandler = LyricsErrorHandler;
    window.UIErrorHandler = UIErrorHandler;
    window.setupGlobalErrorHandlers = setupGlobalErrorHandlers;
}

// 导出模块
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        ErrorHandler,
        ErrorTypes,
        ErrorSeverity,
        PlayerError,
        AudioErrorHandler,
        LyricsErrorHandler,
        UIErrorHandler,
        setupGlobalErrorHandlers
    };
}
