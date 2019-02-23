var fs = require('fs')
var path = require('path')
var querystring = require('querystring')
var jwt = require('jsonwebtoken')

let db = require('./db.js')
// 数据库初始化
db.init()
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
            let checkResult = jwt.verify(token, publicPem, (err, decoded) => {
                if (err) { console.log('token check err', err); return }
            })
            returnResult = checkResult
        } catch { }
        return returnResult
    }
}
// 用户登录 注册
// login register
class userLogin {
    constructor (req, res, token) {
        this.req=req;  this.res=res;  this.token=token
    }
    register () {
        let req = this.req, res = this.res
        if (req.method === 'POST') {
            let reqData = ''; res.writeHead(200, jsonHead); req.on('data', function (chunk) { reqData += chunk })
            req.on("end", function(){

                let dataObject = querystring.parse(decodeURI(reqData));

                if (dataObject['name'] && dataObject['passwd']) {
                    // 增加用户 并且 将token存入数据库
                    // 创建token
                    let token = new handleToken({'name': dataObject['name']}).create()
                    // 增加用户
                    db.addUser(dataObject['name'], dataObject['passwd'])
                    .then((v)  => {
                        // 返回token
                        res.end(JSON.stringify({ 'r': 1, 'msg': 'ok', 'token': token })
                    )})
                    .catch((v) => { res.end(JSON.stringify({ 'r': 0, 'msg': v })) })
                } else { res.end(JSON.stringify({ 'r': 0, 'msg': 'name | passwd缺少参数' })) }
            })
        }
    }
    // login
    login () { 
        let req=this.req,  res=this.res,  token=this.token
        if (req.method === 'POST') {
            let reqData = ''; res.writeHead(200, jsonHead); req.on('data', function (chunk) { reqData += chunk })
            req.on("end", function(){

                let dataObject = querystring.parse(decodeURI(reqData));

                if (dataObject['name'] && dataObject['passwd']) {
                    // 检查用户名 密码是否正常
                    db.checkPasswd(dataObject['name'], dataObject['passwd'])
                    .then((v) => { 
                        if (v === 'ok') {
                            // 如果正常则返回token
                            let token = new handleToken({'name': dataObject['name']}).create()
                            res.end(JSON.stringify({ 'r': 1, 'msg': 'ok', 'token': token }))
                        } else { res.end(JSON.stringify({ 'r': 0, 'msg': 'checkPwd err' })) }
                     })
                    .catch((v) => { res.end(JSON.stringify({ 'r': 0, 'msg': v })) })
                } else { res.end(JSON.stringify({ 'r': 0, 'msg': 'name | passwd缺少参数' })) }
            })
        }
    }
}


// 对外接口
// 处理路由请求
module.exports = {
    // 返回页面
    fsResDo: (url, res) => { fs.readFile(url, "utf8", (err, data) => {if (err) { return false } else { res.end(data) }})},
    // 注册
    api_register: (req, res) => { return new userLogin(req, res).register() },
    // 登录
    api_login: (req, res) => { return new userLogin(req, res).login() },
    
}
