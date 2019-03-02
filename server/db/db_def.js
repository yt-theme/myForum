let mysql = require('mysql')

var mysqlPool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'forum'
})
// query mysql
function SqlQ (sqlObj) {
    return new Promise ((resolve, reject) => {
        mysqlPool.getConnection(function(err, connection) {
            if (err) { reject('err'); return false }
            connection.query({ 'sql': sqlObj.sql, 'values': sqlObj.values }, (err, results) => {
                connection.release()
                if (err)     { reject('-1 => sqlQ'); return false }
                if (results) { resolve(results) } else { resolve('no result => sqlQ' + results) }
            })
        })
    })
}

module.exports = {
    SqlQ : SqlQ
}