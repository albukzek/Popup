import { defineStore } from 'pinia'
// import axios from 'axios'
// import IAbonentItem from '@/data/interface/abonentItem'
// import ISearch from '@/data/interface/search'
// import dayjs from 'dayjs'
// import IBlack from '@/data/interface/black'
// import IGreen from '@/data/interface/green'
// import IYellow from '@/data/interface/yellow'
// import IUido from '@/data/interface/uido'
// import IDisa from '@/data/interface/disa'
// import ISpecialist from '@/data/interface/specialist'
import { Api } from '../services/Api'

export const useStore = defineStore({
  id: 'store',
  state: () => ({

  }),
  getters: {
    api: function (): Api {
      return new Api('token')
    }
  },
  actions: {

  }
})
