let handle = require("../handle/handle")

class HandleUserInfo {
    constructor (obj) {
        this.user_id = obj.user_id
        this.name    = obj.name
        this.logo    = obj.logo
        this.toy     = obj.toy
        this.phone   = obj.phone
        this.checkin = obj.checkin
    }

    // 添加 users_info 内容
    insert () { let user_id=this.user_id,  name=this.name,  logo=this.logo,  phone=this.phone,  toy=this.toy,  checkin=this.checkin
        return new Promise ((resolve, reject) => {
            new handle.Handle_usersInfo_table({ "user_id": user_id, "name": name, "logo": logo, "phone": phone, "toy": toy, "checkin": checkin }).insert().then((v) => { resolve(v) }).catch((v) => { reject(v) }) })
    }

    // 删除 users_info 内容
    delete () { let user_id = this.user_id
        return new Promise ((resolve, reject) => {
            new handle.Handle_usersInfo_table({ "user_id": user_id }).delete().then((v) => { resolve(v) }).catch((v) => { reject(v) }) })
    }

    // 修改 users_info 其中内容
    update () { let user_id=this.user_id,  name=this.name,  logo=this.logo,  toy=this.toy,  checkin=this.checkin
        return new Promise ((resolve, reject) => {
            new handle.Handle_usersInfo_table({ "user_id": user_id, "name": name, "logo": logo, "toy": toy, "checkin": checkin }).update().then((v) => { resolve(v) }).catch((v) => { reject(v) }) })
    }

    // 查询 users_info 内容
    query () { let user_id = this.user_id
        return new Promise ((resolve, reject) => {
            new handle.Handle_usersInfo_table({ "user_id": user_id }).query().then((v) => { resolve(v) }).catch((v) => { reject(v) }) })
    }

    queryToy () { let user_id = this.user_id
        return new Promise ((resolve, reject) => {
            new handle.Handle_usersInfo_table({ "user_id": user_id }).queryToy().then((v) => { resolve(v) }).catch((v) => { reject(v) }) })
    }
}

module.exports = {
    HandleUserInfo : HandleUserInfo
}