import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import AuthView from '../components/AuthComponent.vue'
import SelectView from '../components/ReportsTable/ReportSelect.vue'
import SelectList from '../components/AbonentList/SelectAbonentList.vue'
import General from '../components/ReportsTable/DataTable.vue'
import Outbound from '../components/ReportsTable/OutboundReport.vue'
import Details from '../components/ReportsTable/DetailsReport.vue'
import Transfers from '../components/ReportsTable/ReceptionTransfers.vue'
import Item from '../components/ReportsTable/CardReport.vue'
import Record from '../components/RecordsList/RecordsList.vue'
import MessageView from '../components/Messages/MessageView.vue'
import MessagesTable from '../components/Messages/MessagesTable.vue'
import { storeToRefs } from 'pinia'
import { useAuthStore } from '@/stores/useAuth'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/report',
    name: 'authReport',
    component: AuthView
  },
  {
    path: '/abonent',
    name: 'authAbonent',
    component: AuthView
  },
  {
    path: '/record',
    name: 'authRecord',
    component: AuthView
  },
  {
    path: '/message',
    name: 'authMessage',
    component: AuthView
  },
  {
    path: '/select',
    name: 'select',
    meta: { auth: true },
    component: SelectView
  },
  {
    path: '/general',
    name: 'general',
    meta: { auth: true },
    component: General
  },
  {
    path: '/outbound',
    name: 'outbound',
    meta: { auth: true },
    component: Outbound
  },
  {
    path: '/list',
    name: 'abonentList',
    meta: { auth: true },
    component: SelectList
  },
  {
    path: '/details',
    name: 'details',
    meta: { auth: true },
    component: Details
  },
  {
    path: '/ReceptionTransfers',
    name: 'receptionTransfers',
    meta: { auth: true },
    component: Transfers
  },
  {
    path: '/item',
    name: 'cardItem',
    meta: { auth: true },
    component: Item
  },
  {
    path: '/records',
    name: 'recordsList',
    meta: { auth: true },
    component: Record
  },
  {
    path: '/messages',
    name: 'messagesTable',
    meta: { auth: true },
    component: MessagesTable
  },
  {
    path: '/messages/message/:messageId?',
    name: 'MessageView',
    meta: { auth: true },
    props: true,
    component: MessageView
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  const store = useAuthStore()
  const { token } = storeToRefs(store)
  console.log(token)
  const requireAuth = to.matched.some(select => select.meta.auth)
  console.log(to, from, next)
  console.log(token, requireAuth)
  if (requireAuth && !token) {
    alert('Необходимо авторизоваться')
  } else {
    next()
  }
})

export default router
