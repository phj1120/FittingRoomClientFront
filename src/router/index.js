import {createRouter, createWebHistory} from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'HomePage',
    redirect: '/dress'
  },
  {
    path: '/dress',
    name: 'DressPage',
    redirect: '/dress/list',
    children: [
      {
        path: 'list',
        name: 'DressListPage',
        component: () => import('@/views/dress/DressListPage.vue')
      },
      {
        path: 'detail/:pmNo',
        name: 'DressDetailPage',
        component: () => import('@/views/dress/DressDetailPage.vue'),
        props: true
      }
    ]
  },
  {
    path: '/cart',
    name: 'CartPage',
    redirect: '/cart/list',
    children: [
      {
        path: 'list',
        name: 'CartListPage',
        component: () => import('@/views/cart/CartListPage.vue')
      },
      {
        path: 'products/:caNo',
        name: 'CartProductPage',
        component: () => import('@/views/cart/CartProductPage.vue')
      },
    ]
  },
  {
    path: '/inquiry',
    name: 'InquiryPage',
    redirect: '/inquiry/list',
    children: [
      {
        path: 'list',
        name: 'InquiryListPage',
        component: () => import('@/views/inquiry/InquiryListPage.vue')
      },
      {
        path: 'detail/:inNo',
        name: 'InquiryDetailPage',
        component: () => import('@/views/inquiry/InquiryDetailPage.vue')
      },
      {
        path: 'update/:inNo',
        name: 'InquiryUpdatePage',
        component: () => import('@/views/inquiry/InquiryUpdatePage.vue')
      },
    ]
  },
  {
    path: '/my',
    name: 'MyPage',
    redirect: '/my/profile',
    children: [
      {
        path: 'profile',
        name: 'MyProfilePage',
        component: () => import('@/views/my/MyProfilePage.vue')
      },
      {
        path: 'order/list',
        name: 'OrderListPage',
        component: () => import('@/views/my/MyOrderListPage.vue')
      },
      {
        path: 'order/detail',
        name: 'OrderDetailPage',
        component: () => import('@/views/my/MyOrderDetailPage.vue'),
        props:true
      },
      {
        path: 'qna/list',
        name: 'QnAListPage',
        component: () => import('@/views/my/MyQnAListPage.vue')
      }
    ]
  },
  {
    path: '/login',
    name: 'LoginPage',
    component: () => import('@/views/common/LoginPage.vue')
  },
  {
    path: '/register',
    name: 'RegisterPage',
    component: () => import('@/views/common/RegisterPage.vue')
  },
  {
    path: '/payment',
    name: 'PaymentPage',
    component: () => import('@/views/payment/PaymentPage.vue')
  },
  {
    path: '/payment/success',
    name: 'PaymentSuccessPage',
    component: () => import('@/views/payment/PaymentSuccessPage.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router
