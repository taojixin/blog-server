const connection = require("../../app/database");

class ArticlesService {
  async commentArticle(name, qq, content, articleId, reply, replyId) {
    // reply若为真则是 为某一条评论进行评论，replyId为评论的id，默认为0则是对文章进行评论
    let repId = 0;
    if (reply) {
      repId = replyId;
    }
    const statement =
      "insert into articles_message (name,qq,content,article_id,replyId) values (?,?,?,?,?);";
    const [result] = await connection.execute(statement, [
      name,
      qq,
      content,
      articleId,
      repId,
    ]);
    return result;
  }
  async getSomeArtMsg(articleId, count, offset) {
    const statement =
      "select id,name,content,qq,time,replyId, article_id from articles_message where replyId = 0 and article_id = ? order by id desc limit ?, ?;";
    const [result1] = await connection.execute(statement, [
      articleId,
      offset + "",
      count + "",
    ]);
    const statementRep =
      "select id,name,content,qq,time,replyId, article_id from articles_message where replyId = ?;";
    await Promise.all(
      result1.map(async (item) => {
        const [res] = await connection.execute(statementRep, [item.id]);
        item.replyMsg = res;
        return item;
      })
    );
    return result1;
  }
  async getTotal(articleId) {
    const statement = 'select count(*) as total from articles_message where article_id = ?;'
    const [msg] = await connection.execute(statement, [articleId])
    return [msg][0][0]
  }
}

module.exports = new ArticlesService();
