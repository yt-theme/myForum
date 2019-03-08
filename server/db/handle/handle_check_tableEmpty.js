let def = require("../def/def")
class CheckTableEmpty {
    constructor (table) {
        this.table = table
    }

    check() { let table = this.table
        return new Promise ((resolve, reject) => {
            def.SqlQ({ sql: `select count(*) from ${table}`, values: [] }).then((res) => { resolve(res) }).catch((reason) => { reject(reason) }) })
    }
}

module.exports = {
    CheckTableEmpty : CheckTableEmpty
}