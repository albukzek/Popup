<template>
  <Header></Header>
  <div class="q-pa-md">
        <div class="title">Мониторинг звонков Справочной службы</div>
        <q-table
          row-key="name"
          hide-pagination
          hide-bottom
          >
        <template v-slot:header="props">
          <q-tr :props="props">
              <q-th class="thclassification" v-for="column in columnsRecord" :key="column">{{column.value}}</q-th>
          </q-tr>
          <q-tr v-for="(data, idx) in dataRecordsList" :key="data" :props="props">
              <q-td class="tdclassification number">
                <!-- <template v-slot:default>
                  <q-icon :name= "toogleSort.sortLastName ? 'north' : 'south'" />
                  <q-icon name="sort" />
                </template> -->
                <img v-if="dataRecordsList[idx].callType ==  0" src="@/img/inCall.svg"/>
                <img v-if="dataRecordsList[idx].callType ==  2" src="@/img/outCall.svg"/>
                <img v-if="dataRecordsList[idx].callType ==  3" src="@/img/redirectCall.svg"/>
              </q-td>
              <q-td class="tdclassification">{{dataRecordsList[idx].fullNameOperator}}</q-td>
              <q-td class="tdclassification">{{dataRecordsList[idx].phoneNumberOperator}}</q-td>
              <q-td class="tdclassification">{{dataRecordsList[idx].phoneNumberAbonent}}</q-td>
              <q-td class="tdclassification">{{dataRecordsList[idx].redirectNumber}}</q-td>
              <q-td class="tdclassification">{{dataRecordsList[idx].dateStartCallEdit}}</q-td>
              <q-td class="tdclassification">{{dataRecordsList[idx].durationCallEdit}}</q-td>
              <q-td class="tdclassification">
                <q-btn @click="download(data.callId)" outline>
                    <img src="@/img/downloadCall.svg" />
                  </q-btn>
              </q-td>
          </q-tr>
      </template>
    </q-table>
  </div>
</template>
<script>
import serviceRecord from '@/logic/record'
import { onMounted } from 'vue'
import Header from '@/layouts/HeaderComponent.vue'

export default {
  components: {
    Header
  },
  setup () {
    const { columnsRecord, dataRecordsList } = serviceRecord()

    onMounted(async () => {
      serviceRecord().fetchRecordsList('test')
    })

    function download (callId) {
      serviceRecord().downloadRecord(callId)
    }

    console.log(dataRecordsList.value, 'component')
    return {
      columnsRecord, dataRecordsList, download
    }
  }
}

</script>
<style scoped lang="sass">
  ::v-deep.q-btn--outline:before
    border: none
  .title
    margin: 0 0 40px 0
  ::v-deep.q-table__card
    box-shadow: none
</style>
