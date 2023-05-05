const { PARAMETER_CANNOT_BE_EMPTY_OR_LONG } = require("../../config/error");
const { isOk } = require("../../utils/isOk");
const  hljs = require("highlight.js")
const { marked } = require("marked");
marked.setOptions({
  highlight: function (code, lang) {
    return hljs.highlightAuto(code).value
  },
});
const {
  createLabelSer,
  isExistLabel,
  deleteLabel,
  createArticleSer,
  getLabelsSer,
  toArticleAddLabel,
  getArticlesId,
  getLabelArtid,
  getArticlesMsg,
  deleteArticle,
  queryIsExistArt,
  modifyArt,
  deleteArtLab,
  addArtLab,
} = require("../services/articles.service");

class ArticlsController {
  // 获取所有标签
  async getLabels(ctx, next) {
    const result = await getLabelsSer();
    ctx.body = {
      code: 0,
      data: { result },
    };
  }

  // 创建标签
  async createLabel(ctx, next) {
    const { label } = ctx.request.body;
    if (!label.trim() || label.length > 20) {
      return ctx.app.emit("error", PARAMETER_CANNOT_BE_EMPTY_OR_LONG, ctx);
    }
    const isExist = await isExistLabel(label);
    if (isExist.length !== 0) {
      return (ctx.body = {
        code: -1,
        message: "创建失败，标签可能已存在！",
      });
    }
    await createLabelSer(label);
    ctx.body = {
      code: 0,
      message: "创建成功！",
    };
  }

  // 删除标签
  async delLabel(ctx, next) {
    const { labelId } = ctx.request.body;
    const isExist = await isExistLabel(labelId);
    if (isExist.length !== 0) {
      const result = await deleteLabel(labelId);
      return (ctx.body = {
        code: 0,
        data: {
          result,
        },
      });
    } else {
      return (ctx.body = {
        code: -1,
        message: "删除失败，标签不存在！",
      });
    }
  }

  // 创建文章
  async createArticle(ctx, next) {
    const { title, content, description, labelArr } = ctx.request.body;
    if (isOk({ [title]: 20, [description]: 200 })) {
      // 首先创建文章
      await createArticleSer(title, content, description).then(async (res) => {
        // 对文章添加每一个标题（一个标签添加一个关系表数据）
        for (let i = 0; i < labelArr.length; i++) {
          const isExist = await isExistLabel(labelArr[i]);
          if (isExist.length !== 0) {
            const labelId = isExist[0].id;
            await toArticleAddLabel(res.insertId, labelId).then((res) => {
              return (ctx.body = {
                code: 0,
                data: res,
              });
            });
          }
        }
      });
    } else {
      return (ctx.body = {
        code: -1,
        message: "参数错误！",
      });
    }
  }

  // 查询文章:根据标签id
  async queryAtricles(ctx, next) {
    const { labelId } = ctx.request.body;
    const isExist = await isExistLabel(labelId);
    if (isExist.length !== 0) {
      // 根据labelId获取文章id
      const res = await getArticlesId(isExist[0].id);
      // 将markdown转为html
      let endValue = res.map(item => {
        item.content = marked.parse(item.content);
        return item
      })
      
      return (ctx.body = endValue);
    } else {
      return (ctx.body = {
        code: -1,
        message: "创建失败，标签不存在！",
      });
    }
  }

  // 查询某个文章是否存在
  async queryAtricle(ctx, next) {
    const { articleId } = ctx.request.body;
    const result = await queryIsExistArt(articleId);
    if (result.length === 0) {
      return (ctx.body = {
        code: -1,
        message: "该文章不存在！",
      });
    }
    // 将markdown转为html并返回
    let endValue = result.map(item => {
      item.content = marked.parse(item.content)
      return item
    })
    ctx.body = {
      code: 0,
      data: {
        result: endValue
      },
    };
  }

  // 查询标签:根据文章id
  async queryLabels(ctx, next) {
    const { article_id } = ctx.request.body;
    const res = await getLabelArtid(article_id);
    // 将markdown转为html并返回
    let endValue = res.map(item => {
      item.content = marked.parse(item.content)
      return item
    })
    ctx.body = endValue;
  }

  // 获取文章信息
  async getArticles(ctx, next) {
    const { count = "all", offset } = ctx.request.body;
    const result = await getArticlesMsg(count, offset);
    ctx.body = {
      code: 0,
      data: {
        result,
      },
    };
  }

  // 删除文章
  async delArticle(ctx, next) {
    const { articleId } = ctx.request.body;
    const queryRes = await queryIsExistArt(articleId);
    if (queryRes.length === 0) {
      return (ctx.body = {
        code: -1,
        message: "该文章不存在",
      });
    }
    const result = await deleteArticle(articleId);
    ctx.body = {
      code: 0,
      data: {
        result,
      },
    };
  }

  // 修改文章
  async modifyArticle(ctx, next) {
    const { articleId, title, content, description, labelArr } =
      ctx.request.body;
    // 1.查询该id表是否存在以及相关的表信息
    const queryVal = await queryIsExistArt(articleId);
    if (queryVal.length === 0) {
      return (ctx.body = {
        code: -1,
        message: "文章不存在！",
      });
    }
    // 2.修改文章内容（还未修改标签信息）
    await modifyArt(title, content, description, articleId).then(
      async (res) => {
        // 3.修改标签信息：根据查询的结果，删除相关的关系表，重新创建关系表
        await deleteArtLab(articleId);
        labelArr.map(async item => {
          await addArtLab(articleId, item)
        })
      }
    );
    // 4.返回最新的修改后的信息
    const reslut = await queryIsExistArt(articleId);
    ctx.body = reslut;
  }
}

module.exports = new ArticlsController();
