<template>
  <BaseLayout :title="title">
    <UpdateComponent :inNo="inNo" @handleMoveListPage="handleMoveListPage" @handleMoveDetailPage="handleMoveDetailPage"></UpdateComponent>
  </BaseLayout>
</template>

<script setup>
import {ref} from "vue";
import BaseLayout from "@/layouts/BaseLayout.vue";
import {useRoute, useRouter} from "vue-router";
import UpdateComponent from "@/components/inquiry/UpdateComponent.vue";

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

/**
 * Q&A 상세 페이지로 이동
 **/
const handleMoveDetailPage = () => {
  router.push({name: 'InquiryDetailPage', params: {inNo: inNo}})
}

</script>

<style scoped>

</style>
