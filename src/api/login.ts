/*
 * @Autor: Foley Fan
 * @Date: 2021-05-24 15:38:57
 * @LastEditTime: 2021-06-03 16:53:02
 * @Description: 
 */
import {AxiosPromise} from 'axios'
import {post} from './common'

/**
 * @description: 登录
 * @param {object} params
 * @return {AxiosPromise<any>}  Promise
 */
export const loginService = (params: object = {}): AxiosPromise<any> => post('/api/login', params)