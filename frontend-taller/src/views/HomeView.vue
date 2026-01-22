<template>
  <div class="home">
    <h1>Bienvenido al Taller Vue + NestJS</h1>
    <div class="actions">
      <router-link to="/login" class="btn">Iniciar Sesión</router-link>
      <router-link to="/register" class="btn outline">Registrarse</router-link>
    </div>
  </div>
</template>

<style scoped>
.home { display: flex; flex-direction: column; align-items: center; justify-content: center; height: 100vh; text-align: center; }
.actions { display: flex; gap: 1rem; margin-top: 2rem; }
.btn { padding: 10px 20px; background: #42b883; color: white; text-decoration: none; border-radius: 4px; }
.btn.outline { background: transparent; border: 2px solid #42b883; color: #42b883; }
</style>