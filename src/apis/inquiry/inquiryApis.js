import axios from "axios";


const domain = 'http://' + window.location.hostname + (window.location.hostname.indexOf('armysseung.iptime.org') == -1 ? ':8080' : ':3258')

/**
 * Q&A 목록 조회
 **/
export const getInquiryList = async (pageSearch) => {
  let params = {coNo: 1, size: null, page: null}

  // 사용자
  params.coNo = pageSearch.coNo

  // 페이징
  params.size = pageSearch.size
  params.page = pageSearch.page

  const res = await axios.get(`${domain}/api/consumer/inquiry/list`, {params: params})

  return res.data
}

/**
 * Q&A 상세 조회
 **/
export const getInquiry = async (inNo) => {
  const res = await axios.get(`${domain}/api/consumer/inquiry/${inNo}`)

  return res.data
}

/**
 * Q&A 수정
 **/
export const updateInquiry = async (inNo) => {
  const res = await axios.put(`${domain}/api/consumer/inquiry/${inNo}`)

  return res.data
}
