let def = require("../def/def")

class Handle_article_table {
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

// ################## query ###############

    // 基于 某 ( forum_id ) 中所有 数据查询
    forumQuery () { let forum_id=this.forum_id
        return new Promise ((resolve, reject) => {
            def.SqlQ({ sql: `select * from article where form_id = ?`, values: [forum_id] }).then((res) => { resolve(res) }).catch((reason) => { reject(reason) }) })
    }
    // 基于 ( forum_id && 分页 ) 查询
    pageForumQuery () { let forum_id=this.forum_id,  page=this.page,  rows=this.rows
        return new Promise ((resolve, reject) => {
            def.SqlQ({ sql: `
                select * from article where form_id = ?
                `, values: [forum_id] }).then((res) => { resolve(res) }).catch((reason) => { reject(reason) }) })
    }
    // 基于 ( forum_id && 分页 && 主题 ) 查询
    topicPageForumQuery () { let forum_id=this.forum_id,  page=this.page,  rows=this.rows,  topic=this.topic

    }
    // 基于 ( forum_id && 分页 && 作者 ) 查询
    authorPageForumQuery () { let forum_id=this.forum_id,  page=this.page,  rows=this.rows,  author=this.author

    }
    // 基于 ( forum_id && 分页 && 编写时间 ) 查询
    createPageFourmQuery () { let forum_id=this.forum_id,  page=this.page,  rows=this.rows,  create_time=this.create_time

    }
    // 新增 article 标题/属性 内容
    insertArticle () {
        let forum_id=this.forum_id,  article_id=this.article_id,   title=this.title,
            content=this.content,    file=this.file,               tag=this.tag,
            author=this.author,      create_time=this.create_time
        
        return new Promise ((resolve, reject) => {
            let promise_title = new Promise ((resolve, reject) => {
                def.SqlQ({ sql: `
                        insert into article (forum_id, article_id, title, file, tag, author, reply_count, create_time) values (?, ?, ?, ?, ?, ?, ?, ?)
                    `, values: [forum_id, article_id, title, file, tag, author, 0, create_time] }).then((res) => { resolve(res) }).catch((reason) => { reject(reason) }) })
            
            let promise_content = new Promise ((resolve, reject) => {
                def.SqlQ({ sql: `
                        insert into article_content (forum_id, article_id, content) values (?, ?, ?)
                    `, values: [forum_id, article_id, content] }).then((res) => { resolve(res) }).catch((reason) => { reject(reason) }) })
            
            Promise.all([promise_title, promise_content]).then((v) => {
                // let title_result=valueArr[0],  content_result=valueArr[1]
                resolve(v)
            }).catch((v) => { reject(v) })
        })
    }
}

module.exports = {
    Handle_article_table : Handle_article_table
}