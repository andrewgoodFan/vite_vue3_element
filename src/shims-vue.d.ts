/*
 * @Autor: Foley Fan
 * @Date: 2021-05-20 16:03:39
 * @LastEditTime: 2021-05-31 15:19:25
 * @Description: 
 */
declare module '*.vue' {
  import { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}

declare module 'js-md5'
declare module 'el-page-table'
declare module 'nprogress'