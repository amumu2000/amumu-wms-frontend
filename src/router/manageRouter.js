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
                    path: "mv11",
                    name: 'mv11',
                    component: () => import('../views/manage/MenuView1_1.vue'),
                },
                {
                    path: "myself",
                    name: 'myself',
                    component: () => import('../views/manage/SelfView.vue'),
                },
                {
                    path: "mv21",
                    name: 'mv21',
                    component: () => import('../views/manage/MenuView2_1.vue'),
                },
                {
                    path: "mv22",
                    name: 'mv22',
                    component: () => import('../views/manage/MenuView2_2.vue'),
                }, {
                    path: "mv31",
                    name: 'mv31',
                    component: () => import('../views/manage/MenuView3_1.vue'),
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
                    path: "mv42",
                    name: 'mv42',
                    component: () => import('../views/manage/MenuView4_2.vue'),
                }, {
                    path: "mv43",
                    name: 'mv43',
                    component: () => import('../views/manage/AdminWarehouseView.vue'),
                },
            ]
        },
    ]
}