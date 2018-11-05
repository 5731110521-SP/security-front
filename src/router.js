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
      path: '/customerDataTracking',
      name: 'customerDataTracking',
      component: CustomerDataTracking
    },
    {
      path: '/requestOTTracking',
      name: 'requestOTTracking',
      component: RequestOTTracking
    },
    {
      path: '/manageConfiguration',
      name: 'manageConfiguration',
      component: ManageConfiguration,
    },
    {
      path: '/manageConfiguration/add',
      name: 'manageConfigurationAdd',
      component: ManageConfigurationAdd,
      props: true
    },
    {
      path: '/manageConfiguration/edit',
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