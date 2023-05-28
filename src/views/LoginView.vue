<script setup>
import VCode from "vue3-puzzle-vcode";
import {reactive, ref} from "vue";
import {login} from "@/api";
import md5 from "crypto-js/md5";
import {useRouter} from "vue-router";
import {ElMessage} from "element-plus";

const router = useRouter()
const isShow = ref(false);
const formReactive = reactive({
    email: '',
    password: ''
})


const Login = () => {
    let form = {...formReactive}
    form.password = md5(form.password).toString()
    login(form).then((res) => {
        if (res === true) {
            router.push("/manage/console")
            ElMessage.success({message: "登录成功"})
        }
    })
}


const onSubmit = () => {
    if (formReactive.password !== "" && formReactive.email !== "") {
        isShow.value = true;
    }
}
const onClose = () => {
    isShow.value = false;
};

const onSuccess = () => {
    onClose();
    Login()
};


</script>

<template>
    <div class="loginView flex-grow-fill">
        <el-form class="form" :model="formReactive">
            <h1 class="welcome">欢迎</h1>
            <el-form-item>
                <el-input v-model="formReactive.email" placeholder="邮箱"/>
            </el-form-item>
            <el-form-item>
                <el-input type="password" v-model="formReactive.password" show-password placeholder="密码"/>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onSubmit" class="lg">登录</el-button>
            </el-form-item>
            <VCode :show="isShow" @success="onSuccess" @close="onClose"/>
        </el-form>
    </div>

</template>

<style scoped>
.loginView {
    background-repeat: no-repeat;
    background-size: cover;
    background-image: url("https://ts1.cn.mm.bing.net/th/id/R-C.edfd8cb6850eb66ea55f1038bf43411b?rik=n5rzGLxSLrKIIw&riu=http%3a%2f%2fimg.zcool.cn%2fcommunity%2f038c0c258bd2b9fa801219c779a0b67.jpg&ehk=a3yHsEUW%2bjsGMxH4TIwNWcUatiTDsW0CLP6%2brF1g0Vw%3d&risl=&pid=ImgRaw&r=0");

    .form {
        width: 350px;
        margin: 180px auto 0;
        padding: 15px 35px 35px 35px;
        border: 1px #ccc solid;
        border-radius: 5px;
        background-color: white;

        .welcome {
            text-align: center;
            margin-bottom: 10px;
        }

        .lg {
            width: 100%;
        }
    }
}
</style>