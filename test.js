let mysql = require('mysql')
let connect = mysql.createConnection({
    host: 'localhost',
    user: 'admin',
    password: 'admin',
    port: '3306',
    database: 'forum'
})

connect.connect()