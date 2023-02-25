<template>
  <v-row justify="center">
    <v-col cols="12" xl="8">
      <v-row>
        <v-col v-for="(room, index) in roomList" :key="room.pmNo" cols="12" md="6">
          <v-card class="mx-auto bg-grey-lighten-3" link>
            <v-col cols="12" class="pa-0" @click="handleClickCard( room.pmNo )">
              <v-img :src="room.roThumbnail != null ? getRoomImageUrl( room.roThumbnail ) : getDefaultRoomImageUrl()" height="200px" cover></v-img>
              <v-card-title>{{ room.roName }}</v-card-title>
              <v-card-subtitle>{{ room.roAddress + ' ' + room.roDetailAddress }}</v-card-subtitle>
            </v-col>
            <v-card-actions><v-btn class="font-weight-bold" color="orange" variant="text">입점 브랜드</v-btn>
              <v-spacer></v-spacer>
              <v-btn :icon="room.brandCheck ? 'mdi-chevron-up' : 'mdi-chevron-down'" @click="handleClickBrand(index)"></v-btn>
            </v-card-actions>

            <v-expand-transition>
              <div v-show="room.brandCheck">
                <v-divider></v-divider>
                <v-row class="mt-4 mb-1 pl-9 pr-2">
                  <v-col cols="6" class="pa-0" v-for="seller in room.sellerList" :key="seller.seName">
<!--                    <v-card class="margin-center" width="15em" height="3em"></v-card>-->
                    <v-btn class="mb-4 bg-brown-lighten-1" width="83%">{{ seller.seName }}</v-btn>
                  </v-col>
                </v-row>
              </div>
            </v-expand-transition>
          </v-card>
        </v-col>
        <v-col cols="12" v-if="pageInfo.page != pageInfo.lastPage">
          <v-btn class="bg-brown w-100" @click="handleClickPage">더보기</v-btn>
        </v-col>
      </v-row>
    </v-col>
  </v-row>
</template>

<script setup>
  import {onMounted, ref} from "vue";
  import {getRoomList, getRoomSellerList} from "@/apis/room/roomApis";
  import useUtil from "@/store/common/useUtil";


  const emits = defineEmits(['handleClickRouter', 'handleClickDetail'])
  const { getRoomImageUrl, getDefaultRoomImageUrl } = useUtil()
  const roomList = ref([])
  const pageInfo = ref({ page: null, lastPage: null })


  const getComRoomList = async () => {
    const data = await getRoomList( pageInfo.value.page )
    roomList.value = data.dtoList
    pageInfo.value.page = data.page
    pageInfo.value.lastPage = data.last
    roomList.value.forEach(ele => getComRoomSellerList(ele.pmNo))
  }

  const getComRoomSellerList = async ( pmNo ) => {
    const data = await getRoomSellerList( pmNo )
    roomList.value.forEach(ele => (ele.pmNo == pmNo ? ele.sellerList = data : ''))
    return data
  }

  const handleClickCard = ( pmNo ) => {
    emits('handleClickDetail', pmNo)
  }

  const handleClickBrand = async ( index ) => {
    roomList.value[index].brandCheck = !roomList.value[index].brandCheck
  }

  const handleClickPage = () => {
    pageInfo.value.page++
    getComRoomList()
    emits('handleClickRouter', pageInfo.value.page)
  }

  onMounted(() => {
    getComRoomList()
  })
</script>

<style scoped>
  .margin-center {
    margin: 0 auto;
  }
</style>
