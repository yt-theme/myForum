let def = require("../def/def")

class Handle_article_table {
    constructor (obj) {
        this.forum_id    = obj.forum_id || ''
        this.page        = obj.page || ''
        this.rows        = obj.rows || ''
        this.topic       = obj.topic || ''
        this.author      = obj.author || ''
        this.create_time = obj.create_time || ''
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
    craetePageFourmQuery () { let forum_id=this.forum_id,  page=this.page,  rows=this.rows,  create_time=this.create_time

    }

// ################## add ###############

}

module.exports = {
    Handle_article_table : Handle_article_table
}