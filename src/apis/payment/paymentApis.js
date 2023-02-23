import axios from "axios";

const domain = 'http://' + window.location.hostname + ':8080'

export const requestPaymentReady = async (paymentReadyDTO) => {
  const paymentDTO = paymentReadyDTO.value

  let formData = new URLSearchParams();
  formData.append('cid', paymentDTO.cid);
  formData.append('partner_order_id', paymentDTO.partner_order_id);
  formData.append('partner_user_id', paymentDTO.partner_user_id);
  formData.append('item_name', paymentDTO.item_name);
  formData.append('quantity', paymentDTO.quantity);
  formData.append('total_amount', paymentDTO.total_amount);
  formData.append('tax_free_amount', paymentDTO.tax_free_amount);
  formData.append('approval_url', paymentDTO.approval_url);
  formData.append('cancel_url', paymentDTO.cancel_url);
  formData.append('fail_url', paymentDTO.fail_url);
  const res = await axios.post('https://kapi.kakao.com/v1/payment/ready', formData, {
    headers: {
      Authorization: 'KakaoAK 92049051ce44ee6c16f4b4ee1b061b2c'
    },
  })
  console.log('[paymentApis.requestPaymentReady]')
  console.log(res)

  return res.data
}

// 결제 승인 요청 백엔드 서버에 요청
export const requestPaymentApprove = async (paymentApproveDTO) => {
  console.log('requestPaymentApprove')
  console.log(paymentApproveDTO.value)
  const approveDTO = {};
  approveDTO.cid = paymentApproveDTO.value.cid
  approveDTO.tid = paymentApproveDTO.value.tid
  approveDTO.partner_order_id = paymentApproveDTO.value.partner_order_id
  approveDTO.partner_user_id = paymentApproveDTO.value.partner_user_id
  approveDTO.pg_token = paymentApproveDTO.value.pg_token

  const res = await axios.post('http://localhost:8080/api/payment/approve', approveDTO,
    {
      headers: {
        Authorization: 'KakaoAK 92049051ce44ee6c16f4b4ee1b061b2c'
      },
    }
  )

  console.log('[paymentApis.requestPaymentApprove]')
  console.log(res)

  return res.data
}

export const getPaymentDetail = async (caNo) => {
  const res = await axios.get(`${domain}/api/payment/${caNo}`)

  console.log('[paymentApis.getPayments]')
  console.log(res)
  return res.data
}

export const getAbleReservationTime = async (roNo, reservationDt) => {
  const res = await axios.get(`${domain}/api/payment/ableReservation`, {
    roNo: roNo, reservationDt: reservationDt
  })

  console.log('[paymentApis.getAbleReservationTime]')
  console.log(res)
  return res.data
}


