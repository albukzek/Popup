import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
// import { useAuthStore } from '@/stores/useAuth'
import { useAuthStore } from '@/stores/useAuth'

function serviceAuth () {
  const store = useAuthStore()
  const router = useRouter()
  const errAuth = ref(false)
  const formData = reactive({
    username: null,
    password: null
  })
  return {
    store, router, errAuth, formData
  }
}
export default serviceAuth
