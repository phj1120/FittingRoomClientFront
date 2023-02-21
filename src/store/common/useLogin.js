import {defineStore} from "pinia";
import {ref} from "vue";
import VueCookies from "vue-cookies";

const useLogin = defineStore('useLogin',() => {
  const memberInfo = ref({access:null, refresh:null})

  const saveInfo = (result) => {
    console.log(`[useLogin.saveInfo]`)
    console.log(result)
    const {refresh, access} = result
    memberInfo.value.access = access
    memberInfo.value.refresh = refresh

    VueCookies.set("access", access)
    VueCookies.set("refresh", refresh)
  }

  const getTokens = () => {
    memberInfo.value.access = VueCookies.get("access")
    memberInfo.value.refresh = VueCookies.get("refresh")

    return memberInfo
  }

  const logout = () =>{
    memberInfo.value.access = null
    memberInfo.value.refresh = null

    VueCookies.remove("access")
    VueCookies.remove("refresh")
  }

  return {memberInfo, saveInfo, getTokens, logout}
})


export default useLogin
