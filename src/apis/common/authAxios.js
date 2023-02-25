import axios from "axios";
import useMemberInfo from "@/store/common/useLogin";
import router from "@/router";

// 요청과 토큰 refresh 한 번에 처리
const authAxios = axios.create()

const domain = 'http://' + window.location.hostname + ( window.location.hostname.indexOf('armysseung.iptime.org') == -1 ? ':8080' : ':3256')

const requestRefresh = async () => {
  console.log("[RequestRefresh Start]")
  const {getTokens, saveInfo} = useMemberInfo();
  const tokens = getTokens().value

  // 갱신 요청 전송
  const {data} = await axios.post(`${domain}/api/refresh`,
    {access: tokens.access, refresh: tokens.refresh});

  // 받아온 정보 클라이언트에 반영
  saveInfo(data)
  console.log("[RequestRefresh End]")

  return data
}

authAxios.interceptors.request.use((config) => {
    // authAxios 로 요청 시 헤더에 토큰 넣어 전송
    config.headers = {'Authorization': `Bearer ${useMemberInfo().getTokens().value.access}`}

    return config
  }, () => {
    console.log("[Request 실패 - authAxios.interceptors]")
  }
)

authAxios.interceptors.response.use((response) => {
    return response
  }, async (error) => {
    // 상태코드가 200이 아닐 경우
    console.log('authAxios.interceptors.response - error')
    console.log(error)

    // access 토큰이 만료된 경우 refresh 토큰 이용해 access 토큰과 refresh 토큰 갱신
    if (error.response.data.msg === 'Expired Token') {
      try {
        // 토큰 refresh 요청
        const tokens = await requestRefresh()

        // 갱신 된 토큰을 헤더에 담아 재요청
        error.config.headers = {'Authorization': `Bearer ${tokens.access}`}

        return axios(error.config)
      } catch (eee) {
        console.log('authAxios.interceptors: Refresh Error')
        console.log(eee)

        router.push({name: 'LoginPagePre'})

        return Promise.reject(eee);
      }
    }

    return Promise.reject(error);
  }
)


export default authAxios
