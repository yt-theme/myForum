let mysql = require('mysql')

var mysqlPool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'forum'
})

// query mysql
function sqlQ (sqlObj) {
    return new Promise ((resolve, reject) => {
        mysqlPool.getConnection(function(err, connection) {
            if (err) { 
                reject('err')
                return false 
            }
            connection.query({
                'sql':    sqlObj.sql, 
                'values': sqlObj.values
            }, (err, results) => {
                connection.release()
                if (err)     { reject('-1 => sqlQ'); return false }
                if (results) { resolve(results)                    }
                else         { resolve('no result => sqlQ')       }
            })
        })
    })
}
function dbInit_users_table () {
    return new Promise ((resolve, reject) => {
        sqlQ({ sql: `create table if not exists \`users\` (
                \`id\` int(12) not null auto_increment,
                \`name\` char(30) default null,
                \`passwd\` char(40) default null,
                \`token\` char(40) default null,
                primary key (\`id\`)
            ) engine=InnoDB auto_increment=6 default charset=utf8;`, values: [] })
            .then((v)  => { resolve(v) })
            .catch((v) => { reject(v) })
    })
}
// handle user db
class handle_user_DB {
    constructor (obj) {
        this.name = obj.name
        this.passwd = obj.passwd
        this.token = obj.token
        this.id = obj.id
    }
    insert () {
        return new Promise ((resolve, reject) => {
            sqlQ({ 
                sql: `insert into users (name, passwd, token) values (?, ?, ?)`,
                values: [ this.name, this.passwd, this.token ] 
            }).then((res) => { resolve(res) }).catch((reason) => { reject(reason) })
        })
    }
    delete () {
        return new Promise ((resolve, reject) => {
            sqlQ({ 
                sql: `delete from users where name = ?`,
                values: [ this.name ] 
            }).then((res) => { resolve(res) }).catch((reason) => { reject(reason) })
        })
    }
    updateToken () {
        return new Promise ((resolve, reject) => {
            sqlQ({
                sql: `update users set token = ?`,
                values: [this.token]
            }).then((res) => { resolve(res) }).catch((reason) => { reject(reason) })
        })
    }
    update () {
        return new Promise ((resolve, reject) => {
            sqlQ({ 
                sql: `update users set name=?, passwd=? where id=?`,
                values: [ this.name, this.passwd, this.id ] 
            }).then((res) => { resolve(res) }).catch((reason) => { reject(reason) })
        })
    }
    query () {
        return new Promise ((resolve, reject) => {
            sqlQ({ 
                sql: `select * from users where name = ?`,
                values: [ this.name ] 
            }).then((res) => { resolve(res) }).catch((reason) => { reject(reason) })
        })
    }
}

// 用户操作
class handleUser {
    constructor (name, passwd, token) {
        this.name   = name
        this.passwd = passwd
        this.token  = token
    }
    // 用户添加
    add () {
        let name=this.name,  passwd=this.passwd
        return new Promise ((resolve, reject) => {
            new handle_user_DB({'name': name}).query().then((res) => {
                if (typeof res === 'object') {
                    if (res[0] && res[0]['name'] === name) {  reject('name exist') } 
                    else { 
                        new handle_user_DB({'name': name, 'passwd': passwd, 'token': ''}).insert()
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
            new handle_user_DB({'name': name}).query().then((res) => {
                if (typeof res === 'object') {
                    if (String(res[0] && res[0]['passwd']) === String(passwd)) {  resolve('ok') } 
                    else { reject('name | password mismatch') }
                } else { reject('error') }
            })
        })
    }
    // 检查用户token
    checkToken () {
        let name=this.name,  passwd=this.passwd, token=this.token
        return new Promise ((resolve, reject) => {
            new handle_user_DB({'name': name}).query().then((res) => {
                if (typeof res === 'object') {
                    if (res[0] && res[0]['name'] === name) {  reject('name exist') } 
                    else { 
                        new handle_user_DB({'name': name, 'passwd': passwd, 'token': ''}).insert()
                        .then((res)  => { resolve(res) })
                        .catch((res) => { reject(res)  }) }
                } else { reject('error') }
            })
        })
    }
}


// 对外方法
module.exports = {
    // 数据库初始化
    init: () => {
        // 用户表初始化
        dbInit_users_table().then((v) => { console.log('db users table init', v)}).catch((v) => { console.log('db users table init err', v) })
    },
    // 用户添加
    addUser: (name, passwd) => { return new handleUser(name, passwd).add() },
    // 检查用户密码
    checkPasswd: (name, passwd) => { return new handleUser(name, passwd).checkPasswd() },
    // 检查token
    checkUserToken: (name) => { return new handleUser(name).checkToken() }
}