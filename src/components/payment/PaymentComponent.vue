<template>
  <v-row>
    <v-col cols="12">
      <v-card>
        <v-col cols="12">
          <v-row>
            <v-col>
              {{ userInfo.coName }}
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              {{ userInfo.coEmail }}
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              {{ userInfo.coPhone }}
            </v-col>
          </v-row>
        </v-col>
      </v-card>
    </v-col>
  </v-row>

  <v-row>
    <v-col cols="12">
      <v-card>
        <v-col cols="12">
          <v-row>
            <v-col>
              {{ roomInfo.roName }}
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              {{ roomInfo.roAddress }}
              {{ roomInfo.roDetailAddress }}
              {{ picked }}
            </v-col>
          </v-row>

          <v-row>
            <v-col cols="6">
              <VueDatePicker
                teleport-center
                :alt-position="customPosition"
                v-model="picked.date" format="yyyy-MM-dd"
                auto-apply/>

            </v-col>
            <v-col cols="6">
              <v-select
                v-model="picked.time"
                label="Select"
                :items="ableReservation"
                item-title="title"
                item-value="code"
              ></v-select>
            </v-col>
          </v-row>
        </v-col>
      </v-card>
    </v-col>
  </v-row>

  <v-row>
    <v-col cols="12">
      <v-card>
        <v-col cols="12">
          <v-row v-for="productInfo in productInfos" :key="productInfo.caNo">
            {{ productInfo }}
            <v-row>
              <v-col>
                {{ productInfo.prName }}
              </v-col>
            </v-row>
            <v-row>
              <v-col>
                {{ productInfo.coEmail }}
              </v-col>
            </v-row>
            <v-row>
              <v-col>
                {{ productInfo.coPhone }}
              </v-col>
            </v-row>
          </v-row>
        </v-col>
      </v-card>
    </v-col>
  </v-row>

  <v-row>
    <v-col>
      <v-card>
        <v-row>
          <v-col cols="12">
            <v-btn @click="handleClickPaymentButton">{{ payAmount }} 원 결제하기</v-btn>
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
  getAbleReservationTime,
  getPaymentDetail,
  requestPaymentApprove,
  requestPaymentReady
} from "@/apis/payment/paymentApis";

const props = defineProps(['caNo'])
const emits = defineEmits(['moveOrderListPage'])
const picked = ref({date: null, time: null})
const customPosition = () => ({top: 0, left: 0})

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
  approval_url: 'http://' + window.location.hostname + ( window.location.hostname.indexOf('armysseung.iptime.org') == -1 ? ':3000' : ':3500') + '/payment/success',
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

  console.log('handleClickPaymentButton')
  console.log(res)

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
