let db = require("../../db/db")

class UserAddToy {
    constructor (obj) {
        this.obj = obj
    }

    add () { let obj = this.obj
        return new Promise ((resolve, reject) => {
            db.UserAddToy(obj).add()
        })
    }
}