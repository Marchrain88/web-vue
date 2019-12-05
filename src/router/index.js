import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/',
            redirect: '/dashboard'
        },
        {
            path: '/',
            component: () => import(/* webpackChunkName: "home" */ '../components/common/Home.vue'),
            meta: { title: '自述文件' },
            children: [
                {
                    path: '/dashboard',
                    component: () => import(/* webpackChunkName: "dashboard" */ '../components/page/Dashboard.vue'),
                    meta: { title: '系统首页' }
                },
                {   //app权限管理
                    path: '/appPower',
                    component: () => import(/* webpackChunkName: "icon" */ '../components/page/appPower.vue'),
                    meta: { title: 'app权限管理' }
                },
                {   //部门管理
                    path: '/dept',
                    component: () => import(/* webpackChunkName: "OrganizationTree" */ '../components/page/dept.vue'),
                    meta: { title: '部门管理' }
                },
                {   //员工信息
                    path: '/deptUser',
                    component: () => import(/* webpackChunkName: "User" */ '../components/page/deptUser.vue'),
                    meta: { title: '员工信息' }
                },

                {   //用户管理
                    path: '/SysUser',
                    component: () => import(/* webpackChunkName: "tabs" */ '../components/page/SysUser.vue'),
                    meta: { title: '用户管理' }
                },

                {
                    // 考勤规则
                    path: '/rule',
                    component: () => import(/* webpackChunkName: "editor" */ '../components/page/rule.vue'),
                    meta: { title: '考勤规则' }
                },

                {
                    // 门禁配置
                    path: '/DoorControl',
                    component: () => import(/* webpackChunkName: "upload" */ '../components/page/DoorControl.vue'),
                    meta: { title: '门禁配置' }
                },

                {
                    // 权限页面
                    path: '/permission',
                    component: () => import(/* webpackChunkName: "permission" */ '../components/page/Permission.vue'),
                    meta: { title: '权限测试', permission: true }
                },
                {
                    //vip管理
                    path: '/vip',
                    component: () => import(/* webpackChunkName: "vipTable" */ '../components/page/vip.vue'),
                    meta: { title: 'vip' }
                },
                {   //设备管理
                    path: '/equipment',
                    component: () => import(/* webpackChunkName: "403" */ '../components/page/equipment.vue'),
                    meta: { title: '设备管理' }
                },

            ]
        },
        {
            path: '/login',
            component: () => import(/* webpackChunkName: "login" */ '../components/page/Login.vue'),
            meta: { title: '登录',
                    requireAuth:true
            }

        },
        {
            path: '*',
            redirect: '/404'
        }
    ]
});
