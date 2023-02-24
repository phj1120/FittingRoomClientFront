<template>
  <BaseLayout :title="title">
    <DetailComponent :inNo="inNo"></DetailComponent>
    <BottomLayout :bottom="bottom" @handleBottomNav="handleBottomNav"></BottomLayout>
  </BaseLayout>
</template>

<script setup>
import {ref} from "vue";
import DetailComponent from "@/components/inquiry/DetailComponent.vue";
import BaseLayout from "@/layouts/BaseLayout.vue";
import BottomLayout from "@/layouts/BottomLayout.vue";
import {useRoute, useRouter} from "vue-router";

const route = useRoute()
const router = useRouter()
const title = ref('Q&A')
const bottom = ref('수정')
const inNo = route.params.inNo

/**
 * 하단 바 클릭 이벤트
 **/
const handleBottomNav = () => {
  router.push({name: 'InquiryUpdatePage', params: {inNo: inNo}})
}

</script>

<style scoped>

</style>
