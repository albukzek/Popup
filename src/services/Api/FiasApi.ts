import ApiBaseService from './ApiBaseService'
import instance from './ApiInstance'
import { GetFullAddressRequest, SearchAddressRequest } from '@/data/interface/address'

export class FiasApi extends ApiBaseService {
  constructor (token?: string) {
    super(token)
  }

  searchAddress = async (request: SearchAddressRequest) => {
    try {
      return await instance.get('Fias/SearchAddress', { params: request })
        .then((response) => {
          return response.data
        })
    } catch (error) {
      console.log(error)
      return null
    }
  }

  getAddress = async (request: GetFullAddressRequest) => {
    try {
      return await instance.get('Fias/getFullAddress', { params: request })
        .then((response) => {
          return response.data
        })
    } catch (error) {
      console.log(error)
      return null
    }
  }

  getFullAddressTree = async (id: string) => {
    try {
      const params = { Id: id }
      return await instance.get('Fias/getFullAddressTree', { params })
        .then((response) => {
          return response.data
        })
    } catch (error) {
      console.log(error)
      return null
    }
  }
}
