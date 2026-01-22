import api from './api'

const authService = {
  // 1. Registrar usuario
  async register(userData) {
    try {
      const response = await api.post('/auth/register', userData)
      return response.data
    } catch (error) {
      throw error.response?.data || { message: 'Error de conexión' }
    }
  },

  // 2. Iniciar sesión
  async login(credentials) {
    try {
      const response = await api.post('/auth/login', credentials)
      // Guardar el token en el navegador
      if (response.data.access_token) {
        localStorage.setItem('access_token', response.data.access_token)
      }
      return response.data
    } catch (error) {
      throw error.response?.data || { message: 'Error de conexión' }
    }
  },

  // 3. Obtener perfil
  async getProfile() {
    try {
      const response = await api.get('/auth/profile')
      return response.data
    } catch (error) {
      throw error.response?.data || { message: 'Error al obtener perfil' }
    }
  },

  // 4. Cerrar sesión
  logout() {
    localStorage.removeItem('access_token')
  },

  // 5. Verificar si está logueado
  isAuthenticated() {
    return !!localStorage.getItem('access_token')
  }
}

export default authService