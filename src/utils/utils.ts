/*
 * @Autor: Foley Fan
 * @Date: 2021-05-25 09:47:17
 * @LastEditTime: 2021-06-03 16:47:00
 * @Description: 工具方法
 */
import md5 from 'js-md5'
import {markRaw} from 'vue'
import {RouteRecordRaw} from 'vue-router'
import Translation from '@/components/Translation.vue'

export const enCodeMd5 = (str: string) => {
    if (!str) return str
    return md5(str)
}

// storage类型
type  LocalType = 'local' | 'session'
/**
 *  storage 类型转换
 */
const storageDataFormat = (data: any): string => {
    try {
        data = JSON.stringify(data)
    } catch (error) {
        data = data
    }
    return data
}

/**
 * @description: 储存数据到storage
 * @param {string} key  键名
 * @param {any} info    键值
 * @param {boolean} deep  是否深度储存
 * @param {LocalType} type  储存类型  local || session
 * @return {void} void
 */
export const setStorageData = (key: string, info: any, deep: boolean = false, type: LocalType = 'local'): void => {
    const storage: Storage = type === 'local' ? localStorage : sessionStorage
    if (deep) {
        try {
            for(let keys in info) {
                storage.setItem(keys, storageDataFormat(info[keys]))
            }
        } catch (error) {
            throw new Error('请传入正确的数据类型！')
        }
    } else {
        storage.setItem(key, storageDataFormat(info))
    }
}

/**
 * @description: 获取storage数据
 * @param {string | string[]} keys   单项或多项 键名
 * @param {LocalType} type   储存类型  local || session
 * @return {*}  获取的值
 */
export const getStorageData  = (keys: string | string[], type: LocalType = 'local'): any => {
    const storage: Storage = type === 'local' ? localStorage : sessionStorage
    const obj: any = {}
    if (Array.isArray(keys)) {
        keys.forEach((item) => {
            let data: string | null = storage.getItem(item)
            try {
                data = JSON.parse(data || '')
            } catch (error) {
            }
            obj[item] = data
        })
        return obj
    } else {
        let data: string | null = storage.getItem(keys)
        try {
            data = JSON.parse(data || '')
        } catch (error) {
        }
        return data
    }
}

/**
 * @description: 清除 storage 数据
 * @return {void}
 */
export const clearStorageData = (): void => {
    localStorage.clear()
    sessionStorage.clear()
}

export const listToTree = (arr: any[], parentId = -1): RouteRecordRaw[] => {
    const modules = import.meta.glob('../views/**/**.vue')
    console.log('modules', modules)
    return arr.filter((item) => item.parentId === parentId).map(item => {
        const {url, name, icon, keepAlive} = item
        const path = item.url.startsWith('/') ? item.url : `/${item.url}`
        return {
            ...item,
            name: item.url,
            path,
            component: item.component ? modules[`../views${item.component}.vue`] : modules['../views/404.vue'],
            meta: {
                title: item.name,
                icon: item.icon,
                keepAlive
            },
            children: listToTree(arr, item.id)
        }
    }).sort((a, b) => a.sort - b.sort)
}

export const addRouteRedirect = (arr: any[]) => {
    arr.forEach((item) => {
        if (item.children && item.children.length) {
            item.redirect = item.children[0].path
            item.component = markRaw(Translation)
            addRouteRedirect(item.children)
        }
    })
    return arr
}