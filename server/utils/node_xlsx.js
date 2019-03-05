let xlsx = require("node-xlsx")

class Main {
    constructor (obj) {
        this.path = obj.path
    }
    query () {
        return new Promise ((resolve, reject) => {
            let obj = xlsx.parse(path)
            resolve(obj)
        })
    }
}

module.exports = {
    Main : Main
}