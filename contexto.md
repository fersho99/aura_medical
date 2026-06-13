# Aura Medical — Contexto del Proyecto

> Documento de referencia técnica completo. Última actualización: junio 2026.

---

## 1. Descripción General

**Aura Medical** es el sitio web institucional y panel de administración de una clínica privada de alta especialidad ubicada en Chihuahua, México. El proyecto combina un sitio público orientado a pacientes con un panel admin completo para gestión de contenido, médicos, citas y usuarios.

**Objetivo del proyecto:** construir una plataforma web profesional con contenido completamente editable (CMS), autenticación segura por roles, y arquitectura moderna basada en Next.js + Supabase.

---

## 2. Stack Tecnológico

| Capa | Tecnología | Versión |
|---|---|---|
| Framework | Next.js (App Router) | 16.2.6 |
| UI | React | 19.2.4 |
| Estilos | Tailwind CSS v4 | ^4 |
| Editor de texto | TipTap | ^3.26.0 |
| Iconos | Material Symbols Outlined (Google Fonts CDN) | — |
| Íconos UI extra | Lucide React | ^1.16.0 |
| Base de datos | Supabase (PostgreSQL + Auth + Storage) | ^2.107.0 |
| Cliente browser | `@supabase/ssr` `createBrowserClient` | ^0.10.3 |
| Cliente servidor | `@supabase/supabase-js` `createClient` | ^2.107.0 |
| TypeScript | — | ^5 |
| Lenguaje | TypeScript estricto | — |

### Por qué dos clientes de Supabase

- **`@/lib/supabase.ts` → `createBrowserClient`**: para Client Components del panel admin. Lee la sesión del usuario desde cookies/localStorage. Solo se usa en páginas con `'use client'`.
- **`@supabase/supabase-js` `createClient` directo**: para funciones Server Side (`contenido.ts`, `unstable_cache`). El browser client intenta acceder a `localStorage` en Node.js y falla silenciosamente; el cliente directo funciona correctamente en servidor.

---

## 3. Estructura de Directorios

```
src/
├── app/
│   ├── (public)                   ← Páginas públicas (Server Components)
│   │   ├── page.tsx               ← Home
│   │   ├── nosotros/
│   │   ├── contacto/
│   │   ├── directorio/
│   │   ├── especialidades/        ← Sub-rutas por especialidad
│   │   ├── unidades/              ← Sub-rutas por unidad
│   │   ├── noticias/
│   │   │   └── [slug]/
│   │   ├── privacidad/
│   │   ├── aviso-legal/
│   │   └── cookies/
│   ├── admin/                     ← Panel de administración
│   │   ├── layout.tsx             ← Sidebar + top bar (Client Component)
│   │   ├── login/
│   │   ├── dashboard/
│   │   ├── medicos/               ← CRUD médicos
│   │   ├── especialidades/        ← CRUD especialidades
│   │   ├── unidades/              ← CRUD unidades
│   │   ├── noticias/              ← CRUD noticias (con TipTap)
│   │   ├── testimonios/           ← CRUD testimonios
│   │   ├── citas/                 ← Gestión de citas
│   │   ├── usuarios/              ← Gestión de usuarios
│   │   └── cms/                   ← CMS Visual con preview
│   │       ├── page.tsx
│   │       └── components/
│   │           ├── CmsField.tsx
│   │           ├── SitePreview.tsx
│   │           ├── SeccionHero.tsx
│   │           ├── SeccionElegirnos.tsx
│   │           ├── SeccionNosotros.tsx
│   │           ├── SeccionContacto.tsx
│   │           ├── SeccionRedes.tsx
│   │           └── SeccionFooter.tsx
│   ├── api/
│   │   ├── revalidate/            ← POST: invalida cache ISR
│   │   ├── citas/                 ← POST: envía cita (rate-limited)
│   │   ├── contacto/              ← POST: formulario de contacto
│   │   ├── newsletter/            ← POST: suscripción newsletter
│   │   └── admin/
│   │       ├── crear-usuario/     ← POST: crea usuario con rol
│   │       └── invalidar-rol/     ← POST: limpia cookie de rol
│   ├── globals.css                ← Design tokens + utilidades Tailwind
│   ├── layout.tsx                 ← Root layout (fuentes, metadata global)
│   └── not-found.tsx
├── components/
│   ├── Header.tsx                 ← Navbar pública
│   ├── Footer.tsx                 ← Footer público dinámico
│   ├── PublicShell.tsx            ← Wrapper: Header + Footer
│   ├── HomeQuickActions.tsx       ← Acciones rápidas (citas, urgencias, etc.)
│   ├── AgendarCitaModal.tsx       ← Modal de cita
│   ├── NewsletterForm.tsx         ← Formulario de newsletter
│   ├── SearchBar.tsx              ← Búsqueda de médicos
│   ├── WhatsAppButton.tsx         ← Botón flotante WhatsApp
│   └── admin/
│       └── TipTapEditor.tsx       ← Editor WYSIWYG para noticias
├── hooks/
│   └── use-cms-section.ts         ← Hook compartido para CMS
├── lib/
│   ├── supabase.ts                ← Browser client (admin Client Components)
│   ├── supabase-server.ts         ← Server client con cookies (middleware)
│   ├── contenido.ts               ← Funciones cacheadas de datos públicos
│   ├── roles.ts                   ← Roles, rutas permitidas, menú items
│   ├── validators.ts              ← Sanitización + validación de payloads
│   ├── rate-limit.ts              ← Rate limiter en memoria por IP
│   └── constants.ts               ← Constantes globales
└── middleware.ts                  ← Auth guard + verificación de roles
```

---

## 4. Base de Datos — Supabase

### 4.1 Tablas principales

#### `contenido` — Almacén clave-valor para CMS
```sql
id        uuid PK
seccion   text    -- 'hero' | 'nosotros' | 'contacto' | 'redes' | 'footer' | 'elegirnos'
clave     text    -- ej: 'titulo', 'card_1_icono'
valor     text
tipo      text    -- 'text' | 'textarea' | 'url' | 'image'
updated_at timestamptz
```

#### `testimonios`
```sql
id           uuid PK
nombre       text NOT NULL
cargo        text
testimonio   text NOT NULL
calificacion numeric(3,1)   -- 3 | 3.5 | 4 | 4.5 | 5
iniciales    char(2)
color        text           -- 'primary' | 'secondary' | 'tertiary'
activo       boolean
orden        int
created_at   timestamptz
updated_at   timestamptz
```

#### `medicos`
```sql
id, nombre, slug, especialidad, subespecialidad,
descripcion, imagen_url, activo, orden, ...
```

#### `especialidades`
```sql
id, slug, nombre, descripcion_corta, imagen_url,
icono, servicios (text[]), activo, orden
```

#### `unidades`
```sql
id, slug, nombre, descripcion, imagen_url, icono, activo, orden
```

#### `noticias`
```sql
id, slug, titulo, contenido (HTML), imagen_url,
categoria, autor, publicado, fecha_publicacion, created_at
```

#### `perfiles` — Extiende auth.users
```sql
id   uuid FK → auth.users
rol  text  -- 'super_admin' | 'admin' | 'editor' | 'recepcionista'
nombre text
activo boolean
```

#### `citas`
```sql
id, nombre, telefono, correo, area, horario,
detalles, estado, created_at
```

### 4.2 Row Level Security (RLS)

Regla general:
- **Tablas públicas** (`contenido`, `medicos`, `especialidades`, `unidades`, `noticias`, `testimonios`): necesitan política `FOR SELECT TO anon USING (activo = true)` **Y** `GRANT SELECT ON tabla TO anon`.
- **Tablas admin** (`perfiles`, `citas`, etc.): solo rol `authenticated`.

Políticas críticas a tener activas:
```sql
-- Lectura pública
CREATE POLICY "anon_select" ON contenido    FOR SELECT TO anon USING (true);
CREATE POLICY "anon_select" ON testimonios  FOR SELECT TO anon USING (activo = true);
CREATE POLICY "anon_select" ON medicos      FOR SELECT TO anon USING (activo = true);
CREATE POLICY "anon_select" ON especialidades FOR SELECT TO anon USING (activo = true);
CREATE POLICY "anon_select" ON noticias     FOR SELECT TO anon USING (publicado = true);
CREATE POLICY "anon_select" ON unidades     FOR SELECT TO anon USING (activo = true);

-- Escritura admin
CREATE POLICY "auth_all" ON testimonios FOR ALL TO authenticated USING (true) WITH CHECK (true);
-- (mismo patrón para el resto de tablas)

-- GRANTs obligatorios
GRANT USAGE ON SCHEMA public TO anon, authenticated;
GRANT SELECT ON contenido, testimonios, medicos, especialidades, noticias, unidades TO anon;
GRANT ALL ON contenido, testimonios, medicos, especialidades, noticias, unidades, citas TO authenticated;
```

> **Problema conocido:** Si una tabla tiene RLS activo sin las policies/grants correctos, Supabase devuelve `403`. El panel admin no lo nota porque corre con sesión autenticada, pero la web pública (anon) sí falla silenciosamente (devuelve array vacío).

---

## 5. Autenticación y Autorización

### 5.1 Flujo de autenticación

```
Usuario → /admin/login
  → supabase.auth.signInWithPassword()
  → redirect a /admin/dashboard
  → middleware verifica sesión en cada request de /admin/*
```

### 5.2 Middleware (`src/middleware.ts`)

El middleware corre en Edge Runtime en cada request a `/admin/*`:

1. **Sin sesión** → redirect a `/admin/login`, borra cookie `am-rol`
2. **Con sesión en `/admin/login`** → redirect a `/admin/dashboard`
3. **Con sesión en `/admin/*`**:
   - Lee cookie `am-rol` (cache de 30 minutos)
   - Si hay cache: verifica permisos sin consultar BD
   - Si no hay cache: consulta tabla `perfiles`, guarda rol en cookie
   - Llama a `puedeAcceder(rol, pathname)` de `src/lib/roles.ts`
   - Si no tiene acceso → redirect a `/admin/dashboard`

**Cookie de rol:** `am-rol`, httpOnly, sameSite=lax, TTL=30min, path=/admin.
Evita una query a Supabase en cada navegación del panel.

### 5.3 Roles y permisos (`src/lib/roles.ts`)

```
super_admin   → acceso total (sin restricciones de ruta)
admin         → dashboard, médicos, especialidades, unidades, noticias,
                testimonios, citas, aseguradoras, cms
editor        → dashboard, noticias, testimonios, cms
recepcionista → dashboard, citas
```

`MENU_ITEMS` filtra el menú del sidebar según el rol del usuario autenticado en el `AdminLayout`.

---

## 6. Cache e ISR (Incremental Static Regeneration)

### 6.1 `unstable_cache` en `contenido.ts`

Todas las funciones de datos públicos están envueltas en `unstable_cache`:

```typescript
export const getContenido = unstable_cache(
  async () => { /* consulta Supabase */ },
  ['contenido'],          // cache key
  { tags: ['contenido'], revalidate: 86400 }  // 24h TTL
)
```

Funciones cacheadas: `getContenido`, `getTestimonios`, `getEspecialidades`, `getUnidades`, `getNoticias`.

### 6.2 Invalidación de cache

Cuando el admin guarda contenido, se llama a `POST /api/revalidate`:

```typescript
revalidateTag('contenido')   // invalida todas las funciones con tag 'contenido'
revalidatePath('/', 'layout') // invalida el route cache de todas las páginas públicas
```

El CMS espera 2 segundos antes de refrescar el iframe de preview para darle tiempo al cache de limpiar.

### 6.3 Problema resuelto: cliente en servidor

`createBrowserClient` (`@supabase/ssr`) falla silenciosamente en Node.js (intenta acceder a `localStorage`). Para `unstable_cache` y cualquier función server-side se usa `createClient` de `@supabase/supabase-js` directamente.

---

## 7. CMS Visual (`/admin/cms`)

### 7.1 Arquitectura del CMS

Layout split-panel:
- **Panel izquierdo (420px)**: tabs de sección + formulario de campos + botón guardar
- **Panel derecho**: iframe con preview del sitio en vivo (`hidden xl:flex`)

### 7.2 Secciones editables

| Sección | Ruta preview | Campos |
|---|---|---|
| `hero` | `/#hero` | titulo, subtitulo, boton_principal, boton_secundario, imagen |
| `elegirnos` | `/#elegirnos` | card_1/2/3 × (titulo, desc, icono) |
| `nosotros` | `/nosotros` | titulo, descripcion, años_trayectoria, especialistas, pacientes, satisfaccion |
| `contacto` | `/contacto` | telefono, email, direccion, horario, whatsapp, urgencias |
| `redes` | `/#footer` | facebook, instagram, youtube, linkedin |
| `footer` | `/#footer` | descripcion, copyright |

### 7.3 Hook `useCmsSection`

```typescript
const { fields, types, setField, save, saving, saved, isDirty, loading } =
  useCmsSection('hero')
```

- Carga filas de `contenido` filtradas por `seccion`
- `fields`: merge de DB + cambios locales (`edited`)
- `isDirty`: `true` si hay cambios sin guardar
- `save()`: hace bulk-update en Supabase + llama `/api/revalidate`
- Al cambiar de sección con `isDirty=true` se muestra alerta de confirmación

### 7.4 Componentes de sección

Todos reciben `{ fields, types, setField }` (tipo `CmsSectionProps`) y son renders puros sin estado propio. La identidad de componente nunca se define dentro de la función de render para evitar el bug de unmount/remount de React.

### 7.5 CmsField

Renderiza el input correcto según `tipo`:
- `text` → `<input>`
- `textarea` → `<textarea>`
- `url` / `image` → `<input>` + preview de imagen

### 7.6 SitePreview

- Iframe con `key={previewKey}` para forzar reload
- Chrome de navegador simulado (dots, barra URL, refresh, open-in-tab)
- Solo visible en pantallas `xl` y superiores
- Requiere `frame-ancestors 'self'` en CSP (configurado en `next.config.ts`)

---

## 8. Seguridad

### 8.1 Headers HTTP (`next.config.ts`)

```
X-Content-Type-Options: nosniff
X-Frame-Options: SAMEORIGIN
X-XSS-Protection: 1; mode=block
Referrer-Policy: strict-origin-when-cross-origin
Permissions-Policy: camera=(), microphone=(), geolocation=()
Content-Security-Policy: default-src 'self'; frame-ancestors 'self'; ...
```

HSTS está preparado pero comentado — activar cuando el dominio tenga HTTPS permanente.

### 8.2 Rate Limiting (`src/lib/rate-limit.ts`)

Rate limiter en memoria (Map) por IP. Parámetros por defecto: 5 requests / 60 segundos.
Aplicado en: `/api/citas`, `/api/contacto`, `/api/newsletter`.

> En producción multi-instancia reemplazar el `Map` por Redis/Upstash.

### 8.3 Validación y sanitización (`src/lib/validators.ts`)

Todas las entradas de usuario pasan por `sanitizeText()` antes de llegar a Supabase:
- Strip de etiquetas HTML
- Strip de caracteres de control
- Elimina `javascript:` URIs y event handlers inline (`on*=`)
- Límite de longitud configurable

Validadores por entidad: `validateCita`, `validateContacto`, `validateNewsletter`, `validateTestimonio`.

Supabase usa queries parametrizadas (protección SQL injection automática), pero la sanitización sigue siendo necesaria para prevenir XSS al renderizar los datos.

---

## 9. API Routes

| Ruta | Método | Descripción | Rate limit |
|---|---|---|---|
| `/api/revalidate` | POST | Invalida cache ISR | No |
| `/api/citas` | POST | Registra nueva cita | 5/min por IP |
| `/api/contacto` | POST | Formulario de contacto | 5/min por IP |
| `/api/newsletter` | POST | Suscripción al boletín | 5/min por IP |
| `/api/admin/crear-usuario` | POST | Crea usuario con rol (solo admin) | No |
| `/api/admin/invalidar-rol` | POST | Borra cookie `am-rol` | No |

---

## 10. Fases del CMS — Estado Actual

### Fase 1 — Panel Admin Base ✅
- Autenticación Supabase Auth
- Middleware de roles con cookie cache
- CRUD: Médicos, Especialidades, Unidades, Noticias (con TipTap)
- CRUD: Citas, Usuarios
- Diseño dark con sidebar + topbar

### Fase 2 — CMS Visual ✅
- Split-panel editor + iframe preview
- Hook `useCmsSection` reutilizable
- Secciones: Hero, Por qué Aura, Nosotros, Contacto, Redes Sociales, Footer
- Dirty-state tracking con alerta de cambios sin guardar
- Invalidación de ISR cache tras guardar
- CSP `frame-ancestors 'self'` para iframe same-origin

### Fase 3 — Testimonios CRUD ✅
- Lista con toggle activo/oculto + eliminación
- Formulario de creación y edición con validación completa
- Integración con sitio público (dinámico desde BD)
- Políticas RLS + GRANTs para anon y authenticated

### Pendiente / En roadmap
- **Directorio de médicos**: muestra 0 si falta RLS en tabla `medicos`
- **Sección "Por qué elegirnos"**: seed de datos en tabla `contenido` (sección `elegirnos`) para que el CMS la edite
- **Infraestructura / Bento Grid**: actualmente hardcodeado en `page.tsx`
- **Sección Cirugía/Equipo**: hardcodeado
- **HSTS**: activar en producción tras configurar SSL
- **Rate limit con Redis**: para entornos multi-instancia

---

## 11. Patrones de Desarrollo

### Regla fundamental: cliente en servidor

```typescript
// ❌ MAL — falla silenciosamente en Node.js (unstable_cache)
import { createClient } from '@/lib/supabase'  // createBrowserClient

// ✅ BIEN — para Server Components y unstable_cache
import { createClient } from '@supabase/supabase-js'
function db() {
  return createClient(SUPABASE_URL, SUPABASE_ANON_KEY)
}
```

### Componentes de formulario CMS

```typescript
// ❌ MAL — causa remount en cada keystroke (bug de React)
const ActiveForm = () => <SeccionHero {...formProps} />
return <ActiveForm />

// ✅ BIEN — inline condicional
return seccion === 'hero' ? <SeccionHero {...formProps} />
     : seccion === 'nosotros' ? <SeccionNosotros {...formProps} />
     : <SeccionFooter {...formProps} />
```

### Supabase en páginas admin (Client Components)

```typescript
// Instanciar dentro del componente o en cada callback
const supabase = createClient()  // @/lib/supabase (createBrowserClient)
// Lleva la sesión del usuario autenticado automáticamente
```

---

## 12. Variables de Entorno

```env
NEXT_PUBLIC_SUPABASE_URL=https://<project>.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=<anon-key>
# La service role key NO está en el proyecto (no se necesita aún)
```

---

## 13. Comandos Útiles

```bash
npm run dev          # Servidor de desarrollo (limpia unstable_cache al reiniciar)
npm run build        # Build de producción
npm run lint         # ESLint

# Limpiar cache ISR en desarrollo sin reiniciar:
# Hacer POST a http://localhost:3000/api/revalidate
fetch('/api/revalidate', { method: 'POST' })
```

---

## 14. Notas de Deployment

- El proyecto está preparado para Vercel (App Router + Edge Middleware)
- Activar HSTS en `next.config.ts` al tener dominio con HTTPS permanente
- Rate limiter usa `Map` en memoria — en Vercel con múltiples instancias, migrar a Upstash Redis
- Las imágenes de médicos/noticias se almacenan en Supabase Storage (bucket `medicos`, `noticias`)
- El dominio final debe agregarse a `connect-src` del CSP en `next.config.ts`
