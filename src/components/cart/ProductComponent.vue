<template>
  <v-row>
    <v-col cols="12" md="6" v-for="product in productsInfo" :key="product.cpNo">
      <v-card class="d-flex border-xl" @click="clickProduct(product.cpNo)">
        <v-col cols="12" class="position-absolute h-100 text-center pa-0 d-flex" style="z-index: 1; top: 89%"
               v-if="hiddenDiv && product.cpNo == temp">
          <div class="bg-white w-100 h-25 border-xl font-weight-bold" @click="clickMoveDetail(product.prNo)">
            <p class="mt-4">상품 상세</p>
          </div>
          <div class="bg-white w-100 h-25 border-xl font-weight-bold" @click="clickDelete(product.cpNo)">
            <p class="mt-4">상품 삭제</p>
          </div>
        </v-col>
        <v-row>
          <v-col cols="12" md="6" class="ma-auto">
            <v-img class="w-100" :src="getThumbnailImageUrl(product.thumbnail)"/>
          </v-col>
          <v-col cols="12" md="6" class="pt-10 pl-8">
            <h5>상품명 : {{ product.prName }}</h5>
            <h5 class="mt-2">브랜드 : {{ product.prBrand }}</h5>
            <h5 class="mt-2">사이즈 : {{ product.spSize }}</h5>
            <br>
            <br>
            <h3 class="mb-10">가격: {{ comma(product.prPrice) }} 원</h3>
          </v-col>
        </v-row>
      </v-card>
    </v-col>
  </v-row>
</template>

<script setup>
import {onMounted, ref} from "vue";
import {deleteCartProduct, getCartProducts} from "@/apis/cart/cartApis";
import {comma, getImageUrl} from "@/utils/util";
import useUtil from "@/store/common/useUtil";


const { getThumbnailImageUrl } = useUtil()
const props = defineProps(['caNo'])
const emits = defineEmits(['handleRefreshKey', 'handleMoveDetail'])
const productsInfo = ref({})
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
  emits('handleMoveDetail', prNo)
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
