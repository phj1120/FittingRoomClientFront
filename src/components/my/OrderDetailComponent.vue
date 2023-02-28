<template>
 <v-row>
    <v-col  cols="12" md="12">
      <v-card
        class="mx-auto"
      >
        <v-row >
          <v-col>
          <v-card-title>{{itemList.roName}}</v-card-title>
          </v-col>
        <v-col >
          <div>예약일</div>
          <v-col cols="8">
            <VueDatePicker
              v-model="picked.date" format="yyyy-MM-dd"
              auto-apply
              :readonly="!modifyDate"
            />

          </v-col>
          <v-col cols="6">
            <v-select
              v-model="picked.time"
              label="예약시간설정"
              :items="ableReservation"
              item-title="title"
              item-value="code"
              :readonly="!modifyDate"
            ></v-select>
            <v-btn v-if="itemList.orStatus!=='예약취소' && !modifyDate" @click="modifyBtn">일정 수정하기</v-btn>
            <v-btn v-if="itemList.orStatus!=='예약취소' && modifyDate" @click="modifyRedt">변경 저장</v-btn>
            <v-btn v-if="itemList.orStatus!=='예약취소' && modifyDate" @click="modifyBtn">취소</v-btn>

          </v-col>
          <v-col  cols="6" class="mx-1">

          </v-col>
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

          <v-col v-if="itemList.orStatus!=='예약취소'" cols="1" class="mx-1">
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
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'
import {onMounted, ref, watch} from "vue";
import {
  getReservaiontDetailApi,
  modifyReservationCancleApi,
  modifyReservationCheckApi, modifyReservationReDt
} from "@/apis/reservation/reservationApis";
import {getReservationItemListApi} from "@/apis/cart/cartApis";
import {getAbleReservationTime} from "@/apis/payment/paymentApis";
import useUtil from "@/store/common/useUtil";
import {convertLocalDate} from "@/utils/util";

const props = defineProps(['orNo'])
const emits = defineEmits(['handleMoveList'])

const itemList = ref({})
const cartItemList = ref({})
const noList = ref({caNo : 0,orNo :0 , reNo:0})
const picked = ref({date: null, time: null})
const modifyData = ref({reNo:0, reDt: null, reTime: null})
const modifyDate = ref(false)

const modifyBtn = () =>{
  modifyDate.value = !modifyDate.value

}

const modifyRedt = async () =>{
  modifyData.value.reDt =picked.value.date
  modifyData.value.reTime = picked.value.time

  await modifyReservationReDt(modifyData.value)
  modifyBtn()
}

const customPosition = () => ({top: 0, left: 0})
const {convertDate} = useUtil()
// 전체 타임
const reservationTime = ref([
  {code: 1, title: '09:00 ~ 09:45'},
  {code: 2, title: '10:00 ~ 10:45'},
  {code: 3, title: '11:00 ~ 11:45'},
  {code: 4, title: '12:00 ~ 12:45'},
  {code: 5, title: '13:00 ~ 13:45'},
  {code: 6, title: '14:00 ~ 14:45'},
  {code: 7, title: '15:00 ~ 15:45'},
  {code: 8, title: '16:00 ~ 16:45'},
  {code: 9, title: '17:00 ~ 17:45'}
])
const ableReservation = ref([])
const getReservationData = async ()=>{
  itemList.value = await getReservaiontDetailApi(props.orNo)
  console.log(itemList.value.orStatus)
  noList.value.caNo = itemList.value.caNo
  modifyData.value.reNo  = noList.value.reNo = itemList.value.reNo

  picked.value.date = itemList.value.reDt
  picked.value.time= reservationTime.value[itemList.value.reTime-1]
  await getItemList(itemList.value.caNo)
}

// 예약 가능한 날짜 지정
watch(() => picked.value.date,
  async () => {
    const res = await getAbleReservationTime(itemList.value.roNo, picked.value.date)
    ableReservation.value = reservationTime.value.filter((time) => {
      return res.data.includes(time.code)
    })
  }

)

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
