let db = require("../../db/db")

class HandleUserCreateTime {
    constructor(obj) { this.user_id = obj.user_id }
    query () { let user_id=this.user_id
        return new Promise ((resolve, reject) => {
            db.queryUserCreateTime({ "user_id": user_id }).then((v) => { resolve(v) }).catch((v) => { reject(v) }) })
    }
    // yyyy-mm-dd
    queryDate () {
        return new Promise ((resolve, reject) => {
            this.query().then((v) => {
                // 获取当前时间
                let currentTime = parseInt(Date.parse(new Date()).toString())
                // 前当时间减 create_time 为用户年龄 => 毫秒数
                resolve(currentTime - parseInt(v[0]["create_time"]))
            }).catch((v) => { reject(v) })
        })
    }
}

module.exports = {
    HandleUserCreateTime : HandleUserCreateTime
}