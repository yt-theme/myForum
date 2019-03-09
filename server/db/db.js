let init   = require("./init/init.js")
let method = require("./method/method.js")

// 对外方法
module.exports = {
    // 数据库初始化
    Init          : () => { return new Promise ((resolve, reject) => { init.Db_init().then((v) => { resolve(v) }) })},

/*#########################
    xlsx导入
  #########################*/

    // 导入 xlsx
    ImportXlsx    : (obj) => { return new method.ImportXlsx(obj) },

/*#########################
    判断表状态
  #########################*/

    // 判断是 table 否为空
    CheckTableIsEmpty : (table) => { return new method.CheckTableIsEmpty(table).check() },

/*#########################
    用户表                                                                      
  #########################*/

    // 用户添加
    AddUser       : (name, passwd) => { return new method.HandleUser(name, passwd, '').add() },
    // 检查用户密码
    CheckPasswd   : (name, passwd) => { return new method.HandleUser(name, passwd, '').checkPasswd() },
    // 获取用户表
    QueryUser     : (id) => { return new method.HandleUser('', '', id).query() },
    // 使用用户名获取用户表
    NameQueryUser : (name) => { return new method.HandleUser(name, '', '').nameQuery() },

/*#########################
    用户信息表                                                                   
  #########################*/

    // 用户信息添加
    InsertUserInfo   : (obj) => { return new method.HandleUserInfo(obj).insert() },
    // 用户作息删除
    DeleteUserInfo   : (user_id) => { return new method.HandleUserInfo({"user_id": user_id}).delete() },
    // 用户信息修改
    ChangeUserInfo   : (obj) => { return new method.HandleUserInfo(obj).update() },
    // 用户信息查询 按 用户id
    QueryUserInfo    : (user_id) => { return new method.HandleUserInfo({"user_id": user_id}).query() },
    // 用户信息查询 toy
    QueryUserInfoToy : (user_id) => { return new method.HandleUserInfo({"user_id": user_id}).queryToy() },

/*#########################
    toy表                                                                   
  #########################*/
    // 查询 toy => id or type
    QueryToy       : (id, type) => { return new method.HandleToy({"id": id, "type": type}).query() },
    // 查询 toy 所有内容
    QueryToyAll    : () => { return new method.HandleToy().queryAll() },
    // 检索 toy 所有 id
    QueryToyAllId    : () => { return new method.HandleToy().queryAllId() }
}