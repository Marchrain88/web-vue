<template>
    <div class="sidebar">
        <el-menu
            class="sidebar-el-menu"
            :default-active="onRoutes"
            :collapse="collapse"
            background-color="#324157"
            text-color="#bfcbd9"
            active-text-color="#20a0ff"
            unique-opened
            router
        >
            <template v-for="item in items">
                <template v-if="item.subs">
                    <el-submenu :index="item.index" :key="item.index">
                        <template slot="title">
                            <i :class="item.icon"></i>
                            <span slot="title">{{ item.title }}</span>
                        </template>
                        <template v-for="subItem in item.subs">
                            <el-submenu
                                v-if="subItem.subs"
                                :index="subItem.index"
                                :key="subItem.index"
                            >
                                <template slot="title">{{ subItem.title }}</template>
                                <el-menu-item
                                    v-for="(threeItem,i) in subItem.subs"
                                    :key="i"
                                    :index="threeItem.index"
                                >{{ threeItem.title }}</el-menu-item>
                            </el-submenu>
                            <el-menu-item
                                v-else
                                :index="subItem.index"
                                :key="subItem.index"
                            >{{ subItem.title }}</el-menu-item>
                        </template>
                    </el-submenu>
                </template>
                <template v-else>
                    <el-menu-item :index="item.index" :key="item.index">
                        <i :class="item.icon"></i>
                        <span slot="title">{{ item.title }}</span>
                    </el-menu-item>
                </template>
            </template>
        </el-menu>
    </div>
</template>

<script>
import bus from '../common/bus';
export default {
    data() {
        return {
            collapse: false,
            items: [
                {
                    icon: 'el-icon-lx-home',
                    index: 'dashboard',
                    title: '系统首页'
                },
                {
                    icon: 'el-icon-lx-calendar',
                    index: '3',
                    title: '系统管理',
                    subs: [
                        {
                            index: 'form',
                            title: '系统配置'
                        },
                        {
                            index: 'SysUser',
                            title: '用户管理'
                        },

                        {
                            index: 'DoorControl',
                            title: '门禁配置'
                        },
                        {
                            index: 'equipment',
                            title: '设备管理'
                        },
                        {
                            index: 'appPower',
                            title: 'APP权限管理'
                        },
                        {
                            index: 'upload',
                            title: '秘钥管理'
                        },

                    ]
                },
                {
                    icon: 'el-icon-lx-calendar',
                    index: '3-2',
                    title: '企业管理',
                    subs: [
                        {
                            index: '',
                            title: '公司管理',
                            subs: [
                                {
                                    index: 'dept',
                                    title: '部门管理'
                                },
                                {
                                    index: 'deptUser',
                                    title: '员工管理'
                                }
                            ]
                        },

                        {
                            index: 'markdown',
                            title: '考勤管理',
                            subs: [
                                {
                                    index: 'rule',
                                    title: '考勤规则'
                                },
                                {
                                    index: 'personal_attendance',
                                    title: '考勤统计'
                                },
                                {
                                    index: 'I18n',
                                    title: '考勤统计'
                                }
                            ]
                        },
                        {
                            index: 'vip',
                            title: 'VIP管理'
                        }
                    ]
                },
            ]
        };
    },
    computed: {
        onRoutes() {
            return this.$route.path.replace('/', '');
        }
    },
    created() {
        // 通过 Event Bus 进行组件间通信，来折叠侧边栏
        bus.$on('collapse', msg => {
            this.collapse = msg;
            bus.$emit('collapse-content', msg);
        });
    }
};
</script>

<style scoped>
.sidebar {
    display: block;
    position: absolute;
    left: 0;
    top: 70px;
    bottom: 0;
    overflow-y: scroll;
}
.sidebar::-webkit-scrollbar {
    width: 0;
}
.sidebar-el-menu:not(.el-menu--collapse) {
    width: 250px;
}
.sidebar > ul {
    height: 100%;
}
</style>
