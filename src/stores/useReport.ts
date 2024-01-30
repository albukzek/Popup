import { defineStore } from 'pinia'
import axios from 'axios'
import { date } from 'quasar'

export const useReportStore = defineStore({
  id: 'report',
  state: () => ({
    data: [],
    select: [],
    reportName: '',
    loading: false,
    intervalStart: '',
    intervalEnd: '',
    reception: ''
  }),
  getters: {
    getIntervalStart (state) {
      return state.intervalStart
    },
    getIntervalEnd (state) {
      return state.intervalEnd
    },
    getReception (state) {
      return state.reception
    },
    getReport (state) {
      return state.data
    },
    getReportName (state) {
      return state.reportName
    }
  },
  actions: {
    addIntervalStart (interval: string) {
      this.intervalStart = interval
    },
    addIntervalEnd (interval: string) {
      this.intervalEnd = interval
    },
    addReception (reception: string) {
      this.reception = reception
    },
    addReport (data: Array<never>) {
      this.data = data
    },
    addReportName (reportName: string) {
      this.reportName = reportName
    },
    async exportExcel (type: string) {
      axios.defaults.responseType = 'blob'
      await axios.post(`${process.env.VUE_APP_LOCAL_URL}/Report/Export${type}Report`, {
        ArrDetails: this.data
      })
        .then((response) => {
          const FILE = window.URL.createObjectURL(new Blob([response.data]))
          const docUrl = document.createElement('a')
          if (docUrl instanceof HTMLAnchorElement) {
            docUrl.href = FILE
          }
          docUrl.setAttribute('download', 'report.xlsx')
          document.body.appendChild(docUrl)
          docUrl.click()
          return response
        })
        .catch((error) => {
          console.log(error)
          return null
        })
      axios.defaults.responseType = 'json'
    },
    async selectReport (token: string) {
      try {
        const result = await axios.get(`${process.env.VUE_APP_LOCAL_URL}/Report/SelectReport`, {
          params: { accessToken: token },
          headers: { Authorization: `Bearer ${token}` }
        })
        this.select = result.data
        return this.select
      } catch (error) {
        console.log(error)
      }
    },
    // async fetchReportList() {
    //   try {
    //     await axios.get(`${process.env.VUE_APP_LOCAL_URL}/Report/ReportList`, {
    //       params: { accessToken: token },
    //       headers: { Authorization: `Bearer ${token}` }
    //     })
    //     this.select = result.data
    //     return this.select
    //   } catch (error) {
    //     console.log(error)
    //   }
    // },
    async fetchReport (report: string, data: any) {
      this.data = []
      this.loading = true
      try {
        const result = await axios.post(`${process.env.VUE_APP_LOCAL_URL}/Report/Get${report}Report`, {
          StartTime: data.dateStart,
          EndTime: data.dateEnd,
          ReportType: data.selectReport.value,
          Reception: data.selectReception.value
        })
        this.data = result.data
        this.loading = false
        return this.data
      } catch (error) {
        console.log(error)
      } finally {
        this.loading = false
      }
    }
  }
})
