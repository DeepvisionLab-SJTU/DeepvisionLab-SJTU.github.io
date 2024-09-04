<script setup lang="ts">
import { NFlex, NTag } from 'naive-ui';
import GPUCard from './GPUCard.vue';


const props = defineProps<{
    data: object
}>()

</script>

<template>
    <n-flex vertical class="gpu_wrap" >
        <div style="display: flex; flex-direction: row; gap: 20px;">
            <n-tag :bordered="false" type="info" style="max-width: max-content; font-weight: 700;" > GPU Num: {{ props.data.gpus.length}} </n-tag>
            <n-tag :bordered="false" type="info" style="max-width: max-content; font-weight: 700;" > Driver: {{ props.data.driver_version}} </n-tag>
            <n-tag :bordered="false" type="info" style="max-width: max-content; font-weight: 700;" > Query Time: {{ props.data.query_time}} </n-tag>
        </div>
        <div class="gpu_wrapper">
            <div v-for="item in props.data.gpus" style="width: 24%; min-width: 24%;">
                <GPUCard :data="item"></GPUCard>
            </div>
        </div>
    </n-flex>
</template>

<style scoped>
.gpu_wrap {
    width: 97%;
    margin: 0px;
}
.gpu_wrapper {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    gap: 20px 12px !important;
    justify-content: space-evenly !important;
}
</style>