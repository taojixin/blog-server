const connection = require("../../app/database");
class MessageService {
  // 获取评论
  async getMessageSer(count ,offset) {
    const statement =
      "select id,name,content,qq,time,replyId from message where replyId = 0  order by id desc limit ?, ?;";
    const [message] = await connection.execute(statement, [
      offset + "",
      count + "",
    ]);
    const statementRep =
      "select id,name,content,qq,time,replyId from message where replyId = ?;";
    await Promise.all(
      message.map(async (item) => {
        const [res] = await connection.execute(statementRep, [item.id]);
        item.replyMsg = res;
        return item;
      })
    );
    return message;
  }
  // 获取评论总数
  async getMessageTotalSer() {
    // const statement = "select count(*) as total from message;";
    const statement = 'select count(*) as total from message where replyId = 0;'
    const [msg] = await connection.execute(statement);
    return [msg][0][0];
  }
  // 删除评论
  async deleteMessageSer(messageId) {
    const statement = "delete from message where id = ?;"
    const result = await connection.execute(statement, [messageId])
    return result[0]
  }
}

module.exports = new MessageService();
