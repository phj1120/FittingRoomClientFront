<template>
  <v-text-field label="이메일" v-model="userInfo.coEmail" readonly></v-text-field>
  <v-text-field label="비밀번호" v-model="userInfo.coPassword"></v-text-field>
  <v-text-field label="이름" v-model="userInfo.coName"></v-text-field>
  <v-text-field label="닉네임" v-model="userInfo.coNickname"></v-text-field>
  <v-text-field label="전화번호" v-model="userInfo.coPhone"></v-text-field>
  <v-text-field label="생년월일" v-model="userInfo.coBirth"></v-text-field>
  <v-text-field label="성별" v-model="userInfo.coGender"></v-text-field>
  <v-text-field label="주소" v-model="userInfo.coAddress"></v-text-field>
  <v-text-field label="상세주소" v-model="userInfo.coDetailAddress"></v-text-field>
  <v-text-field label="우편번호" v-model="userInfo.coPostNumber"></v-text-field>
  <v-btn @click="handleClickSaveButton">정보 저장</v-btn>
</template>

<script setup>
import {useRoute, useRouter} from "vue-router";
import {socialSignIn, socialSignUp} from "@/apis/common/commonApis";
import {ref} from "vue";

const route = useRoute()
const router = useRouter()
const code = route.query.code
const userInfo = ref({})

const getUserWithTokens = async () => {
  const res = await socialSignIn(code)
  userInfo.value = res

  if (res.coIsSignUp) {
    console.log('[Register Page]: need more info')
    router.push({name: 'HomePage'})
  }
}
getUserWithTokens()

const handleClickSaveButton = async () =>{
  socialSignUp(userInfo.value)

  console.log(userInfo.value)
  router.push({name:'HomePage'})
}

</script>

<style scoped>

</style>
