<template>
  <BaseLayout :title="title">
    <ProductComponent :caNo="caNo" :key="refreshKey" @handleRefreshKey="handleRefreshKey" @handleMoveDetail="handleMoveDetail"></ProductComponent>
    <BottomLayout :bottom="bottom" @handleBottomNav="handleBottomNav"></BottomLayout>
  </BaseLayout>
</template>

<script setup>
import BaseLayout from "@/layouts/BaseLayout.vue";
import {ref} from "vue";
import ProductComponent from "@/components/cart/ProductComponent.vue";
import {useRoute, useRouter} from "vue-router";
import BottomLayout from "@/layouts/BottomLayout.vue";

const router = useRouter();
const route = useRoute()
const title = ref('장바구니')
const bottom = ref('상품 입어보기')
const refreshKey = ref(0)
const caNo = route.params.caNo

/**
 * 하단 바 클릭 이벤트
 **/
const handleBottomNav = () => {
  console.log(caNo)
  console.log("상품 입어보기")
  router.push({name: 'PaymentPage', query: {cano: caNo}})
}

/**
 * 상세 페이지로 이동
 **/
const handleMoveDetail = (prNo) => {
  router.push({name: 'DressProductPage', params: {prNo: prNo}})
}

/**
 * 새로고침키
 **/
const handleRefreshKey = () => {
  refreshKey.value++
}

</script>

<style scoped>

</style>
