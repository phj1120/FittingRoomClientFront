<template>
  <BaseLayout :title="title">
    <UpdateComponent :inNo="inNo"></UpdateComponent>
  </BaseLayout>
</template>

<script setup>
import {ref} from "vue";
import BaseLayout from "@/layouts/BaseLayout.vue";
import {useRoute} from "vue-router";
import UpdateComponent from "@/components/inquiry/UpdateComponent.vue";

const route = useRoute()
const title = ref('Q&A')
const inNo = route.params.inNo


</script>

<style scoped>

</style>
