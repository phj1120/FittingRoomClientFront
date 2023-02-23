<template>
  <v-row>
      <v-col v-for="(list,index) in reservationList" :key="list.reNo" cols="12" md="6">
        <v-card
          class="mx-auto"
        >
          <v-card-title v-text="list.orStatus"></v-card-title>
          <v-card-item>
            <v-row>
              <v-col>
                <v-img  src="https://cdn.vuetifyjs.com/images/cards/docks.jpg" height="180px" cover></v-img>
              </v-col>
              <v-col>

                  <p>예약일 : {{list.reDt}}</p>
                  <p>장소명 : {{list.roName}}</p>
                <p>주소 : {{list.roAddress +' '+ list.roDetailAddress}} </p>
                <p>장소대여료 : {{list.rePrice}}</p>


                  <v-btn variant="outlined" @click="emits('handleMoveDetail',list)">
                    예약상세보기
                  </v-btn>

              </v-col>
            </v-row>
          </v-card-item>


        </v-card>
        <!--              <v-sheet height="300"></v-sheet>-->
      </v-col>
  </v-row>
</template>

<script setup>

import {onMounted, ref} from "vue";
import {getReservaiontListApi} from "@/apis/reservation/reservationApis";
const reservationList = ref()
const emits = defineEmits(['handleMoveDetail'])

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
