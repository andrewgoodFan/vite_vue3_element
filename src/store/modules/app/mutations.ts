/*
 * @Autor: Foley Fan
 * @Date: 2021-05-31 14:23:07
 * @LastEditTime: 2021-06-03 16:45:20
 * @Description: 
 */
import {AppProps} from './state'
export const mutations = {
    setMenus (state: AppProps, data: any[]) {
        state.menus = data
    }
}