import { defineStore } from 'pinia'
import axios from 'axios'
// import { router } from '@/router/index.js'
import IAuth from '@/data/interface/login'
import { Api } from '@/services/Api'

export const useAuthStore = defineStore({
  id: 'auth',
  state: () => ({
    token: '',
    errAuth: false
  }),
  persist: true,
  getters: {
    getToken (state) {
      return state.token
    },
    getErr (state) {
      return state.errAuth
    },
    api: function (state): Api {
      return new Api(state.token)
    }
  },
  actions: {
    async login (auth: IAuth) {
      return axios.post(`${process.env.VUE_APP_LOCAL_URL}/Authorization/GetToken`, {
        login: auth.login,
        password: auth.password
      })
    }
  }
})
