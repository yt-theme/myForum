let handle = require("../handle/handle.js")
let utils   = require("../../utils/utils.js")

// toy 操作
class ImportXlsx {
    constructor (obj) {
        this.id    = obj.id
        this.type  = obj.type
        this.title = obj.title
        this.link  = obj.link
        this.bgc   = obj.bgc
        this.bgi   = obj.bgi
        // xlsx 路径
        this.path  = obj.path
    }
    // toy 导入
    importToy () { let path=this.path
        return new Promise ((resolve, reject) => {
            // 读取 xlsx
            new utils.Handle_xlsx({"path": path}).query()
            .then((v) => {
                let fieldList  = v[0]["data"]
                let fieldName  = fieldList[0]
                // 赋值给 fieldValue [bgi] => base64 并去除空元素
                let fieldValue = fieldList.slice(1)
                let tmp_fieldValue = []
                fieldValue.forEach(ite => { 
                    if (ite.length>0) {
                        let ite_5_len = ite[5].length
                        let buf = new Buffer.alloc(ite_5_len)
                        buf.write(ite[5])
                        ite[5] = buf.toString('base64')
                        tmp_fieldValue.push(ite)
                    }
                })
                fieldValue = tmp_fieldValue

                resolve(v)

                let sql = `insert into toy ( ${fieldName} ) values ${ fieldValue.reduce((prev, cur, index, arr) => {
                    let tmpTxt = cur[0]+','+cur[1]+',"'+cur[2]+'","'+cur[3]+'","'+cur[4]+'","'+cur[5]+'"'
                    if (index === fieldValue.length - 1) { return prev + '(' + tmpTxt + ');' } else { return prev + '(' + tmpTxt + '),' } }, '')}
                    `
                console.log('toy sql =>', sql)

                new handle.Handle_toy_table({"sql": sql}).arrInsert()
                .then((v1) => { if (typeof v1 === 'object') { resolve(v1) } else { resolve(false) } })
            })
        })
    }
}

module.exports = {
    ImportXlsx : ImportXlsx
}