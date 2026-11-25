# Nuova Vita - Backend

API REST desarrollada para **Nuova Vita**, un sistema de gestión de pacientes, especialistas e informes. El proyecto fue realizado con NestJS, Prisma y PostgreSQL como parte de Programación IV.

La API permite administrar los recursos principales del sistema, registrar usuarios, iniciar sesión y generar tokens JWT. Las solicitudes se validan mediante DTO y pueden probarse con Postman.

## Tecnologías utilizadas

- Node.js
- TypeScript
- NestJS
- Prisma ORM
- PostgreSQL
- class-validator y class-transformer
- bcrypt
- JSON Web Token (JWT)
- Postman

## Módulos del sistema

- **App:** punto de entrada de la aplicación.
- **Auth:** registro e inicio de sesión.
- **Users:** administración de usuarios.
- **Pacientes:** gestión de pacientes.
- **Especialistas:** gestión de especialistas.
- **Informes:** gestión de informes y sus relaciones.
- **Prisma:** conexión de la aplicación con PostgreSQL.

## Requisitos previos

Antes de comenzar se necesita:

- Node.js y npm.
- PostgreSQL.
- Una base de datos local creada.
- Postman para probar los endpoints.

## Instalación

1. Clonar el repositorio:

```bash
git clone https://github.com/marcosnunez1503/NuovaVita-Backend.git
```

2. Ingresar al proyecto:

```bash
cd NuovaVita-Backend
```

3. Instalar las dependencias:

```bash
npm install
```

## Variables de entorno

Crear un archivo `.env` en la raíz del proyecto:

```env
PORT=3000
API_BASE_URL=http://localhost:3000
DATABASE_URL="postgresql://USUARIO:CONTRASENA@localhost:5432/nuova_vita?schema=public"
JWT_SECRET="una-clave-secreta"
```

Cada integrante debe utilizar sus propias credenciales de PostgreSQL y su propia clave JWT. El archivo `.env` no se sube al repositorio.

## Preparación de la base de datos

Validar el esquema de Prisma:

```bash
npx prisma validate
```

Generar Prisma Client:

```bash
npx prisma generate
```

Aplicar las migraciones existentes:

```bash
npx prisma migrate dev
```

La base contiene las tablas `Rol`, `Usuario`, `Paciente`, `Especialista` e `Informe`.

### Rol inicial

Para registrar usuarios debe existir al menos un rol. Se puede cargar desde pgAdmin utilizando el Query Tool:

```sql
INSERT INTO "Rol" ("nombre", "descripcion", "activo")
VALUES ('Administración', 'Acceso administrativo al sistema', true);
```

El valor de `rolId` utilizado al registrar un usuario debe coincidir con el identificador de un rol existente.

## Ejecución

Ejecutar el proyecto en modo desarrollo:

```bash
npm run start:dev
```

La API quedará disponible en:

```text
http://localhost:3000
```

## Endpoints

### Inicio

| Método | Ruta | Descripción                           |
| ------ | ---- | ------------------------------------- |
| GET    | `/`  | Verifica que la API esté funcionando. |

### Autenticación

| Método | Ruta             | Descripción                      |
| ------ | ---------------- | -------------------------------- |
| POST   | `/auth/register` | Registra un usuario.             |
| POST   | `/auth/login`    | Inicia sesión y devuelve un JWT. |

Ejemplo de registro:

```json
{
  "nombre": "María Pérez",
  "correo": "maria@email.com",
  "contrasena": "ClaveSegura123",
  "rolId": 1,
  "activo": true
}
```

Ejemplo de inicio de sesión:

```json
{
  "correo": "maria@email.com",
  "contrasena": "ClaveSegura123"
}
```

Las contraseñas se almacenan mediante un hash generado con bcrypt. Ni la contraseña ni su hash se incluyen en las respuestas de la API.

### Usuarios

| Método | Ruta         | Descripción              |
| ------ | ------------ | ------------------------ |
| GET    | `/users`     | Lista los usuarios.      |
| GET    | `/users/:id` | Busca un usuario por ID. |
| PATCH  | `/users/:id` | Actualiza un usuario.    |
| DELETE | `/users/:id` | Elimina un usuario.      |

El alta de usuarios se realiza únicamente mediante `/auth/register` para evitar operaciones duplicadas.

### Pacientes

| Método | Ruta             | Descripción               |
| ------ | ---------------- | ------------------------- |
| POST   | `/pacientes`     | Crea un paciente.         |
| GET    | `/pacientes`     | Lista los pacientes.      |
| GET    | `/pacientes/:id` | Busca un paciente por ID. |
| PATCH  | `/pacientes/:id` | Actualiza un paciente.    |
| DELETE | `/pacientes/:id` | Elimina un paciente.      |

### Especialistas

| Método | Ruta                 | Descripción                   |
| ------ | -------------------- | ----------------------------- |
| POST   | `/especialistas`     | Crea un especialista.         |
| GET    | `/especialistas`     | Lista los especialistas.      |
| GET    | `/especialistas/:id` | Busca un especialista por ID. |
| PATCH  | `/especialistas/:id` | Actualiza un especialista.    |
| DELETE | `/especialistas/:id` | Elimina un especialista.      |

### Informes

| Método | Ruta            | Descripción                                        |
| ------ | --------------- | -------------------------------------------------- |
| POST   | `/informes`     | Crea un informe.                                   |
| GET    | `/informes`     | Lista los informes con su paciente y especialista. |
| GET    | `/informes/:id` | Busca un informe por ID.                           |
| PATCH  | `/informes/:id` | Actualiza un informe.                              |
| DELETE | `/informes/:id` | Elimina un informe.                                |

## Validación y respuestas

Los datos recibidos se validan mediante DTO y un `ValidationPipe` global. Entre las respuestas principales se encuentran:

- `200 OK`: consulta o actualización correcta.
- `201 Created`: recurso creado correctamente.
- `400 Bad Request`: datos inválidos o relación inexistente.
- `401 Unauthorized`: credenciales incorrectas.
- `404 Not Found`: recurso inexistente.
- `409 Conflict`: dato único duplicado o eliminación impedida por una relación.

## Comandos útiles

```bash
# Ejecutar en modo desarrollo
npm run start:dev

# Validar el código
npm run lint

# Compilar el proyecto
npm run build

# Validar el esquema de Prisma
npx prisma validate

# Generar Prisma Client
npx prisma generate
```

## Estructura principal

```text
src/
├── main.ts
└── modules/
    ├── app/
    ├── auth/
    ├── users/
    ├── pacientes/
    ├── especialistas/
    ├── informes/
    └── prisma/

prisma/
├── migrations/
└── schema.prisma
```

## Estrategia de ramas

- `main`: versión estable.
- `dev`: integración del desarrollo.
- `feature/*`: nuevas funcionalidades.
- `fix/*`: correcciones.
- `refactor/*`: reorganización del código.
- `docs/*`: documentación.

Los cambios se integran mediante commits descriptivos y Pull Requests.

## Pruebas con Postman

Las pruebas de la API se realizan con Postman. Se recomienda crear una variable de colección:

```text
baseUrl = http://localhost:3000
```

Las solicitudes pueden utilizar rutas como:

```text
{{baseUrl}}/pacientes
{{baseUrl}}/especialistas
{{baseUrl}}/informes
{{baseUrl}}/auth/login
```

Se deben probar solicitudes válidas e inválidas para comprobar las operaciones CRUD, los DTO, las relaciones, el registro y el inicio de sesión.

## Uso académico

Proyecto desarrollado con fines académicos para la asignatura Programación IV.
