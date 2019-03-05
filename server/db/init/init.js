let def = require("../def/def.js")
// 数据库 init
class dbInit {
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
    // user_info 表初始化
    dbInit_usersInfo_table () {
        return new Promise ((resolve, reject) => {
            def.SqlQ({ sql: `create table if not exists \`users_info\` (
                    \`id\` bigint not null auto_increment,
                    \`name\` varchar(30) default null unique,
                    \`logo\` varchar(256) default null,
                    \`phone\` varchar(11) default null,
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
                    \`title\` char default null,
                    \`link\` text default null,
                    \`bgc\` char(7) default null,
                    \`bgi\` text default null,
                    primary key (\`id\`)
                ) engine=InnoDB auto_increment=1 default charset=utf8;`, values: [] })
                .then((v)  => { console.log('toy table already init'); resolve(v) }).catch((v) => { console.log('toy table init err'); reject(v) })
        }) 
    }
}

// 数据表初始化
let Db_init = () => {
    // 用户表初始化
    new dbInit().dbInit_users_table().then((v) => { }).catch((v) => { })
    new dbInit().dbInit_usersInfo_table().then((v) => { }).catch((v) => { })
    // 论坛表初始化
    new dbInit().dbInit_forum_table().then((v) => { }).catch((v) => { })
    new dbInit().dbInit_article_table().then((v) => { }).catch((v) => { })
    new dbInit().dbInit_articleContent_table().then((v) => { }).catch((v) => { })
    new dbInit().dbInit_articleReply_table().then((v) => { }).catch((v) => { })
    // toy表初始化
    new dbInit().dbInit_toy_table().then((v) => { }).catch((v) => { })
}

module.exports = {
    Db_init : Db_init
}