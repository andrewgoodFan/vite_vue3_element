/*
 * @Autor: Foley Fan
 * @Date: 2021-06-01 16:25:40
 * @LastEditTime: 2021-06-01 16:44:26
 * @Description: 
 */
import { computed, defineComponent, PropType } from 'vue'
import { useRoute, RouteRecordRaw } from 'vue-router'
import { useStore } from 'vuex'
const SideMenuItem = defineComponent({
    name: 'SideMenuItem',
    props: {
        itemMenu: {
            type: Object as PropType<RouteRecordRaw>,
            required: true
        }
    },
    setup() {
        const route = useRoute()
        const store = useStore()
        const menu = computed(() => store.state.app.menus)
        return {
            route,
            menu
        }
    },
    render() {
        console.log('sidemenu', this.route)
        console.log('sidemenu', this.menu)
        const slots = {
            title: () => <div>
                {this.itemMenu?.meta?.icon && <i class={this.itemMenu.meta.icon}></i> || null}
                <span>{this.itemMenu.meta?.title || '默认菜单'}</span>
            </div>
        }
        return (
            <el-submenu v-slots={slots} index={this.itemMenu.path}>
                {
                    this.itemMenu.children?.map((item) => {
                        if (item.children && item.children.length) {
                            return <SideMenuItem itemMenu={item} />
                        } else {
                            return <el-menu-item index={item.path}>{item.meta?.title || '默认菜单'}</el-menu-item>
                        }
                    })
                }
            </el-submenu>
        )
    },
})

export default SideMenuItem