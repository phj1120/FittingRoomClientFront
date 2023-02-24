<template>
  <BaseLayout :title="title">
   <OrderDetailComponent :orNo = "route.params.orNo"></OrderDetailComponent>
  </BaseLayout>
</template>

<script setup>
import BaseLayout from "@/layouts/BaseLayout.vue";
import {ref} from "vue";
import OrderDetailComponent from "@/components/my/OrderDetailComponent.vue";
import {useRoute} from "vue-router";



const title = ref('마이페이지')

const route = useRoute()


</script>

<style scoped>

</style>
