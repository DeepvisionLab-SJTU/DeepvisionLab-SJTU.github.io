<script setup lang="ts">
import { computed } from 'vue';
import { NProgress, NTag, useThemeVars, NTooltip } from 'naive-ui';
import { changeColor } from 'seemly'
import { getDiskData } from '../func';

const themeVars = useThemeVars()
const props = defineProps<{
    data: object
}>()

const SSDData = computed(() => {
    const result = getDiskData(props.data, 'SSD')
    return result
})
const HDDData = computed(() => {
    const result = getDiskData(props.data, 'HDD')
    return result
})
</script>

<template>
    <div style="flex-basis: 48%; align-self: flex-start;">

        <n-tag :bordered="false" type="info" style="font-weight: 700;"> Disk </n-tag>

        <div style="display: flex; justify-content: space-between;">

            <div style="width: 48%;">
                <div class="disk_detail">
                    <h4>SSD:</h4>
                    <h4 > Free: {{ SSDData.totalAvailReadable }}GB</h4>
                </div>
                <n-progress
                type="line"
                indicator-placement="inside"
                :color="SSDData.barColor"
                :rail-color="changeColor(themeVars.successColor, { alpha: 0.1 })"
                :percentage="parseFloat(SSDData.totalPercReadable)"
                :height="24"
                :indicator-text-color="themeVars.textColorBase"
                />
            </div>

            <div style="width: 48%;">
                <div class="disk_detail">
                    <h4>HDD:</h4>
                    <h4 > Free: {{ HDDData.totalAvailReadable }}GB</h4>
                </div>
                <n-tooltip placement="bottom" trigger="hover">
                    <template #trigger>
                        <n-progress
                        type="line"
                        indicator-placement="inside"
                        :color="HDDData.barColor"
                        :rail-color="changeColor(themeVars.successColor, { alpha: 0.1 })"
                        :percentage="parseFloat(HDDData.totalPercReadable)"
                        :height="24"
                        :indicator-text-color="themeVars.textColorBase"
                        />
                    </template>
                    <div style="display: flex; flex-direction: column;"> 
                        <div v-for="diskitem in HDDData.disks" style="display: flex; justify-content: space-between; column-gap: 40px;">
                            <p style=" flex-grow: 1; text-align: left;">{{ diskitem.mountpoint }}</p>
                            <p style=" flex-grow: 1; text-align: right;">{{ diskitem.usedReadable }}/{{ diskitem.totalReadable }}TB</p>

                        </div> 
                    </div>
                </n-tooltip>


            </div>
        </div>

    </div>
</template>

<style>
.disk_detail {
    display: flex;
    margin-left: 5px;
    margin-right: 5px;
    justify-content: space-between;
}
</style>