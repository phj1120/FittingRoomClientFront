import axios from "axios";
import useLogin from "@/store/common/useLogin";
import authAxios from "@/apis/common/authAxios";

const domain = 'http://' + window.location.hostname + ( window.location.hostname.indexOf('armysseung.iptime.org') == -1 ? ':8080' : ':3256')

const {saveInfo} = useLogin()

// userInfo:{memberId:null, password:null}
export const signIn = async (userInfo) => {
  const loginInfo = {
    memberId: userInfo.memberId,
    password: userInfo.password
  }

  const res = await axios.post(`${domain}/api/sign-in`, loginInfo)

  return res.data
}

export const socialSignIn = async (code) => {
  const res = await axios.post(`${domain}/api/oauth/kakao/${code}`)

  saveInfo(res.data.data.tokens)

  return res.data.data.consumer
}

export const socialSignUp = async (userInfo) => {
  console.log('[commonApis.socialSignUp]')
  const res = await authAxios.put(`${domain}/api/consumer/register`, userInfo)

  return res
}


