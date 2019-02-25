const Koa = require('koa'),
    static = require("koa-static"),
    path = require('path'),
    router = require('koa-router')(),
    app = new Koa()



router.get('/version', async (ctx, next) => {
    console.log(ctx.request.query.time)
    ctx.response.type = JSON
    ctx.response.body = {"version":"1.0.1"}
})

self.addEventListener('online', function (event) {
    console.log(event.data); 
});

app.use(static(__dirname+ "/"))
   .use(router.routes())
   .listen(9090,function(){
       console.log("http://loaclhost:9090")
    });

