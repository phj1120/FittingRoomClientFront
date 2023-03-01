<template>
  <v-bottom-navigation class="bg-blue-accent-1 text-white" @click="emits('handleBottomNav')" style="cursor: pointer">
    <div class="ma-auto font-weight-bold" style="font-size: 20px;">{{ props.bottom }}</div>
  </v-bottom-navigation>
</template>

<script setup>
const props = defineProps(['bottom'])
const emits = defineEmits(['handleBottomNav'])

</script>

<style scoped>

</style>
