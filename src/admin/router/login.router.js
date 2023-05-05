const KoaRouter = require("@koa/router");
const { verifyLogin, verifyAuth } = require("../middleware/login.middleware");
const { sign, isok } = require("../controller/login.controller");

const loginRouter = new KoaRouter({ prefix: "/admin/login" });

loginRouter.post("/", verifyLogin, sign);
loginRouter.post("/verifytoken", verifyAuth, isok);

module.exports = loginRouter;
