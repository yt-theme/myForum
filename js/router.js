function Router () {  this.router = [] }
Router.prototype.route = function (routePath, func) { this.router.push({ path: routePath, callBack: func }) }
Router.prototype.validate = function () {
    let [currentPath, ...arg] = [...arguments]
    this.router.forEach(item => { if (currentPath === item.path) { item.callBack.apply(null, arguments) } })
}
let r = new Router()
window.addEventListener('hashchange', function () { 
    let hash = window.location.hash.slice(1)
    // 将当前路由存到本地存储
    new handleLocalStorage({'route': hash}).set()
    r.validate(hash, window.location.href) }, false)

// mainPage
r.route("/", function (routePath) {
    // 清空以前组件
    delCompSeedAll()
    // 设置组件
    mainPageShow_list(); mainPageShow_toy()
})

r.route("/select", function (routePath) { 
    // 清空以前组件
    delCompSeedAll()
 })