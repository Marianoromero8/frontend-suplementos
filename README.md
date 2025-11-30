# Suplementos Deportivos – Frontend

## Tecnologías utilizadas

- React
- TypeScript
- Vite
- TailwindCSS
- Shadcn/UI
- React Router 6
- useContext
- Axios
- Zod
- Docker & Docker Compose

---

## Despliegue del Proyecto

https://frontend-suplementos-one.vercel.app/

---

### Usuarios para ingresar

> Admin

    email: admin@example.com
    password: 123456

> User

    email: julieta@example.com
    password: 123456

---

## Requisitos

Asegurate de tener instalado:

- **Node.js 20+**
- **npm 9+**
- **Docker y Docker Compose**

---

# Modo Desarrollo (npm run dev)

Este modo NO usa Docker. Usado para trabajar día a día.

### 1️- Instalar dependencias

```bash
npm install
```

### 2- Ejecutar comando para el servidor de desarrollo

```bash
npm run dev
```

### 3- Abrir en el navegador

```
http://localhost:5173
```

---

# Build de Producción

```bash
npm run build
```

Esto creara una carpeta llamada `dist/` que servira para ser desplegada.

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

### Scripts

```bash
npm run dev       # Ejecuta Vite en modo desarrollo
npm run build     # Compila el proyecto para producción
npm run lint      # Corre ESLint
```

---

# Estructura del Proyecto

```bash
/
├─ public/
│ └─ vite.svg
│
├─ src/
│ ├─ assets/
│ │ └─ react.svg
│ │
│ ├─ components/
│ │ ├─ ui/ #Componentes de shadcn
│ │ │ ├─ button.tsx
│ │ │ ├─ card.tsx
│ │ │ ├─ chart.tsx
│ │ │ ├─ dialog.tsx
│ │ │ ├─ dropdown-menu.tsx
│ │ │ ├─ form.tsx
│ │ │ ├─ input.tsx
│ │ │ ├─ label.tsx
│ │ │ ├─ select.tsx
│ │ │ ├─ separator.tsx
│ │ │ ├─ sheet.tsx
│ │ │ └─ table.tsx
│ │ │
│ │ ├─ CardProducts.tsx
│ │ ├─ Filters.tsx
│ │ ├─ Footer.tsx
│ │ ├─ NavBar.tsx
│ │ └─ Pagination.tsx
│ │
│ ├─ contexts/
│ │ ├─ AuthContext.tsx
│ │ └─ CartContext.tsx
│ │
│ ├─ data/
│ │ ├─ categories.mock.ts
│ │ ├─ orders.mock.ts
│ │ ├─ products.mock.ts
│ │ ├─ reviews.mock.ts
│ │ └─ users.mock.ts
│ │
│ ├─ lib/
│ │ └─ utils.ts
│ │
│ ├─ pages/
│ │ ├─ Auth/
│ │ │ ├─ Login.tsx
│ │ │ └─ Register.tsx
│ │ │
│ │ ├─ Cart/
│ │ │ └─ Cart.tsx
│ │ │
│ │ ├─ Category/
│ │ │ ├─ Category.tsx
│ │ │ └─ CategoryDetail.tsx
│ │ │
│ │ ├─ Checkout/
│ │ │ └─ Checkout.tsx
│ │ │
│ │ ├─ Dashboard/
│ │ │ ├─ components/
│ │ │ │ ├─ Categories/
│ │ │ │ │ └─ DashboardCategories.tsx
│ │ │ │ ├─ Orders/
│ │ │ │ │ └─ DashboardOrders.tsx
│ │ │ │ ├─ Products/
│ │ │ │ │ ├─ DashboardProducts.tsx
│ │ │ │ │ └─ ProductForm.tsx
│ │ │ │ │
│ │ │ │ ├─ Reports/
│ │ │ │ │ └─ DashboardReports.tsx
│ │ │ │ ├─ Reviews/
│ │ │ │ │ └─ DashboardReviews.tsx
│ │ │ │ └─ Users/
│ │ │ │ ├─ DashboardUsers.tsx
│ │ │ │ └─ UserForm.tsx
│ │ │ │
│ │ │ └─ Dashboard.tsx
│ │ │
│ │ ├─ Home/
│ │ │ └─ Home.tsx
│ │ │
│ │ ├─ NotFound/
│ │ │ └─ NotFound.tsx
│ │ │
│ │ ├─ Product/
│ │ │ └─ ProductDetail.tsx
│ │ │
│ │ └─ Profile/
│ │ └─ Profile.tsx
│ │
│ ├─ routes/
│ │ ├─ RequireAuth.tsx
│ │ └─ router.tsx
│ │
│ ├─ schemas/
│ │ ├─ category.schema.ts
│ │ ├─ login.schema.ts
│ │ ├─ product.schema.ts
│ │ └─ user.schema.ts
│ │
│ ├─ services/
│ │ ├─ auth.service.ts
│ │ ├─ cart.service.ts
│ │ ├─ categories.service.ts
│ │ └─ product.service.ts
│ │
│ ├─ App.tsx
│ ├─ AppLayout.tsx
│ ├─ index.css
│ └─ main.tsx
│
├─ .dockerignore
├─ .env
├─ .gitignore
├─ components.json
├─ docker-compose.yml
├─ Dockerfile
├─ ESLint.config.js
├─ index.html
├─ package.json
├─ package-lock.json
├─ README.md
├─ tsconfig.app.json
├─ tsconfig.json
├─ tsconfig.node.json
└─ vite.config.ts
```
