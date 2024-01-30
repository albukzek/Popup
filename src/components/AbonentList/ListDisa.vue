<template>
  <div class="wrapper">
    <q-table
      :rows-per-page-options="[150]"
      hide-bottom
      separator="cell"
      :loading= loading
    >
      <template #loading>
        <q-inner-loading
          showing
          color="primary"
        />
      </template>
      <template v-slot:header="props">
        <q-tr :props="props">
             <q-th>
          </q-th>
          <q-th
            class="thclassification"
            @click="sortByPhone('Disa')"
          >
          <template v-slot:default>
              <q-icon :name= "toogleSort.sortPhone ? 'north' : 'south'" />
              <q-icon name="sort" />
              {{columns[0].field}}
          </template>
          </q-th>
          <q-th class="thclassification">{{columns[1].field}}</q-th>
        </q-tr>
         <q-tr :props="props">
              <q-td class="tdclassification tested">
                 <q-btn @click="addAbonent" outline>
                   <img src="@/img/add.svg" />
                </q-btn>
              </q-td>
               <q-td class="tdclassification" >
                 <q-input
                    v-model="search.searchPhone"
                    dense
                    class="qinput">
                    <template v-slot:prepend>
                      <q-icon name="search" />
                    </template>
                  </q-input>
              </q-td>
                <q-td class="tdclassification" >
                 <q-input
                    v-model="search.searchComment"
                    dense
                    class="qinput">
                    <template v-slot:prepend>
                      <q-icon name="search" />
                    </template>
                  </q-input>
              </q-td>
         </q-tr>
           <q-tr class="edited" v-if="switchAdd">
              <q-td class="tdclassification check">
                <div>
                  <q-btn @click="newItemAdd" outline class="btn-abonent">
                    <img src="@/img/ok.svg" />
                  </q-btn>
                  <q-btn @click="newItemCancel" outline class="btn-abonent">
                    <img src="@/img/del.svg" />
                  </q-btn>
                </div>
              </q-td>
              <q-td class="tdclassification">
                <q-input
                  dense
                  outlined
                  v-model="newItemDisa.phoneNumber"
                ></q-input>
              </q-td>
                <q-td class="tdclassification">
                <q-input
                  dense
                  outlined
                  v-model="newItemDisa.comment"
                ></q-input>
              </q-td>
          </q-tr>
          <q-tr v-for="data in dataAbonentList.dataDisalist" :key="data" :props="props" :class="{edited: data.edit}">
              <q-td class="tdclassification check">
                <div v-if=!data.edit class="blockBtn">
                  <q-btn @click="editAbonent(data.itemId)" outline class="btn-abonent">
                    <img src="@/img/edit.svg" />
                  </q-btn>
                  <q-btn @click="removeAbonent(data.itemId)" outline class="btn-abonent">
                    <img src="@/img/del.svg" />
                  </q-btn>
                </div>
                <div v-if=data.edit class="blockBtn">
                  <q-btn @click="submitEdit(data.itemId)" outline class="btn-abonent">
                    <img src="@/img/ok.svg" />
                  </q-btn>
                  <q-btn @click="cancelEdit(data.itemId)" outline class="btn-abonent">
                    <img src="@/img/del.svg" />
                  </q-btn>
                </div>
              </q-td>
              <q-td class="tdclassification"
                v-for="(dataItem) in columns"
                :key="dataItem"
              >
              <q-input
                dense
                :outlined = "data.edit"
                :readonly="!data.edit"
                v-model="data[dataItem.name]"
              ></q-input>
              </q-td>
          </q-tr>
      </template>
    </q-table>
    <div class="q-pt-lg flex">
    <q-pagination
      v-if="current == 0"
      v-model="current"
      color="primary"
      :max="maxPage.maxPageDisa"
      boundary-links
      unelevated
      :max-pages="3"
      icon-first="keyboard_double_arrow_left"
      icon-last="keyboard_double_arrow_right"
    />
    </div>
  </div>
</template>
<script>
import { ref, reactive, watch, onMounted, computed } from 'vue'
import { useAbonentStore } from '@/stores/useAbonent.ts'
import { useDateStore } from '@/stores/useDate.ts'
import { storeToRefs } from 'pinia'
import dayjs from 'dayjs'
import serviceAbonent from '@/logic/abonent'

export default {
  name: 'disaList',
  setup () {
    const {
      loading,
      textSearch,
      inputsStates,
      addAbonent,
      newItemDisa,
      switchAdd,
      // dataDisalist,
      dataAbonentList,
      sortByPhone,
      search,
      current,
      store,
      pageSize,
      maxPage,
      maxCountPage,
      toogleSort,
      fetchList
    } = serviceAbonent()
    let temporaryArray = []
    const columns = serviceAbonent().getColumns('Disa')
    const countInput = columns.length

    function newItemCancel () {
      serviceAbonent().cancel(newItemDisa)
    }
    function newItemAdd () {
      serviceAbonent().add(dataAbonentList.dataDisalist, newItemDisa, 'Disa', 'CreateDate')
    }
    function removeAbonent (id) {
      serviceAbonent().remove(dataAbonentList.dataDisalist, id, 'Disa', 'CreateDate')
    }

    function editAbonent (id) {
      temporaryArray = dataAbonentList.dataDisalist.map(item => ({
        ItemId: item.itemId,
        PhoneNumber: item.phoneNumber,
        Comment: item.comment
      }))
      dataAbonentList.dataDisalist.map((x) => (x.itemId === id ? (x.edit = true) : x))
    }

    async function submitEdit (id) {
      const result = dataAbonentList.dataDisalist.filter(x => x.itemId === id)
      const resultNotEdit = {
        ItemId: result[0].itemId,
        PhoneNumber: result[0].phoneNumber,
        Comment: result[0].comment
      }
      await store.api.abonenttService.UpdateAbonent(resultNotEdit, 'Disa')
      dataAbonentList.dataDisalist.map((x) => (x.itemId === id ? (x.edit = false) : x))
    }

    function cancelEdit (id) {
      dataAbonentList.dataDisalist = temporaryArray.map(item => ({
        itemId: item.ItemId,
        PhoneNumber: item.phoneNumber,
        Comment: item.comment
      }))
      dataAbonentList.dataDisalist.map((x) => (x.itemId === id ? (x.edit = false) : x))
      temporaryArray = []
    }

    onMounted(async () => {
      loading.value = true
      await maxCountPage(pageSize.value, 'Disa')
      await serviceAbonent().fetchList('Disa', 'PhoneNumber', search, pageSize.value, current.value)
      dataAbonentList.dataDisalist.map(x => (x.edit = false))
      loading.value = false
    })

    watch(search, async (newVaue, oldValue) => {
      await serviceAbonent().fetchList('Disa', 'PhoneNumber', search, pageSize.value, current.value)
    })
    watch(current, async (newVaue, oldValue) => {
      await serviceAbonent().fetchList('Disa', 'PhoneNumber', search, pageSize.value, current.value)
    })

    return {
      loading,
      columns,
      textSearch,
      countInput,
      inputsStates,
      addAbonent,
      removeAbonent,
      editAbonent,
      submitEdit,
      cancelEdit,
      newItemDisa,
      switchAdd,
      newItemAdd,
      newItemCancel,
      // dataDisalist,
      dataAbonentList,
      sortByPhone,
      search,
      current,
      maxPage,
      toogleSort
    }
  }
}
</script>
<style scoped lang="sass">
::v-deep.q-btn
  display: inline-block
  flex-direction: row
::v-deep.q-table th, .q-table td
  padding: 0 3px
::v-deep.q-field--outlined .q-field__control:before
  border: 1px solid $border-color
  border-radius: 5px
  background-color: #ffffff
::v-deep.q-field--outlined .q-field__control:after
  // border: 1px solid $border-color
  // border-radius: 5px
  // background-color: #ffffff
::v-deep.q-field--standard.q-field--readonly .q-field__control:before
  border: none
::v-deep.q-table thead, .q-table th
  border: none
::v-deep.q-btn--outline:before
  border: none
::v-deep.q-field--standard .q-field__control:after
    border: none
::v-deep.q-field--standard .q-field__control:before
    border: none
::v-deep.q-field--standard .q-field__control:hover:before
    background: none
::v-deep.qinput *
    background-color: $bg-input
    border-radius: 5px
    max-height: 24px
::v-deep.qinput
    border: solid 2px $border-color
    background-color: $bg-color-ea
    border-radius: 5px
.edited
  background-color: $edited
.btn-abonent
  width: 15px
  height: 15px
.tested
  display: flex
  justify-content: center
  height: 48px
::v-deep.q-table__card
  box-shadow: none
</style>
