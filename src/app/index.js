const Koa = require('koa')
const bodyParser = require("koa-bodyparser")
const cors = require("koa2-cors")

const registerRoutersAdmin = require('../admin/router/index')
const registerRoutersBlog = require("../blog/router/index")

const app = new Koa()

// 处理跨域
app.use(cors())
// 解析数据到body
app.use(bodyParser())
// 自动化注册路由
registerRoutersAdmin(app)
registerRoutersBlog(app)


module.exports = app