<template>
 <v-row justify="center">
    <v-col cols="12" md="8">
      <v-card>
        <h1 class="ml-3 mt-2 mb-1 text-brown">예약정보</h1>
        <v-divider class="mx-3"></v-divider>
        <v-row>
          <v-col cols="12" md="7">
            <v-img class="ml-3 mr-3" :src="getThumbnailImageUrl(itemList.rfUuid)" style="height: 300px"></v-img>
          </v-col>
          <v-col cols="12" md="5">
            <h2 class="ml-3 mt-2 mb-1 text-brown">예약일</h2>
            <v-col cols="12">
              <h5 class="text-grey-darken-1 mb-2">예약 날짜</h5>
              <VueDatePicker v-model="picked.date" format="yyyy-MM-dd" auto-apply :readonly="!modifyDate" />
            </v-col>
            <v-col cols="12" class="pb-0">
              <h5 class="text-grey-darken-1 mb-2">예약 시간</h5>
              <v-select v-model="picked.time" :items="ableReservation" item-title="title" item-value="code" :readonly="!modifyDate" variant="outlined"></v-select>
            </v-col>
            <v-col cols="12" class="pt-0">
              <v-btn v-if="itemList.orStatus!=='예약취소' && !modifyDate" class="w-100" color="success" @click="modifyBtn">일정 수정하기</v-btn>
              <v-btn v-if="itemList.orStatus!=='예약취소' && modifyDate" class="w-100" color="success" @click="modifyRedt">변경 저장</v-btn>
              <v-btn v-if="itemList.orStatus!=='예약취소' && modifyDate" class="w-100" color="success" @click="modifyBtn">취소</v-btn>
            </v-col>
          </v-col>
        </v-row>

        <v-divider></v-divider>

        <v-card-item>
          <v-row>
            <v-col>
              <h3 class="mt-1 text-brown">예약지점 : {{itemList.roName}}</h3>
              <h5 class="mt-5">주소 : {{itemList.roAddress +' '+ itemList.roDetailAddress}} </h5>
              <h5 class="mt-1">장소대여료 : {{ comma(itemList.rePrice) }} 원</h5>
            </v-col>
          </v-row>
        </v-card-item>

        <v-divider class="my-2 mx-2"></v-divider>

        <v-col cols="10" class="margin-center">
          <v-table class="border">
            <thead>
              <tr class="bg-yellow-accent-1">
                <th class="text-center font-weight-bold">상품명</th>
                <th class="text-center font-weight-bold">가격</th>
                <th class="text-center font-weight-bold">상태</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in cartItemList" :key="item.prName">
                <td class="text-center text-body-2 w-50">{{ item.prName }}</td>
                <td class="text-center text-body-2 w-25">{{ comma(item.prPrice) }} 원</td>
                <td class="text-center text-body-2 w-25">{{ item.cpStatus == false ? '승인' : '거절' }}</td>
              </tr>
            </tbody>
          </v-table>
        </v-col>
        <v-row class="mt-2 mb-5" justify="center">
          <v-btn class="w-25 ma-2" v-if="itemList.orStatus == '대기'" @click="reservationCheckBtn">예약확인</v-btn>
          <v-btn class="w-25 ma-2" color="error" v-if="itemList.orStatus!=='예약취소'" @click="reservationCancleBtn">예약취소</v-btn>
          <v-btn class="w-25 ma-2" color="success" @click="emits('handleMoveList')">목록보기</v-btn>
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
  import {comma} from "../../utils/util";


  const props = defineProps(['orNo'])
  const emits = defineEmits(['handleMoveList'])
  const { getThumbnailImageUrl } = useUtil()

  const itemList = ref({})
  const cartItemList = ref({})
  const noList = ref({caNo : 0,orNo :0 , reNo:0})
  const picked = ref({date: null, time: null})
  const modifyData = ref({reNo:0, reDt: null, reTime: null})
  const modifyDate = ref(false)
  const customPosition = () => ({top: 0, left: 0})
  const {convertDate} = useUtil()


  const modifyBtn = () =>{
    modifyDate.value = !modifyDate.value
  }

  const modifyRedt = async () =>{
    modifyData.value.reDt =picked.value.date
    modifyData.value.reTime = picked.value.time

    await modifyReservationReDt(modifyData.value)
    modifyBtn()
  }

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
    noList.value.caNo = itemList.value.caNo
    modifyData.value.reNo  = noList.value.reNo = itemList.value.reNo

    picked.value.date = itemList.value.reDt
    picked.value.time= reservationTime.value[itemList.value.reTime-1]
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


  // 예약 가능한 날짜 지정
  watch(() => picked.value.date,
    async () => {
      const res = await getAbleReservationTime(itemList.value.roNo, picked.value.date)
      ableReservation.value = reservationTime.value.filter((time) => {
        return res.data.includes(time.code)
      })
    }

  )

  onMounted(()=>{
    getReservationData()
    noList.value.orNo = props.orNo

  })
</script>

<style scoped>
  .margin-center {
    margin: 0 auto;
  }
</style>
