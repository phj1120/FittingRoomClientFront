import axios from "axios";


const domain = 'http://' + window.location.hostname + ( window.location.hostname.indexOf('armysseung.iptime.org') == -1 ? ':8080' : ':3258')

export const getReservaiontListApi = async () => {
  const res = await axios.get(`${domain}/api/reservation/list`)
  console.log(res.data)
  return res.data
}

export const getReservaiontDetailApi = async (orNo) => {
  const res = await axios.get(`${domain}/api/reservation/detail/products/${orNo}`)
  console.log(res.data)
  return res.data
}
