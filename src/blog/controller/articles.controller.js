const { commentArticle,getSomeArtMsg,getTotal } = require("../services/articles.service");

class ArticlesController {
  async commentArt(ctx, next) {
    const { name, qq, content, articleId, reply, replyId } = ctx.request.body;
    const result = await commentArticle(
      name,
      qq,
      content,
      articleId,
      reply,
      replyId
    );
    ctx.body = {
      code: 200,
      data: {
        result
      }
    };
  }

  async getArtMsg(ctx, next) {
    const {articleId, count = 10, offset = 0} = ctx.request.body;
    const result = await getSomeArtMsg(articleId, count, offset);
    const total = await getTotal(articleId)
    ctx.body = {
      code: 200,
      data: {
        total: total.total,
        result
      }
    }
  }
}

module.exports = new ArticlesController();
