<script setup>
import RouteItem from "@/components/RouteItem.vue";
import {onMounted, ref} from "vue";
import {useRoute} from "vue-router";
import AIcons from "@/components/AIcons.vue";
import {self} from "@/api"
import {checkShowMenuItem, checkShowMenu} from '@/utils'

const route = useRoute()
const activeIndex = ref(route.fullPath)
const role = ref()
const routeList = [
    {
        index: 1,
        icon: "HomeFilled",
        name: "主控舱段",
        child: [
            {
                routeIcon: "Aim",
                routePath: "/manage/console/aim",
                routeName: "观测枢"
            }, {
                routeIcon: "User",
                routePath: "/manage/console/myself",
                routeName: "我的信息"
            },
        ]
    }, {
        index: 2,
        icon: "Avatar",
        name: "我的工作",
        child: [
            {
                routeIcon: "Filter",
                routePath: "/manage/console/worker",
                routeName: "派遣核验"
            }
        ]
    }, {
        index: 3,
        icon: "IconMenu",
        name: "仓储管理",
        child: [
            {
                routeIcon: "Timer",
                routePath: "/manage/console/dispatch",
                routeName: "派遣管理"
            }, {
                routeIcon: "Goods",
                routePath: "/manage/console/goods",
                routeName: "货物管理"
            }, {
                routeIcon: "Operation",
                routePath: "/manage/console/admin/warehouse",
                routeName: "仓库管理"
            },
        ]
    }, {
        index: 4,
        icon: "Setting",
        name: "系统管理",
        child: [
            {
                routeIcon: "User",
                routePath: "/manage/console/admin/users",
                routeName: "用户管理"
            }, {
                routeIcon: "Open",
                routePath: "/manage/console/logs",
                routeName: "系统日志"
            },
        ]
    },
]

defineProps(["isCollapse", "asideWidth"])

onMounted(() => {
    self({}).then((res) => {
        role.value = res.user.role
    })
})


</script>

<template>
    <el-aside class="aside" :width="asideWidth">
        <el-scrollbar max-height="100%">
            <el-menu class="menu"
                     router
                     :collapse="isCollapse"
                     :default-active="activeIndex">
                <div class="logo" style="max-height: 64px;display: flex">
                    <img src="@/assets/logo.svg" alt="logo" style="max-height: 64px;">
                    <div v-if="!isCollapse" class="flex-grow-fill asideTitle">Amm WMS</div>
                </div>
                <template v-for="item in routeList">
                    <el-sub-menu v-if="checkShowMenu(item.name,role)" :index="item.index">
                        <template #title>
                            <AIcons :type="item.icon"></AIcons>
                            <span>{{ item.name }}</span>
                        </template>
                        <template v-for="it in item.child">
                            <RouteItem v-if="checkShowMenuItem(it.routePath,role)" :route="it.routePath"
                                       :name="it.routeName" :icon="it.routeIcon"></RouteItem>
                        </template>
                    </el-sub-menu>
                </template>
                <div style="border-bottom: 1px var(--el-menu-border-color) solid"></div>
            </el-menu>
        </el-scrollbar>
    </el-aside>
</template>

<style scoped>
.aside {
    transition-duration: 0.5s;
    height: 100vh;
    user-select: none;

    .menu {
        min-height: 100vh;
    }

    .asideTitle {
        font-size: 25px;
        text-align: center;
        line-height: 64px;
        overflow: hidden;
        white-space: nowrap;
        word-wrap: normal;
        word-break: keep-all;
    }
}
</style>