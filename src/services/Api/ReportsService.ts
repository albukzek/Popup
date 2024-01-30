import instance from './ApiInstance'
import { AxiosResponse } from 'axios'
import ApiBaseService from './ApiBaseService'

export class ReportsService extends ApiBaseService {
  constructor (token?: string) {
    super(token)
  }

  // async switchViewed () {
  //   return await instance
  //   .post(`${process.env.VUE_APP_LOCAL_URL}/Report/Get${report}Report`,)
  //   .then((response) => {
  //     return response.data
  //   })
  //   .catch((error) => {
  //     console.log('error', error)
  //     return null
  //   })
  // }
  async switchViewed (data : any) {
    return await instance
      .post(`api/Report/IsRead`, {
        IsRead: data.isRead,
        CallerId: data.callerId
      })
      .then((response) => {
        return response.data
      })
      .catch((error) => {
        console.log('error', error)
        return null
      })
  }

  async exportExcel (request: any, type: string):Promise<AxiosResponse<any> | null> {
    instance.defaults.responseType = 'blob'
    return await instance
      .post(`api/Report/Export${type}Report`, request)
      .then((response) => {
        const FILE = window.URL.createObjectURL(new Blob([response.data]))
        const docUrl = document.createElement('a')
        if (docUrl instanceof HTMLAnchorElement) {
          docUrl.href = FILE
        }
        docUrl.setAttribute('download', 'report.xlsx')
        document.body.appendChild(docUrl)
        docUrl.click()
        instance.defaults.responseType = 'json'
        return response
      })
      .catch((error) => {
        console.log(error)
        return null
      })
  }

  async selectReport (token: string) {
    return await instance
      .get(`api/Report/SelectReport`, {
        params: { accessToken: token },
        headers: { Authorization: `Bearer ${token}` }
      })
      .then((response) => {
        return response.data
      })
      .catch((error) => {
        console.log('error', error)
        return null
      })
    // this.select = result.data
    // return this.select
  }

  async fetchReport (report: string, data: any) {
    // this.data = []
    return await instance
      .post(`api/Report/Get${report}Report`, {
        StartTime: data.dateStart,
        EndTime: data.dateEnd,
        ReportType: data.selectReport.value,
        Reception: data.selectReception.value
      })
      .then((response) => {
        return response.data
      })
      .catch((error) => {
        console.log('error', error)
        return null
      })
    // this.data = result.data
    // return this.data
  }
}
