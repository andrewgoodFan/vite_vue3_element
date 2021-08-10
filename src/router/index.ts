/*
 * @Autor: Foley Fan
 * @Date: 2021-05-21 09:40:31
 * @LastEditTime: 2021-06-03 10:17:50
 * @Description: 
 */
import { App } from 'vue'
import {createRouter, createWebHashHistory} from 'vue-router'
import routes from './route'
import {createRouterGuards} from './router-guards'
const router = createRouter({
    history: createWebHashHistory(),
    routes: routes
})

export const setupRouter = (app: App) => {
    app.use(router)
    createRouterGuards()
}
export default router