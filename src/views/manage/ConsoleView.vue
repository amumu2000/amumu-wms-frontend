<script setup>
import Aside from "@/components/Aside.vue";
import Header from "@/components/Header.vue";
import {ref} from "vue";

const isCollapse = ref(false)
const asideWidth = ref("300px")
const expand = () => {
    asideWidth.value = "300px"
    isCollapse.value = false
}
const fold = () => {
    asideWidth.value = "64px"
    isCollapse.value = true
}
</script>

<template>
    <div class="consoleView flex-grow-fill">
        <el-container class="page">
            <Aside :isCollapse="isCollapse" :asideWidth="asideWidth"></Aside>
            <el-container class="main">
                <el-header class="header">
                    <div style="align-self: flex-start;line-height: 70px">
                        <el-button text v-if="isCollapse" @click="expand">
                            <el-icon style="font-size: 30px">
                                <Expand/>
                            </el-icon>
                        </el-button>
                        <el-button text v-if="!isCollapse" @click="fold">
                            <el-icon style="font-size: 30px">
                                <Fold/>
                            </el-icon>
                        </el-button>
                    </div>
                    <Header></Header>
                </el-header>
                <el-main>
                    <router-view></router-view>
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>

<style scoped>
.consoleView {
    .page {
        height: 100%;

        .header {
            height: 70px;
            display: flex;
            align-items: center;
            padding-left: 0;
        }
    }
}
</style>