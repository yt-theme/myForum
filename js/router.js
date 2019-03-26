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
    // 路由切换时 forum select 同时改变
    console.log("hashchange forum select change", hash)
    switch (hash) {
        case '' : break
        case '/': selectE("#headerSelectForum")[0].value = "Home"; break
        case '/electric': selectE("#headerSelectForum")[0].value = "Electric"; break
        case '/talk': selectE("#headerSelectForum")[0].value = "Talk"; break
    }

    

}, null)

// mainPage
r.route("/", (routePath) => {
    destorySeedCompExcept(['mainPage_toy'])

    // 首页
    mainPageShow_list()
    js["comp_mainPage_list"].init()

    // toy 列表
    mainPageShow_toy()
    js["comp_mainPage_toy"].init(userToyList["toy"])
    // 保持 切换路由 时设置 用户年龄
    userAge_ChangeFunc(new handleLocalStorage(["age"]).query()["age"])
})

r.route("/electric", (routePath) => { 
    destorySeedCompExcept(['mainPage_toy'])

    // 主题列表
    main_electricShow_list()
    js["comp_main_electric_list"].init()

    // toy 列表
    mainPageShow_toy()
    js["comp_mainPage_toy"].init(userToyList["toy"])
    // 保持 切换路由 时设置 用户年龄
    userAge_ChangeFunc(new handleLocalStorage(["age"]).query()["age"])
})

r.route("/talk", (routePath) => { 
    destorySeedCompAll()
})