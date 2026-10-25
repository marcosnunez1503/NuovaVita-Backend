# Nuova Vita

Sistema de gestión para el hogar de adultos mayores **Nuova Vita**: historia clínica centralizada, registro diario de cuidados y control de acceso por rol. Backend con **NestJS**.

**Integrantes:** Segura Heredia, Constanza · Núñez, Marcos · Rodríguez, Agustín
**Materia:** Gestión de Desarrollo de Software, Comisión 2

> Estado actual: solo estructura de carpetas y módulos. Todavía no hay código.

## Etapas del proyecto

| Etapa | Alcance |
|---|---|
| 1 | Sistema de historia clínica (según el alcance del TP N.º 2) |
| 2 | Control de asistencia del personal con el reloj biométrico |

## Estructura

```
src/
├── common/        recursos compartidos (decorators, guards, filters, pipes, dto, enums...)
├── config/        configuración de la aplicación
├── database/      migrations y seeds
└── modules/       un módulo por funcionalidad
test/              pruebas e2e
docs/              documentación del proyecto
```

## Módulos

| Módulo | Qué cubre del alcance (TP N.º 2) | Etapa |
|---|---|---|
| `auth` | Inicio de sesión y protección de rutas | 1 |
| `users` | Usuarios del sistema | 1 |
| `roles` | Niveles de acceso según el rol | 1 |
| `residents` | Datos personales y clínicos de residentes | 1 |
| `medical-orders` | Indicaciones médicas | 1 |
| `specialist-reports` | Informes de especialistas | 1 |
| `daily-care` | Cuidados diarios de enfermería | 1 |
| `clinical-history` | Consulta centralizada de la historia clínica | 1 |
| `clinical-documents` | Generación del PDF de la historia clínica | 1 |
| `deliveries` | Registro de entrega (destinatario y fecha) | 1 |
| `consents` | Constancia y archivo del consentimiento informado | 1 |
| `audit` | Historial de accesos (quién, qué y cuándo) | 1 |
| `backups` | Copia de respaldo automática | 1 |
| `attendance` | Asistencia y horas trabajadas | 2 |

Cada módulo tiene `dto/` y, cuando maneja datos propios, `entities/`. Los archivos `.module.ts`, `.controller.ts` y `.service.ts` se agregan al empezar el desarrollo.

## Flujo de trabajo con Git

Ramas principales:

- `main`: versión estable
- `dev`: integración del trabajo del equipo

Ramas de trabajo (se crean desde `dev`):

| Prefijo | Uso | Ejemplo |
|---|---|---|
| `feature/` | Funcionalidad nueva | `feature/residents-alta` |
| `refactor/` | Mejora de código sin cambiar el comportamiento | `refactor/auth-guards` |
| `fix/` | Corrección de errores | `fix/pdf-datos-faltantes` |
| `docs/` | Documentación | `docs/readme-estructura` |

Reglas:

1. No se trabaja directo sobre `main` ni `dev`.
2. Todo cambio entra por Pull Request hacia `dev`.
3. Cada Pull Request lo revisa al menos otro integrante antes de aprobarse.
4. Se actualiza la rama de trabajo con `dev` antes de abrir el Pull Request.
