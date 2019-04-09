// 组件自身方法
// 删除当前组件的方法 onclick="js.${name}.destory(this)"
// 使用时直接加到需要的组件相应地方
// 组件中的 name 建议与当前组件函数定义同名
// comp_popMessage 为固定写法组件禁止修改




let windowObj = window
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
                        let queryRes = v['data']
                        if (queryRes['r'] === 1) {
                            // 注册完成
                            // 存入 localStorage
                            new handleLocalStorage({'token': { 'id': queryRes['id'] }}).set(); new handleLocalStorage({'token': { 'token': queryRes['token'] }}).set()
                            // 提示注册成功 自动执行登录状态 => 关闭登录框 刷新
                            messagePop('注册成功'); delCompoAll('.comp_loginModal'); refresh()
                        // 注册问题
                        } else if (queryRes['r'] === 0) { messagePop('用户已存在') }
                    })
                    // 错误
                    .catch((v) => { console.log('err', v) })
                } else { }
            },
            login () {
                let uname = selectE('#comp_loginModal_name')[0].value
                let upasswd = selectE('#comp_loginModal_passwd')[0].value
                if (uname && upasswd) {
                    ajax('post', '/login', {'name': uname, 'passwd': upasswd})
                    .then((v)  => { 
                        // token存入本地存储
                        let queryRes = v['data']
                        if (queryRes['r'] === 1) {
                            new handleLocalStorage({'token': { 'id': queryRes['id'] }}).set(); new handleLocalStorage({'token': { 'token': queryRes['token'] }}).set()
                            checkLoginStatu(1)
                            // 提示信息
                            .then((v) => { if (v) { messagePop('登录成功'); delCompoAll('.comp_loginModal'); refresh() } else { messagePop('登录失败') } })
                            // 自动关闭登录框
                        } else { messagePop('用户名或密码错误') }
                     })
                    .catch((v) => { console.log('err', v) })
                }
            }
        }
        const html = `
            <div onclick="js.${name}.destory(this)" class="comp_loginModal_content pos_a z_999 w_100 h_100 flex flex_just_cent flex_alig_cent">
                <div onclick="js.${name}.init(event)" class="bgc_9cacb9 box_shadw_777 bor_ra_2 padd_16px">
                    <form class="form color_858585">
                        <div>
                            <input id="comp_loginModal_name" placeholder="账号" class="bor_ra_2"/><br/>
                            <input id="comp_loginModal_passwd" type="password" placeholder="密码" class="bor_ra_2"/>
                        </div>
                        <div class="flex">
                            <input type="button" onclick="js.${name}.login()"  value="登录" class="bor_ra_2 color_858585"/>
                            <input type="button" onclick="js.${name}.register()" value="注册" class="bor_ra_2 color_858585"/>
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
                
        }
        const js = {
            init () {
                // // 获取地理位置
                // ajax('get', 'http://pv.sohu.com/cityjson')
                // .then((v) => {
                //     alert(1)
                // })
                
            },
        }
        const html = `
            <div class="pos_r w_100 h_100">
                <div class="comp_mainPage_list_top flex bor_1_r bgc_f7f7f7">
                    <div class="comp_mainPage_list_top_left w_50 h_300px bor_1_r">
                    3
                    </div>
                    <div class="comp_mainPage_list_top_right w_50 h_300px flex bor_1_r">
                        <div class="w_50 h_300px min_w_227px bor_1_r">
                        0
                        </div>
                        <div class="w_50 h_300px bor_1_r">
                            <div class="w_100 h_150px bor_1_r">
                            1
                            </div>
                            <div class="w_100 h_150px bor_1_r">
                            2
                            </div>
                        </div>
                    </div>
                </div>
                <div class="w_100 h_min_300px bor_1_r bgc_f7f7f7">
                4
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

    // 选择 Electric 版块时主页面 left 组件
    comp_main_electric_list = (htmVarArr) => {
        const name = 'comp_main_electric_list'
        const data = {
                
        }
        const js = {
            init () {
                let data = [
                    {
                        'topic': 'this is topic',
                        'auth': 'maxlin',
                        'reply_look': '10/20',
                        'time': '2011-11-11 12:31:41',
                        'type': '技术分享'
                    },
                    {
                        'topic': 'this is topic11111111111111111111111111111111111111111111',
                        'auth': 'maxlin',
                        'reply_look': '10/20',
                        'time': '2011-11-11 12:31:41',
                        'type': '技术分享'
                    },
                    {
                        'topic': 'this is topic',
                        'auth': 'maxlin',
                        'reply_look': '10/20',
                        'time': '2011-11-11 12:31:41',
                        'type': '技术分享'
                    },
                ]
                let currentInner = selectE("#comp_main_electric_list_table")[0].innerHTML
                let tmp = ''
                data.forEach((ite) => {
                    tmp += `<li class="w_100 bor_ra_2 text_cent padd_4px padd_t_8px comp_main_electric_list_style_normal cur_p">
                        <span class="w_50 m_w_50px bgc_f2f2f2 box_shadw_c9d6e0 m_w_140px text_left white_space_n over_h txt_over_elli in_block bor_ra_16 padd_lr_13px padd_tb_8px" title="${ite["topic"]}">${ite["topic"]}</span>
                        <span class="w_9 m_w_50px bgc_f2f2f2 box_shadw_c9d6e0 text_cent white_space_n over_h txt_over_elli in_block bor_ra_16 padd_lr_13px padd_tb_8px" title="${ite["auth"]}">${ite["auth"]}</span>
                        <span class="w_9 m_w_50px bgc_f2f2f2 box_shadw_c9d6e0 text_cent white_space_n over_h txt_over_elli in_block bor_ra_16 padd_lr_13px padd_tb_8px" title="${ite["reply_look"]}">${ite["reply_look"]}</span>
                        <span class="w_20 m_w_50px bgc_f2f2f2 box_shadw_c9d6e0 text_cent white_space_n over_h txt_over_elli in_block bor_ra_16 padd_lr_13px padd_tb_8px" title="${ite["time"]}">${ite["time"]}</span>
                        <span class="w_9 m_w_50px bgc_f2f2f2 box_shadw_c9d6e0 text_cent white_space_n over_h txt_over_elli in_block bor_ra_16 padd_lr_13px padd_tb_8px" title="${ite["type"]}">${ite["type"]}</span>
                    </li>`
                })
                selectE("#comp_main_electric_list_table")[0].innerHTML = currentInner + tmp
            }
        }
        const html = `
            <div class="pos_r w_100 color_858585 padd_l_8px comp_main_electric_list_wrapper">
                <div class="w_100 h_100 bor_ra_2 padd_8px padd_t_0 comp_main_electric_list_inner">
                    <ul id="comp_main_electric_list_table" class="lis_sty_n comp_main_electric_list_inner_table w_100"></ul>
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

    // 发帖组件
    comp_main_publish = (htmVarArr) => {
        const name = 'comp_main_publish'
        const data = {
                
        }
        const js = {
            init () {
                
            }
        }
        const html = `
            <div class="w_100 color_858585 padd_l_8px comp_main_publish_wrapper">
                <div class="w_100 h_100 comp_main_publish_inner">
                    <div class="w_100 comp_main_publish_title">
                        <input class="w_100 bor_0 bgc_f2f2f2 bor_ra_16 padd_lr_13px box_shadw_777"/>
                    </div>
                    <div class="w_100 comp_main_publist_content">
                        <textarea class="w_100 bor_0 bgc_f2f2f2 bor_ra_16 padd_lr_13px box_shadw_777"></textarea>
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

    // right
    comp_mainPage_toy = (htmVarArr) => {
        const name = 'comp_mainPage_toy'
        const data = {
            
        }
        const js = {
            // userToyList 赋值
            init (v) {
                // 分离 我的成长 我的工具 讨论互动 列表
                let myGrowList=[],  myToolList=[],  discussList=[]
                v.forEach(ite => { switch (ite["type"]) { case "1": myGrowList.push(ite); break; case "2": myToolList.push(ite); break; case "3": discussList.push(ite); break }});

                let createToyList = (id, arr) => {
                    selectE(id)[0].innerHTML =  arr.reduce((state, ite) => {
                        return state + '<li style="background-color: ' + ite.bgc + '" title="' + ite.title + '" class="pos_r toy_style cur_p color_858585 text_cent">' +
                            '<div class="block w_100 h_100">' +
                                '<embed class="none" src="data:image/svg+xml;utf8,' + atob(ite.bgi) + '"/>' +
                            '</div>' +
                        '</li>'
                    }, '')
                }

                // 我的成长 列表生成
                createToyList('#toyList_right_myGrow', myGrowList)
                // 我的工具 列表生成
                createToyList('#toyList_right_myTool', myToolList)
                // 讨论互动 列表生成
                createToyList('#toyList_right_discuss', discussList)
            }
        }
        const html = `
            <div class="toyList_right padd_8px w_100 h_100">
                <div class="bgc_f2f2f2 w_100">
                    <div class="${name}_t">
                        <div class="padd_8px bgc bgc_c9d6e0 color_4788bc">我的成长</div>
                        <div class="over_f padd_8px padd_tb_16px">
                            <ul id="toyList_right_myGrow"></ul>
                        </div>
                    </div>
                    <div class="${name}_m">
                        <div class="padd_8px bgc bgc_c9d6e0 color_4788bc">我的工具</div>
                        <div class="over_f padd_8px padd_tb_16px">
                            <ul id="toyList_right_myTool"></ul>
                        </div>
                    </div>
                    <div class="${name}_b">
                        <div class="padd_8px bgc bgc_c9d6e0 color_4788bc">讨论互动</div>
                        <div class="over_f padd_8px padd_tb_16px">
                            <ul id="toyList_right_discuss"></ul>
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