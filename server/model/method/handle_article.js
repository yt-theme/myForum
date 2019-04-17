let methods = require("../../db/method/method")
let utils = require("../../utils/utils")
var querystring = require('querystring')
let handle      = require('../handle/handle.js')
let def         = require('../def/def.js')

class Handle_article {
    constructor (req, res) {
        // 属性
        this.req         = req
        this.res         = res
    }
    createArticle() {
        // 需要传 { 'token': token }
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
                // 验证 token
                new handle.HandleToken({'token': dataObject['token']}).check()
                .then((v)  => {
                    // token 验证通过 插入帖
                    // 插入数据库
                    new methods.Handle_article({
                        'forum_id':     dataObject['forum_id'] || 'Electric',
                        'article_id':   new utils.Create_uuid().v4(),
                        'title':        dataObject['title'],
                        'content':      dataObject['content'],
                        'file':         dataObject['file'],
                        'tag':          dataObject['tag'],
                        'author':       dataObject['author'],
                        'create_time':  Number(Date.parse(new Date()).toString())
                    })
                    .insertArticle().then((v) => {
                        console.log('insertArticle =>', v)
                        // 返回 ok 数据
                        res.end(JSON.stringify({
                            'r': 1,
                            'msg': 'ok',
                        }) )
                    })
                    .catch((v) => { 
                        console.log("新增帖失败 => model => method => handle_article =>", v)
                        // 返回 err 数据
                        res.end(JSON.stringify({
                            'r': 0,
                            'msg': 'create article err',
                        }) )
                    })
                })
                .catch((v) => {
                    // token验证不通过则
                    res.end(JSON.stringify({
                        'r': 0,
                        'msg': 'token err',
                    }) )
                })
            })
        } else {
            // 如果不是post请求则
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