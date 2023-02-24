<template>
 <v-row>
    <v-col  cols="12" md="12">
      <v-card
        class="mx-auto"
      >
        <v-row justify="center">
          <v-col>
          <v-card-title>{{itemList.roName}}</v-card-title>
          </v-col>
        <v-col >
          <div>예약일</div>
          <p> {{itemList.reDt}}</p>
          <p> {{itemList.reTime}}</p>
      </v-col>
        </v-row>
        <v-divider></v-divider>
        <v-card-item>
          <v-row>

            <v-col>
              <p>주소 : {{itemList.roAddress +' '+ itemList.roDetailAddress}} </p>
              <p>장소대여료 : {{itemList.rePrice}}</p>
            </v-col>
          </v-row>
        </v-card-item>

        <v-table
          class="ml-2 mr-2 mb-2"
        >
          <thead>
          <tr>
            <th class="text-center font-weight-bold">
              상품명
            </th>
            <th class="text-center font-weight-bold">
              가격
            </th>
            <th class="text-center font-weight-bold">
              상태
            </th>
          </tr>
          </thead>
          <tbody>
          <tr
            v-for="(item,index) in cartItemList"
            :key="index"
          >
            <td class="text-center">{{ item.prName }}</td>
            <td class="text-center">{{ item.prPrice }}</td>
            <td class="text-center" v-if="item.cpStatus">거절</td>
            <td class="text-center" v-if="!item.cpStatus">승인</td>
          </tr>
          </tbody>
        </v-table>
      </v-card>
    </v-col>
  </v-row>

</template>

<script setup>
import {onMounted, ref} from "vue";
import {getReservaiontDetailApi} from "@/apis/reservation/reservationApis";
import {getReservationItemListApi} from "@/apis/cart/cartApis";

const props = defineProps(['orNo'])

const itemList = ref({})
const cartItemList = ref({})

const getReservationData = async ()=>{
  itemList.value = await getReservaiontDetailApi(props.orNo)
  await getItemList(itemList.value.caNo)

}
const getItemList = async (caNo) =>{
  console.log(itemList.value.caNo)
  cartItemList.value = await getReservationItemListApi(caNo)

}
onMounted(()=>{
  getReservationData()
})
</script>

<style scoped>

</style>
