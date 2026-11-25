import {
  IsBoolean,
  IsDateString,
  IsNotEmpty,
  IsOptional,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreatePacienteDto {
  @IsString({ message: 'El nombre debe ser un texto.' })
  @IsNotEmpty({ message: 'El nombre es obligatorio.' })
  @MinLength(2, { message: 'El nombre debe tener al menos 2 caracteres.' })
  @MaxLength(120, { message: 'El nombre no puede superar los 120 caracteres.' })
  nombre: string;

  @IsString({ message: 'El DNI debe ser un texto.' })
  @IsNotEmpty({ message: 'El DNI es obligatorio.' })
  @Matches(/^\d{7,8}$/, {
    message: 'El DNI debe contener 7 u 8 números sin puntos.',
  })
  dni: string;

  @IsDateString(
    {},
    { message: 'La fecha de nacimiento debe tener un formato válido.' },
  )
  fechaNacimiento: string;

  @IsDateString(
    {},
    { message: 'La fecha de ingreso debe tener un formato válido.' },
  )
  fechaIngreso: string;

  @IsOptional()
  @IsBoolean({ message: 'El campo activo debe ser verdadero o falso.' })
  activo?: boolean;
}
