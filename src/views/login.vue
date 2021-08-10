<!--
 * @Autor: Foley Fan
 * @Date: 2021-05-20 16:25:23
 * @LastEditTime: 2021-06-04 10:11:30
 * @Description: 
-->
<template>
    <h2>登录</h2>
    <el-form
        class="login-form"
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
                placeholder="admin"
            ></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="loginPassword">
            <el-input
                type="password"
                autocomplete="off"
                v-model="ruleForm.loginPassword"
                placeholder="123456"
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
import { defineComponent, onMounted, reactive, Ref, ref, toRef, toRefs } from 'vue'
import {useRouter} from 'vue-router'
import {loginService} from '../api/login'
import {enCodeMd5, setStorageData} from '@/utils/utils'
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
                message: '请输入密码'
            }]
        }

        const state = reactive({
            ruleForm: {
                loginAccount: '',
                loginPassword: ''
            },
            refRuleForm: ref<any>(null)
        })
        const submit = async (obj: any) => {
            try {
                state.refRuleForm.validate().then((valid: boolean) => {
                    if (valid) {
                        // const res:AxiosResponse<CommonTypeProps.ResponseProps> = await loginService({
                        //     ...obj,
                        //     loginPassword: enCodeMd5(obj.loginPassword)
                        // })
                        // console.log('res', res)
                        // if (res?.data?.bizCode === 'SUCCESS') {
                        //     console.log(res.data.respData)
                        //     setStorageData('authUserFacadeVo', res.data.respData, true)
                        //     router.push('/')
                        // }
                        if (obj.loginAccount === 'admin' && obj.loginPassword === '123456') {
                            setStorageData('token', 'demo_token_for_admin')
                            router.push('/')
                        }
                    }
                })
            } catch (error) {
                
            }
        }
        return {
            ...toRefs(state),
            rules,
            submit
        }
    }
})
</script>
<style lang="scss" scoped>
    h2 {
        margin: 150px 0 0;
        text-align: center;
        font-size: 30px;
    }
    .login-form {
        position: absolute;
        left: 50%;
        top: 200px;
        width: 500px;
        padding: 20px;
        transform: translateX(-50%);
        background: #fff;
        box-shadow: 5px 5px 30px #eee;
    }
</style>