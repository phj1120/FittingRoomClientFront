<template>
  <v-row>
    <v-col v-for="list in reservationList" :key="list.reNo" cols="12" md="6">
      <v-card>
        <v-card-title class="font-weight-bold text-brown">{{ list.orStatus }}</v-card-title >
        <v-card-item>
          <v-row>
            <v-col cols="12" md="6">
              <v-img  :src="getThumbnailImageUrl(list.rfUuid)" height="200px" cover></v-img>
            </v-col>
            <v-col cols="12" md="6">
              <h5>예약일 : {{list.reDt.split(' ')[0]}}</h5>
              <h5>장소명 : {{list.roName}}</h5>
              <br>
              <h5>주소 : {{list.roAddress +' '+ list.roDetailAddress}} </h5>
              <br>
              <br>
              <h4 class="mb-3">장소대여료 : {{ comma(list.rePrice) }} 원</h4>
              <v-btn class="w-100" color="primary" variant="outlined" @click="emits('handleMoveDetail',list.orNo)">예약상세보기</v-btn>
            </v-col>
          </v-row>
        </v-card-item>
      </v-card>
    </v-col>
  </v-row>
</template>

<script setup>
  import {onMounted, ref} from "vue";
  import {getReservaiontListApi} from "@/apis/reservation/reservationApis";
  import useUtil from "@/store/common/useUtil";
  import {comma} from "../../utils/util";
  const reservationList = ref()
  const emits = defineEmits(['handleMoveDetail'])


  const { getThumbnailImageUrl } = useUtil()

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
