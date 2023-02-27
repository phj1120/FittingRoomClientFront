<template>
  <v-progress-circular
    :size="50"
    color="brown"
    indeterminate
  ></v-progress-circular>
</template>

<script setup>
import {useRoute} from "vue-router";
import {onMounted} from "vue";

const route = useRoute();


onMounted(() => {
  // 결제 아이디 저장
  localStorage.setItem("pg_token", route.query.pg_token)

  self.close()
})
</script>

<style scoped>

</style>
