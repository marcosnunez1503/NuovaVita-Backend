import { Module } from '@nestjs/common';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { AuthModule } from '../auth/auth.module.js';
import { UsersModule } from '../users/users.module.js';
import { PacientesModule } from '../pacientes/pacientes.module.js';
import { EspecialistasModule } from '../especialistas/especialistas.module.js';
import { InformesModule } from '../informes/informes.module.js';

@Module({
  imports: [
    AuthModule,
    UsersModule,
    PacientesModule,
    EspecialistasModule,
    InformesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
