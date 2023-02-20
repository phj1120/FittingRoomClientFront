import {defineStore} from "pinia";
import {ref} from "vue";
import VueCookies from "vue-cookies";

const useLogin = defineStore('useLogin',() => {
  const memberInfo = ref({access:null, refresh:null})


  const saveInfo = (result, userInfo) => {
    const {refresh, access} = result
    memberInfo.value.access = access
    memberInfo.value.refresh = refresh

    VueCookies.set("access", access)
    VueCookies.set("refresh", refresh)
    VueCookies.set("adminType", userInfo.type)
  }

  const getTokens = () => {
    memberInfo.value.access = VueCookies.get("access")
    memberInfo.value.refresh = VueCookies.get("refresh")

    return memberInfo
  }

  const getAdmin = () => {
    return VueCookies.get("adminType")
  }

  const logout = () =>{
    memberInfo.value.access = null
    memberInfo.value.refresh = null

    VueCookies.remove("access")
    VueCookies.remove("refresh")
    VueCookies.remove("adminType")
  }

  return {memberInfo, saveInfo, getTokens, getAdmin, logout}
})


export default useLogin
