# 🚀 VentusTechExam - Frontend (Angular)

![Angular](https://img.shields.io/badge/Angular-DD0031?style=for-the-badge&logo=angular&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![SCSS](https://img.shields.io/badge/SCSS-CC6699?style=for-the-badge&logo=sass&logoColor=white)

Bienvenido al repositorio del Frontend de **VentusTechExam**. Esta aplicación es una SPA (Single Page Application) desarrollada en **Angular** que interactúa con un Backend en .NET 8, proporcionando una interfaz rica y fluida para la gestión de tareas y reportes.

---

## ✨ Características Principales

- **Gestión de Tareas:** Listado con soporte de paginación asíncrona, creación, edición y eliminación de tareas.
- **Filtros Dinámicos:** Búsqueda en tiempo real por Usuario Responsable, Estatus y Prioridad.
- **Módulo de Reportes:** Panel interactivo que agrupa y muestra las tareas pendientes y vencidas por usuario.
- **Diseño Premium:** UI/UX cuidadosamente elaborada con *Glassmorphism*, paleta de colores moderna y componentes responsivos.
- **Sistema de Alertas:** Componentes modales personalizados y *Loaders* integrados para mejorar la retroalimentación visual al usuario.

---

## 📋 Requisitos Previos

Asegúrate de tener instalados los siguientes componentes en tu entorno local antes de iniciar:

- [Node.js](https://nodejs.org/) (Recomendado: v18 o superior)
- [Angular CLI](https://angular.io/cli) (v16 o superior)
- Git

---

## 🛠️ Instalación y Configuración

Sigue estos pasos para levantar el entorno de desarrollo local:

1. **Clona el repositorio**
   \\\ash
   git clone https://github.com/GioKaz/VentusTechExamClient.git
   cd VentusTechExamClient
   \\\

2. **Instala las dependencias**
   \\\ash
   npm install
   \\\

3. **Configura las variables de entorno**
   Verifica que el archivo \src/environments/environment.ts\ esté apuntando a la URL correcta del API Backend (usualmente \https://localhost:7004/api\ o el puerto que tengas configurado).

---

## 💻 Ejecución del Proyecto

Para levantar el servidor de desarrollo, ejecuta:

\\\ash
ng serve -o
\\\

> **Nota:** El flag \-o\ abrirá automáticamente tu navegador por defecto en \http://localhost:4200/\. La aplicación recargará automáticamente cualquier cambio que guardes en los archivos fuente.

---

## 🏗️ Arquitectura y Estructura

El proyecto está organizado siguiendo patrones modernos de diseño modular en Angular:

- **\core/\**: Contiene los servicios HTTP (TaskService, ReportService), modelos e interceptores (manejo global de errores).
- **\eatures/\**: Módulos divididos por contexto de negocio (\	asks\, \
eports\), con sus propias rutas y componentes (páginas).
- **\shared/\**: Componentes reutilizables (\lert-dialog\, \loader\, \pagination\), directivas y pipes (e.g. \statusLabel\).
- **\styles.scss\**: Inyección global de estilos, variables CSS y diseño del layout base.

---

## 🧪 Pruebas Unitarias

Para ejecutar la suite de pruebas unitarias mediante Karma y Jasmine:

\\\ash
ng test
\\\

---

## 🤝 Buenas Prácticas de Contribución

- **GitFlow:** Trabaja en ramas de características (\eature/nombre-del-cambio\).
- **Pull Requests:** Antes de fusionar a \develop\, abre un PR documentando los cambios realizados.
- **Conventional Commits:** Asegúrate de seguir la convención para los mensajes de commits (e.g., \eat: agrega modal de confirmación\).
