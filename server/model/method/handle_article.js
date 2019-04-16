let methods = require("../../db/method/method")
let utils = require("../../utils/utils")
var querystring = require('querystring')
let def         = require('../def/def.js')

class Handle_article {
    constructor (req, res) {
        // 属性
        this.req         = req
        this.res         = res
    }
    createArticle() {
        console.log("create..")
        let req         = this.req,
            res         = this.res
        if (req.method === 'POST') {
            // 存储接收数据
            let reqData = ''
            res.writeHead(200, def.JsonHead)
            req.on('data', function (chunk) { reqData += chunk })
            req.on("end", function(){
                // 接收的数据
                let dataObject = querystring.parse(decodeURI(reqData))
                // 插入数据库
                methods.Handle_article({
                    'forum_id':     dataObject['forum_id'] || 'Electric',
                    'article_id':   new utils.Create_uuid().v4(),
                    'title':        dataObject['title'],
                    'content':      dataObject['content'],
                    'file':         dataObject['file'],
                    'tag':          dataObject['tag'],
                    'author':       dataObject['author'],
                    'create_time':  Date.parse(new Date()).toString()
                }).insertArticle().then((v) => {
                    console.log('insertArticle =>', v)
                    // 返回数据
                    res.end(JSON.stringify({
                        'r': 1,
                        'msg': 'ok',
                    }) )
                })
                .catch((v) => { 
                    console.log("新增帖失败 => method => handle_article") 
                })
            })
        } else {
            res.end(JSON.stringify({
                'r': 0,
                'msg': 'request method err',
            }) )
        }
    }
}

module.exports = {
    Handle_article : Handle_article
}