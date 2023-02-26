<template>
  <BaseLayout :title="title">
    <RegisterComponent :code="route.query.code"
                       @moveHomePage="moveHomePage"></RegisterComponent>
  </BaseLayout>

</template>

<script setup>
import {useRoute, useRouter} from "vue-router";
import {ref} from "vue";
import BaseLayout from "@/layouts/BaseLayout.vue";
import RegisterComponent from "@/components/common/RegisterComponent.vue";

const route = useRoute()
const router = useRouter()
const title = ref('입어볼래?')

const moveHomePage = () => {
  router.push({name: 'HomePage'})
}


</script>

<style scoped>

</style>
