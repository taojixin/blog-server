const jwt = require("jsonwebtoken")
const {PRIVATE_KEY} = require("../../config/screct")

class LoginController {
  sign(ctx, next) {
    const {id, name} = ctx.user
    const token = jwt.sign({id,name}, PRIVATE_KEY,{
      expiresIn: 60 * 60 * 24,
      algorithm: "RS256"
    })
    ctx.body = {
      code: 0,
      data: {
        id,name,token
      }
    }
  }

  isok(ctx, next) {
    ctx.body = {
      code: 0,
      data: {
        message: "token验证通过"
      }
    }
  }
}

module.exports = new LoginController()