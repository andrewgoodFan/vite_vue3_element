/*
 * @Autor: Foley Fan
 * @Date: 2021-05-20 16:03:39
 * @LastEditTime: 2021-06-03 16:53:11
 * @Description:
 */
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import { resolve } from 'path'
import BASE_API from './public/config'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [vue(), vueJsx()],
    resolve: {
        alias: {
            '@': resolve(__dirname, './src'),
        },
    },
    server: {
      proxy: {
        '/api': {
          target: BASE_API,
          changeOrigin: true,
          // rewrite: (path) => path.replace(/^\/api/, '')
        },
      }
    }
})
