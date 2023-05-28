import {useCookies} from "vue3-cookies";

const {cookies} = useCookies()

export default {
    path: '/manage',
    name: 'manage',
    component: () => import('../views/ManageView.vue'),
    beforeEnter: (to, from, next) => {
        const tkn = cookies.get("token")
        if (tkn === null || tkn === undefined || tkn === "") {
            next("/login")
        } else {
            if (to.path === "/manage" || to.path === "/manage/") {
                next("/manage/console")
            } else {
                next()
            }
        }
    },
    children: [
        {
            path: 'console',
            name: 'console',
            component: () => import('../views/manage/ConsoleView.vue'),
            beforeEnter: (to, from, next) => {
                if (to.path === "/manage/console" || to.path === "/manage/console/") {
                    next("/manage/console/myself")
                } else {
                    next()
                }
            },
            children: [
                {
                    path: "aim",
                    name: 'aim',
                    component: () => import('../views/manage/AimView.vue'),
                },
                {
                    path: "myself",
                    name: 'myself',
                    component: () => import('../views/manage/SelfView.vue'),
                },
                {
                    path: "worker",
                    name: 'worker',
                    component: () => import('../views/manage/WorkerView.vue'),
                }, {
                    path: "dispatch",
                    name: 'dispatch',
                    component: () => import('../views/manage/DispatchView.vue'),
                }, {
                    path: "goods",
                    name: 'goods',
                    component: () => import('../views/manage/GoodsView.vue'),
                }, {
                    path: "admin/warehouse",
                    name: 'adminWarehouse',
                    component: () => import('../views/manage/AdminWarehouseView.vue'),
                }, {
                    path: "admin/users",
                    name: 'adminUsers',
                    component: () => import('../views/manage/AdminUsersView.vue'),
                }, {
                    path: "logs",
                    name: 'logs',
                    component: () => import('../views/manage/LogsView.vue'),
                }
            ]
        },
    ]
}