<template>
  <BaseLayout :title="title">
    <ListComponent :key="refreshKey" :paging="paging" @handleMoreViewBtn="handleMoreViewBtn"
                   @handleRefreshKey="handleRefreshKey" @handleMoveDetail="handleMoveDetail"></ListComponent>
  </BaseLayout>
</template>

<script setup>
import BaseLayout from "@/layouts/BaseLayout.vue";
import {ref} from "vue";
import ListComponent from "@/components/inquiry/ListComponent.vue";
import router from "@/router";

const title = ref('Q&A')
const paging = ref({
  // coNo: route.query.coNo,
  coNo: 1,
  page: 1,
  size: 10,
})
const refreshKey = ref(0)

/**
 * 상세 페이지 이동
 **/
const handleMoveDetail = (inNo) => {
  router.push({name: 'InquiryDetailPage', params: {inNo: inNo}, query: inNo})
}

/**
 * 더 보기 클릭
 **/
const handleMoreViewBtn = () => {
  paging.value.size += 10
}

/**
 * refreshKey
 **/
const handleRefreshKey = () => {
  refreshKey.value++
}

</script>
