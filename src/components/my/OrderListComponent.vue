<template>
  <v-row>
      <v-col v-for="(list,index) in reservationList" :key="list.reNo" cols="12" md="6">
        <v-card
          class="mx-auto"
        >
          <v-card-item>
            <v-row>
              <v-col>
                <v-card-text :v-text="list.orStatus"></v-card-text>

                <v-img  src="https://cdn.vuetifyjs.com/images/cards/docks.jpg" height="180px" cover></v-img>
              </v-col>
              <v-col>
                <div class="text-overline mb-1">
                  <div class="text-caption">Greyhound divisely hello coldly fonwderfully</div>
                </div>
              </v-col>
            </v-row>
          </v-card-item>

          <v-card-actions>
            <v-btn variant="outlined">
              Button
            </v-btn>
          </v-card-actions>
        </v-card>
        <!--              <v-sheet height="300"></v-sheet>-->
      </v-col>
  </v-row>
</template>

<script setup>

import {onMounted, ref} from "vue";
import {getReservaiontListApi} from "@/apis/reservation/reservationApis";
const reservationList = ref()
const getReservaiontList= async () =>{
  const data = await getReservaiontListApi()
  reservationList.value = data
}
onMounted(()=>{
  getReservaiontList()
})
</script>

<style scoped>

</style>
