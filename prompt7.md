# Prompt: Fix Stats + Secciones Nosotros dinámicas — Aura Medical

## Contexto

Página `/nosotros` tiene 3 problemas a resolver en este orden:
1. **Bug urgente**: Stats muestran valores incorrectos (0+, 3+, 833+, 2%)
2. **Sección "Nuestros Valores"**: 4 cards hardcodeadas
3. **Historia / Timeline**: 6 hitos hardcodeados

Stack: Next.js 16 App Router + Supabase + TypeScript. Regla crítica: usar
`createClient` de `@supabase/supabase-js` en servidor, NUNCA `createBrowserClient`.

---

## PROBLEMA 1 — Bug en AnimatedStat (fix inmediato)

### Causa
`src/components/AnimatedStat.tsx` usa `parseInt` sobre el valor de BD.
El valor `"50,000"` tiene coma — `parseInt("50,000")` devuelve `50`, no `50000`.
Por eso los stats animados muestran valores incorrectos.

### Fix en `src/components/AnimatedStat.tsx`

Localizar la función `parseNumber` y reemplazarla:

```typescript
// ❌ Actual — falla con valores como "50,000"
function parseNumber(valor: string): number {
  return parseInt(valor.replace(/[^0-9]/g, ''), 10)
}

// ✅ Fix — eliminar comas antes de parsear
function parseNumber(valor: string): number {
  return parseInt(valor.replace(/,/g, ''), 10)
}
```

> No cambiar nada más del componente — solo esta función.

### Validación del fix
Tras el cambio, `/nosotros` debe mostrar:
- **12+** Años de trayectoria
- **200+** Especialistas certificados
- **50,000+** Pacientes atendidos
- **98%** Satisfacción del paciente

El número `50,000` debe animarse correctamente hasta `50000` y mostrarse
formateado con coma gracias al `toLocaleString('en-US')` ya existente.

---

## PROBLEMA 2 — Sección "Nuestros Valores" dinámica

### Lo que hay hoy (hardcodeado en `nosotros/page.tsx`)
4 cards: Humanismo, Excelencia Científica, Seguridad, Innovación — cada una
con ícono, título y descripción.

### Paso A — SQL en Supabase

```sql
INSERT INTO contenido (seccion, clave, valor, tipo) VALUES
  ('nosotros_valores', 'titulo',       'Nuestros Valores',                                                        'text'),
  ('nosotros_valores', 'subtitulo',    'Los principios que guían cada decisión clínica e inversión que realizamos.', 'textarea'),
  ('nosotros_valores', 'card_1_icono', 'favorite',                                                                'text'),
  ('nosotros_valores', 'card_1_titulo','Humanismo',                                                               'text'),
  ('nosotros_valores', 'card_1_desc',  'Cada paciente es una persona, no un expediente. Nuestra práctica médica está guiada por la empatía, el respeto y la dignidad en todo momento.', 'textarea'),
  ('nosotros_valores', 'card_2_icono', 'science',                                                                 'text'),
  ('nosotros_valores', 'card_2_titulo','Excelencia Científica',                                                   'text'),
  ('nosotros_valores', 'card_2_desc',  'Adoptamos protocolos clínicos basados en la evidencia más actualizada y fomentamos la investigación continua entre nuestros especialistas.', 'textarea'),
  ('nosotros_valores', 'card_3_icono', 'security',                                                                'text'),
  ('nosotros_valores', 'card_3_titulo','Seguridad',                                                               'text'),
  ('nosotros_valores', 'card_3_desc',  'La seguridad del paciente es innegociable. Implementamos estándares internacionales JCI y sistemas de doble verificación en todos los procedimientos.', 'textarea'),
  ('nosotros_valores', 'card_4_icono', 'lightbulb',                                                               'text'),
  ('nosotros_valores', 'card_4_titulo','Innovación',                                                              'text'),
  ('nosotros_valores', 'card_4_desc',  'Invertimos constantemente en tecnología de vanguardia y en la formación continua de nuestros equipos para mantenernos a la vanguardia médica.', 'textarea')
ON CONFLICT (seccion, clave) DO NOTHING;
```

### Paso B — `nosotros/page.tsx`

Agregar lectura de la nueva sección (junto al resto de `getContenido`):

```typescript
const valores = contenido.nosotros_valores ?? {}

const cards = [
  {
    icono: valores.card_1_icono  || 'favorite',
    titulo: valores.card_1_titulo || 'Humanismo',
    desc:   valores.card_1_desc   || 'Cada paciente es una persona, no un expediente.',
  },
  {
    icono: valores.card_2_icono  || 'science',
    titulo: valores.card_2_titulo || 'Excelencia Científica',
    desc:   valores.card_2_desc   || 'Adoptamos protocolos clínicos basados en la evidencia.',
  },
  {
    icono: valores.card_3_icono  || 'security',
    titulo: valores.card_3_titulo || 'Seguridad',
    desc:   valores.card_3_desc   || 'La seguridad del paciente es innegociable.',
  },
  {
    icono: valores.card_4_icono  || 'lightbulb',
    titulo: valores.card_4_titulo || 'Innovación',
    desc:   valores.card_4_desc   || 'Invertimos constantemente en tecnología de vanguardia.',
  },
]
```

Reemplazar en el JSX los 4 bloques hardcodeados por:

```tsx
<h2>{valores.titulo || 'Nuestros Valores'}</h2>
<p>{valores.subtitulo || 'Los principios que guían cada decisión clínica.'}</p>

{cards.map((card) => (
  <div key={card.titulo}>
    <span className="material-symbols-outlined">{card.icono}</span>
    <h3>{card.titulo}</h3>
    <p>{card.desc}</p>
  </div>
))}
```

> ⚠️ Mantener EXACTAMENTE los mismos classNames del JSX original.
> Solo cambiar la fuente de los datos, no el diseño.

### Paso C — Componente CMS `SeccionNosotros.tsx`

Agregar al final del formulario existente (después de los stats):

```tsx
<hr className="border-outline-variant my-sm" />
<p className="type-label text-on-surface-variant font-bold uppercase tracking-wider mb-xs">
  Nuestros Valores
</p>

<CmsField label="Título sección"    fieldKey="nosotros_valores.titulo"    value={valoresFields?.titulo    ?? ''} tipo="text"     onChange={setValoresField} />
<CmsField label="Subtítulo sección" fieldKey="nosotros_valores.subtitulo" value={valoresFields?.subtitulo ?? ''} tipo="textarea" onChange={setValoresField} />
```

> Si el hook `useCmsSection` no soporta múltiples secciones en un mismo
> componente, crear un segundo `useCmsSection('nosotros_valores')` dentro
> del mismo componente `SeccionNosotros.tsx` y renderizar ambos formularios
> con sus propios botones de guardar, o bien agregar `nosotros_valores`
> como subsección separada en el menú de Nosotros en `ESTRUCTURA_CMS`.

**Opción recomendada** — agregar como subsección en `cms/page.tsx`:

```typescript
{
  pagina: 'Nosotros',
  icono: 'groups',
  secciones: [
    { id: 'nosotros',         label: 'Hero + Estadísticas', preview: 'http://localhost:3000/nosotros' },
    { id: 'nosotros_valores', label: 'Nuestros Valores',    preview: 'http://localhost:3000/nosotros#valores' },
    { id: 'nosotros_historia',label: 'Historia / Timeline', preview: 'http://localhost:3000/nosotros#historia' },
  ],
},
```

---

## PROBLEMA 3 — Historia / Timeline dinámica

El timeline tiene 6 hitos con año, título y descripción. Por su estructura
repetitiva y variable en cantidad, la mejor solución es una **tabla propia**
en Supabase en lugar de claves en `contenido`.

### Paso A — Crear tabla `hitos` en Supabase

```sql
CREATE TABLE IF NOT EXISTS public.hitos (
  id         uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  año        text NOT NULL,
  titulo     text NOT NULL,
  descripcion text NOT NULL,
  orden      int  NOT NULL DEFAULT 0,
  activo     bool NOT NULL DEFAULT true,
  created_at timestamptz DEFAULT now()
);

-- RLS
ALTER TABLE public.hitos ENABLE ROW LEVEL SECURITY;

CREATE POLICY "anon_select" ON public.hitos
  FOR SELECT TO anon USING (activo = true);

CREATE POLICY "auth_all" ON public.hitos
  FOR ALL TO authenticated USING (true) WITH CHECK (true);

GRANT SELECT ON public.hitos TO anon;
GRANT ALL    ON public.hitos TO authenticated;

-- Datos iniciales
INSERT INTO public.hitos (año, titulo, descripcion, orden) VALUES
  ('2012', 'Fundación',           'Aura Medical abre sus puertas con 4 especialidades y 18 médicos fundadores comprometidos con un modelo de atención diferente.',                                         1),
  ('2015', 'Acreditación JCI',    'Obtenemos la acreditación de la Joint Commission International, convirtiéndonos en uno de los primeros hospitales privados en el norte de México en alcanzar este estándar.', 2),
  ('2018', 'Unidad de Oncología', 'Inauguramos nuestro Centro de Oncología de Precisión, con radioterapia de intensidad modulada y el primer comité multidisciplinario de tumores de la región.',          3),
  ('2021', 'Cirugía Robótica',    'Integramos el primer sistema Da Vinci en Chihuahua, marcando el inicio de nuestra era de cirugía de mínima invasión de alta precisión.',                             4),
  ('2024', 'Expansión Digital',   'Lanzamos nuestra plataforma de gestión médica y telemedicina, acercando a nuestros especialistas a pacientes en toda la región noroeste de México.',                  5),
  ('2026', 'Medicina Preventiva', 'Apertura de la Unidad de Medicina Preventiva y Bienestar, consolidando nuestro modelo de atención proactiva centrado en la salud a largo plazo.',                     6);
```

### Paso B — Función en `src/lib/contenido.ts`

```typescript
export const getHitos = unstable_cache(
  async () => {
    const { data, error } = await db()
      .from('hitos')
      .select('año, titulo, descripcion, orden')
      .eq('activo', true)
      .order('orden', { ascending: true })
    if (error) { console.error('[getHitos]', error.message); return [] }
    return data ?? []
  },
  ['hitos'],
  { tags: ['contenido'], revalidate: 86400 }
)
```

### Paso C — `nosotros/page.tsx`

```typescript
import { getContenido, getHitos } from '@/lib/contenido'

const [contenido, hitos] = await Promise.all([getContenido(), getHitos()])
```

Reemplazar los 6 bloques hardcodeados del timeline por:

```tsx
{hitos.map((hito) => (
  <div key={hito.año}>
    <span>{hito.año}</span>
    <h3>{hito.titulo}</h3>
    <p>{hito.descripcion}</p>
  </div>
))}
```

> Mantener los classNames exactos del JSX original.

### Paso D — CRUD de hitos en el panel admin

Agregar una página simple en `src/app/admin/hitos/page.tsx` que permita:
- Listar hitos ordenados
- Editar año, título y descripción inline
- Activar / desactivar un hito (campo `activo`)
- Reordenar (cambiar el campo `orden`)

Usar el mismo patrón visual que las páginas admin existentes
(Médicos, Especialidades, Unidades).

---

## Checklist de validación

- [ ] `/nosotros` muestra stats correctos: 12+, 200+, 50,000+, 98%
- [ ] La animación de 50,000 cuenta hasta 50000 y se muestra con coma
- [ ] Las 4 cards de "Nuestros Valores" muestran datos de BD
- [ ] El CMS tiene subsección "Nuestros Valores" en el grupo Nosotros
- [ ] El timeline muestra los 6 hitos desde la tabla `hitos`
- [ ] Editar un hito desde el admin → revalidar → `/nosotros` lo refleja
- [ ] No hay errores de `createBrowserClient` en consola del servidor