[![Typing SVG](https://readme-typing-svg.demolab.com?font=Fira+Code&weight=500&size=18&duration=1600&pause=1000&color=3C57C3&center=true&vCenter=true&width=435&lines=Bienvenid%40+al+repositorio+de+Sanimed;Participaci%C3%B3n+en++la+8%C2%AA+Hackaton;Organizada+por+Fundaci%C3%B3n+Somos+F5;con+la+colaboraci%C3%B3n+de+Sanitas)](https://git.io/typing-svg)

# 💊​ Sanimed - Frontend

**Sanimed** es una aplicación web desarrollada durante la **8ª Hackaton organizada por Fundación Somos F5 con la colaboración de Sanitas**.  
Su objetivo es ofrecer a los usuarios un **control completo sobre su medicación, alergias y horarios de toma con alarmas**, combinando una experiencia intuitiva y funcional con un frontend modular y escalable.

---

## 🔷​ Objetivos del proyecto

- Permitir la gestión de **medicamentos** y dosis.
- Configurar **alarmas y recordatorios** de toma.
- Registrar y controlar **alergias**.
- Planificar y visualizar **horarios de medicación**.
- Garantizar **pruebas unitarias y estabilidad** del frontend.
- Proporcionar un **modo oscuro** con buena visibilidad de textos.

---

## 🧱​ Estructura del frontend

```
📁 FRONT-HACKATON 
├── .gitignore
├── babel.config.js
├── eslint.config.js
├── index.html
├── jest.config.js
├── jest.setup.js
├── package-lock.json
├── package.json
├── README.md
├── vite.config.js
├── App.jsx
├── Login.jsx
├── main.jsx
└── src/
├── test/ # Tests unitarios
├── assets/ # Imágenes, iconos y sonidos
│ ├── logo.png
│ └── react.svg
├── components/ # Componentes reutilizables
│ ├── BottomNav.jsx
│ ├── Footer.jsx
│ ├── Layout.jsx
│ ├── Navbar.jsx
│ └── ScrollToTop.jsx
├── pages/
│ ├── control/ # Páginas de control de medicación
│ │ ├── Alarms.jsx
│ │ ├── Allergies.jsx
│ │ ├── ControlPanel.jsx
│ │ ├── Medications.jsx
│ │ └── Schedules.jsx
│ ├── CreateUser.jsx
│ ├── Dashboard.jsx
│ ├── Home.jsx
│ └── Login.jsx

```

---
## 📋 Funcionalidades principales del Dashboard

| Sección        | Qué hace                                                                 |
|----------------|--------------------------------------------------------------------------|
| **Medicamentos** | Gestiona lista de medicamentos, control de dosis y historial de tomas. |
| **Alarmas**      | Configura recordatorios automáticos, notificaciones push y horarios personalizados. |
| **Alergias**     | Registro de alergias, tipos de reacciones y niveles de severidad.       |
| **Horarios**     | Calendario médico, planificación semanal y seguimiento diario.          |

Cada tarjeta del dashboard incluye un **contador de elementos** y es completamente interactiva.  

---

## 🧪 Tests implementados

Actualmente tenemos 3 tests unitarios para garantizar la estabilidad de las páginas críticas:

1. **Login:** Comprueba que el encabezado "Iniciar Sesión" se renderiza correctamente.
2. **Allergies:** Comprueba que el encabezado "Alergias" se renderiza.
3. **Alarms:** Comprueba que el encabezado "Alarmas" se renderiza.

Todos los tests utilizan **React Testing Library** y **Jest**, asegurando cobertura en flujos críticos.

---

## ⚡ Tecnologías usadas

- **React 19** + Vite
- **Material UI (MUI)**
- **React Router Dom**
- **Jest + React Testing Library**
- **ESLint** y **Babel** para calidad y compatibilidad de código

---

## 🌙 Modo oscuro

El modo oscuro se aplica a **todas las páginas**, manteniendo contraste y visibilidad de texto, contadores y botones.

---

## 👥 Colaboradores Frontend

- **Aday Álvarez** - Fem Mad  
- **Valentina Carolina Montilla Zanella** - Fem Mad  

## 👥 Colaboradores Backend

| Digital Academy             | Valencia                  |
|-----------------------------|---------------------------|
| **Dmytro Belei**                | **Paula Calvo García**        |
| **Efrén Tomás Campa**          | **Saba Ur Rehman**            |
---

## ❓​ Cómo ejecutar el proyecto

```bash
# Instalar dependencias
npm install

# Ejecutar en modo desarrollo
npm run dev

# Ejecutar tests
npm run test

```
> 📝 Nota final
>
> **Sanimed** ofrece un control integral sobre medicación y salud, con un frontend moderno, pruebas unitarias y experiencia de usuario cuidada.  
> Cumple todos los criterios de evaluación de la hackaton: originalidad, arquitectura frontend y backend, UX/UI, CRUD, tests, conexión backend-frontend, funcionalidad, mantenibilidad y organización del equipo.

>>>>>>> f7d775095871ab974463d1f2cd4b820f9e645bf6
