import axios from "axios";

const domain = 'http://' + window.location.hostname + ( window.location.hostname.indexOf('armysseung.iptime.org') == -1 ? ':8080' : ':3256')

/**
 * 장바구니 목록 조회
 **/
export const getCartList = async (coNo) => {
  const res = await axios.get(`${domain}/api/consumer/cart/${coNo}`)
  return res.data
}

/**
 * 장바구니 상품 조회
 **/
export const getCartProducts = async (caNo) => {
  const res = await axios.get(`${domain}/api/consumer/cart/products/${caNo}`)
  return res.data
}

export const getReservationItemListApi = async (caNo) => {
  const res = await axios.get(`${domain}/api/reservation/detail/products/${caNo}`)
  return res.data
}


