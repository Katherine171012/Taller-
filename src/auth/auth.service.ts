import { Injectable, UnauthorizedException, ConflictException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

import { UsersService } from '../users/users.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  // 🔐 REGISTRO
  async register(registerDto: RegisterDto) {
    const { nombre, email, password } = registerDto;

    // 1. Verificar si el usuario ya existe
    const existingUser = this.usersService.findByEmail(email);
    if (existingUser) {
      throw new ConflictException('El email ya está registrado');
    }

    // 2. Hashear contraseña
    const hashedPassword = await bcrypt.hash(password, 10);

    // 3. Crear usuario
    const user = this.usersService.create({
      nombre,
      email,
      password: hashedPassword,
    });

    // 4. Retornar sin contraseña
    const { password: _, ...result } = user;

    return {
      message: 'Usuario registrado correctamente',
      user: result,
    };
  }

  // 🔐 LOGIN
  async login(loginDto: LoginDto) {
    const { email, password } = loginDto;

    // 1. Buscar usuario
    const user = this.usersService.findByEmail(email);
    if (!user) {
      throw new UnauthorizedException('Credenciales inválidas');
    }

    // 2. Comparar contraseñas
    const passwordValid = await bcrypt.compare(password, user.password);
    if (!passwordValid) {
      throw new UnauthorizedException('Credenciales inválidas');
    }

    // 3. Crear payload del token
    const payload = {
      sub: user.id,
      email: user.email,
    };

    // 4. Firmar token
    const access_token = this.jwtService.sign(payload);

    return {
      message: 'Login exitoso',
      access_token,
    };
  }
}
