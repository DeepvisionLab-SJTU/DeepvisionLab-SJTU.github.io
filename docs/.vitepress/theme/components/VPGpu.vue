<script setup lang="ts">
import { ref } from 'vue';
import { useData } from 'vitepress';
import { NFlex, NConfigProvider, darkTheme } from 'naive-ui';
import NodeCard from './NodeCard.vue';

const { theme, isDark } = useData()
const globalTheme = ref(isDark)

</script>

<template>
    <n-config-provider :theme="globalTheme?darkTheme:null">
        <div>
            <n-flex v-for="item in theme.servers" vertical class="NodeLayout">
                <NodeCard :server_name="item.name" :server_addr="item.link" :server_port="item.port" :server_api="item.apipage"/>
            </n-flex>
        </div>
    </n-config-provider>
</template>

<style scoped>
.NodeLayout {
    position: relative;
    width: 90%;
    max-width: 100%;
    min-width: 960px;
    margin: auto;
    padding-top: 20px;
    padding-bottom: 20px;
}
</style>