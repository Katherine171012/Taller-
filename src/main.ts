import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // ✅ NUEVO: Habilitar CORS para que Vue.js se pueda conectar
  app.enableCors({
    origin: 'http://localhost:5173', // Este es el puerto donde corre Vue/Vite
    credentials: true,
  });
  
  // Habilitar validación automática de DTOs
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,  // Elimina propiedades no definidas en el DTO
    transform: true,  // Transforma tipos automáticamente
  }));
  
  await app.listen(3000);
  console.log('🚀 Servidor corriendo en http://localhost:3000');
}
bootstrap();