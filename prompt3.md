# Prompt: Navegación jerárquica del CMS Visual — Aura Medical

## Contexto

El CMS Visual de Aura Medical vive en `src/app/admin/cms/page.tsx`.
Actualmente muestra una **lista plana de 13 secciones** sin indicar a qué página pertenece cada una.
El objetivo es convertirla en una **navegación de 2 niveles**: Página → Secciones, con acordeón.

**No cambiar nada de:**
- La lógica de guardado (`useCmsSection`, API routes)
- Los componentes de sección (`SeccionHero`, `SeccionElegirnos`, etc.)
- La tabla `contenido` en Supabase
- El preview iframe de la derecha

**Solo cambia:** la UI del menú lateral izquierdo del CMS.

---

## Nueva estructura de navegación

```
CMS Visual
├── 🏠 Home
│   ├── Hero principal         (seccion: 'hero')
│   ├── Por qué Aura          (seccion: 'elegirnos')
│   ├── Acciones rápidas      (seccion: 'acciones')
│   ├── Vanguardia Tec.       (seccion: 'tecnologia')
│   ├── Infraestructura       (seccion: 'infraestructura')
│   └── Premium Club          (seccion: 'premium')
│
├── 👥 Nosotros
│   └── Hero + Estadísticas   (seccion: 'nosotros')
│
├── 🏥 Especialidades
│   └── Hero                  (seccion: 'esp_hero')
│
├── 🏢 Unidades
│   └── Hero                  (seccion: 'uni_hero')
│
├── 📰 Noticias
│   └── Hero                  (seccion: 'noticias_hero')
│
├── 📍 Contacto
│   └── Hero + Datos          (seccion: 'contacto')
│
└── ⚙️ Global
    ├── Redes sociales         (seccion: 'redes')
    └── Footer                 (seccion: 'footer')
```

---

## Implementación

### 1. Definir la estructura en `cms/page.tsx`

Reemplazar el array plano `SECCIONES` (o como se llame actualmente) por este objeto jerárquico:

```typescript
const ESTRUCTURA_CMS = [
  {
    pagina: 'Home',
    icono: 'home',
    secciones: [
      { id: 'hero',            label: 'Hero principal',   preview: 'http://localhost:3000/#hero' },
      { id: 'elegirnos',       label: 'Por qué Aura',     preview: 'http://localhost:3000/#elegirnos' },
      { id: 'acciones',        label: 'Acciones rápidas', preview: 'http://localhost:3000/' },
      { id: 'tecnologia',      label: 'Vanguardia Tec.',  preview: 'http://localhost:3000/' },
      { id: 'infraestructura', label: 'Infraestructura',  preview: 'http://localhost:3000/' },
      { id: 'premium',         label: 'Premium Club',     preview: 'http://localhost:3000/' },
    ],
  },
  {
    pagina: 'Nosotros',
    icono: 'groups',
    secciones: [
      { id: 'nosotros', label: 'Hero + Estadísticas', preview: 'http://localhost:3000/nosotros' },
    ],
  },
  {
    pagina: 'Especialidades',
    icono: 'medical_services',
    secciones: [
      { id: 'esp_hero', label: 'Hero', preview: 'http://localhost:3000/especialidades' },
    ],
  },
  {
    pagina: 'Unidades',
    icono: 'corporate_fare',
    secciones: [
      { id: 'uni_hero', label: 'Hero', preview: 'http://localhost:3000/unidades' },
    ],
  },
  {
    pagina: 'Noticias',
    icono: 'newspaper',
    secciones: [
      { id: 'noticias_hero', label: 'Hero', preview: 'http://localhost:3000/noticias' },
    ],
  },
  {
    pagina: 'Contacto',
    icono: 'call',
    secciones: [
      { id: 'contacto', label: 'Hero + Datos', preview: 'http://localhost:3000/contacto' },
    ],
  },
  {
    pagina: 'Global',
    icono: 'settings',
    secciones: [
      { id: 'redes',  label: 'Redes sociales', preview: 'http://localhost:3000/' },
      { id: 'footer', label: 'Footer',          preview: 'http://localhost:3000/' },
    ],
  },
]
```

---

### 2. Estado del menú

Agregar dos estados al componente (además del que ya maneja la sección activa):

```typescript
// Página expandida en el acordeón — iniciar con 'Home' abierto por defecto
const [paginaAbierta, setPaginaAbierta] = useState<string>('Home')

// Sección activa (ya debe existir, solo mantener el nombre que tenga)
const [seccionActiva, setSeccionActiva] = useState<string>('hero')
```

Cuando el usuario hace click en una sección:
1. Setear `seccionActiva` con el `id` de la sección
2. Actualizar el preview iframe con la URL `preview` de esa sección
3. El acordeón de la página se mantiene abierto (no colapsar al seleccionar una subsección)

---

### 3. UI del menú — acordeón de 2 niveles

Reemplazar el render del menú lateral por este patrón. Usar exactamente los mismos tokens de diseño (clases Tailwind) que ya se usan en el resto del panel admin:

```tsx
<nav className="flex flex-col gap-1 p-2">
  {ESTRUCTURA_CMS.map((grupo) => (
    <div key={grupo.pagina}>

      {/* Nivel 1 — cabecera de página */}
      <button
        onClick={() =>
          setPaginaAbierta(
            paginaAbierta === grupo.pagina ? '' : grupo.pagina
          )
        }
        className={`
          w-full flex items-center justify-between gap-3
          px-3 py-2.5 rounded-lg text-left
          transition-colors duration-150
          ${paginaAbierta === grupo.pagina
            ? 'bg-primary/10 text-primary'
            : 'text-on-surface-variant hover:bg-surface-variant'
          }
        `}
      >
        <div className="flex items-center gap-2.5">
          <span className="material-symbols-outlined text-[18px]">
            {grupo.icono}
          </span>
          <span className="type-label-lg font-semibold">{grupo.pagina}</span>
        </div>
        <span
          className={`material-symbols-outlined text-[16px] transition-transform duration-200
            ${paginaAbierta === grupo.pagina ? 'rotate-180' : ''}
          `}
        >
          expand_more
        </span>
      </button>

      {/* Nivel 2 — secciones, solo visibles si la página está abierta */}
      {paginaAbierta === grupo.pagina && (
        <div className="ml-3 mt-0.5 flex flex-col gap-0.5 border-l border-outline-variant pl-3">
          {grupo.secciones.map((sec) => (
            <button
              key={sec.id}
              onClick={() => setSeccionActiva(sec.id)}
              className={`
                w-full flex items-center gap-2
                px-3 py-2 rounded-lg text-left text-sm
                transition-colors duration-150
                ${seccionActiva === sec.id
                  ? 'bg-primary text-on-primary font-medium'
                  : 'text-on-surface-variant hover:bg-surface-variant'
                }
              `}
            >
              {sec.label}
              {seccionActiva === sec.id && (
                <span className="material-symbols-outlined text-[14px] ml-auto">
                  chevron_right
                </span>
              )}
            </button>
          ))}
        </div>
      )}

    </div>
  ))}
</nav>
```

---

### 4. Preview URL dinámica

El iframe de preview debe actualizarse al seleccionar una sección. Buscar dónde se define la URL del iframe y reemplazarla por:

```typescript
const previewUrl = ESTRUCTURA_CMS
  .flatMap((g) => g.secciones)
  .find((s) => s.id === seccionActiva)
  ?.preview ?? 'http://localhost:3000'
```

Usar `previewUrl` en el `src` del iframe.

---

### 5. Selección inicial inteligente

Al montar el componente, abrir automáticamente la página que contiene la sección activa:

```typescript
useEffect(() => {
  const grupoInicial = ESTRUCTURA_CMS.find((g) =>
    g.secciones.some((s) => s.id === seccionActiva)
  )
  if (grupoInicial) setPaginaAbierta(grupoInicial.pagina)
}, []) // solo al montar
```

---

## Comportamiento esperado

1. Al entrar al CMS → **Home** expandido, **Hero principal** seleccionado
2. Click en "Nosotros" → Home se colapsa, Nosotros se expande y selecciona su primera sección automáticamente
3. Click en una subsección → solo cambia el formulario y el preview, el acordeón no colapsa
4. Subsección activa → fondo `bg-primary`, texto `text-on-primary`
5. Página activa → fondo `bg-primary/10`, texto `text-primary`
6. El preview iframe actualiza su URL al cambiar de sección

---

## Lo que NO tocar

- Componentes de sección (`SeccionHero`, `SeccionElegirnos`, `SeccionTecnologia`, etc.)
- Hook `useCmsSection`
- Panel de formulario y botón de guardar
- Lógica de revalidación (`/api/revalidate`)
- Tabla `contenido` en Supabase

---

## Checklist de validación

- [ ] Home expandido y Hero seleccionado al cargar
- [ ] Click en página expande sus secciones y colapsa la anterior
- [ ] Click en subsección carga el formulario correcto
- [ ] Preview cambia URL al seleccionar cada sección
- [ ] Estilo consistente con el resto del panel admin
- [ ] El guardado de contenido sigue funcionando sin errores