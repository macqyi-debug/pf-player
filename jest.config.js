/**
 * PF-Player Jest 配置文件
 * 版本：v4.1.5
 */

module.exports = {
    // 测试环境
    testEnvironment: 'jsdom',
    
    // 测试文件匹配模式
    testMatch: [
        '**/tests/**/*.test.js'
    ],
    
    // 忽略的文件
    testPathIgnorePatterns: [
        '/node_modules/'
    ],
    
    // 代码覆盖率收集
    collectCoverageFrom: [
        'js/**/*.js',
        '!js/**/*.test.js',
        '!js/**/*.mod.js',
        '!**/node_modules/**'
    ],
    
    // 覆盖率阈值
    coverageThreshold: {
        global: {
            branches: 30,
            functions: 30,
            lines: 30,
            statements: 30
        }
    },
    
    // 覆盖率报告格式
    coverageReporters: ['text', 'lcov', 'html'],
    
    // 每次测试后清除所有mock
    clearMocks: true,
    
    // 启用测试计时器
    timers: 'real',
    
    // 测试超时时间（毫秒）
    testTimeout: 10000,
    
    // 详细输出
    verbose: true
};
