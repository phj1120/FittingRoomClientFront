import authAxios from "@/apis/common/authAxios";


const domain = 'http://' + window.location.hostname + ( window.location.hostname.indexOf('armysseung.iptime.org') == -1 ? ':8080' : ':3256')


export const getSellerProductList = async ( seNo ) => {
  const res = await authAxios.get(`${ domain }/api/product/list/${ seNo }`)
  return res.data
}

export const getProduct = async ( prNo ) => {
  const res = await authAxios.get(`${ domain }/api/product/detail/${ prNo }`)
  return res.data
}

export const getProductOption = async ( prNo ) => {
  const res = await authAxios.get(`${ domain }/api/product/option/${ prNo }`)
  return res.data
}
