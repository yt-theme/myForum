window.addEventListener('load', function () {
    // 不可改动组件
    // 提示弹出框组件
    comp_popMessage = (txt) => {
        const name = 'comp_popMessage'
        const data = { }
        const js = {

        }
        const html = `
            <div onclick="js.${name}.destory(this)" class="comp_popMessage_comp pos_a t_30px z_99999 padd_8px bgc_9cacb9 color_f4f4f4 text_cent bor_ra_2">
                <span>${txt}</span>
            </div>
        `
        return {
            name: name,
            html: html,
            data: data,
            js:   js
        }
    }

    // 自定义组件
    // 登录组件
    comp_loginModal = (htmVarArr) => {
        const name = 'comp_loginModal'
        const data = { }
        const js = {
            init (event) { event.stopPropagation() },
            register () {
                let uname = selectE('#comp_loginModal_name')[0].value
                let upasswd = selectE('#comp_loginModal_passwd')[0].value
                if (uname && upasswd) {
                    ajax('post', '/register', {'name': uname, 'passwd': upasswd})
                    .then((v) => {
                        let queryRes = JSON.parse(v['text'])
                        if (queryRes['r'] === 1) {
                            // 注册完成
                            // 存入 localStorage
                            new handleLocalStorage({'token': { 'token': queryRes['token'] }}).set()
                            // 提示注册成功 自动执行登录状态
                            messagePop('注册成功')
                            // 关闭登录框
                            delCompoAll('.comp_loginModal')
                            refresh()
                        // 注册问题
                        } else if (queryRes['r'] === 0) { messagePop('用户已存在') }
                    })
                    // 错误
                    .catch((v) => { console.log('err', v) })
                } else {
                    // 提示
                }
            },
            completeRegister () {
                
            },
            login () {
                let uname = selectE('#comp_loginModal_name')[0].value
                let upasswd = selectE('#comp_loginModal_passwd')[0].value
                if (uname && upasswd) {
                    ajax('post', '/login', {'name': uname, 'passwd': upasswd})
                    .then((v)  => { 
                        // token存入本地存储
                        let queryRes = JSON.parse(v['text'])
                        if (queryRes['r'] === 1) {
                            new handleLocalStorage({'token': { 'token': queryRes['token'] }}).set()
                            checkLoginStatu(1)
                            .then((v) => {
                                console.log('login', v)
                                // 提示信息
                                if (v) { messagePop('登录成功'); delCompoAll('.comp_loginModal') }
                                else   { messagePop('登录失败') }
                            })
                            
                            // 自动关闭登录框
                        } else { messagePop('用户名或密码错误') }
                     })
                    .catch((v) => { console.log('err', v) })
                }
            }
        }
        const html = `
            <div onclick="js.${name}.destory(this)" class="pos_a z_999 w_100 h_100 flex flex_just_cent flex_alig_cent">
                <div onclick="js.${name}.init(event)" class="bgc_9cacb9 box_shadw_777 bor_ra_2 padd_16px">
                    <form class="form color_858585">
                        <div>
                            <input id="comp_loginModal_name" placeholder="账号" class="bor_ra_2"/><br/>
                            <input id="comp_loginModal_passwd" type="password" placeholder="密码" class="bor_ra_2"/>
                        </div>
                        <div class="flex">
                            <input type="button" onclick="js.${name}.login()"  value="登录" class="bor_ra_2"/>
                            <input type="button" onclick="js.${name}.register()" value="注册" class="bor_ra_2"/>
                        </div>
                    </form>
                </div>
            </div>
        `
        return {
            name: name,
            html: html,
            data: data,
            js:   js
        }
    }
    // 主页面组件
    // left
    comp_mainPage_list = (htmVarArr) => {
        const name = 'comp_mainPage_list'
        const data = {
            listData: [
                {
                    'title': 'f t t s e w 9',
                    'pushTime': '2099-12-29',
                    'author': 'fuaowejfoawe'
                },
                {
                    'title': 'f t t s e w 9',
                    'pushTime': '2099-12-29',
                    'author': 'fuaowejfoawe'
                },{
                    'title': 'f t t s e w 9',
                    'pushTime': '2099-12-29',
                    'author': 'fuaowejfoawe'
                },{
                    'title': 'f t t s e w 9',
                    'pushTime': '2099-12-29',
                    'author': 'fuaowejfoawe'
                },{
                    'title': 'f t t s e w 9',
                    'pushTime': '2099-12-29',
                    'author': 'fuaowejfoawe'
                },{
                    'title': 'f t t s e w 9',
                    'pushTime': '2099-12-29',
                    'author': 'fuaowejfoawe'
                },{
                    'title': 'f t t s e w 9',
                    'pushTime': '2099-12-29',
                    'author': 'fuaowejfoawe'
                },{
                    'title': 'f t t s e w 9',
                    'pushTime': '2099-12-29',
                    'author': 'fuaowejfoawe'
                },{
                    'title': 'f t t s e w 9',
                    'pushTime': '2099-12-29',
                    'author': 'fuaowejfoawe'
                },{
                    'title': 'f t t s e w 9',
                    'pushTime': '2099-12-29',
                    'author': 'fuaowejfoawe'
                },{
                    'title': 'f t t s e w 9',
                    'pushTime': '2099-12-29',
                    'author': 'fuaowejfoawe'
                },{
                    'title': 'f t t s e w 9',
                    'pushTime': '2099-12-29',
                    'author': 'fuaowejfoawe'
                },{
                    'title': 'f t t s e w 9',
                    'pushTime': '2099-12-29',
                    'author': 'fuaowejfoawe'
                },{
                    'title': 'f t t s e w 9',
                    'pushTime': '2099-12-29',
                    'author': 'fuaowejfoawe'
                },{
                    'title': 'f t t s e w 9',
                    'pushTime': '2099-12-29',
                    'author': 'fuaowejfoawe'
                },{
                    'title': 'f t t s e w 9',
                    'pushTime': '2099-12-29',
                    'author': 'fuaowejfoawe'
                },{
                    'title': 'f t t s e w 9',
                    'pushTime': '2099-12-29',
                    'author': 'fuaowejfoawe'
                },{
                    'title': 'f t t s e w 9',
                    'pushTime': '2099-12-29',
                    'author': 'fuaowejfoawe'
                },{
                    'title': 'f t t s e w 9',
                    'pushTime': '2099-12-29',
                    'author': 'fuaowejfoawe'
                },{
                    'title': 'f t t s e w 9',
                    'pushTime': '2099-12-29',
                    'author': 'fuaowejfoawe'
                },{
                    'title': 'f t t s e w 9',
                    'pushTime': '2099-12-29',
                    'author': 'fuaowejfoawe'
                },{
                    'title': 'f t t s e w 9',
                    'pushTime': '2099-12-29',
                    'author': 'fuaowejfoawe'
                },{
                    'title': 'f t t s e w 9',
                    'pushTime': '2099-12-29',
                    'author': 'fuaowejfoawe'
                },{
                    'title': 'f t t s e w 9',
                    'pushTime': '2099-12-29',
                    'author': 'fuaowejfoawe'
                },{
                    'title': 'f t t s e w 9',
                    'pushTime': '2099-12-29',
                    'author': 'fuaowejfoawe'
                },{
                    'title': 'f t t s e w 9',
                    'pushTime': '2099-12-29',
                    'author': 'fuaowejfoawe'
                },{
                    'title': 'f t t s e w 9',
                    'pushTime': '2099-12-29',
                    'author': 'fuaowejfoawe'
                },{
                    'title': 'f t t s e w 9',
                    'pushTime': '2099-12-29',
                    'author': 'fuaowejfoawe'
                },{
                    'title': 'f t t s e w 9',
                    'pushTime': '2099-12-29',
                    'author': 'fuaowejfoawe'
                },
            ],
        }
        const js = {

        }
        const html = `
            <div class="w_100 h_100 over_f bgc_f7f7f7">
                <ul>
                    ${ data.listData.reduce((state, ite) => {
                        return state + '<li class="article_list_li flex padd_16px cur_p color_858585">' +
                        '<span class="marg_lr_13px w_33 m_w_140px">主题: ' + ite.title + '</span>' +
                            '<span class="marg_lr_13px">时间: ' + ite.pushTime + '</span>' +
                            '<span class="marg_lr_13px m_w_140px">作者: ' + ite.author + '</span>' +
                        '</li>'
                    }, '')}
                </ul>
            </div>
        `
        return {
            name: name,
            html: html,
            data: data,
            js:   js
        }
    }

    // right
    comp_mainPage_toy = (htmVarArr) => {
        const name = 'comp_mainPage_toy'
        const data = {
            
        }
        const js = {

        }
        const html = `
            <div class="toyList_right padd_8px w_100 h_100">
                <div class="bgc_f2f2f2 w_100 h_100">
                    <div class="${name}_t h_33">
                        <div class="padd_8px bgc bgc_c9d6e0 color_4788bc">
                            我的成长
                        </div>
                    </div>
                    <div class="${name}_m h_33">
                        <div class="padd_8px bgc bgc_c9d6e0 color_4788bc">
                            我的工具
                        </div>
                    </div>
                    <div class="${name}_b h_33">
                        <div class="padd_8px bgc bgc_c9d6e0 color_4788bc">
                            讨论互动
                        </div>
                    </div>
                </div>
            </div>
        `
        return {
            name: name,
            html: html,
            data: data,
            js:   js
        }
    }
})