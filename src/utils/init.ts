/*
 * @Autor: Foley Fan
 * @Date: 2021-05-31 15:27:38
 * @LastEditTime: 2021-06-03 18:09:12
 * @Description: 刷新执行函数
 */
import {RouteLocationNormalized, NavigationGuardNext} from 'vue-router'
import store from '@/store'

export const init = async ({to, from, next, hasRoute}: {
    to: RouteLocationNormalized;
    from: RouteLocationNormalized;
    next: NavigationGuardNext;
    hasRoute: boolean
}) => {
    store.dispatch('app/syncGetMenus').then(data => {
        next({...to, replace: true})
    })
    .catch(() => {
        next('/login')
    })
}