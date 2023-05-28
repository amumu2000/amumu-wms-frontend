<script setup>
import AIcons from "@/components/AIcons.vue";

const props = defineProps(["route", "name", "icon"])
</script>
<template>
    <el-menu-item :index='props.route'>
        <AIcons :type="icon"></AIcons>
        <span>{{ name }}</span>
    </el-menu-item>
</template>

<style scoped>

</style>