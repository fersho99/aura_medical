'use client'

import IconPicker from './IconPicker'

const inputCls =
  'w-full px-4 py-2.5 bg-gray-800 text-white text-sm rounded-xl border border-gray-700 ' +
  'focus:outline-none focus:border-teal-500 transition placeholder-gray-600'

export const FIELD_LABELS: Record<string, string> = {
  titulo:           'Título',
  titulo_2:         'Título (línea 2)',
  subtitulo:        'Subtítulo',
  badge:            'Badge / Etiqueta',
  badge_texto:      'Badge / Etiqueta',
  boton_principal:  'Botón principal',
  boton_secundario: 'Botón secundario',
  boton:            'Texto del botón',
  boton_texto:      'Texto del botón',
  boton_href:       'URL del botón',
  boton_1:          'Botón 1 (texto)',
  boton_2:          'Botón 2 (texto)',
  imagen:           'Imagen (URL)',
  telefono:         'Teléfono',
  email:            'Email',
  direccion:        'Dirección',
  whatsapp:         'WhatsApp (número)',
  whatsapp_msg:     'Mensaje WhatsApp',
  urgencias:        'Urgencias 24/7',
  horario:          'Horario de atención',
  facebook:         'Facebook (URL)',
  instagram:        'Instagram (URL)',
  youtube:          'YouTube (URL)',
  linkedin:         'LinkedIn (URL)',
  años_trayectoria:    'Años de trayectoria (número)',
  años_label:          'Etiqueta años',
  especialistas:       'Especialistas (número)',
  especialistas_label: 'Etiqueta especialistas',
  pacientes:           'Pacientes atendidos (número)',
  pacientes_label:     'Etiqueta pacientes',
  satisfaccion:        'Satisfacción (número)',
  satisfaccion_label:  'Etiqueta satisfacción',
  descripcion:      'Descripción',
  copyright:        'Copyright',
  hero_titulo:      'Título del Hero',
  hero_subtitulo:   'Subtítulo del Hero',
  hero_badge:       'Badge del Hero',
  imagen_titulo:    'Título sobre imagen',
  imagen_desc:      'Descripción sobre imagen',
  bullet_1_icono:   'Ícono punto 1 (Material Symbol)',
  bullet_1_titulo:  'Título punto 1',
  bullet_1_desc:    'Descripción punto 1',
  bullet_2_icono:   'Ícono punto 2 (Material Symbol)',
  bullet_2_titulo:  'Título punto 2',
  bullet_2_desc:    'Descripción punto 2',
  bullet_1:         'Beneficio 1',
  bullet_2:         'Beneficio 2',
  bullet_3:         'Beneficio 3',
  card_1_imagen:    'Imagen tarjeta 1 (URL)',
  card_1_badge:     'Badge tarjeta 1',
  card_1_icono:     'Ícono tarjeta 1',
  card_1_titulo:    'Título tarjeta 1',
  card_1_desc:      'Descripción tarjeta 1',
  card_2_imagen:    'Imagen tarjeta 2 (URL)',
  card_2_badge:     'Badge tarjeta 2',
  card_2_icono:     'Ícono tarjeta 2',
  card_2_titulo:    'Título tarjeta 2',
  card_2_desc:      'Descripción tarjeta 2',
  card_3_imagen:    'Imagen tarjeta 3 (URL)',
  card_3_badge:     'Badge tarjeta 3',
  card_3_icono:     'Ícono tarjeta 3',
  card_3_titulo:    'Título tarjeta 3',
  card_3_desc:      'Descripción tarjeta 3',
  card_4_imagen:    'Imagen tarjeta 4 (URL)',
  card_4_icono:     'Ícono tarjeta 4',
  card_4_titulo:    'Título tarjeta 4',
  card_4_desc:      'Descripción tarjeta 4',
  card_4_href:      'URL tarjeta 4',
  card_4_link:      'Texto enlace tarjeta 4',
  accion_1_titulo:  'Acción 1 — Título',
  accion_1_desc:    'Acción 1 — Descripción',
  accion_1_href:    'Acción 1 — URL',
  accion_2_titulo:  'Acción 2 — Título',
  accion_2_desc:    'Acción 2 — Descripción',
  accion_2_href:    'Acción 2 — URL',
  mapa_url:         'URL del mapa (embed Google Maps)',
  whatsapp_texto:   'Texto botón WhatsApp',
  columna_1_titulo: 'Título columna Especialidades',
  columna_2_titulo: 'Título columna Urgencias',
}

const TEXTAREAS = new Set([
  'descripcion', 'subtitulo', 'hero_subtitulo', 'horario', 'direccion',
  'imagen_desc', 'whatsapp_msg',
  'bullet_1_desc', 'bullet_2_desc',
  'card_1_desc', 'card_2_desc', 'card_3_desc', 'card_4_desc',
  'accion_1_desc', 'accion_2_desc',
])

interface CmsFieldProps {
  clave:    string
  valor:    string
  tipo:     string
  onChange: (v: string) => void
}

export default function CmsField({ clave, valor, tipo, onChange }: CmsFieldProps) {
  const label   = FIELD_LABELS[clave] ?? clave.replace(/_/g, ' ')
  const isIcon  = tipo === 'icon' || clave.endsWith('_icono')
  const isImg   = !isIcon && (tipo === 'image' || tipo === 'imagen' || (tipo === 'url' && clave.includes('imagen')))
  const isTxt   = !isIcon && (tipo === 'textarea' || TEXTAREAS.has(clave))

  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
        {label}
      </label>

      {isIcon ? (
        <IconPicker value={valor} onChange={onChange} />
      ) : isImg ? (
        <div className="space-y-2">
          <input
            value={valor}
            onChange={e => onChange(e.target.value)}
            placeholder="https://…"
            className={inputCls}
          />
          {valor && (
            <img
              src={valor}
              alt=""
              className="h-28 w-full rounded-xl object-cover border border-gray-700"
            />
          )}
        </div>
      ) : isTxt ? (
        <textarea
          value={valor}
          onChange={e => onChange(e.target.value)}
          rows={3}
          className={`${inputCls} resize-none`}
        />
      ) : (
        <input
          value={valor}
          onChange={e => onChange(e.target.value)}
          className={inputCls}
        />
      )}
    </div>
  )
}
