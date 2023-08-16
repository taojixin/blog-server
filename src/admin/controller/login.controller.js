const jwt = require("jsonwebtoken");
const { PRIVATE_KEY } = require("../../config/screct");
const { resultBody } = require("../../utils/resultBody");

class LoginController {
  sign(ctx, next) {
    const { id, name } = ctx.user;
    const token = jwt.sign({ id, name }, PRIVATE_KEY, {
      expiresIn: 60 * 60 * 24,
      algorithm: "RS256",
    });
    ctx.body = resultBody({
      id,
      name,
      token,
    });
  }

  isok(ctx, next) {
    ctx.body = resultBody({}, 200, "token验证通过");
  }
}

module.exports = new LoginController();
