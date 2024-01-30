import axios, { AxiosResponse } from 'axios'

const instance = axios.create({
  // baseURL: process.env.API_URL
  // baseURL: 'http://10.10.104.61/sio.test/156/Reception.Backend/'
  baseURL: process.env.VUE_APP_LOCAL_URL
})

instance.defaults.headers.common['Access-Control-Allow-Origin'] = process.env.VUE_APP_LOCAL_URL!
instance.defaults.headers.common['Access-Control-Allow-Credentials'] = 'true'
instance.defaults.headers.common['Access-Control-Allow-Methods'] = 'GET, POST, PUT, DELETE, OPTIONS'
instance.defaults.headers.common['Access-Control-Allow-Headers'] = 'Origin, Content-Type, X-Auth-Token'
instance.defaults.withCredentials = true
instance.defaults.xsrfCookieName = 'csrftoken'
instance.defaults.xsrfHeaderName = 'X-CSRFTOKEN'

// response interceptors (turn off on prod)
instance.interceptors.response.use(function (response: AxiosResponse): AxiosResponse {
  console.log(
    '%c AXIOS request ' + response.config.method?.toUpperCase() + ' ' + response.config.url,
    'background: #222; color: #bada55'
  )
  if (response.config.params) {
    console.log('Request params: ')
    console.log(response.config.params)
  }
  if (response.config.data) {
    console.log('Request data: ')
    console.log(JSON.parse(response.config.data))
  }
  if (response.data) {
    console.log('Response: ')
    console.log(response.data)
  }
  return response
})

export default instance
