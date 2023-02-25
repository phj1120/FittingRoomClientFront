<template>
  <v-row>
    <v-col cols="12">
      <v-card class="border-xl mb-3">
        <div class="text-center ma-3">Q&A 목록</div>
      </v-card>
      <v-card>
        <v-table>
          <thead>
          <tr class="bg-blue text-center">
            <td>번호</td>
            <td>제목</td>
            <td>유형</td>
            <td>답변여부</td>
          </tr>
          </thead>
          <tbody>
          <tr class="text-center" v-for="inquiry in inquiryList" :key="inquiry.inNo"
              @click="clickInquiry(inquiry.inNo)">
            <td>{{ inquiry.inNo }}</td>
            <td class="text-left">{{ inquiry.inTitle }}</td>
            <td v-if="inquiry.inType=='PLACE'?changeName.inType='장소':changeName.inType='상품'">
              {{ changeName.inType }}
            </td>
            <td v-if="inquiry.inStatus=='WAITING'?changeName.inStatus='대기중':changeName.inStatus='답변완료'">
              {{ changeName.inStatus }}
            </td>
          </tr>
          </tbody>
        </v-table>
        <div class="text-center ma-7">
          <v-btn @click="clickMoreView" width="300px" color="green">더 보기</v-btn>
        </div>
      </v-card>
    </v-col>
  </v-row>
</template>

<script setup>
import {onMounted, ref} from "vue";
import {getInquiryList} from "@/apis/inquiry/inquiryApis";

const props = defineProps(['paging'])
const emits = defineEmits(['handleMoreViewBtn', 'handleRefreshKey', 'handleMoveDetail'])

const inquiryList = ref([{
  inNo: null,
  inTitle: null,
  inType: null,
  inStatus: null
}])
const changeName = ref({
  inType: null,
  inStatus: null
})

/**
 * Q&A 목록 조회
 **/
const getInquiryListData = async () => {
  const {dtoList} = await getInquiryList(props.paging)
  inquiryList.value = dtoList
}

onMounted(() => {
  getInquiryListData()
  scrollBottom()
})

/**
 * 더 보기 버튼
 **/
const clickMoreView = () => {
  emits('handleMoreViewBtn')
  emits('handleRefreshKey')
}

/**
 * 더 보기 클릭 시 스크롤
 **/
const scrollBottom = () => {
  setTimeout(() => {
    scrollTo(0, 1000);
  }, 100);
}

/**
 * 상세 페이지 이동
 **/
const clickInquiry = (inNo) => {
  emits('handleMoveDetail', inNo)
}

</script>

<style scoped>

</style>
