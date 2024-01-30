import instance from './ApiInstance'
import ApiBaseService from './ApiBaseService'
import { IGetCallersRequest, IGetMessageRequest, IGetMessagesRequest, SMSViewModal } from '@/data/interface/message'
import Caller from '@/data/Caller'
import { Notify } from 'quasar'
import OutgoingSms from '@/data/OutgoingSms'

export class SmsService extends ApiBaseService {
  constructor (token?: string) {
    super(token)
  }

  getMessages = async (request: IGetMessagesRequest) => {
    try {
      return await instance.get('Sms/GetSmsList', { params: request })
        .then((response) => {
          return response.data.value
        })
    } catch (error) {
      console.log(error)
      return null
    }
  }

  getMessage = async (request: IGetMessageRequest):Promise<SMSViewModal | null> => {
    try {
      return await instance.get('Sms/GetSmsCard', { params: request })
        .then((response) => {
          return response.data.value
        })
    } catch (error) {
      console.log(error)
      return null
    }
  }

  createMessageCard = async (request: Caller) => {
    try {
      return await instance.put('Sms/SaveCallerSMS', request)
        .then((response) => {
          Notify.create({ message: 'Карточка сохранена', color: 'green' })
          return response.data.value
        })
    } catch (error) {
      console.log(error)
      return null
    }
  }

  getCallers = async (request: IGetCallersRequest):Promise<Array<Caller> | null> => {
    try {
      return await instance.get('Caller/GetCallers', { params: request })
        .then((response) => {
          return response.data.callers
        })
    } catch (error) {
      console.log(error)
      return null
    }
  }

  saveOutgoingSms = async (outgoingSms: OutgoingSms) => {
    try {
      return await instance.put('Sms/SaveOutgoingSms', outgoingSms)
        .then((response) => {
          Notify.create({ message: 'Исходящее СМС сохранено.', color: 'green' })
          return response.data.value
        })
    } catch (error) {
      console.log(error)
      return null
    }
  }
}
