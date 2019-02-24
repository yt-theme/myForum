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
        this.req         = obj.req
        this.currentTime = () => { return Math.floor(Date.now() / 1000) }
        this.privatePem  = fs.readFileSync(path.join(__dirname, './rsa_private_key.pem'))
        this.publicPem   = fs.readFileSync(path.join(__dirname, './rsa_public_key.pem'))
    }
    create () {
        let createTime=this.currentTime(),  privatePem=this.privatePem,  name=this.name
        let payload = { 'name': name, 'exp': createTime + (60 * 60 * 24 * 367) }
        return jwt.sign(payload, privatePem, { algorithm: 'RS256' })
    }
    // 获取请求头token
    getReqToken () {
        return this.req.headers.token
    }
    check () {
        let publicPem=this.publicPem,  token=this.token
        return new Promise ((resolve, reject) => {        
            try {
                let checkResult = jwt.verify(token, publicPem, (err, decoded) => {
                    if (err) { return false   }
                    else     { return decoded }
                })
                let name=checkResult['name'], exp=checkResult['exp'], iat=checkResult['iat']
                // 检查用户名是否存在
                db.queryUser(name)
                .then((v) => {
                    if (v[0].name === name) {
                        console.log('db res', v)
                        if (checkResult && iat<=exp) { resolve(true) }
                        else { reject(false) }
                    } else { reject(false) }
                })
                .catch((v) => { reject(false) })
            } catch { reject(false) }
        })
    }
}
// 用户登录 注册
// login register
class userLogin {
    constructor (req, res) {
        this.req=req;  this.res=res
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
        let req=this.req,  res=this.res
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
    checkLogin () {
        let req=this.req, res=this.res

        if (req.method === 'POST') {
            let reqData = ''; res.writeHead(200, jsonHead); req.on('data', function (chunk) { reqData += chunk })
            req.on("end", function(){
                // 验证token
                let reqToken      = new handleToken({'req': req}).getReqToken()
                new handleToken({'token': reqToken}).check()
                .then((v) => { 
                    console.log('checkTOkenRes', v)
                    res.end(JSON.stringify(v ? { 'r': 1, 'msg': 'ok' } : { 'r': 0, 'msg': '登录验证失败' }))
                })
                .catch((v) => { res.end(JSON.stringify({ 'r': 0, 'msg': '登录验证失败' })) })
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
    // 检查登录
    api_checklogin: (req, res) => { return new userLogin(req, res).checkLogin() }
    
}
