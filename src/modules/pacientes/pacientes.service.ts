import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import { isPrismaError } from '../prisma/prisma-error.util.js';
import { CreatePacienteDto } from './dto/create-paciente.dto.js';
import { UpdatePacienteDto } from './dto/update-paciente.dto.js';

@Injectable()
export class PacientesService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createPacienteDto: CreatePacienteDto) {
    try {
      return await this.prisma.paciente.create({
        data: {
          ...createPacienteDto,
          fechaNacimiento: new Date(createPacienteDto.fechaNacimiento),
          fechaIngreso: new Date(createPacienteDto.fechaIngreso),
        },
      });
    } catch (error) {
      if (isPrismaError(error, 'P2002')) {
        throw new ConflictException('Ya existe un paciente con ese DNI.');
      }
      throw error;
    }
  }

  findAll() {
    return this.prisma.paciente.findMany({ orderBy: { id: 'asc' } });
  }

  async findOne(id: number) {
    const paciente = await this.prisma.paciente.findUnique({ where: { id } });

    if (!paciente) {
      throw new NotFoundException(`No existe un paciente con id ${id}.`);
    }

    return paciente;
  }

  async update(id: number, updatePacienteDto: UpdatePacienteDto) {
    await this.findOne(id);

    try {
      return await this.prisma.paciente.update({
        where: { id },
        data: {
          ...updatePacienteDto,
          fechaNacimiento: updatePacienteDto.fechaNacimiento
            ? new Date(updatePacienteDto.fechaNacimiento)
            : undefined,
          fechaIngreso: updatePacienteDto.fechaIngreso
            ? new Date(updatePacienteDto.fechaIngreso)
            : undefined,
        },
      });
    } catch (error) {
      if (isPrismaError(error, 'P2002')) {
        throw new ConflictException('Ya existe un paciente con ese DNI.');
      }
      throw error;
    }
  }

  async remove(id: number) {
    await this.findOne(id);

    try {
      return await this.prisma.paciente.delete({ where: { id } });
    } catch (error) {
      if (isPrismaError(error, 'P2003')) {
        throw new ConflictException(
          'No se puede eliminar el paciente porque tiene informes asociados.',
        );
      }
      throw error;
    }
  }
}
