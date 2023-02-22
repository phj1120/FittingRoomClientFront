<template>
  <h1>Payment Success</h1>
  {{ route.query.pg_token }}

</template>

<script setup>
import {useRoute} from "vue-router";
import axios from "axios";
import {ref} from "vue";

const route = useRoute();


const paymentApproveDTO = ref({
  'cid': null,
  'tid': null,
  'partner_order_id': null,
  'partner_user_id': null,
  'pg_token': route.query.pg_token,
})



// requestPaymentApprove()

</script>

<style scoped>

</style>
