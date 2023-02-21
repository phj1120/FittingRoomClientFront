import axios from "axios";
import useLogin from "@/store/common/useLogin";

const domain = 'http://' + window.location.hostname + ':8080'

const {getTokens, saveInfo} = useLogin()

// userInfo:{memberId:null, password:null}
export const signIn = async (userInfo) => {
  const loginInfo = {
    memberId: userInfo.memberId,
    password: userInfo.password
  }

  const res = await axios.post(`${domain}/api/sign-in`, loginInfo)

  return res.data
}

export const socialSignIn = async (code)=>{
  const res = await axios.post(`${domain}/api/oauth/kakao/${code}`)

  saveInfo(res.data.data.tokens)

  return res.data.data.consumer
}

export const socialSignUp = async (userInfo)=>{
  const res = await axios.put(`${domain}/api/consumer/register`, userInfo)

  saveInfo(res.data.data.tokens)

  return res.data.data.consumer
}


