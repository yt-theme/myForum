// host
let host = 'localhost'
// window
let that = this
// 存储组件
let appendCompDat = []
window.onload = function () {
    console.log('hash', window.location.hash)
    // 定义组件方法保存
    this.js = {}
    this.data = {}
    // 页面加载后跳转此路由
    window.location.hash = ''
    window.location.hash = new handleLocalStorage(['route']).query()['route'] || '/'
    // header 时间 初始值
    headerTimeController()
    // header 时间 计时开始
    setInterval(() => { headerTimeController() }, 1000)
}

// 选择器
function selectE (elem) { return document.querySelectorAll(elem) }

// 删除子元素
// 删除指定
function delChildE (elem, target) { elem.removeChild(target) }
function delChildAll (elem) { elem.innerHTML = '' }

// 获取数组某个相同元素
function getArraySameIte (arr, target) { let n = 0; arr.forEach(ite => { if (ite === target) {  n += 1 } }); return n }

// 获取id为某元素中的id或class为某值的元素列表
function getChildTargetEleListById (elem, idOrClass, target) {
    let child_list = selectE(elem)[0].children
    let arr = []
    let forM = (v) => { for (let i=0; i<child_list.length; i++) { if (child_list[i][v].split(' ')[0] === target) { arr.push(child_list[i][v]) } } }
    if      (idOrClass === 'id')    { forM('id') }
    else if (idOrClass === 'class') { forM('className') }
    else                            { return false }
    return arr
}

// append 加载组件 compo为组件 ele为在哪个html标签内添加组件
function appendComp (comp, ele) {
    // 全局查找有没有ele名称的id 如果有则不再添加
    if (getChildTargetEleListById('#' + ele, 'class', comp['name']).length>0) {
        console.log('已经加载过组件', comp['name'])
        return false
    } else {
        // cid
        let div = document.createElement('div')
        
        // 设置组件外层元素cid class
        div.setAttribute('class', comp['name'])
        div.setAttribute('cid', comp['name'])
        div.className = div.className + ' ' + 'pos_a w_100 h_100'
        selectE( '#' + ele )[0].appendChild(div)
        selectE( '#' + ele )[0].style.display = 'block'
        // 将组件添加到外层元素内
        selectE( '.' + comp['name'] )[0].innerHTML = comp.html
        that.js[comp['name']] = comp['js']
        that.data[comp['name']] = comp['data']
        // 添加销毁方法
        that.js[comp['name']].destory = (_this_) => { let elem = _this_ ? _this_ : selectE('#' + comp['name'])[0]; elem.parentNode.parentNode.style.display = 'none'; delChildE(elem.parentNode.parentNode, elem.parentNode)}
    }
}
console.log(window)

// header 时间
function headerTimeController () {
    let date = new Date()
    let h    = date.getHours()
    let m    = date.getMinutes(); if (m<10) { m = '0' + m }
    let s    = date.getSeconds(); if (s<10) { s = '0' + s }
    let mm   = date.getMonth() + 1
    let dd   = date.getDate()
    let week = date.getDay()
    let w_t  = ''
    switch (week) { case 0: w_t = '日'; break; case 1: w_t = '一'; break; case 2: w_t = '二'; break; case 3: w_t = '三'; break; case 4: w_t = '四'; break; case 5: w_t = '五'; break; case 6: w_t = '六'; break; default: break }
    selectE('#hederTime')[0].innerHTML = h+':'+m+':'+s+' '+mm+'月'+dd+'日'+' 星期'+w_t
}

// ajax
function ajax (method, url, paramsObj) {
    return new Promise ((resolve, reject) => {
        let xhttp = new XMLHttpRequest()
        // 格式化参数
        let params = formatParams(paramsObj)
        function formatParams (paramsObj) {
            let tmp_arr = []
            for (let kv in paramsObj) { tmp_arr.push(encodeURIComponent(kv) + "=" + encodeURIComponent(paramsObj[kv])) }
            return tmp_arr.join('&')
        }
        // 回调
        xhttp.onreadystatechange = callback
        // get
        if (method === 'get' || method === 'GET') {
            xhttp.open('GET', url + '?' + params, true)
            xhttp.send()
        // post
        } else if (method === 'post' || method === 'POST') {
            xhttp.open('POST', url, true)
            xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded")
            xhttp.send(params)
        }
        // 回调定义
        function callback() {
            if (xhttp.readyState == 4) {
                let s = xhttp.status
                if (s>= 200 && s< 300) { let resT = xhttp.responseText; let resX = xhttp.responseXML; resolve({ 'text': resT, 'xml': resX }) } 
                else                   { reject(status)                                                                                      }
            }
        }
    })
}

// 检查登录状态
function checkLogin () {
    return false
}

// 操作 localStorage
class handleLocalStorage {
    constructor (params) {
            // { name : { a: 1, b: 2 }}
            // ['it1', 'it2']
            this.params = params
    }
    set () {
        if (this.params.constructor === Object) {
            let obj = this.params
            for (let ite in obj) { localStorage.setItem(ite, JSON.stringify(obj[ite])) }
        }
    }
    query () {
        if (this.params.constructor === Array) {
            let tmp_arr = {}, arr = this.params
            arr.forEach((ite) => { tmp_arr[ite] = JSON.parse(localStorage.getItem(ite)) })
            return tmp_arr
        }
    } 
    clear () {
        localStorage.clear()
    }
    delete () {
        if (this.params.constructor === Array) {
            this.params.forEach((ite) => { localStorage.removeItem(ite) })
        }
    }

}



// ############### 组件事件 ########
// (1) 注册组件种子
// 组件种子初始化为 none
let compSeedAll = [
    'loginContent',
    'articleList',
    'mainPage_toy'
]
compSeedAll.forEach((v) => { selectE('#' + v)[0].style.display = 'none' })
// 删除组件种子所有组件
function delCompSeedAll () { compSeedAll.forEach((v) => { delChildAll(selectE('#' + v)[0]) }) }


// (2) 编写组件注册的方法
// 登录 显示登录框
function loginShow () { checkLogin() === true ? null : appendComp(comp_loginModal(), 'loginContent') }
// 点击logo
function clickLogo () { appendComp(comp_loginModal(), 'loginContent') }

// mainPage
// left
function mainPageShow_list () { appendComp(comp_mainPage_list(), 'articleList') }
// right
function mainPageShow_toy () { appendComp(comp_mainPage_toy(), 'mainPage_toy') }