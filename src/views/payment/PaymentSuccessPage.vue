<template>
  <BaseLayout :title="title">
    <h1>Payment Success</h1>
    {{ route.query.pg_token }}
  </BaseLayout>
</template>

<script setup>
import {useRoute} from "vue-router";
import {onMounted, ref} from "vue";

const route = useRoute();
const title = ref('주문 완료')


const paymentApproveDTO = ref({
  'cid': null,
  'tid': null,
  'partner_order_id': null,
  'partner_user_id': null,
  'pg_token': route.query.pg_token,
})


// requestPaymentApprove()

onMounted(() => {
  // opener.document.location.href = "http://localhost:3000/payment?pg_token=" + route.query.pg_token
  opener.document.getElementById('pgToken').value = route.query.pg_token
  // window.opener.handleClickPaymentApproveButton()
  self.close()
})

</script>

<style scoped>

</style>
