<template>
  <q-layout view="lHh Lpr lFf">
    <ServiceLayout></ServiceLayout>
  </q-layout>
</template>
<script>
import ServiceLayout from './layouts/ServicesLayout.vue'
// import serviceSelect from '@/logic/select'

export default {
  name: 'LayoutDefault',
  components: {
    ServiceLayout
  },
  setup () {
    // const { router } = serviceSelect()

    // function tik () {
    //   router.push('report')
    // }
    return {
      // tik
    }
  }
}
</script>
