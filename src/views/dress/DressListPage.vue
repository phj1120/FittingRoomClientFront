<template>
  <BaseLayout :title="title">
    <ListComponent></ListComponent>
  </BaseLayout>
</template>

<script setup>
  import BaseLayout from "@/layouts/BaseLayout.vue";
  import {ref} from "vue";
  import ListComponent from "@/components/dress/ListComponent.vue";


  const title = ref('입어볼래?')
</script>
