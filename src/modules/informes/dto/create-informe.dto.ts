import {
  IsDateString,
  IsInt,
  IsNotEmpty,
  IsPositive,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateInformeDto {
  @IsInt({
    message: 'El identificador del paciente debe ser un número entero.',
  })
  @IsPositive({
    message: 'El identificador del paciente debe ser un número positivo.',
  })
  pacienteId: number;

  @IsInt({
    message: 'El identificador del especialista debe ser un número entero.',
  })
  @IsPositive({
    message: 'El identificador del especialista debe ser un número positivo.',
  })
  especialistaId: number;

  @IsDateString({}, { message: 'La fecha debe tener un formato válido.' })
  fecha: string;

  @IsString({ message: 'El motivo debe ser un texto.' })
  @IsNotEmpty({ message: 'El motivo es obligatorio.' })
  @MaxLength(200, { message: 'El motivo no puede superar los 200 caracteres.' })
  motivo: string;

  @IsString({ message: 'El detalle debe ser un texto.' })
  @IsNotEmpty({ message: 'El detalle es obligatorio.' })
  @MinLength(10, { message: 'El detalle debe tener al menos 10 caracteres.' })
  detalle: string;
}
