var http = require('http')

let server = http.createServer()
let port = 6969
let model = require('./server/model.js')

server.on('request', function (req, res) {
    console.log(req.url)
    switch (req.url) {
        case '/':
            model.fsResDo("./index.html", res)
        break
        case '/js/index.js':
            model.fsResDo("./js/index.js", res)
        break
        case '/js/router.js':
            model.fsResDo("./js/router.js", res)
        break
        case '/js/components.js':
            model.fsResDo("./js/components.js", res)
        break
        case '/css/public.css':
            model.fsResDo("./css/public.css", res)
        break
        // 注册
        case '/login/register':
            model.api_register(req, res)
        break
        default: break
    }
})
server.listen(port, function () {
    console.log('st')
})