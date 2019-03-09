let def = require("../def/def.js")

// handle user db
class Handle_usersInfo_table {
    constructor (obj) {
        // this.id      = obj.id
        this.user_id = obj.user_id
        this.name    = obj.name
        this.logo    = obj.logo
        this.phone   = obj.phone
        this.toy     = obj.toy
        this.checkin = obj.checkin
    }
    insert () {
        return new Promise ((resolve, reject) => {
            def.SqlQ({ 
                sql: `insert into users_info (user_id, name, logo, phone, toy, checkin) values (?, ?, ?, ?, ?, ?)`,
                values: [ this.user_id, this.name, this.logo, this.phone, this.toy, this.checkin ]
            }).then((res) => { resolve(res) }).catch((reason) => { reject(reason) }) })
    }
    delete () {
        return new Promise ((resolve, reject) => {
            def.SqlQ({ sql: `delete from users_info where user_id = ?`, values: [ this.user_id ] }).then((res) => { resolve(res) }).catch((reason) => { reject(reason) }) })
    }
    update () {
        return new Promise ((resolve, reject) => {
            def.SqlQ({
                sql: `update users_info set name=?, logo=?, phone=?, toy=?, checkin=?,  where user_id=?`,
                values: [ this.name, this.logo, this.phone, this.toy, this.checkin, this.user_id ]
            }).then((res) => { resolve(res) }).catch((reason) => { reject(reason) }) })
    }
    query () {
        return new Promise ((resolve, reject) => {
            def.SqlQ({ sql: `select * from users_info where user_id = ?`, values: [ this.user_id ] }).then((res) => { resolve(res) }).catch((reason) => { reject(reason) }) })
    }
    queryToy () {
        return new Promise ((resolve, reject) => {
            def.SqlQ({ sql: `select toy from users_info where user_id = ?`, values: [ this.user_id ] }).then((res) => { resolve(res) }).catch((reason) => { reject(reason) }) })
    }
}

module.exports = {
    Handle_usersInfo_table: Handle_usersInfo_table
}