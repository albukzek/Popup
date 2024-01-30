import instance from './ApiInstance'

export default class ApiBaseService {
  accessToken?: string

  constructor (token?: string) {
    this.accessToken = token
    // this.setToken()
  }

  // setToken (): void {
  //   if (this.accessToken) {
  //     instance.defaults.headers.common.Authorization = 'Bearer ' + this.accessToken
  //   }
  // }
}
