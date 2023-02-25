<template>
  <v-row justify="center">
    <v-col cols="12" xl="8">
      <v-row>
        <v-card class="bg-grey-lighten-3 ma-3" width="100vw">
          <v-row>
            <v-col cols="12" md="6">
              <v-carousel :cycle="true" interval="2000">
                <v-carousel-item v-for="image in imageList.top" :key="image.prfUuid" :src="getProductImageUrl(image.prfUuid)" cover></v-carousel-item>
              </v-carousel>
            </v-col>
            <v-col cols="12" md="6">
              <v-card-text>
                <h6>상품번호 : {{ product.prNo }}</h6>
                <h3>상품명 : {{ product.prName }}</h3>
                <br>
                <h5>카테고리 : {{ product.prcPathName || '입어볼래 대표상품' }} / 브랜드 : {{ product.prBrand }}</h5>
                <v-divider class="my-4"></v-divider>
                <h4>기본가 : {{ product.prPrice }} 원</h4>
                <br>
                <v-select label="상품옵션" :items="optionInfo.items" v-model="optionInfo.selectValue" variant="outlined" @update:modelValue="handleSelectItem"></v-select>
<!--                <v-btn @click="handleClickStock(-1)">추가</v-btn>-->
                <v-list class="bg-grey-lighten-3 pb-0" height="12em">
                  <v-list-item v-for="(cart, index) in cartList" :key="index">
                    <v-row class="ma-0">
                      <v-col cols="11" class="pa-0">
                        <h4>상품 : {{ product.prName }}</h4>
                        <v-list-item-subtitle><h5>옵션 : {{ cart }}</h5></v-list-item-subtitle>
                      </v-col>
                      <v-col cols="1">
                        <v-icon icon="mdi-close" class="pr-3 pb-3" style="cursor: pointer" @click="handleClickDel(index)"></v-icon>
                      </v-col>
                    </v-row>
                  </v-list-item>
                </v-list>
                <v-divider class="my-4"></v-divider>
                <v-btn color="success" class="w-100"><h2>장바구니 담기</h2></v-btn>
              </v-card-text>
            </v-col>
          </v-row>
        </v-card>
      </v-row>
    </v-col>

    <v-col cols="12" xl="8">
      <v-row>
        <v-card class="bg-grey-lighten-3 ma-3" width="100vw">
          <v-img :src="getProductImageUrl(imageList.bottom)"></v-img>
        </v-card>
      </v-row>
    </v-col>
  </v-row>
</template>

<script setup>
  import {onMounted, ref} from "vue";
  import {getProduct, getProductOption} from "@/apis/product/productApis";
  import useUtil from "@/store/common/useUtil";


  const props = defineProps(['prNo'])
  const { getProductImageUrl } = useUtil()
  const product = ref({})
  const imageList = ref({top: [], bottom: [{}]})
  const optionInfo = ref({items: [], selectValue: null})
  const cartList = ref([])


  const handleClickDel = ( index ) => {
    cartList.value.splice(index, 1)
  }

  const handleSelectItem = () => {
    if (cartList.value.find(ele => ele == optionInfo.value.selectValue)) {
      return
    }

    cartList.value.push(optionInfo.value.selectValue)
  }

  const getComProduct = async () => {
    const data = await getProduct( props.prNo )
    product.value = data[0]
    imageList.value.top = data.filter(ele => ele.prfType == 'TOP')
    imageList.value.bottom = data.filter(ele => ele.prfType == 'BOTTOM')
    imageList.value.bottom = imageList.value.bottom[0].prfUuid
  }

  const getComProductOption = async () => {
    const data = await getProductOption( props.prNo )
    data.forEach(ele => optionInfo.value.items.push(ele.spSize))
  }


  onMounted(() => {
    getComProduct()
    getComProductOption()
  })
</script>

<style scoped>
  .margin-center {
    margin: 0 auto;
  }
</style>
