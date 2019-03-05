let handle = require("../handle/handle.js")

// toy 操作
class HandleToy {
    constructor (obj) {
        this.id    = obj.id
        this.type  = obj.type
        this.title = obj.title
        this.link  = obj.link
        this.bgc   = obj.bgc
        this.bgi   = obj.bgi
    }
    // excel 方式导入
    xlsxAdd () { let id=this.id, type=this.type, title=this.title, link=this.link, bgc=this.bgc, bgi=this.bgi
        return new Promise ((resolve, reject) => {
            // 读取 xlsx
            new handle.Handle_toy_table({
                "id": id, "type": type, "title": title, "link": link, "bgc": bgc, "bgi": bgi
            }).insert().then((v) => {

            })
        })
    }
}

module.exports = {
    HandleToy: HandleToy
}