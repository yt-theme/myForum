let db = require('../db/db.js')

// 数据库初始化
function Init () { db.Init() }

module.exports = { Init : Init }