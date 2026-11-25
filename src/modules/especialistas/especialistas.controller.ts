import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { EspecialistasService } from './especialistas.service.js';
import { CreateEspecialistaDto } from './dto/create-especialista.dto.js';
import { UpdateEspecialistaDto } from './dto/update-especialista.dto.js';

@Controller('especialistas')
export class EspecialistasController {
  constructor(private readonly especialistasService: EspecialistasService) {}

  @Post()
  create(@Body() createEspecialistaDto: CreateEspecialistaDto) {
    return this.especialistasService.create(createEspecialistaDto);
  }

  @Get()
  findAll() {
    return this.especialistasService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.especialistasService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateEspecialistaDto: UpdateEspecialistaDto,
  ) {
    return this.especialistasService.update(id, updateEspecialistaDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.especialistasService.remove(id);
  }
}
