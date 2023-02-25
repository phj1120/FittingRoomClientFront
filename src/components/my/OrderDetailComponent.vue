<template>
  <v-row>
    <v-col  cols="12" md="6">
      <v-card
        class="mx-auto"
      >
        <v-row align="center">
          <v-col>
          <v-card-title v-text="props.listData.roName"></v-card-title>
          </v-col>
        <v-col >
          <div>예약일</div>
          <p> {{props.listData.reDt}}</p>
      </v-col>
        </v-row>
        <v-divider></v-divider>
        <v-card-item>
          <v-row>

            <v-col>
              <p>주소 : {{props.listData.roAddress +' '+ props.listData.roDetailAddress}} </p>
              <p>장소대여료 : {{props.listData.rePrice}}</p>
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
            v-for="(item,index) in itemList"
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

      <!--              <v-sheet height="300"></v-sheet>-->
    </v-col>
  </v-row>
</template>

<script setup>
import {onMounted, ref} from "vue";
import {getReservationItemListApi} from "@/apis/cart/cartApis";

const props = defineProps(['listData'])

const itemList = ref()

const getItemList = async () =>{

  itemList.value = await getReservationItemListApi(props.listData.caNo)
  console.log(itemList.value)
}
onMounted(()=>{
  getItemList()
})
</script>

<style scoped>

</style>
