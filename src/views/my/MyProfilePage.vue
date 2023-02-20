<template>
  <BaseLayout :title="title">
    <ProfileComponent></ProfileComponent>
  </BaseLayout>
</template>

<script setup>
  import ProfileComponent from "@/components/my/ProfileComponent.vue";
  import BaseLayout from "@/layouts/BaseLayout.vue";
  import {ref} from "vue";


  const title = ref('마이페이지')
</script>

<style scoped>

</style>
