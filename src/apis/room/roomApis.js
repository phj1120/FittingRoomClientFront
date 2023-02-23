import axios from "axios";


const domain = 'http://' + window.location.hostname + ( window.location.hostname.indexOf('armysseung.iptime.org') == -1 ? ':8080' : ':3258')


export const getRoomList = async ( page ) => {
  const res = await axios.get(`${ domain }/api/room/list`, { params: { page: page || 1 } })
  return res.data
}

export const getRoomSellerList = async ( pmNo ) => {
  const res = await axios.get(`${ domain }/api/room/list/${ pmNo }`)
  return res.data
}
