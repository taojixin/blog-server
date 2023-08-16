const {
  NAME_OR_PASSWORD_IS_REQUIRED,
  NAME_IS_NOT_EXISTS,
  PASSWORD_IS_INCORRENT,
  UNAUTHORIZATION,
} = require("../../config/error");
const { PUBLIC_KEY } = require("../../config/screct");
const userService = require("../services/user.service");
const jwt = require("jsonwebtoken");

const verifyLogin = async (ctx, next) => {
  // 1.验证是否为空
  const { name, password } = ctx.request.body;
  if (!name || !password) {
    return ctx.app.emit("error", NAME_OR_PASSWORD_IS_REQUIRED, ctx);
  }
  // 2.查询该用户是否在数据库中
  const users = await userService.findUserByName(name);
  const user = users[0];
  if (!user) {
    return ctx.app.emit("error", NAME_IS_NOT_EXISTS, ctx);
  }
  // 3.验证密码是否正确
  if (user.password !== password) {
    return ctx.app.emit("error", PASSWORD_IS_INCORRENT, ctx);
  }
  // 4.将user信息保存到ctx中，下一个中间件会用到
  ctx.user = user;
  await next();
};

// token验证
const verifyToken = async (ctx, next) => {
  const authorization = ctx.headers.authorization;
  if (!authorization) {
    return ctx.app.emit("error", UNAUTHORIZATION, ctx);
  }
  const token = authorization.replace("Bearer ", "");
  try {
    const result = jwt.verify(token, PUBLIC_KEY, {
      algorithms: ["RS256"],
    });
    ctx.user = result;
    await next();
  } catch (error) {
    console.log(error);
    return ctx.app.emit("error", UNAUTHORIZATION, ctx);
  }
};

// 验证权限
const verifyAuth = async (ctx, next) => {};

module.exports = {
  verifyLogin,
  verifyToken,
};
