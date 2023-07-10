const connection = require("../../app/database");

class DailyService {
  // 评论日常
  async commentDailySer(name, content, qq, sharing_id, reply, replyId) {
    // reply若为真则是 为某一条评论进行评论，replyId为评论的id，默认为0则是对文章进行评论
    let repId = 0;
    if (reply) {
      repId = replyId;
    }
    const statement =
      "insert into daily_message (name,qq,content,sharing_id,replyId) values (?,?,?,?,?);";
    const [result] = await connection.execute(statement, [
      name,
      qq,
      content,
      sharing_id,
      repId,
    ]);
    return result;
  }
}

module.exports = new DailyService();
