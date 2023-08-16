const KoaRouter = require("@koa/router");
const {
  createLabel,
  delLabel,
  createArticle,
  queryAtricles,
  queryAtricle,
  getLabels,
  queryLabels,
  getArticles,
  delArticle,
  modifyArticle,
  getArticleMessage,
  getArticleDetail,
  deleteArtMessage,
} = require("../controller/articles.controller");
const { verifyToken } = require("../middleware/login.middleware");

const articleRouter = new KoaRouter({ prefix: "/admin" });

// 创建文章
articleRouter.post("/article/create", verifyToken, createArticle);
// 删除文章
articleRouter.post("/article/delete", delArticle);
// 修改文章
articleRouter.post("/article/modify", modifyArticle);
// 获取文章信息:count篇，偏移量offset，默认all
articleRouter.get("/articles", getArticles);
// 查询文章:根据标签id
articleRouter.get("/article/:labelId", queryAtricles);
// 查询某个文章是否存在，以及详细内容/article/exist  /queryisexistart
articleRouter.post("/article/exist", queryAtricle);
// 获取文章信息(未转换的)
articleRouter.post("/article/origin", getArticleDetail);

// 获取文章评论
articleRouter.post("/article/comment", getArticleMessage);
// 删除文章评论
articleRouter.post("/article/comment/delete", deleteArtMessage);

// 获取标签
articleRouter.get("/labels", getLabels);
// 创建标签
articleRouter.post("/label/create", createLabel);
// 删除标签
articleRouter.post("/label/delete", delLabel);
// 查询标签:根据文章id
articleRouter.post("/label/:articleId", queryLabels);

module.exports = articleRouter;
