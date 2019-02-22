var fs = require('fs')
var path = require('path')
var querystring = require('querystring')
var jwt = require('jsonwebtoken')

let db = require('./db.js')
let jsonHead = {'Content-Type': 'application/json'}

// public
// token 用来每登录或注册刷新或生成token
class handleToken {
    constructor (obj) {
        this.name        = obj.name
        this.token       = obj.token
        this.currentTime = () => { return Math.floor(Date.now() / 1000) }
        this.privatePem  = fs.readFileSync(path.join(__dirname, './rsa_private_key.pem'))
        this.publicPem   = fs.readFileSync(path.join(__dirname, './rsa_public_key.pem'))
    }
    create () {
        let createTime=this.currentTime(),  privatePem=this.privatePem,  name=this.name
        // let token = jwt.sign({ 'name': name, 'exp': createTime + 3600 * 7 * 24 }, privatePem, { 'algorithm': 'RS256' })
        // let header = { 'alg': 'RS256', 'typ': 'JWT' }
        let payload = { 'name': name }
        // let token = jwt.sign(header, payload, privatePem, { 'expiresIn':  })
        let token = jwt.sign(payload, privatePem, { algorithm: 'RS256' })
        return token
    }
    check () {
        let currentTime=this.currentTime(),  publicPem=this.publicPem,  token=this.token,  returnResult=''
        try {
            // let checkResult = jwt.verify(token, publicPem, { 'algorithms': ['RS256'] }) || {}
            // let { exp = 0 } = checkResult
            // if (currentTime <= exp) { returnResult = checkResult['name'] || {} }
            // else { return -1 }
            let checkResult = jwt.verify(token, publicPem, (err, decoded) => {
                if (err) { console.log('token check err', err); return }
            })
            returnResult = checkResult
        } catch { }
        return returnResult
    }
}

// 处理路由请求
module.exports = {
    // 返回页面
    fsResDo: (url, res) => { fs.readFile(url, "utf8", (err, data) => {if (err) { return false } else { res.end(data) }})},
    // login register
    api_register: (req, res) => {
    if (req.method === 'POST') {
        let reqData = ''; res.writeHead(200, jsonHead); req.on('data', function (chunk) { reqData += chunk })
        req.on("end", function(){
            let dataObject = querystring.parse(decodeURI(reqData));
            if (dataObject['name'] && dataObject['passwd']) {
                db.addUser(dataObject['name'], dataObject['passwd'])
                .then((v)  => { 
                    let token = new handleToken({'name': dataObject['name']}).create()
                    res.end(JSON.stringify({ 'r': 1, 'msg': 'ok', 'token': token }))
                })
                .catch((v) => { res.end(JSON.stringify({ 'r': 0, 'msg': v })) })
            } else {
                res.end(JSON.stringify({ 'r': 0, 'msg': 'name | passwd缺少参数' }))
            }
        })
    }
}
}
