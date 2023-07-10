const { commentDailySer } = require("../services/daily.service");

class DailyController {
  // 评论日常
  async commentDaily(ctx, next) {
    const { name, content, qq, sharingId, reply, replyId } = ctx.request.body;
    console.log(name, content, qq, sharingId, reply, replyId);
    const res = await commentDailySer(
      name,
      content,
      qq,
      sharingId,
      reply,
      replyId
    );
    ctx.body = {
      code: 0,
      data: {
        result: res
      }
    }
  }
}

module.exports = new DailyController();
