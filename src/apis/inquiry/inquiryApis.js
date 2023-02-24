import axios from "axios";


const domain = 'http://' + window.location.hostname + (window.location.hostname.indexOf('armysseung.iptime.org') == -1 ? ':8080' : ':3258')

/**
 * Q&A 목록 조회
 **/
export const getInquiryList = async (pageSearch) => {
  const params = {coNo: 1, size: pageSearch.size, page: pageSearch.page}

  // 사용자
  params.coNo = pageSearch.coNo

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
export const updateInquiry = async (inquiryInfo) => {
  const params = {inTitle: inquiryInfo.inTitle, inContent: inquiryInfo.inContent, inStatus: inquiryInfo.inStatus}
  const res = await axios.put(`${domain}/api/consumer/inquiry/${inquiryInfo.inNo}`, {params: params})

  console.log(params)
  return res.data
}

/**
 * Q&A 삭제
 **/
export const deleteInquiry = async (inNo) => {
  const res = await axios.delete(`${domain}/api/consumer/inquiry/${inNo}`)

  return res.data
}
