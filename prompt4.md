# Prompt 1: Acciones Rápidas dinámicas — Aura Medical

## Contexto

El Home tiene una sección de "Acciones Rápidas" renderizada por el componente
`HomeQuickActions` (o inline en `page.tsx`). Actualmente está hardcodeada.

Los datos ya existen en Supabase (sección `acciones`) y el formulario CMS ya
existe en `SeccionAcciones.tsx`. Solo falta que el componente público los lea.

### Stack
- Next.js 16 App Router — Server Components por defecto
- `getContenido()` en `src/lib/contenido.ts` — ya agrupa todo por sección
- Regla crítica: usar `createClient` de `@supabase/supabase-js` en servidor,
  NUNCA `createBrowserClient` de `@/lib/supabase`

### Datos disponibles en BD (sección `acciones`)
| clave | valor actual |
|---|---|
| `accion_1_titulo` | Agendar Cita |
| `accion_1_desc` | Reserva tu consulta con el especialista que necesitas en pocos pasos. |
| `accion_1_href` | #agendar |
| `accion_2_titulo` | Directorio Médico |
| `accion_2_desc` | Conoce a nuestros más de 200 especialistas certificados. |
| `accion_2_href` | /directorio |

---

## Tarea

### Paso 1 — Localizar el componente

Buscar en el proyecto cómo se renderiza la sección de acciones rápidas:
- Puede ser un componente `HomeQuickActions.tsx` en `src/components/`
- O puede estar inline en `src/app/(public)/page.tsx`

### Paso 2 — Pasar los datos desde `page.tsx`

En `src/app/(public)/page.tsx`, `getContenido()` ya se llama. Agregar:

```typescript
const acciones = contenido.acciones ?? {}

const quickActions = [
  {
    titulo: acciones.accion_1_titulo || 'Agendar Cita',
    desc:   acciones.accion_1_desc   || 'Reserve su consulta con nuestros especialistas de forma rápida y segura.',
    href:   acciones.accion_1_href   || '/contacto',
  },
  {
    titulo: acciones.accion_2_titulo || 'Buscar Médico',
    desc:   acciones.accion_2_desc   || 'Encuentre al profesional ideal dentro de nuestro directorio médico de excelencia.',
    href:   acciones.accion_2_href   || '/directorio',
  },
]
```

### Paso 3 — Actualizar el componente

**Si `HomeQuickActions` es un Server Component o recibe props:**
Agregar props `actions` y usarlas en el render:

```typescript
interface QuickAction {
  titulo: string
  desc: string
  href: string
}

interface Props {
  actions: QuickAction[]
}

export default function HomeQuickActions({ actions }: Props) {
  return (
    // Mantener EXACTAMENTE el mismo JSX y classNames que ya tiene
    // Solo reemplazar los textos hardcodeados por:
    // action.titulo, action.desc, action.href
    // usando actions.map(...)
  )
}
```

**Si está inline en `page.tsx`:**
Reemplazar directamente los valores hardcodeados usando `quickActions[0]` y
`quickActions[1]`.

### Paso 4 — Pasar props desde page.tsx

```tsx
<HomeQuickActions actions={quickActions} />
```

---

## Reglas

- NO cambiar el diseño ni los classNames — solo la fuente de los datos
- NO convertir el componente a Client Component
- Mantener fallbacks en todos los campos por si BD devuelve vacío
- NO tocar `useCmsSection` ni el panel admin

## Validación

- [ ] Las acciones rápidas muestran los valores de Supabase
- [ ] Editar desde `/admin/cms → Home → Acciones rápidas` → guardar → refrescar Home refleja el cambio
- [ ] No hay errores en consola del servidor