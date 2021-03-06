let model = require('./model/model.js')

function ServerRouter (req, res) {
    console.log(req.url)
    switch (req.url) {

        // 测试
        case '/test' : model.ImportXlsx_toy("./import_toy.xlsx")

        case '/'                 : model.FsResDo("./index.html", res); break
        case '/js/index.js'      : model.FsResDo("./js/index.js", res); break
        case '/js/router.js'     : model.FsResDo("./js/router.js", res); break
        case '/js/components.js' : model.FsResDo("./js/components.js", res); break
        case '/css/public.css'   : model.FsResDo("./css/public.css", res); break
        case '/favicon.ico'      : model.FsResDo("./favicon.ico", res); break


        // 注册
        case '/register'   : model.Api_register(req, res); break
        // 登录
        case '/login'      : model.Api_login(req, res); break
        // 检查登录状态
        case '/checklogin' : model.Api_checklogin(req, res); break

        // 发帖
        case '/create_article' : model.Api_createArticle(req, res); break


        default: break
    }
}

module.exports = {
    ServerRouter : ServerRouter
}