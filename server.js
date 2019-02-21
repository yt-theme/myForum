let http = require('http')
var querystring = require('querystring')
let fs = require('fs')
let port = 6969
let server = http.createServer()
let db = require('./db.js')

let jsonHead = {'Content-Type': 'application/json'}

server.on('request', function (req, res) {
    console.log(req.url)
    switch (req.url) {
        case '/':
            fsResDo("./index.html", res)
        break
        case '/js/index.js':
            fsResDo("./js/index.js", res)
        break
        case '/js/router.js':
            fsResDo("./js/router.js", res)
        break
        case '/js/components.js':
            fsResDo("./js/components.js", res)
        break
        case '/css/public.css':
            fsResDo("./css/public.css", res)
        break
        // 注册
        case '/login/register':
            api_register(req, res)
        break
        default: break

    }
})

// 处理路由请求
// 返回页面
function fsResDo (url, res) {
    fs.readFile(url, "utf8", function (err, data) {
        if (err) { return false }
        else { res.end(data) }
    })
}
// login register
function api_register(req, res) {
    if (req.method === 'POST') {
        let reqData = ''; res.writeHead(200, jsonHead); req.on('data', function (chunk) { reqData += chunk })
        req.on("end", function(){
            let dataObject = querystring.parse(decodeURI(reqData));
            if (dataObject['name'] && dataObject['passwd']) {
                db.addUser(dataObject['name'], dataObject['passwd'])
                .then((v)  => { res.end(JSON.stringify({ 'r': 1, 'msg': 'ok'  })) })
                .catch((v) => { res.end(JSON.stringify({ 'r': 0, 'msg': v })) })
            }
        })
    }
}

server.listen(port, function () {
    console.log('st')
})