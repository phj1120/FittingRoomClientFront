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
  import useUtil from "@/store/common/useUtil";


  const title = ref('마이페이지')
  const pinia = useUtil()
  const handleMoveDetail = (list) => {
    pinia.reservationDetailData(list)
    router.push({name: 'OrderDetailPage'})
  }
</script>

<style scoped>

</style>
