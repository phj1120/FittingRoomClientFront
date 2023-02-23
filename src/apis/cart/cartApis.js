import axios from "axios";

const domain = 'http://' + window.location.hostname + ( window.location.hostname.indexOf('armysseung.iptime.org') == -1 ? ':8080' : ':3258')

/**
 * 장바구니 목록 조회
 **/
export const getCartList = async (coNo) => {
  const res = await axios.get(`${domain}/api/consumer/cart/${coNo}`)
  return res.data
}

/**
 * 장바구니 삭제
 **/
export const deleteCart = async (caNo) => {
  const res = await axios.delete(`${domain}/api/consumer/cart/${caNo}`)
  return res.data
}

/**
 * 장바구니 상품 조회
 **/
export const getCartProducts = async (caNo) => {
  const res = await axios.get(`${domain}/api/consumer/cart/products/${caNo}`)
  return res.data
}

/**
 * 장바구니 상품 삭제
 **/
export const deleteCartProduct = async (cpNp) => {
  const res = await axios.delete(`${domain}/api/consumer/cart/product/${cpNp}`)
  return res.data
}


