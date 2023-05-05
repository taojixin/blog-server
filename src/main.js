const app = require('./app/index')
const {SERVER_PORT} = require("./config/server")
require("./utils/handle-error")

app.listen(SERVER_PORT, () => {
  console.log(`服务器在 ${process.env.SERVER_PORT} 端口启动成功~`);
})