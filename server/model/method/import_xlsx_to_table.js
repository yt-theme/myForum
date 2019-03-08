let db = require("../../db/db")

class ImportXlsxToTable {
    constructor (obj) { this.path = obj.path }

    toy () { let path = this.path
        return new Promise ((resolve, reject) => {
            // 如果 toy 表无内容则导入
            // 1. 判断 toy 表中内容
            db.CheckTableIsEmpty("toy")
            .then((v) => {
                // 如果不为空
                if (v) { console.log('toy表不为空 => 不导入xlsx (model) =>', v) }
                // 如果为空
                else { db.ImportXlsx({"path": path}).importToy()
                       .then((v) => { resolve(v) }) } })
        })
    }
}

module.exports = {
    ImportXlsxToTable : ImportXlsxToTable
}