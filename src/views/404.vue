<!--
 * @Autor: Foley Fan
 * @Date: 2021-05-31 10:32:05
 * @LastEditTime: 2021-06-04 10:25:22
 * @Description: 
-->

<template>
    <div class="err-404">
        <div style="text-align: center; font-size: 20px;">NOT FOUND</div>
        <button @click="back">BACK</button>
    </div>
</template>

<script lang='ts'>
import { useRouter, Router } from 'vue-router'
export default {
    setup () {
        const router: Router = useRouter()
        const back = (): void => {
            router.back()
        }
        return {
            back
        }
    }
}
</script>