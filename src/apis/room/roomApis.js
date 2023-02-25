import authAxios from "@/apis/common/authAxios";


const domain = 'http://' + window.location.hostname + ( window.location.hostname.indexOf('armysseung.iptime.org') == -1 ? ':8080' : ':3256')


export const getRoomList = async ( page ) => {
  const res = await authAxios.get(`${ domain }/api/room/list`, { params: { page: page || 1 } })
  return res.data
}

export const getRoomSellerList = async ( pmNo ) => {
  const res = await authAxios.get(`${ domain }/api/room/list/${ pmNo }`)
  return res.data
}
