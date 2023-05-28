import HomeView from "@/views/HomeView.vue";

export default {
    path: '/',
    name: 'home',
    component: HomeView,
    children: [
        {
            path: 'product',
            name: 'product',
            component: () => import('../views/home/ProductView.vue'),
        },
        {
            path: 'about',
            name: 'about',
            component: () => import('../views/home/AboutView.vue'),
        },
    ]
}