import { AuthenticationService } from './Api/AuthenticationService'
import { AbonentListService } from './Api/AbonentListService'
import { ReportsService } from './Api/ReportsService'
import { FiasApi } from '@/services/Api/FiasApi'
import { SmsService } from '@/services/Api/SmsService'
import { RecordService } from './Api/RecordService'

export class Api {
    authService: AuthenticationService
    abonenttService: AbonentListService
    reportsService: ReportsService
    fiasService: FiasApi
    smsService: SmsService
    recordService: RecordService
    constructor (token?: string) {
      this.authService = new AuthenticationService(token)
      this.abonenttService = new AbonentListService(token)
      this.reportsService = new ReportsService(token)
      this.fiasService = new FiasApi(token)
      this.smsService = new SmsService(token)
      this.recordService = new RecordService(token)
    }
}

const api = new Api()

export { api }
