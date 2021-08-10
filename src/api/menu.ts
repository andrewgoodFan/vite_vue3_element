/*
 * @Autor: Foley Fan
 * @Date: 2021-05-31 10:34:57
 * @LastEditTime: 2021-05-31 11:15:12
 * @Description: 
 */
import {AxiosPromise} from 'axios'
import {get} from './common'

export const getMenuDataService = (): AxiosPromise<any> => get('menu.json')