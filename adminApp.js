var koa = require('koa');
var router = require('koa-router')();
var gzip = require('koa-gzip');
var fs = require('fs');
var path = require('path');
var serve = require('koa-static-cache');
var bodyParser = require('koa-bodyparser');
var app = new koa();
//koa压缩文件
app.use(gzip());
//post请求处理
app.use(bodyParser());

//添加渲染方法
app.use(async (ctx, next) => {
    ctx.render = function (path, params) {
        ctx.body = fs.readFileSync(`${__dirname}/view/${path}.html`, 'utf-8');
    };
    await next();
});


router.get('/', async ctx => ctx.redirect('welcome'));
router.get('/index', ctx => ctx.render('index'));
router.get('/welcome', ctx => ctx.render('welcome'));
router.get('/list/member', ctx => ctx.render('/list/member'));
router.get('/list/agent', ctx => ctx.render('/list/agent'));
router.get('/list/addMember', ctx => ctx.render('/list/addMember'));
router.get('/list/editMember', ctx => ctx.render('/list/editMember'));
router.get('/list/showMember', ctx => ctx.render('/list/showMember'));
router.get('/wechat/sets', ctx => ctx.render('/wechat/sets'));
// router.get('/wechat/sysWord', ctx => ctx.render('/wechat/sysWord'));
router.get('/wechat/text', ctx => ctx.render('/wechat/text'));
router.get('/device/edition', ctx => ctx.render('/device/edition'));
router.get('/device/list', ctx => ctx.render('/device/list'));
router.get('/device/add', ctx => ctx.render('/device/add'));
router.get('/device/install', ctx => ctx.render('/device/install'));
router.get('/device/installadd', ctx => ctx.render('/device/installadd'));
router.get('/device/edit', ctx => ctx.render('/device/edit'));
router.get('/device/room', ctx => ctx.render('/device/room'));
router.get('/device/oem', ctx => ctx.render('/device/oem'));
router.get('/device/sn', ctx => ctx.render('/device/sn'));
router.get('/device/roomList', ctx => ctx.render('/device/roomList'));
router.get('/device/addappliances', ctx => ctx.render('/device/addappliances'));
router.get('/version/yidai', ctx => ctx.render('/version/yidai'));
router.get('/version/erdai', ctx => ctx.render('/version/erdai'));
router.get('/version/add', ctx => ctx.render('/version/add'));
router.get('/version/edit', ctx => ctx.render('/version/edit'));
router.get('/doc/yunint1', ctx => ctx.render('/doc/doc1'));
router.get('/doc/yunint2', ctx => ctx.render('/doc/doc2'));
router.get('/doc/yunint3', ctx => ctx.render('/doc/doc3'));
router.get('/doc/yunint4', ctx => ctx.render('/doc/doc4'));
router.get('/doc/yunint5', ctx => ctx.render('/doc/doc5'));
router.get('/doc/yunint6', ctx => ctx.render('/doc/doc6'));
router.get('/doc/yunint7', ctx => ctx.render('/doc/doc7'));
router.get('/doc/yunint8', ctx => ctx.render('/doc/doc8'));



app.use(serve(path.join(__dirname, './resource')));
app.use(router.routes());
app.listen(3600, function () {
    console.log(`程序启动成功，3600`);
});
