<template>
  <div class="text-center">
    <v-dialog v-model="dialog" width="auto">
      <v-card min-width="25vw" min-height="15vh">
        <v-card-text class="text-center mt-2">
          <slot name="dialogContent"></slot>
        </v-card-text>
        <v-row class="justify-center mt-5 mb-0 pb-5">
          <slot name="dialogBtn"></slot>
        </v-row>
      </v-card>
    </v-dialog>
  </div>
</template>

<script setup>
  import {ref} from "vue";


  const props = defineProps(['dialog'])
  const dialog = ref(props.dialog)
</script>

<style scoped>

</style>
