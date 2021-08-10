/*
 * @Autor: Foley Fan
 * @Date: 2021-05-24 14:42:34
 * @LastEditTime: 2021-05-31 10:39:09
 * @Description: 
 */
import axios, {Method, AxiosInstance} from 'axios'
import { ElMessage } from 'element-plus'
import {getStorageData} from '@/utils/utils'
import BASE_API from '../../public/config' 

const instance: AxiosInstance = axios.create({
// baseURL: BASE_API,
timeout:  150000
})
instance.defaults.headers.post['Content-Type'] = 'application/json'

instance.interceptors.request.use(config => {
    const token: string = getStorageData('token')
    token && (config.headers['token'] = token)
    return config
}, error => {
    return Promise.reject(error)
})

instance.interceptors.response.use(response => {
    if (response.data && response.data.bizCode === 'SUCCESS') {
        return response
    }
    ElMessage.error(response?.data?.bizMsg || '网络错误，请稍后重试')
    return response
}, error => {
    return Promise.reject(error)
})

const mergeOptions = (params: any, options: any, method: Method) => {
    const methodArr: Method[] = ['GET', 'DELETE']
    return methodArr.includes(method) ? {...options, params} : {...options,data: params}
}

export const request = (url: string, method: Method, params?: any, options?: any) => {
    return instance({
        url,
        method,
        ...mergeOptions(params, options, method)
        
    })
}