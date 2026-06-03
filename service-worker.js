// 缓存名称和版本
const CACHE_NAME = 'pf-player-cache-v2';
const CACHE_PREFIX = 'pf-player-';

// 需要缓存的核心静态资源
const STATIC_CACHE_URLS = [
  './',
  './index.html',
  './js/player.js',
  './js/logger.js',
  './manifest.json'
];

// 需要缓存的图标资源（使用现有图标）
const ICON_CACHE_URLS = [
  './assets/images/icons/volume-icon.png',
  './assets/images/icons/progress-icon.png',
  './assets/images/icons/speed-icon.png',
  './assets/images/PF-Logo.png'
];

// 合并所有需要缓存的资源
const ALL_CACHE_URLS = [
  ...STATIC_CACHE_URLS,
  ...ICON_CACHE_URLS
];

// 安装service worker
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        return cache.addAll(ALL_CACHE_URLS);
      })
      .then(() => self.skipWaiting())
  );
});

// 激活service worker并清理旧缓存
self.addEventListener('activate', (event) => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheWhitelist.indexOf(cacheName) === -1 && cacheName.startsWith(CACHE_PREFIX)) {
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

// 处理请求 - 使用缓存优先策略
self.addEventListener('fetch', (event) => {
  // 只缓存GET请求
  if (event.request.method !== 'GET') return;
  
  // 忽略chrome-extension和其他特殊协议
  if (event.request.url.startsWith('chrome-extension://') || 
      event.request.url.startsWith('moz-extension://') ||
      event.request.url.startsWith('data:')) {
    return;
  }

  event.respondWith(
    caches.match(event.request)
      .then((cachedResponse) => {
        // 如果缓存中有响应，直接返回
        if (cachedResponse) {
          return cachedResponse;
        }

        // 否则发起网络请求
        return fetch(event.request)
          .then((networkResponse) => {
            // 如果响应有效，缓存响应
            if (networkResponse && 
                networkResponse.status === 200 && 
                networkResponse.type === 'basic') {
              const responseToCache = networkResponse.clone();
              
              caches.open(CACHE_NAME)
                .then((cache) => {
                  const url = new URL(event.request.url);
                  // 缓存HTML、CSS、JavaScript、图片和音频文件
                  if (url.pathname.endsWith('.html') || 
                      url.pathname.endsWith('.js') || 
                      url.pathname.endsWith('.css') || 
                      url.pathname.endsWith('.png') || 
                      url.pathname.endsWith('.jpg') || 
                      url.pathname.endsWith('.jpeg') || 
                      url.pathname.endsWith('.gif') ||
                      url.pathname.endsWith('.mp3') ||
                      url.pathname.endsWith('.ogg') ||
                      url.pathname.endsWith('.wav')) {
                    cache.put(event.request, responseToCache);
                  }
                });
            }
            
            return networkResponse;
          })
          .catch((error) => {
            // 如果网络请求失败，返回缓存的主页（针对导航请求）
            if (event.request.mode === 'navigate') {
              return caches.match('./index.html');
            }
            // 对于其他请求，返回一个简单的离线响应
            return new Response('', {
              status: 503,
              statusText: 'Service Unavailable (Offline)',
              headers: { 'Content-Type': 'text/plain' }
            });
          });
      })
  );
});

// 处理消息事件
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
  if (event.data && event.data.type === 'CACHE_NEW_RESOURCES') {
    // 缓存新资源
    if (event.data.urls && Array.isArray(event.data.urls)) {
      caches.open(CACHE_NAME).then((cache) => {
        cache.addAll(event.data.urls);
      });
    }
  }
});

// 处理后台同步（用于同步播放列表）
self.addEventListener('sync', (event) => {
  if (event.tag === 'sync-playlist') {
    event.waitUntil(syncPlaylist());
  }
});

// 同步播放列表
async function syncPlaylist() {
  try {
    console.log('同步播放列表');
  } catch (error) {
    console.error('同步播放列表失败:', error);
  }
}