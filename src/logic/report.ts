import { useReportStore } from '@/stores/useReport'
import { useStore } from '@/stores/useStore'
import { storeToRefs } from 'pinia'
import { ref } from 'vue'
import dayjs from 'dayjs'

function serviceDepartment () {
  const store = useStore()
  const storeReport = useReportStore()
  const timeIntervalStart = ref(storeReport.getIntervalStart)
  const timeIntervalEnd = ref(storeReport.getIntervalEnd)
  console.log(timeIntervalEnd, 'end interval')
  const timeInterval = `Отчет с ${dayjs(new Date(timeIntervalStart.value)).format('DD.MM.YYYY')} по ${dayjs(new Date(timeIntervalEnd.value)).format('DD.MM.YYYY')}`
  const reception = ref(storeReport.getReception)
  // const { data } = storeToRefs(store)
  const data = null
  const columnsGeneral = ref(
    [
      { name: 'createDateEdit', value: 'Дата' },
      { name: 'callTimeEdit', value: 'Время' },
      { name: 'phone', value: 'Номер абонента' },
      { name: 'number', value: 'Номер обращения перевода' },
      { name: 'operator', value: 'ФИО' },
      { name: 'aon', value: 'АОН' },
      { name: 'phoneNumber', value: 'Телефон' },
      { name: 'mobile', value: 'Мобильный' },
      { name: 'fax', value: 'Факс' },
      { name: 'zip', value: 'Индекс' },
      { name: 'region', value: 'Регион' },
      { name: 'rayon', value: 'Район' }
    ])
  const columnsDetails = ref(
    [
      { name: 'createDateEdit', value: 'Дата' },
      { name: 'callTimeEdit', value: 'Время' },
      { name: 'operator', value: 'Ф.И.О. оператора ' },
      { name: 'appealNumber', value: 'Номер обращения' },
      { name: 'appealNumberRedirect', value: 'Номер переведенного обращения' },
      { name: 'abonent', value: 'ФИО' },
      { name: 'phone', value: 'Телефон' },
      { name: 'comment', value: 'Комментарий' }
    ])
  const columnsReceptionTransfers = ref(
    [
      { name: 'receptionNumber', value: 'Номер приемной' },
      { name: 'receprionName', value: 'Название приемной' },
      { name: 'timeRedirect', value: 'Период переключения' }
    ])
  const columsOutboundReport = ref(
    [
      { name: 'unanswered', value: 'Неотвеченный' },
      { name: 'deferred', value: 'Отложенный' },
      { name: 'total', value: 'Всего' }
    ])
  const columsOutboundTwoReport = ref([
    { name: 'aon', value: 'АОН' },
    { name: 'operator', value: 'Оператор' },
    { name: 'timePostpone', value: 'Время откладывания' },
    { name: 'abandonedCallTime', value: 'Время сорвавшегося вызова' },
    { name: 'callTimeSubscriber', value: 'Время вызова абоненту' }
  ])

  return {
    store, reception, storeReport, data, columnsGeneral, columnsDetails, columnsReceptionTransfers, columsOutboundReport, columsOutboundTwoReport, timeInterval
  }
}
export default serviceDepartment
