<template>
  <BaseLayout :title="title">
    <LoginComponent></LoginComponent>
  </BaseLayout>
</template>

<script setup>
import LoginComponent from "@/components/common/LoginComponent.vue";
import {ref} from "vue";
import BaseLayout from "@/layouts/BaseLayout.vue";

const title = ref('입어볼래?')

</script>

<style scoped>

</style>
