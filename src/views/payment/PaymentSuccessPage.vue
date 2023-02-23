<template>
  <BaseLayout :title="title">
  </BaseLayout>
</template>

<script setup>
import {useRoute} from "vue-router";
import {onMounted, ref} from "vue";

const route = useRoute();
const title = ref('주문 완료')

onMounted(() => {
  // 결제 아이디 저장
  localStorage.setItem("pg_token", route.query.pg_token)

  self.close()
})
</script>

<style scoped>

</style>
