import axios from "axios";


const domain = 'http://' + window.location.hostname + ( window.location.hostname.indexOf('armysseung.iptime.org') == -1 ? ':8080' : ':3258')


export const getRoomList = async () => {
  const res = await axios.get(`${ domain }/api/room/list`)
  return res.data
}

export const getRoomSellerListzx = async ( pmNo ) => {
  const res = await axios.get(`${ domain }/api/room/list/${ pmNo }`)
  return res.data
}
