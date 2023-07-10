const KoaRouter = require("@koa/router")
const { commentArt,getArtMsg } = require("../controller/articles.controller")

const articlesRouter = new KoaRouter({prefix: "/blog/articles"})

// 获取文章评论
articlesRouter.post("/getartmsg", getArtMsg)
// 对文章进行评论
articlesRouter.post("/commentart", commentArt)
// 获取文章列表
articlesRouter.post("/")


module.exports = articlesRouter