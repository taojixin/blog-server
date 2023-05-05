const connection = require("../../app/database")

class UserService {
  async findUserByName(name) {
    const statement = "select * from user where name = ?;"
    const [result] = await connection.execute(statement, [name])
    return result
  }
}


module.exports = new UserService()