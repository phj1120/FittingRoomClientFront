<template>
  <BaseLayout :title="title">
    <ListComponent @handleClickRouter="handleClickRouter" @handleClickDetail="handleClickDetail"></ListComponent>
  </BaseLayout>
</template>

<script setup>
  import BaseLayout from "@/layouts/BaseLayout.vue";
  import {ref} from "vue";
  import ListComponent from "@/components/dress/ListComponent.vue";
  import {useRoute, useRouter} from "vue-router";


  const route = useRoute()
  const router = useRouter()
  const title = ref('입어볼래?')
  const pageInfo = ref({ page: route.query.page })


  const handleClickRouter = ( page ) => {
    pageInfo.value.page = page
    router.push({ name: 'DressListPage', query: pageInfo.value })
  }

  const handleClickDetail = ( pmNo ) => {
    router.push({ name: 'DressDetailPage', params: { pmNo: pmNo } })
  }


  router.beforeEach(( to, from, next ) => {
    pageInfo.value.page = to.query.page
    next()
  })
</script>
