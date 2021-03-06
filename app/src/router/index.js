import Router from 'vue-router'
import Vue from 'vue'

import cognitoAuth from '@/cognito'

import DevicesInfo from '@/components/views/Devices/Info'
import DevicesList from '@/components/views/Devices/List'
import DevicesUpdate from '@/components/views/Devices/Update'
import EventsInfo from '@/components/views/Events/Info'
import EventsList from '@/components/views/Events/List'
import Home from '@/components/views/Home'

import ChangePassword from '@/components/views/Auth/ChangePassword'
import ConfirmPasswordReset from '@/components/views/Auth/ConfirmPasswordReset'
import CreateAccount from '@/components/views/Auth/CreateAccount'
import Login from '@/components/views/Auth/Login'
import RequestPasswordReset from '@/components/views/Auth/RequestPasswordReset'
import VerifyEmailAddress from '@/components/views/Auth/VerifyEmailAddress'

Vue.use(Router)

function requireAuth (to, from, next) {
  cognitoAuth.isAuthenticated((err, loggedIn) => {
    if (err) return next()
    if (!loggedIn) {
      next({
        path: '/login',
        query: { redirect: to.fullPath }
      })
    } else {
      next()
    }
  })
}

export default new Router({
  routes: [
    {
      path: '/account/change-password',
      component: ChangePassword,
      beforeEnter: requireAuth
    },
    {
      path: '/account/confirm-password-reset',
      component: ConfirmPasswordReset
    },
    {
      path: '/account/create-account',
      component: CreateAccount
    },
    {
      path: '/account/request-password-reset',
      component: RequestPasswordReset
    },
    {
      path: '/account/verify-email-address',
      component: VerifyEmailAddress
    },
    {
      name: 'devices',
      path: '/devices',
      component: DevicesList,
      beforeEnter: requireAuth
    },
    {
      path: '/devices/:id',
      component: DevicesInfo,
      beforeEnter: requireAuth
    },
    {
      path: '/devices/:id/edit',
      component: DevicesUpdate,
      beforeEnter: requireAuth
    },
    {
      name: 'events',
      path: '/events',
      component: EventsList,
      beforeEnter: requireAuth
    },
    {
      path: '/events/:id',
      component: EventsInfo,
      beforeEnter: requireAuth
    },
    {
      path: '/home',
      component: Home,
      beforeEnter: requireAuth
    },
    {
      path: '/login',
      component: Login
    },
    {
      path: '/logout',
      beforeEnter (to, from, next) {
        cognitoAuth.signout()
        next('/login')
      }
    },
    {
      path: '*',
      redirect: '/home'
    }
  ]
})
