const KoaRouter = require("@koa/router");
const { getMessage,deleteMessage } = require("../controller/message.controller");


const loginRouter = new KoaRouter({ prefix: "/admin/message" });

// 获取评论
loginRouter.post("/getmessage", getMessage);
// 删除评论
loginRouter.post("/delmessage", deleteMessage)

module.exports = loginRouter;