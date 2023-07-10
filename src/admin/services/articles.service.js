const connection = require("../../app/database");

class ArticlesService {
  // 获取标签
  async getLabelsSer() {
    const statement = "select * from labels;";
    const result = await connection.execute(statement);
    const countStatement =
      "select count(*) as count from aritcles_labels where label_id = ?;";
    let resultEnd = [];
    await Promise.all(
      result[0].map(async (item) => {
        const count = await connection.execute(countStatement, [item.id]);
        resultEnd.push({
          id: item.id,
          label: item.label,
          time: item.time,
          articleCount: count[0][0].count,
        });
      })
    );
    return resultEnd;
  }
  // 查询标签是否存在
  async isExistLabel(label) {
    let statement;
    if (typeof label === "number") {
      statement = "select * from labels where id = ?;";
    } else {
      statement = "select * from labels where label = ?;";
    }
    let result;
    try {
      result = await connection.execute(statement, [label]);
    } catch (err) {
      console.log(err);
    }
    return result[0];
  }

  // 创建标签
  async createLabelSer(label) {
    const statement = "insert into labels (label) value (?);";
    let [result] = await connection.execute(statement, [label]);
    return result;
  }

  // 删除标签
  async deleteLabel(labelId) {
    const statement = "delete from labels where id = ?;";
    let result;
    try {
      result = await connection.execute(statement, [labelId]);
    } catch (err) {
      console.log(err);
    }
    return result[0];
  }

  // 创建文章
  async createArticleSer(title, content, label) {
    const statement =
      "insert into articles (title, content, description) values (?,?,?);";
    let result;
    try {
      result = await connection.execute(statement, [title, content, label]);
    } catch (err) {
      console.log(err);
    }
    return result[0];
  }

  // 给文章添加标签
  async toArticleAddLabel(artilceId, labelId) {
    const statement =
      "insert into aritcles_labels (aritcle_id, label_id) values (?,?);";
    const reslut = await connection.execute(statement, [artilceId, labelId]);
    return reslut[0];
  }

  // 根据文章id查询有哪些标签
  async getLabelArtid(article_id) {
    const statement = "select * from aritcles_labels where aritcle_id = ?;";
    const result = await connection.execute(statement, [article_id]);
    const statement2 = "select * from labels where id = ?;";
    let labelArr = [];
    await Promise.all(
      result[0].map(async (item) => {
        const res = await connection.execute(statement2, [item.label_id]);
        labelArr.push(res[0][0]);
      })
    );
    return labelArr;
  }

  // 根据标签id获取文章信息（逻辑有点复杂，搞了好久）
  async getArticlesId(labelId) {
    const statement = "select * from aritcles_labels where label_id = ?;";
    const reslut = await connection.execute(statement, [labelId]);
    const statement2 = "select * from articles where id = ?;";
    const statement3 = "select * from aritcles_labels where aritcle_id = ?;";
    const statement4 = "select * from labels where id = ?;";
    let endVal = [];
    await Promise.all(
      // 根据关系表查询文章信息
      reslut[0].map(async (item) => {
        const art = await connection.execute(statement2, [item.aritcle_id]);
        let value = art[0][0];
        // 根据每一个文章的信息查询他所拥有的标签
        const result3 = await connection.execute(statement3, [art[0][0].id]);
        let labelArr = [];
        await Promise.all(
          result3[0].map(async (item) => {
            const result4 = await connection.execute(statement4, [
              item.label_id,
            ]);
            labelArr.push(result4[0][0]);
          })
        );
        value.labels = labelArr;
        endVal.push(value);
      })
    );
    return endVal;
  }

  // 查询文章信息
  async getArticlesMsg(count, offset) {
    let statement;
    let result1;
    if (count === "all") {
      statement = "select id,title,description,time from articles;";
      result1 = await connection.execute(statement);
    } else {
      statement = "select id,title,description,time from articles limit ?, ?;";
      try {
        result1 = await connection.execute(statement, [
          offset + "",
          count + "",
        ]);
      } catch (err) {
        console.log(err);
      }
    }
    const statement2 = "select * from aritcles_labels where aritcle_id = ?;";
    const statement3 = "select * from labels where id = ?;";
    let endResult = [];
    await Promise.all(
      result1[0].map(async (item) => {
        // 每一个文章
        let article = item;
        // 根据文章查关系表，从表中获取这个文章有哪些标签
        const result2 = await connection.execute(statement2, [item.id]);
        let labes = [];
        await Promise.all(
          result2[0].map(async (item) => {
            const reslut3 = await connection.execute(statement3, [
              item.label_id,
            ]);
            labes.push(reslut3[0][0]);
          })
        );
        article.labels = labes;
        endResult.push(article);
      })
    );
    return endResult;
  }

  // 查询某个文章是否存在
  async queryIsExistArt(articleId) {
    const statement = "select * from articles where id = ?;";
    const result1 = await connection.execute(statement, [articleId]);
    /* ******************** 这里的代码作用：为查询到了文章信息添加相关的标签信息 */
    const statement2 = "select * from aritcles_labels where aritcle_id = ?;";
    const statement3 = "select * from labels where id = ?;";
    let endResult = [];
    await Promise.all(
      result1[0].map(async (item) => {
        // 每一个文章
        let article = item;
        // {
        //   id: 6,
        //   title: '标题',
        //   content: '内容',
        //   description: '描述',
        //   time: 2023-04-30T07:02:47.000Z
        // }
        // 根据文章查关系表，从表中获取这个文章有哪些标签
        const result2 = await connection.execute(statement2, [item.id]);
        let labes = [];
        await Promise.all(
          result2[0].map(async (item) => {
            const reslut3 = await connection.execute(statement3, [
              item.label_id,
            ]);
            labes.push(reslut3[0][0]);
          })
        );
        article.labels = labes;
        endResult.push(article);
      })
    );
    /* ******************** */
    // 每获取一次则则增加文章浏览量
    const statementView = "select views from articles where id = ?;";
    const reslutView = await connection.execute(statementView, [articleId]);
    const views = reslutView[0][0].views;
    const addViewStatement = "update articles set views = ? where id = ?;";
    await connection.execute(addViewStatement, [views + 1, articleId]);
    return endResult;
  }

  // 删除文章
  async deleteArticle(articleId) {
    const statement = "delete from articles where id = ?;";
    const result = await connection.execute(statement, [articleId]);
    return result[0];
  }

  // 修改文章
  async modifyArt(title, content, description, articleId) {
    const statement =
      "update articles set title=?, content=?, description=? where id = ?;";
    const result = await connection.execute(statement, [
      title,
      content,
      description,
      articleId,
    ]);
    return result[0];
  }

  // 删除文章与标签的关系数据
  async deleteArtLab(articleId) {
    const statement = "delete from aritcles_labels where aritcle_id = ?;";
    const result = await connection.execute(statement, [articleId]);
    return result[0];
  }

  // 添加文字与标签的关系数据
  async addArtLab(aritcle_id, label_id) {
    const statement =
      "insert into aritcles_labels (aritcle_id, label_id) values (?,?);";
    let result;
    try {
      result = await connection.execute(statement, [aritcle_id, label_id]);
    } catch (err) {
      console.log(err);
    }
    return result[0];
  }

  // 获取图片信息
  async getImageMsg(count) {
    const statement = "select url from images order by rand() limit ?;";
    const result = await connection.execute(statement, [count + ""]);
    return result[0];
  }
  // 获取文章评论
  async getArticleMessageSer(articleId, count, offset) {
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
  // 获取文章评论总数
  async getArticleMessageTotal(articleId) {
    const statement = 'select count(*) as total from articles_message where article_id = ?;'
    const [msg] = await connection.execute(statement, [articleId])
    return [msg][0][0]
  }
  // 获取文章信息（未转换的）
  async getArticleDetailSer(articleId) {
    const statement = "select * from articles where id = ?;"
    const result1 = await connection.execute(statement, [articleId])
    /* ******************** 这里的代码作用：为查询到了文章信息添加相关的标签信息 */
    const statement2 = "select * from aritcles_labels where aritcle_id = ?;";
    const statement3 = "select * from labels where id = ?;";
    let endResult = [];
    await Promise.all(
      result1[0].map(async (item) => {
        // 每一个文章
        let article = item;
        // 根据文章查关系表，从表中获取这个文章有哪些标签
        const result2 = await connection.execute(statement2, [item.id]);
        let labes = [];
        await Promise.all(
          result2[0].map(async (item) => {
            const reslut3 = await connection.execute(statement3, [
              item.label_id,
            ]);
            labes.push(reslut3[0][0]);
          })
        );
        article.labels = labes;
        endResult.push(article);
      })
    );
    /* ******************** */
    return endResult
  }
  // 删除文章评论
  async deleteArtMessageSer(articleId) {
    const statement = "delete from articles_message where id = ?;"
    const res = await connection.execute(statement, [articleId])
    return res[0]
  }
}

module.exports = new ArticlesService();
