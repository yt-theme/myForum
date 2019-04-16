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

                            // 用户添加 toy
                            // 用户默认有所有 toy 功能
                            // 0. 插入 用户信息到 users_info 表
                            // 1. 添加所有 toy 功能到 users_info 表
                            // 2. 将用户 toy 字段对应的 toy 表中的项目返回

                            // 插入之前检索 toy
                            db.QueryToyAll()
                            .then((v1) => {
                                let toyId_str = "", toy_arr = []
                                v1.forEach(ite => { toy_arr.push(ite["id"]) })
                                toyId_str = toy_arr.join(',')
                                console.log("all toy id =>", toyId_str)

                                // 插入 users_info
                                db.InsertUserInfo({
                                    "user_id": v['insertId'],
                                    "create_time": Date.parse(new Date()).toString(),
                                    "name":    dataObject['name'],
                                    "logo":    '',
                                    "phone":   "00000000000",
                                    "toy":     toyId_str,
                                    "checkin": 1 })
                                .then((v2) => {
                                    // 返回数据
                                    res.end(JSON.stringify({
                                        'r': 1,
                                        'msg': 'ok',
                                        'token': token,
                                        'id': v['insertId'],
                                    }) )
                                }).catch((v2) => { console.log("users_info insert err =>", v2) })

                            }).catch((v1) => { console.log(v1) })
                        }
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
                .then((v)  => {

                    // 返回用户 age
                    let promise_age = new Promise((reoslve, reject) => {
                        new handle.HandleUserCreateTime({ "user_id": v }).queryDate().then((age) => { reoslve(age) }).catch((err) => { reject(err) }) })
                    
                    // 返回用户toy
                    // 查询用户拥有的 toy
                    let promise_toy = new Promise((resolve, reject) => {
                        new handle.CheckoutUserToy(v).queryToyList().then((toyArr) => { resolve(toyArr) }).catch((v1) => { reject(v1) }) })

                    Promise.all([promise_age, promise_toy]).then((valueArr) => {
                        let age=valueArr[0],  toyArr=valueArr[1]
                        res.end(JSON.stringify(v ? { 'r': 1, 'msg': 'ok', 'toy': toyArr || [], 'age': age } : { 'r': 0, 'msg': '登录验证失败' }))
                    }).catch((err1) => { console.log("checkLogin err =>", err1); res.end(JSON.stringify({ 'r': 0, 'msg': '登录验证失败' })) })
                })
                .catch((v) => { res.end(JSON.stringify({ 'r': 0, 'msg': '登录验证失败2' })) })
            })
        }
    }
}

module.exports = {
    UserLogin : UserLogin
}