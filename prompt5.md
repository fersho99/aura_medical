# Prompt 2: Footer dinámico — Aura Medical

## Contexto

El footer del sitio tiene contenido hardcodeado que debería ser editable desde
el CMS. El panel admin ya tiene la subsección "Footer" en Global pero no hay
componente de formulario ni datos en BD.

### Lo que está hardcodeado en el footer (visto en el preview)
| Elemento | Valor actual |
|---|---|
| Descripción bajo el logo | "Redefiniendo los estándares de la medicina privada a través de la excelencia clínica, tecnología avanzada y un trato verdaderamente humano." |
| Texto botón WhatsApp | "Escríbenos por WhatsApp" |
| Copyright | "Aura Medical Private Clinic. Todos los derechos reservados." |

### Lo que YA es dinámico (no tocar)
- Redes sociales (sección `redes` en BD) — ya funciona
- Datos de contacto (teléfono, email, dirección, urgencias) — vienen de sección `contacto`
- Links de navegación (Especialidades, Directorio, Noticias, etc.) — hardcodeados pero son links de nav, no críticos

---

## Tarea — 3 archivos

### ARCHIVO 1: SQL en Supabase

```sql
INSERT INTO contenido (seccion, clave, valor, tipo) VALUES
  ('footer', 'descripcion',      'Redefiniendo los estándares de la medicina privada a través de la excelencia clínica, tecnología avanzada y un trato verdaderamente humano.', 'textarea'),
  ('footer', 'whatsapp_texto',   'Escríbenos por WhatsApp',                     'text'),
  ('footer', 'copyright',        'Aura Medical Private Clinic. Todos los derechos reservados.', 'text'),
  ('footer', 'columna_1_titulo', 'Especialidades',                               'text'),
  ('footer', 'columna_2_titulo', 'Urgencias y Contacto',                         'text')
ON CONFLICT (seccion, clave) DO NOTHING;
```

### ARCHIVO 2: Componente del Footer público

Localizar el componente Footer (probablemente `src/components/Footer.tsx` o
`src/app/(public)/layout.tsx`).

**Paso A** — Si el Footer es un Server Component, leer contenido directamente:

```typescript
import { getContenido } from '@/lib/contenido'

export default async function Footer() {
  const contenido = await getContenido()
  const footer = contenido.footer  ?? {}
  const redes  = contenido.redes   ?? {}
  const contacto = contenido.contacto ?? {}
  // ...
}
```

**Paso B** — Si el Footer recibe props desde el layout, pasar los datos desde
`src/app/(public)/layout.tsx`:

```typescript
const contenido = await getContenido()
// pasar footer={contenido.footer} al componente
```

**Paso C** — Reemplazar los textos hardcodeados:

```tsx
// Descripción
<p>{footer.descripcion || 'Redefiniendo los estándares...'}</p>

// Botón WhatsApp — el número ya viene de contacto.whatsapp
<a href={`https://wa.me/${contacto.whatsapp || ''}`}>
  {footer.whatsapp_texto || 'Escríbenos por WhatsApp'}
</a>

// Copyright
<p>{footer.copyright || 'Aura Medical Private Clinic. Todos los derechos reservados.'}</p>

// Títulos de columnas
<h4>{footer.columna_1_titulo || 'Especialidades'}</h4>
<h4>{footer.columna_2_titulo || 'Urgencias y Contacto'}</h4>
```

> ⚠️ Mantener EXACTAMENTE los mismos classNames y estructura JSX.
> Solo cambiar la fuente de los datos, no el diseño.

### ARCHIVO 3: `src/app/admin/cms/components/SeccionFooter.tsx`

Crear el componente de formulario CMS para el footer siguiendo el patrón
exacto de los componentes existentes:

```tsx
'use client'
import CmsField from './CmsField'

interface Props {
  fields: Record<string, string>
  types:  Record<string, string>
  setField: (key: string, value: string) => void
}

export default function SeccionFooter({ fields, types, setField }: Props) {
  return (
    <div className="flex flex-col gap-md">
      <CmsField
        label="Descripción bajo el logo"
        fieldKey="descripcion"
        value={fields.descripcion ?? ''}
        tipo="textarea"
        onChange={setField}
      />
      <CmsField
        label="Texto botón WhatsApp"
        fieldKey="whatsapp_texto"
        value={fields.whatsapp_texto ?? ''}
        tipo="text"
        onChange={setField}
      />
      <CmsField
        label="Título columna Especialidades"
        fieldKey="columna_1_titulo"
        value={fields.columna_1_titulo ?? ''}
        tipo="text"
        onChange={setField}
      />
      <CmsField
        label="Título columna Urgencias"
        fieldKey="columna_2_titulo"
        value={fields.columna_2_titulo ?? ''}
        tipo="text"
        onChange={setField}
      />
      <CmsField
        label="Texto de copyright"
        fieldKey="copyright"
        value={fields.copyright ?? ''}
        tipo="text"
        onChange={setField}
      />
    </div>
  )
}
```

Luego agregar `SeccionFooter` al render switch de `cms/page.tsx`:

```tsx
seccion === 'footer' ? <SeccionFooter {...formProps} /> :
```

Y agregar la subsección al grupo Global en `ESTRUCTURA_CMS`:

```typescript
{
  pagina: 'Global',
  icono: 'settings',
  secciones: [
    { id: 'redes',  label: 'Redes sociales', preview: 'http://localhost:3000/#footer' },
    { id: 'footer', label: 'Footer',          preview: 'http://localhost:3000/#footer' }, // <-- agregar
  ],
},
```

---

## Validación

- [ ] El footer muestra la descripción y copyright desde BD
- [ ] `Global → Footer` en el CMS muestra el formulario con los campos
- [ ] Editar descripción → guardar → refrescar el sitio refleja el cambio
- [ ] Las redes sociales siguen funcionando (no regresión)
- [ ] No hay errores de `createBrowserClient` en consola del servidor