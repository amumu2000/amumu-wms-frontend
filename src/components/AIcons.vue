<script setup>
import {
    Aim,
    Avatar,
    Filter,
    Goods,
    Open,
    Setting,
    Timer,
    User,
    Menu as IconMenu,
    HomeFilled,
    Operation
} from "@element-plus/icons-vue";

defineProps(["type"])
</script>

<template>
    <el-icon>
        <Aim v-if="type===`Aim`"/>
        <Avatar v-else-if="type===`Avatar`"/>
        <Filter v-else-if="type===`Filter`"/>
        <Goods v-else-if="type===`Goods`"/>
        <Open v-else-if="type===`Open`"/>
        <Setting v-else-if="type===`Setting`"/>
        <Timer v-else-if="type===`Timer`"/>
        <User v-else-if="type===`User`"/>
        <IconMenu v-else-if="type===`IconMenu`"/>
        <HomeFilled v-else-if="type===`HomeFilled`"/>
        <Operation v-else-if="type===`Operation`"/>
    </el-icon>
</template>

<style scoped>

</style>