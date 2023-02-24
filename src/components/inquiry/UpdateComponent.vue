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
        <v-text-field readonly>{{ inquiryInfo.inType }}</v-text-field>
        <p class="ma-2 mt-0">대상</p>
        <v-text-field readonly>{{ inquiryInfo.name }}</v-text-field>
        <p class="ma-2 mt-0">질문내용</p>
        <v-textarea v-model="inquiryInfo.inContent"></v-textarea>
        <div class="mb-7 d-flex justify-center">
          <v-btn @click="clickDeleteBtn" width="100px" color="red" class="mr-10">삭제</v-btn>
          <v-btn @click="clickSubmit(inquiryInfo)" width="100px" color="green">수정 완료</v-btn>
        </div>
      </v-card>
    </v-col>
  </v-row>
  <div :key="deleteDialog" class="d-flex">
    <DialogsComponent :dialog="deleteDialog">
      <template v-slot:dialogContent>
        <p class="ma-5 mb-0">
          정말 삭제하시겠습니까?
        </p>
      </template>
      <template v-slot:dialogBtn>
        <v-col class="text-center">
          <v-btn @click="clickCancel" class="mr-10">
            취소
          </v-btn>
          <v-btn @click="clickDelete" color="red">
            삭제
          </v-btn>
        </v-col>
      </template>
    </DialogsComponent>
  </div>
</template>

<script setup>
import {deleteInquiry, getInquiry, updateInquiry} from "@/apis/inquiry/inquiryApis";
import {onMounted, ref} from "vue";
import DialogsComponent from "@/components/common/DialogsComponent.vue";

const props = defineProps(['inNo'])
const emits = defineEmits(['handleMoveListPage', 'handleMoveDetailPage'])
const inquiryInfo = ref({
  inNo: null,
  inTitle: null,
  inContent: null,
  inType: null,
  inStatus: null,
  name: null
})
const deleteDialog = ref(false)

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

/**
 * 수정 완료 버튼 클릭
 **/
const clickSubmit = async (inquiryInfo) => {
  inquiryInfo.inNo = props.inNo
  await updateInquiry(inquiryInfo)
  emits('handleMoveDetailPage')
}

/**
 * 삭제 버튼 클릭
 **/
const clickDeleteBtn = () => {
  deleteDialog.value = true
}

/**
 * 삭제
 **/
const clickDelete = async () => {
  await deleteInquiry(props.inNo)
  emits('handleMoveListPage')
}


/**
 * 취소
 **/
const clickCancel = () => {
  deleteDialog.value = false
}


</script>

<style scoped>

</style>
