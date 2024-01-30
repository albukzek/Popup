// Класс для описания карточки абонента (РСС-1.2)

export const statuses = [
  { label: 'Не выбрано', value: 'NotSelected' },
  { label: 'Обращение для рассмотрения', value: 'Review' },
  { label: 'Уточнение', value: 'Clarification' },
  { label: 'Сообщение с направлением', value: 'WithRedirection' },
  { label: 'Повторное сообщение с направлением', value: 'RepeatedWithRedirecion' },
  { label: 'Хулиганское/Угрозы', value: 'Hooligan' },
  { label: 'Реклама (СПАМ)', value: 'Spam' },
  { label: 'Поздравления / Приглашения / Прочее', value: 'Congratulations' },
  { label: 'Срочное сообщение', value: 'Urgent' },
  { label: 'В дело', value: 'IntoAction' },
  { label: 'Запрос  информации', value: 'InformationRequest' },
  { label: 'Запрос информации с направлением', value: 'InformationRequestWithRedirection' }
]

class Caller {
  id: string|null
  incommingSMSId: string|null
  lastName: string
  firstName: string
  patronymic: string
  phoneNumber: string
  faxNumber: string
  annotationList: string[]
  annotation: string
  // адрес
  russiaCountry: boolean
  fiasAddress: string
  foreignAddress: string // manual input field for non-ru address
  subject: string
  area: string
  city: string
  locality: string
  struct: string
  street: string
  houseNumber: string
  roomNumber: string
  postCode: number|null
  addressType: string
  additionalAddress: string
  email:string
  editedMessage: string|null
  classification: string|number|null

  constructor () {
    this.id = null
    this.incommingSMSId = null
    this.lastName = ''
    this.firstName = ''
    this.patronymic = ''
    this.phoneNumber = ''
    this.faxNumber = ''
    this.annotationList = ['']
    this.annotation = ''
    this.russiaCountry = true
    this.fiasAddress = ''
    this.foreignAddress = ''
    this.subject = ''
    this.area = ''
    this.city = ''
    this.locality = ''
    this.struct = ''
    this.street = ''
    this.houseNumber = ''
    this.roomNumber = ''
    this.postCode = null
    this.addressType = ''
    this.additionalAddress = ''
    this.email = ''
    this.editedMessage = ''
    this.classification = 0
  }
}

export default Caller
