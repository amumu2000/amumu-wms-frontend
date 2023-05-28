import {useCookies} from "vue3-cookies";

const {cookies} = useCookies()
export default {
    path: '/login',
    name: 'login',
    component: () => import('../views/LoginView.vue'),
    // 自动登录(放行)
    beforeEnter: (to, from, next) => {
        const tkn = cookies.get("token")
        if (tkn === null) {
            next()
        } else {
            next("/manage/console")
        }
    },
}