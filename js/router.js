function Router () {  this.router = [] }
Router.prototype.route = function (routePath, callBack) { this.router.push({ 'path': routePath, 'callBack': callBack }) }
Router.prototype.validate = function (currentPath, callback) {
    this.router.forEach(ite => { if (currentPath === ite.path) { ite.callBack.apply(null, [callback]) } })
}
let r = new Router()
window.addEventListener('hashchange', function () { 
    let hash = window.location.hash.slice(1)
    // 将当前路由存到本地存储
    new handleLocalStorage({'route': hash}).set()
    r.validate(hash, window.location.href)
}, null)

// mainPage
r.route("/", (routePath) => {
    destorySeedCompAll()
    // 首页
    mainPageShow_list()
    js["comp_mainPage_list"].init()
    // toy 列表
    mainPageShow_toy()
    js["comp_mainPage_toy"].init(userToyList["data"])
})

r.route("/electric", (routePath) => { 
    destorySeedCompAll()
    // toy 列表
    mainPageShow_toy()
    js["comp_mainPage_toy"].init(userToyList["data"])
 })