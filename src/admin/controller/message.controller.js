const {
  getMessageSer,
  getMessageTotalSer,
  deleteMessageSer,
} = require("../services/message.service");

class MessageController {
  // 获取评论
  async getMessage(ctx, next) {
    const { count = 10, offset } = ctx.request.body;
    const result = await getMessageSer(count, offset);
    const total = await getMessageTotalSer();
    ctx.body = {
      code: 0,
      data: {
        total: total.total,
        messageList: result,
      },
    };
  }
  // 删除评论
  async deleteMessage(ctx, next) {
    const { messageId } = ctx.request.body;
    await deleteMessageSer(messageId)
      .then((res) => {
        ctx.body = {
          code: 0,
          data: res,
        };
      })
      .catch((err) => {
        ctx.body = {
          code: -1,
          data: err,
        };
      });
  }
}

module.exports = new MessageController();
