<template>
  <BaseLayout :title="title">
    <DetailComponent :pmNo="props.pmNo" @handleClickProduct="handleClickProduct"></DetailComponent>
  </BaseLayout>
</template>

<script setup>
  import BaseLayout from "@/layouts/BaseLayout.vue";
  import {ref} from "vue";
  import {useRoute, useRouter} from "vue-router";
  import DetailComponent from "@/components/dress/DetailComponent.vue";


  const route = useRoute()
  const router = useRouter()
  const props = defineProps(['pmNo'])
  const title = ref('입어볼래?')


  const handleClickProduct = ( prNo ) => {
    router.push({ name: 'DressProductPage', params: { prNo: prNo } })
  }
</script>
