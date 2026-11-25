import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import { isPrismaError } from '../prisma/prisma-error.util.js';
import { CreateEspecialistaDto } from './dto/create-especialista.dto.js';
import { UpdateEspecialistaDto } from './dto/update-especialista.dto.js';

@Injectable()
export class EspecialistasService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createEspecialistaDto: CreateEspecialistaDto) {
    try {
      return await this.prisma.especialista.create({
        data: createEspecialistaDto,
      });
    } catch (error) {
      if (isPrismaError(error, 'P2002')) {
        throw new ConflictException(
          'Ya existe un especialista con esa matrícula o correo.',
        );
      }
      throw error;
    }
  }

  findAll() {
    return this.prisma.especialista.findMany({ orderBy: { id: 'asc' } });
  }

  async findOne(id: number) {
    const especialista = await this.prisma.especialista.findUnique({
      where: { id },
    });

    if (!especialista) {
      throw new NotFoundException(`No existe un especialista con id ${id}.`);
    }

    return especialista;
  }

  async update(id: number, updateEspecialistaDto: UpdateEspecialistaDto) {
    await this.findOne(id);

    try {
      return await this.prisma.especialista.update({
        where: { id },
        data: updateEspecialistaDto,
      });
    } catch (error) {
      if (isPrismaError(error, 'P2002')) {
        throw new ConflictException(
          'Ya existe un especialista con esa matrícula o correo.',
        );
      }
      throw error;
    }
  }

  async remove(id: number) {
    await this.findOne(id);

    try {
      return await this.prisma.especialista.delete({ where: { id } });
    } catch (error) {
      if (isPrismaError(error, 'P2003')) {
        throw new ConflictException(
          'No se puede eliminar el especialista porque tiene informes asociados.',
        );
      }
      throw error;
    }
  }
}
