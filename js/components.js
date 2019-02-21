window.addEventListener('load', function () {
    // 登录组件
    comp_loginModal = (htmVarArr) => {
        const name = 'comp_loginModal'
        const data = {
            a: 1
        }
        const js = {
            init (event) { event.stopPropagation() },
            login () {
                ajax('post', '/login/register', {'name': 'abc', 'passwd': 'defghij'})
            }
        }
        const html = `
            <div onclick="js.${name}.destory(this)" class="pos_a z_999 opacity_Background w_100 h_100 flex flex_just_cent flex_alig_cent">
                <div onclick="js.${name}.init(event)" class="bgc_9cacb9 box_shadw_777 bor_ra_2 padd_16px">
                    <form class="form color_858585">
                        <div>
                            <input placeholder="账号" class="bor_ra_2"/><br/>
                            <input placeholder="密码" class="bor_ra_2"/>
                        </div>
                        <div class="flex">
                            <input type="button" value="登录" class="bor_ra_2"/>
                            <input type="button" onclick="js.${name}.login()" value="注册" class="bor_ra_2"/>
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
                },
            ],
        }
        const js = {

        }
        const html = `
            <div class="w_100">
                <ul>
                    ${ data.listData.reduce((state, ite) => {
                        return state + '<li class="flex padd_8px bgc_f2f2f2 marg_tb_8px color_858585">' +                              '<span class="marg_lr_13px w_33 m_w_300px">主题: ' + ite.title + '</span>' +
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