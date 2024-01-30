<template>
  <Header></Header>
  <div class="column items-center justify-center">
      <q-form @submit="submitForm">
        <q-card-section class="column q-gutter-md">
          <p class="title">Отчеты</p>
        <div class="field">
          <label class="label">Отчет</label>
          <q-select
            class="select"
            v-model="selectData.selectReport"
            :options="reportsType"
            dense
            outlined
            behavior="menu"
          />
        </div>
        <!-- <div class="field"> -->
          <!-- <label class="label">Приемная</label>
          <q-select
            class="select"
            v-model="selectData.selectReception"
            :options="reception"
            outlined
            dense
            behavior="menu"
          />
        </div> -->

        <div class="field">
        <label class="label">Период</label>
          <q-input
            outlined
            dense
            v-model="inputStart"
            class="date">
            <template v-slot:default>
              <q-popup-proxy transition-show="scale" transition-hide="scale">
                <q-date
                  minimal
                  v-model="dateSelectStart"
                />
              </q-popup-proxy>
            </template>
          </q-input> –
          <q-input
            outlined
            dense
            v-model="inputEnd"
            class="date fix">
            <template v-slot:default>
              <q-popup-proxy transition-show="scale" transition-hide="scale">
                <q-date
                  minimal
                  v-model="dateSelectEnd"
                />
              </q-popup-proxy>
            </template>
            </q-input>
        </div>
        </q-card-section>
        <q-card-actions align="right">
          <q-btn
            class="btn btn-all build"
            no-caps
            @click="fetchReport"
          >Построить отчет</q-btn>
          <q-btn
            class="btn btn-all redirect"
            no-caps
            @click="logout"
          >На главную</q-btn>
        </q-card-actions>
      </q-form>
  </div>
</template>
<script>
import { ref, reactive, onMounted, watch } from 'vue'
import DataTable from '@/components/ReportsTable/DataTable.vue'
import dayjs from 'dayjs'
import serviceSelect from '@/logic/select'
import Header from '@/layouts/HeaderComponent.vue'

export default {
  name: 'selectView',
  components: {
    Header
  },
  setup () {
    const { getReport, store, storeSelect, router, dateSelectStart, dateSelectEnd, inputStart, inputEnd, reception, reportsType, selectData } = serviceSelect()

    onMounted(async () => {
      reportsType.value = await store.api.reportsService.fetchReportList('token')
      reception.value = await store.api.reportsService.selectReport('token')
      console.log(reception.value, 'reception')
    })

    function logout () {
      router.push('/report')
      localStorage.removeItem('token')
    }

    watch(dateSelectStart, (newValue, oldValue) => {
      // selectData.dateStart = new Date(dateSelectStart.value).getTime()
      // storeSelect.addIntervalStart(dateSelectStart.value)
      var splitDateStart = dateSelectStart.value.split('/', 3)
      selectData.dateStart = new Date(Date.UTC(splitDateStart[0], splitDateStart[1] - 1, splitDateStart[2], 0, 0, 0)).getTime()
      inputStart.value = dayjs(new Date(dateSelectStart.value)).format('DD.MM.YYYY')
    })
    watch(dateSelectEnd, (newValue, oldValue) => {
      // selectData.dateEnd = new Date((dateSelectEnd.value)).getTime() + 82800000 + 3540000 + 59000
      // storeSelect.addIntervalEnd(dateSelectEnd.value)
      var splitDateEnd = dateSelectEnd.value.split('/', 3)
      selectData.dateEnd = new Date(Date.UTC(splitDateEnd[0], splitDateEnd[1] - 1, splitDateEnd[2], 23, 59, 59)).getTime()
      console.log(splitDateEnd, "split date")
      console.log(selectData.dateEnd, 'select date end')
      inputEnd.value = dayjs(new Date(dateSelectEnd.value)).format('DD.MM.YYYY')
    })

    async function fetchReport () {
      getReport(selectData.selectReport.value, selectData)
      storeSelect.addIntervalStart(selectData.dateStart)
      storeSelect.addIntervalEnd(selectData.dateEnd - 72000000)

      storeSelect.addReception(selectData.selectReception)
      if (selectData.dateEnd >= selectData.dateStart) {
        router.push(`/${selectData.selectReport.value}`)
      }
    }
    return {
      selectData, reportsType, logout, fetchReport, reception, dateSelectStart, dateSelectEnd, inputStart, inputEnd
    }
  }
}
</script>

<style lang="sass" scoped>
::v-deep.date
  border: solid 2px $border-color
  background-color: $bg-input
  border-radius: 5px
  width: 101px
  font-size: 14px
  font-weight: 400
  line-height: 16px

::v-deep.q-field--outlined .q-field__control:before
  border: none
::v-deep.select
  width: 320px
  background-color: $bg-input
  border-radius: 8px
  border: solid 2px $border-color
.field
  display: flex
  justify-content: space-between
  align-items: center
.select
  width: 320px
.btn
  background-color: $bg-color-ea
.redirect
  background-color: $border-color
  color: $text-color
  width: 127px

.build
  background-color: $bg-active
  color: $text-color-active
  width: 190px
.label
  padding: 0 15px 0 0
  font-weight: 400
  font-size: 14px
  line-height: 16px
.title
  margin: auto
  font-weight: 700
  font-size: 18px
  line-height: 20.7px
.fix
  margin: 0 103px 0 0
::v-deep.q-form
  padding-top: 145px

</style>
