/*
 * @Autor: Foley Fan
 * @Date: 2021-06-03 10:08:29
 * @LastEditTime: 2021-06-03 16:50:15
 * @Description: 
 */
import NProgress from 'nprogress'
import router from '@/router'
import store from '@/store'
import 'nprogress/nprogress.css'
import { init } from '@/utils/init'
import { getStorageData } from '@/utils/utils'

NProgress.configure({ showSpinner: false }) // NProgress Configuration
const allowList = ['/login', '/404']

// 获取动态路由 拼接到router


export const createRouterGuards = () => {
    router.beforeEach((to, from, next) => {
        NProgress.start()
        // 路由拦截
        const token = getStorageData('token')
        if (token) {
            if (to.path === '/login') {
                next({path: '/', replace: true})
                return
            }
            const hasRoute = router.hasRoute(to.name!)
            if (store.state.app.menus.length) {
                next()
                NProgress.done()
            } else {
                init({to, from, next, hasRoute})
            }
        } else {
            allowList.includes(to.path) && next() || next({path: '/login', query: {redirect: to.fullPath}})
            NProgress.done()
        }
    })
    
    router.afterEach((to) => {
        document.title  = (to.meta.title as string) || document.title
        NProgress.done()
    })
}
