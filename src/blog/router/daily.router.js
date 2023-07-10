
const KoaRouter = require("@koa/router");
const { commentDaily } = require("../controller/daily.controller");

const dailyRouter = new KoaRouter({ prefix: "/blog/daily" });

// 对日常进行评论
dailyRouter.post("/commentdaily", commentDaily)

module.exports = dailyRouter;
