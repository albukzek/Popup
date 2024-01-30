import { ref, computed } from 'vue'
import { IGetMessageRequest, IMessage, IGetMessagesRequest, IGetCallersRequest } from '@/data/interface/message'
import { useRouter } from 'vue-router'
import Caller, { statuses } from '@/data/Caller'
import { AddressElement } from '@/data/interface/address'
import { useAuthStore } from '@/stores/useAuth'
import { date } from 'quasar'
import dayjs from 'dayjs'
import OutgoingSms from '@/data/OutgoingSms'

export function messageLogic () {
  const selectedStatus = ref(statuses[0])
  const store = useAuthStore()
  const showAnnotationDialog = ref(false)
  const alertNoClassification = ref(false)
  const outgoingSmsText = ref('')
  const showOutgoingSmsPopup = ref(false)
  const router = useRouter()
  const rowCount = ref(0)
  const loading = ref(true)
  const messagesCount = ref([5, 10, 20, 50, 100])
  const pageCount = ref(1)
  const isEdited = ref(false)
  const callers = ref([] as Array<Caller>)
  const pagination = ref({
    page: 1,
    rowsPerPage: 5
  })
  const rows = ref([] as Array<IMessage>)
  const columns = [
    { name: 'type', align: 'center', label: 'Тип', field: 'type', sortable: true },
    { name: 'received', align: 'center', label: 'Дата и время', field: 'received', sortable: true },
    { name: 'number', align: 'center', label: 'Номер', field: 'senderPhoneNumber', sortable: true },
    { name: 'text', align: 'center', label: 'Текст сообщения', field: 'text', sortable: true },
    { name: 'fio', align: 'center', label: 'Ф.И.О.', field: 'fio', sortable: true },
    { name: 'address', align: 'center', label: 'Адрес абонента (почтовый или email)', field: 'address', sortable: true }
  ]
  const currentMessage = ref()
  const selectedCallerInfo = ref(new Caller())
  const selectedCallerFIO = ref({ value: '', label: 'Не выбрано' })

  // ФИО абонентов, звонивших с текущего входящего номера
  const callersFullNames = computed(() => {
    const fullNames = [{ value: '0', label: 'Новый абонент' }]
    callers.value.forEach(caller => {
      fullNames.push({ value: caller.id!, label: GetCallerFullName(caller) })
    })
    return fullNames
  })

  // Собираем полное имя абонента
  function GetCallerFullName (caller: Caller) {
    let callerFullName = ''
    if (caller.lastName !== undefined && caller.lastName.length > 0) {
      callerFullName += caller.lastName
    }
    if (caller.firstName !== undefined && caller.firstName.length > 0) {
      callerFullName += ' ' + caller.firstName
    }
    if (caller.patronymic !== undefined && caller.patronymic.length > 0) {
      callerFullName += ' ' + caller.patronymic
    }
    return callerFullName
  }

  // Триггер смены выбранного пользователя
  function selectCaller () {
    if (selectedCallerFIO.value.value === '0') {
      selectedCallerInfo.value = new Caller()
    } else {
      selectedCallerInfo.value = callers.value.find(caller => caller.id === selectedCallerFIO.value.value)!
    }
  }

  // emit от FiasAddress по сохранению названий адресных данных
  function saveAddressData (addressData: { [key: string]: AddressElement }) {
    if (addressData.Region) {
      selectedCallerInfo.value.subject = addressData.Region.name
    }
    if (addressData.Area) {
      selectedCallerInfo.value.area = addressData.Area.name
    }
    if (addressData.City) {
      selectedCallerInfo.value.city = addressData.City.name
    }
    if (addressData.Place) {
      selectedCallerInfo.value.locality = addressData.Place.name
    }
    if (addressData.PlanningStructure) {
      selectedCallerInfo.value.struct = addressData.PlanningStructure.name
    }
    if (addressData.Street) {
      selectedCallerInfo.value.street = addressData.Street.name
    }
    // _callerStore.$patch({
    //   selectedCaller: selectedCallerInfo.value
    // })
  }

  // emit от FiasAddress по сохранению fias-данных
  function saveFiasData (fiasAddress : any) {
    selectedCallerInfo.value.fiasAddress = fiasAddress.baseAddressID ?? ''
    selectedCallerInfo.value.houseNumber = fiasAddress.building ?? ''
    selectedCallerInfo.value.roomNumber = fiasAddress.room ?? ''

    selectedCallerInfo.value.foreignAddress = ''
    // _callerStore.$patch({
    //   selectedCaller: selectedCallerInfo.value
    // })
  }

  function updateSelectedName () {
    console.log(selectedCallerInfo.value)
  }

  const getCurrentMessage = async (id:any) => {
    loading.value = true
    const result = await store.api.smsService.getMessage({ id: id } as IGetMessageRequest)
    if (result?.caller != null) {
      selectedCallerInfo.value = result.caller
      isEdited.value = true
    }
    currentMessage.value = result?.incomingSMS
    selectedCallerInfo.value.editedMessage = JSON.parse(JSON.stringify(currentMessage.value.text))
    selectedCallerInfo.value.incommingSMSId = id
    const callersResult = await store.api.smsService.getCallers({ phoneNumber: currentMessage.value.senderPhoneNumber } as IGetCallersRequest)
    callers.value = callersResult!
    loading.value = false
  }

  const changeMessagesCount = (value: number) => {
    console.log(value)
    pageCount.value = Math.ceil(rows.value.length / value)
  }
  const getRows = async () => {
    loading.value = true
    rows.value = await store.api.smsService.getMessages({ startDate: null, endDate: null } as IGetMessagesRequest)

    rowCount.value = rows.value.length
    pageCount.value = Math.ceil(rows.value.length / pagination.value.rowsPerPage)
    loading.value = false
  }
  const onRow = async (evt:any, row:any) => {
    await router.push({
      name: 'MessageView',
      params: { messageId: row.id }
    })
  }
  const getDate = (received:Date) => {
    return date.formatDate(received, 'DD.MM.YYYY HH:mm')
  }

  function showOutgoingSms () {
    const currentDate = dayjs().format('DD.MM.YYYY HH:mm:ss')
    if (selectedStatus.value.value === 'Clarification') {
      outgoingSmsText.value = 'Для оперативного принятия мер по информации Вашего СМС-сообщения от ' + currentDate + ' сообщите сведения о Вас, о месте Вашего нахождения и/или о месте свершения событий. Укажите конкретные факты о'
    }
    showOutgoingSmsPopup.value = true
  }

  const saveOutgoingSms = async () => {
    const smsData = new OutgoingSms()
    smsData.text = outgoingSmsText.value
    smsData.receiverPhoneNumber = currentMessage.value.senderPhoneNumber
    smsData.senderPhoneNumber = currentMessage.value.receiverPhoneNumber
    await store.api.smsService.saveOutgoingSms(smsData)
  }

  const saveCard = async () => {
    selectedCallerInfo.value.incommingSMSId = currentMessage.value.id
    if (selectedStatus.value.value === statuses[0].value) {
      alertNoClassification.value = true
      return
    }
    await store.api.smsService.createMessageCard(selectedCallerInfo.value)
    await router.push({
      name: 'messagesTable'
    })
  }
  return {
    rows,
    columns,
    getRows,
    loading,
    onRow,
    rowCount,
    messagesCount,
    pageCount,
    pagination,
    changeMessagesCount,
    getCurrentMessage,
    currentMessage,
    selectedCallerInfo,
    selectedCallerFIO,
    callersFullNames,
    selectCaller,
    updateSelectedName,
    saveFiasData,
    saveAddressData,
    showAnnotationDialog,
    getDate,
    saveCard,
    statuses,
    selectedStatus,
    isEdited,
    alertNoClassification,
    outgoingSmsText,
    showOutgoingSms,
    showOutgoingSmsPopup,
    saveOutgoingSms
  }
}
