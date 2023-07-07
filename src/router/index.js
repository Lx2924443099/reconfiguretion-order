import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../components/Home'
import Main from '../views/Main'
import store from '../store'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'main',
    component: Main,
    redirect: '/home',
    children: [
      {
        path: '/home',
        name: 'home',
        component: Home
      },
      {
        path: '/order',
        name: 'Order',
        component: () => import("../components/Order.vue"),
        beforeEnter(to, from, next) {
          if (store.state.name !== '用户') {
            next();
          } else {
            router.push("/login")
          }
        },
      }
      ,
      {
        path: '/cart',
        name: 'Cart',
        component: () => import("../components/Cart.vue"),
        beforeEnter(to, from, next) {
          if (store.state.name !== '用户') {
            next();
          } else {
            router.push("/login")
          }
        },
      }
      ,
      {
        path: '/mine',
        name: 'Mine',
        component: () => import("../components/Mine.vue"),
        beforeEnter(to, from, next) {
          if (store.state.name !== '用户') {
            next();
          } else {
            router.push("/login")
          }
        },
      },
    ]
  },
  {
    path: '/login',
    name: "Login",
    component: () => import('../views/Home/Login.vue')
  },
  {
    path: '/register',
    name: "register",
    component: () => import('../views/Home/Register.vue')
  },
  {
    path:'/selectAddress',
    name:"selectAddress",
    component:()=>import("../views/Home/SelectAddress"),
    beforeEnter(to, from, next) {
      if (store.state.name !== '用户') {
        next();
      } else {
        router.push("/login")
      }
    },
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
