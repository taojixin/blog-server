const KoaRouter = require("@koa/router")
const { getClientIp } = require("../controller/other.controller")

const otherRouter = new KoaRouter({prefix: "/blog/other"})

// 获取用户ip
otherRouter.get("/getclientid", getClientIp)

module.exports = otherRouter