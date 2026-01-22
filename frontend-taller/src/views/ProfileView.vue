<template>
  <div class="profile-container">
    <div class="profile-card" v-if="user">
      <h1>Mi Perfil</h1>
      <div class="avatar">{{ user.nombre ? user.nombre.charAt(0) : 'U' }}</div>
      <div class="info">
        <p><strong>Nombre:</strong> {{ user.nombre }}</p>
        <p><strong>Email:</strong> {{ user.email }}</p>
        <p><strong>ID:</strong> {{ user.userId || user.sub }}</p>
      </div>
      <button @click="logout" class="btn-logout">Cerrar Sesión</button>
    </div>
    <div v-else>Cargando...</div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import authService from '../services/authService'

const router = useRouter()
const user = ref(null)

onMounted(async () => {
  try {
    user.value = await authService.getProfile()
  } catch (error) {
    authService.logout()
    router.push('/login')
  }
})

const logout = () => {
  authService.logout()
  router.push('/login')
}
</script>

<style scoped>
.profile-container { display: flex; justify-content: center; align-items: center; height: 100vh; background: #f0f2f5; }
.profile-card { background: white; padding: 2rem; border-radius: 8px; width: 400px; text-align: center; box-shadow: 0 4px 6px rgba(0,0,0,0.1); }
.avatar { width: 80px; height: 80px; background: #673AB7; color: white; border-radius: 50%; display: flex; justify-content: center; align-items: center; font-size: 2rem; margin: 0 auto 1rem; }
.info { text-align: left; margin-bottom: 2rem; }
.btn-logout { background: #ff5252; color: white; border: none; padding: 0.5rem 1rem; border-radius: 4px; cursor: pointer; width: 100%; }
</style>