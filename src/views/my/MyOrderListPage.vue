<template>
  <BaseLayout :title="title">
    <OrderListComponent></OrderListComponent>
    {{ paymentState}}
  </BaseLayout>
</template>

<script setup>
import BaseLayout from "@/layouts/BaseLayout.vue";
import {ref} from "vue";
import OrderListComponent from "@/components/my/OrderListComponent.vue";
import usePayment from "@/store/payment/usePayment";

const title = ref('마이페이지')

const {paymentState} = usePayment()
</script>

<style scoped>

</style>
