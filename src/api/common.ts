/*
 * @Autor: Foley Fan
 * @Date: 2021-05-24 15:04:55
 * @LastEditTime: 2021-05-24 17:03:05
 * @Description: 
 */
import {request} from './request'

export const post = (url: string, params?: any, options?: any) => {
    return request(url, 'POST', params, options)
}

export const get = (url: string, params?: any, options?: any) => {
    return request(url, 'GET', params, options)
}