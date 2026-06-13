# Prompt: Implementar CMS completo — Aura Medical

## Contexto del proyecto

Eres el agente de desarrollo de **Aura Medical**, un sitio web institucional de clínica privada construido con:
- **Next.js 16 (App Router)** + **React 19** + **TypeScript estricto**
- **Tailwind CSS v4**
- **Supabase** (PostgreSQL + Auth + Storage)
- Cliente browser: `@supabase/ssr` → `createBrowserClient` (solo en `'use client'`)
- Cliente servidor: `createClient` de `@supabase/supabase-js` directo (para Server Components y `unstable_cache`)
- Iconos: **Material Symbols Outlined** (Google Fonts CDN) y **Lucide React**

### Regla crítica — cliente Supabase
```typescript
// ❌ NUNCA en Server Components ni unstable_cache
import { createClient } from '@/lib/supabase' // createBrowserClient — falla en Node.js

// ✅ SIEMPRE en Server Components y unstable_cache
import { createClient } from '@supabase/supabase-js'
function db() {
  return createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!)
}
```

### Tabla `contenido` (almacén clave-valor del CMS)
```sql
id        uuid PK
seccion   text    -- nombre de la sección
clave     text    -- nombre del campo
valor     text    -- valor del campo
tipo      text    -- 'text' | 'textarea' | 'url' | 'image'
updated_at timestamptz
```

### Patrón de lectura en páginas públicas
```typescript
// En src/lib/contenido.ts — patrón existente a seguir
export const getContenido = unstable_cache(
  async () => {
    const { data, error } = await db()
      .from('contenido')
      .select('seccion, clave, valor, tipo')
    if (error) { console.error('[getContenido]', error.message); return {} }
    // Agrupar por sección: { hero: { titulo: '...', subtitulo: '...' }, ... }
    return data.reduce((acc, row) => {
      if (!acc[row.seccion]) acc[row.seccion] = {}
      acc[row.seccion][row.clave] = row.valor
      return acc
    }, {} as Record<string, Record<string, string>>)
  },
  ['contenido'],
  { tags: ['contenido'], revalidate: 86400 }
)
```

### Hook del CMS (ya existe en `src/hooks/use-cms-section.ts`)
```typescript
const { fields, types, setField, save, saving, saved, isDirty, loading } = useCmsSection('nombre_seccion')
```

### Componentes de sección CMS (ya existen en `src/app/admin/cms/components/`)
Reciben `{ fields, types, setField }` como props — renders puros sin estado propio.

### Componente CmsField (ya existe)
Renderiza input según `tipo`: `text` → `<input>`, `textarea` → `<textarea>`, `url`/`image` → `<input>` + preview.

---

## Objetivo

Hacer que **cada sección hardcodeada del sitio público sea editable desde `/admin/cms`**, leyendo y escribiendo en la tabla `contenido` de Supabase. El usuario final debe poder cambiar textos, números, íconos y links sin tocar código.

---

## Plan de ejecución — 4 pasos en orden

---

### PASO 1: Seeds SQL — secciones que ya tienen CMS pero sin datos

Ejecutar en Supabase SQL Editor. Insertar solo si no existen (usar `ON CONFLICT DO NOTHING` o verificar antes).

#### Sección `elegirnos` (Por qué Aura Medical — Home)
```sql
INSERT INTO contenido (seccion, clave, valor, tipo) VALUES
  ('elegirnos', 'card_1_icono',  'health_and_safety',                                                                                    'text'),
  ('elegirnos', 'card_1_titulo', 'Atención 24/7',                                                                                        'text'),
  ('elegirnos', 'card_1_desc',   'Urgencias y cuidados intensivos disponibles a cualquier hora, todos los días del año con personal altamente capacitado.', 'textarea'),
  ('elegirnos', 'card_2_icono',  'public',                                                                                               'text'),
  ('elegirnos', 'card_2_titulo', 'Expertos Globales',                                                                                    'text'),
  ('elegirnos', 'card_2_desc',   'Una red de especialistas con formación internacional y líderes de opinión en sus respectivas áreas terapéuticas.', 'textarea'),
  ('elegirnos', 'card_3_icono',  'memory',                                                                                               'text'),
  ('elegirnos', 'card_3_titulo', 'Tecnología de Punta',                                                                                  'text'),
  ('elegirnos', 'card_3_desc',   'Inversión constante en los últimos avances médicos, robótica y sistemas de IA para diagnósticos precisos.', 'textarea')
ON CONFLICT (seccion, clave) DO NOTHING;
```

> ⚠️ Si la tabla `contenido` no tiene `UNIQUE(seccion, clave)`, primero agregar:
> ```sql
> ALTER TABLE contenido ADD CONSTRAINT contenido_seccion_clave_unique UNIQUE (seccion, clave);
> ```

#### Sección `nosotros` (stats y textos de /nosotros)
```sql
INSERT INTO contenido (seccion, clave, valor, tipo) VALUES
  ('nosotros', 'hero_titulo',       'Una institución construida sobre la confianza médica', 'text'),
  ('nosotros', 'hero_subtitulo',    'Más de una década redefiniendo los estándares de la medicina privada en el norte de México.', 'textarea'),
  ('nosotros', 'hero_badge',        'Desde 2012',                    'text'),
  ('nosotros', 'años_trayectoria',  '12',                            'text'),
  ('nosotros', 'especialistas',     '200',                           'text'),
  ('nosotros', 'pacientes',         '50,000',                        'text'),
  ('nosotros', 'satisfaccion',      '98',                            'text'),
  ('nosotros', 'descripcion',       'Somos una institución médica privada comprometida con la excelencia clínica y la innovación tecnológica.', 'textarea')
ON CONFLICT (seccion, clave) DO NOTHING;
```

#### Sección `hero` (agregar campo badge si falta)
```sql
INSERT INTO contenido (seccion, clave, valor, tipo) VALUES
  ('hero', 'badge_texto', 'Innovación en Salud', 'text')
ON CONFLICT (seccion, clave) DO NOTHING;
```

---

### PASO 2: Nuevas secciones en `contenido` + actualizar `src/lib/contenido.ts`

#### 2.1 Seeds SQL para secciones nuevas

```sql
-- Sección: tecnologia (Vanguardia Tecnológica — Home)
INSERT INTO contenido (seccion, clave, valor, tipo) VALUES
  ('tecnologia', 'titulo',         'Vanguardia Tecnológica',    'text'),
  ('tecnologia', 'subtitulo',      'La integración de la inteligencia artificial y la robótica redefine lo que es posible en la medicina moderna.', 'textarea'),
  ('tecnologia', 'imagen',         '/imagenes/surgical-robotics.png', 'image'),
  ('tecnologia', 'badge',          'Robótica Quirúrgica',       'text'),
  ('tecnologia', 'imagen_titulo',  'Precisión Milimétrica',     'text'),
  ('tecnologia', 'imagen_desc',    'Intervenciones mínimamente invasivas con sistemas robóticos de última generación para una recuperación más rápida.', 'textarea'),
  ('tecnologia', 'bullet_1_icono', 'psychology',                'text'),
  ('tecnologia', 'bullet_1_titulo','Diagnóstico por IA',        'text'),
  ('tecnologia', 'bullet_1_desc',  'Algoritmos predictivos que asisten a nuestros médicos en la detección temprana de anomalías con una precisión sin precedentes.', 'textarea'),
  ('tecnologia', 'bullet_2_icono', 'science',                   'text'),
  ('tecnologia', 'bullet_2_titulo','Medicina Genómica',         'text'),
  ('tecnologia', 'bullet_2_desc',  'Terapias diseñadas específicamente según el perfil genético del paciente para maximizar la eficacia del tratamiento.', 'textarea'),
  ('tecnologia', 'boton_texto',    'Descubrir Tecnología',      'text'),
  ('tecnologia', 'boton_href',     '/unidades',                 'url')
ON CONFLICT (seccion, clave) DO NOTHING;

-- Sección: infraestructura (Bento Grid — Home)
INSERT INTO contenido (seccion, clave, valor, tipo) VALUES
  ('infraestructura', 'titulo',         'Infraestructura Tecnológica', 'text'),
  ('infraestructura', 'subtitulo',      'Nuestro compromiso con la salud se refleja en la integración de sistemas de diagnóstico avanzados e instalaciones de primer nivel.', 'textarea'),
  ('infraestructura', 'card_1_badge',   'Diagnóstico',                 'text'),
  ('infraestructura', 'card_1_icono',   'biotech',                     'text'),
  ('infraestructura', 'card_1_titulo',  'Imagenología de Alta Precisión', 'text'),
  ('infraestructura', 'card_1_desc',    'Equipos de última generación que garantizan resultados exactos y oportunos para un tratamiento eficaz.', 'textarea'),
  ('infraestructura', 'card_1_imagen',  '/imagenes/advanced-mri.png',  'image'),
  ('infraestructura', 'card_2_badge',   'UCI',                         'text'),
  ('infraestructura', 'card_2_icono',   'monitor_heart',               'text'),
  ('infraestructura', 'card_2_titulo',  'Monitoreo Continuo',          'text'),
  ('infraestructura', 'card_2_desc',    'Sistemas integrados de datos vitales en tiempo real para pacientes hospitalizados.', 'textarea'),
  ('infraestructura', 'card_2_imagen',  '/imagenes/card-uci.jpg',      'image'),
  ('infraestructura', 'card_3_badge',   'Cirugía',                     'text'),
  ('infraestructura', 'card_3_icono',   'precision_manufacturing',     'text'),
  ('infraestructura', 'card_3_titulo',  'Cirugía Robótica Da Vinci',   'text'),
  ('infraestructura', 'card_3_desc',    'Intervenciones de alta precisión con mínima invasión, menos dolor y recuperación acelerada.', 'textarea'),
  ('infraestructura', 'card_3_imagen',  '/imagenes/surgical-robotics.png', 'image'),
  ('infraestructura', 'card_4_titulo',  'Equipo de Especialistas',     'text'),
  ('infraestructura', 'card_4_desc',    'Más de 200 médicos certificados colaborando para ofrecer los mejores resultados clínicos.', 'textarea'),
  ('infraestructura', 'card_4_imagen',  '/imagenes/premium-service.jpg', 'image'),
  ('infraestructura', 'card_4_href',    '/directorio',                 'url'),
  ('infraestructura', 'card_4_link',    'Conocer equipo',              'text')
ON CONFLICT (seccion, clave) DO NOTHING;

-- Sección: premium (Aura Premium Club — Home)
INSERT INTO contenido (seccion, clave, valor, tipo) VALUES
  ('premium', 'titulo',       'Aura Premium Club',         'text'),
  ('premium', 'badge',        'Membresía Exclusiva',       'text'),
  ('premium', 'descripcion',  'Acceso preferencial a medicina concierge, gestor de salud personal 24/7 y beneficios exclusivos en todas nuestras instalaciones.', 'textarea'),
  ('premium', 'bullet_1',     'Consultas sin tiempo de espera',              'text'),
  ('premium', 'bullet_2',     'Check-ups ejecutivos anuales incluidos',       'text'),
  ('premium', 'bullet_3',     'Acceso a la sala VIP y parking preferencial',  'text'),
  ('premium', 'boton_texto',  'Solicitar Información',     'text'),
  ('premium', 'whatsapp',     '526531332053',              'text'),
  ('premium', 'whatsapp_msg', 'Hola, me gustaría solicitar información sobre el Aura Premium Club.', 'textarea'),
  ('premium', 'imagen',       '/imagenes/premium-suite.jpg', 'image')
ON CONFLICT (seccion, clave) DO NOTHING;

-- Sección: acciones (Quick Actions — Home)
INSERT INTO contenido (seccion, clave, valor, tipo) VALUES
  ('acciones', 'accion_1_titulo', 'Agendar Cita',       'text'),
  ('acciones', 'accion_1_desc',   'Reserve su consulta con nuestros especialistas de forma rápida y segura.', 'textarea'),
  ('acciones', 'accion_1_href',   '/contacto',          'url'),
  ('acciones', 'accion_2_titulo', 'Buscar Médico',      'text'),
  ('acciones', 'accion_2_desc',   'Encuentre al profesional ideal dentro de nuestro directorio médico de excelencia.', 'textarea'),
  ('acciones', 'accion_2_href',   '/directorio',        'url')
ON CONFLICT (seccion, clave) DO NOTHING;

-- Sección: esp_hero (Hero de /especialidades)
INSERT INTO contenido (seccion, clave, valor, tipo) VALUES
  ('esp_hero', 'badge',     'Excelencia en Salud',       'text'),
  ('esp_hero', 'titulo',    'Red Integral de',           'text'),
  ('esp_hero', 'titulo_2',  'Especialidades Médicas',    'text'),
  ('esp_hero', 'subtitulo', 'Atención especializada con tecnología de vanguardia y equipos multidisciplinarios. Nuestro compromiso es su salud integral.', 'textarea'),
  ('esp_hero', 'boton',     'Explorar Especialidades',   'text'),
  ('esp_hero', 'imagen',    '/imagenes/hero-background.png', 'image')
ON CONFLICT (seccion, clave) DO NOTHING;

-- Sección: uni_hero (Hero de /unidades)
INSERT INTO contenido (seccion, clave, valor, tipo) VALUES
  ('uni_hero', 'badge',     'Infraestructura de Clase Mundial', 'text'),
  ('uni_hero', 'titulo',    'Unidades Médicas de',             'text'),
  ('uni_hero', 'titulo_2',  'Alta Especialidad',               'text'),
  ('uni_hero', 'subtitulo', 'Instalaciones diseñadas con los más altos estándares internacionales, integrando tecnología de vanguardia y confort premium para cada etapa de su atención.', 'textarea'),
  ('uni_hero', 'boton_1',   'Conocer Instalaciones',           'text'),
  ('uni_hero', 'boton_2',   'Agendar Visita',                  'text'),
  ('uni_hero', 'imagen',    '/imagenes/hero-background.png',   'image')
ON CONFLICT (seccion, clave) DO NOTHING;

-- Sección: noticias_hero (Hero de /noticias)
INSERT INTO contenido (seccion, clave, valor, tipo) VALUES
  ('noticias_hero', 'badge',     'Noticias Institucionales',  'text'),
  ('noticias_hero', 'titulo',    'Actualidad en Aura Medical', 'text'),
  ('noticias_hero', 'subtitulo', 'Avances tecnológicos, reconocimientos a nuestros especialistas y novedades del hospital que nos mantienen a la vanguardia de la medicina privada.', 'textarea')
ON CONFLICT (seccion, clave) DO NOTHING;

-- Sección: contacto (agregar textos de intro que faltan)
INSERT INTO contenido (seccion, clave, valor, tipo) VALUES
  ('contacto', 'hero_titulo',    'Contáctanos',  'text'),
  ('contacto', 'hero_badge',     'Estamos para ayudarte', 'text'),
  ('contacto', 'hero_subtitulo', 'Nuestro equipo de coordinación médica está disponible para resolver tus dudas, orientarte hacia el especialista correcto y agendar tu consulta.', 'textarea')
ON CONFLICT (seccion, clave) DO NOTHING;
```

#### 2.2 Actualizar `src/lib/contenido.ts`

Mantener `getContenido` existente (ya agrupa todo por sección — las nuevas secciones quedarán disponibles automáticamente sin cambiar código). Solo agregar `getMedicos` si no existe:

```typescript
export const getMedicos = unstable_cache(
  async () => {
    const { data, error } = await db()
      .from('medicos')
      .select('*')
      .eq('activo', true)
      .order('orden', { ascending: true })
    if (error) { console.error('[getMedicos]', error.message); return [] }
    return data ?? []
  },
  ['medicos'],
  { tags: ['contenido'], revalidate: 86400 }
)
```

---

### PASO 3: Actualizar páginas públicas para leer desde `contenido`

#### 3.1 `src/app/(public)/page.tsx` — Home

Reemplazar todas las secciones hardcodeadas. Usar `getContenido()` que ya existe y destructurar las nuevas secciones:

```typescript
const [contenido, testimonios] = await Promise.all([getContenido(), getTestimonios()])
const hero          = contenido.hero          ?? {}
const elegirnos     = contenido.elegirnos     ?? {}
const tecnologia    = contenido.tecnologia    ?? {}
const infraestructura = contenido.infraestructura ?? {}
const premium       = contenido.premium       ?? {}
const acciones      = contenido.acciones      ?? {}
```

**Sección Hero** — agregar badge dinámico:
```tsx
<span>...</span>
{hero.badge_texto || 'Innovación en Salud'}
```

**Sección Acciones rápidas** — pasar props a `HomeQuickActions` o renderizar inline:
```tsx
// Opción: renderizar inline si HomeQuickActions es simple
// Opción: convertir HomeQuickActions en Server Component que reciba props
const accion1 = { titulo: acciones.accion_1_titulo || 'Agendar Cita', desc: acciones.accion_1_desc || '...', href: acciones.accion_1_href || '/contacto' }
const accion2 = { titulo: acciones.accion_2_titulo || 'Buscar Médico', desc: acciones.accion_2_desc || '...', href: acciones.accion_2_href || '/directorio' }
```

**Sección Vanguardia Tecnológica** — reemplazar hardcode:
```tsx
<h2>{tecnologia.titulo || 'Vanguardia Tecnológica'}</h2>
<p>{tecnologia.subtitulo || '...'}</p>
<img src={tecnologia.imagen || '/imagenes/surgical-robotics.png'} />
// bullets:
{ titulo: tecnologia.bullet_1_titulo || 'Diagnóstico por IA', ... }
{ titulo: tecnologia.bullet_2_titulo || 'Medicina Genómica', ... }
```

**Sección Bento Grid / Infraestructura** — reemplazar 4 cards:
```tsx
<h2>{infraestructura.titulo || 'Infraestructura Tecnológica'}</h2>
// card 1:
<img src={infraestructura.card_1_imagen || '/imagenes/advanced-mri.png'} />
<h3>{infraestructura.card_1_titulo || 'Imagenología de Alta Precisión'}</h3>
// ... mismo patrón para card_2, card_3, card_4
```

**Sección Premium Club**:
```tsx
<h2>{premium.titulo || 'Aura Premium Club'}</h2>
<p>{premium.descripcion || '...'}</p>
const bullets = [premium.bullet_1, premium.bullet_2, premium.bullet_3].filter(Boolean)
const waHref = `https://wa.me/${premium.whatsapp || '526531332053'}?text=${encodeURIComponent(premium.whatsapp_msg || '...')}`
```

#### 3.2 `src/app/(public)/nosotros/page.tsx`

```typescript
const contenido = await getContenido()
const nos = contenido.nosotros ?? {}

// Hero
nos.hero_titulo    || 'Una institución construida sobre la confianza médica'
nos.hero_subtitulo || '...'
nos.hero_badge     || 'Desde 2012'

// Stats
nos.años_trayectoria || '12'
nos.especialistas    || '200'
nos.pacientes        || '50,000'
nos.satisfaccion     || '98'
```

> ℹ️ El Timeline de hitos (Fundación 2012, Acreditación JCI 2015...) es complejo para clave-valor. Dejarlo hardcodeado en esta iteración o crear una tabla `hitos` independiente en Supabase con columnas `año`, `titulo`, `descripcion` y CRUD en admin.

#### 3.3 `src/app/(public)/especialidades/page.tsx`

```typescript
const contenido = await getContenido()
const hero = contenido.esp_hero ?? {}

// Hero
hero.badge     || 'Excelencia en Salud'
hero.titulo    || 'Red Integral de'
hero.titulo_2  || 'Especialidades Médicas'
hero.subtitulo || '...'
hero.boton     || 'Explorar Especialidades'
```

#### 3.4 `src/app/(public)/unidades/page.tsx`

```typescript
const contenido = await getContenido()
const hero = contenido.uni_hero ?? {}
// mismo patrón — uni_hero.badge, uni_hero.titulo, uni_hero.titulo_2, etc.
```

#### 3.5 `src/app/(public)/noticias/page.tsx`

```typescript
const contenido = await getContenido()
const hero = contenido.noticias_hero ?? {}
// noticias_hero.badge, noticias_hero.titulo, noticias_hero.subtitulo
```

#### 3.6 `src/app/(public)/contacto/page.tsx`

```typescript
const contenido = await getContenido()
const c = contenido.contacto ?? {}
// agregar lectura de hero_titulo, hero_badge, hero_subtitulo
// los campos de datos (teléfono, email, etc.) ya están conectados
```

---

### PASO 4: Agregar secciones al CMS visual (`/admin/cms`)

#### 4.1 Crear componentes de sección en `src/app/admin/cms/components/`

Por cada sección nueva, crear un componente que siga **exactamente** el mismo patrón que los existentes (`SeccionHero.tsx`, `SeccionElegirnos.tsx`, etc.):

```typescript
// Ejemplo: SeccionTecnologia.tsx
'use client'
import CmsField from './CmsField'
import type { CmsSectionProps } from '../page'  // ajustar import según tu archivo

export default function SeccionTecnologia({ fields, types, setField }: CmsSectionProps) {
  return (
    <div className="flex flex-col gap-md">
      <CmsField label="Título" fieldKey="titulo"         value={fields.titulo}         tipo={types.titulo}         onChange={setField} />
      <CmsField label="Subtítulo" fieldKey="subtitulo"   value={fields.subtitulo}      tipo={types.subtitulo}      onChange={setField} />
      <CmsField label="Imagen principal" fieldKey="imagen" value={fields.imagen}       tipo={types.imagen}         onChange={setField} />
      <CmsField label="Badge imagen" fieldKey="badge"    value={fields.badge}          tipo={types.badge}          onChange={setField} />
      <CmsField label="Título imagen" fieldKey="imagen_titulo" value={fields.imagen_titulo} tipo={types.imagen_titulo} onChange={setField} />
      <CmsField label="Descripción imagen" fieldKey="imagen_desc" value={fields.imagen_desc} tipo={types.imagen_desc} onChange={setField} />
      <hr className="border-outline-variant" />
      <p className="type-label text-on-surface-variant font-bold">Bullet 1</p>
      <CmsField label="Ícono (Material Symbol)" fieldKey="bullet_1_icono"  value={fields.bullet_1_icono}  tipo={types.bullet_1_icono}  onChange={setField} />
      <CmsField label="Título"                   fieldKey="bullet_1_titulo" value={fields.bullet_1_titulo} tipo={types.bullet_1_titulo} onChange={setField} />
      <CmsField label="Descripción"              fieldKey="bullet_1_desc"   value={fields.bullet_1_desc}   tipo={types.bullet_1_desc}   onChange={setField} />
      <hr className="border-outline-variant" />
      <p className="type-label text-on-surface-variant font-bold">Bullet 2</p>
      <CmsField label="Ícono (Material Symbol)" fieldKey="bullet_2_icono"  value={fields.bullet_2_icono}  tipo={types.bullet_2_icono}  onChange={setField} />
      <CmsField label="Título"                   fieldKey="bullet_2_titulo" value={fields.bullet_2_titulo} tipo={types.bullet_2_titulo} onChange={setField} />
      <CmsField label="Descripción"              fieldKey="bullet_2_desc"   value={fields.bullet_2_desc}   tipo={types.bullet_2_desc}   onChange={setField} />
      <hr className="border-outline-variant" />
      <CmsField label="Botón texto" fieldKey="boton_texto" value={fields.boton_texto} tipo={types.boton_texto} onChange={setField} />
      <CmsField label="Botón URL"   fieldKey="boton_href"  value={fields.boton_href}  tipo={types.boton_href}  onChange={setField} />
    </div>
  )
}
```

Crear el mismo patrón para: `SeccionInfraestructura.tsx`, `SeccionPremium.tsx`, `SeccionAcciones.tsx`, `SeccionEspHero.tsx`, `SeccionUniHero.tsx`, `SeccionNoticiasHero.tsx`.

#### 4.2 Actualizar `src/app/admin/cms/page.tsx`

Agregar las nuevas secciones al array de tabs y al render condicional.

**Agregar tabs:**
```typescript
const SECCIONES = [
  { id: 'hero',           label: 'Hero',              preview: '/#hero' },
  { id: 'elegirnos',      label: 'Por qué Aura',      preview: '/#elegirnos' },
  { id: 'acciones',       label: 'Acciones Rápidas',  preview: '/' },
  { id: 'tecnologia',     label: 'Vanguardia Tech',   preview: '/' },
  { id: 'infraestructura',label: 'Infraestructura',   preview: '/' },
  { id: 'premium',        label: 'Premium Club',      preview: '/' },
  { id: 'nosotros',       label: 'Nosotros',          preview: '/nosotros' },
  { id: 'contacto',       label: 'Contacto',          preview: '/contacto' },
  { id: 'esp_hero',       label: 'Hero Especialidades', preview: '/especialidades' },
  { id: 'uni_hero',       label: 'Hero Unidades',     preview: '/unidades' },
  { id: 'noticias_hero',  label: 'Hero Noticias',     preview: '/noticias' },
  { id: 'redes',          label: 'Redes Sociales',    preview: '/#footer' },
  { id: 'footer',         label: 'Footer',            preview: '/#footer' },
]
```

**Render condicional** — agregar al bloque existente (sin definir componentes dentro del render):
```tsx
seccion === 'tecnologia'      ? <SeccionTecnologia      {...formProps} /> :
seccion === 'infraestructura' ? <SeccionInfraestructura {...formProps} /> :
seccion === 'premium'         ? <SeccionPremium         {...formProps} /> :
seccion === 'acciones'        ? <SeccionAcciones        {...formProps} /> :
seccion === 'esp_hero'        ? <SeccionEspHero         {...formProps} /> :
seccion === 'uni_hero'        ? <SeccionUniHero         {...formProps} /> :
seccion === 'noticias_hero'   ? <SeccionNoticiasHero    {...formProps} /> :
```

---

## Checklist de validación al terminar

- [ ] `getContenido()` devuelve las nuevas secciones sin error en consola
- [ ] Home carga con textos desde BD (verificar en `/` con server restart)
- [ ] Cambiar un campo en `/admin/cms` → guardar → el sitio público refleja el cambio (puede requerir `POST /api/revalidate`)
- [ ] Las páginas internas (Nosotros, Especialidades, Unidades, Noticias, Contacto) usan sus textos desde BD
- [ ] No hay errores de `localStorage` en logs del servidor (indica uso incorrecto de `createBrowserClient` en servidor)
- [ ] Todos los componentes de sección CMS son renders puros (no tienen `useState` propio para los campos)

---

## Notas importantes

- **Fallbacks obligatorios**: cada campo debe tener un valor por defecto (`|| 'texto default'`) para que si se borra desde el CMS la página no quede vacía.
- **No mover lógica de negocio al cliente**: las páginas públicas son Server Components y deben seguir siéndolo.
- **`unstable_cache` key**: si agregas nuevas funciones cacheadas, usar tags `['contenido']` para que `/api/revalidate` las invalide todas juntas.
- **Timeline de Nosotros**: los 6 hitos históricos son demasiado estructurados para clave-valor simple. Crearlos como tabla independiente `hitos` es el approach correcto, pero es opcional en esta iteración.