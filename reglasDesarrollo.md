# 🧭 Convenciones de Código y Estilo — Frontend

Este documento define las **reglas de escritura, estructura y estilo** del proyecto para mantener un código limpio, consistente y fácil de mantener.

---

## 📂 Estructura del Proyecto

src/

- ├── assets/ ✅
- ├── components/ ✅
- ├── context/ ✅
- ├── hooks/ ✅
- ├── pages/ ✅
- ├── redux/ ✅
- ├── routes/ ✅
- ├── schemas/ ✅
- ├── services/ ✅
- └── test/ ✅
- └── types/ ✅

- Carpetas
  ```bash
  ✅ product-card
  ```

✨ Reglas de Nomenclatura
🧩 Componentes React

Nombres de componentes: PascalCase

```

function ProductCard() { ... }
export default ProductCard;

```

Archivos: mismo nombre que el componente.

```

ProductCard.tsx

```

🧠 Variables y Funciones

Usar camelCase.

```
const userName = "Mariano";
const getUserData = () => { ... };
```

Nombres claros, descriptivos y en inglés.

```
✅ const isUserLoggedIn = true;
❌ const usr = true;
```

Funciones que retornan valores booleanos deben comenzar con is, has, o can.

```
const isAdmin = true;
const hasPermission = false;
```

🧱 Tipos, Interfaces y Esquemas (TypeScript + Zod)

Tipos e interfaces: PascalCase

```

interface Product {
  id: string;
  name: string;
  price: number;
}
```

Esquemas Zod: PascalCase + Schema

```
import { z } from "zod";

export const ProductSchema = z.object({
  id: z.string(),
  name: z.string().min(1),
  price: z.number().min(0),
});

export type Product = z.infer<typeof ProductSchema>;
```

🧾 Constantes

Constantes globales o de configuración: UPPER_SNAKE_CASE

```
export const API_URL = "https://example.com/api";
export const ITEMS_PER_PAGE = 12;
```

⚙️ Redux Toolkit (opcional)

Slice names: camelCase

Archivo por slice dentro de /store/.

```
store/
├── userSlice.ts
├── cartSlice.ts
└── index.ts
```

Acciones: verbos en presente.

```
setUser(), clearCart(), toggleFavorite()
```

🎨 TailwindCSS

Mantener las clases ordenadas por categorías (layout → spacing → color → efectos → animación).

```
<button
  className="flex items-center justify-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow-md transition"
>
  Buy now
</button>
```

🧩 Hooks personalizados

Prefijo obligatorio use y camelCase.

```
useFetchProducts(), useAuth(), useLocalStorage()
```

Guardarlos en /hooks/.

🧾 Importaciones

- Orden recomendado:

- Librerías externas

- Componentes internos

- Hooks / Contextos

- Utilidades

- Estilos o tipos

```

import { useState } from "react";
import { useAppDispatch } from "@/store/hooks";

import ProductCard from "@/components/ProductCard";
import useFetchProducts from "@/hooks/useFetchProducts";

import { Product } from "@/types/Product";
import "@/styles/global.css";
```
