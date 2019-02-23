self.addEventListener('install', function(event) {
    console.log("install")
    caches.open("config").then( cache=>{
        cache.put(
            '/version',
            new Response('1.0.0', {status:200})
        )
    })
})