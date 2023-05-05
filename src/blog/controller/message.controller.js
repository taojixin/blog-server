const {
  saveMessage,
  getSomeMessage,
} = require("../services/message.service");

class MessageController {
  async getMessage(ctx, next) {
    const { count = 10, offset = 0 } = ctx.request.body;
    const result = await getSomeMessage(count, offset);
    ctx.body = {
      code: 200,
      data: {
        result
      }
    };
  }
  async makeMessage(ctx, next) {
    const { name, content, email, reply, replyId } = ctx.request.body;
    const result = await saveMessage(name, content, email, reply, replyId);
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
