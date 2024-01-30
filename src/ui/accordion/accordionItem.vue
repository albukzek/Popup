<template>
  <li class="accordion__item">
    <div
      class="accordion__trigger"
      :class="{'accordion__trigger_active': visible}"
      @click="open">
      <!-- This slot will handle the title/header of the accordion and is the part you click on -->
      <slot name="accordion-trigger"></slot>
    </div>
    <transition
      name="accordion"
      @enter="start"
      @after-enter="end"
      @before-leave="start"
      @after-leave="end">
      <div class="accordion__content"
        v-show="visible">
        <ul>
          <!-- This slot will handle all the content that is passed to the accordion -->
          <slot name="accordion-content"></slot>
        </ul>
      </div>
    </transition>
  </li>
</template>
<script>
export default {
  props: {},
  inject: ['Accordion'],
  data () {
    return {
      index: null
    }
  },
  computed: {
    visible () {
      return this.index === this.Accordion.active
    }
  },
  methods: {
    open () {
      if (this.visible) {
        this.Accordion.active = null
      } else {
        this.Accordion.active = this.index
      }
    },
    start (el) {
      el.style.height = el.scrollHeight + 'px'
    },
    end (el) {
      el.style.height = ''
    }
  },
  created () {
    this.index = this.Accordion.count++
  }
}
</script>

<style lang="sass" scoped>
.accordion__item
  cursor: pointer
  padding: 10px 20px 10px 20px
  position: relative
.accordion__trigger
  display: flex
  justify-content: space-between
  background-color: #F8FBFE
  border-radius: 11px
  // max-width: 65vw
  // margin: 0 0 0 50px

.accordion-enter-active
  will-change: height, opacity
  transition: height 0.3s ease, opacity 0.3s ease
  overflow: hidden
.accordion-leave-active
  will-change: height, opacity
  transition: height 0.3s ease, opacity 0.3s ease
  overflow: hidden

.accordion-enter,
.accordion-leave-to
  height: 0 !important
  opacity: 0
.accordion__content
  // max-width: 75vw
</style>
