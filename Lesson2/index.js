const Koa = require('koa');
const app = new Koa();

app.use(async ctx => {
    ctx.set('Cache-Control', "public, max-age=31536000")
    ctx.response.type = "text"
    ctx.response.body = "Hello World"
});

app.listen(3000);