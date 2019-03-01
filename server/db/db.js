let init = require("./db_init")
let def = require("./db_def")

// handle user db
class handle_user_DB {
    constructor (obj) {
        this.name = obj.name
        this.passwd = obj.passwd
        this.id = obj.id
    }
    insert () {
        return new Promise ((resolve, reject) => {
            def.SqlQ({
                sql: `insert into users (name, passwd) values (?, ?)`,
                values: [ this.name, this.passwd ] 
            }).then((res) => { resolve(res) }).catch((reason) => { reject(reason) })
        })
    }
    delete () {
        return new Promise ((resolve, reject) => {
            def.SqlQ({ 
                sql: `delete from users where name = ?`,
                values: [ this.name ] 
            }).then((res) => { resolve(res) }).catch((reason) => { reject(reason) })
        })
    }
    update () {
        return new Promise ((resolve, reject) => {
            def.SqlQ({ 
                sql: `update users set name=?, passwd=? where id=?`,
                values: [ this.name, this.passwd, this.id ] 
            }).then((res) => { resolve(res) }).catch((reason) => { reject(reason) })
        })
    }
    query () {
        return new Promise ((resolve, reject) => {
            def.SqlQ({ 
                sql: `select * from users where id = ?`,
                values: [ this.id ] 
            }).then((res) => { resolve(res) }).catch((reason) => { reject(reason) })
        })
    }
    nameQuery () {
        return new Promise ((resolve, reject) => {
            def.SqlQ({ 
                sql: `select * from users where name = ?`,
                values: [ this.name ] 
            }).then((res) => { resolve(res) }).catch((reason) => { reject(reason) })
        })
    }
}

// 用户操作
class handleUser {
    constructor (name, passwd, id) {
        this.name   = name
        this.passwd = passwd
        this.id   = id

    }
    // 用户添加
    add () {
        let name=this.name,  passwd=this.passwd
        return new Promise ((resolve, reject) => {
            new handle_user_DB({'name': name}).nameQuery().then((res) => {
                if (typeof res === 'object') {
                    if (res[0] && res[0]['name'] === name) {  reject('name exist') } 
                    else { 
                        new handle_user_DB({'name': name, 'passwd': passwd}).insert()
                        .then((res)  => { resolve(res) })
                        .catch((res) => { reject(res)  }) }
                } else { reject('error') }
            })
        })
    }
    // 检查用户密码
    checkPasswd () {
        let name=this.name,  passwd=this.passwd
        return new Promise ((resolve, reject) => {
            new handle_user_DB({'name': name}).nameQuery().then((res) => {
                if (typeof res === 'object') {
                    if (String(res[0] && res[0]['passwd']) === String(passwd)) {  resolve('ok') } 
                    else { reject('name | password mismatch') }
                } else { reject('error') }
            })
        })
    }
    query () {
        let id=this.id
        return new Promise ((resolve, reject) => {
            new handle_user_DB({'id': id}).query().then((res) => {
                if (typeof res === 'object') { resolve(res) } else { reject(false) }
            })
        })
    }
    nameQuery () {
        let name=this.name
        return new Promise ((resolve, reject) => {
            new handle_user_DB({'name': name}).nameQuery().then((res) => {
                if (typeof res === 'object') { resolve(res) } else { reject(false) }
            })
        })
    }
}


// 对外方法
module.exports = {
    // 数据库初始化
    init: () => { init.Db_init() },
    // 用户添加
    addUser: (name, passwd) => { return new handleUser(name, passwd, '').add() },
    // 检查用户密码
    checkPasswd: (name, passwd) => { return new handleUser(name, passwd, '').checkPasswd() },
    // 获取用户表
    queryUser: (id) => { return new handleUser('', '', id).query() },
    // 使用用户名获取用户表
    nameQueryUser: (name) => { return new handleUser(name, '', '').nameQuery() }
}