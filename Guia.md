# Suplementos Deportivos – Frontend

Proyecto frontend desarrollado con **React + Vite + TypeScript**, estilado con **Tailwind/Shadcn** y dockerizado para facilitar el desarrollo y despliegue.

---

## Requisitos

Asegurate de tener instalado:

- **Node.js 20+**
- **npm 9+**
- **Docker y Docker Compose**

---

# Modo Desarrollo (npm run dev)

Este modo NO usa Docker. Ideal para trabajar día a día.

### 1️- Instalar dependencias

```bash
npm install
```

### 2- Ejecutar comanado para el servidor de desarrollo

```bash
npm run dev
```

### 3- Abrir en el navegador

```
http://localhost:5173
```

---

# Docker Compose (Desarrollo en Contenedor)

1- Construir imagen y levantar contenedor

```bash
docker compose up --build
```

2- Abrir en el navegador

```
http://localhost:5173
```

3- Cerrar el contenedor

```
docker compose down
```

---

### Variables de entorno

PONER VARIABLES DE ENTORNO NECESARIAS
(APIURL, APIKEY, USUARIO DE PRUEBA)

---

### Scripts

```bash
npm run dev       # Ejecuta Vite en modo desarrollo
npm run build     # Compila el proyecto para producción
npm run lint      # Corre ESLint
```

---

# Estructura del Proyecto

AGREGAR LA ESTRUCTURA DE CARPETAS
