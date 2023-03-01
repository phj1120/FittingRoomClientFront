<template>
  <BaseLayout :title="title">
     <OrderDetailComponent :key="refreshKey" :orNo = "route.params.orNo" @handleMoveList = "handleMoveList" @handleClickRefreshKey="handleClickRefreshKey"></OrderDetailComponent>
  </BaseLayout>
</template>

<script setup>
import BaseLayout from "@/layouts/BaseLayout.vue";
import {ref} from "vue";
import OrderDetailComponent from "@/components/my/OrderDetailComponent.vue";
import {useRoute, useRouter} from "vue-router";


const title = ref('마이페이지')
const route = useRoute()
const router = useRouter()
const refreshKey = ref(0)


const handleMoveList = () => {
  router.push({name: 'OrderListPage'})
}

const handleClickRefreshKey = () => {
  refreshKey.value++
}

</script>

<style scoped>

</style>
