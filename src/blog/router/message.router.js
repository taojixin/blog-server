const KoaRouter = require("@koa/router");
const { makeMessage, getMessage } = require("../controller/message.controller");

const messageRouter = new KoaRouter({ prefix: "/blog/message" });

// 获取评论
messageRouter.post("/getmsg", getMessage)
// 评论
messageRouter.post("/makemsg", makeMessage);

module.exports = messageRouter;
