import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import { isPrismaError } from '../prisma/prisma-error.util.js';
import { CreateInformeDto } from './dto/create-informe.dto.js';
import { UpdateInformeDto } from './dto/update-informe.dto.js';

@Injectable()
export class InformesService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createInformeDto: CreateInformeDto) {
    try {
      return await this.prisma.informe.create({
        data: {
          ...createInformeDto,
          fecha: new Date(createInformeDto.fecha),
        },
        include: { paciente: true, especialista: true },
      });
    } catch (error) {
      if (isPrismaError(error, 'P2003')) {
        throw new BadRequestException(
          'El paciente o el especialista indicado no existe.',
        );
      }
      throw error;
    }
  }

  findAll() {
    return this.prisma.informe.findMany({
      include: { paciente: true, especialista: true },
      orderBy: { id: 'asc' },
    });
  }

  async findOne(id: number) {
    const informe = await this.prisma.informe.findUnique({
      where: { id },
      include: { paciente: true, especialista: true },
    });

    if (!informe) {
      throw new NotFoundException(`No existe un informe con id ${id}.`);
    }

    return informe;
  }

  async update(id: number, updateInformeDto: UpdateInformeDto) {
    await this.findOne(id);

    try {
      return await this.prisma.informe.update({
        where: { id },
        data: {
          ...updateInformeDto,
          fecha: updateInformeDto.fecha
            ? new Date(updateInformeDto.fecha)
            : undefined,
        },
        include: { paciente: true, especialista: true },
      });
    } catch (error) {
      if (isPrismaError(error, 'P2003')) {
        throw new BadRequestException(
          'El paciente o el especialista indicado no existe.',
        );
      }
      throw error;
    }
  }

  async remove(id: number) {
    await this.findOne(id);
    return this.prisma.informe.delete({ where: { id } });
  }
}
