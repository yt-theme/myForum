let def   = require("../def/def.js")
let db    = require("../db")
let model = require("../../model/model")
// 数据库 init
class dbInit {
    constructor (obj) {
        if (obj) {
            this.path = obj.path
        }
    }
    // users 表初始化
    dbInit_users_table () {
        return new Promise ((resolve, reject) => {
            def.SqlQ({ sql: `create table if not exists \`users\` (
                    \`name\` varchar(30) default null unique,
                    \`passwd\` varchar(40) default null,
                    \`id\` bigint not null auto_increment,
                    primary key (\`id\`)
                ) engine=InnoDB auto_increment=1 default charset=utf8;`, values: [] })
                .then((v)  => { console.log('users table already init'); resolve(v) }).catch((v) => { console.log('users table init err'); reject(v) })
        })
    }
    // users_info 表初始化
    dbInit_usersInfo_table () {
        return new Promise ((resolve, reject) => {
            def.SqlQ({ sql: `create table if not exists \`users_info\` (
                    \`id\` bigint not null auto_increment,
                    \`user_id\` bigint default null,
                    \`create_time\` bigint not null,
                    \`name\` varchar(30) default null unique,
                    \`logo\` varchar(256) default null,
                    \`phone\` varchar(11) default null,
                    \`toy\` varchar(1024) default null,
                    \`checkin\` smallint(9) default null,
                    primary key (\`id\`)
                ) engine=InnoDB auto_increment=1 default charset=utf8;`, values: [] })
                .then((v)  => { console.log('users_info table already init'); resolve(v) }).catch((v) => { console.log('users_info table init err'); reject(v) })
        })
    }
    // forum 版块 表初始化
    dbInit_forum_table () {
        return new Promise ((resolve, reject) => {
            def.SqlQ({ sql: `create table if not exists \`forum\` (
                    \`id\` bigint not null auto_increment,
                    \`forum_name\` varchar(40) default null,
                    \`article_count\` bigint default null,
                    \`user_count\` bigint default null,
                    \`create_time\` datetime default null,
                    primary key (\`id\`)
                ) engine=InnoDB auto_increment=1 default charset=utf8;`, values: [] })
                .then((v)  => { console.log('forum table already init'); resolve(v) }).catch((v) => { console.log('forum table init err'); reject(v) })
        }) 
    }
    // article_topic 主题 表初始化
    dbInit_article_table () {
        return new Promise ((resolve, reject) => {
            def.SqlQ({ sql: `create table if not exists \`article\` (
                    \`id\` bigint not null auto_increment,
                    \`forum_id\` bigint default null,
                    \`title\` varchar(40) default null,
                    \`author\` varchar(30) default null,
                    \`reply_count\` bigint default null,
                    \`create_time\` datetime default null,
                    primary key (\`id\`)
                ) engine=InnoDB auto_increment=1 default charset=utf8;`, values: [] })
                .then((v)  => { console.log('article table already init'); resolve(v) }).catch((v) => { console.log('article table init err'); reject(v) })
        }) 
    }
    // article_content 主题内容 表初始化
    dbInit_articleContent_table () {
        return new Promise ((resolve, reject) => {
            def.SqlQ({ sql: `create table if not exists \`article_content\` (
                    \`id\` bigint not null auto_increment,
                    \`forum_id\` bigint default null,
                    \`article_id\` varchar(40) default null,
                    \`content\` longtext default null,
                    primary key (\`id\`)
                ) engine=InnoDB auto_increment=1 default charset=utf8;`, values: [] })
                .then((v)  => { console.log('article_content table already init'); resolve(v) }).catch((v) => { console.log('article_content table init err'); reject(v) })
        }) 
    }
    // article_reply 主题评论 表初始化
    dbInit_articleReply_table () {
        return new Promise ((resolve, reject) => {
            def.SqlQ({ sql: `create table if not exists \`article_reply\` (
                    \`id\` bigint not null auto_increment,
                    \`forum_id\` bigint default null,
                    \`article_id\` varchar(40) default null,
                    \`author\` varchar(30) default null,
                    \`content\` longtext default null,
                    primary key (\`id\`)
                ) engine=InnoDB auto_increment=1 default charset=utf8;`, values: [] })
                .then((v)  => { console.log('article_reply table already init'); resolve(v) }).catch((v) => { console.log('article_reply table init err'); reject(v) })
        }) 
    }

    // toy 表初始化
    // toy 我的成长 我的工具 互动讨论
    // type => "1" 我的成长 "2" 我的工具 "3" 互动讨论
    dbInit_toy_table () {
        return new Promise ((resolve, reject) => {
            def.SqlQ({ sql: `create table if not exists \`toy\` (
                    \`id\` bigint not null auto_increment,
                    \`type\` char(1) default 1,
                    \`title\` char(14) default null,
                    \`link\` TEXT default null,
                    \`bgc\` char(7) default null,
                    \`bgi\` TEXT default null,
                    primary key (\`id\`)
                ) engine=InnoDB auto_increment=1 default charset=utf8;`, values: [] })
                .then((v)  => { console.log('toy table already init'); resolve(v) }).catch((v) => { console.log('toy table init err'); reject(v) })
        }) 
    }

    // home_hot 表初始化 首页 热点置顶帖
    dbInit_homeHot_table () {
        return new Promise ((resolve, reject) => {
            def.SqlQ({ sql: `create table if not exists \`home_hot\` (
                    \`id\` bigint not null auto_increment,
                    \`article_id\` bigint not null,
                    \`type\` char(1) default 1,
                    \`author\` varchar(30) default null,
                    \`title\` char(14) default null,
                    \`link\` TEXT default null,
                    \`tag\` char(1) default null,
                    primary key (\`id\`)
                ) engine=InnoDB auto_increment=1 default charset=utf8;`, values: [] })
                .then((v)  => { console.log('home_hot table already init'); resolve(v) }).catch((v) => { console.log('toy table init err'); reject(v) })
        }) 
    }
    // 文件表
    dbInit_file_table () {
        return new Promise ((resolve, reject) => {
            def.SqlQ({ sql: `create table if not exists \`file\` (
                    \`id\` bigint not null auto_increment,
                    \`author\` varchar(30) default null,
                    \`title\` char(14) default null,
                    \`link\` TEXT default null,
                    \`tag\` char(1) default null,
                    primary key (\`id\`)
                ) engine=InnoDB auto_increment=1 default charset=utf8;`, values: [] })
                .then((v)  => { console.log('file table already init'); resolve(v) }).catch((v) => { console.log('toy table init err'); reject(v) })
        }) 
    }
}

// 数据表初始化
function Db_init () {
    return new Promise ((resolve, reject) => {
        // 用户表初始化
        new dbInit().dbInit_users_table()
        new dbInit().dbInit_usersInfo_table()
        // 论坛表初始化
        new dbInit().dbInit_forum_table()
        new dbInit().dbInit_article_table()
        new dbInit().dbInit_articleContent_table()
        new dbInit().dbInit_articleReply_table()
        // toy表初始化
        new dbInit().dbInit_toy_table().then((v) => { resolve(v) }).catch((v) => { reject(v) })
        // 首页 home_hot 表初始化
        new dbInit().dbInit_homeHot_table().then((v) => { resolve(v) }).catch((v) => { reject(v) })
        // 文件表 初始化
        new dbInit().dbInit_file_table().then((v) => { resolve(v) }).catch((v) => { reject(v) })
    })
}

module.exports = {
    Db_init : Db_init
}