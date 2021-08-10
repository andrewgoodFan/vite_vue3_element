/*
 * @Autor: Foley Fan
 * @Date: 2021-05-24 14:45:28
 * @LastEditTime: 2021-06-03 16:53:35
 * @Description: 
 */
const api: any = {
    'development': 'http://localhost:80001',
}
const mode: string | undefined = process.env.NODE_ENV
const BASE_API = api[mode || 'development']

export default BASE_API