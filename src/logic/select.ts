import { ref, reactive, onMounted, watch } from 'vue'
import { useReportStore } from '@/stores/useReport'
import { useDateStore } from '@/stores/useDate'
import { storeToRefs } from 'pinia'
import DataTable from '@/components/ReportsTable/DataTable.vue'
import { useRouter } from 'vue-router'
import axios from 'axios'
import dayjs from 'dayjs'
import { useStore } from '@/stores/useStore'
import IGeneral from '@/data/interface/general'

const dataTwoReport = ref([])
const dataReport = ref([{ number: '' as any }])
const oneItem = ref()

function serviceSelect () {
  const store = useStore()
  const storeSelect = useReportStore()
  const router = useRouter()
  const dateSelectStart = ref()
  const dateSelectEnd = ref()
  const inputStart = ref(dayjs(new Date(Date.now() - 86400000).toISOString().substr(0, 10)).format('DD.MM.YYYY'))
  const inputEnd = ref(dayjs(new Date().toISOString().substr(0, 10)).format('DD.MM.YYYY'))
  const reception = ref([])
  const dateNow = new Date(Date.now())

  // function getYesterdayDate () {
  //    var yesterdayDate = new Date().toUTCString
  //    console.log(yesterdayDate, 'date log')
  //   // return yesterdayDate
  // }

  const reportsType = ref([
    { label: 'Общая статистика', value: 'General' },
    { label: 'Детальная статистика', value: 'Details' },
    // { label: 'Отчет по переключению на специалистов', value: 'ReceptionTransfers' },
    // { label: 'Отчет по переключениям на ФОИВы / РОИВы', value: 'Outbound' },
    { label: 'Бланки переводов', value: 'TransferForms' }
  ])
  const selectData = reactive({
    selectReport: { label: 'Общая статистика', value: 'General' },
    selectReception: { label: 'Все приемные', value: 'allReception' },
    // dateStart: new Date(dateNow.getFullYear(), dateNow.getMonth, dateNow.getDay() - 86400000).getTime(),
    // число для выравнивания даты прописанной по умолчанию
    dateStart: new Date(Date.UTC(dateNow.getFullYear(), dateNow.getMonth(), dateNow.getDate(), 0, 0, 0)).getTime() - 86400000,
    // число для выравнивания даты прописанной по умолчанию
    // dateEnd: new Date().getTime() - 86401000
    dateEnd: new Date(Date.UTC(dateNow.getFullYear(), dateNow.getMonth(), dateNow.getDate(), 23, 59, 59)).getTime()
  })

  async function getReport (report :any, data : any) {
    const fetchDataReport = await store.api.reportsService.fetchReport(report, data)
    fetchDataReport.map((x: { createDateEdit: string; date: string | number | Date | dayjs.Dayjs | null | undefined }) => (x.createDateEdit = dayjs(x.date).format('DD.MM.YYYY HH:mm:ss')))
    fetchDataReport.map((x: { callTimeEdit: string; callTime: string }) => (x.callTimeEdit = x.callTime.split('.')[0]))
    console.log(fetchDataReport, 'fetchReport')
    dataReport.value = fetchDataReport
    if (report === 'Outbound') {
      dataTwoReport.value = await store.api.reportsService.fetchReport('OutboundUnprocessed', data)
    }
  }

  // async function getReportList () {
  //   reportsType.value = await store.api.reportsService.fetchReportList()
  // }

  function getOneItem (number : any) {
    oneItem.value = dataReport.value.filter(x => x.number === number)
  }

  return {
    oneItem, store, getReport, getOneItem, storeSelect, router, dateSelectStart, dateSelectEnd, inputStart, inputEnd, reception, reportsType, selectData, dataReport, dataTwoReport
  }
}
export default serviceSelect
