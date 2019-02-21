let http = require('http')
var querystring = require('querystring')
let fs = require('fs')
let port = 6969
let server = http.createServer()
let db = require('./db.js')

let jsonHead = {'Content-Type': 'application/json'}

server.on('request', function (req, res) {
    console.log(req.url)
    function fsResDo (url) {
        fs.readFile(url, "utf8", function (err, data) {
            if (err) {
                console.log(err)
                return false
            }
            res.end(data)
        })
    }
    switch (req.url) {
        case '/':
            fsResDo("./index.html")
        break
        case '/js/index.js':
            fsResDo("./js/index.js")
        break
        case '/js/router.js':
            fsResDo("./js/router.js")
        break
        case '/js/components.js':
            fsResDo("./js/components.js")
        break
        case '/css/public.css':
            fsResDo("./css/public.css")
        break
        case '/login/register':
            if (req.method === 'POST') {
                let reqData = ''
                // head
                res.writeHead(200, jsonHead)
                req.on('data', function (chunk) { reqData += chunk })
                req.on("end", function(){
                    let dataObject = querystring.parse(decodeURI(reqData));
                    if (dataObject['name'] && dataObject['passwd']) {
                        db.addUser(dataObject['name'], dataObject['passwd'])
                        .then((v)  => { res.end(JSON.stringify({ 'r': 1, 'msg': 'ok'  })) })
                        .catch((v) => { res.end(JSON.stringify({ 'r': 0, 'msg': v })) })
                    }
                })
            }
        break
        default: break

    }
})
server.listen(port, function () {
    console.log('st')
})