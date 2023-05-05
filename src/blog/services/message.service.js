const connection = require("../../app/database");

class MessageService {
  async saveMessage(name, email, content, reply, replyId) {
    const statement =
      "insert into message (name, email, content, replyId) values (?,?,?,?);";
    let repId = 0;
    if (reply) {
      repId = replyId;
    }
    try {
      const [result] = await connection.execute(statement, [
        name,
        email,
        content,
        repId,
      ]);
      return result;
    } catch (err) {
      return -1;
    }
  }
  async getSomeMessage(count, offset) {
    const statement =
      "select id,name,content,time,replyId from message limit ?, ?;";
    const [message] = await connection.execute(statement, [
      offset + "",
      count + "",
    ]);
    const statementRep =
      "select id,name,content,time,replyId from message where replyId = ?;";
    await Promise.all(
      message.map(async (item) => {
        const [res] = await connection.execute(statementRep, [item.id]);
        item.replyMsg = res;
        return item
      })
    );
    return message;
  }
}

module.exports = new MessageService();
