var fs  = require('fs')
var jwt = require('jsonwebtoken')
let db  = require('../../db/db.js')
let def = require('../def/def.js')

// token 用来每登录或注册刷新或生成token
class HandleToken {
    constructor (obj) {
        this.id          = obj.id
        this.name        = obj.name
        this.token       = obj.token
        this.req         = obj.req
        this.currentTime = () => { return Math.floor(Date.now() / 1000) }
        this.privatePem  = fs.readFileSync(def.Rsa_private_key)
        this.publicPem   = fs.readFileSync(def.Rsa_public_key)
    }
    create () {
        let createTime=this.currentTime(),  privatePem=this.privatePem,  id=this.id
        let payload = { 'id': id, 'exp': createTime + (60 * 60 * 24 * 367) }
        return jwt.sign(payload, privatePem, { algorithm: 'RS256' })
    }
    // 获取请求头token
    getReqToken () { return this.req.headers.token }
    // 验证token
    check () {
        let publicPem=this.publicPem,  token=this.token
        return new Promise ((resolve, reject) => {        
            try {
                let checkResult = jwt.verify(token, publicPem, (err, decoded) => { if (err) { return false } else { return decoded } })
                let id=checkResult['id'], exp=checkResult['exp'], iat=checkResult['iat']
                // 检查用户是否存在
                db.QueryUser(id)
                .then((v) => {
                    if (v[0]['id'] === id) { if (checkResult && iat<=exp) { resolve(id) } else { reject(false) } }
                    else { reject(false) } })
                .catch((v) => { reject(false) })
            } catch { reject(false) }
        })
    }
}

module.exports = {
    HandleToken : HandleToken
}