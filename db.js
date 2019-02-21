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
                'sql': sqlObj.sql, 
                'values': sqlObj.values
            }, (err, results) => {
                connection.release()
                if (err) { reject('-1') }
                if (results) { resolve(results) } else { reject('no result') }
            })
        })
    })
}
// db init
function dbInit () {
    return new Promise ((resolve, reject) => {
        sqlQ({ sql: `create table if not exists \`users\` (
                \`id\` int(12) not null auto_increment,
                \`name\` char(30) default null,
                \`passwd\` char(40) default null,
                primary key (\`id\`)
            ) engine=InnoDB auto_increment=6 default charset=utf8;`, values: [] })
            .then((v)  => { resolve(v) })
            .catch((v) => { reject(v) })
    })
}

// handle db
class handle_user_DB {
    constructor (obj) {
        this.name = obj.name
        this.passwd = obj.passwd
        this.id = obj.id
    }
    insert () {
        return new Promise ((resolve, reject) => {
            sqlQ({ 
                sql: `insert into users (name, passwd) values (?, ?)`,
                values: [ this.name, this.passwd ] 
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

// new handle_user_DB({name: 'rse', passwd: 'resr'}).insert()
// new handle_user_DB({name: 'rse', passwd: '11'}).delete()
// new handle_user_DB({name: 'rse1', passwd: 'a', id: 12}).update()

module.exports  = {
    // 用户添加
    addUser: (name, passwd) => {
        return new Promise ((resolve, reject) => {
            // 先检测有没有 users 表 没有则生成
            dbInit().then((v) => {
                if (v) {
                    new handle_user_DB({'name': name}).query().then((res) => {
                        if (typeof res === 'object') {
                            if (res[0] && res[0]['name'] === name) {  reject('name exist') } 
                            else { new handle_user_DB({'name': name, 'passwd': passwd}).insert()
                                    .then((res)  => { resolve(res) })
                                    .catch((res) => { reject(res) }) }
                        } else { reject('error') }
                    })
                }
            })
        })
    }
    // addUser('usera', 'u1pwd')
    // .then((res)  => { console.log('add user', res) })
    // .catch((rea) => { console.log('add user', rea) })
}