import HomeView from "@/views/HomeView.vue";

export default {
    path: '/',
    name: 'home',
    component: HomeView,
    beforeEnter: (to, from, next) => {
        if (to.path === "/") {
            next("/home")
        } else {
            next()
        }
    },
    children: [
        {
            path: 'product',
            name: 'product',
            component: () => import('../views/home/ProductView.vue'),
        },
        {
            path: 'home',
            name: 'home',
            component: () => import('../views/home/MHome.vue'),
        },
        {
            path: 'about',
            name: 'about',
            component: () => import('../views/home/AboutView.vue'),
        },
    ]
}