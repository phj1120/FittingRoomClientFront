<template>
  <v-row>
    <template v-for="n in 4" :key="n">
      <v-col v-for="j in 6" :key="`${n}${j}`" cols="12" md="6">
        <v-card class="mx-auto">
          <v-img src="https://cdn.vuetifyjs.com/images/cards/sunshine.jpg" height="200px" cover></v-img>

          <v-card-title>
            Top western road trips
          </v-card-title>

          <v-card-subtitle>
            1,000 miles of wonder
          </v-card-subtitle>

          <v-card-actions>
            <v-btn color="orange-lighten-2" variant="text">
              입점 브랜드
            </v-btn>

            <v-spacer></v-spacer>

            <v-btn :icon="show ? 'mdi-chevron-up' : 'mdi-chevron-down'" @click="show = !show"></v-btn>
          </v-card-actions>

          <v-expand-transition>
            <div v-show="show">
              <v-divider></v-divider>

              <v-card-text>
                I'm a thing. But, like most politicians, he promised more than he could deliver. You won't have time for sleeping, soldier, not with all the bed making you'll be doing. Then we'll go with that data file! Hey, you add a one and two zeros to that or we walk! You're going to do his laundry? I've got to find a way to escape.
              </v-card-text>
            </div>
          </v-expand-transition>
        </v-card>
        <!--              <v-sheet height="300"></v-sheet>-->
      </v-col>
    </template>
  </v-row>
</template>

<script setup>
  import {ref} from "vue";


  const show = ref(false)

</script>

<style scoped>

</style>
