<template>
  <BaseLayout :title="title">
    <ProductComponent :prNo="props.prNo" @handleClickCart="handleClickCart"></ProductComponent>
  </BaseLayout>
</template>

<script setup>
  import BaseLayout from "@/layouts/BaseLayout.vue";
  import {ref} from "vue";
  import {useRoute, useRouter} from "vue-router";
  import ProductComponent from "@/components/dress/ProductComponent.vue";


  const router = useRouter()
  const props = defineProps(['prNo'])
  const title = ref('입어볼래?')


  const handleClickCart = () => {
    router.push({ name: 'CartPage' })
  }
</script>
