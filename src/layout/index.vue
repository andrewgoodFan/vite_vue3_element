<!--
 * @Autor: Foley Fan
 * @Date: 2021-05-25 17:11:46
 * @LastEditTime: 2021-06-03 16:48:20
 * @Description: 
-->
<template>
    <el-container class="layout-container">
        <el-aside width="200px">
            <div class="logo">
                <img src="../assets/logo.png" alt="">
                <h1>vue3 element</h1>
            </div>
            <side-menu />
        </el-aside>
        <el-container>
            <el-header style="height: 64px">
                <el-breadcrumb
                    :separator="separator"
                    :separator-class="separatorClass"
                >
                    <el-breadcrumb-item
                        v-for="item in route.matched"
                        :key="item.path"
                        :to="{ path: item.path }"
                    >
                        {{ item.meta.title }}
                    </el-breadcrumb-item>
                </el-breadcrumb>
                <div class="right-position">
                    <slot name="right_position">
                        <ul class="login-info">
                            <li>admin</li>
                            <li style="margin: 5px">|</li>
                            <li @click="loginout">退出</li>
                        </ul>
                    </slot>
                </div>
            </el-header>
            <el-main class="layout-main">
                <router-view v-slot="{Component}">
                    <keep-alive>
                        <component :is="Component"></component>
                    </keep-alive>
                </router-view>
            </el-main>
            <el-footer>Footer</el-footer>
        </el-container>
    </el-container>
</template>
<script lang="ts">
import { clearStorageData } from '@/utils/utils'
import {defineComponent} from 'vue'
import { useRoute, useRouter } from 'vue-router'
import SideMenu from './components/SideMenu'
export default defineComponent({
    name: 'layout',
    components: {
        SideMenu
    },
    props: {
        separator: {
            type: String,
            default: () => '/',
        },
        separatorClass: String,
    },
    setup() {
        const route = useRoute()
        const router = useRouter()
        const loginout = () => {
            clearStorageData()
            router.push({path: '/login', query: {redirect: route.fullPath}})
        }
        return {
            route,
            loginout
        }
    },
})
</script>
<style lang="scss">
.el-container {
    height: 100%;
}
.layout-container {
    padding-left: 200px;
    .el-aside {
        position: fixed;
        left: 0;
        top: 0;
        z-index: 100;
        height: 100%;
        background: #001529;
        .logo {
            height: 64px;
            display: flex;
            align-items: center;
            padding-left: 20px;
            color: #fff;
            img {
                max-width: 40px;
                margin-right: 5px;
            }
        }
        .el-menu {
            border-right: none;
        }
    }
    .el-header {
        position: fixed;
        left: 210px;
        top: 0;
        width: calc(100% - 210px);
        height: 64px;
        z-index: 100;
        display: flex;
        align-items: center;
        justify-content: space-between;
        .login-info {
            display: flex;
            align-items: center;
        }
    }
    .layout-main {
        margin-top: 70px;
    }
}
</style>
