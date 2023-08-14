const KoaRouter = require("@koa/router");

const homeRouter = new KoaRouter({ prefix: "/blog/home" });

homeRouter.get("getRecommendArticle");

module.exports = homeRouter;
