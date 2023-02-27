import authAxios from "@/apis/common/authAxios";


const domain = 'http://' + window.location.hostname + ( window.location.hostname.indexOf('armysseung.iptime.org') == -1 ? ':8080' : ':3258')


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

export const insertProductCart = async ( cartInfo ) => {
  console.log(cartInfo)
  const res = await authAxios.post(`${ domain }/api/product/cart`, cartInfo)
  return res.data
}
