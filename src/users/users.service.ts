import { Injectable } from '@nestjs/common';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  // Simulamos una base de datos en memoria
  private users: User[] = [];

  // Contador para IDs autoincrementales
  private idCounter = 1;

  /**
   * Crear un nuevo usuario
   * (se usa en el registro)
   */
  create(userData: Omit<User, 'id' | 'createdAt'>): User {
    const newUser: User = {
      id: this.idCounter++,
      ...userData,
      createdAt: new Date(),
    };

    this.users.push(newUser);
    return newUser;
  }

  /**
   * Buscar usuario por email
   * (se usa en login y para validar duplicados)
   */
  findByEmail(email: string): User | undefined {
    return this.users.find(user => user.email === email);
  }

  /**
   * Buscar usuario por ID
   * (se usa para perfil)
   */
  findById(id: number): User | undefined {
    return this.users.find(user => user.id === id);
  }

  /**
   * Obtener todos los usuarios SIN contraseña
   */
  findAll(): Omit<User, 'password'>[] {
    return this.users.map(({ password, ...rest }) => rest);
  }
}
