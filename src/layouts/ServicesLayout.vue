<template>
  <div class="wrapper">
    <div class="inwrapper">
      <div class="body">
        <router-view/>
      </div>
    </div>
  </div>
</template>

<style lang="sass" scoped>
.wrapper
  background-color: $bg-input
  padding: 40px 40px 40px 40px
  min-height: 100vh
.inwrapper
  background-color: #FFFFFF
  border-radius: 11px
  box-shadow: 0px 3px 20px rgba(198, 212, 225, 0.3)
  height: 85vh
</style>
