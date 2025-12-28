# Sueños Valenti - Cryogenics Solutions Portal

[English](#english) | [Español](#español)

---

<a name="english"></a>
# English

Portal for group sessions to connect with a higher consciousness.

## 🚀 Technologies

- **Backend:** Node.js + Express 5
- **Language:** TypeScript
- **ORM & Database:** Prisma ORM with SQLite
- **Frontend:** EJS (Embedded JavaScript) Templates
- **State Management:** `express-session` for server-side sessions
- **Styling & Preferences:** CSS (Light/Dark themes) with `cookie-parser`

## 📂 Project Structure

```
src/
├── app.ts              # Express application & Middleware configuration
├── container.ts        # Dependency Injection / Service Container
├── env.ts              # Environment variables handling
├── controllers/        # Business logic for routes
├── db/                 # Prisma client & Database setup
├── middlewares/        # Custom middlewares (Auth, Rate Limiting)
├── model/              # Domain models and Data Access logic
├── routes/             # API and View route definitions
├── types/              # TypeScript interfaces and global types
├── utils/              # Helper functions (Auth, Formatting)
└── validators/         # Input validation logic (express-validator)
prisma/                 # Database schema and seed data
views/                  # Server-side rendered EJS templates
public/                 # Static assets (CSS, Fonts, Images)
```

## 🛠️ Installation & Execution

1. **Install Dependencies:**
   ```bash
   npm install
   ```
2. **Database Setup:**
   ```bash
   npx prisma db push
   npm run db:seed
   ```
3. **Build & Start:**
   ```bash
   npm run build
   npm start
   ```

### Development Mode
```bash
npm run dev
```
The application will be available at: `http://localhost:3000`

## ✨ Features

- **User Management:** Secure registration, login/logout, and profile editing.
- **Session Security:** Server-side sessions with secure cookie configurations.
- **Booking System:** Catalog of sessions, shopping cart, and booking history.
- **Personalization:** Persistent light/dark theme preference via cookies.
- **Security:** Password hashing (bcrypt), Rate limiting, and Input validation.
- **Infrastructure:** SQLite persistence via Prisma and structured logging.

## 🧪 Testing

The project uses **Jest** and **Supertest** for testing.
```bash
npm test
```
*   **Mocks:** Includes a deterministic `uuid` mock for predictable test outcomes.
*   **Integration:** Uses Supertest agents to maintain session state across tests.

---

<a name="español"></a>
# Español

Portal de sesiones grupales para conectar con una conciencia superior.

## 🚀 Tecnologías

- **Backend:** Node.js + Express 5
- **Lenguaje:** TypeScript
- **ORM y Base de Datos:** Prisma ORM con SQLite
- **Frontend:** Plantillas EJS (Embedded JavaScript)
- **Gestión de Estado:** `express-session` para sesiones en servidor
- **Estilos y Preferencias:** CSS (Temas Claro/Oscuro) con `cookie-parser`

## 📂 Estructura del Proyecto

```
src/
├── app.ts              # Aplicación Express y configuración de Middlewares
├── container.ts        # Inyección de Dependencias / Contenedor de Servicios
├── env.ts              # Gestión de variables de entorno
├── controllers/        # Lógica de negocio para las rutas
├── db/                 # Cliente Prisma y configuración de Base de Datos
├── middlewares/        # Middlewares personalizados (Auth, Rate Limiting)
├── model/              # Modelos de dominio y acceso a datos
├── routes/             # Definición de rutas de API y Vistas
├── types/              # Interfaces TypeScript y tipos globales
├── utils/              # Funciones auxiliares (Auth, Formateo)
└── validators/         # Lógica de validación de entrada (express-validator)
prisma/                 # Esquema de base de datos y datos iniciales (seed)
views/                  # Plantillas EJS renderizadas en servidor
public/                 # Archivos estáticos (CSS, Fuentes, Imágenes)
```

## 🛠️ Instalación y Ejecución

1. **Instalar Dependencias:**
   ```bash
   npm install
   ```
2. **Configuración de Base de Datos:**
   ```bash
   npx prisma db push
   npm run db:seed
   ```
3. **Compilar y Arrancar:**
   ```bash
   npm run build
   npm start
   ```

### Modo de Desarrollo
```bash
npm run dev
```
La aplicación estará disponible en: `http://localhost:3000`

## ✨ Características

- **Gestión de Usuarios:** Registro seguro, inicio/cierre de sesión y edición de perfil.
- **Seguridad de Sesión:** Sesiones en servidor con configuración segura de cookies.
- **Sistema de Reservas:** Catálogo de sesiones, carrito de compras e historial.
- **Personalización:** Preferencia de tema claro/oscuro persistente mediante cookies.
- **Seguridad:** Hashing de contraseñas (bcrypt), Limitación de tasa y Validación de entrada.
- **Infraestructura:** Persistencia SQLite mediante Prisma y registro de logs estructurado.

## 🧪 Pruebas (Testing)

El proyecto utiliza **Jest** y **Supertest** para las pruebas.
```bash
npm test
```
*   **Mocks:** Incluye un mock determinista de `uuid` para resultados de prueba predecibles.
*   **Integración:** Utiliza agentes de Supertest para mantener el estado de la sesión entre pruebas.
