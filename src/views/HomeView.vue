<script setup>
import {ref} from "vue";
import {useRoute} from "vue-router";

const route = useRoute()
const activeIndex = ref(route.fullPath)

</script>

<template>
    <div class="homeView flex-grow-fill">
        <el-container>
            <el-header>
                <el-menu
                    router
                    :default-active="activeIndex"
                    class="el-menu-demo"
                    mode="horizontal"
                    :ellipsis="false"
                >
                    <el-menu-item index="/home">首页</el-menu-item>
                    <!--                    <el-menu-item index="/product">产品</el-menu-item>-->
                    <el-menu-item index="/about">关于我们</el-menu-item>
                    <div class="title-text">木木智能仓储管理系统</div>
                    <div class="flex-grow-fill"/>
                    <el-menu-item index="/manage">仓储控制中心</el-menu-item>
                </el-menu>
            </el-header>
            <el-main>
                <RouterView/>
            </el-main>
        </el-container>
    </div>
</template>

<style scoped>
.homeView {
    .el-header {
        padding: 0;
    }

    .title-text {
        line-height: 50px;
        font-size: 30px;
        padding: 0 50px;
    }
}

</style>