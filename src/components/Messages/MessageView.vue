<template>
<div class="q-pl-lg q-pr-lg" v-if="!loading">
  <q-card class="caller-request-panel column justify-around q-mb-md">
    <div class="row q-ma-lg caller-request-panel_header">
      Обработка коротких текстовых сообщений (CMC)
    </div>
    <div class="row q-ma-lg subtitle">
      <span>{{currentMessageText}}</span>
    </div>
  </q-card>

  <q-card class="caller-request-panel column justify-around q-mb-md">
    <div class="row q-ma-lg caller-request-panel_header">Информация об абоненте</div>
    <div class="row q-ma-lg justify-between caller-request-panel_texts">
      <div class="col-4">
        <div class="row items-center q-mb-sm">
          <div class="col-2">Абонент</div>
          <div class="col-10">
            <q-select
              borderless dense
              class="form-input caller-request-panel_input"
              v-model="selectedCallerFIO"
              :options="callersFullNames"
              @update:model-value="selectCaller"
            >
            </q-select>
          </div>
        </div>
        <div class="row items-center q-mb-sm">
          <div class="col-2">Фамилия</div>
          <div class="col-10">
            <q-input v-model="selectedCallerInfo.lastName" debounce="500"
                     @update:model-value="updateSelectedName"
                     bottom-slots borderless dense class="caller-request-panel_input" placeholder="Введите фамилию">
            </q-input>
          </div>
        </div>
        <div class="row items-center q-mb-sm">
          <div class="col-2">Имя</div>
          <div class="col-10">
            <q-input v-model="selectedCallerInfo.firstName" debounce="500"
                     @update:model-value="updateSelectedName"
                     bottom-slots borderless dense class="caller-request-panel_input" placeholder="Введите имя">
            </q-input>
          </div>
        </div>
        <div class="row items-center q-mb-sm">
          <div class="col-2">Отчество</div>
          <div class="col-10">
            <q-input v-model="selectedCallerInfo.patronymic" debounce="500"
                     @update:model-value="updateSelectedName"
                     borderless dense class="caller-request-panel_input" placeholder="Введите отчество"/>
          </div>
        </div>
        <div class="row items-center q-mb-sm">
          <div class="col-2">Телефон</div>
          <div class="col-10">
            <q-input v-model="selectedCallerInfo.phoneNumber"
                     bottom-slots borderless dense class="caller-request-panel_input"
                     mask="+7 (###) ###-##-##" placeholder="+7 (___) ___-__-__">
            </q-input>
          </div>
        </div>
        <div class="row items-center q-mb-sm">
          <div class="col-2">Факс</div>
          <div class="col-10">
            <q-input v-model="selectedCallerInfo.faxNumber"
                     bottom-slots borderless dense class="caller-request-panel_input"
                     mask="+7 (###) ###-##-##" placeholder="+7 (___) ___-__-__">
            </q-input>
          </div>
        </div>
         <div class="row items-center q-mb-sm">
          <div class="col-2">Email</div>
          <div class="col-10">
            <q-input v-model="selectedCallerInfo.email" debounce="500"
                     @update:model-value="updateSelectedName"
                     borderless dense class="caller-request-panel_input" placeholder="Введите email"/>
          </div>
        </div>
      </div>
      <div class="col-6">
        <div class="row items-center">
          <div class="col">
            <q-checkbox dense class="items-start" v-model="selectedCallerInfo.russiaCountry" label="Заявитель из РФ"/>
          </div>
        </div>
<!--        ====== Данные адреса из ФИАС, если абонент из РФ ======       -->
        <FiasAddress v-if="selectedCallerInfo.russiaCountry ===  true"
          :fias-address="{baseAddressID: selectedCallerInfo.fiasAddress,
                          building: selectedCallerInfo.houseNumber,
                          room: selectedCallerInfo.roomNumber}"
          @save-fias="saveFiasData"
          @save-selected-addresses="saveAddressData"/>
        <div v-else class="row items-center">
          <div class="col-3">Адрес</div>
          <div class="col-9">
            <q-input borderless dense v-model="selectedCallerInfo.foreignAddress"
                     class="caller-request-panel_input" placeholder="Введите адрес"/>
          </div>
        </div>
        <div class="row items-center q-mb-sm">
          <div class="col-3">Тип адреса</div>
          <div class="col-9">
            <q-input borderless dense v-model="selectedCallerInfo.addressType"
                     class="caller-request-panel_input" placeholder="Введите тип адреса"/>
          </div>
        </div>
        <div class="row items-center">
          <div class="col-3">Дополнительный адрес</div>
          <div class="col-9">
            <q-input borderless dense v-model="selectedCallerInfo.additionalAddress"
                     class="caller-request-panel_input" placeholder="Введите тип адреса"/>
          </div>
        </div>
      </div>
    </div>
  </q-card>
  <q-card class="caller-request-panel column justify-around q-mb-md">
     <div class="row q-ml-lg q-mr-lg q-mt-md caller-request-panel_header">Формирование</div>
    <div class="row q-ml-lg q-mr-lg q-mt-md justify-between caller-request-panel_texts">
      <div class="col-4">
        <div class="row">
          <span style="font-weight:bold">
            {{currentMessage.date}}
          </span>
          <span class="q-pl-sm">
            {{selectedCallerInfo.editedMessage}}
          </span>
        </div>
      </div>
      <div class="col-8" style="text-align: right;">
<!--        <q-btn text-color="black" class="btn-all" @click="showAnnotationDialog = true" label="Аннотация" />-->
      </div>
    </div>
   <div class="row q-ml-lg q-mr-lg caller-request-panel_header">СМС-Диалог</div>
    <div class="row q-ml-lg q-mr-lg q-mt-md justify-between caller-request-panel_texts">
      <div class="col-4">
        <div class="row">
          <span style="font-weight:bold">
            {{getDate(currentMessage.received)}}
          </span>
          <span class="q-pl-sm">
            {{currentMessage.text}}
          </span>
        </div>
        <div class="row q-mt-md q-mb-md">
          <q-input v-model="currentMessage.text" debounce="500"
                   @update:model-value="updateSelectedName"
                   type="textarea"
                   borderless dense class="caller-request-panel_text"/>
        </div>
      </div>
    </div>
  </q-card>
   <q-card class="caller-request-panel column justify-around">
       <div class="row q-ma-lg caller-request-panel_header">Классификация</div>
     <div class="row q-ml-lg q-mb-lg q-mr-lg q-mt-md justify-between caller-request-panel_texts">
       <div class="col-12">
         <div class="row items-center q-mb-sm">
          <div class="col-8">
            <q-select
              borderless dense
              class="form-input caller-request-panel_text"
              v-model="selectedStatus"
              :options="statuses"
              option-label="label"
              option-value="value"
            >
            </q-select>
          </div>
         <div class="col-4 q-pl-md">
           <q-btn text-color="black" class="btn-all" :disable="isAnswerDisabled" @click="showOutgoingSms" label="Ответ" />
         </div>
        </div>
       </div>
     </div>
    </q-card>
  <div class="column items-end">
    <div class="col q-pa-md q-gutter-sm">
      <q-btn color="red" class="btn-all" text-color="black" @click="$router.push({ name: 'messagesTable' })" label="Закрыть" />
      <q-btn v-if="isEdited" color="green" class="btn-all" disabled label="Редактировать" />
      <q-btn v-else color="green" class="btn-all" @click="saveCard" label="Сформировать" />
    </div>
  </div>
</div>
  <q-inner-loading
    dense
    :showing="loading"
    label-class="text-teal"
    label-style="font-size: 1.1em"
  />
<q-dialog v-model="showAnnotationDialog" persistent>
  <q-card style="width: 350px">
    <q-card-section class="row items-center">
        <span class="q-ml-sm">Аннотация</span>
    </q-card-section>
  </q-card>
</q-dialog>

<q-dialog v-model="showOutgoingSmsPopup" persistent>
  <q-card style="width: 500px">
    <q-card-section class="row items-center">
      <span class="q-ml-sm">{{ selectedStatus.label }}</span>
    </q-card-section>
    <q-card-section class="row items-center">
      <q-input v-model="outgoingSmsText" debounce="500"
               type="textarea"
               borderless dense class="outgoing-sms_text-panel" />
    </q-card-section>

    <q-card-actions align="right">
      <q-btn label="Отмена" no-caps class="btn-all" v-close-popup />
      <q-btn label="Отправить" type="primary" no-caps class="btn-all" @click="saveOutgoingSms" v-close-popup />
    </q-card-actions>
  </q-card>
</q-dialog>

<q-dialog v-model="alertNoClassification">
  <q-card>
    <q-card-section class="q-pt-md">
      Выберите классификацию
    </q-card-section>
    <q-card-actions align="center">
      <q-btn label="OK" color="primary" v-close-popup />
    </q-card-actions>
  </q-card>
</q-dialog>
</template>

<script lang="ts">
import { onBeforeMount, computed } from 'vue'
import { messageLogic } from '@/logic/messages'
import FiasAddress from '../../components/Common/FiasAddress.vue'
export default {
  name: 'MessageView',
  components: { FiasAddress },
  props: {
    messageId: {
      type: String,
      default: () => ''
    }
  },
  setup (props: any) {
    const {
      getCurrentMessage,
      currentMessage,
      loading,
      selectedCallerInfo,
      selectedCallerFIO,
      callersFullNames,
      selectCaller,
      updateSelectedName,
      saveFiasData,
      saveAddressData,
      statuses,
      showAnnotationDialog,
      getDate,
      saveCard,
      selectedStatus,
      isEdited,
      alertNoClassification,
      outgoingSmsText,
      showOutgoingSms,
      showOutgoingSmsPopup,
      saveOutgoingSms
    } = messageLogic()
    onBeforeMount(() => {
      getCurrentMessage(props.messageId)
    })
    // Валидация телефона
    const isPhoneNumberValid = computed(() => {
      if (selectedCallerInfo.value.phoneNumber !== undefined) {
        if (selectedCallerInfo.value.phoneNumber.length > 0) {
          if (selectedCallerInfo.value.phoneNumber.length === 18) { return true } else { return false }
        }
      }
      return true
    })

    // Валидация факса
    const isFaxNumberValid = computed(() => {
      if (selectedCallerInfo.value.faxNumber !== undefined) {
        if (selectedCallerInfo.value.faxNumber.length > 0) {
          if (selectedCallerInfo.value.faxNumber.length === 18) { return true } else { return false }
        }
      }
      return true
    })

    // Блокировка кнопки "Ответ"
    const isAnswerDisabled = computed(() => {
      return !(selectedStatus.value.value === 'Clarification')
      // || selectedStatus.value.value === 'WithRedirection' ||
      // selectedStatus.value.value === 'Spam' ||
      // selectedStatus.value.value === 'InformationRequest' ||
      // selectedStatus.value.value === 'Urgent')
    })

    const currentMessageText = computed(() => {
      let resultText = ''
      if (currentMessage.value.senderPhoneNumber !== undefined && currentMessage.value.senderPhoneNumber != null && currentMessage.value.senderPhoneNumber.length > 0 && currentMessage.value.senderPhoneNumber !== '-') {
        resultText = currentMessage.value.senderPhoneNumber
      }
      if (currentMessage.value.fio !== undefined && currentMessage.value.fio != null && currentMessage.value.fio.length > 0 && currentMessage.value.fio !== '-') {
        resultText = resultText + ', ' + currentMessage.value.fio
      }
      if (currentMessage.value.address !== undefined && currentMessage.value.address != null && currentMessage.value.address.length > 0 && currentMessage.value.address !== '-') {
        resultText = resultText + ', ' + currentMessage.value.address
      }
      return resultText
    })

    return {
      currentMessage,
      loading,
      selectedCallerInfo,
      selectedCallerFIO,
      callersFullNames,
      selectCaller,
      updateSelectedName,
      saveFiasData,
      saveAddressData,
      showAnnotationDialog,
      getDate,
      saveCard,
      statuses,
      selectedStatus,
      isEdited,
      currentMessageText,
      alertNoClassification,
      isAnswerDisabled,
      showOutgoingSms,
      showOutgoingSmsPopup,
      outgoingSmsText,
      saveOutgoingSms
    }
  }
}
</script>

<style scoped>

</style>
