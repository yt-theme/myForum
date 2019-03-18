var fs     = require('fs')
let method = require('./method/method.js')
let def    = require('./def/def')
let init   = require('./init/init.js')

// init
init.Init()
// xlsx import table
// toy
.then((v) => { new method.ImportXlsxToTable({"path": def.Toy_xlsx_path}).toy() })
.catch((v) => { console.log('dbInit err toy =>', v) })

// 对外接口
// 处理路由请求
module.exports = {
    // 插入 xlsx to 数据库
    ImportXlsx_toy : (path) => { return new method.ImportXlsxToTable({"path": path}).toy() },

    // 返回页面
    FsResDo        : (url, res) => { fs.readFile(url, "utf8", (err, data) => {if (err) { return false } else { res.end(data) }})},
    // 注册
    Api_register   : (req, res) => { return new method.UserLogin(req, res).register() },
    // 登录
    Api_login      : (req, res) => { return new method.UserLogin(req, res).login() },
    // 检查登录
    Api_checklogin : (req, res) => { return new method.UserLogin(req, res).checkLogin() }    
}
