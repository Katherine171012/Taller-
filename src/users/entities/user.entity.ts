export class User {
  /**
   * Identificador único del usuario.
   * En este taller simulado, será un número auto-incremental (1, 2, 3...).
   */
  id: number;

  /**
   * Nombre completo del usuario.
   */
  nombre: string;

  /**
   * Correo electrónico único para iniciar sesión.
   */
  email: string;

  /**
   * Contraseña encriptada (hash).
   * IMPORTANTE: Nunca guardar contraseñas en texto plano.
   */
  password: string;

  /**
   * Fecha de creación del registro.
   */
  createdAt: Date;
}
