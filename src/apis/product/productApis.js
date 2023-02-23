import axios from "axios";


const domain = 'http://' + window.location.hostname + ( window.location.hostname.indexOf('armysseung.iptime.org') == -1 ? ':8080' : ':3258')


export const getSellerProductList = async ( seNo ) => {
  const res = await axios.get(`${ domain }/api/product/list/${ seNo }`)
  return res.data
}
