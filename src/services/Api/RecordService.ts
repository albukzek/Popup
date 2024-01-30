import instance from './ApiInstance'
import ApiBaseService from './ApiBaseService'

export class RecordService extends ApiBaseService {
  constructor (token?: string) {
    super(token)
  }

  fetchRecordList (token :string) {
    return instance
      .get(`Record/GetRecordsList/`)
      .then((response) => {
        return response.data
      })
      .catch((error) => {
        console.log(error)
      })
  }

  dowloadRecord (callId: string) : Promise<any> {
    return instance
      .get(`Record/GetRecord/?CallId=${callId}`)
      .then((response) => {
        // window.open('http://' + response.data.value.fileURL, '_blank')
        console.log(response.data, 'otvet')
        return response.data
      })
      .catch((error) => {
        console.log(error)
      })
  }
}
