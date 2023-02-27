<template>
  <BaseLayout :title="title">
    <AddComponent :inNo="inNo" @handleMoveListPage="handleMoveListPage"></AddComponent>
  </BaseLayout>
</template>

<script setup>
import {ref} from "vue";
import BaseLayout from "@/layouts/BaseLayout.vue";
import {useRoute, useRouter} from "vue-router";
import AddComponent from "@/components/inquiry/AddComponent.vue";

const route = useRoute()
const router = useRouter()
const title = ref('Q&A')
const inNo = route.params.inNo

/**
 * Q&A 리스트 페이지로 이동
 **/
const handleMoveListPage = () => {
  router.push({name: 'InquiryListPage'})
}

</script>

<style scoped>

</style>
