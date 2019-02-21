function Router () {  this.router = [] }
Router.prototype.route = function (routePath, func) { this.router.push({ path: routePath, callBack: func }) }
Router.prototype.validate = function () {
    let [currentPath, ...arg] = [...arguments]
    this.router.forEach(item => { if (currentPath === item.path) { item.callBack.apply(null, arguments) } })
}
let r = new Router()
window.addEventListener('hashchange', function () { let hash = window.location.hash.slice(1); r.validate(hash, window.location.href) }, false)

// mainPage
r.route("/", function (routePath) {  
    mainPageShow_list()
    mainPageShow_toy()
})

r.route("/select", function (routePath) { })