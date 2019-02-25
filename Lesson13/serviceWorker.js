var CACHE_NAME = 'v1'
var urlToCache = [
  './ser.json',
  './package.json'
]
var netWork = true
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

self.addEventListener('message', function (event) {
  if(event.data == "online"){
    netWork = true
  }else if(event.data == "offline"){
    netWork = false
  }
  console.log(netWork)
});