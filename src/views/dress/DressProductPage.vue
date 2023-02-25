<template>
  <BaseLayout :title="title">
    <ProductComponent :prNo="props.prNo"></ProductComponent>
  </BaseLayout>
</template>

<script setup>
  import BaseLayout from "@/layouts/BaseLayout.vue";
  import {ref} from "vue";
  import {useRoute, useRouter} from "vue-router";
  import ProductComponent from "@/components/dress/ProductComponent.vue";


  const route = useRoute()
  const router = useRouter()
  const props = defineProps(['prNo'])
  const title = ref('입어볼래?')



</script>
