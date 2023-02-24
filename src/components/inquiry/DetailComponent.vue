<template>
  <v-row>
    <v-col cols="12">
      <v-card class="border-xl mb-3">
        <div class="text-center ma-3">Q&A 조회</div>
      </v-card>
      <v-card>
        <p class="ma-2 mt-5">제목</p>
        <v-text-field readonly>{{ inquiryInfo.inTitle }}</v-text-field>
        <p class="ma-2 mt-0">질문유형</p>
        <v-text-field readonly>{{ inquiryInfo.inType }}</v-text-field>
        <p class="ma-2 mt-0">대상</p>
        <v-text-field readonly>{{ inquiryInfo.name }}</v-text-field>
        <p class="ma-2 mt-0">답변여부</p>
        <v-text-field readonly>{{ inquiryInfo.inStatus }}</v-text-field>
        <p class="ma-2 mt-0">질문내용</p>
        <v-text-field readonly>{{ inquiryInfo.inContent }}</v-text-field>
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
  inStatus: null,
  inType: null,
  name: null
})

/**
 * Q&A 상세 조회
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
