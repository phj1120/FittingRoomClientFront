<template>
  <v-row>
    <v-col cols="12" md="6" v-for="seller in sellerList" :key="seller.seNo">
      <v-card>
        <v-card-title class="text-center pt-5">
          {{ seller.seName }}
        </v-card-title>
        <v-card-item class="pb-0 pt-5">
          <v-row>
            <v-slide-group selected-class="bg-success" show-arrows >
              <v-slide-group-item v-for="product in seller.productList" :key="product.prName" v-slot="{ selectedClass }">
                <v-card color="grey-lighten-1" :class="['ma-3', selectedClass]" height="160" width="160" link>
                  <div class="d-flex fill-height align-center justify-center">
                    {{ product.prName }}
                  </div>
                </v-card>
              </v-slide-group-item>
            </v-slide-group>
<!--            <v-row>-->
<!--              <v-col cols="6" md="3" v-for="product in seller.productList" :key="product.prName">-->
<!--                <v-card>-->
<!--                  {{ product.prName }}-->
<!--                  <v-img :src="getImageUrl( product.prName )"></v-img>-->
<!--                </v-card>-->
<!--              </v-col>-->
<!--            </v-row>-->
          </v-row>
        </v-card-item>

        <v-card-actions>
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
</template>

<script setup>
  import {getRoomSellerList} from "@/apis/room/roomApis";
  import {onMounted, ref} from "vue";
  import {getSellerProductList} from "@/apis/product/productApis";
  import useUtil from "@/store/common/useUtil";


  const props = defineProps(['pmNo'])
  const { getImageUrl, getDefaultImageUrl } = useUtil()
  const sellerList = ref([])


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
