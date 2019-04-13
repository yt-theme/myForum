let uuid = require('uuid')

class CreateUuid {
    constructor () {

    }
    v1 () { return uuid.v1() }
    v4 () { return uuid.v4() }
}

module.exports = {
    CreateUuid : CreateUuid
}