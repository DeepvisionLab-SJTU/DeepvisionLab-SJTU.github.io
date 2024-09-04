<script setup lang="ts">
import { computed } from 'vue';
import { NProgress } from 'naive-ui';
import { changeColor } from 'seemly'
import { useThemeVars } from 'naive-ui'
import { NTag } from 'naive-ui';
import { getPercLevel } from '../func';

const themeVars = useThemeVars()
const props = defineProps<{
    data: object
}>()

const memReadable = computed(() => {
    const totalReadable = (props.data['swap']['total'] / (1024*1024*1000)).toFixed(2)
    const usedReadable = (props.data['swap']['used'] / (1024*1024*1000)).toFixed(2)
    return {usedReadable, totalReadable}
})
</script>

<template>
    <div style="flex-basis: 48%; align-self: flex-start;">
        <n-tag :bordered="false" type="info" style="font-weight: 700;"> SWAP </n-tag>
        <div class="mem_detail">
            <h4>Usage:</h4>
            <h4 > Used/Total: {{ memReadable.usedReadable }}GB/{{ memReadable.totalReadable }}GB</h4>
        </div>
        <n-progress
        type="line"
        indicator-placement="inside"
        :color="getPercLevel(props.data.swap.percent, 0.9)"
        :rail-color="changeColor(themeVars.successColor, { alpha: 0.1 })"
        :percentage="props.data.swap.percent"
        :height="24"
        :indicator-text-color="themeVars.textColorBase"
        />

    </div>
</template>

<style>
.mem_detail {
    display: flex;
    margin-left: 5px;
    margin-right: 5px;
    justify-content: space-between;
}
</style>