/*
 * @Autor: Foley Fan
 * @Date: 2021-05-31 14:13:33
 * @LastEditTime: 2021-05-31 14:40:26
 * @Description: 
 */

import {state} from './state'
import {mutations} from './mutations'
import {actions} from './actions'

export default {
    namespaced: true,
    state,
    mutations,
    actions
}