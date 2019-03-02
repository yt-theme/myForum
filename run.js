var http = require('http')

let server = http.createServer()
let port = 6969
let model = require('./server/model/model.js')

server.on('request', function (req, res) {
    console.log(req.url)
    switch (req.url) {

        case '/'                 : model.FsResDo("./index.html", res); break
        case '/js/index.js'      : model.FsResDo("./js/index.js", res); break
        case '/js/router.js'     : model.FsResDo("./js/router.js", res); break
        case '/js/components.js' : model.FsResDo("./js/components.js", res); break
        case '/css/public.css'   : model.FsResDo("./css/public.css", res); break


        // 注册
        case '/register'   : model.Api_register(req, res); break
        // 登录
        case '/login'      : model.Api_login(req, res); break
        // 检查登录状态
        case '/checklogin' : model.Api_checklogin(req, res); break


        default: break
    }
})
server.listen(port, function () {
    console.log('st')
})