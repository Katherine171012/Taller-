<template>
  <div class="register-container">
    <div class="register-card">
      <h1>Crear Cuenta</h1>
      <div v-if="errorMessage" class="error-message">{{ errorMessage }}</div>

      <form @submit.prevent="handleRegister">
        <div class="form-group">
          <label>Nombre</label>
          <input v-model="name" type="text" required />
        </div>
        <div class="form-group">
          <label>Email</label>
          <input v-model="email" type="email" required />
        </div>
        <div class="form-group">
          <label>Contraseña</label>
          <input v-model="password" type="password" required minlength="6" />
        </div>
        <button type="submit" :disabled="isLoading" class="btn-primary">
          {{ isLoading ? 'Creando...' : 'Registrarme' }}
        </button>
      </form>
      <p class="link">¿Ya tienes cuenta? <router-link to="/login">Inicia sesión</router-link></p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import authService from '../services/authService'

const router = useRouter()
const name = ref('')
const email = ref('')
const password = ref('')
const errorMessage = ref('')
const isLoading = ref(false)

const handleRegister = async () => {
  isLoading.value = true
  errorMessage.value = ''
  try {
    await authService.register({ name: name.value, email: email.value, password: password.value })
    alert('¡Cuenta creada! Inicia sesión.')
    router.push('/login')
  } catch (error) {
    errorMessage.value = error.message || 'Error al registrar'
  } finally {
    isLoading.value = false
  }
}
</script>

<style scoped>
/* Reusamos estilos similares */
.register-container { display: flex; justify-content: center; align-items: center; height: 100vh; background: #f0f2f5; }
.register-card { background: white; padding: 2rem; border-radius: 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); width: 350px; }
.form-group { margin-bottom: 1rem; }
label { display: block; margin-bottom: 0.5rem; }
input { width: 100%; padding: 0.5rem; border: 1px solid #ddd; border-radius: 4px; box-sizing: border-box;}
.btn-primary { width: 100%; padding: 0.75rem; background: #2196F3; color: white; border: none; border-radius: 4px; cursor: pointer; }
.error-message { color: red; margin-bottom: 1rem; text-align: center; }
.link { text-align: center; margin-top: 1rem; }
</style>