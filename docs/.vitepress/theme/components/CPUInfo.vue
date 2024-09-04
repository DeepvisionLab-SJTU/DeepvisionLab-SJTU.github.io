<script setup lang="ts">
import { NProgress, NTag, useThemeVars} from 'naive-ui';
import { changeColor } from 'seemly'
import { getPercLevel } from '../func';
import { ref } from 'vue';

const themeVars = useThemeVars()


const props = defineProps<{
    data: object
}>()
</script>

<template>
    <div style="flex-basis: 48%; align-self: flex-start;">
        <n-tag :bordered="false" type="info" style="font-weight: 700;">CPU</n-tag>

        <h4 class="cpu_detail">{{ props.data.cpu_name }}|{{ props.data.cpu_count }} cores {{ themeVars.successColor }}</h4>

        <n-progress
        type="line"
        indicator-placement="inside"
        :color="getPercLevel(props.data.cpu_usage_percent, 0.9)"
        :rail-color="changeColor(themeVars.successColor, { alpha: 0.1 })"
        :percentage="props.data.cpu_usage_percent"
        :height="24"
        :indicator-text-color="themeVars.textColorBase"
        />
    </div>
</template>
