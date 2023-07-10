const connection = require("../../app/database");

class MessageService {
  async saveMessage(name, content, qq, reply, replyId) {
    const statement =
      "insert into message (name, qq, content, replyId) values (?,?,?,?);";
    let repId = 0;
    if (reply) {
      repId = replyId;
    }
    try {
      const [result] = await connection.execute(statement, [
        name,
        qq,
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

  async getTotal() {
    const statement = 'select count(*) as total from message;'
    // const statement = 'select count(*) as total from message where replyId = 0;'
    const [msg] = await connection.execute(statement)
    return [msg][0][0]
  }
}

module.exports = new MessageService();
