<template>
    <Header></Header>
 <q-card class="main-panel q-ma-sm column justify-between">
      <p class="header">Управление списками абонентов</p>
        <accordion>
          <accordion-item @click="rotateGreen">
            <template #accordion-trigger>
              <h3 class="title glist" v-bind:class="{ titleclick: toogle.toogleGreen }">Зеленый список</h3>
            </template>
            <template #accordion-content>
              <GreenList/>
            </template>
          </accordion-item>
          <accordion-item @click="rotateYellow">
            <template #accordion-trigger>
              <h3 class="title ylist" v-bind:class="{ titleclick: toogle.toogleYellow }">Желтый список</h3>
            </template>
            <template #accordion-content>
             <YellowList/>
            </template>
          </accordion-item>
          <accordion-item @click="rotateBlack">
            <template #accordion-trigger>
              <h3 class="title blist" v-bind:class="{ titleclick: toogle.toogleBlack }">Черный список</h3>
            </template>
            <template #accordion-content>
             <BlackList/>
            </template>
          </accordion-item>
          <accordion-item @click="rotateDisa">
            <template #accordion-trigger >
              <h3 class="title list" v-bind:class="{ titleclick: toogle.toogleDisa }">Список DISA</h3>
            </template>
            <template #accordion-content>
             <DisaList/>
            </template>
          </accordion-item>
          <accordion-item @click="rotateUido">
            <template #accordion-trigger>
              <h3 class="title list" v-bind:class="{ titleclick: toogle.toogleUido }">Список УИДО</h3>
            </template>
            <template #accordion-content>
              <UidoList/>
            </template>
          </accordion-item>
          <accordion-item @click="rotateSpecialist">
            <template #accordion-trigger>
              <h3 class="title list " v-bind:class="{ titleclick: toogle.toogleSpecialist }">Список специалистов</h3>
            </template>
            <template #accordion-content>
              <SpecialistList/>
            </template>
          </accordion-item>
        </accordion>

  </q-card>
</template>
<script>
import Accordion from '@/ui/accordion/accordionTable.vue'
import AccordionItem from '@/ui/accordion/accordionItem.vue'
import GreenList from '@/components/AbonentList/GreenList.vue'
import YellowList from '@/components/AbonentList/YellowList.vue'
import BlackList from '@/components/AbonentList/BlackList.vue'
import DisaList from '@/components/AbonentList/ListDisa.vue'
import UidoList from '@/components/AbonentList/ListUido.vue'
import SpecialistList from '@/components/AbonentList/ListSpecialists.vue'
import Header from '@/layouts/HeaderComponent.vue'
import { reactive } from 'vue'

export default {
  name: 'selectAbonentList',
  components: {
    Accordion, AccordionItem, GreenList, BlackList, DisaList, UidoList, SpecialistList, YellowList, Header
  },
  setup () {
    var toogle = reactive({
      toogleBlack: false,
      toogleGreen: false,
      toogleYellow: false,
      toogleDisa: false,
      toogleUido: false,
      toogleSpecialist: false
    })
    function rotateBlack () {
      toogle.toogleBlack = !toogle.toogleBlack
    }
    function rotateGreen () {
      toogle.toogleGreen = !toogle.toogleGreen
    }
    function rotateYellow () {
      toogle.toogleYellow = !toogle.toogleYellow
    }
    function rotateDisa () {
      toogle.toogleDisa = !toogle.toogleDisa
    }
    function rotateUido () {
      toogle.toogleUido = !toogle.toogleUido
    }
    function rotateSpecialist () {
      toogle.toogleSpecialist = !toogle.toogleSpecialist
    }
    return {
      rotateDisa, toogle, rotateBlack, rotateGreen, rotateYellow, rotateUido, rotateSpecialist
    }
  }
}
</script>
<style scoped lang="sass">
.title
  font-weight: 700
  font-size: 16px
  line-height: 18px
  position: relative
.title::after
  content: ''
  position: absolute
  width: 25px
  height: 25px
  left: 85vw
  background: url(@/img/bird.png) no-repeat
  transform: rotate(0deg)
.titleclick::after
  transform: rotate(180deg)
  content: ''
  position: absolute
  width: 25px
  height: 25px
  left: 85vw
  background: url(@/img/bird.png) no-repeat

.glist
  background: url(@/img/glist.svg) no-repeat
  padding: 0 0 0 25px
  left: 25px
.ylist
  background: url(@/img/ylist.svg) no-repeat
  padding: 0 0 0 25px
  left: 25px

.blist
  background: url(@/img/blist.svg) no-repeat
  padding: 0 0 0 25px
  left: 25px
.list
  left: 25px
.header
  font-weight: 700
  font-size: 18px
  line-height: 21px
  margin: 0 0 0 20px
::v-deep.q-btn--outline:before
  border: none
::v-deep.q-card
  box-shadow: none

</style>
