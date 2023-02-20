// Composables
import { createRouter, createWebHistory } from 'vue-router'

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
      }
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
        path: 'qna/list',
        name: 'QnAListPage',
        component: () => import('@/views/my/MyQnAListPage.vue')
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router
