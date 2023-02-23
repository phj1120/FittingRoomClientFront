<template>
  <v-row>
    <v-col cols="12" md="6" v-for="product in productsInfo" :key="product.cpNo">
      <v-card class="d-flex border-xl" @click="clickProduct(product.cpNo)">
        <v-col cols="12" class="position-absolute h-100 text-center pa-0 d-flex" style="z-index: 1" v-if="hiddenDiv && product.cpNo == temp">
            <div class="bg-white w-100 h-25 border-xl font-weight-bold" @click="clickMoveDetail(product.prNo)">
              <p class="mt-4">상품 상세</p>
            </div>
            <div class="bg-white w-100 h-25 border-xl font-weight-bold" @click="clickDelete(product.cpNo)">
              <p class="mt-4">상품 삭제</p>
            </div>
        </v-col>
        <v-col cols="5" class="ma-auto">
          <v-img max-height="230" max-width="230" :src="getImageUrl(product.thumbnail)"/>
        </v-col>
        <v-col cols="7" class="d-flex">
          <div class="mt-5 mb-5">
            <v-card-text class="font-weight-bold">상품명:</v-card-text>
            <v-card-text class="font-weight-bold">브랜드:</v-card-text>
            <v-card-text class="font-weight-bold">사이즈:</v-card-text>
            <v-card-text class="font-weight-bold">가격:</v-card-text>
          </div>
          <div class="mt-5 mb-5">
            <v-card-text>{{ product.prName }}</v-card-text>
            <v-card-text>{{ product.prBrand }}</v-card-text>
            <v-card-text>{{ product.spSize }}</v-card-text>
            <v-card-text>{{ comma(product.prPrice) }}원</v-card-text>
          </div>
        </v-col>
      </v-card>
    </v-col>
  </v-row>
</template>

<script setup>
import {onMounted, ref} from "vue";
import {deleteCartProduct, getCartProducts} from "@/apis/cart/cartApis";
import {comma, getImageUrl} from "@/utils/util";

const props = defineProps(['caNo'])
const emits = defineEmits(['handleRefreshKey'])
const productsInfo = ref([{
  cpNo: null,
  prNo: null,
  thumbnail: null,
  prName: null,
  prBrand: null,
  spSize: null,
  prPrice: null
}])
const hiddenDiv = ref(false)
const temp = ref()

/**
 * 장바구니 상품 목록 조회
 **/
const getCartProductsInfo = async () => {
  console.log(props.caNo)
  const res = await getCartProducts(props.caNo)
  productsInfo.value = res.data
}

onMounted(() => {
  getCartProductsInfo()
})

/**
 * 상품 클릭 이벤트
 **/
const clickProduct = (cpNo) => {
  temp.value = []
  temp.value = cpNo
  if (!hiddenDiv.value) {
    hiddenDiv.value = !hiddenDiv.value
  }
}

/**
 * 상품 상세 페이지로 이동
 **/
const clickMoveDetail = (prNo) => {
  console.log(prNo)
}

/**
 * 상품 삭제
 **/
const clickDelete = async (cpNo) => {
  console.log(cpNo)
  await deleteCartProduct(cpNo)
  emits('handleRefreshKey')
}


</script>

<style scoped>

</style>
