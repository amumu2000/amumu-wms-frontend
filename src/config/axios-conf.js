import axios from "axios";
import {ElMessage} from "element-plus";
import {useCookies} from "vue3-cookies";

const {cookies} = useCookies()

axios.defaults.baseURL = 'http://192.168.4.125:3001/api/v1';
// axios.defaults.baseURL = 'http://rest.apizza.net/mock/6b6b5ab057f667b36d343d421a479224/api/v1';
axios.defaults.timeout = 5000;
axios.interceptors.request.use(
    config => {
        // 非登录页面，请求注入Token
        if (config.url !== "/users/login") {
            config.data.token = cookies.get("token")
        }
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);
axios.interceptors.response.use(
    response => {
        // Http状态码非200服务器发生非预期错误
        if (response.status !== 200) {
            ElMessage.error({
                message: "服务器错误"
            })
            return Promise.reject(response);
        } else {
            // 自定义状态码非200发生预期错误
            if (response.data.code !== 200) {
                ElMessage.error({
                    message: response.data.message
                })
            }
            // Token失效处理
            if (response.data.code === 401) {
                cookies.remove("token")
            }
            if (response.data.code === 200) {
                console.log(response.data.data)
            }
            return Promise.resolve(response.data.data);
        }
    },
    error => {
        return Promise.reject(error);
    }
)