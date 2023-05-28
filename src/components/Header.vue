<script setup>
import {ElMessage} from "element-plus";
import {useCookies} from "vue3-cookies";
import {useRouter} from "vue-router";

const {cookies} = useCookies()
const router = useRouter()
const logout = () => {
    cookies.remove("token")
    router.push("/login")
    ElMessage.warning({
        message: "再见"
    })
}
</script>

<template>

    <div class="title">智能物资仓储管理系统</div>
    <div class="flex-grow-fill"></div>
    <div class="account">
        <el-button-group>
            <el-button @click="logout">登出</el-button>
        </el-button-group>
    </div>

</template>

<style scoped>
.title {
    padding-left: 25px;
    width: 400px;
    font-size: 30px;
    white-space: nowrap;
    word-wrap: normal;
    word-break: keep-all;
}

</style>