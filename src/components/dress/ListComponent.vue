<template>
  <v-row>
      <v-col v-for="(room, index) in roomList" :key="room.pmNo" cols="12" md="6">
        <v-card class="mx-auto">
          <v-img :src="getImageUrl( room.roThumbnail )" height="200px" cover></v-img>

          <v-card-title>{{ room.roName }}</v-card-title>

          <v-card-subtitle>{{ room.roAddress + room.roDetailAddress }}</v-card-subtitle>

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
  </v-row>
</template>

<script setup>
  import {onMounted, ref} from "vue";
  import {getRoomList, getRoomSellerListzx} from "@/apis/room/roomApis";
  import useUtil from "@/store/common/useUtil";


  const { getImageUrl } = useUtil()
  const roomList = ref([])


  const getComRoomList = async () => {
    const data = await getRoomList()
    roomList.value = data.dtoList
  }

  const handleClickBrand = async ( index ) => {
    roomList.value[index].brandCheck = !roomList.value[index].brandCheck

    const data = await getRoomSellerListzx( roomList.value[index].pmNo )
    roomList.value[index].sellerList = data
  }

  onMounted(() => {
    getComRoomList()
  })
</script>

<style scoped>

</style>
