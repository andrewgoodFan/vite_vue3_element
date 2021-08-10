## Vue3 + vite + typescript + elementplus

### 项目初始化

1. `npm init @vitejs/app`
```ts
{
    Project name 'vue3_demo',
    framework: 'vue',
    variant: 'TypeScript'
}
```

2. `cd vue3_demo` -> `npm i` -> `npm run dev`

### 搭建项目框架

`vue3 + vite + typescript + elementplus`

1.  第一个页面

```ts
// login.vue

<template>
    <el-form
        :model="ruleForm"
        status-icon
        :rules="rules"
        ref="refRuleForm"
        label-width="100px"
    >
        <el-form-item label="账号" prop="loginAccount">
            <el-input
                type="text"
                v-model="ruleForm.loginAccount"
                autocomplete="off"
            ></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="loginPassword">
            <el-input
                type="password"
                autocomplete="off"
                v-model="ruleForm.loginPassword"
            ></el-input>
        </el-form-item>
        <el-form-item>
            <el-button type="primary"
            @click="submit(ruleForm)"
                >登录</el-button
            >
        </el-form-item>
    </el-form>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, toRef, toRefs } from 'vue'
import {useRouter} from 'vue-router'
import {loginService} from '../api/login'
import {enCodeMd5, saveLoginInfo} from '@/utils/utils'
import {CommonTypeProps} from '../types/common'
import { AxiosResponse } from 'axios'

interface RuleFormProps {
    loginAccount: string
    loginPassword: string

}
export default defineComponent({
    setup () {
        const router = useRouter()
        const rules: any = {
            loginAccount: [{
                required: true,
                message: '请输入手机号'
            }],
            loginPassword: [{
                required: true,
                message: '请输入手机号'
            }]
        }
        const ruleForm: RuleFormProps = reactive({
            loginAccount: '',
            loginPassword: ''
        })
        const refRuleForm = toRefs(ruleForm)
        const submit = async (obj: any) => {
            console.log(obj)
            try {
                const res:AxiosResponse<CommonTypeProps.ResponseProps> = await loginService({
                    ...obj,
                    loginPassword: enCodeMd5(obj.loginPassword)
                })
                console.log('res', res)
                if (res?.data?.bizCode === 'SUCCESS') {
                    console.log(res.data.respData)
                    saveLoginInfo(res.data.respData)
                    
                    router.push('/')
                }
            } catch (error) {
                
            }
        }
        return {
            ...refRuleForm,
            ruleForm,
            rules,
            submit
        }
    }
})
</script>

```

2. 路由配置

```ts
//router/route.ts
import {RouteRecordRaw} from 'vue-router'

const routes: RouteRecordRaw[] = [
    {
        path: '/login',
        component: () => import('@/views/login.vue')
    },
    {
        path: '/',
        component: () => import('@/views/layout.vue'),
        redirect: '/index',
        meta: {
            name: '首页'
        },
        children: [
            {
                path: 'index',
                component: () => import('@/views/index/index.vue'),
                meta: {
                    name: '首页'
                }
            },
            {
                path: 'order',
                component: () => import('@/views/index/index.vue'),
                meta: {
                    name: '订单'
                }
            },
            {
                path: 'goods',
                component: () => import('@/views/index/index.vue'),
                meta: {
                    name: '商品'
                }
            }
        ]
    }
]
export default routes
// router/index.ts
import {createRouter, createWebHashHistory} from 'vue-router'
import routes from './route'

const router = createRouter({
    history: createWebHashHistory(),
    routes: routes
})

export default router
```

3. 动态路由配置

```js
// Vite 支持使用特殊的 `import.meta.glob` 函数从文件系统导入多个模块
const modules = import.meta.glob('../views/**/**.vue')
获取页面文件信息与后台返回的菜单数组匹配，获取路由数组，使用 `addRoute` 方法动态导入到路由中
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
```