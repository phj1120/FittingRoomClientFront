<template>
  <v-row>
    <v-col cols="12">
      <v-card class="border-xl mb-3">
        <div class="text-center ma-3">Q&A 수정</div>
      </v-card>
      <v-card>
        <p class="ma-2 mt-5">제목</p>
        <v-text-field v-model="inquiryInfo.inTitle"></v-text-field>
        <p class="ma-2 mt-0">질문유형</p>
        <v-text-field>{{ inquiryInfo.inType }}</v-text-field>
        <p class="ma-2 mt-0">대상</p>
        <v-text-field>{{ inquiryInfo.name }}</v-text-field>
        <p class="ma-2 mt-0">질문내용</p>
        <v-textarea v-model="inquiryInfo.inContent"></v-textarea>
        <div class="text-center ma-5 mb-7">
          <v-btn @click="clickSubmit" width="300px" color="green">수정 완료</v-btn>
        </div>
      </v-card>
    </v-col>
  </v-row>
</template>

<script setup>
import {getInquiry} from "@/apis/inquiry/inquiryApis";
import {onMounted, ref} from "vue";

const props = defineProps(['inNo'])
const inquiryInfo = ref({
  inTitle: null,
  inContent: null,
  inType: null,
  name: null
})

/**
 * Q&A 상세 불러오기
 **/
const getInquiryData = async () => {
  const res = await getInquiry(props.inNo)
  inquiryInfo.value = res.data
}

onMounted(() => {
  getInquiryData()
})


</script>

<style scoped>

</style>
