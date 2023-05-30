<script setup>
import {getGoodsList} from "@/api";
import {use} from 'echarts/core';
import {CanvasRenderer} from 'echarts/renderers';
import {PieChart} from 'echarts/charts';
import {
    TitleComponent,
    TooltipComponent,
    LegendComponent,
} from 'echarts/components';
import VChart, {THEME_KEY} from 'vue-echarts';
import {ref, provide} from 'vue';

use([
    CanvasRenderer,
    PieChart,
    TitleComponent,
    TooltipComponent,
    LegendComponent,
]);

provide(THEME_KEY, 'light');

const option = ref({
    title: {
        text: '库存分布图',
        left: 'center',
    },
    tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b} : {c} ({d}%)',
    },
    legend: {
        orient: 'vertical',
        left: 'left',
        data: [],
    },
    series: [
        {
            name: '货物类别',
            type: 'pie',
            radius: '55%',
            center: ['50%', '50%'],
            data: [],
            emphasis: {
                itemStyle: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: 'rgba(0, 0, 0, 0.5)',
                },
            },
        },
    ],
});

const init = () => {

    getGoodsList({}).then((res) => {
        let map = new Map()
        let arr = res["goods"]
        let len = arr.length
        for (let i = 0; i < len; i++) {
            if (map.get(arr[i].category) === undefined) map.set(arr[i].category, 0)
            map.set(arr[i].category, map.get(arr[i].category) + arr[i]["total_count"])
        }
        map.forEach((value, key) => {
            option.value.legend.data.push(key)
            option.value.series[0].data.push({
                value,
                name: key
            })
        })
    })
}
init()
</script>

<template>
    <div style="width: 600px;height: 600px;margin: 30px auto 0">
        <v-chart class="chart" :option="option" autoresize/>
    </div>

</template>

<style scoped>

</style>