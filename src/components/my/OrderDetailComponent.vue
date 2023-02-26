<template>
 <v-row>
    <v-col  cols="12" md="12">
      <v-card
        class="mx-auto"
      >
        <v-row justify="center">
          <v-col>
          <v-card-title>{{itemList.roName}}</v-card-title>
          </v-col>
        <v-col >
          <div>예약일</div>
          <p> {{itemList.reDt}}</p>
          <p> {{itemList.reTime}}</p>
      </v-col>
        </v-row>
        <v-divider></v-divider>
        <v-card-item>
          <v-row>

            <v-col>
              <p>주소 : {{itemList.roAddress +' '+ itemList.roDetailAddress}} </p>
              <p>장소대여료 : {{itemList.rePrice}}</p>
            </v-col>
          </v-row>
        </v-card-item>

        <v-table
          class="ml-2 mr-2 mb-2"
        >
          <thead>
          <tr>
            <th class="text-center font-weight-bold">
              상품명
            </th>
            <th class="text-center font-weight-bold">
              가격
            </th>
            <th class="text-center font-weight-bold">
              상태
            </th>
          </tr>
          </thead>
          <tbody>
          <tr
            v-for="(item,index) in cartItemList"
            :key="index"
          >
            <td class="text-center">{{ item.prName }}</td>
            <td class="text-center">{{ item.prPrice }}</td>
            <td class="text-center" v-if="item.cpStatus">거절</td>
            <td class="text-center" v-if="!item.cpStatus">승인</td>
          </tr>
          </tbody>
        </v-table>
        <v-row justify="center">
          <v-col  v-if="itemList.orStatus=='대기'" cols="1" class="mx-1">
            <v-btn @click="reservationCheckBtn">예약확인</v-btn>
          </v-col>
          <v-col cols="1" class="mx-1">
            <v-btn @click="reservationCancleBtn">예약취소</v-btn>
          </v-col>
          <v-col cols="1" class="mx-1">
          <v-btn @click="emits('handleMoveList')">목록보기</v-btn>
        </v-col>

        </v-row>
      </v-card>

    </v-col>

  </v-row>

</template>

<script setup>
import {onMounted, ref} from "vue";
import {
  getReservaiontDetailApi,
  modifyReservationCancleApi,
  modifyReservationCheckApi
} from "@/apis/reservation/reservationApis";
import {getReservationItemListApi} from "@/apis/cart/cartApis";
import {it} from "vuetify/locale";

const props = defineProps(['orNo'])
const emits = defineEmits(['handleMoveList'])

const itemList = ref({})
const cartItemList = ref({})
const noList = ref({caNo : 0,orNo :0 , reNo:0})
const getReservationData = async ()=>{
  itemList.value = await getReservaiontDetailApi(props.orNo)
  console.log(itemList.value.orStatus)
  noList.value.caNo = itemList.value.caNo
  noList.value.reNo = itemList.value.reNo
  await getItemList(itemList.value.caNo)

}
const getItemList = async (caNo) =>{
  cartItemList.value = await getReservationItemListApi(caNo)
}

const reservationCheckBtn = async () =>{
   await modifyReservationCheckApi(noList.value)
  emits('handleMoveList')
}
const reservationCancleBtn = async () =>{
  await modifyReservationCancleApi(noList.value)
  emits('handleMoveList')
}
onMounted(()=>{
  getReservationData()
  noList.value.orNo = props.orNo

})
</script>

<style scoped>

</style>
