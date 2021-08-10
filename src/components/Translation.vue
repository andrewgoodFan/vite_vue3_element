<!--
 * @Autor: Foley Fan
 * @Date: 2021-06-02 15:32:29
 * @LastEditTime: 2021-06-03 14:40:53
 * @Description: 
-->
<template>
 <!-- <router-view v-slot="{Component}">
        <transition name="zoom-fade" mode="out-in">
            <keep-alive>
                <component :is="Component" />
            </keep-alive>
      </transition>
    </router-view> -->
    <div class="transition-wrap">
        <router-view v-slot="{Component}">
        <transition name="zoom-fade" mode="out-in">
            <keep-alive>
                <component :is="Component" />
            </keep-alive>
      </transition>
    </router-view>
    </div>
    
</template>
<script lang='ts'>
import { defineComponent, reactive } from "vue";
import { useStore } from "vuex";

export default defineComponent({
    name: 'Translation',
    setup() {
        const store = useStore()
        // 需要缓存的路由组件
        const keepAliveComponents = reactive([])

        return {
        keepAliveComponents
        }
    }
})
</script>