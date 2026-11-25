import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service.js';
import { UsersService } from '../users/users.service.js';
import { LoginAuthDto } from './dto/login-auth.dto.js';
import { RegisterAuthDto } from './dto/register-auth.dto.js';
import { comparePassword } from './password.util.js';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  register(registerAuthDto: RegisterAuthDto) {
    return this.usersService.create(registerAuthDto);
  }

  async login(loginAuthDto: LoginAuthDto) {
    const usuario = await this.prisma.usuario.findUnique({
      where: { correo: loginAuthDto.correo },
      include: { rol: true },
    });

    if (
      !usuario ||
      !usuario.activo ||
      !(await comparePassword(loginAuthDto.contrasena, usuario.contrasenaHash))
    ) {
      throw new UnauthorizedException('Correo o contraseña incorrectos.');
    }

    const accessToken = await this.jwtService.signAsync({
      sub: usuario.id,
      correo: usuario.correo,
      rol: usuario.rol.nombre,
    });

    return {
      accessToken,
      usuario: {
        id: usuario.id,
        nombre: usuario.nombre,
        correo: usuario.correo,
        rol: usuario.rol.nombre,
      },
    };
  }
}
