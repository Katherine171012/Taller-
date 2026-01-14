import { IsEmail, IsString, MinLength, MaxLength } from 'class-validator';

export class RegisterDto {
  @IsString()
  @MaxLength(100, { message: 'El nombre no debe superar los 100 caracteres' })
  nombre: string;

  @IsEmail({}, { message: 'Debe proporcionar un email válido' })
  email: string;

  @IsString()
  @MinLength(6, { message: 'La contraseña debe tener al menos 6 caracteres' })
  password: string;
}
