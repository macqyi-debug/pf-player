/**
 * PF-Player 性能监控模块
 * 版本：v4.1.5
 * 
 * 提供性能指标收集、分析和报告功能
 */

const PerformanceMonitor = {
    // 性能指标存储
    metrics: {
        pageLoad: {},
        resourceLoad: {},
        functionExecution: {},
        animation: {},
        memory: {},
        network: {}
    },
    
    // 性能标记
    marks: {},
    
    // 性能测量
    measures: {},
    
    // FPS数据
    fpsData: [],
    lastFrameTime: 0,
    fpsUpdateInterval: null,
    
    // ==================== 页面加载性能 ====================
    
    /**
     * 记录页面加载时间
     */
    recordPageLoad() {
        if (window.performance && window.performance.timing) {
            const timing = window.performance.timing;
            
            this.metrics.pageLoad = {
                // DNS解析时间
                dns: timing.domainLookupEnd - timing.domainLookupStart,
                
                // TCP连接时间
                tcp: timing.connectEnd - timing.connectStart,
                
                // SSL连接时间
                ssl: timing.secureConnectionStart > 0 
                    ? timing.connectEnd - timing.secureConnectionStart 
                    : 0,
                
                // 请求时间
                request: timing.responseStart - timing.requestStart,
                
                // 响应时间
                response: timing.responseEnd - timing.responseStart,
                
                // DOM解析时间
                domParse: timing.domInteractive - timing.domLoading,
                
                // DOM ready时间
                domReady: timing.domContentLoadedEventEnd - timing.navigationStart,
                
                // 完全加载时间
                load: timing.loadEventEnd - timing.navigationStart,
                
                // 首次渲染时间
                firstPaint: this.getFirstPaint(),
                
                // 首次内容渲染时间
                firstContentfulPaint: this.getFirstContentfulPaint()
            };
            
            return this.metrics.pageLoad;
        }
        
        return null;
    },
    
    /**
     * 获取首次渲染时间
     */
    getFirstPaint() {
        const paintEntries = performance.getEntriesByType('paint');
        const firstPaint = paintEntries.find(entry => entry.name === 'first-paint');
        return firstPaint ? firstPaint.startTime : 0;
    },
    
    /**
     * 获取首次内容渲染时间
     */
    getFirstContentfulPaint() {
        const paintEntries = performance.getEntriesByType('paint');
        const firstContentfulPaint = paintEntries.find(
            entry => entry.name === 'first-contentful-paint'
        );
        return firstContentfulPaint ? firstContentfulPaint.startTime : 0;
    },
    
    // ==================== 资源加载性能 ====================
    
    /**
     * 记录资源加载时间
     */
    recordResourceLoad(url) {
        const resources = performance.getEntriesByType('resource');
        const resource = resources.find(r => r.name === url);
        
        if (resource) {
            this.metrics.resourceLoad[url] = {
                duration: resource.duration,
                size: resource.transferSize || 0,
                type: resource.initiatorType,
                dns: resource.domainLookupEnd - resource.domainLookupStart,
                tcp: resource.connectEnd - resource.connectStart,
                ttfb: resource.responseStart - resource.requestStart
            };
            
            return this.metrics.resourceLoad[url];
        }
        
        return null;
    },
    
    /**
     * 获取所有资源加载时间
     */
    getAllResources() {
        return performance.getEntriesByType('resource');
    },
    
    // ==================== 函数执行性能 ====================
    
    /**
     * 开始计时
     */
    startMeasure(name) {
        this.marks[name] = performance.now();
    },
    
    /**
     * 结束计时
     */
    endMeasure(name) {
        if (this.marks[name]) {
            const duration = performance.now() - this.marks[name];
            
            if (!this.metrics.functionExecution[name]) {
                this.metrics.functionExecution[name] = {
                    count: 0,
                    total: 0,
                    min: Infinity,
                    max: 0,
                    avg: 0
                };
            }
            
            const stats = this.metrics.functionExecution[name];
            stats.count++;
            stats.total += duration;
            stats.min = Math.min(stats.min, duration);
            stats.max = Math.max(stats.max, duration);
            stats.avg = stats.total / stats.count;
            
            // 保存最近的测量
            if (!this.metrics.functionExecution[name].recent) {
                this.metrics.functionExecution[name].recent = [];
            }
            this.metrics.functionExecution[name].recent.push(duration);
            if (this.metrics.functionExecution[name].recent.length > 10) {
                this.metrics.functionExecution[name].recent.shift();
            }
            
            delete this.marks[name];
            
            return duration;
        }
        
        return null;
    },
    
    /**
     * 测量函数执行时间（装饰器模式）
     */
    measure(name, fn) {
        return (...args) => {
            this.startMeasure(name);
            try {
                const result = fn(...args);
                this.endMeasure(name);
                return result;
            } catch (error) {
                this.endMeasure(name);
                throw error;
            }
        };
    },
    
    /**
     * 测量异步函数执行时间
     */
    async measureAsync(name, asyncFn) {
        this.startMeasure(name);
        try {
            const result = await asyncFn();
            this.endMeasure(name);
            return result;
        } catch (error) {
            this.endMeasure(name);
            throw error;
        }
    },
    
    // ==================== 动画性能 ====================
    
    /**
     * 开始FPS监控
     */
    startFPSMonitor(callback, interval = 1000) {
        if (this.fpsUpdateInterval) {
            return; // 已经在监控
        }
        
        const frame = (timestamp) => {
            if (this.lastFrameTime) {
                const delta = timestamp - this.lastFrameTime;
                const fps = 1000 / delta;
                
                this.fpsData.push(fps);
                
                // 只保留最近60帧的数据
                if (this.fpsData.length > 60) {
                    this.fpsData.shift();
                }
                
                // 计算平均FPS
                const avgFps = this.fpsData.reduce((a, b) => a + b, 0) / this.fpsData.length;
                
                this.metrics.animation.fps = {
                    current: fps,
                    average: avgFps,
                    min: Math.min(...this.fpsData),
                    max: Math.max(...this.fpsData)
                };
                
                if (callback) {
                    callback(this.metrics.animation.fps);
                }
            }
            
            this.lastFrameTime = timestamp;
            requestAnimationFrame(frame);
        };
        
        requestAnimationFrame(frame);
    },
    
    /**
     * 停止FPS监控
     */
    stopFPSMonitor() {
        if (this.fpsUpdateInterval) {
            clearInterval(this.fpsUpdateInterval);
            this.fpsUpdateInterval = null;
        }
    },
    
    /**
     * 测量动画帧率
     */
    measureAnimationFrame(name, updateFn) {
        return (timestamp) => {
            const startTime = performance.now();
            updateFn(timestamp);
            const duration = performance.now() - startTime;
            
            // 如果帧时间超过16.67ms（60fps），标记为卡顿
            if (duration > 16.67) {
                this.metrics.animation.jank = this.metrics.animation.jank || [];
                this.metrics.animation.jank.push({
                    timestamp,
                    duration,
                    exceededBy: duration - 16.67
                });
                
                // 只保留最近20次卡顿记录
                if (this.metrics.animation.jank.length > 20) {
                    this.metrics.animation.jank.shift();
                }
            }
            
            return duration;
        };
    },
    
    // ==================== 内存监控 ====================
    
    /**
     * 获取内存使用情况
     */
    recordMemory() {
        if (window.performance && window.performance.memory) {
            const memory = window.performance.memory;
            
            this.metrics.memory = {
                used: memory.usedJSHeapSize,
                total: memory.totalJSHeapSize,
                limit: memory.jsHeapSizeLimit,
                percentage: (memory.usedJSHeapSize / memory.jsHeapSizeLimit) * 100
            };
            
            return this.metrics.memory;
        }
        
        return null;
    },
    
    /**
     * 开始定期内存监控
     */
    startMemoryMonitor(callback, interval = 5000) {
        this.memoryInterval = setInterval(() => {
            this.recordMemory();
            if (callback) {
                callback(this.metrics.memory);
            }
        }, interval);
    },
    
    /**
     * 停止内存监控
     */
    stopMemoryMonitor() {
        if (this.memoryInterval) {
            clearInterval(this.memoryInterval);
            this.memoryInterval = null;
        }
    },
    
    // ==================== 网络请求监控 ====================
    
    /**
     * 监控网络请求
     */
    monitorNetwork() {
        const originalFetch = window.fetch;
        
        window.fetch = async (...args) => {
            const [url, options] = args;
            const startTime = performance.now();
            
            try {
                const response = await originalFetch(...args);
                const duration = performance.now() - startTime;
                
                this.metrics.network[url] = {
                    duration,
                    status: response.status,
                    ok: response.ok,
                    type: response.type,
                    timestamp: new Date().toISOString()
                };
                
                return response;
            } catch (error) {
                const duration = performance.now() - startTime;
                
                this.metrics.network[url] = {
                    duration,
                    error: error.message,
                    timestamp: new Date().toISOString()
                };
                
                throw error;
            }
        };
    },
    
    // ==================== 性能报告 ====================
    
    /**
     * 生成性能报告
     */
    generateReport() {
        return {
            timestamp: new Date().toISOString(),
            pageLoad: this.metrics.pageLoad,
            resourceLoad: this.metrics.resourceLoad,
            functionExecution: this.metrics.functionExecution,
            animation: this.metrics.animation,
            memory: this.metrics.memory,
            network: this.metrics.network,
            summary: this.getSummary()
        };
    },
    
    /**
     * 获取性能摘要
     */
    getSummary() {
        const summary = {
            performanceScore: 100,
            issues: []
        };
        
        // 检查页面加载时间
        if (this.metrics.pageLoad.load > 3000) {
            summary.issues.push({
                type: 'slow_page_load',
                message: `页面加载时间过长: ${this.metrics.pageLoad.load.toFixed(0)}ms`,
                severity: 'high'
            });
            summary.performanceScore -= 30;
        }
        
        // 检查首次渲染时间
        if (this.metrics.pageLoad.firstContentfulPaint > 2000) {
            summary.issues.push({
                type: 'slow_first_paint',
                message: `首次内容渲染时间过长: ${this.metrics.pageLoad.firstContentfulPaint.toFixed(0)}ms`,
                severity: 'medium'
            });
            summary.performanceScore -= 20;
        }
        
        // 检查FPS
        if (this.metrics.animation.fps && this.metrics.animation.fps.average < 50) {
            summary.issues.push({
                type: 'low_fps',
                message: `平均帧率过低: ${this.metrics.animation.fps.average.toFixed(1)}fps`,
                severity: 'medium'
            });
            summary.performanceScore -= 20;
        }
        
        // 检查内存使用
        if (this.metrics.memory && this.metrics.memory.percentage > 80) {
            summary.issues.push({
                type: 'high_memory_usage',
                message: `内存使用率过高: ${this.metrics.memory.percentage.toFixed(1)}%`,
                severity: 'high'
            });
            summary.performanceScore -= 25;
        }
        
        // 检查慢函数
        Object.entries(this.metrics.functionExecution).forEach(([name, stats]) => {
            if (stats.avg > 100) {
                summary.issues.push({
                    type: 'slow_function',
                    message: `函数执行缓慢: ${name} (平均 ${stats.avg.toFixed(2)}ms)`,
                    severity: 'low'
                });
                summary.performanceScore -= 5;
            }
        });
        
        // 确保分数不低于0
        summary.performanceScore = Math.max(0, summary.performanceScore);
        
        return summary;
    },
    
    /**
     * 打印性能报告到控制台
     */
    printReport() {
        const report = this.generateReport();
        
        console.group('📊 PF-Player Performance Report');
        console.log('生成时间:', report.timestamp);
        
        console.group('页面加载');
        console.table(report.pageLoad);
        console.groupEnd();
        
        if (Object.keys(report.functionExecution).length > 0) {
            console.group('函数执行统计');
            console.table(report.functionExecution);
            console.groupEnd();
        }
        
        if (report.animation.fps) {
            console.group('动画性能');
            console.log('FPS:', report.animation.fps);
            console.groupEnd();
        }
        
        if (report.memory) {
            console.group('内存使用');
            console.table(report.memory);
            console.groupEnd();
        }
        
        console.group('性能评分');
        console.log('评分:', report.summary.performanceScore);
        if (report.summary.issues.length > 0) {
            console.log('问题:');
            report.summary.issues.forEach(issue => {
                console.warn(`  - [${issue.severity}] ${issue.message}`);
            });
        }
        console.groupEnd();
        
        console.groupEnd();
    },
    
    // ==================== 工具方法 ====================
    
    /**
     * 清空所有性能数据
     */
    clear() {
        this.metrics = {
            pageLoad: {},
            resourceLoad: {},
            functionExecution: {},
            animation: {},
            memory: {},
            network: {}
        };
        this.marks = {};
        this.measures = {};
        this.fpsData = [];
        this.lastFrameTime = 0;
    },
    
    /**
     * 获取所有指标
     */
    getMetrics() {
        return { ...this.metrics };
    }
};

// ==================== 导出模块 ====================

if (typeof window !== 'undefined') {
    window.PerformanceMonitor = PerformanceMonitor;
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = PerformanceMonitor;
}
