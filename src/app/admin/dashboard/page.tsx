import { createServerSupabaseClient } from '@/lib/supabase-server'

const colorMap = {
  teal:   { bg: 'bg-teal-500/10',   text: 'text-teal-400',   border: 'border-teal-500/20',   value: 'text-teal-300' },
  blue:   { bg: 'bg-blue-500/10',   text: 'text-blue-400',   border: 'border-blue-500/20',   value: 'text-blue-300' },
  purple: { bg: 'bg-purple-500/10', text: 'text-purple-400', border: 'border-purple-500/20', value: 'text-purple-300' },
  amber:  { bg: 'bg-amber-500/10',  text: 'text-amber-400',  border: 'border-amber-500/20',  value: 'text-amber-300' },
} as const

export default async function DashboardPage() {
  const supabase = await createServerSupabaseClient()

  const [
    { count: totalMedicos },
    { count: totalNoticias },
    { count: totalCitas },
    { count: citasPendientes },
  ] = await Promise.all([
    supabase.from('medicos').select('*', { count: 'exact', head: true }).eq('activo', true),
    supabase.from('noticias').select('*', { count: 'exact', head: true }).eq('publicado', true),
    supabase.from('citas').select('*', { count: 'exact', head: true }),
    supabase.from('citas').select('*', { count: 'exact', head: true }).eq('estado', 'pendiente'),
  ])

  const cards = [
    { label: 'Médicos Activos',     value: totalMedicos    ?? 0, icon: 'medical_services',  color: 'teal'   as const, href: '/admin/medicos' },
    { label: 'Noticias Publicadas', value: totalNoticias   ?? 0, icon: 'newspaper',          color: 'blue'   as const, href: '/admin/noticias' },
    { label: 'Total de Citas',      value: totalCitas      ?? 0, icon: 'calendar_month',     color: 'purple' as const, href: '/admin/citas' },
    { label: 'Citas Pendientes',    value: citasPendientes ?? 0, icon: 'pending_actions',    color: 'amber'  as const, href: '/admin/citas' },
  ]

  const quickActions = [
    { href: '/admin/medicos',  icon: 'person_add',      label: 'Agregar médico' },
    { href: '/admin/noticias', icon: 'add_box',          label: 'Nueva noticia' },
    { href: '/admin/citas',    icon: 'event_available',  label: 'Ver citas' },
  ]

  return (
    <div>

      {/* Encabezado */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white">Dashboard</h1>
        <p className="text-gray-400 text-sm mt-1">Resumen de actividad de Aura Medical</p>
      </div>

      {/* Tarjetas de métricas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {cards.map((card) => {
          const c = colorMap[card.color]
          return (
            <a
              key={card.label}
              href={card.href}
              className="bg-gray-900 rounded-2xl p-6 border border-gray-800 hover:border-gray-700 transition-all group flex flex-col gap-4"
            >
              <div className={`w-10 h-10 rounded-xl ${c.bg} border ${c.border} flex items-center justify-center`}>
                <span
                  className={`material-symbols-outlined ${c.text} text-[22px]`}
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  {card.icon}
                </span>
              </div>
              <div>
                <p className={`text-3xl font-bold ${c.value}`}>{card.value}</p>
                <p className="text-gray-400 text-sm mt-0.5">{card.label}</p>
              </div>
            </a>
          )
        })}
      </div>

      {/* Acciones rápidas */}
      <div className="bg-gray-900 rounded-2xl border border-gray-800 p-6">
        <h2 className="text-white font-semibold text-sm mb-4">Acciones rápidas</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {quickActions.map(({ href, icon, label }) => (
            <a
              key={href}
              href={href}
              className="flex items-center gap-3 px-4 py-3 bg-gray-800 hover:bg-gray-700 rounded-xl text-sm text-gray-300 hover:text-white transition-all border border-gray-700 hover:border-gray-600"
            >
              <span
                className="material-symbols-outlined text-teal-400 text-[20px] shrink-0"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                {icon}
              </span>
              {label}
            </a>
          ))}
        </div>
      </div>

    </div>
  )
}
