import { defineStore } from 'pinia'
import axios from 'axios'

export const useDateStore = defineStore({
  id: 'date',
  state: () => ({
    date: new Date(),
    dateUTC: ''
  }),
  getters: {
    getDate (state) {
      return state.date
    },
    getDateUTC (state) {
      return state.dateUTC
    }
  },
  actions: {
    async fetchDate () {
      return axios.get('http://worldtimeapi.org/api/timezone/Europe/London')
        .then((response) => {
          console.log(response.data, 'date')
          const time = response.data.utc_datetime + (3 * 60 * 60 * 1000)
          console.log(response.data.utc_datetime)
          console.log(time, 'uTC')
          const dateNow = (new Date()).toUTCString()
          console.log(dateNow, 'NOW')
        })
        .catch((error) => {
          console.log(error)
        })
    }
  }
})
