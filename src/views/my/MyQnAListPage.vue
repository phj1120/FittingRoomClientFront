<template>
  <BaseLayout :title="title">
    <QnAListComponent></QnAListComponent>
  </BaseLayout>
</template>

<script setup>
  import BaseLayout from "@/layouts/BaseLayout.vue";
  import {ref} from "vue";
  import QnAListComponent from "@/components/my/QnAListComponent.vue";


  const title = ref('마이페이지')
</script>

<style scoped>

</style>
