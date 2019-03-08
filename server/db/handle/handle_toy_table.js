let def = require("../def/def.js")

// handle toy db
// type => "1" 我的成长 "2" 我的工具 "3" 讨论互动
// 例 new Handle_toy_table({id: "xxx", type: "xxx"}).query()
class Handle_toy_table {
    constructor (obj) {
        if (obj) {
            this.sql   = obj.sql
            this.id    = obj.id
            this.type  = obj.type
            this.title = obj.title
            this.link  = obj.link
            this.bgc   = obj.bgc
            this.bgi   = obj.bgi
        }
    }
    arrInsert () { let sql = this.sql
        return new Promise ((resolve, reject) => {
            def.SqlQ({ sql: sql, values: [] }).then((res) => { resolve(res) }).catch((reason) => { reject(reason) }) })
    }
    insert () {
        return new Promise ((resolve, reject) => {
            def.SqlQ({ sql: `insert into toy (type, title, link, bgc, bgi) values (?, ?, ?, ?, ?)`, 
                values: [ this.id, this.type, this.title, this.link, this.bgc, this.bgi ] }).then((res) => { resolve(res) }).catch((reason) => { reject(reason) }) })
    }
    update () {
        return new Promise ((resolve, reject) => {
            def.SqlQ({ sql: `update toy set type = ?, title = ?, link = ?, bgc = ?, bgi = ? where id=?`, 
                values: [ this.type, this.title, this.link, this.bgc, this.bgi, this.id ] }).then((res) => { resolve(res) }).catch((reason) => { reject(reason) }) })
    }
    query () {
        return new Promise ((resolve, reject) => {
            def.SqlQ({ sql: `select * from toy where id = ?, type=?`, values: [ this.id, this.type ] }).then((res) => { resolve(res) }).catch((reason) => { reject(reason) }) })
    }
}

module.exports = {
    Handle_toy_table : Handle_toy_table
}