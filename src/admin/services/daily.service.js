const connection = require("../../app/database");

class DailyService {
  // 分享日常
  async createShareSer(content, jsonArray) {
    const statement =
      "insert into daily_sharing (content, photo_array) values (?, ?);";
    const result = await connection.execute(statement, [content, jsonArray]);
    return result[0];
  }
  // 获取日常
  async getShareSer() {
    const statement = "select * from daily_sharing;";
    const result = await connection.execute(statement);
    return result[0];
  }
  // 删除日常
  async deleteDailySer(dailyId) {
    const statement = "delete from daily_sharing where id = ?;"
    const result = await connection.execute(statement, [dailyId])
    return result[0]
  }
  // 修改日常
  async modifyDailySer(id, content) {
    const statement = "update daily_sharing set content = ? where id = ?;"
    const result = await connection.execute(statement, [content, id])
    return result[0]
  }


  // 获取时间轴
  async getTimelineSer() {
    const statement = "select * from timeline order by id desc;";
    const result = await connection.execute(statement);
    return result[0];
  }
  // 删除时间轴
  async deleteTimelineSer(timelineId) {
    const statement = "delete from timeline where id = ?;";
    const result = await connection.execute(statement, [timelineId]);
    return result[0];
  }
  // 新增时间轴
  async addTimelineSer(content) {
    const statement = "insert into timeline (content) value (?);";
    const result = await connection.execute(statement, [content]);
    return result[0];
  }
  // 修改时间轴
  async modifyTimelineSer(id, content) {
    const statement = "update timeline set content = ? where id = ?;";
    const result = await connection.execute(statement, [content, id]);
    return result[0];
  }
}

module.exports = new DailyService();
