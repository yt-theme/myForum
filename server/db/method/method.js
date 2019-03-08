let handle_user          = require("./handle_user")
let handle_userInfo      = require("./handle_userInfo")
let import_xlsx_toTable  = require("./import_xlsx_toTable")
let check_table_isEmpty  = require("./check_table_isEmpty")

module.exports = {
    HandleUser        : handle_user.HandleUser,
    HandleUserInfo    : handle_userInfo.HandleUserInfo,
    ImportXlsx        : import_xlsx_toTable.ImportXlsx,
    CheckTableIsEmpty : check_table_isEmpty.CheckIsEmpty
}