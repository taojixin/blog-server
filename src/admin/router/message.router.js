const KoaRouter = require("@koa/router");
const {
  getMessage,
  deleteMessage,
} = require("../controller/message.controller");

const loginRouter = new KoaRouter({ prefix: "/admin" });

// 获取留言
loginRouter.post("/message/list", getMessage);
// 删除留言
loginRouter.post("/message/delete", deleteMessage);

module.exports = loginRouter;
