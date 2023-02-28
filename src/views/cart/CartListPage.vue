<template>
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <BaseLayout :title="title">
    <ListComponent :key="refreshKey" @handleMoveCart="handleMoveCart"
                   @handleRefreshKey="handleRefreshKey"></ListComponent>
    <BottomLayout :bottom="bottom" @handleBottomNav="handleBottomNav"></BottomLayout>
  </BaseLayout>
</template>

<script setup>
import BaseLayout from "@/layouts/BaseLayout.vue";
import ListComponent from "@/components/cart/ListComponent.vue";
import {ref} from "vue";
import {useRouter} from "vue-router";
import BottomLayout from "@/layouts/BottomLayout.vue";

const router = useRouter()

const title = ref('장바구니')
const bottom = ref('상품 구경하기')
const refreshKey = ref(0)

/**
 * 장바구니 상품 조회로 이동
 **/
const handleMoveCart = (caNo) => {
  router.push({name: 'CartProductPage', params: {caNo: caNo}, query: caNo})
}

/**
 * 하단 바 클릭 이벤트
 **/
const handleBottomNav = () => {
  router.push({name: 'DressListPage'})
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
