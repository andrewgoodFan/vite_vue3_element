/*
 * @Autor: Foley Fan
 * @Date: 2021-05-31 11:22:13
 * @LastEditTime: 2021-06-04 10:17:47
 * @Description: vuex
 */

import { App } from 'vue'
import {createStore} from 'vuex'
import modules from './modules'
import {Istore} from './types'

const store = createStore<Istore>({
    modules
})
export const setupStore = (app: App) => {
    app.use(store)
}
export default store