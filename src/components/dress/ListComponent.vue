<template>
  <v-row>
      <v-col v-for="(room, index) in roomList" :key="room.pmNo" cols="12" md="6">
        <v-card class="mx-auto" link>
          <v-col cols="12" class="pa-0" @click="handleClickCard( room.pmNo )">
            <v-img :src="room.roThumbnail != null ? getImageUrl( room.roThumbnail ) : getDefaultImageUrl()" height="200px" cover></v-img>

            <v-card-title>{{ room.roName }}</v-card-title>

            <v-card-subtitle>{{ room.roAddress + room.roDetailAddress }}</v-card-subtitle>
          </v-col>
          <v-card-actions><v-btn class="font-weight-bold" color="orange" variant="text">입점 브랜드</v-btn>

            <v-spacer></v-spacer>

            <v-btn :icon="room.brandCheck ? 'mdi-chevron-up' : 'mdi-chevron-down'" @click="handleClickBrand(index)"></v-btn>
          </v-card-actions>

          <v-expand-transition>
            <div v-show="room.brandCheck">
              <v-divider></v-divider>

              <v-card-text v-for="seller in room.sellerList" :key="seller.seName">
                {{ seller.seName }}
              </v-card-text>
            </div>
          </v-expand-transition>
        </v-card>
        <!--              <v-sheet height="300"></v-sheet>-->
      </v-col>
      <v-col cols="12" v-if="pageInfo.page != pageInfo.lastPage">
        <v-btn class="bg-brown w-100" @click="handleClickPage">더보기</v-btn>
      </v-col>
  </v-row>
</template>

<script setup>
  import {onMounted, ref} from "vue";
  import {getRoomList, getRoomSellerList} from "@/apis/room/roomApis";
  import useUtil from "@/store/common/useUtil";


  const emits = defineEmits(['handleClickRouter', 'handleClickDetail'])
  const { getImageUrl, getDefaultImageUrl } = useUtil()
  const roomList = ref([])
  const pageInfo = ref({ page: null, lastPage: null })


  const getComRoomList = async () => {
    const data = await getRoomList( pageInfo.value.page )
    roomList.value = data.dtoList
    pageInfo.value.page = data.page
    pageInfo.value.lastPage = data.last
  }

  const handleClickCard = ( pmNo ) => {
    emits('handleClickDetail', pmNo)
  }

  const handleClickBrand = async ( index ) => {
    roomList.value[index].brandCheck = !roomList.value[index].brandCheck

    const data = await getRoomSellerList( roomList.value[index].pmNo )
    roomList.value[index].sellerList = data
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

</style>
