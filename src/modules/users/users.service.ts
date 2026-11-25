import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { hashPassword } from '../auth/password.util.js';
import { isPrismaError } from '../prisma/prisma-error.util.js';
import { PrismaService } from '../prisma/prisma.service.js';
import { CreateUserDto } from './dto/create-user.dto.js';
import { UpdateUserDto } from './dto/update-user.dto.js';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto) {
    const { contrasena, ...userData } = createUserDto;

    try {
      return await this.prisma.usuario.create({
        data: {
          ...userData,
          contrasenaHash: await hashPassword(contrasena),
        },
        select: this.publicUserFields(),
      });
    } catch (error) {
      this.handlePrismaError(error);
    }
  }

  findAll() {
    return this.prisma.usuario.findMany({
      select: this.publicUserFields(),
      orderBy: { id: 'asc' },
    });
  }

  async findOne(id: number) {
    const usuario = await this.prisma.usuario.findUnique({
      where: { id },
      select: this.publicUserFields(),
    });

    if (!usuario) {
      throw new NotFoundException(`No existe un usuario con id ${id}.`);
    }

    return usuario;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    await this.findOne(id);
    const { contrasena, ...userData } = updateUserDto;

    try {
      return await this.prisma.usuario.update({
        where: { id },
        data: {
          ...userData,
          contrasenaHash: contrasena
            ? await hashPassword(contrasena)
            : undefined,
        },
        select: this.publicUserFields(),
      });
    } catch (error) {
      this.handlePrismaError(error);
    }
  }

  async remove(id: number) {
    await this.findOne(id);

    return this.prisma.usuario.delete({
      where: { id },
      select: this.publicUserFields(),
    });
  }

  private publicUserFields() {
    return {
      id: true,
      nombre: true,
      correo: true,
      activo: true,
      rolId: true,
      fechaCreacion: true,
      rol: {
        select: {
          id: true,
          nombre: true,
        },
      },
    } as const;
  }

  private handlePrismaError(error: unknown): never {
    if (isPrismaError(error, 'P2002')) {
      throw new ConflictException('Ya existe un usuario con ese correo.');
    }

    if (isPrismaError(error, 'P2003')) {
      throw new BadRequestException('El rol indicado no existe.');
    }

    throw error;
  }
}
