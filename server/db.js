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
                else         { resolve('no result => sqlQ' + results) }
            })
        })
    })
}
// 数据库 init
class dbInit {
    // user 表初始化
    dbInit_users_table () {
        return new Promise ((resolve, reject) => {
            sqlQ({ sql: `create table if not exists \`users\` (
                    \`name\` char(30) default null unique,
                    \`passwd\` char(40) default null,
                    \`id\` bigint not null auto_increment,
                    primary key (\`id\`)
                ) engine=InnoDB auto_increment=1 default charset=utf8;`, values: [] })
                .then((v)  => { console.log('users table already init', v); resolve(v) })
                .catch((v) => { console.log('users table init err', v); reject(v) })
        })
    }
    // forum 版块 表初始化
    dbInit_forum_table () {
        return new Promise ((resolve, reject) => {
            sqlQ({ sql: `create table if not exists \`forum\` (
                    \`id\` bigint not null auto_increment,
                    \`forum_name\` char(40) default null,
                    \`article_count\` bigint default null,
                    \`user_count\` bigint default null,
                    \`create_time\` datetime default null,
                    primary key (\`id\`)
                ) engine=InnoDB auto_increment=1 default charset=utf8;`, values: [] })
                .then((v)  => { console.log('forum table already init', v); resolve(v) })
                .catch((v) => { console.log('forum table init err', v); reject(v) })
        }) 
    }
    // article_topic 主题 表初始化
    dbInit_article_table () {
        return new Promise ((resolve, reject) => {
            sqlQ({ sql: `create table if not exists \`article\` (
                    \`forum_id\` bigint default null,
                    \`id\` bigint not null auto_increment,
                    \`title\` char(40) default null,
                    \`author\` char(40) default null,
                    \`reply_count\` bigint default null,
                    \`create_time\` datetime default null,
                    primary key (\`id\`)
                ) engine=InnoDB auto_increment=1 default charset=utf8;`, values: [] })
                .then((v)  => { console.log('article table already init', v); resolve(v) })
                .catch((v) => { console.log('article table init err', v); reject(v) })
        }) 
    }
}
// handle user db
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

// 用户操作
class handleUser {
    constructor (name, passwd) {
        this.name   = name
        this.passwd = passwd
    }
    // 用户添加
    add () {
        let name=this.name,  passwd=this.passwd
        return new Promise ((resolve, reject) => {
            new handle_user_DB({'name': name}).query().then((res) => {
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
            new handle_user_DB({'name': name}).query().then((res) => {
                if (typeof res === 'object') {
                    if (String(res[0] && res[0]['passwd']) === String(passwd)) {  resolve('ok') } 
                    else { reject('name | password mismatch') }
                } else { reject('error') }
            })
        })
    }
    query () {
        let name=this.name
        return new Promise ((resolve, reject) => {
            new handle_user_DB({'name': name}).query().then((res) => {
                if (typeof res === 'object') { resolve(res) }
                else { reject(false) }
            })
        })
    }
}


// 对外方法
module.exports = {
    // 数据库初始化
    init: () => {
        // 用户表初始化
        new dbInit().dbInit_users_table().then((v) => { }).catch((v) => { })
        new dbInit().dbInit_forum_table().then((v) => { }).catch((v) => { })
        new dbInit().dbInit_article_table().then((v) => { }).catch((v) => { })

    },
    // 用户添加
    addUser: (name, passwd) => { return new handleUser(name, passwd).add() },
    // 检查用户密码
    checkPasswd: (name, passwd) => { return new handleUser(name, passwd).checkPasswd() },
    // 获取用户
    queryUser: (name) => { return new handleUser(name).query() }
}