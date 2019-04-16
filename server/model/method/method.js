let user_login = require("./user_login.js")
let import_xlsx_to_table = require("./import_xlsx_to_table.js")
let handle_article = require("./handle_article.js")

module.exports = {
    UserLogin : user_login.UserLogin,
    ImportXlsxToTable : import_xlsx_to_table.ImportXlsxToTable,
    Handle_article : handle_article.Handle_article
}