let def = require("../def/def.js")

// handle user db
class Handle_user_table {
    constructor (obj) { this.name=obj.name; this.passwd=obj.passwd; this.id=obj.id }
    insert () {
        return new Promise ((resolve, reject) => {
            def.SqlQ({ sql: `insert into users (name, passwd) values (?, ?)`, values: [ this.name, this.passwd ] }).then((res) => { resolve(res) }).catch((reason) => { reject(reason) }) })
    }
    delete () {
        return new Promise ((resolve, reject) => {
            def.SqlQ({ sql: `delete from users where name = ?`, values: [ this.name ] }).then((res) => { resolve(res) }).catch((reason) => { reject(reason) }) })
    }
    update () {
        return new Promise ((resolve, reject) => {
            def.SqlQ({ sql: `update users set name=?, passwd=? where id=?`, values: [ this.name, this.passwd, this.id ] }).then((res) => { resolve(res) }).catch((reason) => { reject(reason) }) })
    }
    query () {
        return new Promise ((resolve, reject) => {
            def.SqlQ({ sql: `select * from users where id = ?`, values: [ this.id ] }).then((res) => { resolve(res) }).catch((reason) => { reject(reason) }) })
    }
    nameQuery () {
        return new Promise ((resolve, reject) => {
            def.SqlQ({ sql: `select * from users where name = ?`, values: [ this.name ] }).then((res) => { resolve(res) }).catch((reason) => { reject(reason) }) })
    }
}

module.exports = {
    Handle_user_table: Handle_user_table
}