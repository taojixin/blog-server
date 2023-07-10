// Http服务
const app = require("./app/index");
const { SERVER_PORT } = require("./config/server");
require("./utils/handle-error");

app.listen(SERVER_PORT, () => {
  console.log(`服务器在 ${process.env.SERVER_PORT} 端口启动成功~`);
});

// Https服务
// const fs = require("fs")
// const path = require("path")
// const https = require("https")
// const sslify = require("koa-sslify").default

// const app = require('./app/index')
// const {SERVER_PORT} = require("./config/server")
// require("./utils/handle-error")

// app.use(sslify)
// const options = {
//   key: fs.readFileSync(path.join(__dirname, './config/ssl/libertys.cn.key')),
//   cert: fs.readFileSync(path.join(__dirname, './config/ssl/libertys.cn_bundle.pem')),
// }

// https.createServer(options, app.callback()).listen(SERVER_PORT, () => {
//   console.log(`服务器在 ${process.env.SERVER_PORT} 端口启动成功~`);
// })
