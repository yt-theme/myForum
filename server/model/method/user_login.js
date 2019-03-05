var querystring = require('querystring')
let db          = require('../../db/db.js')
let def         = require('../def/def.js')
let handle      = require('../handle/handle.js')

// 用户登录 注册
// login register
class UserLogin {
    constructor (req, res) { this.req=req;  this.res=res }
    register () { let req = this.req, res = this.res
        if (req.method === 'POST') {
            let reqData = ''; res.writeHead(200, def.JsonHead); req.on('data', function (chunk) { reqData += chunk })
            req.on("end", function(){
                let dataObject = querystring.parse(decodeURI(reqData));
                if (dataObject['name'] && dataObject['passwd']) {
                    // 增加用户 并且 将token存入数据库
                    // 增加用户
                    db.AddUser(dataObject['name'], dataObject['passwd'])
                    // 返回token 用户id
                    .then((v)  => {
                        if (v['insertId']) {
                            // 创建token
                            let token = new handle.HandleToken({'id': v['insertId']}).create()
                            res.end(JSON.stringify({ 'r': 1, 'msg': 'ok', 'token': token, 'id': v['insertId'] }) ) }
                    })
                    .catch((v) => { res.end(JSON.stringify({ 'r': 0, 'msg': v })) })
                } else { res.end(JSON.stringify({ 'r': 0, 'msg': 'name | passwd缺少参数' })) }
            })
        }
    }
    // login
    login () { let req=this.req,  res=this.res
        if (req.method === 'POST') {
            let reqData = ''; res.writeHead(200, def.JsonHead); req.on('data', function (chunk) { reqData += chunk })
            req.on("end", function(){
                let dataObject = querystring.parse(decodeURI(reqData));
                if (dataObject['name'] && dataObject['passwd']) {
                    // 检查用户名 密码是否正常
                    db.CheckPasswd(dataObject['name'], dataObject['passwd'])
                    .then((v) => { 
                        if (v === 'ok') {
                            // 获取用户id
                            db.NameQueryUser(dataObject['name'])
                            .then((v) => {
                                // 如果正常则返回token 
                                let token = new handle.HandleToken({'id': v[0]['id']}).create()
                                res.end(JSON.stringify({ 'r': 1, 'msg': 'ok', 'token': token, 'id': v[0]['id'] })) })
                            .catch((v) => { res.end(JSON.stringify({ 'r': 0, 'msg': 'checkPwd err' })) })
                        } else { res.end(JSON.stringify({ 'r': 0, 'msg': 'checkPwd err' })) }
                     })
                    .catch((v) => {  res.end(JSON.stringify({ 'r': 0, 'msg': v })) })
                } else { res.end(JSON.stringify({ 'r': 0, 'msg': 'name | passwd缺少参数' })) }
            })
        }
    }
    checkLogin () { let req=this.req, res=this.res
        if (req.method === 'POST') {
            let reqData = ''; res.writeHead(200, def.JsonHead); req.on('data', function (chunk) { reqData += chunk })
            req.on("end", function(){
                // 验证token
                let reqToken = new handle.HandleToken({'req': req}).getReqToken()
                new handle.HandleToken({'token': reqToken}).check()
                .then((v)  => { res.end(JSON.stringify(v ? { 'r': 1, 'msg': 'ok' } : { 'r': 0, 'msg': '登录验证失败' })) })
                .catch((v) => { res.end(JSON.stringify({ 'r': 0, 'msg': '登录验证失败2' })) })
            })
        }
    }
}

module.exports = {
    UserLogin : UserLogin
}