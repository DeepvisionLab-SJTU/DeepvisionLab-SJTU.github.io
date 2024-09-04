<script setup lang="ts">
import { Ref, computed, ref } from 'vue';
import { NCard, NProgress, useThemeVars, NFlex, NDivider, NTable, NModal, NButton } from 'naive-ui';
import { changeColor } from 'seemly'
import { getPercLevel, getModalStat } from '../func';

const themeVars = useThemeVars()
const props = defineProps<{
    data: object
}>()
const bodyStyle = {
    width: '800px'
}
const segmented = {
    content: 'soft',
    footer: 'soft'
}


const memperc = computed(() => {
    const perc = (props.data['memory.used'] / props.data['memory.total']) * 100
    const barColor = getPercLevel(perc, 0.9)
    const percone = Number(perc.toFixed(0))
    return {percone, barColor}
})
const utiperc = computed(() => {
    const perc = props.data['utilization.gpu']
    const barColor = getPercLevel(perc, 0.9)
    const percone = Number(perc.toFixed(0))
    return {percone, barColor}
})
const filteredProcesses = computed(() => {
    return props.data.processes.filter(process => process.username !== 'gdm');
});

const showModalNoRef: { [key: string]: boolean } = {};
for (let i = 0; i < filteredProcesses.length; i++) {
    const key = filteredProcesses[i].pid.toString();
    showModalNoRef[key] = false;
}
const showModelRef = ref(showModalNoRef)


</script>


<template>
    <n-card content-class="per-gpu-detail">
        <div style="padding-bottom: 0px; text-align: left; padding-left: 10px;">
            [{{ props.data.index }}] {{ props.data.name }}
            
        </div>
        <n-divider style="margin-top: 10px; margin-bottom:10px; padding-left: 10px; padding-right: 10px; --n-color: rgb(184 184 192);" />
        <div class="util-rate">
            <n-flex vertical style="width: 40%; align-items: center;">
                <p>Memory</p>
                <n-progress 
                    type="circle" 
                    :percentage="memperc.percone"
                    :offset-degree="360" 
                    :stroke-width="15"
                    :color="memperc.barColor"
                    :rail-color="changeColor(themeVars.successColor, { alpha: 0.1 })"
                    style="width: 100%"
                />
                <p>{{ props.data['memory.used'] }}/{{ props.data['memory.total'] }}M</p>
            </n-flex>

            <n-flex vertical style="width: 40%; align-items: center;">
                <p>Utilization</p>
                <n-progress 
                    type="circle" 
                    :percentage=utiperc.percone
                    :offset-degree="360" 
                    :stroke-width="15"
                    :color="utiperc.barColor"
                    :rail-color="changeColor(themeVars.successColor, { alpha: 0.1 })"
                    style="width: 100%"
                />
                <p>
                    Temp: <span class="temperature">{{ props.data['temperature.gpu'] }}</span>
                </p>
                
            </n-flex>
        </div>
        <n-divider style="margin-top: 10px; margin-bottom:10px; padding-left: 10px; padding-right: 10px; --n-color: rgb(184 184 192);" />
        <div class="tasks">
            <n-table  single-line size="small" style="border: 0;">
                <thead style="--n-th-color: var(--n-td-color)">
                    <tr style="text-align: center;">
                    <th>PID</th>
                    <th>USER</th>
                    <th>GPU</th>
                    </tr>
                </thead>
                <tbody v-if="filteredProcesses.length > 0">
                    <tr v-for="process in filteredProcesses" style="text-align: center; font-weight: 500;">
                        <td >
                            <n-button @click="showModelRef[process.pid.toString()] = true" type="primary" size="tiny" tag='span' ghost>
                                {{ process.pid }}
                            </n-button>
                        </td>
                        <td>{{ process.username }}</td>
                        <td>{{ process.gpu_memory_usage }} MB</td>
                        <n-modal
                            v-model:show="showModelRef[process.pid.toString()]"
                            class="custom-card"
                            preset="card"
                            :style="bodyStyle"
                            :title="'PID: '+process.pid"
                            size="huge"
                            :bordered="false"
                            :segmented="segmented"
                        >   
                            <div style="display: flex; flex-direction: row;">
                                <p style="font-weight: 800; width: 120px; min-width: 120px;">Command: </p>
                                <p style="">{{ process.full_command.join(" ") }}</p>
                            </div>
                            <div style="display: flex; flex-direction: row;">
                                <p style="font-weight: 800; width: 120px; min-width: 120px;">CPU-Util: </p>
                                <p style="">{{ process.cpu_percent }}%</p>
                            </div>
                            <div style="display: flex; flex-direction: row;">
                                <p style="font-weight: 800; width: 120px; min-width: 120px;">CPU-Usage: </p>
                                <p style="">{{ (process.cpu_memory_usage / (1024*1024*1000)).toFixed(1) }} GB</p>
                            </div>
                        </n-modal>
                        
                    </tr>
                </tbody>
                <tbody v-else>
                    <tr style="text-align: center; font-weight: 300;">
                    <td></td>
                    <td>No process</td>
                    </tr>
                </tbody>
            </n-table>
        </div>
        
    </n-card>
</template>

<style>
.per-gpu-detail {
    padding: 5px 0px 5px 0px !important;
    font-weight: 700;
    height: 100%;
}
.util-rate {
    display: flex;
    flex-direction: row;
    gap: 20px;
    justify-content: center;
}

.tasks {
    display: flex;
    flex-direction: column;
    gap: 20px;
    justify-content: center;
}
.temperature::after {
    content: "℃";
    display: inline-block;
}

</style>