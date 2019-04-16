let handle = require("../handle/handle")

class Handle_article {
    constructor (obj) {
        // 属性
        this.forum_id    = obj.forum_id || ''
        this.article_id  = obj.article_id || ''
        this.author      = obj.author || ''
        // 查询
        this.page        = obj.page || ''
        this.rows        = obj.rows || ''
        // this.topic       = obj.topic || ''
        this.create_time = obj.create_time || ''
        // 发帖
        // 主题
        this.title       = obj.title || ''
        this.content     = obj.content || ''
        this.file        = obj.file || ''
        this.tag         = obj.tag || ''
        this.reply_count = obj.reply_count || 0
        this.create_time = obj.create_time || ''
        // 内容
        this.content     = obj.content || ''
    }
    insertArticle () {
        let forum_id=this.forum_id,  article_id=this.article_id,   title=this.title,
            content=this.content,    file=this.file,               tag=this.tag,
            author=this.author,      create_time=this.create_time
        return new Promise ((resolve, reject) => {
            new handle.Handle_article_table({
                'forum_id': forum_id,
                'article_id': article_id,
                'title': title,
                'content': content,
                'file': file,
                'tag': tag,
                'author': author,
                'create_time': create_time
            }).insertArticle().then((v) => { resolve(v) }).catch((v) => { reject(v) })
        })
    }
}

module.exports = {
    Handle_article : Handle_article
}