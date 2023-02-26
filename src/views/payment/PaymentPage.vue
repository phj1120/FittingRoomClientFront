<template>
  <BaseLayout :title="title">
    <PaymentComponent :caNo="caNo"
                      @moveOrderListPage="moveOrderListPage"
    ></PaymentComponent>
  </BaseLayout>
</template>
<script setup>
import '@vuepic/vue-datepicker/dist/main.css'
import PaymentComponent from "@/components/payment/PaymentComponent.vue";
import BaseLayout from "@/layouts/BaseLayout.vue";
import {useRoute, useRouter} from "vue-router";
import {ref} from "vue";

const route = useRoute();
const router = useRouter();

const title = ref('주문')

// 장바구니 아이디
const caNo = route.query.cano

const moveOrderListPage = async () => {
  await router.push({name: 'OrderListPage'})
}

</script>

<style>

</style>
