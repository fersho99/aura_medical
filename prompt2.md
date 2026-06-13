# Prompt: Stats dinámicos — Sección Nosotros

## Contexto

Proyecto **Aura Medical** — Next.js 16 App Router + Supabase + TypeScript estricto.

La página `/nosotros` tiene una banda de 4 estadísticas hardcodeadas:
- **12+** Años de trayectoria
- **200+** Especialistas certificados
- **50,000+** Pacientes atendidos
- **98%** Satisfacción del paciente

El objetivo es hacer estos valores **editables desde `/admin/cms`**, leyendo de la tabla `contenido` de Supabase.

### Regla crítica — cliente Supabase
```typescript
// ❌ NUNCA en Server Components ni unstable_cache
import { createClient } from '@/lib/supabase' // createBrowserClient — falla en Node.js

// ✅ CORRECTO en Server Components y unstable_cache
import { createClient } from '@supabase/supabase-js'
function db() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
}
```

### Tabla `contenido`
```
seccion   text   -- nombre de la sección, ej: 'nosotros'
clave     text   -- nombre del campo, ej: 'años_trayectoria'
valor     text   -- valor editable
tipo      text   -- 'text' | 'textarea' | 'url' | 'image'
```

### Cómo se lee el contenido (patrón existente en `src/lib/contenido.ts`)
`getContenido()` ya existe y devuelve un objeto agrupado por sección:
```typescript
// Resultado: { hero: { titulo: '...' }, nosotros: { titulo: '...' }, ... }
const contenido = await getContenido()
const nos = contenido.nosotros ?? {}
```

---

## Tarea — 3 archivos a modificar

### ARCHIVO 1: SQL en Supabase

Ejecutar en el **SQL Editor de Supabase**. Inserta los 8 campos de stats con sus valores actuales como default:

```sql
INSERT INTO contenido (seccion, clave, valor, tipo) VALUES
  ('nosotros', 'años_trayectoria',    '12',                         'text'),
  ('nosotros', 'años_label',          'Años de trayectoria',        'text'),
  ('nosotros', 'especialistas',       '200',                        'text'),
  ('nosotros', 'especialistas_label', 'Especialistas certificados', 'text'),
  ('nosotros', 'pacientes',           '50,000',                     'text'),
  ('nosotros', 'pacientes_label',     'Pacientes atendidos',        'text'),
  ('nosotros', 'satisfaccion',        '98',                         'text'),
  ('nosotros', 'satisfaccion_label',  'Satisfacción del paciente',  'text')
ON CONFLICT (seccion, clave) DO NOTHING;
```

> Si la tabla no tiene `UNIQUE(seccion, clave)`, agregar primero:
> ```sql
> ALTER TABLE contenido ADD CONSTRAINT contenido_seccion_clave_unique UNIQUE (seccion, clave);
> ```

---

### ARCHIVO 2: `src/app/(public)/nosotros/page.tsx`

**Paso A** — Asegurarse de que `getContenido` esté importado:
```typescript
import { getContenido } from '@/lib/contenido'
```

**Paso B** — En el cuerpo del componente, leer la sección `nosotros`:
```typescript
const contenido = await getContenido()
const nos = contenido.nosotros ?? {}
```

**Paso C** — Construir el array de stats con fallbacks:
```typescript
const stats = [
  {
    valor: nos.años_trayectoria || '12',
    sufijo: '+',
    label: nos.años_label || 'Años de trayectoria',
  },
  {
    valor: nos.especialistas || '200',
    sufijo: '+',
    label: nos.especialistas_label || 'Especialistas certificados',
  },
  {
    valor: nos.pacientes || '50,000',
    sufijo: '+',
    label: nos.pacientes_label || 'Pacientes atendidos',
  },
  {
    valor: nos.satisfaccion || '98',
    sufijo: '%',
    label: nos.satisfaccion_label || 'Satisfacción del paciente',
  },
]
```

**Paso D** — Localizar el bloque JSX donde están los 4 stats hardcodeados y reemplazarlo por:
```tsx
{stats.map(({ valor, sufijo, label }) => (
  <div key={label} className="text-center">
    <p className="type-display text-primary font-bold">
      {valor}{sufijo}
    </p>
    <p className="type-label text-on-primary/80">{label}</p>
  </div>
))}
```

> ⚠️ Mantén exactamente los mismos `className` que ya tiene cada `<div>` de stat en el archivo original — solo cambia el contenido, no el estilo.

---

### ARCHIVO 3: `src/app/admin/cms/components/SeccionNosotros.tsx`

Agregar los campos de stats al formulario del CMS. Busca el final del JSX del componente y añade antes del cierre `</div>`:

```tsx
<hr className="border-outline-variant my-sm" />
<p className="type-label text-on-surface-variant font-bold uppercase tracking-wider mb-xs">
  Estadísticas
</p>

<div className="grid grid-cols-2 gap-sm">
  <CmsField
    label="Años (número)"
    fieldKey="años_trayectoria"
    value={fields.años_trayectoria ?? ''}
    tipo="text"
    onChange={setField}
  />
  <CmsField
    label="Etiqueta años"
    fieldKey="años_label"
    value={fields.años_label ?? ''}
    tipo="text"
    onChange={setField}
  />
  <CmsField
    label="Especialistas (número)"
    fieldKey="especialistas"
    value={fields.especialistas ?? ''}
    tipo="text"
    onChange={setField}
  />
  <CmsField
    label="Etiqueta especialistas"
    fieldKey="especialistas_label"
    value={fields.especialistas_label ?? ''}
    tipo="text"
    onChange={setField}
  />
  <CmsField
    label="Pacientes (número)"
    fieldKey="pacientes"
    value={fields.pacientes ?? ''}
    tipo="text"
    onChange={setField}
  />
  <CmsField
    label="Etiqueta pacientes"
    fieldKey="pacientes_label"
    value={fields.pacientes_label ?? ''}
    tipo="text"
    onChange={setField}
  />
  <CmsField
    label="Satisfacción (número)"
    fieldKey="satisfaccion"
    value={fields.satisfaccion ?? ''}
    tipo="text"
    onChange={setField}
  />
  <CmsField
    label="Etiqueta satisfacción"
    fieldKey="satisfaccion_label"
    value={fields.satisfaccion_label ?? ''}
    tipo="text"
    onChange={setField}
  />
</div>
```

---

## Validación

1. Reiniciar el servidor de desarrollo (`npm run dev`) o invalidar cache:
   ```bash
   curl -X POST http://localhost:3000/api/revalidate
   ```
2. Abrir `/nosotros` — los stats deben cargar desde BD (mismos valores visualmente).
3. Ir a `/admin/cms → Nosotros`, cambiar un número, guardar.
4. Refrescar `/nosotros` — debe reflejar el cambio.
5. Verificar que no hay errores de `localStorage` en la consola del servidor.