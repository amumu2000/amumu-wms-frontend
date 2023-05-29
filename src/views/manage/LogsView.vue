<script setup>

import {getLogsList} from "@/api";
import {ref} from "vue";

const allLogData = ref()
const currentLogData = ref(null)
const currentPage = ref(1)
const pageSize = ref(10)
const total = ref(0)
const updateCurrentLogData = () => {
    currentLogData.value = allLogData.value.filter((item, index) => {
        return index < currentPage.value * pageSize.value &&
            index >= pageSize.value * (currentPage.value - 1)
    })
}
const init = (filter) => {
    getLogsList(filter).then((data) => {
        const logs = data["logs"]
        allLogData.value = logs
        total.value = logs.length
        setTimeout(() => {
            updateCurrentLogData()
        }, 200)
    })
}

const initForm = () => {
    allLogData.value = []
    currentLogData.value = null
    init({})
}

const handleCurrentChange = (e) => {
    currentPage.value = e
    updateCurrentLogData()
};

const handleSizeChange = (e) => {
    pageSize.value = e
    updateCurrentLogData()
};


initForm()
</script>

<template>
    <div style="display: flex;flex-direction: column;align-items: flex-start">
        <div>
            <el-table
                :data="currentLogData"
                stripe style="width: 1200px"
                v-loading="currentLogData===null" class="table"
                height="500">
                <el-table-column prop="id" label="日志ID" width="100px"/>
                <el-table-column prop="title" label="日志标题" width="120px"/>
                <el-table-column prop="message" label="日志描述"/>
            </el-table>
            <div style="margin: 10px 0">
                <el-button type="primary" @click="initForm">刷新</el-button>
            </div>
            <el-pagination
                :page-sizes="[10,50, 100]"
                layout="total, sizes, prev, pager, next, jumper"
                :total="total"
                v-model:current-page="currentPage"
                v-model:page-size="pageSize"
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
            />
        </div>
    </div>
</template>

<style scoped>
.el-pagination {
    justify-content: center;
}
</style>