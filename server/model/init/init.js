let db = require('../../db/db.js')

// 数据库初始化
function Init () { 
    return new Promise ((resolve, reject) => {
        db.Init().then((v) => { resolve(v) })
    }) 
}

module.exports = { Init : Init }