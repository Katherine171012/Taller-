import { createRouter, createWebHistory } from 'vue-router'
import authService from '../services/authService'

// Importamos las vistas que acabas de crear
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'
import RegisterView from '../views/RegisterView.vue'
import ProfileView from '../views/ProfileView.vue'

const routes = [
  { path: '/', component: HomeView },
  { path: '/login', component: LoginView },
  { path: '/register', component: RegisterView },
  { 
    path: '/profile', 
    component: ProfileView,
    meta: { requiresAuth: true } // Esta ruta está protegida
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

// GUARDIA DE SEGURIDAD:
// Antes de entrar a una página, revisa si necesita permiso
router.beforeEach((to, from, next) => {
  const isAuthenticated = authService.isAuthenticated()

  // Si la ruta requiere auth y NO estamos logueados -> al Login
  if (to.meta.requiresAuth && !isAuthenticated) {
    next('/login')
  } 
  // Si ya estamos logueados e intentamos ir al Login -> al Perfil
  else if ((to.path === '/login' || to.path === '/register') && isAuthenticated) {
    next('/profile')
  } 
  else {
    next() // Pase adelante
  }
})

export default router