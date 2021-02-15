import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store/auth';
import firebase from 'firebase/app'


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Main',
    meta: {layout: 'main'},
    component: ()=> import('../views/Main.vue')
  },
  {
    path: '/cart',
    name: 'ShopCart',
    meta: {layout: 'main'},
    component: ()=> import('../views/ShopCart.vue')
  },
  {
    path: '/about',
    name: 'About',
    meta: {layout: 'main'},
    component: ()=> import('../views/About.vue')
  },
  {
    path: '/help',
    name: 'Help',
    meta: {layout: 'main'},
    component: ()=> import('../views/Help.vue')
  },
  {
    path: '/login',
    name: 'Login',
    meta: {layout: 'main'},
    component: ()=> import('../views/Login.vue')
  },
  {
    path: '/a',
    name: 'AllGoods',
    meta: {layout: 'admin', admin: true},
    component: ()=> import('../views/AllGoods.vue')
  },
  {
    path: '/a/add',
    name: 'AddGood',
    meta: {layout: 'admin', admin: true},
    component: ()=> import('../views/AddGood.vue')
  },
  {
    path: '/a/orders',
    name: 'AllOrders',
    meta: {layout: 'admin', admin: true},
    component: ()=> import('../views/AllOrders.vue')
  },
  {
    path: '/a/orders/:id',
    name: 'OrderInfo',
    meta: {layout: 'admin', admin: true},
    component: ()=> import('../views/OrderInfo.vue')
  },
  {
    path: '/a/goods/:id',
    name: 'EditGood',
    meta: {layout: 'admin', admin: true},
    component: ()=> import('../views/EditGood.vue')
  },
  {
    path: '/a/gift',
    name: 'AddGift',
    meta: {layout: 'admin', admin: true},
    component: ()=> import('../views/AddGift.vue')
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})


export default router


router.beforeEach(async (to, from, next)=>{
  const currentUser = await firebase.auth().currentUser
  const requireAuth = to.matched.some(record => record.meta.admin)

  if(requireAuth && !currentUser){
     next('/login')
  }else{
    next()
  }
})
