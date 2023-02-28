<template>
  <v-row>
    <v-col cols="12" md="6" v-for="cart in cartListInfo" :key="cart.caNo">
      <v-card class="d-flex border-xl" @click="clickCart(cart.caNo)" @touchstart="touchStart(cart.caNo)"
              @touchend="touchEnd">
        <v-row>
          <v-col cols="12" md="6">
            <v-img class="w-100 h-100" :src="getThumbnailImageUrl(cart.rfUuid)"/>
          </v-col>
          <v-col cols="12" md="6" class="ma-auto">
            <v-card-title>{{ cart.roName }}</v-card-title>
            <v-card-text>{{ cart.countProduct }}개의 상품이 기다립니다.</v-card-text>
            <v-card-text>총 {{ comma(cart.totalPrice) }}원</v-card-text>
          </v-col>
        </v-row>
      </v-card>
      <div :key="longTouchDialog" class="d-flex">
        <DialogsComponent :dialog="longTouchDialog">
          <template v-slot:dialogContent>
            <p class="ma-5 mb-0">
              정말 삭제하시겠습니까?
            </p>
          </template>
          <template v-slot:dialogBtn>
            <v-col class="text-center">
              <v-btn @click="clickCancel" class="mr-10">
                취소
              </v-btn>
              <v-btn @click="clickDelete()" color="red">
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
import {deleteCart, getCartList} from "@/apis/cart/cartApis";
import {comma} from "../../utils/util";
import DialogsComponent from "@/components/common/DialogsComponent.vue";
import useUtil from "@/store/common/useUtil";

const emits = defineEmits(['handleMoveCart', 'handleRefreshKey'])
const {getThumbnailImageUrl} = useUtil()

const cartListInfo = ref({})
const longTouchDialog = ref(false)
const temp = ref()
let timer = null

/**
 * 장바구니 목록 조회
 **/
const getCartListData = async () => {
  const res = await getCartList();
  cartListInfo.value = res.data
}

onMounted(() => {
  getCartListData()
})

/**
 * 장바구니 상품 목록 페이지로 이동
 **/
const clickCart = (caNo) => {
  console.log(caNo)
  emits("handleMoveCart", caNo)
  return temp
}

/**
 * 길게 클릭 시 삭제 요청
 **/
const touchStart = (caNo) => {
  temp.value = caNo
  timer = setTimeout(() => {
    if (!longTouchDialog.value) {
      longTouchDialog.value = true
      console.log(longTouchDialog.value)
    }
  }, 1000);
}

/**
 * 클릭 안하면 삭제 요청 초기화
 **/
const touchEnd = () => {
  clearTimeout(timer)
}

/**
 * 장바구니 삭제
 **/
const clickDelete = async () => {
  console.log(temp.value)
  await deleteCart(temp.value)
  longTouchDialog.value = false
  emits('handleRefreshKey')
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
