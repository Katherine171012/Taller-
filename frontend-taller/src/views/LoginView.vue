<template>
  <div class="login-container">
    <div class="login-card">
      <h1>Iniciar Sesión</h1>
      <div v-if="errorMessage" class="error-message">{{ errorMessage }}</div>

      <form @submit.prevent="handleLogin">
        <div class="form-group">
          <label>Email</label>
          <input v-model="email" type="email" required :disabled="isLoading" />
        </div>
        <div class="form-group">
          <label>Contraseña</label>
          <input v-model="password" type="password" required :disabled="isLoading" />
        </div>
        <button type="submit" :disabled="isLoading" class="btn-primary">
          {{ isLoading ? 'Cargando...' : 'Entrar' }}
        </button>
      </form>
      <p class="link">¿No tienes cuenta? <router-link to="/register">Regístrate</router-link></p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import authService from '../services/authService'

const router = useRouter()
const email = ref('')
const password = ref('')
const errorMessage = ref('')
const isLoading = ref(false)

const handleLogin = async () => {
  errorMessage.value = ''
  isLoading.value = true
  try {
    await authService.login({ email: email.value, password: password.value })
    router.push('/profile')
  } catch (error) {
    errorMessage.value = error.message || 'Error al entrar'
  } finally {
    isLoading.value = false
  }
}
</script>

<style scoped>
.login-container { display: flex; justify-content: center; align-items: center; height: 100vh; background: #f0f2f5; }
.login-card { background: white; padding: 2rem; border-radius: 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); width: 350px; }
.form-group { margin-bottom: 1rem; }
label { display: block; margin-bottom: 0.5rem; }
input { width: 100%; padding: 0.5rem; border: 1px solid #ddd; border-radius: 4px; box-sizing: border-box;} /* box-sizing arregla el ancho */
.btn-primary { width: 100%; padding: 0.75rem; background: #4CAF50; color: white; border: none; border-radius: 4px; cursor: pointer; }
.btn-primary:disabled { background: #ccc; }
.error-message { color: red; margin-bottom: 1rem; text-align: center; }
.link { text-align: center; margin-top: 1rem; }
</style>