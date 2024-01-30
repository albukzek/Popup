<template>
  <Header></Header>
<div class="header">
    <input type="file" ref="file" style="display: none" />
    <div class="date">
      <p>{{ reception.label }}</p>
      <p>{{ timeInterval }}</p>
    </div>
    <div class="export">
      <q-btn
        class="btn btn-active"
        no-caps
        @click="excelExport"
      >
        Экспорт в Excel
      </q-btn>
    </div>
  </div>
 <div class="q-pa-md">
        <q-table
          row-key="name"
          hide-pagination
          hide-bottom
          >
        <template v-slot:header="props">
          <q-tr :props="props">
              <q-th class="thclassification number">№</q-th>
              <q-th class="thclassification" v-for="column in columnsGeneral" :key="column">{{column.value}}</q-th>
          </q-tr>
          <q-tr @click="openDetails(dataReport[idx].number)" v-for="(data, idx) in dataReport" :key="data" :props="props">
              <q-td class="tdclassification number">{{idx+1}}</q-td>
              <q-td class="tdclassification" v-for="dataItem in columnsGeneral" :key="dataItem">{{dataReport[idx][dataItem.name]}}</q-td>
          </q-tr>
      </template>
    </q-table>
  </div>
</template>
<script>
import { ref, onMounted } from 'vue'
import serviceReport from '@/logic/report'
import selectReport from '@/logic/select'
import Header from '@/layouts/HeaderComponent.vue'

export default {
  components: {
    Header
  },
  setup () {
    const { store, columnsGeneral, timeInterval, reception } = serviceReport()
    const { dataReport, getOneItem, router } = selectReport()
    console.log(reception, 'reception.label')
    console.log(reception.label, 'reception.label')
    async function excelExport () {
      await store.api.reportsService.exportExcel({
        vm: {},
        arrDetails: dataReport.value,
        dateInterval: timeInterval,
        reception: reception.value.label
      }, 'General')
    }
    function openDetails (number) {
      getOneItem(number)
      router.push('/item')
    }
    return {
      columnsGeneral, excelExport, dataReport, timeInterval, openDetails, reception
    }
  }
}
</script>
<style scoped lang="sass">
  ::v-deep.q-field--standard .q-field__control:after
    border: none
  ::v-deep.q-field--standard .q-field__control:before
    border: none
  ::v-deep.q-field--standard .q-field__control:hover:before
    background: none
  ::v-deep.qinput *
    background-color: #F7F9FC
    border-radius: 5px
    max-height: 24px
::v-deep.qinput
    border: solid 2px #E8EEFA
    background-color: #EAEAEA
    border-radius: 5px
.btn
    width: 150px
    height: 36px
.header
    display: flex
    justify-content: space-between
.export
  margin: 0 15px 0
::v-deep.q-table__card
  box-shadow: none
</style>
