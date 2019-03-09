let db = require("../../db/db")
let db_def = require("../../db/def/def")

class CheckoutUserToy {
    constructor (user_id) {
        this.user_id = user_id
    }
    // 返回所拥有 toy id
    queryIdList () {
        return new Promise ((resolve, reject) => {
            // 查询用户 toy 列表
            db.QueryUserInfoToy(this.user_id).then((v) => { resolve(v) }).catch((v) => { reject(v) }) })
    }
    // 以 toy id 检索出 toy 信息
    queryToyList () {
        return new Promise ((resolve, reject) => {
            // 查询用户拥有 toy id
            this.queryIdList().then((v) => {
                let toyId_list = v[0]['toy'].split(',')
                // 将每个 toy id 对应内容取出
                let sql = `

                `
                db_def.SqlQ({
                    sql: sql,
                    value: []
                })
                .then((v1) => {  }).catch((v1) => {  })

            }).catch((v) => { reject(v) })
        })
    }
}

module.exports = {
    CheckoutUserToy : CheckoutUserToy
}