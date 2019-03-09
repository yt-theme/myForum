let handle = require("../handle/handle")

class HandleToy {
    constructor (obj) {
        if (obj) {
            this.id   = obj.id || ""
            this.type = obj.type || ""
        }
    }

    // 查询 toy 按 id type
    query () { let id=this.id,  type=this.type
        return new Promise ((resolve, reject) => {
            new handle.Handle_toy_table({"id": id, "type": type}).query().then((v) => { resolve(v) }).catch((v) => { reject(v) }) })
    }
    // 查询所有
    queryAll () {
        return new Promise ((resolve, reject) => {
            new handle.Handle_toy_table().queryAll().then((v) => { resolve(v) }).catch((v) => { reject(v) }) })
    }
    // 检索所有 id
    queryAllId () {
        return new Promise ((resolve, reject) => {
            new handle.Handle_toy_table().queryAllId().then((v) => { resolve(v) }).catch((v) => { reject(v) }) })
    }
}

module.exports = {
    HandleToy : HandleToy
}