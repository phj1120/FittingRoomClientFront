<template>
  <BaseLayout :title="title">
    <OrderDetailComponent :listData="pinia.listData"></OrderDetailComponent>
  </BaseLayout>
</template>

<script setup>
import BaseLayout from "@/layouts/BaseLayout.vue";
import {ref} from "vue";
import OrderDetailComponent from "@/components/my/OrderDetailComponent.vue";
import {useRoute} from "vue-router";
import useUtil from "@/store/common/useUtil";


const title = ref('마이페이지')
const route = useRoute()
const pinia = useUtil()
console.log(pinia.listData)
</script>

<style scoped>

</style>
