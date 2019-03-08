var path = require('path')

// json head
let JsonHead = {'Content-Type': 'application/json'}
// token 密钥
let Rsa_private_key = path.join(__dirname, '../../rsa_private_key.pem')
let Rsa_public_key = path.join(__dirname, '../../rsa_public_key.pem')

// toy xlsx 路径
let Toy_xlsx_path = path.join(__dirname, "../../../import_toy.xlsx")

module.exports = {
    JsonHead        : JsonHead,
    Rsa_private_key : Rsa_private_key,
    Rsa_public_key  : Rsa_public_key,
    Toy_xlsx_path   : Toy_xlsx_path
}