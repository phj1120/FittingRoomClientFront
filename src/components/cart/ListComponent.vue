<template>
  <v-row>
    <v-col cols="12" md="6" v-for="cart in cartListInfo" :key="cart.caNo">
      <v-card class="d-flex border-xl" @click="clickCart(cart.caNo)" @touchstart="touchStart"
              @touchend="touchEnd">
        <v-col cols="5">
          <v-img
            src="https://search.pstatic.net/common/?src=http%3A%2F%2Fshop1.phinf.naver.net%2F20221207_10%2F1670354068993rrJWH_JPEG%2F71489964713358477_868293088.jpg&type=a340"/>
        </v-col>
        <v-col cols="7" class="ma-auto">
          <v-card-title>{{ cart.roName }}</v-card-title>
          <v-card-text>{{ cart.countProduct }}개의 상품이 기다립니다.</v-card-text>
          <v-card-text>총 {{ comma(cart.totalPrice) }}원</v-card-text>
        </v-col>
      </v-card>
      <div :key="longTouchDialog" class="d-flex">
        <DialogsComponent :dialog="longTouchDialog">
          <template v-slot:dialogContent>
            삭제하시겠습니까?
          </template>
          <template v-slot:dialogBtn>
            <v-col class="text-center">
              <v-btn @click="clickCancel" class="mr-2">
                취소
              </v-btn>
              <v-btn @click="clickDelete(cart.caNo)" color="red">
                삭제
              </v-btn>
            </v-col>
          </template>
        </DialogsComponent>
      </div>
    </v-col>
  </v-row>
</template>

<script setup>
import {onMounted, ref} from "vue";
import {getCartList} from "@/apis/cart/cartApis";
import {comma} from "../../utils/util";
import DialogsComponent from "@/components/common/DialogsComponent.vue";

const emits = defineEmits(['handleMoveCart'])
const cartListInfo = ref([{
  caNo: null,
  roName: null,
  countProduct: null,
  totalPrice: null
}])
const longTouchDialog = ref(false)

/**
 * 장바구니 목록 조회
 **/
const getCartListData = async () => {
  const res = await getCartList(1); // coNo props 로 가져오기
  cartListInfo.value = res.data
  console.log(cartListInfo.value)
}

onMounted(() => {
  getCartListData()
})

/**
 * 장바구니 상품 목록 페이지로 이동
 **/
const clickCart = (caNo) => {
  emits("handleMoveCart", caNo)
}

/**
 * 길게 클릭 시 삭제 요청
 **/
const touchStart = () => {
  setTimeout(() => {
    if (!longTouchDialog.value) {
      longTouchDialog.value = true
      console.log(longTouchDialog.value)
    }
  }, 1000);
}
const touchEnd = () => {
}

/**
 * 장바구니 삭제
 **/
const clickDelete = (caNo) => {
  console.log(caNo)
  longTouchDialog.value = false
}

/**
 * 취소
 **/
const clickCancel = () => {
  longTouchDialog.value = false
}

</script>

<style scoped>

</style>
