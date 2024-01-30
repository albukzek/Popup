<template>
    <Header></Header>
    <div class="column items-center">
    <q-form @submit="submitForm">
      <q-card-section class="column">
        <p class="title">Вход в систему</p>
        <div class="fields login">
          <q-input
            class="input"
            outlined
            dense
            placeholder="Введите ваш логин"
            v-model="formData.username"
          ></q-input>
        </div>
        <div class="fields">
          <q-input
            class="input"
            outlined
            dense
            placeholder="Введите ваш пароль"
            v-model="formData.password"
            type="password"
          ></q-input>
        </div>
        <small v-if="errAuth" class="error">Неверная комбинация логина и пароля.</small>
      </q-card-section>
      <q-card-actions align="right">
        <q-btn
          class="btn btn-active"
          no-caps
          type="submit"
        >Войти
        </q-btn>
      </q-card-actions>
    </q-form>
</div>
</template>

<script>
import { reactive, ref, onUnmounted } from 'vue'
import serviceAuth from '@/logic/auth'
import Header from '@/layouts/HeaderComponent.vue'

export default {
  name: 'authView',
  components: {
    Header
  },
  setup () {
    const { store, router, errAuth, formData } = serviceAuth()

    onUnmounted(() => {
      console.log('unmounted')
      localStorage.removeItem('auth')
    })

    const submitForm = async () => {
      try {
        const response = await store.api.authService.login(formData)
        store.$patch({
          token: response.token
        })
        console.log('window.location.pathname', window.location.pathname)
        switch (window.location.pathname) {
          case '/report':
            router.push('/select')
            break
          case '/abonent':
            router.push('/list')
            break
          case '/record':
            router.push('/records')
            break
          case '/message':
            router.push('/messages')
            break
        }
        // window.location.pathname === '/report' ? router.push('/select') : router.push('/list')
      } catch (e) {
        console.log(e)
        errAuth.value = true
      }
    }
    return {
      submitForm, formData, errAuth
    }
  }
}
</script>
<style lang="sass" scoped>
//  .wrapper
.fields
  display: flex
  align-items: center
  justify-content: space-between

.label
  padding: 0 15px 22px 0
  font-weight: 700
.input
  width: 320px
  background-color: $bg-input
  border: solid 2px $border-color
  border-radius: 8px
.btn
  margin: auto
  width: 320px
.error
  color: $error
.title
  padding: 125px 0 0 0
  margin: auto
  font-weight: 700
  font-size: 18px
  line-height: 20.7px
.login
  margin: 32px 0 12px 0
::v-deep.q-field--outlined .q-field__control:hover:before
 border: none
::v-deep.q-field--outlined .q-field__control:before
 border: none

// ::v-deep.q-field__input, .q-field__native, .q-field__prefix, .q-field__suffix
//  color: $error
//  font-family: 'Arial'
//  font-style: normal
//  font-weight: 400
//  font-size: 14px
//  line-height: 16px
// ::v-deep.q-field__native, .q-field__input
//  color: $error
//  font-family: 'Arial'
//  font-style: normal
//  font-weight: 400
//  font-size: 14px
//  line-height: 16px
</style>
