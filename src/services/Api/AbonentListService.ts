import instance from './ApiInstance'
import IAbonentItem from '@/data/interface/abonentItem'
import ISearch from '@/data/interface/search'
import ApiBaseService from './ApiBaseService'

import dayjs from 'dayjs'
import IBlack from '@/data/interface/black'
import IGreen from '@/data/interface/green'
import IYellow from '@/data/interface/yellow'
import IUido from '@/data/interface/uido'
import IDisa from '@/data/interface/disa'
import ISpecialist from '@/data/interface/specialist'
import IUniversal from '@/data/interface/universal'
export class AbonentListService extends ApiBaseService {
  constructor (token?: string) {
    super(token)
  }

  async DeleteAbonent (id : string, abonentListName: string) {
    await instance
      .delete(`AbonentList/Delete${abonentListName}List/?id=${id}`)
      .then(() => {
        console.log('объект удален из BD')
      })
      .catch((error) => {
        console.log(error)
      })
  }

  async AddAbonent (abonentItem : IAbonentItem, abonentListName: string) :Promise<IUniversal> {
    return await instance
      .post(`AbonentList/Add${abonentListName}ListItem`, abonentItem)
      .then((response) => {
        return response.data.value
      })
      .catch((error) => {
        console.log(error)
      })
  }

  async UpdateAbonent (abonentItem : IAbonentItem, abonentListName: string) {
    await instance
      .post(`AbonentList/Update${abonentListName}ListItem`, abonentItem)
      .then((response) => {
        console.log(response, 'update')
      })
      .catch((error) => {
        console.log(error)
      })
  }

  async fetchSizeList (list: string) : Promise<any> {
    return await instance
      .get(`AbonentList/GetSizeList/?List=${list}`)
      .then((response) => {
        return response.data
      })
      .catch((error) => {
        console.log(error)
      })
  }

  async fetchAbonent (abonentListName: string, sort: string, search: ISearch, pageSize: number, current: number) : Promise<any> {
    console.log(current, 'current page')
    return await instance
      .get(`AbonentList/Get${abonentListName}List/?sort=${sort}&lastname=${search.searchLastName}&firstname=${search.searchFirstName}&middlename=${search.searchMiddleName}&phone=${search.searchPhone}&date=${search.searchDate}&comment=${search.searchComment}&title=${search.searchTitle}&PageSize=${pageSize}&pageNumber=${current}`)
      .then((response) => {
        return response.data
      })
      .catch((error) => {
        console.log('error', error)
        return null
      })
      // result.data.map((x: { createDateEdit: string; createDate: string | number | Date | dayjs.Dayjs | null | undefined }) => (x.createDateEdit = dayjs(x.createDate).format('DD.MM.YYYY HH:mm:ss')))
      // return result.data
  }
}
