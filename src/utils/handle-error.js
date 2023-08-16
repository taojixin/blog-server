const app = require("../app");

const {
  NAME_OR_PASSWORD_IS_REQUIRED,
  NAME_IS_NOT_EXISTS,
  PASSWORD_IS_INCORRENT,
  UNAUTHORIZATION,
  PARAMETER_CANNOT_BE_EMPTY_OR_LONG,
} = require("../config/error");

app.on("error", (error, ctx) => {
  let code = 0;
  let message = "";
  switch (error) {
    case NAME_OR_PASSWORD_IS_REQUIRED:
      code = -1001;
      message = "用户名或密码不能为空！";
      break;
    case NAME_IS_NOT_EXISTS:
      code = -1002;
      message = "用户不存在!";
      break;
    case PASSWORD_IS_INCORRENT:
      code = -1003;
      message = "密码错误！";
      break;
    case UNAUTHORIZATION:
      code = 401;
      message = "无效的token或者token已过期！";
      break;
    case PARAMETER_CANNOT_BE_EMPTY_OR_LONG:
      code = -1006;
      message = "参数不能为空或过长！";
      break;
  }

  ctx.body = { code, message, data: {} };
});
