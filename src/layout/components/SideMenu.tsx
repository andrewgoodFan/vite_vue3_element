/*
 * @Autor: Foley Fan
 * @Date: 2021-06-01 10:14:36
 * @LastEditTime: 2021-06-01 17:05:30
 * @Description: 
 */
import { computed, defineComponent } from 'vue'
import { RouteRecordRaw, useRoute, useRouter } from 'vue-router'
import { useStore } from 'vuex'
import SideMenuItem from './SideMenuItem'
export default defineComponent({
    name: 'SideMenu',
    setup() {
        const route = useRoute()
        const router = useRouter()
        const store = useStore()
        const menu = computed(() => store.state.app.menus)
        const selectPath = (index: string, indexPath: any[]) => {
            if (index.startsWith('/http')) {
                window.open(index.substring(1))
            } else {
                router.push(index)
            }
        }
        return {
            route,
            menu,
            selectPath
        }
    },
    render() {
        return (
            <el-menu
            uniqueOpened={true}
            default-active={this.route.path}
            class="el-menu-vertical-demo"
            background-color="#001529"
            text-color="#fff"
            active-text-color="#ffd04b"
            onSelect={this.selectPath}
            >
                {
                    this.menu.map((item: RouteRecordRaw) => {
                        if (item.children && item.children.length) {
                            return <SideMenuItem itemMenu={item} />
                        } else {
                            return <el-menu-item index={item.path}>{item.meta?.title || '默认菜单'}</el-menu-item>
                        }
                    })
                }
            </el-menu>
        )
    },
})
