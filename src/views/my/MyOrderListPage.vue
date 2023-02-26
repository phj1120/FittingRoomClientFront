<template>
  <BaseLayout :title="title">
    <OrderListComponent @handleMoveDetail="handleMoveDetail"></OrderListComponent>
  </BaseLayout>
</template>

<script setup>
  import BaseLayout from "@/layouts/BaseLayout.vue";
  import {ref} from "vue";
  import OrderListComponent from "@/components/my/OrderListComponent.vue";
  import router from "@/router";

  const title = ref('마이페이지')

  const handleMoveDetail = (orNo) => {
    router.push({name: 'OrderDetailPage',params: {orNo : orNo}})
  }
</script>

<style scoped>

</style>
