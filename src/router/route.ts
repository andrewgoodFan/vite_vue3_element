/*
 * @Autor: Foley Fan
 * @Date: 2021-05-21 09:47:18
 * @LastEditTime: 2021-06-04 10:32:25
 * @Description: 
 */
import {RouteRecordRaw} from 'vue-router'

const routes: RouteRecordRaw[] = [
    {
        path: '/login',
        component: () => import(/* webpackChunkName: "login" */ '@/views/login.vue')
    },
    {
        path: '/',
        name: 'layout',
        component: () => import('@/layout/index.vue'),
        redirect: '/demo/index',
        meta: {
            title: '首页'
        },
        children: [
            {
                path: '/demo',
                component: () => import('@/components/Translation.vue'),
                redirect: '/demo/index',
                meta: {
                    title: '演示'
                },
                children: [
                    {
                        path: '/demo/index',
                        component: () => import(/* webpackChunkName: "demo" */ '@/views/index/index.vue'),
                        meta: {
                            title: '首页'
                        }
                    },
                    {
                        path: '/demo/static1',
                        component: () => import(/* webpackChunkName: "demo" */ '@/views/index/index.vue'),
                        meta: {
                            title: '静态路由测试1'
                        }
                    },
                    {
                        path: '/demo/static2',
                        component: () => import('@/views/index/index.vue'),
                        meta: {
                            title: '静态路由测试2'
                        }
                    }
                ]
            }
            
        ]
    }
]
export default routes