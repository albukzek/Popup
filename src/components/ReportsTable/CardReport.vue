<template>
  <Header></Header>
  <div class="wrapper">
    <q-card class="my-card">
    <q-card-section>
      <div class="header">
        <p class="title">Учетная карточка вызова</p>
        <p class="subtitle indent-subtitle">Справочный телефонный узел</p>
      </div>
      <div class="card-number">
        <p class="appeal">Обращение {{oneItem[0].number}} от {{oneItem[0].date}} г.</p>
      </div>
      <div class="card-body">
        <p><b>Время:</b> {{oneItem[0].callTime}}</p>
        <p><b>Номер телефона, на который поступил вызов:</b> {{oneItem[0].phone}}</p>
        <p><b>ФИО:</b> {{oneItem[0].abonent}}</p>
        <p><b>Телефон:</b> {{oneItem[0].aon}}</p>
        <p><b>Факс:</b> {{oneItem[0].fax}}</p>
        <p><b>Адрес:</b> {{oneItem[0].fullAddress}}</p>
        <p><b>Содержание:</b> {{oneItem[0].annotation}}</p>
        <p><b>Решение:</b> 03. Устное разъяснение</p>
        <p><b>Оператор:</b> {{oneItem[0].operator}}</p>
        <q-btn
          class="btn btn-all redirect"
          no-caps
          @click="read"
          v-if="!oneItem[0].isRead"
        >Прочитано</q-btn>
    </div>
    </q-card-section>
    </q-card>
  </div>
</template>
<script>
import { ref, onMounted } from 'vue'
import selectReport from '@/logic/select'
import serviceReport from '@/logic/report'
import Header from '@/layouts/HeaderComponent.vue'

export default {
  components: {
    Header
  },
  setup () {
    const { oneItem } = selectReport()
    const { store } = serviceReport()

    console.log(oneItem.value, 'one item components')
    async function read () {
      await store.api.reportsService.switchViewed({
        isRead: 'true',
        CallerId: oneItem.callerId
      })
    }
    return {
      oneItem, read
    }
  }
}
</script>
<style scoped lang="sass">
.wrapper
  padding: 20px
.indent-subtitle
  padding: 0 10px 0 0
.appeal
  font-weight: 700
  font-size: 16px
  line-height: 21px
  padding: 10px 0
.btn
  background-color: $bg-color-ea
.redirect
  background-color: $border-color
  color: $text-color
  width: 127px
</style>
