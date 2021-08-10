/*
 * @Autor: Foley Fan
 * @Date: 2021-06-04 10:19:01
 * @LastEditTime: 2021-06-04 10:21:49
 * @Description: 
 */
import { App } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/lib/theme-chalk/index.css'

export const setupElement = (app: App) => {
    app.use(ElementPlus)
}