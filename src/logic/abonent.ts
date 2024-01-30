import { ref, reactive, watch, onMounted, computed } from 'vue'
// import { useAbonentStore } from '@/stores/useAbonent'
// import { storeToRefs } from 'pinia'
import ISearch from '@/data/interface/search'
import IBlack from '@/data/interface/black'
import IGreen from '@/data/interface/green'
import IYellow from '@/data/interface/yellow'
import IDisa from '@/data/interface/disa'
import IUido from '@/data/interface/uido'
import ISpecialist from '@/data/interface/specialist'
import { useStore } from '@/stores/useStore'
import dayjs from 'dayjs'

const switchAdd = ref(false)
// const maxPage = ref()
const loading = ref(false)
const maxPage = reactive({
  maxPageBlack: 1,
  maxPageGreen: 1,
  maxPageYellow: 1,
  maxPageDisa: 1,
  maxPageUido: 1,
  maxPageSpecialist: 1
})
// const cur = ref(1)
const pageSize = ref(15)
const dataAbonentList = reactive({
  dataBlacklist: [] as IBlack[],
  dataGreenlist: [] as IGreen[],
  dataYellowlist: [] as IYellow[],
  dataUidolist: [] as IUido[],
  dataDisalist: [] as IDisa[],
  dataSpecialistlist: [] as ISpecialist[]
})
// const currentPage = reactive({
//   currentPageBlack: 1,
//   currentPageGreen: 1,
//   currentPageYellow: 1,
//   currentPageDisa: 1,
//   currentPageUido: 1,
//   currentPageSpecialist: 1
// })

function serviceAbonent () {
  const store = useStore()
  const current = ref(0)

  const maxPageBlack = ref(0)
  const maxPageGreen = ref(0)
  const maxPageYellow = ref(0)
  const maxPageDisa = ref(0)
  const maxPageUido = ref(0)
  const maxPageSpecialist = ref(0)
  const toogleSort = reactive({
    sortLastName: false,
    sortFirstName: false,
    sortMiddleName: false,
    sortPhone: false,
    sortDate: false,
    sortDepartment: false,
    sortTitle: false
  })
  const search = reactive({
    searchLastName: '',
    searchFirstName: '',
    searchMiddleName: '',
    searchDate: '',
    searchPhone: '',
    searchComment: '',
    searchTitle: ''
  })
  const newItemBlack :IBlack = reactive({
    edit: false,
    // status: false,
    firstName: '',
    lastName: '',
    middleName: '',
    createDate: '',
    phoneNumber: ''
  })
  const newItemGreen :IGreen = reactive({
    edit: false,
    firstName: '',
    lastName: '',
    middleName: '',
    createDate: '',
    phoneNumber: ''
  })
  const newItemYellow :IYellow = reactive({
    edit: false,
    firstName: '',
    lastName: '',
    middleName: '',
    createDate: '',
    phoneNumber: ''
  })
  const newItemDisa :IDisa = reactive({
    edit: false,
    phoneNumber: '',
    comment: ''
  })
  const newItemUido :IUido = reactive({
    edit: false,
    sstu: false,
    title: '',
    phoneNumber: ''
  })
  const newItemSpecialist :ISpecialist = reactive({
    edit: false,
    sstu: false,
    firstName: '',
    lastName: '',
    middleName: '',
    department: '',
    post: '',
    prefix: '',
    phoneNumber: '',
    redirect: false
  })
  const textSearch = ref([])
  // let temporaryArray:IBlack[] | IGreen[] | IYellow[] | IDisa[] | IUido[] | ISpecialist[] = []

  const inputsStates = ref(false)
  // let responseItem = reactive({})
  const toogle = ref(true)
  // const { dataBlacklist, dataGreenlist, dataYellowlist, dataDisalist, dataUidolist, dataSpecialistlist } = storeToRefs(store)
  function getColumns (list :string) {
    switch (list) {
      case 'Black':
        return [
          { name: 'lastName', label: 'lastName', field: 'Фамилия', align: 'left', sortable: true },
          { name: 'firstName', label: 'firstName', field: 'Имя', align: 'left' },
          { name: 'middleName', label: 'middleName', field: 'Отчество', align: 'left' },
          // { name: 'status', label: 'status', field: 'Статус', align: 'left' },
          { name: 'phoneNumber', label: 'phoneNumber', field: 'Телефон', align: 'center' },
          { name: 'createDate', label: 'createDate', field: 'Дата добавления', align: 'center' }
        ]
        break
      case 'Green':
        return [
          { name: 'lastName', label: 'lastName', field: 'Фамилия', align: 'left', sortable: true },
          { name: 'firstName', label: 'firstName', field: 'Имя', align: 'left' },
          { name: 'middleName', label: 'middleName', field: 'Отчество', align: 'left' },
          { name: 'phoneNumber', label: 'phoneNumber', field: 'Телефон', align: 'center' },
          { name: 'createDate', label: 'createDate', field: 'Дата добавления', align: 'center' }
        ]
        break
      case 'Yellow':
        return [
          { name: 'lastName', label: 'lastName', field: 'Фамилия', align: 'left', sortable: true },
          { name: 'firstName', label: 'firstName', field: 'Имя', align: 'left' },
          { name: 'middleName', label: 'middleName', field: 'Отчество', align: 'left' },
          { name: 'phoneNumber', label: 'phoneNumber', field: 'Телефон', align: 'center' },
          { name: 'createDate', label: 'createDate', field: 'Дата добавления', align: 'center' }
        ]
        break
      case 'Disa':
        return [
          { name: 'phoneNumber', label: 'phoneNumber', field: 'Номер', align: 'left' },
          { name: 'comment', label: 'comment', field: 'Комментарий', align: 'left' }
        ]
        break
      case 'Uido':
        return [
          { name: 'sstu', label: 'sstu', field: 'ССТУ', align: 'left' },
          { name: 'title', label: 'title', field: 'Название', align: 'left' },
          { name: 'phoneNumber', label: 'phoneNumber', field: 'Телефон', align: 'left' }
        ]
        break
      case 'Specialist':
        return [
          { name: 'sstu', label: 'surname', field: 'ССТУ', align: 'left' },
          { name: 'lastName', label: 'name', field: 'Фамилия', align: 'left' },
          { name: 'firstName', label: 'patronymic', field: 'Имя', align: 'left' },
          { name: 'middleName', label: 'department', field: 'Отчество', align: 'left' },
          { name: 'department', label: 'jobtitle', field: 'Департамент', align: 'left' },
          { name: 'post', label: 'prefix', field: 'Должность', align: 'left' },
          { name: 'prefix', label: 'phone', field: 'Префикс', align: 'center' },
          { name: 'phoneNumber', label: 'redirect', field: 'Телефон', align: 'center' },
          { name: 'redirect', label: 'redirect', field: 'Перевод с уведомл.', align: 'center' }
        ]
        break
    }
  }

  function addAbonent () {
    switchAdd.value = true
  }

  async function SizeList (token :string, list :string) {
    const data = await store.api.abonenttService.fetchSizeList(list)
    switch (list) {
      case 'Black':
        maxPageBlack.value = data
        break
      case 'Green':
        maxPageGreen.value = data
        break
      case 'Yellow':
        maxPageYellow.value = data
        break
      case 'Uido':
        maxPageUido.value = data
        break
      case 'Disa':
        maxPageDisa.value = data
        break
      case 'Specialist':
        maxPageSpecialist.value = data
        break
    }
  }
  async function fetchList (list :string, sort :string, search :ISearch, pageSize :number, currentPage :number) {
    const data = await store.api.abonenttService.fetchAbonent(list, sort, search, pageSize, currentPage)
    data.map((x: { createDateEdit: string; createDate: string | number | Date | dayjs.Dayjs | null | undefined }) => (x.createDateEdit = dayjs(x.createDate).format('DD.MM.YYYY HH:mm:ss')))
    switch (list) {
      case 'Black':
        dataAbonentList.dataBlacklist = data
        break
      case 'Green':
        dataAbonentList.dataGreenlist = data
        break
      case 'Yellow':
        dataAbonentList.dataYellowlist = data
        break
      case 'Uido':
        dataAbonentList.dataUidolist = data
        break
      case 'Disa':
        dataAbonentList.dataDisalist = data
        break
      case 'Specialist':
        dataAbonentList.dataSpecialistlist = data
        break
    }
  }

  async function sortByName (list :string) {
    toogleSort.sortLastName = !toogleSort.sortLastName
    const toogleName = toogleSort.sortLastName ? 'LastName' : 'LastNameDesc'
    sortUpdate(list, toogleName)
  }
  async function sortByFirstName (list :string) {
    toogleSort.sortFirstName = !toogleSort.sortFirstName
    const toogleName = toogleSort.sortFirstName ? 'FirstName' : 'FirstNameDesc'
    sortUpdate(list, toogleName)
  }
  async function sortByMiddleName (list :string) {
    toogleSort.sortMiddleName = !toogleSort.sortMiddleName
    const toogleName = toogleSort.sortMiddleName ? 'MiddleName' : 'MiddleNameDesc'
    sortUpdate(list, toogleName)
  }
  async function sortByPhone (list :string) {
    toogleSort.sortPhone = !toogleSort.sortPhone
    const toogleName = toogleSort.sortPhone ? 'PhoneNumber' : 'PhoneNumberDesc'
    sortUpdate(list, toogleName)
  }
  async function sortByNameDate (list :string) {
    toogleSort.sortDate = !toogleSort.sortDate
    const toogleName = toogleSort.sortDate ? 'CreateDate' : 'CreateDateDesc'
    sortUpdate(list, toogleName)
  }
  async function sortByDepartment (list :string) {
    toogleSort.sortDepartment = !toogleSort.sortDepartment
    const toogleName = toogleSort.sortDepartment ? 'Department' : 'DepartmentDesc'
    sortUpdate(list, toogleName)
  }
  async function sortByTitle (list :string) {
    toogleSort.sortTitle = !toogleSort.sortTitle
    const toogleName = toogleSort.sortTitle ? 'Title' : 'TitleDesc'
    sortUpdate(list, toogleName)
  }

  async function sortUpdate (list :string, toogleName :string) {
    switch (list) {
      case 'Black':
        await fetchList(list, toogleName, search, pageSize.value, current.value)
        dataAbonentList.dataBlacklist.map(x => (x.edit = false))
        break
      case 'Green':
        await fetchList(list, toogleName, search, pageSize.value, current.value)
        dataAbonentList.dataGreenlist.map(x => (x.edit = false))
        break
      case 'Yellow':
        await fetchList(list, toogleName, search, pageSize.value, current.value)
        dataAbonentList.dataYellowlist.map(x => (x.edit = false))
        break
      case 'Disa':
        await fetchList(list, toogleName, search, pageSize.value, current.value)
        dataAbonentList.dataDisalist.map(x => (x.edit = false))
        break
      case 'Uido':
        await fetchList(list, toogleName, search, pageSize.value, current.value)
        dataAbonentList.dataUidolist.map(x => (x.edit = false))
        break
      case 'Specialist':
        await fetchList(list, toogleName, search, pageSize.value, current.value)
        dataAbonentList.dataSpecialistlist.map(x => (x.edit = false))
        break
    }
  }

  async function remove (data: any, id :string, list :string, defaultSort: string) {
    await store.api.abonenttService.DeleteAbonent(id, list)
    // dataBlacklist.value = dataBlacklist.value.filter(x => x.itemId !== id)
    await actualization(data, list, defaultSort, search, pageSize.value, current.value)
  }
  async function add (data: any, newItem :any, list: string, defaultSort: string) {
    switchAdd.value = false
    const date = new Date()
    const timeStamp = date.getTime()
    newItem.createDate = String(timeStamp)
    // const dataDayJS = dayjs(newItem.createDate).format('DD.MM.YYYY HH:mm:ss')
    const responseItem = await store.api.abonenttService.AddAbonent(newItem, list)
    switch (list) {
      case 'Black':
        dataAbonentList.dataBlacklist.unshift(responseItem)
        break
      case 'Green':
        dataAbonentList.dataGreenlist.unshift(responseItem)
        break
      case 'Yellow':
        dataAbonentList.dataYellowlist.unshift(responseItem)
        break
      case 'Uido':
        dataAbonentList.dataUidolist.unshift(responseItem)
        break
      case 'Disa':
        dataAbonentList.dataDisalist.unshift(responseItem)
        break
      case 'Specialist':
        dataAbonentList.dataSpecialistlist.unshift(responseItem)
        break
    }
    await actualization(data, list, defaultSort, search, pageSize.value, current.value)
    for (const member in newItem) delete newItem[member]
  }

  function cancel (newItem: any) {
    switchAdd.value = false
    for (const member in newItem) delete newItem[member]
  }
  async function maxCountPage (pageSize :number, list: string) {
    await SizeList('token', list)
    switch (list) {
      case 'Black':
        maxPage.maxPageBlack = Math.ceil(maxPageBlack.value / pageSize)
        break
      case 'Green':
        maxPage.maxPageGreen = Math.ceil(maxPageGreen.value / pageSize)
        break
      case 'Yellow':
        maxPage.maxPageYellow = Math.ceil(maxPageYellow.value / pageSize)
        break
      case 'Disa':
        maxPage.maxPageDisa = Math.ceil(maxPageDisa.value / pageSize)
        break
      case 'Uido':
        maxPage.maxPageUido = Math.ceil(maxPageUido.value / pageSize)
        break
      case 'Specialist':
        maxPage.maxPageSpecialist = Math.ceil(maxPageSpecialist.value / pageSize)
        break
    }
  }

  async function actualization (data: any, list :string, sort :string, search :ISearch, pageSize :number, currentPage :number) {
    data.value = await fetchList(list, sort, search, pageSize, currentPage)
    await maxCountPage(pageSize, list)
  }

  return {
    remove,
    cancel,
    add,
    loading,
    // columns,
    textSearch,
    // countInput,
    inputsStates,
    addAbonent,
    // removeAbonent,
    newItemBlack,
    newItemGreen,
    newItemYellow,
    newItemUido,
    newItemDisa,
    newItemSpecialist,
    switchAdd,
    // newItemAdd,
    // dataBlacklist,
    // dataGreenlist,
    // dataYellowlist,
    // dataDisalist,
    // dataUidolist,
    // dataSpecialistlist,
    dataAbonentList,
    sortByName,
    sortByFirstName,
    sortByMiddleName,
    sortByPhone,
    sortByNameDate,
    sortByDepartment,
    sortByTitle,
    search,
    maxPage,
    store,
    pageSize,
    maxCountPage,
    getColumns,
    toogleSort,
    current,
    fetchList
  }
}
export default serviceAbonent
