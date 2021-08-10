/*
 * @Autor: Foley Fan
 * @Date: 2021-05-20 16:03:39
 * @LastEditTime: 2021-06-04 10:23:08
 * @Description:
 */
import { createApp } from 'vue'
import router, {setupRouter} from './router'
import {setupStore} from './store'
import {setupElement} from '@/plugins'
import './styles/common.css'
import App from './App.vue'


const app = createApp(App)
setupElement(app)
setupStore(app)
setupRouter(app)



// 路由准备就绪后挂载APP实例
router.isReady().then(() => app.mount('#app'))
