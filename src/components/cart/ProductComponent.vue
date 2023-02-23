<template>
  <v-row>
    <v-col cols="12" md="6" v-for="product in productsInfo" :key="product">
      <v-card class="d-flex mx-auto border-xl" @click="clickProduct(product.prNo)">
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
            <v-card-text>{{ product.prPrice }}원</v-card-text>
          </div>
        </v-col>
      </v-card>
    </v-col>
  </v-row>
</template>

<script setup>
import {onMounted, ref} from "vue";
import {getCartProducts} from "@/apis/cart/cartApis";
import {getImageUrl} from "@/utils/util";

const props = defineProps(['caNo'])
const productsInfo = ref([{
  cpNo: null,
  prNo: null,
  thumbnail: null,
  prName: null,
  prBrand: null,
  spSize: null,
  prPrice: null
}])

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
 * 상품 상세 페이지로 이동
 **/
const clickProduct = (prNo) => {
  console.log(prNo)
}

</script>

<style scoped>

</style>
