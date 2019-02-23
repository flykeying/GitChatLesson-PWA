var CACHE_NAME = 'vesion201'
var urlToCache = [
  '/index.html',
  './assets/images/logo.png',
  './fetch.json'
]

self.addEventListener('install', function(event) {
  console.log("install")
  
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache) {
        return cache.addAll(urlToCache)
      })
      .catch(function(err){
      	console.log("err: " + err)
      })
  )
})
self.addEventListener('activate', function(event) {
    console.log("activate")
})

self.addEventListener('message', function (event) {
    console.log(event.data); // 输出：'hello world'
    sendMessage('ok')
});


function sendMessage(str){
    self.clients.matchAll()
        .then(function (clients) {
            if (clients.length>0) {
                clients.forEach(function (client) {
                    console.log(client)
                    client.postMessage(str);
                })
            }
        })
}




self.addEventListener('fetch', function(event) {
  console.log("fetch")
//   var myActiveWorker = event.activeWorker;
//   console.log(myActiveWorker)
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