<template>
  <v-row justify="center">
    <v-col cols="12" xl="8">
      <v-card min-height="82vh">
        <v-col class="pl-5 pt-2 pb-5 pr-10">
          <h2 class="mb-5 text-brown-lighten-1">구매자 정보</h2>
          <h3>{{ userInfo.coName }}</h3>
          <h5>{{ userInfo.coEmail }}</h5>
          <h5>{{ userInfo.coPhone }}</h5>
        </v-col>

        <v-divider class="ml-5 mr-5 my-2"/>

        <v-col class="pl-5 pt-2 pb-5 pr-10">
          <h2 class="mb-5 text-brown-lighten-1">피팅룸 정보</h2>
          <h3>{{ roomInfo.roName }}</h3>
          <h5>{{ roomInfo.roAddress }} {{ roomInfo.roDetailAddress }}</h5>
        </v-col>

        <v-divider class="ml-5 mr-5 my-2"/>

        <v-col class="pl-5 pt-2 pb-2">
          <h2 class="mb-5 text-brown-lighten-1">예약 일시</h2>
          <v-col cols="12" md="4" class="pl-0 pr-0">
            <h5 class="text-grey-darken-1 mb-2">예약 날짜</h5>
            <VueDatePicker v-model="picked.date" format="yyyy-MM-dd" auto-apply/>
          </v-col>
          <v-col cols="12" md="4" class="pl-0 pr-0" v-if="picked.date != null">
            <h5 class="text-grey-darken-1 mb-2">예약 시간</h5>
            <v-select v-model="picked.time" :items="ableReservation" item-title="title" item-value="code" variant="outlined"></v-select>
          </v-col>
        </v-col>

        <v-divider class="ml-3 mr-3 my-4"/>

        <v-row class="ml-1 mr-1 mb-1">
          <v-col cols="12" md="6" v-for="productInfo in productInfos" :key="productInfo.caNo">
            <v-row>
              <v-col cols="12" md="4">
                <v-img :src="getThumbnailImageUrl(productInfo.thumbnail)" style="height: 160px;"></v-img>
              </v-col>
              <v-col cols="12" md="8">
                <h4>상품명 : {{ productInfo.prName }}</h4>
                <h6>카테고리 : {{ productInfo.prcPathName || '입어볼래 대표상품' }} / 브랜드 : {{ productInfo.prBrand }}</h6>
                <v-divider class="my-2"></v-divider>
                <h4>선택옵션 : {{ productInfo.spSize }} / 가격 : {{ comma(productInfo.prPrice) }} 원</h4>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </v-card>
    </v-col>
  </v-row>
  <BottomLayout :bottom="bottom" @handleBottomNav="handleClickPaymentButton"></BottomLayout>
</template>


<script setup>
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'
import {onMounted, ref, watch} from "vue";
import {
  getAbleReservationTime,
  getPaymentDetail,
  requestPaymentApprove,
  requestPaymentReady
} from "@/apis/payment/paymentApis";
import useUtil from "@/store/common/useUtil";
import BottomLayout from "@/layouts/BottomLayout.vue";
import {comma} from "../../utils/util";

const {getThumbnailImageUrl} = useUtil()

const props = defineProps(['caNo'])
const emits = defineEmits(['moveOrderListPage'])

const bottom = ref('장소 예약 하기')
const picked = ref({date: null, time: null})

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

// 예약 가능한 타임
const ableReservation = ref([])

// 구매자 정보
const userInfo = ref({
  coNo: null,
  coName: null,
  coNickname: null,
  coGender: null,
  coBirth: null,
  coEmail: null,
  coPhone: null,
  coAddress: null,
  coDetailAddress: null,
  coStatus: null,
  coCreateDt: null,
  coModifyDt: null,
  coIsSignUp: null,
  coPostNumber: null
})

// 장소 정보
const roomInfo = ref({
  pmNo: null,
  roNo: null,
  seNo: null,
  pmStatus: null,
  seStatus: null,
  roName: null,
  roAddress: null,
  roDetailAddress: null,
  roPostCode: null
})

// 상품 정보
const productInfos = ref([{
    cpNo: null,
    cpCreateDt: null,
    cpStatus: null,
    caNo: null,
    spNo: null,
    prName: null,
    prBrand: null,
    spSize: null,
    prPrice: null,
    thumbnail: null
  }]
)

// 가격 정보
const payAmount = ref(0)

// 상품 준비 요청에 필요한 DTO
const paymentReadyDTO = ref({
  partner_order_id: null,
  partner_user_id: null,
  item_name: null,
  total_amount: null,
  cid: 'TC0ONETIME',
  quantity: 1,
  tax_free_amount: 0,
  // 'http://' + window.location.hostname + ( window.location.hostname.indexOf('armysseung.iptime.org') == -1 ? ':8080' : ':3258')
  approval_url: 'http://' + window.location.hostname + (window.location.hostname.indexOf('armysseung.iptime.org') == -1 ? ':3000' : ':3500') + '/payment/success',
  cancel_url: 'http://localhost:3000/payment/cancel',
  fail_url: 'http://localhost:3000/payment/fail'
})

// 상품 승인 요청에 필요한 DTO
const paymentApproveDTO = ref({
  tid: null,
  partner_order_id: null,
  partner_user_id: null,
  pg_token: null,
  cid: 'TC0ONETIME',
  re_dt: null,
  re_time: null
})

// 페이지에 필요한 정보 가져오기
const getPaymentInfo = async () => {
  const res = await getPaymentDetail(props.caNo)

  userInfo.value.coNo = res.data.coNo
  userInfo.value.coName = res.data.coName
  userInfo.value.coNickname = res.data.coNickname
  userInfo.value.coGender = res.data.coGender
  userInfo.value.coBirth = res.data.coBirth
  userInfo.value.coEmail = res.data.coEmail
  userInfo.value.coPhone = res.data.coPhone

  roomInfo.value.roNo = res.data.roNo
  roomInfo.value.roName = res.data.roName
  roomInfo.value.roAddress = res.data.roAddress
  roomInfo.value.roDetailAddress = res.data.roDetailAddress
  roomInfo.value.roPostCode = res.data.roPostCode

  productInfos.value = res.data.products.map((product) => {
    const productInfo = {}
    productInfo.prName = product.prName
    productInfo.prBrand = product.prBrand
    productInfo.spSize = product.spSize
    productInfo.prPrice = product.prPrice
    productInfo.thumbnail = product.thumbnail

    return productInfo
  })

  payAmount.value = res.data.payAmount
  bottom.value = payAmount.value + '원 결제 하기'
}

// 결제 하기 버튼
const handleClickPaymentButton = async () => {
  paymentReadyDTO.value.partner_order_id = props.caNo
  paymentReadyDTO.value.partner_user_id = userInfo.value.coNo
  paymentReadyDTO.value.item_name = `${roomInfo.value.roName} 외 ${productInfos.value.length} 건`
  paymentReadyDTO.value.total_amount = payAmount.value

  // 결제 요청
  const res = await requestPaymentReady(paymentReadyDTO)

  // 결제 아이디(tid) 저장
  paymentApproveDTO.value.tid = res.tid


  // 기존에 있는 결제 토큰 삭제
  localStorage.removeItem("pg_token")

  // 결제창 새 창으로 열기
  await openWinPop(res.next_redirect_pc_url, 600, 800)
}

const openWinPop = async (uri, width, height) => {
  let left = (screen.width) ? (screen.width - width) / 2 : 0;
  let top = (screen.height) ? (screen.height - height) / 2 : 0;
  let attr = 'top=' + top + ', left=' + left + ', width=' + width + ', height=' + height + ', resizable=no,status=no';

  window.open(uri, "", attr);
  const interval = setInterval(async () => {
    let pgToken = localStorage.getItem("pg_token")
    if (pgToken) {
      paymentApproveDTO.value.partner_order_id = paymentReadyDTO.value.partner_order_id
      paymentApproveDTO.value.partner_user_id = paymentReadyDTO.value.partner_user_id
      paymentApproveDTO.value.pg_token = pgToken

      paymentApproveDTO.value.re_dt = picked.value.date
      paymentApproveDTO.value.re_time = picked.value.time

      clearInterval(interval);
      try {
        const res = await requestPaymentApprove(paymentApproveDTO);
        console.log(res)
        emits('moveOrderListPage')
      } catch (err) {
        console.log(err)
      } finally {
        localStorage.removeItem("pg_token")
      }
    }
  }, 1000)
}

// 예약 가능한 날짜 지정
watch(() => picked.value.date,
  async () => {
    const res = await getAbleReservationTime(roomInfo.value.roNo, picked.value.date)
    ableReservation.value = reservationTime.value.filter((time) => {
      return res.data.includes(time.code)
    })
  }
)

onMounted(() => {
  getPaymentInfo()
})

</script>

<style scoped>

</style>
