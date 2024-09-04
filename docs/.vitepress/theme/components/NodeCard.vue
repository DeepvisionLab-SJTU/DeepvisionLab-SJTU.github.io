<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { fetchServerData } from '../api';
import { NFlex, NDivider, NSpin, NButton } from 'naive-ui';
import CPUInfo from './CPUInfo.vue';
import DiskInfo from './DiskInfo.vue';
import MemSwapInfo from './MemSwapInfo.vue';
import MemVirtInfo from './MemVirtInfo.vue';
import GPUInfo from './GPUInfo.vue';

const props = defineProps<{
    server_name: string
    server_addr: string
    server_port: number
    server_api: string
}>()
const serverData = ref<(any | null)[]>([]);
const loading = ref(true);

const loadData = async () => {
    try {
        serverData.value = await fetchServerData(props.server_addr, props.server_port, props.server_api);
        loading.value = false;
    } catch (error) {
        console.error('Failed to fetch server data', error);
        loading.value = true;
    } finally {
        loading.value = false;
    }
};

onMounted(() => {
    loadData();
    setInterval(loadData, 180000); // 每隔一分钟重新加载数据
});
</script>

<template>
  <n-button type="primary" @click="loadData" style="width: fit-content;">Refresh {{ server_name }}</n-button>
  <n-flex class="node_info">
    <div v-if="loading" style="min-width: 100%; justify-self: center;">
      <n-spin size="large" style="display: flex;">
        <template #description>
          Loading data from servers!
        </template>
      </n-spin>
    </div>
    <template v-else>
      <n-flex class="node_name">
        {{ server_name }}
      </n-flex>
      <n-flex vertical class="node_details">
        <n-flex justify="space-around" class="cpu_disk_mem_data">
          <CPUInfo :data="serverData.CPU_INFO"></CPUInfo>
          <MemVirtInfo :data="serverData.MEM_INFO"></MemVirtInfo>
          <DiskInfo :data="serverData.DISK_INFO"></DiskInfo>
          <MemSwapInfo :data="serverData.MEM_INFO"></MemSwapInfo>
        </n-flex>

        <n-divider style="margin-top: 10px; margin-bottom:10px; padding-left: 10px; padding-right: 10px; --n-color: rgb(184 184 192);" />

        <n-flex class="gpu_data">
          <GPUInfo :data="serverData.GPU_INFO"></GPUInfo>
        </n-flex>
      </n-flex>
    </template>
  </n-flex>
</template>

<style scoped>
.node_name {
  width: 6%;
  align-items: center;
  justify-content: center;
  border-right: 1px solid;
  border-right-color: rgb(184 184 192);
}
.node_details {
  width: 94%;
}
.node_info {
  position: relative;
  border-left: 0px;
  border-top: 1px;
  border-right: 0px;
  border-bottom: 1px;
  border-style: solid;
  padding: 5px;
  flex-flow: nowrap !important;
}
.cpu_disk_mem_data {
  width: 100%;
  gap: 20px 12px !important;
  margin: 0px;
  flex-wrap: wrap;
  justify-content: center !important;
}
.gpu_data {
  width: 100%;
  margin: 0px;
  justify-content: center !important;
}
</style>