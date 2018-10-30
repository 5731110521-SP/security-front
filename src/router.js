import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/views/Home'
import CustomerDataTracking from '@/views/CustomerDataTracking'
import RequestOTTracking from '@/views/RequestOTTracking'
import ManageConfiguration from '@/views/ManageConfiguration'
import ManageConfigurationAdd from '@/views/ManageConfigurationAdd'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [{
      path: '/login',
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
      path: '/ManageConfigurationAdd',
      name: 'manageConfigurationAdd',
      component: ManageConfigurationAdd,
      props: true
    },
    {
      path: '/ManageConfigurationEdit',
      name: 'manageConfigurationEdit',
      component: ManageConfigurationAdd,
      props: true
    },
    {
      path: '*',
      redirect: '/'
    },
  ]
})
