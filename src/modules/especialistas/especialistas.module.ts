import { Module } from '@nestjs/common';
import { EspecialistasService } from './especialistas.service.js';
import { EspecialistasController } from './especialistas.controller.js';

@Module({
  controllers: [EspecialistasController],
  providers: [EspecialistasService],
})
export class EspecialistasModule {}
