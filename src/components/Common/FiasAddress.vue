<template>
  <div class="row items-center q-mb-sm">
    <div class="col-3">Субъект</div>
    <div class="col-9">
      <q-select borderless dense class="full-width form-input fias-selector"
                v-model="selectedAddresses['Region']"
                input-debounce="0"
                @filter="(val,update,abort) => filterFn(val, update, 'Region')"
                :options="getOptions('Region')"
                :disable="isDisabled('Region')"
                @clear="onClear('Region')"
                @update:model-value="onSelect($event, 'Region')"
                option-label="name"
                behavior="menu"
      />
    </div>
  </div>
  <div class="row items-center q-mb-sm">
    <div class="col-3">Район</div>
    <div class="col-9">
      <q-select borderless dense class="full-width form-input fias-selector"
                v-model="selectedAddresses['Area']"
                input-debounce="0"
                @filter="(val,update,abort) => filterFn(val, update, 'Area')"
                :options="getOptions('Area')"
                :disable="isDisabled('Area')"
                @clear="onClear('Area')"
                @update:model-value="onSelect($event, 'Area')"
                option-label="name"
                behavior="menu"
      />
    </div>
  </div>
  <div class="row items-center q-mb-sm">
    <div class="col-3">Город</div>
    <div class="col-9">
      <q-select borderless dense class="full-width form-input fias-selector"
                v-model="selectedAddresses['City']"
                input-debounce="0"
                @filter="(val,update,abort) => filterFn(val, update, 'City')"
                :options="getOptions('City')"
                :disable="isDisabled('City')"
                @clear="onClear('City')"
                @update:model-value="onSelect($event, 'City')"
                option-label="name"
                behavior="menu"
      />
    </div>
  </div>
  <div class="row items-center q-mb-sm">
    <div class="col-3">Населенный пункт</div>
    <div class="col-9">
      <q-select borderless dense class="full-width form-input fias-selector"
                v-model="selectedAddresses['Place']"
                input-debounce="0"
                @filter="(val,update,abort) => filterFn(val, update, 'Place')"
                :options="getOptions('Place')"
                :disable="isDisabled('Place')"
                @clear="onClear('Place')"
                @update:model-value="onSelect($event, 'Place')"
                option-label="name"
                behavior="menu"
      />
    </div>
  </div>
  <div class="row items-center q-mb-sm">
    <div class="col-3">Планировочная структура</div>
    <div class="col-9">
      <q-select borderless dense class="full-width form-input fias-selector"
                v-model="selectedAddresses['PlanningStructure']"
                input-debounce="0"
                @filter="(val,update,abort) => filterFn(val, update, 'PlanningStructure')"
                :options="getOptions('PlanningStructure')"
                :disable="isDisabled('PlanningStructure')"
                @clear="onClear('PlanningStructure')"
                @update:model-value="onSelect($event, 'PlanningStructure')"
                option-label="name"
                behavior="menu"
      />
    </div>
  </div>
  <div class="row items-center q-mb-sm">
    <div class="col-3">Улица</div>
    <div class="col-9">
      <q-select borderless dense class="full-width form-input fias-selector"
                v-model="selectedAddresses['Street']"
                input-debounce="0"
                @filter="(val,update,abort) => filterFn(val, update, 'Street')"
                :options="getOptions('Street')"
                :disable="isDisabled('Street')"
                @clear="onClear('Street')"
                @update:model-value="onSelect($event, 'Street')"
                option-label="name"
                behavior="menu"
      />
    </div>
  </div>
  <div class="row items-center q-mb-sm">
    <div class="col-3">Номер здания / сооружения</div>
    <div class="col-9">
      <q-input
        borderless dense
        class="full-width form-input caller-request-panel_input"
        @update:model-value="onBuildingChange($event)"
        v-model="fiasAddressValue.building"
      />
    </div>
  </div>
  <div class="row items-center q-mb-sm">
    <div class="col-3">Номер помещения</div>
    <div class="col-9">
      <q-input
        borderless dense
        class="full-width form-input caller-request-panel_input"
        @update:model-value="onRoomChange($event)"
        v-model="fiasAddressValue.room"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { AddressElement, FiasAddress, SearchAddressRequest, Selector } from '@/data/interface/address'
import { defineComponent, computed, PropType, ref, onMounted, watch } from 'vue'
import { useAuthStore } from '@/stores/useAuth'
import { storeToRefs } from 'pinia/dist/pinia'

export default defineComponent({
  name: 'FiasAddress',
  props: {
    fiasAddress: {
      type: Object as PropType<FiasAddress>,
      default: {
        baseAddressID: '',
        building: '',
        room: ''
      } as FiasAddress
    }
  },
  emits: ['saveFias', 'saveSelectedAddresses'],
  setup (props, context) {
    const store = useAuthStore()
    const fiasAddressValue = ref<FiasAddress>(props.fiasAddress)
    if (!fiasAddressValue.value) {
      fiasAddressValue.value = {} as FiasAddress
    }
    const selectors = ref<Array<Selector>>([
      {
        key: 'Region',
        label: 'Субъект Российской Федерации',
        placeholder: 'Выберите Субъект',
        accusativeName: 'субъект федерации'
      },
      { key: 'Area', label: 'Район', placeholder: 'Выберите Район', accusativeName: 'район' },
      { key: 'City', label: 'Город', placeholder: 'Выберите Город', accusativeName: 'город' },
      {
        key: 'Place',
        label: 'Населенный пункт',
        placeholder: 'Выберите Населенный пункт',
        accusativeName: 'населенный пункт'
      },
      {
        key: 'PlanningStructure',
        label: 'Планировочная структура',
        placeholder: 'Выберите Планировочную структуру',
        accusativeName: 'структуру'
      },
      { key: 'Street', label: 'Улица', placeholder: 'Выберите Улицу', accusativeName: 'улицу' }
    ])
    const selectedAddresses = ref<{ [key: string]: AddressElement }>({})
    const loadedAddresses = ref<{ [key: string]: AddressElement[] }>({})
    const filtredAddresses = ref<{ [key: string]: AddressElement[] }>({})
    const loading = ref(false)
    const selectorsLength = computed(() => selectors.value.length)

    watch(() => props.fiasAddress.baseAddressID, async (oldAddress, newAddress) => {
      if (newAddress !== oldAddress) {
        fiasAddressValue.value = props.fiasAddress
        await updateAddress()
      }
    })
    onMounted(async () => {
      await updateAddress()
    })

    async function updateAddress () {
      selectedAddresses.value = {}
      loadedAddresses.value = {}
      filtredAddresses.value = {}
      await searchTopLevel()
      if (props.fiasAddress && props.fiasAddress.baseAddressID) {
        await loadSelected(props.fiasAddress.baseAddressID)
      }
      // context.emit('update', false)
    }
    function isDisabled (key:string):boolean {
      return !loadedAddresses.value[key]
    }
    function getOptions (key:string) {
      return filtredAddresses.value[key] ? filtredAddresses.value[key] : []
    }
    function selectorIndex (key:string):number {
      return selectors.value.findIndex((x) => x.key === key)
    }
    function isSelected (key:string):boolean {
      return !!selectedAddresses.value[key]
    }
    function nextLevelSelected (key:string):boolean {
      const index = selectorIndex(key)
      for (const item in selectedAddresses.value) {
        if (selectorIndex(item) > index) {
          return true
        }
      }
      return false
    }
    // function isLoading (key: string):boolean {
    //   return loading.value && !loadedAddresses.value[key]
    // }
    function isRequired (key:string):boolean {
      const result = !isDisabled(key) && !isSelected(key) && !nextLevelSelected(key)
      return result
    }
    async function searchTopLevel () {
      try {
        loading.value = true
        const searchRequest = { parentId: null, activeOnly: true, name: '' } as SearchAddressRequest
        const response = await store.api.fiasService.searchAddress(searchRequest)
        for (const key in response.addressItems) {
          loadedAddresses.value[key] = response.addressItems[key]
          filtredAddresses.value[key] = response.addressItems[key]
        }
      } finally {
        loading.value = false
      }
    }
    async function searchByParent (parentId: string) {
      try {
        // context.emit('update', true)
        loading.value = true
        const searchRequest = { parentId, activeOnly: true, name: '' } as SearchAddressRequest
        const response = await store.api.fiasService.searchAddress(searchRequest)
        for (const key in response.addressItems) {
          loadedAddresses.value[key] = response.addressItems[key]
          filtredAddresses.value[key] = response.addressItems[key]
        }
      } finally {
        // context.emit('update', false)
        loading.value = false
      }
    }

    function updateValue () {
      context.emit('saveFias', fiasAddressValue.value)
      context.emit('saveSelectedAddresses', selectedAddresses.value)
    }

    function onBuildingChange (selectedBuilding: any) {
      fiasAddressValue.value.building = selectedBuilding
      updateValue()
    }

    function onRoomChange (selectedRoom: any) {
      fiasAddressValue.value.room = selectedRoom
      updateValue()
    }

    function childLevels (after: number): Array<string> {
      return selectors.value.filter((value, index) => index > after).map((x) => x.key)
    }

    async function onSelect (selectedOption: AddressElement, key: string) {
      if (selectedOption) {
        selectedAddresses.value[key] = selectedOption
        fiasAddressValue.value.baseAddressID = selectedOption.id
        updateValue()
        if (selectorIndex(key) !== selectorsLength.value - 1) {
          childLevels(selectorIndex(key)).forEach((x) => {
            delete loadedAddresses.value[x]
            delete filtredAddresses.value[x]
            delete selectedAddresses.value[x]
          })
          await searchByParent(selectedOption.id)
        }
      }
    }
    async function loadSelected (id: string) {
      try {
        // context.emit('update', true)
        loading.value = true
        const response = await store.api.fiasService.getFullAddressTree(id)
        for (const key in response.addressItems) {
          loadedAddresses.value[key] = response.addressItems[key]
          filtredAddresses.value[key] = response.addressItems[key]
        }
        for (const key in response.selectedAddressItems) {
          const selectedAddress = response.selectedAddressItems[key]
          selectedAddresses.value[key] = loadedAddresses.value[key].find((x) => x.id === selectedAddress.id) as AddressElement
        }
      } finally {
        // context.emit('update', false)
        loading.value = false
      }
    }
    async function onClear (key: string) {
      fiasAddressValue.value.baseAddressID = ''
      fiasAddressValue.value.building = ''
      fiasAddressValue.value.room = ''
      updateValue()
      childLevels(selectorIndex(key)).forEach((x) => {
        delete loadedAddresses.value[x]
        delete filtredAddresses.value[x]
        delete selectedAddresses.value[x]
      })
      delete selectedAddresses.value[key]
      const parent = selectedFirstParent(key)
      if (parent != null) {
        await searchByParent(parent.id)
      }
    }

    function selectedFirstParent (key: string) {
      const fromIndex = selectorIndex(key)
      for (let i: number = fromIndex - 1; i >= 0; i--) {
        if (selectedAddresses.value[selectors.value[i].key]) {
          return selectedAddresses.value[selectors.value[i].key]
        }
      }
      return null
    }

    function filterFn (val: any, update: (arg: any) => void, key: string) {
      if (val === '') {
        update(() => {
          filtredAddresses.value[key] = loadedAddresses.value[key]
        })
        return
      }
      update(() => {
        const needle = val.toLowerCase()
        filtredAddresses.value[key] = loadedAddresses.value[key].filter(v => v.name.toLowerCase().indexOf(needle) > -1)
      })
    }

    return {
      selectorsLength,
      getOptions,
      onSelect,
      loading,
      selectors,
      selectedAddresses,
      isDisabled,
      onClear,
      fiasAddressValue,
      isRequired,
      filterFn,
      onBuildingChange,
      onRoomChange
    }
  }
})
</script>

<style scoped lang="sass">
.fias-selector
  min-width: 300px
  display: flex
  font-family: Arial
  font-size: 14px
  background: #f7f9fc
  margin-left: 2rem
  border-radius: 8px
  padding: 0rem 1rem
  outline: 1px solid #E8EEFA

.caller-request-panel_input
  min-width: 300px
  display: flex
  font-family: Arial
  font-size: 14px
  background: #f7f9fc
  margin-left: 2rem
  border-radius: 8px
  padding: 0rem 1rem
  outline: 1px solid #E8EEFA
</style>
