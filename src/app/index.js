const Koa = require("koa");
const bodyParser = require("koa-bodyparser");
const cors = require("koa2-cors");
const ip = require("koa-ip");

const registerRoutersAdmin = require("../admin/router/index");
const registerRoutersBlog = require("../blog/router/index");

const { log, errLogger, resLogger } = require("../utils/log4js");

const app = new Koa();

// 处理跨域
app.use(cors());
// 解析数据到body
app.use(bodyParser({
  enableTypes: ['json', 'form'],
}));

// 通过log4js记录访问日志
app.use(async (ctx, next) => {
  const start = new Date();
  await next();
  const end = new Date() - start;
  // 生产环境下，使用中间件记录日志，使用console.log打印消息。
  // 其他环境下，使用log4js的console打印信息。
  if (true) {
    resLogger(ctx, end);
    // console.log(`${ctx.method} ${ctx.url} - ${end}ms`);
  } else {
    log.info(`${ctx.method} ${ctx.url} - ${end}ms`);
  }
});
// error-handling
app.on("error", (err, ctx) => {
  if (true) {
    errLogger(ctx, err);
    log.error(`${ctx.method} ${ctx.url}`, err);
  } else {
    console.error(`${ctx.method} ${ctx.url}`, err);
  }
});

// 自动化注册路由
registerRoutersAdmin(app);
registerRoutersBlog(app);
// 获取用户ip
app.use(ip("192.168.0.*"));



module.exports = app;
