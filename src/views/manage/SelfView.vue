<script setup>
import {ref,} from "vue";
import {edit, self} from "@/api";
import {getRoleName} from "@/utils"

const myselfUserData = ref({})
const formLabelWidth = "180px"
const init = () => {
    self({}).then((data) => {
        if (data.user) {
            console.log(data.user)
            data.user.role_name = getRoleName(data.user.role)
            myselfUserData.value = data.user
        }
    })
}


const handleEdit = () => {
    let data = {...myselfUserData.value}
    console.log(data)
    edit(data)
}
init()
</script>

<template>
    <div class="myselfWrap">
        <el-form :model="myselfUserData">
            <el-form-item label="用户ID" :label-width="formLabelWidth">
                <el-input v-model="myselfUserData.id" autocomplete="off" disabled/>
            </el-form-item>
            <el-form-item label="用户名" :label-width="formLabelWidth">
                <el-input v-model="myselfUserData.username" autocomplete="off"/>
            </el-form-item>
            <el-form-item label="邮箱" :label-width="formLabelWidth">
                <el-input v-model="myselfUserData.email" autocomplete="off" disabled/>
            </el-form-item>
            <el-form-item label="密码" :label-width="formLabelWidth">
                <el-input v-model="myselfUserData.password" autocomplete="off"/>
            </el-form-item>
            <el-form-item label="角色" :label-width="formLabelWidth">
                <el-select v-model="myselfUserData.role_name" placeholder="Please select a role" disabled>
                </el-select>
            </el-form-item>


        </el-form>
        <div class="option">
            <el-form-item>
                <el-button type="primary" @click="handleEdit">更新信息</el-button>
            </el-form-item>
        </div>
    </div>

</template>

<style scoped lang="less">
.el-input {
    width: 350px;
}

.myselfWrap {
    width: 600px;
    display: flex;
    flex-direction: column;

    .option {
        align-self: center;

    }
}


</style>