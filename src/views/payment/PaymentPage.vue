<template>
  <BaseLayout :title="title">
    <PaymentComponent></PaymentComponent>
    <v-row>
      <v-card
        variant="outlined">
        <v-row>
          <v-col cols="12">
            사용자 정보
          </v-col>
        </v-row>
        {{ userInfo }}
      </v-card>
    </v-row>
    <v-row>
      <v-card
        variant="outlined"
      >
        <v-col cols="12">
          <v-row>
            장소 정보
          </v-row>
          <v-row>
            {{ roomInfo }}
          </v-row>
          <v-row class="h-50">
            <v-col cols="6">
              <Datepicker
                v-model="picked.date"
                inputFormat="yyyy-MM-dd"
                class="bg-white ml-5 mr-5"

              />
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
    </v-row>
    <v-row>
      <v-card
        variant="outlined">
        <v-col cols="12">
          판매 상품 목록
          <v-row v-for="productInfo in productInfos" :key="productInfos.cpNo">
            {{ productInfo }}
          </v-row>
        </v-col>
      </v-card>
    </v-row>
    <v-row>
      <v-card>
        <v-row>
          <v-col cols="12">
            <v-btn @click="handleClickPaymentButton">{{ paymentReadyDTO.total_amount }} 원 결제하기</v-btn>
          </v-col>
        </v-row>
        <v-btn @click="handleClickPaymentApproveButton">
          임시 결제 승인 버튼
        </v-btn>
      </v-card>
    </v-row>
    <v-row>
      <v-text-field :v-model="paymentApproveDTO.pg_token"/>
    </v-row>


    <input id="pgToken" :value="paymentApproveDTO.pg_token">
    {{ paymentApproveDTO.pg_token }}
    {{ paymentApproveDTO }}
  </BaseLayout>
</template>
<script setup>
import PaymentComponent from "@/components/payment/PaymentComponent.vue";
import BaseLayout from "@/layouts/BaseLayout.vue";
import Datepicker from 'vue3-datepicker';


import {useRoute, useRouter} from "vue-router";
import {ref} from "vue";
import axios from "axios";

const route = useRoute();
const router = useRouter();

const title = ref('주문')


const picked = ref({date: new Date(), time: null})
const ableReservation = ref([
  {code: '1', title: '09:00 ~ 09:45'},
  {code: '2', title: '10:00 ~ 10:45'},
  {code: '3', title: '11:00 ~ 11:45'},
  {code: '4', title: '12:00 ~ 12:45'},
  {code: '5', title: '13:00 ~ 13:45'},
  {code: '6', title: '14:00 ~ 14:45'},
  {code: '7', title: '15:00 ~ 15:45'},
  {code: '8', title: '16:00 ~ 16:45'},
  {code: '9', title: '17:00 ~ 17:45'}
])

// 장바구니 아이디
const caNo = route.query.cano

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

// 상품 준비 요청에 필요한 DTO
const paymentReadyDTO = ref({
  cid: 'TC0ONETIME',
  partner_order_id: caNo,
  partner_user_id: userInfo.value.coNo,
  item_name: `${roomInfo.value.roName} 외 ${productInfos.value.length} 건`,
  quantity: 1,
  total_amount: 10000, // TODO 예약 가격 필요 ( 방 가격 컬럼 추가 필요 )
  tax_free_amount: 0,
  approval_url: 'http://localhost:3000/payment/success',
  cancel_url: 'http://localhost:3000/payment/cancel',
  fail_url: 'http://localhost:3000/payment/fail'
})

// 상품 승인 요청에 필요한 DTO
const paymentApproveDTO = ref({
  cid: 'TC0ONETIME',
  tid: null,
  partner_order_id: null,
  partner_user_id: null,
  pg_token: null
})

// 결제 하기 버튼
const handleClickPaymentButton = () => {
  requestPaymentReady(paymentReadyDTO)
}

// Kakao 서버에 결제 요청 전송
const requestPaymentReady = async (paymentReadyDTO) => {
  const paymentDTO = paymentReadyDTO.value
  let formData = new URLSearchParams();
  formData.append('cid', paymentDTO.cid);
  formData.append('partner_order_id', paymentDTO.partner_order_id);
  formData.append('partner_user_id', paymentDTO.partner_user_id);
  formData.append('item_name', paymentDTO.item_name);
  formData.append('quantity', paymentDTO.quantity);
  formData.append('total_amount', paymentDTO.total_amount);
  formData.append('tax_free_amount', paymentDTO.tax_free_amount);
  formData.append('approval_url', paymentDTO.approval_url);
  formData.append('cancel_url', paymentDTO.cancel_url);
  formData.append('fail_url', paymentDTO.fail_url);

  const res = await axios.post('https://kapi.kakao.com/v1/payment/ready', formData,
    {
      headers: {
        Authorization: 'KakaoAK 92049051ce44ee6c16f4b4ee1b061b2c'
      },
    })

  console.log(res)

  openWinPop(res.data.next_redirect_pc_url, 600, 800)

  paymentApproveDTO.value.tid = res.data.tid
  paymentApproveDTO.value.cid = paymentDTO.cid
  paymentApproveDTO.value.partner_order_id = paymentDTO.partner_order_id
  paymentApproveDTO.value.partner_user_id = paymentDTO.partner_user_id
  // paymentApproveDTO.value.pg_token = pg_token  // TODO 결제 완료 후 나온 토큰 이용해 pg_token 값 지정
}

// 결제 완료 버튼 // TODO 추후 리다이렉트 후 실행 되도록 변경
function handleClickPaymentApproveButton() {
  console.log('handleClickPaymentApproveButton')
  requestPaymentApprove(paymentApproveDTO)
}

// 결제 승인 요청 백엔드 서버에 요청
const requestPaymentApprove = async (paymentApproveDTO) => {
  const approveDTO = {};
  approveDTO.cid = paymentApproveDTO.cid
  approveDTO.tid = paymentApproveDTO.tid
  approveDTO.partner_order_id = paymentApproveDTO.partner_order_id
  approveDTO.partner_user_id = paymentApproveDTO.partner_user_id
  approveDTO.pg_token = paymentApproveDTO.pg_token

  const res = await axios.post('http://localhost:8080/api/payment/approve', approveDTO,
    {
      headers: {
        Authorization: 'KakaoAK 92049051ce44ee6c16f4b4ee1b061b2c'
      },
    })

  console.log(res)
}

const windowRef = ref({})
const isEmptyObject = (param) => {
  console.log(Object.keys(param).length)
  return Object.keys(param).length
  // return Object.keys(param).length === 0 && param.constructor === Object;
}

const openWinPop = async (uri, width, height) => {
  console.log(windowRef.value)
  console.log(!isEmptyObject(windowRef.value))
  if (!windowRef.value) {
    closeWinPop();
  }

  console.log(uri)
  let left = (screen.width) ? (screen.width - width) / 2 : 0;
  let top = (screen.height) ? (screen.height - height) / 2 : 0;

  let attr = 'top=' + top + ', left=' + left + ', width=' + width + ', height=' + height + ', resizable=no,status=no';

  // 1. 윈도우 팝업 띄우기
  // windowRef.value
  var test = window.open(uri, "", attr);
  test.onbeforeunload = function () {
    console.log('창 닫힘')
    alert("############")
  }
  // if (test != null) {
  //   windowRef.value.addEventListener('beforeunload', evtClose);
  // } else {
  //   alert("window.open fail!!!");
  // }

  // windowRef.value.

  // 2.  새로 띄운 윈도우 팝업창으로 부터 수신 메세지 이벤트 처리
  // window.addEventListener("message", recvEvtFromChild, false);
}

const evtClose = () => {
  if (windowRef.value) {
    windowRef.value.close();
    windowRef.value = null;
    // this.$emit('onClose');
  }
}

const closeWinPop = () => {
  console.log('closeWinPop')
  if (windowRef.value) {
    windowRef.value.close();
    windowRef.value = null;
  }
}

</script>

<style>

</style>
