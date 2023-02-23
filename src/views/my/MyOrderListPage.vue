<template>
  <BaseLayout :title="title">
    <OrderListComponent></OrderListComponent>
  </BaseLayout>
</template>

<script setup>
import BaseLayout from "@/layouts/BaseLayout.vue";
import {ref} from "vue";
import OrderListComponent from "@/components/my/OrderListComponent.vue";

const title = ref('마이페이지')

</script>

<style scoped>

</style>
