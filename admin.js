var koa = require('koa');
var router = require('koa-router')();
var gzip = require('koa-gzip');
var jade = require("jade");
var path = require('path');
var serve = require('koa-static-cache');
var bodyParser = require('koa-bodyparser');
const crypto = require('crypto');
var app = new koa();
//koa压缩文件
app.use(gzip());
//post请求处理
app.use(bodyParser());

app.use(function* (next) {
    try {
        this.phoneType = this.header['user-agent'].toLowerCase();
    } catch (e) {
        this.phoneType = '';
    }

    yield next;
});

//添加渲染方法
app.use(async (ctx, next) => {

    ctx.render = function (path, params) {
        if (!params) {
            params = {};
        }
        if(this.phoneType && this.phoneType.match(/android/i) == 'android'){
            ctx.body = jade.renderFile(`${__dirname}/phone/${path}.jade`, params);
        }else if (this.phoneType && (this.phoneType.match(/iphone/i) == 'iphone' || this.phoneType.match(/ipad/i) == 'ipad')) {
            ctx.body = jade.renderFile(`${__dirname}/phone/${path}.jade`, params);
        }else{
            ctx.body = jade.renderFile(`${__dirname}/view/${path}.jade`, params);
        }

    };
    await next();
});


router.get('/', ctx => ctx.render('login'));
router.get('/welcome', ctx => ctx.render('login'));
router.get('/user/list', ctx => ctx.render('user/list'));
router.get('/user/add', ctx => ctx.render('user/add'));
router.get('/device/install', ctx => ctx.render('device/install'));
router.get('/device/installAdd', ctx => ctx.render('device/installAdd'));
router.get('/device/edit', ctx => ctx.render('device/edit'));
router.get('/device/list', ctx => ctx.render('device/list'));
router.get('/device/rooms', ctx => ctx.render('device/rooms'));
router.get('/version/erdai', ctx => ctx.render('version/erdai'));
router.get('/version/add', ctx => ctx.render('version/add'));

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
    console.log(`程序启动成功，当前监听3600端口`);
});
