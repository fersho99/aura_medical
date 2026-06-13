# Prompt 3: Mejoras de UX en el CMS — Aura Medical

## Contexto

El CMS Visual de Aura Medical tiene 3 mejoras de UX pendientes de bajo
esfuerzo que mejoran la experiencia del usuario final administrador.

---

## Mejora 1 — Botón "Ir a crear noticia" en Noticias → Hero

Cuando el admin está editando `Noticias → Hero`, el preview muestra
"No hay noticias publicadas aún". El usuario no sabe cómo crear una.
Agregar un botón de acceso directo al módulo de noticias.

### Archivo: `src/app/admin/cms/components/SeccionNoticiasHero.tsx`

Agregar al final del JSX, antes del cierre del `<div>` principal:

```tsx
<div className="mt-md pt-md border-t border-outline-variant">
  <p className="type-body-sm text-on-surface-variant mb-sm">
    Las noticias se gestionan desde el módulo de Noticias.
  </p>
  <a
    href="/admin/noticias"
    className="inline-flex items-center gap-2 px-4 py-2 rounded-lg
               bg-secondary-container text-on-secondary-container
               type-label font-medium hover:opacity-90 transition-opacity"
  >
    <span className="material-symbols-outlined text-[16px]">newspaper</span>
    Ir a gestionar noticias
  </a>
</div>
```

---

## Mejora 2 — Hint informativo en secciones sin campos editables

Algunas secciones como `Especialidades → Hero` y `Unidades → Hero` tienen
datos que se completan automáticamente desde sus tablas propias. Agregar un
hint claro para que el admin no se confunda.

### Archivos: `SeccionEspHero.tsx` y `SeccionUniHero.tsx`

Agregar al inicio del formulario, antes de los `CmsField`:

```tsx
<div className="flex gap-2 p-3 rounded-lg bg-tertiary-container/30">
  <span className="material-symbols-outlined text-[18px] text-tertiary shrink-0 mt-0.5">
    info
  </span>
  <p className="type-body-sm text-on-surface-variant">
    {/* Para Especialidades: */}
    Los cards de especialidades se gestionan desde el módulo{' '}
    <a href="/admin/especialidades" className="text-primary underline">
      Especialidades
    </a>.
    Aquí solo se edita el encabezado de la página.

    {/* Para Unidades: */}
    Los cards de unidades se gestionan desde el módulo{' '}
    <a href="/admin/unidades" className="text-primary underline">
      Unidades
    </a>.
    Aquí solo se edita el encabezado de la página.
  </p>
</div>
```

---

## Mejora 3 — Indicador de cambios sin guardar

Actualmente el botón "Guardar sección" está siempre visible pero no indica
si hay cambios pendientes. Agregar un punto visual cuando `isDirty` es `true`.

### Archivo: `src/app/admin/cms/page.tsx`

Buscar el botón de guardar y añadir el indicador:

```tsx
<button
  onClick={save}
  disabled={saving || !isDirty}
  className={`
    relative inline-flex items-center gap-2 px-4 py-2 rounded-lg
    type-label font-medium transition-all
    ${isDirty
      ? 'bg-primary text-on-primary'
      : 'bg-surface-variant text-on-surface-variant opacity-60 cursor-not-allowed'
    }
  `}
>
  {/* Punto rojo de cambios pendientes */}
  {isDirty && !saving && (
    <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-error" />
  )}

  {saving ? (
    <>
      <span className="material-symbols-outlined text-[16px] animate-spin">
        progress_activity
      </span>
      Guardando...
    </>
  ) : saved ? (
    <>
      <span className="material-symbols-outlined text-[16px]">check_circle</span>
      Guardado
    </>
  ) : (
    <>
      <span className="material-symbols-outlined text-[16px]">save</span>
      {isDirty ? 'Guardar cambios' : 'Sin cambios'}
    </>
  )}
</button>
```

> El hook `useCmsSection` ya expone `isDirty`, `saving` y `saved`.
> Solo adaptar los classNames a los tokens del proyecto si difieren.

---

## Mejora 4 — Breadcrumb en el header del CMS

Agregar un breadcrumb simple arriba del formulario que muestre
`Página > Sección` para que el admin siempre sepa dónde está.

### Archivo: `src/app/admin/cms/page.tsx`

Buscar dónde empieza el panel de formulario y agregar arriba:

```tsx
{/* Breadcrumb */}
{seccionActiva && (
  <div className="flex items-center gap-1.5 type-label text-on-surface-variant mb-md">
    <span>
      {ESTRUCTURA_CMS.find(g =>
        g.secciones.some(s => s.id === seccionActiva)
      )?.pagina}
    </span>
    <span className="material-symbols-outlined text-[14px]">chevron_right</span>
    <span className="text-on-surface font-medium">
      {ESTRUCTURA_CMS
        .flatMap(g => g.secciones)
        .find(s => s.id === seccionActiva)
        ?.label}
    </span>
  </div>
)}
```

---

## Validación

- [ ] En Noticias → Hero aparece el botón "Ir a gestionar noticias" y navega a `/admin/noticias`
- [ ] En Especialidades → Hero aparece el hint con link al módulo
- [ ] En Unidades → Hero aparece el hint con link al módulo
- [ ] El botón Guardar está deshabilitado cuando no hay cambios (`!isDirty`)
- [ ] El botón Guardar se activa y cambia de color al editar un campo
- [ ] El breadcrumb muestra la página y sección activa correctamente
- [ ] No hay regresiones en el guardado de contenido