<template>
  <v-row justify="center">
    <v-col cols="12" xl="8">
      <v-row>
        <v-col cols="12" md="6" v-for="seller in sellerList" :key="seller.seNo">
          <v-card class="bg-grey-lighten-3">
            <v-card-title class="pt-3 text-brown font-weight-bold">
              {{ seller.seName }}
            </v-card-title>
            <v-card-subtitle>
              {{ seller.seAddress }}
            </v-card-subtitle>
            <v-card-item class="pb-5 pt-5">
              <v-row>
                <v-slide-group selected-class="bg-success" show-arrows >
                  <v-slide-group-item v-for="product in seller.productList" :key="product.prName" v-slot="{ selectedClass }">
                    <v-card color="grey-lighten-1" :class="['ma-3', selectedClass]" height="160" width="160" @click="handleClickCard(product.prNo)" link>
                      <div class="d-flex fill-height align-center justify-center">
                        <img :src="getProductImageUrl(product.prfUuid)">
                      </div>
                    </v-card>
                  </v-slide-group-item>
                </v-slide-group>
              </v-row>
            </v-card-item>
          </v-card>
        </v-col>
      </v-row>
    </v-col>
  </v-row>
</template>

<script setup>
  import {getRoomSellerList} from "@/apis/room/roomApis";
  import {onMounted, ref} from "vue";
  import {getSellerProductList} from "@/apis/product/productApis";
  import useUtil from "@/store/common/useUtil";


  const props = defineProps(['pmNo'])
  const emits = defineEmits(['handleClickProduct'])
  const { getProductImageUrl } = useUtil()
  const sellerList = ref([])


  const handleClickCard = ( prNo ) => {
    emits('handleClickProduct', prNo)
  }

  const getComRoomSellerList = async () => {
    const sellerData = await getRoomSellerList( props.pmNo )
    sellerList.value = sellerData

    sellerList.value.forEach((seller) => {
      getComSellerProductList( seller )
    })
  }

  const getComSellerProductList = async ( seller ) => {
    const data = await getSellerProductList( seller.seNo )
    seller.productList = data.dtoList
  }


  onMounted(() => {
    getComRoomSellerList()
  })
</script>

<style scoped>

</style>
