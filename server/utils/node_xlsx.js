let xlsx = require("node-xlsx")

// database <= => xlsx
class Handle_xlsx {
    constructor (obj) {
        this.path = obj.path
        // this.locationDB = {
        //     mysql: {
        //         host: 'localhost',
        //         user: 'root',
        //         password: 'root',
        //         database: 'forum',
        //         port: '3306'                
        //     }
        // }
    }
    query () { let path=this.path
        return new Promise ((resolve, reject) => {
            resolve(xlsx.parse(path))
        })
    }
    import () {
        return new Promise ((resolve, reject) => {

        })
    }
    importXlsx () {
        return new Promise ((resolve, reject) => {
           
        })
    }
    export () {
        return new Promise ((resolve, reject) => {

        })
    }
}

module.exports = {
    Handle_xlsx : Handle_xlsx
}