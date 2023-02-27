<template>
  <v-row>
    <v-col cols="12">
      <v-card class="border-xl mb-3">
        <div class="text-center ma-3">Q&A 등록</div>
      </v-card>
      <v-card>
        <p class="ma-2 mt-5">제목</p>
        <v-text-field v-model="inquiryInfo.inTitle"></v-text-field>
        <p class="ma-2 mt-0">질문유형</p>
        <v-text-field v-model="inquiryInfo.inType" readonly></v-text-field>
        <p class="ma-2 mt-0">대상</p>
        <v-text-field v-model="inquiryInfo.name" readonly></v-text-field>
        <p class="ma-2 mt-0">질문내용</p>
        <v-textarea v-model="inquiryInfo.inContent"></v-textarea>
        <div class="mb-7 d-flex justify-center">
          <v-btn @click="clickSubmit(inquiryInfo)" width="100px" color="green">등록</v-btn>
        </div>
      </v-card>
    </v-col>
  </v-row>
</template>

<script setup>
import {addInquiry} from "@/apis/inquiry/inquiryApis";
import {ref} from "vue";

const props = defineProps(['inNo'])
const emits = defineEmits(['handleMoveListPage', 'handleMoveDetailPage'])
const inquiryInfo = ref({
  inTitle: null,
  inContent: null,
  inType: "자동입력",
  inStatus: null,
  name: "자동입력",
})

/**
 * 수정 완료 버튼 클릭
 **/
const clickSubmit = async (inquiryInfo) => {
  inquiryInfo.inNo = props.inNo
  await addInquiry(inquiryInfo)
  emits('handleMoveListPage')
}

</script>

<style scoped>

</style>
