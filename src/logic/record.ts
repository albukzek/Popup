import { ref } from 'vue'
import { useStore } from '@/stores/useStore'
import dayjs from 'dayjs'

const dataRecordsList = ref()

function serviceRecord () {
  const store = useStore()
  const columnsRecord = ref(
    [
      { name: 'icon', value: 'Тип' },
      { name: 'fullNameOperator', value: 'ФИО оператора' },
      { name: 'phoneNumberOperator', value: 'Номер агента' },
      { name: 'phoneNumberAbonent', value: 'Номер абонента при вх./исх. вызове' },
      { name: 'redirectNumber', value: 'Номер перевода входящего  вызова' },
      { name: 'dateStartCallEdit', value: 'Начало вызова' },
      { name: 'durationCallEdit', value: 'Длительность' },
      { name: 'downloadButton', value: ' ' }
    ])
  async function fetchRecordsList (token :string) {
    const recordData = await store.api.recordService.fetchRecordList(token)
    recordData.map(((x: { dateStartCallEdit: string; dateStartCall: string | number | Date | dayjs.Dayjs | null | undefined }) => (x.dateStartCallEdit = dayjs(x.dateStartCall).format('DD.MM.YYYY HH:mm:ss'))))
    recordData.map(((x: { durationCallEdit: any; durationCall: string }) => (x.durationCallEdit = x.durationCall.split('.')[0])))
    dataRecordsList.value = recordData
  }
  async function downloadRecord (callId :string) {
    const urlRecord = await store.api.recordService.dowloadRecord(callId)
    console.log(urlRecord.value.fileURL, 'down')
    getFileUrl(urlRecord.value.fileURL)
  }

  function getFileUrl (url :string) {
    const linkUrl = document.createElement("a")
    linkUrl.download = url
    linkUrl.href = 'http://' + url
    document.body.appendChild(linkUrl)
    linkUrl.click()
    document.body.removeChild(linkUrl)
  }

  return {
    columnsRecord, dataRecordsList, downloadRecord, fetchRecordsList
  }
}
export default serviceRecord
