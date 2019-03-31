let handle_user_table = require("./handle_user_table")
let handle_usersInfo_table = require("./handle_usersInfo_table")
let handle_toy_table  = require("./handle_toy_table")
let handle_check_tableEmpty = require("./handle_check_tableEmpty")
let handle_article_table = require("./handle_article_table")

module.exports = {
    Handle_user_table      : handle_user_table.Handle_user_table,
    Handle_usersInfo_table : handle_usersInfo_table.Handle_usersInfo_table,
    Handle_toy_table       : handle_toy_table.Handle_toy_table,
    Handle_article_table   : handle_article_table.Handle_article_table,
    CheckTableEmpty        : handle_check_tableEmpty.CheckTableEmpty
}