var fs     = require('fs')
let method = require('./method/method.js')
let init   = require('./init/init.js')

// init
init.Init()

// 对外接口
// 处理路由请求
module.exports = {
    // 返回页面
    FsResDo        : (url, res) => { fs.readFile(url, "utf8", (err, data) => {if (err) { return false } else { res.end(data) }})},
    // 注册
    Api_register   : (req, res) => { return new method.UserLogin(req, res).register() },
    // 登录
    Api_login      : (req, res) => { return new method.UserLogin(req, res).login() },
    // 检查登录
    Api_checklogin : (req, res) => { return new method.UserLogin(req, res).checkLogin() }
    
}
