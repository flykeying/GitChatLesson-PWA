var CACHE_NAME = 'vesion201'
var urlToCache = [
  '/index.html',
  './assets/images/logo.png',
  './assets/style/index.css',
  './config.json'
]

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache) {
        return cache.addAll(urlToCache)
      })
      .catch(function(err){
      	console.log("err: " + err)
      })
  )
  sendMessage('installed')  
})
self.addEventListener('activate', function(event) {
  sendMessage("activate")
})

self.addEventListener('message', function (event) {
  sendMessage(event.data);
});


function sendMessage(str){
  self.clients.matchAll()
      .then(function (clients) {
          if (clients.length>0) {
              clients.forEach(function (client) {
                  client.postMessage(str);
              })
          }
      })
}

self.addEventListener('fetch', function(event) {
  console.log("fetch")
  event.respondWith(
    caches.match(event.request)
      .then(function(response) {
        if (response) {
          return response
        }
        return fetch(event.request)
      }
    )
  )
})


self.addEventListener('notificationclick', function(event) {
  sendMessage("关闭了消息");
});