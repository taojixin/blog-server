const {
  createShareSer,
  getShareSer,
  getTimelineSer,
  deleteTimelineSer,
  addTimelineSer,
  modifyTimelineSer,
  deleteDailySer,
  modifyDailySer
} = require("../services/daily.service");

class DailyController {
  async createShare(ctx, next) {
    const { content, photoArray } = ctx.request.body;
    // const jsonArray = JSON.stringify(photoArray);
    const res = await createShareSer(content, photoArray);
    ctx.body = {
      code: 0,
      data: {
        res,
      },
    };
  }
  // 获取日常
  async getShare(ctx, next) {
    await getShareSer()
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
  // 获取时间轴
  async getTimeline(ctx, next) {
    const res = await getTimelineSer();
    ctx.body = {
      code: 0,
      data: res,
    };
  }
  // 删除日常
  async deleteDaily(ctx, next) {
    const {dailyId} = ctx.request.body
    await deleteDailySer(dailyId).then(res => {
      ctx.body = {
        code: 0,
        data: res
      }
    }).catch(err => {
      ctx.body = {
        code: -1,
        data: err
      }
    })
  }
  // 修改日常
  async modifyDaily(ctx,next) {
    const {id, content} = ctx.request.body
    await modifyDailySer(id,content).then(res => {
      ctx.body = {
        code: 0,
        data: res
      }
    }).catch(err => {
      ctx.body = {
        code: -1,
        data: err
      }
    })
  }


  // 删除时间轴
  async deleteTimeline(ctx, next) {
    const { timelineId } = ctx.request.body;
    await deleteTimelineSer(timelineId)
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
  // 新增时间轴
  async addTimeline(ctx, next) {
    const { content } = ctx.request.body;
    await addTimelineSer(content)
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
  // 修改时间轴
  async modifyTimeline(ctx, next) {
    const { id, content } = ctx.request.body;
    await modifyTimelineSer(id, content)
      .then((res) => {
        ctx.body = {
          code: 0,
          data: res,
        };
      })
      .catch((err) => {
        console.log(err);
        ctx.body = {
          code: -1,
          data: "修改失败",
        };
      });
  }
}

module.exports = new DailyController();
