<template>
  <BaseLayout :title="title">
    <ListComponent></ListComponent>
  </BaseLayout>
</template>

<script setup>
  import BaseLayout from "@/layouts/BaseLayout.vue";
  import ListComponent from "@/components/cart/ListComponent.vue";
  import {ref} from "vue";


  const title = ref('장바구니')
</script>

<style scoped>

</style>
