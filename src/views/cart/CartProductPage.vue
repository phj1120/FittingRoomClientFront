<template>
  <BaseLayout :title="title">
    <ProductComponent :caNo="caNo" @handleSummit="handleSummit"></ProductComponent>
    <BottomLayout :bottom="bottom" @handleBottomNav="handleBottomNav"></BottomLayout>
  </BaseLayout>
</template>

<script setup>
import BaseLayout from "@/layouts/BaseLayout.vue";
import {ref} from "vue";
import ProductComponent from "@/components/cart/ProductComponent.vue";
import {useRoute} from "vue-router";
import BottomLayout from "@/layouts/BottomLayout.vue";

const route = useRoute()
const title = ref('장바구니')
const bottom = ref('상품 입어보기')
const caNo = route.params.caNo

const handleBottomNav = () => {
  console.log("상품 입어보기")
}

const handleSummit = () => {

}

</script>

<style scoped>

</style>
