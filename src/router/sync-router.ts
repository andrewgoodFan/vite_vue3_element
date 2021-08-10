/*
 * @Autor: Foley Fan
 * @Date: 2021-06-03 16:25:51
 * @LastEditTime: 2021-06-03 16:36:39
 * @Description: 动态路由获取拼接
 */
import {RouteRecordRaw} from 'vue-router'
import router from '@/router'
import store from '@/store'
import routes from '@/router/route'
import {getMenuDataService} from '@/api/menu'
import {listToTree, addRouteRedirect} from '@/utils/utils'

export const getSyncRouter = (): Promise<RouteRecordRaw[]> => {
    return new Promise((resolve, reject) => {
        getMenuDataService().then(res => {
            if (res.data.bizCode === 'SUCCESS') {
                const treeData = listToTree(res.data.result)
                const routerList = addRouteRedirect(treeData)
                const layout = routes.find((item) => item.name === 'layout')!
                layout.children = [...layout.children!, ...routerList]
                router.addRoute(layout)
                router.addRoute({
                    path: '/404',
                    component: () => import('@/views/404.vue')
                })
                resolve(layout.children)
            }

        })
        .catch((err) => {
            reject(err)
        })
    })
}