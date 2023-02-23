import {defineStore} from "pinia";
import {ref} from "vue";


const useUtil = defineStore('useUtil', () => {
  const convertDate = ( date ) => {
    if ( !date ) { return }

    date = new Date(date)
    const year = date.getFullYear()
    const month = ((date.getMonth() + 1) >= 10 ? (date.getMonth() + 1) : '0' + (date.getMonth() + 1))
    const day = (date.getDate() >= 10 ? date.getDate() : '0' + date.getDate())

    return [year, month, day].join('-')
  }

  const execDaumPostcode = () => {
    const addressInfo = ref({ address: null, extraAddress: null, postcode: null })

    new window.daum.Postcode({
      oncomplete: (data) => {
        if (addressInfo.value.extraAddress !== '') {
          addressInfo.value.extraAddress = ''
        }

        // 사용자가 도로명 주소를 선택했을 경우 : 사용자가 지번 주소를 선택했을 경우(J)
        (data.userSelectedType === 'R' ? addressInfo.value.address = data.roadAddress : addressInfo.value.address = data.jibunAddress)

        // 사용자가 선택한 주소가 도로명 타입일때 참고항목을 조합한다.
        if (data.userSelectedType === 'R') {
          // 법정동명이 있을 경우 추가한다. (법정리는 제외)
          // 법정동의 경우 마지막 문자가 "동/로/가"로 끝난다.
          if (data.bname !== '' && /[동|로|가]$/g.test(data.bname)) {
            addressInfo.value.extraAddress += data.bname;
          }

          // 건물명이 있고, 공동주택일 경우 추가한다.
          if (data.buildingName !== '' && data.apartment === 'Y') {
            addressInfo.value.extraAddress += addressInfo.value.extraAddress !== '' ? `, ${data.buildingName}` : data.buildingName
          }

          // 표시할 참고항목이 있을 경우, 괄호까지 추가한 최종 문자열을 만든다.
          (addressInfo.value.extraAddress !== '' ? addressInfo.value.extraAddress = `(${addressInfo.value.extraAddress})` : addressInfo.value.extraAddress = '')

          // 우편번호를 입력한다.
          addressInfo.value.postcode = data.zonecode
        }
      }
    }).open()

    return addressInfo.value
  }

  const getReTime = (index) => {

    const time = ['09:00 ~ 09:45','10:00 ~ 10:45','11:00 ~ 11:45','13:00 ~ 13:45','14:00 ~ 14:45',
      '15:00 ~ 15:45','16:00 ~ 16:45','17:00 ~ 17:45']

    return time[index]
  }

  const listData = ref()
  const reservationDetailData = (list) => {
    listData.value = list
  }

  return { convertDate, execDaumPostcode,getReTime,reservationDetailData,listData }
})


export default useUtil
