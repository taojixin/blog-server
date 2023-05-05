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
} = require("../controller/articles.controller");

const articleRouter = new KoaRouter({ prefix: "/admin/articles" });

// 获取标签
articleRouter.get("/getlabels", getLabels);
// 创建标签
articleRouter.post("/createlabel", createLabel);
// 删除标签
articleRouter.post("/dellabel", delLabel)

// 创建文章
articleRouter.post("/createarticle", createArticle);
// 获取文章信息:count篇，偏移量offset，默认all
articleRouter.post("/getarticles", getArticles);
// 删除文章
articleRouter.post("/delarticle", delArticle)
// 查询文章:根据标签id
articleRouter.post("/queryarticles", queryAtricles);
// 查询标签:根据文章id
articleRouter.post("/querylabel", queryLabels);
// 查询某个文章是否存在
articleRouter.post("/queryisexistart", queryAtricle)
// 修改文章
articleRouter.post("/modifyarticle", modifyArticle)

module.exports = articleRouter;
