const {
  saveMessage,
  getSomeMessage,
  getTotal,
} = require("../services/message.service");

class MessageController {
  async getMessage(ctx, next) {
    const { count = 10, offset = 0 } = ctx.request.body;
    const result = await getSomeMessage(count, offset);
    const total = await getTotal()
    ctx.body = {
      code: 200,
      data: {
        total: total.total,
        result
      }
    };
  }
  async makeMessage(ctx, next) {
    const { name, content, qq, reply, replyId } = ctx.request.body;
    console.log(name, content, qq, reply, replyId);
    const result = await saveMessage(name, content, qq, reply, replyId);
    ctx.body = {
      code: 200,
      data: {
        message: "success",
        result,
      },
    };
  }
}

module.exports = new MessageController();
