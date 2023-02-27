import axios from "axios";


const domain = 'http://' + window.location.hostname + ( window.location.hostname.indexOf('armysseung.iptime.org') == -1 ? ':8080' : ':3258')

export const getReservaiontListApi = async () => {
  const res = await axios.get(`${domain}/api/reservation/list`)

  return res.data
}

export const getReservaiontDetailApi = async (orNo) => {
  const res = await axios.get(`${domain}/api/reservation/detail/products/${orNo}`)

  return res.data
}

export const modifyReservationCheckApi = async (noList) => {
  const res = await axios.put(`${domain}/api/reservation/detail/modify`,noList)
  return res.data
}

export const modifyReservationCancleApi = async (noList) => {
  const res = await axios.put(`${domain}/api/reservation/detail/cancle`,noList)
  return res.data
}


