// 缓存名称
const CACHE_NAME = 'pf-player-cache-v1';

// 需要缓存的资源列表
const STATIC_CACHE_URLS = [
  './',
  './index.html',
  './js/player.js',
  './assets/images/icons/volume-icon.png',
  './assets/images/icons/progress-icon.png',
  './assets/images/icons/speed-icon.png',
  './manifest.json'
];

// 安装service worker
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('缓存已打开');
        return cache.addAll(STATIC_CACHE_URLS);
      })
      .then(() => self.skipWaiting())
  );
});

// 激活service worker
self.addEventListener('activate', (event) => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

// 处理请求
self.addEventListener('fetch', (event) => {
  // 只缓存GET请求
  if (event.request.method !== 'GET') return;
  
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // 如果缓存中有响应，则使用缓存
        if (response) {
          return response;
        }
        
        // 否则，发起网络请求
        return fetch(event.request)
          .then((networkResponse) => {
            // 如果响应有效，则缓存响应
            if (networkResponse && networkResponse.status === 200 && networkResponse.type === 'basic') {
              // 克隆响应，因为响应流只能使用一次
              const responseToCache = networkResponse.clone();
              
              // 缓存响应
              caches.open(CACHE_NAME)
                .then((cache) => {
                  // 缓存HTML、CSS、JavaScript文件和图片
                  const url = new URL(event.request.url);
                  if (url.pathname.endsWith('.html') || 
                      url.pathname.endsWith('.js') || 
                      url.pathname.endsWith('.css') || 
                      url.pathname.endsWith('.png') || 
                      url.pathname.endsWith('.jpg') || 
                      url.pathname.endsWith('.jpeg') || 
                      url.pathname.endsWith('.gif') ||
                      url.pathname.endsWith('.mp3')) {
                    cache.put(event.request, responseToCache);
                  }
                });
            }
            
            return networkResponse;
          })
          .catch((error) => {
            console.error('网络请求失败:', error);
            // 如果是音频请求失败，返回一个空响应
            if (event.request.url.endsWith('.mp3')) {
              return new Response('', {
                status: 404,
                statusText: 'Audio not available offline'
              });
            }
            // 如果是页面请求失败，返回缓存的主页
            if (event.request.mode === 'navigate') {
              return caches.match('./index.html');
            }
            return new Response('', {
              status: 404,
              statusText: 'Not available offline'
            });
          });
      })
  );
});

// 处理后台同步
self.addEventListener('sync', (event) => {
  if (event.tag === 'sync-playlist') {
    event.waitUntil(syncPlaylist());
  }
});

// 同步播放列表
async function syncPlaylist() {
  // 这里可以添加同步播放列表的逻辑
  console.log('同步播放列表');
}
