<template>
  <v-row>
    <v-col cols="12" md="6" v-for="cart in cartListInfo" :key="cart.caNo">
      <v-card class="border-xl" width="100%" @click="clickCart(cart.caNo)" @touchstart="touchStart(cart.caNo)" @touchend="touchEnd">
        <v-row>
          <v-col cols="12" md="6">
            <v-img :src="getThumbnailImageUrl(cart.rfUuid)" style="width: 100%; height: 15em" cover/>
          </v-col>
          <v-col cols="12" md="6" class="pa-0">
            <br>
            <br>
            <h3 class="pl-8">지점명 : {{ cart.roName }}</h3>
            <br>
            <br>
            <br>
            <h5 class="pl-8">총 {{ cart.countProduct }} 개의 상품이 기다립니다.</h5>
            <h3 class="pl-8 mb-10">총 {{ comma(cart.totalPrice) }} 원</h3>
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

/**
 * 장바구니 상품 목록 페이지로 이동
 **/
const clickCart = (caNo) => {
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


onMounted(() => {
  getCartListData()
})
</script>

<style scoped>

</style>
