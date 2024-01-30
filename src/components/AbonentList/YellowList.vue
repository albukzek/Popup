<template>
  <div class="wrapper">
    <p>Отображается не более 150 записей. Для просмотра остальных записей укажите критерии поиска</p>
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
            @click="sortByName('Yellow')"
            >
            <template v-slot:default>
              <q-icon :name= "toogleSort.sortLastName ? 'north' : 'south'" />
              <q-icon name="sort" />
              {{columns[0].field}}
            </template>
            </q-th>
          <q-th
            class="thclassification"
            @click="sortByFirstName('Yellow')"
          >
            <template v-slot:default>
              <q-icon :name= "toogleSort.sortFirstName ? 'north' : 'south'" />
              <q-icon name="sort" />
              {{columns[1].field}}
            </template>
          </q-th>
          <q-th
            class="thclassification"
            @click="sortByMiddleName('Yellow')"
          >
            <template v-slot:default>
              <q-icon :name= "toogleSort.sortMiddleName ? 'north' : 'south'" />
              <q-icon name="sort" />
              {{columns[2].field}}
            </template>
          </q-th>
          <q-th
            class="thclassification"
            @click="sortByPhone('Yellow')"
          >
            <template v-slot:default>
              <q-icon :name= "toogleSort.sortPhone ? 'north' : 'south'" />
              <q-icon name="sort" />
              {{columns[3].field}}
            </template>
          </q-th>
          <q-th
            class="thclassification"
            @click="sortByNameDate('Yellow')"
          >
            <template v-slot:default>
              <q-icon :name= "toogleSort.sortDate ? 'north' : 'south'" />
              <q-icon name="sort" />
              {{columns[4].field}}
            </template>
          </q-th>
        </q-tr>
         <q-tr :props="props">
              <q-td class="tdclassification tested">
                 <q-btn @click="addAbonent" outline>
                   <img src="@/img/add.svg" />
                </q-btn>
              </q-td>
              <q-td class="tdclassification" >
                 <q-input
                    v-model="search.searchLastName"
                    dense
                    class="qinput">
                    <template v-slot:prepend>
                      <q-icon name="search" />
                    </template>
                  </q-input>
              </q-td>
               <q-td class="tdclassification" >
                 <q-input
                    v-model="search.searchFirstName"
                    dense
                    class="qinput">
                    <template v-slot:prepend>
                      <q-icon name="search" />
                    </template>
                  </q-input>
              </q-td>
               <q-td class="tdclassification" >
                 <q-input
                    v-model="search.searchMiddleName"
                    dense
                    class="qinput">
                    <template v-slot:prepend>
                      <q-icon name="search" />
                    </template>
                  </q-input>
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
              <q-td class="tdclassification"></q-td>
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
                v-model="newItemYellow.lastName"
                ></q-input>
              </q-td>
              <q-td class="tdclassification">
                <q-input
                dense
                outlined
                v-model="newItemYellow.firstName"
                ></q-input>
              </q-td>
              <q-td class="tdclassification">
                <q-input
                dense
                outlined
                v-model="newItemYellow.middleName"
                ></q-input>
              </q-td>
              <q-td class="tdclassification">
                <q-input
                dense
                outlined
                v-model="newItemYellow.phoneNumber"
                ></q-input>
              </q-td>
              <q-td class="tdclassification">
                <!-- <q-input
                dense
                outlined
                v-model="newItem.date"
                ></q-input> -->
              </q-td>
          </q-tr>
          <q-tr v-for="data in dataAbonentList.dataYellowlist" :key="data" :props="props" :class="{edited: data.edit}">
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
              ><q-input
                dense
                :outlined = "data.edit"
                :readonly="!data.edit"
                v-model="data[`lastName`]"
              ></q-input>
              </q-td>
              <q-td class="tdclassification"
              ><q-input
                dense
                :outlined = "data.edit"
                :readonly="!data.edit"
                v-model="data[`firstName`]"
              ></q-input>
              </q-td>
              <q-td class="tdclassification"
              ><q-input
                dense
                :outlined = "data.edit"
                :readonly="!data.edit"
                v-model="data[`middleName`]"
              ></q-input>
              </q-td>
              <q-td class="tdclassification"
              ><q-input
                dense
                :outlined = "data.edit"
                :readonly="!data.edit"
                v-model="data[`phoneNumber`]"
              ></q-input>
              </q-td>
              <q-td class="tdclassification"
              ><q-input
                dense
                readonly
                v-model="data[`createDateEdit`]"
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
      :max="maxPage.maxPageYellow"
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
  name: 'abonentList',
  setup () {
    const {
      loading,
      textSearch,
      inputsStates,
      addAbonent,
      newItemYellow,
      switchAdd,
      // dataYellowlist,
      dataAbonentList,
      sortByName,
      sortByFirstName,
      sortByMiddleName,
      sortByPhone,
      sortByNameDate,
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
    const columns = serviceAbonent().getColumns('Yellow')
    const countInput = columns.length

    function newItemCancel () {
      serviceAbonent().cancel(newItemYellow)
    }
    function newItemAdd () {
      serviceAbonent().add(dataAbonentList.dataYellowlist, newItemYellow, 'Yellow', 'CreateDate')
    }
    function removeAbonent (id) {
      serviceAbonent().remove(dataAbonentList.dataYellowlist, id, 'Yellow', 'CreateDate')
    }
    function editAbonent (id) {
      temporaryArray = dataAbonentList.dataYellowlist.map(item => ({
        ItemId: item.itemId,
        LastName: item.lastName,
        FirstName: item.firstName,
        MiddleName: item.middleName,
        PhoneNumber: item.phoneNumber,
        CreateDate: item.createDate
      }))
      dataAbonentList.dataYellowlist.map((x) => (x.itemId === id ? (x.edit = true) : x))
    }
    async function submitEdit (id) {
      const result = dataAbonentList.dataYellowlist.filter(x => x.itemId === id)
      const resultNotEdit = {
        ItemId: result[0].itemId,
        LastName: result[0].lastName,
        FirstName: result[0].firstName,
        MiddleName: result[0].middleName,
        CreateDate: result[0].createDate,
        PhoneNumber: result[0].phoneNumber
      }
      await store.api.abonenttService.UpdateAbonent(resultNotEdit, 'Yellow')
      dataAbonentList.dataYellowlist.map((x) => (x.itemId === id ? (x.edit = false) : x))
    }
    function cancelEdit (id) {
      dataAbonentList.dataYellowlist = temporaryArray.map(item => ({
        itemId: item.ItemId,
        lastName: item.LastName,
        firstName: item.FirstName,
        middleName: item.MiddleName,
        phoneNumber: item.PhoneNumber,
        createDate: item.CreateDate
      }))
      dataAbonentList.dataYellowlist.map((x) => (x.itemId === id ? (x.edit = false) : x))
      temporaryArray = []
    }

    onMounted(async () => {
      loading.value = true
      await maxCountPage(pageSize.value, 'Yellow')
      await serviceAbonent().fetchList('Yellow', 'CreateDate', search, pageSize.value, current.value)
      dataAbonentList.dataYellowlist.map(x => (x.edit = false))
      loading.value = false
    })

    watch(search, async (newVaue, oldValue) => {
      console.log(search.searchLastName)
      await serviceAbonent().fetchList('Yellow', 'CreateDate', search, pageSize.value, current.value)
    })
    watch(current, async (newVaue, oldValue) => {
      await serviceAbonent().fetchList('Yellow', 'CreateDate', search, pageSize.value, current.value)
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
      newItemYellow,
      switchAdd,
      newItemAdd,
      newItemCancel,
      // dataYellowlist,
      dataAbonentList,
      sortByName,
      sortByFirstName,
      sortByMiddleName,
      sortByPhone,
      sortByNameDate,
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

// .blockBtn
//   width: 64px
//   margin: 0

</style>
