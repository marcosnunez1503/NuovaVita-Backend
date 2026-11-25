import {
  IsBoolean,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateEspecialistaDto {
  @IsString({ message: 'El nombre debe ser un texto.' })
  @IsNotEmpty({ message: 'El nombre es obligatorio.' })
  @MinLength(2, { message: 'El nombre debe tener al menos 2 caracteres.' })
  @MaxLength(120, { message: 'El nombre no puede superar los 120 caracteres.' })
  nombre: string;

  @IsString({ message: 'La especialidad debe ser un texto.' })
  @IsNotEmpty({ message: 'La especialidad es obligatoria.' })
  @MaxLength(100, {
    message: 'La especialidad no puede superar los 100 caracteres.',
  })
  especialidad: string;

  @IsString({ message: 'La matrícula debe ser un texto.' })
  @IsNotEmpty({ message: 'La matrícula es obligatoria.' })
  @MaxLength(20, {
    message: 'La matrícula no puede superar los 20 caracteres.',
  })
  @Matches(/^(MN|MP)\s?\d{4,6}$/i, {
    message:
      'La matrícula debe comenzar con MN o MP y contener entre 4 y 6 números.',
  })
  matricula: string;

  @IsEmail({}, { message: 'El correo debe tener un formato válido.' })
  @MaxLength(150, { message: 'El correo no puede superar los 150 caracteres.' })
  correo: string;

  @IsOptional()
  @IsBoolean({ message: 'El campo activo debe ser verdadero o falso.' })
  activo?: boolean;
}
