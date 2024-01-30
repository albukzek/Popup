<template>
<div class="q-pa-lg" v-if="!loading">
  <div class="row q-pb-md">
    <div class="col">
      <span>Всего записей: </span>
      <span>{{rowCount}}</span>
    </div>
  </div>
  <div class="row q-pb-md justify-between flex-center">
    <div class="col-3">
      <q-pagination
        v-model="pagination.page"
        :max="pageCount"
        :max-pages="6"
        boundary-links
      />
    </div>
    <div class="col-3">
      <div class="row flex-center">
        <div class="col">
          <span>Записей на странице:</span>
        </div>
        <div class="col">
          <q-select
            outlined
            dense
            behavior="menu"
            :options="messagesCount"
            v-model="pagination.rowsPerPage"
            @update:model-value="changeMessagesCount"
          />
        </div>
      </div>
    </div>
  </div>
  <div>
  <q-table
    :rows="rows"
    :columns="columns"
    row-key="id"
    separator='vertical'
    hide-bottom
    @row-click="onRow"
    v-model:pagination="pagination"
  >
    <template #body-cell-type="props">
      <q-td :props="props">
        <div>
          <q-icon >
            <img :src="'icons/circle_green.svg'" />
            <q-tooltip anchor="center right" self="center left" :offset="[10, 10]">
              <strong>Новое</strong>
            </q-tooltip>
          </q-icon>
        </div>
      </q-td>
    </template>
    <template #body-cell-received="props">
      <q-td :props="props">
        <div>
            {{ getDate(props.row.received)}}
        </div>
      </q-td>
    </template>
    <template #body-cell-text="props">
      <q-td :props="props">
        <div style="white-space: normal">
          {{ props.row.text}}
        </div>
      </q-td>
    </template>
    <template #body-cell-fio="props">
      <q-td :props="props">
        <div>
          {{ props.row.fio}}
        </div>
      </q-td>
    </template>
  </q-table>
  </div>
</div>
<q-inner-loading
  dense
  :showing="loading"
  label-class="text-teal"
  label-style="font-size: 1.1em"
/>
</template>

<script lang="ts">
import { messageLogic } from '@/logic/messages'
import { onMounted, defineComponent } from 'vue'
import serviceAbonent from '@/logic/abonent'
import { date } from 'quasar'
export default defineComponent({
  name: 'MessagesTable',
  setup () {
    const getDate = (received:Date) => {
      return date.formatDate(received, 'DD.MM.YYYY HH:mm')
    }
    const { rows, columns, getRows, loading, onRow, rowCount, messagesCount, pageCount, pagination, changeMessagesCount } = messageLogic()
    onMounted(async () => {
      await getRows()
    })
    return {
      rows,
      columns,
      onRow,
      rowCount,
      messagesCount,
      pageCount,
      pagination,
      loading,
      changeMessagesCount,
      getDate
    }
  }
})
</script>
