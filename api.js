let express = require('express')
let apiA = express()
let moment = require('moment')
let cors = require('cors')
let apiA_port = 6970
apiA.use(cors())
apiA.all('*', (req, res, next) => {
    res.header("Access-Control-Allow-Credentials", true)
    res.header("Access-Control-Allow-Origin", "*")
    res.header("Access-Control-Allow-Headers", "X-Requested-With")
    res.header("Access-Control-Allow-Methods", "POST,GET,OPTIONS")
    res.header("Content-Type", "application/json;charset=utf-8")
    next()
})

apiA.post('/',(req, res, next) => {
    res.send('aaa')
})

apiA.listen(apiA_port, () => {
    console.log('api')
})

module.exports = api