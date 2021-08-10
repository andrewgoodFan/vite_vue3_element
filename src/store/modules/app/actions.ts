/*
 * @Autor: Foley Fan
 * @Date: 2021-05-31 14:37:13
 * @LastEditTime: 2021-06-03 16:37:17
 * @Description: 
 */
import {ActionTree} from 'vuex'
import {getSyncRouter} from '@/router/sync-router'
import {AppProps} from './state'
export const actions: ActionTree<AppProps, any> = {
    async syncGetMenus ({ commit }) {
        try {
            const routerList = await getSyncRouter()
            commit('setMenus', routerList)
            return routerList
        } catch (error) {
            throw new Error('获取菜单失败！')
        }
    }
}