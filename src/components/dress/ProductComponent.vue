<template>
  <v-row justify="center">
    <v-col cols="12" xl="8">
      <v-row>
        <v-card class="bg-grey-lighten-3 ma-3" width="100vw">
          <v-row>
            <v-col cols="12" md="6">
              <v-carousel :cycle="true" :interval="2500">
                <v-carousel-item v-for="image in imageList.top" :key="image.prfUuid" :src="getImageUrl(image.prfUuid)" cover></v-carousel-item>
                <v-carousel-item :src="getImageUrl('fc75eb1f-4f28-4e07-a9fd-9d6bece24ceb.jpg')" cover></v-carousel-item>
              </v-carousel>
            </v-col>
            <v-col cols="12" md="6">
              <v-card-text>
                <h6>상품번호 : {{ product.prNo }}</h6>
                <h3>상품명 : {{ product.prName }}</h3>
                <br>
                <h5>카테고리 : {{ product.prcPathName || '입어볼래 대표상품' }} / 브랜드 : {{ product.prBrand }}</h5>
                <v-divider class="my-4"></v-divider>
                <h4>기본가 : {{ comma(product.prPrice) }} 원</h4>
                <br>
                <v-select label="상품옵션" :items="optionInfo.items" v-model="optionInfo.selectValue" variant="outlined"></v-select>
                <v-list class="bg-grey-lighten-3 pb-0" height="12em">
                  <v-list-item v-for="(cart, index) in cartList.spSize" :key="index">
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
                <v-btn color="success" class="w-100" @click="handleComClickCart"><h2>장바구니 담기</h2></v-btn>
              </v-card-text>
            </v-col>
          </v-row>
        </v-card>
      </v-row>
    </v-col>

    <v-col cols="12" xl="8">
      <v-row>
        <v-card class="bg-grey-lighten-3 ma-3" width="100vw">
          <v-img :src="getImageUrl(imageList.bottom)"></v-img>
        </v-card>
      </v-row>
    </v-col>
  </v-row>
</template>

<script setup>
import {onMounted, ref, watch} from "vue";
  import {getProduct, getProductOption, insertProductCart} from "@/apis/product/productApis";
  import useUtil from "@/store/common/useUtil";
  import {comma} from "../../utils/util";


  const props = defineProps(['prNo'])
  const emits = defineEmits(['handleClickCart'])
  const { getImageUrl } = useUtil()
  const product = ref({})
  const imageList = ref({top: [], bottom: [{}]})
  const optionInfo = ref({items: [], selectValue: null, optionList: []})
  const cartList = ref({spSize: [], spNo: []})


  const handleClickDel = ( index ) => {
    cartList.value.spSize.splice(index, 1)
    cartList.value.spNo.splice(index, 1)
  }

  const handleSelectItem = () => {
    if (cartList.value.spSize.find(ele => ele == optionInfo.value.selectValue)) {
      return
    }

    optionInfo.value.optionList.forEach( ele => (ele.spSize == optionInfo.value.selectValue ? cartList.value.spNo.push(ele.spNo) : '' ))
    cartList.value.spSize.push(optionInfo.value.selectValue)
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
    optionInfo.value.optionList = data
    data.forEach(ele => optionInfo.value.items.push(ele.spSize))
  }

  const handleComClickCart = () => {
    if ( cartList.value.spNo.length == 0 ) {
      return
    }

    postComInsertProductCart()
    emits('handleClickCart')
  }

  const postComInsertProductCart = async () => {
    product.value.spList = cartList.value.spNo
    await insertProductCart( product.value )
  }


  watch(() => optionInfo.value.selectValue, (value, oldValue) => {
    handleSelectItem()
  })

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
