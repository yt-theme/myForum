let init   = require("./db_init")
let method = require("./db_method")

// 对外方法
module.exports = {
    // 数据库初始化
    Init          : () => { init.Db_init() },
    // 用户添加
    AddUser       : (name, passwd) => { return new method.HandleUser(name, passwd, '').add() },
    // 检查用户密码
    CheckPasswd   : (name, passwd) => { return new method.HandleUser(name, passwd, '').checkPasswd() },
    // 获取用户表
    QueryUser     : (id) => { return new method.HandleUser('', '', id).query() },
    // 使用用户名获取用户表
    NameQueryUser : (name) => { return new method.HandleUser(name, '', '').nameQuery() }
}