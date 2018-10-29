import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/views/Home'
import CustomerDataTracking from '@/views/CustomerDataTracking'
import RequestOTTracking from '@/views/RequestOTTracking'
import ManageConfiguration from '@/views/ManageConfiguration'
import Login from '@/views/Login'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [{
      path: '/login',
      name: 'home',
      component: Home
    },
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/CustomerDataTracking',
      name: 'customerDataTracking',
      component: CustomerDataTracking
    },
    {
      path: '/RequestOTTracking',
      name: 'requestOTTracking',
      component: RequestOTTracking
    },
    {
      path: '/ManageConfiguration',
      name: 'manageConfiguration',
      component: ManageConfiguration
    },
    {
      path: '*',
      redirect: '/'
    },
  ]
})
