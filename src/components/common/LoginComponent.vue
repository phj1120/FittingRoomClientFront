<template>
  <v-container>
    <v-row justify="center">
      <v-form class="form-login" ref="form" lazy-validation>
        <v-img class="logo"
               src="https://gw.plateer.com/fileroot/0/files/upload_newPortal/uploadFile/%7Bce214677-57b3-41f1-adbe-ded459ae3cb4%7D.png"></v-img>
        <v-text-field class="input-id" v-model="userInfo.memberId" label="Email"
                      required></v-text-field>
        <v-text-field type="password" class="input-password" v-model="userInfo.password" label="Password"
                      required></v-text-field>
      </v-form>
    </v-row>
    <v-row justify="center" align="start">
      <v-col cols="4">
        <v-btn class="mb-4 bg-brown-lighten-1" width="100%"
               @click="handleClickLogin">로그인</v-btn>
      </v-col>
      <v-col cols="4">
        <v-img src="https://k.kakaocdn.net/14/dn/btroDszwNrM/I6efHub1SN5KCJqLm1Ovx1/o.jpg"
               @click="loginWithKakao"/>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import {ref} from "vue";
import {signIn} from "@/apis/common/commonApis";
import useLogin from "@/store/common/useLogin";
import {useRouter} from "vue-router";

const router = useRouter()

const userInfo = ref({memberId: '', password: '', type: ''})
const {getTokens, saveInfo} = useLogin()

const handleClickLogin = async () => {
  const result = await signIn(userInfo.value)
  saveInfo(result)
  getTokens()

  router.push({name: 'HomePage'})
}

const loginWithKakao = () => {
  Kakao.Auth.authorize({
    redirectUri: 'http://localhost:3000/register',
  });
}
</script>


<style scoped>
.form-login {
  padding-top: 15%;
  margin: 0 auto;
  width: 80%;
}

.logo {
  margin: 0 auto;
  width: 15em;
}

.input-id, .input-password {
  margin: 0 auto;
  width: 100%;
}

.input-id {
  padding-top: 5em;
}
</style>
