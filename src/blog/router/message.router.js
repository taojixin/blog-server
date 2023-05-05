const KoaRouter = require("@koa/router");
const { makeMessage, getMessage } = require("../controller/message.controller");

const messageRouter = new KoaRouter({ prefix: "/blog/message" });

messageRouter.post("/getmsg", getMessage)
messageRouter.post("/makemsg", makeMessage);

module.exports = messageRouter;
