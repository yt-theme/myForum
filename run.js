let http         = require('http')
let server       = http.createServer()
let port         = 6969
let serverRouter = require('./server/serverRouter')

server.on('request', function (req, res) {
    serverRouter.ServerRouter(req, res)
})
server.listen(port, function () {
    console.log('st')
})