import homeRouter from "@/router/homeRouter";
import loginRouter from "@/router/loginRouter";
import manageRouter from "@/router/manageRouter";
import {createRouter, createWebHistory} from "vue-router";
// 创建路由组
let routes = [
    homeRouter,
    loginRouter,
    manageRouter,
    {
        path: '/:pathMatch(.*)',
        component: () => import('../views/NotFoundView.vue')
    }
]
// 创建路由对象
const router = createRouter({
    history: createWebHistory(),
    routes
})
// 输出路由切换
router.beforeEach((to, from, next) => {
    console.log(to.path, "<=", from.path)
    next()
})

export default router