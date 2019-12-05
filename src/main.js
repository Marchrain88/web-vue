import Vue from 'vue';
import App from './App.vue';
import router from './router';
import ElementUI from 'element-ui';
import VueI18n from 'vue-i18n';
import { messages } from './components/common/i18n';
import 'element-ui/lib/theme-chalk/index.css'; // 默认主题
// import './assets/css/theme-green/index.css'; // 浅绿色主题
import './assets/css/icon.css';
import './components/common/directives';
import 'babel-polyfill';
import axios from 'axios';
import Vuex from 'vuex';

Vue.prototype.axios = axios;
Vue.use(Vuex);
Vue.config.productionTip = false;
/*new Vue({
    el: '#app',
    router,
    components: { App },
    template: '<App/>'
});*/


const ADD_COUNT = 'ADD_COUNT'; // 用常量代替事件类型，使得代码更清晰
const REMOVE_COUNT = 'REMOVE_COUNT';
//注册状态管理全局参数
var store = new Vuex.Store({
    state:{
        token:'',
        userID:'',
    },
    mutations: {
        //写法与getters相类似
        //组件想要对于vuex 中的数据进行的处理
        //组件中采用this.$store.commit('方法名') 的方式调用，实现充分解耦
        //内部操作必须在此刻完成(同步)
        [ADD_COUNT] (state, token) { // 第一个参数为 state 用于变更状态 登录
            sessionStorage.setItem("token", token);
            state.token = token;
        },
        [REMOVE_COUNT] (state, token) { // 退出登录

            sessionStorage.removeItem("token", token);

            state.token = token;
        },
    }
});
/*
router.beforeEach((to, from, next) => {
    iView.LoadingBar.start();//loadong 效果

    store.state.token = sessionStorage.getItem('token');//获取本地存储的token

    if (to.meta.requireAuth) {  // 判断该路由是否需要登录权限
        if (store.state.token !== "") {  // 通过vuex state获取当前的token是否存
            next();
        }
        else {
            next({
                path: '/login',
                query: {redirect: to.fullPath}  // 将跳转的路由path作为参数，登录成功后跳转到该路由
            })
        }
    }
    else {
        next();
    }
})*/



Vue.use(VueI18n);
Vue.use(ElementUI, {
    size: 'small'
});
const i18n = new VueI18n({
    locale: 'zh',
    messages
});

//使用钩子函数对路由进行权限跳转
/*router.beforeEach((to, from, next) => {
    document.title = `${to.meta.title} | vue-manage-system`;
    const role = localStorage.getItem('ms_username');
    if (!role && to.path !== '/login') {
        next('/login');
    } else if (to.meta.permission) {
        // 如果是管理员权限则可进入，这里只是简单的模拟管理员权限而已
        role === 'admin' ? next() : next('/403');
    } else {
        // 简单的判断IE10及以下不进入富文本编辑器，该组件不兼容
        if (navigator.userAgent.indexOf('MSIE') > -1 && to.path === '/editor') {
            Vue.prototype.$alert('vue-quill-editor组件不兼容IE10及以下浏览器，请使用更高版本的浏览器查看', '浏览器不兼容通知', {
                confirmButtonText: '确定'
            });
        } else {
            next();
        }
    }
});*/


/*
router.afterEach(route => {
    iView.LoadingBar.finish();
});

new Vue({
    el: '#app',
    router,
    store, //注册组件
    components: { App },
    template: '<App/>'
}) ;
*/


new Vue({
    router,
    i18n,
    render: h => h(App)
}).$mount('#app');
