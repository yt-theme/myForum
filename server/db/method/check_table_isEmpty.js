let handle = require("../handle/handle")

// 判断表是否为空
class CheckIsEmpty {
    constructor (table) { this.table = table }

    check () { let table = this.table
        return new Promise ((resolve, reject) => {
            new handle.CheckTableEmpty(table).check()
            .then((v) => { resolve(v[0]['count(*)']) }) })
    }
}

module.exports = {
    CheckIsEmpty : CheckIsEmpty
}