let mysql = require('mysql')

var mysqlPool = mysql.createPool({
    host: '127.0.0.1',
    user: 'root',
    password: 'root',
    database: 'forum'
})

// query mysql
function sqlQ (sql, errFunc, succFunc, noResFunc) {
    mysqlPool.getConnection(function(err, connection) {
        if (err) { return false }
        connection.query(sql, (err, results) => {
            connection.release()
            if (err)     { if (typeof errFunc === 'function') { errFunc(err) } }
            if (results) { if (typeof succFunc === 'function') { succFunc(results) } } 
            else         { if (typeof noResFunc === 'function') { noResFunc('no result') } }
        })
    })
}

// db init
sqlQ(`create table if not exists \`users\` (
        \`id\` int(12) not null auto_increment,
        \`uid\` int(12) not null auto_increment,
        \`name\` char(30) default null,
        \`passwd\` char(40) default null,
        primary key (\`id\`)
    ) engine=InnoDB auto_increment=6 default charset=utf8;`, function(v){console.log('err', v)}, function(v){console.log('success', v)}, function(v){console.log('no result', v)})

// handle db
class handle_user_DB {
    constructor (name, passwd, uid) {
        this.name = name
        this.passwd = passwd
        this.uid = uid
    }
    add () {
        sqlQ(`insert into users (name, passwd) values (${this.name}, ${this.passwd})`
        , function(v){console.log('err', v)}, function(v){console.log('success', v)}, function(v){console.log('no result', v)})
    }
    delete () {
        sqlQ(`delete from users where uid = '${this.name}')`)
    }
    edit () {

    }
    queryUid () {
        sqlQ()
    }
}

// insert user
new handle_user_DB('001111', '001001001001001001001').add()
new handle_user_DB('', '', ).delete()