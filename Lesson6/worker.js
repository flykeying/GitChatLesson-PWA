self.addEventListener('message', function (e) {
    let i = 0 
    setInterval(function(){
        i++
        self.postMessage(i);
    },1000)
}, false);