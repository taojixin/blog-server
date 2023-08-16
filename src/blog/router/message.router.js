const KoaRouter = require("@koa/router");
const { makeMessage, getMessage } = require("../controller/message.controller");

const messageRouter = new KoaRouter({ prefix: "/blog" });

// 获取留言
messageRouter.post("/message/list", getMessage);
// 留言
messageRouter.post("/message/create", makeMessage);

module.exports = messageRouter;
