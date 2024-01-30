import { defineStore } from 'pinia'
import axios from 'axios'
import IAbonentItem from '@/data/interface/abonentItem'
import ISearch from '@/data/interface/search'
import dayjs from 'dayjs'
import IBlack from '@/data/interface/black'
import IGreen from '@/data/interface/green'
import IYellow from '@/data/interface/yellow'
import IUido from '@/data/interface/uido'
import IDisa from '@/data/interface/disa'
import ISpecialist from '@/data/interface/specialist'

export const useAbonentStore = defineStore({
  id: 'abonent',
  state: () => ({
    dataBlacklist: [] as IBlack[],
    dataGreenlist: [] as IGreen[],
    dataYellowlist: [] as IYellow[],
    dataUidolist: [] as IUido[],
    dataDisalist: [] as IDisa[],
    dataSpecialistlist: [] as ISpecialist[],
    maxPageBlack: 0,
    maxPageGreen: 0,
    maxPageYellow: 0,
    maxPageDisa: 0,
    maxPageUido: 0,
    maxPageSpecialist: 0,
    abonentListName: '',
    loader: false
  }),
  getters: {
    getBlackList (state) {
      return state.dataBlacklist
    },
    getYellowList (state) {
      return state.dataYellowlist
    },
    getGreenList (state) {
      return state.dataGreenlist
    },
    getDisaList (state) {
      return state.dataDisalist
    },
    getUidoList (state) {
      return state.dataUidolist
    },
    getSpecialistList (state) {
      return state.dataSpecialistlist
    },
    getAbnonentName (state) {
      return state.abonentListName
    }
  },
  actions: {
    addAbonentBlackListItem (data: never) {
      this.dataBlacklist.unshift(data)
    },
    addAbonentName (abonentListtName: string) {
      this.abonentListName = abonentListtName
    },
    async DeleteAbonent (id : string, abonentListName: string) {
      await axios.delete(`${process.env.VUE_APP_LOCAL_URL}/AbonentList/Delete${abonentListName}List/?id=${id}`)
        .then(() => {
          console.log('объект удален из BD')
        })
        .catch((error) => {
          console.log(error)
        })
    },
    async AddAbonent (abonentItem : IAbonentItem, abonentListName: string) :Promise<any> {
      this.loader = true
      await axios.post(`${process.env.VUE_APP_LOCAL_URL}/AbonentList/Add${abonentListName}ListItem`, abonentItem)
        .then((response) => {
          switch (abonentListName) {
            case 'Black':
              this.dataBlacklist.unshift(response.data.value)
              break
            case 'Green':
              this.dataGreenlist.unshift(response.data.value)
              break
            case 'Yellow':
              this.dataYellowlist.unshift(response.data.value)
              break
            case 'Uido':
              this.dataUidolist.unshift(response.data.value)
              break
            case 'Disa':
              this.dataDisalist.unshift(response.data.value)
              break
            case 'Specialist':
              this.dataSpecialistlist.unshift(response.data.value)
              break
          }
          this.loader = false
          return response.data.value
        })
        .catch((error) => {
          console.log(error)
        })
    },
    async UpdateAbonent (abonentItem : IAbonentItem, abonentListName: string) {
      this.loader = true
      await axios.post(`${process.env.VUE_APP_LOCAL_URL}/AbonentList/Update${abonentListName}ListItem`, abonentItem)
        .then((response) => {
          this.loader = false
        })
        .catch((error) => {
          console.log(error)
        })
    },
    async fetchSizeList (token: string, list: string) {
      await axios.get(`${process.env.VUE_APP_LOCAL_URL}/AbonentList/GetSizeList/?accessToken=${token}&List=${list}`)
        .then((response) => {
          switch (list) {
            case 'Black':
              this.maxPageBlack = response.data
              console.log(this.maxPageBlack, 'max')
              break
            case 'Green':
              this.maxPageGreen = response.data
              break
            case 'Yellow':
              this.maxPageYellow = response.data
              break
            case 'Uido':
              this.maxPageUido = response.data
              break
            case 'Disa':
              this.maxPageDisa = response.data
              break
            case 'Specialist':
              this.maxPageSpecialist = response.data
              break
          }
        })
        .catch((error) => {
          console.log(error)
        })
    },
    async fetchAbonent (abonentListName: string, token: string, sort: string, search: ISearch, pageSize: number, current: number) {
      this.loader = true
      try {
        const result = await axios.get(`${process.env.VUE_APP_LOCAL_URL}/AbonentList/Get${abonentListName}List/?accessToken=${token}&sort=${sort}&lastname=${search.searchLastName}&firstname=${search.searchFirstName}&middlename=${search.searchMiddleName}&phone=${search.searchPhone}&date=${search.searchDate}&comment=${search.searchComment}&title=${search.searchTitle}&PageSize=${pageSize}&pageNumber=${current}`)
        result.data.map((x: { createDateEdit: string; createDate: string | number | Date | dayjs.Dayjs | null | undefined }) => (x.createDateEdit = dayjs(x.createDate).format('DD.MM.YYYY HH:mm:ss')))
        switch (abonentListName) {
          case 'Black':
            this.dataBlacklist = result.data
            break
          case 'Green':
            this.dataGreenlist = result.data
            break
          case 'Yellow':
            this.dataYellowlist = result.data
            break
          case 'Uido':
            this.dataUidolist = result.data
            break
          case 'Disa':
            this.dataDisalist = result.data
            break
          case 'Specialist':
            this.dataSpecialistlist = result.data
            break
        }
        this.loader = false
        return result.data
      } catch (error) {
        console.log(error)
      } finally {
        this.loader = false
      }
    }
  }
})
